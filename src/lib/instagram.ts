export interface InstagramMedia {
  id: string;
  caption?: string;
  mediaUrl: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  thumbnailUrl?: string;
}

/** Post/reel URLs embed correctly; profile URLs do not. */
export function isInstagramPostUrl(url: string): boolean {
  try {
    const { pathname } = new URL(url);
    return /\/(p|reel|reels|tv)\//.test(pathname);
  } catch {
    return false;
  }
}

/**
 * Fetches recent Instagram photos via Meta Graph API.
 * Requires INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_USER_ID in env.
 * @see https://developers.facebook.com/docs/instagram-api
 */
export async function getInstagramFeed(limit = 6): Promise<InstagramMedia[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!token || !userId) return [];

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=${limit}&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) return [];

    const json = (await res.json()) as {
      data?: Array<{
        id: string;
        caption?: string;
        media_type: InstagramMedia["mediaType"];
        media_url?: string;
        thumbnail_url?: string;
        permalink: string;
      }>;
    };

    return (json.data ?? []).flatMap((item) => {
      const mediaUrl =
        item.media_type === "VIDEO"
          ? item.thumbnail_url ?? item.media_url
          : item.media_url;
      if (!mediaUrl) return [];
      return [
        {
          id: item.id,
          caption: item.caption,
          mediaUrl,
          permalink: item.permalink,
          mediaType: item.media_type,
          thumbnailUrl: item.thumbnail_url,
        },
      ];
    });
  } catch {
    return [];
  }
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildContactInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Journey } from "@/lib/types";
import { useState } from "react";

export function InquiryForm({ journeys }: { journeys: Journey[] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    journey: "",
    message: "",
  });

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    if (formspreeId) {
      try {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Form submission failed");
      } catch {
        setStatus("error");
        return;
      }
    }

    setStatus("success");
  }

  const whatsappUrl = buildWhatsAppUrl(
    buildContactInquiryMessage({
      name: form.name || "—",
      email: form.email || "—",
      journey: form.journey,
      message: form.message || "I'd like to learn more about Sabryatra journeys.",
    }),
  );

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-stone-100 p-8 text-center">
        <h3 className="font-serif text-2xl text-stone-900">Thank you</h3>
        <p className="mt-3 text-stone-600">
          Your message has been received. For a faster response, continue on WhatsApp.
        </p>
        <Button asChild variant="whatsapp" className="mt-6">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Continue on WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Your name *</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Your email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="journey">Journey interest</Label>
        <select
          id="journey"
          className="flex h-12 w-full border border-border bg-background px-4 text-base text-foreground md:text-sm"
          value={form.journey}
          onChange={(e) => setForm({ ...form, journey: e.target.value })}
        >
          <option value="">Select a journey (optional)</option>
          {journeys.map((j) => (
            <option key={j.slug} value={j.title}>
              {j.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your dream journey..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try WhatsApp instead.</p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={status === "submitting"} className="flex-1">
          {status === "submitting" ? "Sending..." : "Send inquiry"}
        </Button>
        <Button asChild variant="whatsapp" className="flex-1">
          <a
            href={buildWhatsAppUrl(
              buildContactInquiryMessage({
                name: form.name || "[Your name]",
                email: form.email || "[Your email]",
                journey: form.journey,
                message: form.message || "[Your message]",
              }),
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp instead
          </a>
        </Button>
      </div>
    </form>
  );
}

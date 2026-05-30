"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ApiResponse } from "@/types/api.types";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  website: z.string().optional(),
});

interface ContactFormState {
  name: string;
  email: string;
  message: string;
  website: string;
}

export function ContactForm(): React.ReactElement {
  const [state, setState] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const parsed = contactSchema.safeParse({
      name: state.name,
      email: state.email,
      message: state.message,
      website: state.website,
    });
    if (!parsed.success) {
      setError("Please check your inputs.");
      setLoading(false);
      return;
    }

    if (parsed.data.website) {
      setError("Invalid submission.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
        }),
      });
      const json = (await res.json()) as ApiResponse<null>;
      if (!json.success) {
        setError(json.error ?? "Failed to send.");
        return;
      }
      setSuccess(true);
      setState({ name: "", email: "", message: "", website: "" });
    } catch {
      setError("Failed to save. Try LinkedIn or book a call.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <p className="text-sm text-success">
        Message received. I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
      <input
        type="text"
        name="website"
        value={state.website}
        onChange={(e) => setState({ ...state, website: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-foreground-muted">
          Name
        </label>
        <Input
          id="name"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-foreground-muted">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-foreground-muted">
          Message
        </label>
        <Textarea
          id="message"
          value={state.message}
          onChange={(e) => setState({ ...state, message: e.target.value })}
          required
        />
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}

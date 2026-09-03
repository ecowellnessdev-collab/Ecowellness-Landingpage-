"use client";

import { FormEvent, useState } from "react";

export default function LeadForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, phone }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setMessage(result.error || "Please check the form and try again.");
        return;
      }

      setFullName("");
      setPhone("");
      setIsSuccess(true);
      setMessage("Thank you. We received your details and will contact you soon.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName" className="mb-1 block text-xs text-white/70">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Enter Your Name"
          required
          minLength={2}
          className="w-full rounded-md border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-[#d3a04a]"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-xs text-white/70">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Enter Your Phone Number"
          required
          minLength={6}
          className="w-full rounded-md border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-[#d3a04a]"
        />
      </div>
      {message ? (
        <p
          className={`rounded-md border px-3 py-2 text-xs leading-relaxed ${
            isSuccess
              ? "border-[#e6bf6a]/25 bg-[#e6bf6a]/10 text-[#f3d896]"
              : "border-red-300/25 bg-red-950/35 text-red-100"
          }`}
        >
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-md bg-gradient-to-b from-[#f3d896] to-[#d3a04a] px-8 py-3 text-sm font-semibold text-[#3a2a10] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(243,216,150,0.4)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Lead = {
  id: string;
  fullName: string;
  phone: string;
  createdAt: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Unknown" : dateFormatter.format(date);
}

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();

    return leads.filter((lead) => new Date(lead.createdAt).toDateString() === today)
      .length;
  }, [leads]);

  const latestLead = leads[0];

  async function loadLeads(nextPassword: string) {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/leads", {
        headers: {
          "x-admin-password": nextPassword,
        },
      });
      const result = (await response.json()) as {
        leads?: Lead[];
        error?: string;
      };

      if (!response.ok) {
        setError(result.error || "Unable to open dashboard.");
        setSavedPassword("");
        return;
      }

      setSavedPassword(nextPassword);
      setLeads(result.leads || []);
    } catch {
      setError("Unable to load leads right now.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadLeads(password);
  }

  function downloadCsv() {
    const rows = [
      ["Name", "Phone", "Submitted At"],
      ...leads.map((lead) => [
        lead.fullName,
        lead.phone,
        formatDate(lead.createdAt),
      ]),
    ];
    const csv = rows
      .map((row) => row.map((value) => escapeCsv(value)).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "eco-wellness-leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const isUnlocked = Boolean(savedPassword);

  return (
    <main className="min-h-screen bg-[#160e08] text-white">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,#7e4a1c66,transparent_58%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 py-8 md:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" aria-label="Eco Wellness Spa home">
            <Image
              src="/logo-mark.png"
              alt="Eco Wellness Spa"
              width={172}
              height={135}
              priority
              className="h-14 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="rounded-md border border-[#e6bf6a]/35 px-4 py-2 text-sm font-semibold text-[#f3d896] transition-colors hover:bg-[#e6bf6a]/10"
          >
            Back to Site
          </Link>
        </header>

        {!isUnlocked ? (
          <section className="flex flex-1 items-center justify-center py-16">
            <div className="w-full max-w-md rounded-lg border border-white/10 bg-[#2a1c12]/80 p-7 shadow-2xl shadow-black/35 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e6bf6a]">
                Admin Access
              </p>
              <h1 className="mt-3 text-3xl font-semibold">Lead Dashboard</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Enter the admin password to view Eco Wellness Spa submissions.
              </p>

              <form className="mt-7 flex flex-col gap-4" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="adminPassword"
                    className="mb-1 block text-xs text-white/70"
                  >
                    Password
                  </label>
                  <input
                    id="adminPassword"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="w-full rounded-md border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-[#d3a04a]"
                  />
                </div>
                {error ? (
                  <p className="rounded-md border border-red-300/25 bg-red-950/35 px-3 py-2 text-xs leading-relaxed text-red-100">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-md bg-gradient-to-b from-[#f3d896] to-[#d3a04a] px-8 py-3 text-sm font-semibold text-[#3a2a10] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(243,216,150,0.4)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isLoading ? "Opening..." : "Open Dashboard"}
                </button>
              </form>
            </div>
          </section>
        ) : (
          <section className="py-12">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e6bf6a]">
                  Admin Dashboard
                </p>
                <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
                  Eco Wellness Leads
                </h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void loadLeads(savedPassword)}
                  className="rounded-md border border-[#e6bf6a]/35 px-4 py-2 text-sm font-semibold text-[#f3d896] transition-colors hover:bg-[#e6bf6a]/10"
                >
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={downloadCsv}
                  disabled={leads.length === 0}
                  className="rounded-md bg-[#f3d896] px-4 py-2 text-sm font-semibold text-[#3a2a10] transition-colors hover:bg-[#e6bf6a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Download CSV
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-[#24160e] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/55">
                  Total Leads
                </p>
                <p className="mt-3 text-3xl font-semibold text-[#f3d896]">
                  {leads.length}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#24160e] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/55">
                  Today
                </p>
                <p className="mt-3 text-3xl font-semibold text-[#f3d896]">
                  {todayCount}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#24160e] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/55">
                  Latest
                </p>
                <p className="mt-3 text-lg font-semibold text-[#f3d896]">
                  {latestLead ? formatDate(latestLead.createdAt) : "No leads yet"}
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-[#21140d]">
              <div className="grid grid-cols-1 border-b border-white/10 px-5 py-4 text-sm font-semibold text-white/70 md:grid-cols-[1.2fr_1fr_1fr]">
                <span>Name</span>
                <span className="hidden md:block">Phone</span>
                <span className="hidden md:block">Submitted</span>
              </div>
              {leads.length > 0 ? (
                <div className="divide-y divide-white/10">
                  {leads.map((lead) => (
                    <article
                      key={lead.id}
                      className="grid gap-2 px-5 py-4 text-sm md:grid-cols-[1.2fr_1fr_1fr] md:items-center"
                    >
                      <div>
                        <p className="font-semibold text-white">{lead.fullName}</p>
                        <p className="mt-1 text-xs text-white/55 md:hidden">
                          {formatDate(lead.createdAt)}
                        </p>
                      </div>
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-[#f3d896] transition-colors hover:text-white"
                      >
                        {lead.phone}
                      </a>
                      <p className="hidden text-white/65 md:block">
                        {formatDate(lead.createdAt)}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-12 text-center">
                  <p className="text-lg font-semibold text-white">No leads yet</p>
                  <p className="mt-2 text-sm text-white/60">
                    New booking form submissions will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

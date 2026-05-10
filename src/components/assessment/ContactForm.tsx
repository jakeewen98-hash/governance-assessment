"use client";

import { useState } from "react";
import type { ContactInfo } from "@/types/assessment";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  onSubmit: (info: ContactInfo) => void;
  loading: boolean;
}

export function ContactForm({ onSubmit, loading }: ContactFormProps) {
  const [info, setInfo] = useState<ContactInfo>({
    name: "",
    company: "",
    email: "",
    role: "",
  });

  const [errors, setErrors] = useState<Partial<ContactInfo>>({});

  function validate(): boolean {
    const newErrors: Partial<ContactInfo> = {};
    if (!info.name.trim()) newErrors.name = "Please enter your name";
    if (!info.company.trim()) newErrors.company = "Please enter your company name";
    if (!info.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit(info);
    }
  }

  return (
    <div className="animate-slide-up">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-themis-600">
        Almost done
      </div>
      <h2 className="mb-2 font-serif text-3xl font-medium text-slate-900">
        Receive your governance report
      </h2>
      <p className="mb-8 text-base text-slate-500 leading-relaxed">
        Enter your details below. Your personalised assessment report will be
        generated immediately and emailed to you as a PDF.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-slate-500">
              Full Name
            </label>
            <input
              type="text"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              placeholder="Alexandra Chen"
              className={`w-full rounded-md border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 ${
                errors.name ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-slate-500">
              Company
            </label>
            <input
              type="text"
              value={info.company}
              onChange={(e) => setInfo({ ...info, company: e.target.value })}
              placeholder="Meridian Holdings Ltd"
              className={`w-full rounded-md border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 ${
                errors.company ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.company && (
              <p className="mt-1 text-xs text-red-500">{errors.company}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-slate-500">
            Work Email
          </label>
          <input
            type="email"
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            placeholder="alex@meridianholdings.com"
            className={`w-full rounded-md border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 ${
              errors.email ? "border-red-400" : "border-slate-200"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-slate-500">
            Role <span className="text-slate-300 normal-case">(optional)</span>
          </label>
          <input
            type="text"
            value={info.role}
            onChange={(e) => setInfo({ ...info, role: e.target.value })}
            placeholder="Chief Executive Officer"
            className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            loading={loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Generating assessment…" : "Generate My Report"}
          </Button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Your information is handled in accordance with our privacy policy. We
          will not share your details with third parties or add you to marketing
          lists without your consent.
        </p>
      </form>
    </div>
  );
}

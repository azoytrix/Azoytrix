"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.enum([
    "software-development",
    "ai-machine-learning",
    "cloud-devops",
    "web-mobile-apps",
    "data-analytics",
    "digital-innovation",
  ]),
  message: z.string().min(10, "Please tell us a bit more about your project"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const SERVICE_OPTIONS = [
  { value: "software-development", label: "Software Development" },
  { value: "ai-machine-learning", label: "AI & Machine Learning" },
  { value: "cloud-devops", label: "Cloud & DevOps" },
  { value: "web-mobile-apps", label: "Web & Mobile Apps" },
  { value: "data-analytics", label: "Data & Analytics" },
  { value: "digital-innovation", label: "Digital Innovation" },
];

export function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: "software-development" },
  });

  const onSubmit = (data: ContactFormValues) => {
    // In production, submit to your backend / form endpoint here.
    console.log("Contact form submitted:", data);
    window.alert(
      `Thanks ${data.name}! We've received your message and will be in touch shortly.`
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-16 space-y-6"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="col-span-full sm:col-span-1">
          <label className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
            Full name
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
            placeholder="Jane Doe"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="col-span-full sm:col-span-1">
          <label className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
            Email address
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
            placeholder="jane@company.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
          Company (optional)
        </label>
        <input
          {...register("company")}
          type="text"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
          placeholder="Acme Corp"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
          Area of interest
        </label>
        <select
          {...register("service")}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
        >
          {SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
          placeholder="Briefly describe your project and what you're looking to achieve..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-navy px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-navy/15 transition-all duration-300 hover:bg-brand hover:-translate-y-1 hover:shadow-brand/20 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Send message"}
        <Send size={18} />
      </button>
    </form>
  );
}

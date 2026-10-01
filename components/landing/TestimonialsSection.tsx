import TestimonialCard from "./ui/TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-brand-600">Built around teams</p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple enough for everyone
          </h2>

          <p className="mt-5 text-slate-600">
            A clean interface means less time learning the tool and more time
            doing the actual work.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <TestimonialCard
            text="TaskFlow makes it much easier to see what everyone is working on without opening ten different tools."
            name="Alex Morgan"
            role="Product Manager"
          />

          <TestimonialCard
            text="I like how quickly I can move from a project overview into the exact tasks that need attention."
            name="Jordan Davis"
            role="Software Engineer"
          />

          <TestimonialCard
            text="The interface is simple enough that our whole team can start using it without a long onboarding process."
            name="Sofia Kim"
            role="Team Lead"
          />
        </div>
      </div>
    </section>
  );
}

export default function TestimonialGrid() {
  const testimonials = [
    {
      name: "Daniel Clifford",
      text: `“ I was an EMT for many years before I joined the bootcamp. I’ve been looking to make a
      transition and heard great things. The free intro course was incredibly fun. The next 12 weeks were amazing. ”`,
    },
    {
      name: "Jonathan Walters",
      text: `“ I started as a total newbie with no coding skills. I now work as a mobile engineer
      for a big company. ”`,
    },
    {
      name: "Jeanette Harmon",
      text: `“ Thank you for the wonderful experience! I now have a job I really enjoy, and make a good living
      doing something I love. ”`,
    },
    {
      name: "Patrick Abrams",
      text: `“ The staff genuinely cared about my progress. The program gave me the confidence to become
      a capable junior developer. ”`,
    },
    {
      name: "Kira Whittle",
      text: `“ I’d never written a line of code. The step-by-step structure and supportive team helped me become a developer.
      The agile project was a highlight. ”`,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 mt-40">
      <h2 className="text-3xl font-bold text-center pb-8">What our customer say</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-700 border border-gray-300 rounded-md p-6"
          >
            <h3 className="font-semibold text-lg mb-3 text-white">{testimonial.name}</h3>
            <p className="text-white text-sm leading-relaxed">
              {testimonial.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

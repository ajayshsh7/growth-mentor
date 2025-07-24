export default function TestimonialGrid() {
  const testimonials = [
    {
      name: "Daniel Clifford",
      text: `“ I was an EMT for many years before I joined the bootcamp. I’ve been looking to make a
      transition and have heard some people who had an amazing experience here. I signed up
      for the free intro course and found it incredibly fun! I enrolled shortly thereafter.
      The next 12 weeks was the best ”`,
      area: "one",
      bg: "bg-black text-white"
    },
    {
      name: "Jonathan Walters",
      text: `“ I started as a total newbie with virtually no coding skills. I now work as a mobile engineer
      for a big company. ”`,
      area: "two",
      bg: "bg-gray-800 text-white"
    },
    {
      name: "Jeanette Harmon",
      text: `“ Thank you for the wonderful experience! I now have a job I really enjoy, and make a good living
      while doing something I love. ”`,
      area: "three",
      bg: "bg-white text-gray-700"
    },
    {
      name: "Patrick Abrams",
      text: `“ The staff seem genuinely concerned about my progress which I find really refreshing. The program
      gave me the confidence necessary to be able to go out in the world and present myself as a capable
      junior developer. The standard is above the rest. ”`,
      area: "four",
      bg: "bg-indigo-600 text-white"
    },
    {
      name: "Kira Whittle",
      text: `“ Before joining the bootcamp, I’ve never written a line of code. I needed some structure from
      professionals who can help me learn programming step by step. I was encouraged to enroll by a former
      student of theirs who can only say wonderful things about the program. The entire curriculum and staff
      did not disappoint. The agile team project, in particular, was outstanding. ”`,
      area: "five",
      bg: "bg-white text-gray-700"
    }
  ];

  return (
    <main className="grid gap-6 w-[95%] max-w-[70rem] mx-auto py-8 grid-cols-1
      [grid-template-areas:'one''two''three''four''five']
      sm:[grid-template-areas:'one_one''two_three''five_five''four_four']
      md:[grid-template-areas:'one_one''two_five''three_five''four_four']
      lg:[grid-template-areas:'one_one_two''five_five_five''three_four_four']
      xl:[grid-template-areas:'one_one_two_five''three_four_four_five']"
    >
      {testimonials.map((testimonial, index) => (
        <article
          key={index}
          className={`p-6 rounded-md ${testimonial.bg}`}
          style={{ gridArea: testimonial.area }}
        >
          <div className="mb-2">
            <h2 className="font-bold text-lg">{testimonial.name}</h2>
          </div>
          <p className="text-sm leading-relaxed">{testimonial.text}</p>
        </article>
      ))}
    </main>
  );
}

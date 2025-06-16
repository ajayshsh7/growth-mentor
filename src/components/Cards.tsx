export default function FeatureGrid() {
  const features = [
    {
      title: "Product-Market Fit Strategy",
      description:
        "We help you validate your idea, identify your ideal customers, and align your product with real market needs."
    },
    {
      title: "Go-To-Market Planning",
      description:
        "Launch with confidence using a strategic roadmap that covers positioning, messaging, channels, and customer acquisition."
    },
    {
      title: "Fundraising & Investor Readiness",
      description:
        "Get pitch-ready with expert guidance on storytelling, financial modeling, and building investor confidence."
    },
    {
      title: "Scalable Growth Systems",
      description:
        "We design and implement systems for user acquisition, retention, and growth that scale with your startup."
    }
  ];

  return (
    <div className="max-w-[82rem] mx-auto pt-16 text-center px-4 ">
      <h2 className="text-3xl md:text-4xl sm:text2x1 font-bold mb-8">What do you get?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-blue-600 px-6  py-14 rounded-md flex flex-col items-center justify-evenly"
          >
            <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
            <p className="max-w-[50ch] mx-auto text-gray-200">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

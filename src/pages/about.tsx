import {Link} from 'react-router-dom';

const About = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 md:px-12 py-12 max-w-7xl mx-auto">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-xl text-gray-600">
          Empowering tech startups to scale smarter and faster through expert strategic consulting.
        </p>
      </section>


      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Approach</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: 'Clarity-Driven Strategy',
              desc: 'We cut through noise to design actionable, measurable strategies tailored to your stage and goals.'
            },
            {
              title: 'Founder-Led Execution',
              desc: 'We support—not replace—your leadership. Our frameworks empower teams to execute and adapt.'
            },
            {
              title: 'Data + Intuition',
              desc: 'We combine data analytics with hard-earned intuition to uncover blind spots and seize opportunities.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Let’s Build the Future</h2>
        <p className="text-gray-700 mb-6">
          Whether you're defining your next phase of growth or preparing for funding, we’re here to help you move
          confidently.
        </p>
        <Link to="/contact" className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">
              Contact
            </Link>
      </section>
    </main>
  );
};

export default About;

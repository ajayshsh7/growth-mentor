import { useState } from "react";

export default function Contact() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 md:px-12 py-12 max-w-3xl mx-auto">
      {!isSent ? (
        <>
          <section className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl text-gray-600">
              Ready to scale? Tell us about your startup and we’ll reach out soon.
            </p>
          </section>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                required
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                required
                type="email"
                name="email"
                placeholder="Work Email"
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <input
              type="text"
              name="company"
              placeholder="Company (optional)"
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <textarea
              required
              name="message"
              placeholder="Tell us about your goals…"
              rows={6}
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-900 transition self-start"
            >
              Send Message
            </button>
          </form>
        </>
      ) : (
        <div className="text-center mt-24">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Thanks for reaching out!</h1>
          <p className="text-lg text-gray-600 mb-6">We’ll be in touch shortly.</p>
          <a
            href="/"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition"
          >
            Back to Home
          </a>
        </div>
      )}
    </main>
  );
}

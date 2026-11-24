
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080D1B] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-6 border-b border-white/10">

        <Link to="/" className="text-2xl font-bold tracking-tight">
          Intelli<span className="text-blue-500">Books</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-gray-400">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white transition">
            How it works
          </a>
          <a href="#about" className="hover:text-white transition">
            About
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/sign-in"
            className="px-4 py-2 text-sm font-medium hover:text-blue-400 transition"
          >
            Sign In
          </Link>

          <Link
            to="/sign-up"
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 md:px-16 py-24 md:py-32">

        <div className="absolute w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -top-20 left-1/3" />

        <div className="relative max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            AI-Powered Contract Intelligence
          </div>

          <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tight">
            Understand Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Contracts Smarter.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-7 text-gray-400 text-lg leading-relaxed">
            Stop struggling with complex legal documents.
            Upload your contracts and let AI analyze, compare,
            and explain important clauses in simple language.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <Link
              to="/sign-up"
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold transition shadow-lg shadow-blue-600/20"
            >
              Start Reviewing Contracts →
            </Link>

            <Link
              to="/sign-in"
              className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 font-semibold transition"
            >
              Sign In
            </Link>

          </div>

          <p className="text-gray-500 text-sm mt-5">
            Simple contract management. Smarter AI analysis.
          </p>

        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-4xl mx-auto mt-20">

          <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-5 md:p-8 shadow-2xl shadow-blue-950/40">

            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-gray-400 text-sm">Contract Overview</p>
                <h3 className="text-xl font-semibold mt-1">
                  AI Contract Analysis
                </h3>
              </div>

              <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400">
                Analysis Complete
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">

              <div className="bg-[#18243B] rounded-xl p-5">
                <p className="text-gray-400 text-sm">Uploaded Document</p>
                <div className="flex items-center gap-3 mt-5">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl">
                    PDF
                  </div>
                  <div>
                    <p className="font-medium">Service_Agreement.pdf</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Contract document
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#18243B] rounded-xl p-5">
                <p className="text-gray-400 text-sm">AI Review Summary</p>
                <h3 className="text-2xl font-bold mt-4 text-blue-400">
                  Smart Analysis
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  Important clauses identified and explained.
                </p>
              </div>

            </div>

            <div className="bg-[#18243B] rounded-xl p-5 mt-5">
              <p className="text-gray-300 font-medium">
                Contract Insights
              </p>

              <div className="space-y-4 mt-5">
                {[
                  "Payment Terms and Conditions",
                  "Termination and Notice Period",
                  "Confidentiality Obligations",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-400"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    {item}
                    <span className="ml-auto text-blue-400">Identified</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-16 py-24 bg-[#0C1324]">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest">
              Features
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Everything You Need for
              <span className="text-blue-400"> Better Contracts</span>
            </h2>
            <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
              Powerful AI capabilities that help you understand
              your legal documents without unnecessary complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                icon: "01",
                title: "AI Contract Review",
                description:
                  "Analyze uploaded contracts and understand important clauses using AI."
              },
              {
                icon: "02",
                title: "Smart Comparison",
                description:
                  "Compare your contracts against a reference contract and identify differences."
              },
              {
                icon: "03",
                title: "Simple Explanations",
                description:
                  "Convert complex legal language into clear, understandable summaries."
              }
            ].map((feature) => (
              <div
                key={feature.icon}
                className="p-8 rounded-2xl border border-white/10 bg-[#111A2E] hover:border-blue-500/50 transition"
              >
                <div className="text-blue-400 text-3xl font-bold">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold mt-7">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mt-4">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 md:px-16 py-24">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest">
            Simple Process
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-4">
            How IntelliBooks Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">

            {[
              {
                number: "01",
                title: "Upload Your Contract",
                description:
                  "Upload your PDF contract securely to your personal dashboard."
              },
              {
                number: "02",
                title: "AI Analyzes It",
                description:
                  "Our AI compares the document against the reference contract."
              },
              {
                number: "03",
                title: "Understand the Results",
                description:
                  "Review important differences, clauses, and simple explanations."
              }
            ].map((step) => (
              <div key={step.number}>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl font-bold">
                  {step.number}
                </div>

                <h3 className="text-xl font-semibold mt-6">
                  {step.title}
                </h3>

                <p className="text-gray-400 mt-3 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/20 p-10 md:p-16 text-center">

          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Review Contracts Smarter?
          </h2>

          <p className="text-gray-400 mt-5 max-w-xl mx-auto">
            Join IntelliBooks and make your contract review
            process simpler, faster, and more understandable.
          </p>

          <Link
            to="/sign-up"
            className="inline-block mt-8 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold transition"
          >
            Create Your Free Account →
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 md:px-16 py-8">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          <h2 className="text-xl font-bold">
            Intelli<span className="text-blue-500">Books</span>
          </h2>

          <p className="text-gray-500 text-sm">
            AI-powered contract intelligence.
          </p>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} IntelliBooks. All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  );
}

export default LandingPage;

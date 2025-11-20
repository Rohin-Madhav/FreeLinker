import {
  Search,
  Briefcase,
  Users,
  Handshake,
  DollarSign,
  FileText,
  CheckCircle,
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Hire Freelancers. Get Work Done.
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              FreeLinker connects businesses and skilled professionals through a
              trusted, transparent, and fast platform. Clients can easily find
              and hire verified freelancers for projects of any size, while
              freelancers gain access to a steady stream of high-quality
              opportunities that match their skills and interests — all in one
              simple, secure workspace.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for services like 'UI/UX Design'..."
                  className="w-full px-6 py-4 pr-14 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-2 bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-600">
              <span className="font-medium">Popular:</span>
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 hover:border-gray-400 transition">
                Web Design
              </button>
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 hover:border-gray-400 transition">
                Copywriting
              </button>
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 hover:border-gray-400 transition">
                SEO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">[Simple steps to get started]</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1. Post a Job
              </h3>
              <p className="text-gray-600 text-sm">
                [Client describes the project and requirements.]
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2. Receive Bids
              </h3>
              <p className="text-gray-600 text-sm">
                [Freelancers apply with their proposals and pricing.]
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Handshake className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3. Hire & Collaborate
              </h3>
              <p className="text-gray-600 text-sm">
                [Client selects and hires the best fit. Work begins.]
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                4. Pay Securely
              </h3>
              <p className="text-gray-600 text-sm">
                [Payment is held in escrow and released on completion.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Clients & Freelancers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Clients */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                  For Clients
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Clients can post detailed job listings in minutes, browse
                verified freelancer profiles, and compare proposals
                effortlessly. FreeLinker’s intelligent matching system helps you
                find the right talent quickly, while our built-in project
                management tools make it easy to track progress, communicate in
                real time, and handle secure payments — all in one place.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Post jobs and set budgets.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Hire verified freelancers and track progress.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Pay securely through our escrow system.
                  </span>
                </div>
              </div>

              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
                Post a Job for Free
              </button>
            </div>

            {/* For Freelancers */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                  For Freelancers
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Freelancers can discover projects that match their expertise,
                showcase their skills through a professional portfolio, and
                build long-term relationships with clients. FreeLinker
                simplifies every step — from applying to jobs and managing
                deliverables to receiving secure payments — so you can focus on
                doing what you do best.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Build your profile and showcase your portfolio.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Bid on jobs that match your skills.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Get paid on time, every time.
                  </span>
                </div>
              </div>

              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition">
                Find Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-10">
            [Encouraging closing statement to prompt user action.]
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg cursor-pointer hover:bg-blue-700 transition text-lg font-medium ">
              Join as a Client
            </button>
            <button className="border-2  cursor-pointer border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition text-lg font-medium">
              Join as a Freelancer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

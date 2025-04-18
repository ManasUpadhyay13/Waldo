import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/layout/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Ship Smarter, Track Better
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your shipping operations with real-time tracking,
            analytics, and automated workflows.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          {[
            {
              title: "Real-time Tracking",
              description:
                "Monitor your shipments in real-time with detailed status updates and location data.",
            },
            {
              title: "Analytics Dashboard",
              description:
                "Get insights into your shipping performance with comprehensive analytics and reports.",
            },
            {
              title: "Smart Automation",
              description:
                "Automate your shipping workflows and reduce manual tasks with intelligent features.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2025 Waldo. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                About
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

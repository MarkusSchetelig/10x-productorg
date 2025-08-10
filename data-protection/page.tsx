import Link from "next/link";

export default function DataProtectionPage() {
  return (
    <div className="min-h-screen bg-[#0c1b33] text-white">
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <Link
          href="/"
          className="text-[#5ABFB7] hover:text-[#5ABFB7]/80 transition-colors mb-8 inline-flex items-center"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8 mt-4">Data Protection</h1>

        <div className="space-y-8">
          <section>
            <p className="text-gray-300 leading-relaxed">
              We respect your privacy and are committed to protecting it. Our
              website does not collect, store, or process any personal data, nor
              do we use cookies or tracking technologies. If you contact us
              directly (e.g., via email), any personal information you provide
              will be used solely to respond to your inquiry and handled in
              compliance with applicable data protection laws.
            </p>
          </section>

          <section>
            <p className="text-gray-300 leading-relaxed">
              For any questions or concerns about our data protection practices,
              <br />
              please feel free to contact us.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

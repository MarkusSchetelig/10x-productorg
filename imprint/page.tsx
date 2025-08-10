import Link from "next/link";

export default function ImprintPage() {
  return (
    <div className="min-h-screen bg-[#0c1b33] text-white">
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <Link
          href="/"
          className="text-[#5ABFB7] hover:text-[#5ABFB7]/80 transition-colors mb-8 inline-flex items-center"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8 mt-4">Imprint</h1>

        <div className="space-y-8">
          {/* Contact Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <p className="text-gray-300">
              Markus Schetelig
              <br />
              Phone: +49 1704979152
              <br />
              E-mail: contact@3pando.com
            </p>
          </section>

          {/* VAT ID Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">VAT ID</h2>
            <p className="text-gray-300">
              Sales tax identification number according to Sect. 27 a of the
              Sales Tax Law:
              <br />
              DE367364123
            </p>
          </section>

          {/* Person Responsible Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Person responsible for editorial
            </h2>
            <p className="text-gray-300">
              Markus Schetelig
              <br />
              Margarethe-Gottliebe-Weg 14B
              <br />
              14476 Potsdam
            </p>
          </section>

          {/* EU Dispute Resolution */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              EU dispute resolution
            </h2>
            <p className="text-gray-300">
              The European Commission provides a platform for online dispute
              resolution (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5ABFB7] hover:text-[#5ABFB7]/80 transition-colors"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <br />
              Our e-mail address can be found above in the site notice.
            </p>
          </section>

          {/* Consumer Arbitration */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Dispute resolution proceedings in front of a consumer arbitration
              board
            </h2>
            <p className="text-gray-300">
              We are not willing or obliged to participate in dispute resolution
              proceedings in front of a consumer arbitration board.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

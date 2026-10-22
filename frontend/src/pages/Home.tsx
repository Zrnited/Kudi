import Footer from "../components/homepage/footer";
import Ledger from "../components/homepage/ledger";
import Navbar from "../components/homepage/navbar";
import Services from "../components/homepage/services";

export default function Home() {
  return (
    <main>
      <Navbar />
      {/* hero section */}
      <section className="grid items-center gap-12 py-12 md:grid-cols-2 md:py-20 mx-auto px-6 xl:px-20">
        <div>
          <div className="mb-4 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase w-fit">
            Free · private · in your browser
          </div>
          <h1 className="font-display text-5xl leading-tight font-semibold text-page md:text-6xl">
            Your money, on one calm page.
          </h1>
          <p className="mt-5 max-w-md text-lg text-foreground">
            Track what you earn and spend, set a budget for each category, and
            see how this month stacks up against the last - without your data
            ever leaving your device.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              href="/auth"
            >
              Start your ledger
            </a>
            <a
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              href="/d"
            >
              Go to my ledger
            </a>
          </div>
        </div>
        {/* ledger */}
        <Ledger />
      </section>
      {/* services */}
       <Services />
      {/* footer */}
      <Footer />
    </main>
  );
}

import { ChartLineUp, UsersThree, Eye } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const businessSection = [
  {
    title: "Actionable Insights for Growth",
    description:
      "Visey’s platform offers analytics for valuable insights to help you better serve the needs of startups.",
  },
  {
    title: "Reach your Target Audience",
    description:
      "Visey enables your business to efficiently connect with Indian startups actively seeking your services.",
  },
  {
    title: "Build Trust Through Transparency",
    description:
      "Integrated verification, ratings and reviews ensure transparency, fostering trust and credibility among startups and resource providers.",
  },
];

const features = [
  {
    title: "Free Listing",
    subtitle: "Go Online",
  },
  {
    title: "Get Leads",
    subtitle: "From across India",
  },
  {
    title: "Close Deals",
    subtitle: "Grow with Visey",
  },
];

function BusinessSection() {
  return (
    <section className="relative" aria-labelledby="business-section-heading">
      {/* Decorative Top Triangle */}
      <div
        className="relative rotate-180 w-full h-20 bg-repeat-x opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}      ></div>

      {/* Content Section */}
      <div className="relative px-4 pt-9 pb-24 space-y-9 md:space-y-14 xl:space-y-20">
        {/* Heading */}
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <h2
            id="business-section-heading"
            className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-[64px] leading-tight text-[#3f3f3f]"
          >
            Visey for Resource Providers
          </h2>
          <p className="text-2xl font-gothic text-[#272727]">
            <span className="font-medium">Unlock your full potential with our</span>{" "}
            <span className="font-bold">cutting-edge features</span>
          </p>
        </div>        {/* Business Features */}
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-6 md:flex-row">
          {businessSection.map((data, idx) => (
            <div
              key={data.title}
              className="flex flex-col min-w-[324px] h-[500px] flex-1 bg-primary-landing-light rounded-2xl border-none shadow-[0px_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.2)] transition-all duration-300"
            >
              <div className="flex flex-col h-full items-center justify-between pt-6 pb-3 px-6">
                <div className="flex flex-col items-start gap-[22px] py-0 self-stretch w-full">
                  <h3 className="self-stretch font-degular font-medium text-white text-[32px] leading-[44.8px]">
                    {data.title}
                  </h3>
                  <p className="self-stretch font-gothic font-medium text-white text-xl leading-7">
                    {data.description}
                  </p>
                </div>
                <div className="relative w-full h-52 mt-8">
                  {idx === 0 && (
                    <Image
                      src="/22-viseydev-1.png"
                      alt="Feature illustration"
                      className="w-full h-full object-contain"
                      width={435}
                      height={200}
                    />
                  )}
                  {idx === 1 && (
                    <Image
                      src="/23-viseydev-1.png"
                      alt="Feature illustration"
                      className="w-full h-full object-contain"
                      width={435}
                      height={200}
                    />
                  )}
                  {idx === 2 && (
                    <Image
                      src="/24-viseydev-1.png"
                      alt="Feature illustration"
                      className="w-full h-full object-contain"
                      width={435}
                      height={200}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>        {/* Features Section */}
        <div className="max-w-screen-xl mx-auto flex flex-col gap-4 md:flex-row md:justify-between py-12 md:py-16 lg:py-22">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="flex-grow text-center pb-6 hover:transform hover:scale-105 transition-transform duration-300"
            >
              <p className="font-degular text-[40px] text-[#9d0543] font-normal">
                {feat.title}
              </p>
              <p className="font-medium font-gothic text-xl text-black">
                {feat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div
        className="absolute inset-x-0 bottom-0 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-60"
        aria-hidden="true"
      >
        <Image
          src="/wave-real-2.png"
          fill
          className="object-cover object-left rotate-180"
          alt="Wave-shaped decorative background"
          loading="lazy" // Lazy-loaded
        />
      </div>
    </section>
  );
}

export default BusinessSection;

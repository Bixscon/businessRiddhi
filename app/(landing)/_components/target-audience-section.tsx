import Image from "next/image";

function TargetAudienceSection() {
  return (
    <section
      className="bg-[#F01D74] w-full py-4"
      aria-labelledby="target-audience-heading"
    >
      {/* Triangle top border - decorative */}
      <div
        className="w-full h-20 bg-repeat-x"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Main content - with max-width constraint */}
      <div className="max-w-screen-xl mx-auto px-4">
        <section className="py-8 md:py-16 lg:py-24 text-base-white space-y-4 md:flex md:space-y-0 md:gap-x-14 md:items-center">
          {/* Image Section */}
          <div className="relative size-72 sm:size-80 mx-auto md:mx-0 md:flex-1">
            <Image
              src="/img/startup.webp"
              alt="Illustration of a startup workflow"
              fill
              className="object-contain"
              loading="lazy"
            />
          </div>

          {/* Text Section */}
          <div className="p-4 space-y-10 md:pt-10 md:flex-1">
            <div className="space-y-1">
              <h1
                id="target-audience-heading"
                className="font-degular font-semibold text-heading4 md:text-4xl"
              >
                Startups & MSMEs
              </h1>
              <p className="md:text-2xl text-xl font-light">
              Search for trusted resource providers tailored to your needs and get results in seconds with our robust rating and review system. Save time and focus on what truly matters—growing your business with expert support in funding, mentorship, networking, and more.
              </p>
            </div>

            <div className="space-y-1">
              <h1 className="font-degular font-semibold text-heading4 md:text-4xl">
              Resource Providers
              </h1>
              <p className="text-xl md:text-2xl font-light">
              Boost your revenue by generating high-quality leads through our platform. Gain better visibility and reach startups and MSMEs seeking legal, financial, digital marketing, and other services. Leverage data-driven insights, in-depth marketing analytics, and personalized recommendations to grow your business effectively.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Triangle bottom border - decorative */}
      <div
        className="w-full h-20 bg-repeat-x"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}
      ></div>
    </section>
  );
}

export default TargetAudienceSection;

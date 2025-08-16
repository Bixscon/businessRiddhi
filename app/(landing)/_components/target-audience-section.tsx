import Image from "next/image";

function TargetAudienceSection() {
  return (
    <section
      className="bg-gradient-to-tr from-[#9d0543] to-[#c80755] w-full py-4"
      aria-labelledby="target-audience-heading"
    >
      {/* Triangle top border - decorative */}
      <div
        className="w-full h-20 bg-repeat-x opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}
      ></div>
      {/* Main content - with max-width constraint */}
      <div className="max-w-screen-xl mx-auto px-4">
        <section className="py-3 md:py-4 lg:py-6 text-base-white space-y-4 md:flex md:space-y-0 md:gap-x-10 md:items-center">
          {/* Image Section */}
          <div className="relative size-72 sm:size-80 mx-auto md:mx-0 md:flex-1">
            <Image
              src="/img/Frame 427318688.png"
              
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
                Startups &amp; MSMEs
              </h1>
              <p className="font-light">
                Search what you need - Get instant resources - Gain momentum
              </p>
            </div>

            <div className="space-y-1">
              <h1 className="font-degular font-semibold text-heading4 md:text-4xl">
                Resource Providers
              </h1>
              <p className="font-light">
                List your business for free - Gain visibility - Buy subscription -
                Generate leads &amp; advanced features
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Triangle bottom border - decorative */}
      <div
        className="w-full h-20 bg-repeat-x opacity-25"
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

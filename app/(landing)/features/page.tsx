import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const page = () => {
  return (
    <div className="pb-10">
      <div id="product" className="pt-8 max-w-[1200px] mx-auto ">
        <h1 className="text-center font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug text-[#3f3f3f]">
          Product
        </h1>
        <p className="font-medium text-center px-24">
          Visey is the ultimate platform connecting Indian startups, MSMEs, and
          businesses, enabling them to thrive in a competitive landscape. With
          access to essential startup resources, innovative tools, and a
          collaborative network, we empower entrepreneurs to achieve their goals
          faster and more efficiently. Explore how Visey can be your partner in
          growth and success today!
        </p>
      </div>

      <div className="pt-16 max-w-[1200px] mx-auto">
        <h1 className="text-center text-3xl font-semibold">
          For Startup & MSMEs
        </h1>
        <div className="flex flex-col gap-16 pt-12 px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex flex-col gap-4 max-w-[400px]">
              <div>
                <h2 className="font-semibold">Efficient Search Engine</h2>
                <p className="font-medium">
                  Find the resources your startup or MSME needs quickly and
                  accurately. Our advanced search delivers relevant results,
                  saving you time and effort.
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Personalized Recommendations</h2>
                <p className="font-medium">
                  Receive tailored suggestions that align with your business
                  goals and industry needs. Visey’s smart engine connects
                  startups and MSMEs with the most valuable resources, tools,
                  and partnerships.
                </p>
              </div>
            </div>
            <div className="w-[320px] md:w-[630px] h-[350px] relative">
              <Image
                src="/img/Homepage-1.webp"
                alt="Placeholder About Image"
                fill={true}
                objectFit="contain"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-[320px] md:w-[630px] h-[350px] relative">
              <Image
                src="/img/Ratings-2.webp"
                alt="Placeholder About Image"
                fill={true}
                objectFit="contain"
                priority
              />
            </div>
            <div className="flex flex-col gap-4 max-w-[400px]">
              <div>
                <h2 className="font-semibold">All Resources at one-stop</h2>
                <p className="font-medium">
                  Access everything your startup needs—from startup funding to
                  networking and business growth tools—all on one platform.
                  Simplify your entrepreneurial journey without juggling
                  multiple platforms or subscriptions.
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Robust Ratings & Reviews</h2>
                <p className="font-medium">
                  Make confident decisions with community-driven ratings and
                  reviews. Learn from other Indian startups and MSMEs about the
                  most effective business tools and resources
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 max-w-[1200px] mx-auto">
        <h1 className="text-center text-3xl font-semibold">
          For Resource Providers
        </h1>
        <div className="flex flex-col gap-16 pt-12 px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-[320px] md:w-[630px] h-[350px] relative">
              <Image
                src="/img/Resource-3.webp"
                alt="Placeholder About Image"
                fill={true}
                objectFit="contain"
                priority
              />
            </div>
            <div className="flex flex-col gap-4 max-w-[400px]">
              <div>
                <h2 className="font-semibold"> Reach to Startups & SMEs</h2>
                <p className="font-medium">
                  Tap into a focused audience of Indian startups and MSMEs
                  actively seeking the resources you provide. Connect
                  effortlessly with high-potential entrepreneurs and build
                  lasting partnerships.
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Simplify Traction Building</h2>
                <p className="font-medium">
                  Easily build traction by connecting with startups and MSMEs
                  looking for your business resources. Strengthen your presence
                  in the startup ecosystem and streamline your marketing
                  efforts.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex flex-col gap-4 max-w-[400px]">
              <div>
                <h2 className="font-semibold">Warm Leads Delivered</h2>
                <p className="font-medium">
                  Access warm leads from startups and MSMEs already interested
                  in your business solutions. Increase your conversion rates
                  with a qualified, engaged audience.
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Marketing Analytics Dashboard</h2>
                <p className="font-medium">
                  Leverage data-driven insights to better understand your
                  audience. Track engagement, identify what resonates, and
                  optimize your marketing strategies to meet the needs of Indian
                  entrepreneurs.
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Cut Promotional Costs</h2>
                <p className="font-medium">
                  Promote your products and resources directly to a qualified
                  audience of startups and MSMEs. Save significantly on
                  traditional marketing costs while driving meaningful
                  engagement.
                </p>
              </div>
            </div>
            <div className="w-[320px] md:w-[630px] h-[350px] relative">
              <Image
                src="/img/Resource-4.webp"
                alt="Resource-4.webp"
                fill={true}
                objectFit="contain"
                priority
              />
            </div>
          </div>
        </div> {/* ✅ this was missing */}
      </div>

      <div className="flex items-center justify-center pt-16 pb-16">
        <Button>
          <div className="flex items-center gap-2">
            <Link href="/demo-account-type" className="flex items-center gap-4">
              <span>Start now</span>
              <ArrowUpRight />
            </Link>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default page;

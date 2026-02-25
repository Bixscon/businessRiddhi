import { Envelope, Lifebuoy, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className="m-8 mb-24 p-8 border-2 rounded-xl">
      <div>
        <h1 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug text-[#3f3f3f]">
          Contact Us
        </h1>
        <p className="font-medium">
          We are focused on helping you by delivering a seamless and supportive experience.
          Whether you’re just exploring the platform or a business looking to list your
          business, our expert support team is here to guide you every step of the way.
        </p>
      </div>

      <div className="pt-16">
        <h2 className="font-semibold text-3xl mb-8 text-center">
          How can we help?
        </h2>

        <div className="max-w-screen-2xl mx-auto flex flex-col gap-6 md:flex-row">

          {/* Real-Time Support */}
          <div className="px-10 pt-10 pb-10 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1">
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
                  <WhatsappLogo size={36} className="text-[#709B08]" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-3xl leading-tight">
                    Real-Time Support
                  </h3>
                  <p className="text-lg font-medium">
                    Have a question or need immediate assistance? Message us on WhatsApp,
                    and our support team will get in touch with you.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-16">
                <Button
                  asChild
                  variant="landing"
                  className="text-base font-semibold text-neutrals-1000 px-4 py-2"
                >
                  <a
                    href="https://wa.me/917827586754?text=Hello%20Visey%20Team"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Whatsapp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Business Support */}
          <div className="px-10 pt-10 pb-10 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1">
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
                  <Envelope size={36} className="text-[#709B08]" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-medium leading-tight">
                    Business Support
                  </h3>
                  <p className="text-lg font-medium">
                    For personalized support tailored to your business needs,
                    please email us and our team of experts will respond promptly.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-16">
                <Button
                  asChild
                  variant="landing"
                  className="text-base font-semibold text-neutrals-1000 px-4 py-2"
                >
                  <a href="mailto:contact@visey.co.in?subject=Inquiry%20from%20Visey%20Website">
                    contact@visey.co.in
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Help Center */}
          <div className="px-10 pt-10 pb-10 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1">
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
                  <Lifebuoy size={36} className="text-[#709B08]" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-gothic font-medium text-3xl leading-tight">
                    Help Center
                  </h3>
                  <p className="font-medium text-lg">
                    Looking for guidance? Our Help Center is your go-to resource
                    for FAQs, step-by-step guides, and insightful articles designed
                    to make your journey with Visey smooth and productive.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-16">
                <Button
                  asChild
                  variant="landing"
                  className="text-base font-semibold text-neutrals-1000 px-4 py-2"
                >
                  <a
                    href="https://wa.me/917827586754?text=Hello%20Visey%20Team"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Help
                  </a>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Contact Form Section
      <div className="pt-16">
        <h2 className="font-semibold text-2xl text-center">
          We are looking forward to assisting you!
        </h2>

        <form className="bg-primary-landing rounded-2xl mx-auto p-8 mt-9 mb-1 md:w-8/12 xl:w-6/12 md:rounded-full md:flex md:items-center md:gap-x-6">
          <div className="md:flex-1">
            <Input
              className="border-0 shadow-none h-12 text-base-white placeholder:text-base-white"
              placeholder="Your name"
            />
            <Separator />
            <Input
              className="border-0 shadow-none h-12 text-base-white placeholder:text-base-white"
              placeholder="Your email"
            />
          </div>

          <Button
            asChild
            variant="landing"
            className="w-11/12 py-3 px-4 rounded-full shadow-2xl mt-6 md:mt-0 md:shrink-0 md:w-auto md:p-6 md:aspect-square"
          >
            <a
              href="https://wa.me/917827586754?text=Hello%20Visey%20Team"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col items-center justify-center text-base font-normal">
                <span>Get In</span>
                <span>Touch</span>
              </div>
            </a>
          </Button>
        </form>
      </div>
      */}
    </div>
  );
};

export default page;

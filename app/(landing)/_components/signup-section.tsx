import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

function SignUpSection() {
  return (
    <div className="relative -mt-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute w-full inset-0 scale-125 md:scale-100">
        <Image
          src="/waves-background.png"
          fill
          className="object-cover"
          alt="Wavy background illustrating seamless connection"
        />
      </div>

      {/* Help Center CTA */}
      <p className="relative text-center pt-6 text-neutrals-700 text-lg font-medium">
        Still have more Questions? Contact our{" "}
        <span className="font-bold underline cursor-pointer">Help Center</span>.
      </p>

      {/* Signup Section */}
      <section className="relative py-40 px-4">
        <div className="text-center">
          {/* Headings */}
          <div className="space-y-2">
            <h2 className="text-4xl leading-relaxed font-semibold font-degular">
              We help startups and MSMEs meet their resource needs quickly
            </h2>
            <p className="text-neutrals-700 text-xl">
              Stay ahead with latest updates you won&apos;t want to miss.
            </p>
          </div>

          {/* Signup Form */}
          <form
            action="#"
            className="bg-primary-landing  bg-gradient-to-tr from-[#9d0543] to-[#c80755] rounded-2xl mx-auto p-8 mt-9 mb-1 md:w-8/12 xl:w-6/12 md:rounded-full md:flex md:items-center md:gap-x-6"
            aria-labelledby="signup-form-title"
          >
            <div className="md:flex-1">
              <Input
                type="text"
                aria-label="Your name"
                className="border-0 shadow-none h-12 text-base-white placeholder:text-base-white mb-4 md:mb-0"
                placeholder="Your name"
              />
              <Separator />
              <Input
                type="email"
                aria-label="Your email"
                className="border-0 shadow-none h-12 text-base-white placeholder:text-base-white"
                placeholder="Your email"
              />
            </div>
            <Link href="/login">
              <Button
                variant="landing"
                aria-label="Sign up for updates"
                className="w-11/12 py-3 px-4 rounded-full shadow-2xl mt-6 md:mt-0 md:shrink-0 md:w-auto md:p-6 md:aspect-square cursor-pointer"
              >
                Sign up
              </Button>
            </Link>
          </form>

          {/* Terms Agreement */}
          <p className="text-sm">
            By subscribing, you agree with our{" "}
            <span className="font-bold underline cursor-pointer">
              Terms of Use
            </span>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

export default SignUpSection;

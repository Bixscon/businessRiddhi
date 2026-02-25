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
      <p className="relative text-center mt-10 text-neutrals-700 text-lg font-medium">
        Still have more Questions? Contact our{" "}
        <span className="font-bold underline cursor-pointer">Help Center</span>.
      </p>

      {/* Signup Section */}
      <section className="relative py-20 mt-10 px-4">
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
     <a
  href="https://chat.whatsapp.com/FaMyrpcXefrJSZXtP8YQdQ"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#9d0543] to-[#c80755] text-white font-semibold hover:shadow-lg transition-all duration-300"
>
  Join the WhatsApp Community
</a>
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

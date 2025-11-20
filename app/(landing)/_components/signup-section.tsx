"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

function SignUpSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Save to excel/Google sheet via API
    await fetch("/api/save-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    // 2️⃣ Redirect to your WhatsApp community
    window.location.href = "https://chat.whatsapp.com/YOUR_COMMUNITY_LINK";
  };

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
        <span className="font-bold underline cursor-pointer">
          Help Center
        </span>.
      </p>

      {/* Signup Section */}
      <section className="relative py-20 mt-10 px-4">
        <div className="text-center">
          <div className="space-y-2">
            <h2 className="text-4xl leading-relaxed font-semibold font-degular">
              We help startups and MSMEs meet their resource needs quickly
            </h2>
            <p className="text-neutrals-700 text-xl">
              Stay ahead with latest updates you won&apos;t want to miss.
            </p>
          </div>

          {/* Updated Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-primary-landing  bg-gradient-to-tr from-[#9d0543] to-[#c80755] rounded-2xl mx-auto p-8 mt-9 mb-1 md:w-8/12 xl:w-6/12 md:rounded-full md:flex md:items-center md:gap-x-6"
          >
            <div className="md:flex-1">
              <Input
                type="text"
                aria-label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-0 shadow-none h-12 text-base-white placeholder:text-base-white mb-4 md:mb-0"
                placeholder="Your name"
                required
              />
              <Separator />
              <Input
                type="email"
                aria-label="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-0 shadow-none h-12 text-base-white placeholder:text-base-white"
                placeholder="Your email"
                required
              />
            </div>

            <Button
              type="submit"
              variant="landing"
              className="w-11/12 py-3 px-4 rounded-full shadow-2xl mt-6 md:mt-0 md:shrink-0 md:w-auto md:p-6 md:aspect-square cursor-pointer"
            >
              Sign up
            </Button>
          </form>

          <p className="text-sm">
            By subscribing, you agree with our{" "}
            <span className="font-bold underline cursor-pointer">
              Terms of Use
            </span>.
          </p>
        </div>
      </section>
    </div>
  );
}

export default SignUpSection;

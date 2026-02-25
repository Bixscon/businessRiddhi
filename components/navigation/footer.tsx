import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import {
  Envelope,
  LinkedinLogo,
  Phone,
  WhatsappLogo,
  YoutubeLogo,
  InstagramLogo,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const footerData = [
  {
    title: "Product",
    items: [
      { name: "About", link: "/about" },
      { name: "Products", link: "/about#product" },
      { name: "Pricing", link: "/pricing" },
      { name: "Team", link: "/about#team" },
      { name: "Blog", link: "/blogs" },
      {
        name: "Resource Partner Onboarding",
        link: "https://luma.com/z6mf925b",
      },
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Terms & Conditions", link: "/tnc" },
      { name: "Cookie Policy", link: "/tnc#cookie" },
      { name: "Privacy Policy", link: "/tnc#privacy" },
      { name: "Partner With Us", link: "/partner-with-us" },
    ],
  },
];

function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-neutrals-100  p-10 space-y-4", className)}>
      <div className="space-y-4 text-center max-w-screen-xl mx-auto">
        <Image
          src="/logo-black.webp"
          width={140}
          height={50}
          alt="visey logo"
          className="mx-auto"
        />
        <p>
          All rights Reserved Bixscon Technologies Pvt. Ltd. | Designed and built with love - Copyright© 2026
        </p>

        <Separator className="bg-primary mt-6" />
      </div>
      <div className="space-y-4 md:flex md:justify-between md:space-y-0 max-w-screen-xl mx-auto pt-4">
        {footerData.map((item) => (
          <div className="space-y-2" key={item.title}>
            <h2 className="font-semibold text-xl">{item.title}</h2>
            <div className="space-y-8">
              {item.items.map((item, idx) => (
                <Link href={item.link} key={idx}>
                  <p className="text-[#545454]">{item.name}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="font-semibold text-xl">Contact Us</h2>
            <div className="space-y-2">
              <Link href="tel:+917827586754">
                <div className="flex items-center space-x-2">
                  <Phone size={20} />
                  <span className="text-[#545454]">+91 78275 86754</span>
                </div>
              </Link>
              <div>
                <div className="flex items-center space-x-2">
                  <Envelope size={20} />
                  <span className="text-[#545454] underline">
                    <Link href="mailto:contact@visey.co.in">
                      contact@visey.co.in
                    </Link>
                  </span>
                </div>
              </div>
              <Link href="/partner-with-us">
                <span className="text-[#545454]">Partner with Us</span>
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold text-xl">Community</h2>
             <Link key="join-now" href="https://chat.whatsapp.com/FaMyrpcXefrJSZXtP8YQdQ?mode=ac_t">
                            <Button
                              variant="nav"
                              size="md"                  style={{
                                color: 'black',              
                                borderRadius: '20px',   
                                padding: '9px 20px',
                                background: 'linear-gradient(#B8F272, #B8F272) padding-box, linear-gradient(90deg, #FF64A3, #CF0E5E) border-box',
                                border: '2px solid transparent'
                              }}
                            >
                             Join Now
                            </Button>
                          </Link>
      
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="font-semibold text-xl">Social Links</h2>
          <div className="flex gap-x-2">
            <Link href="https://chat.whatsapp.com/B7qoH1FiKGKKK7rAKAo4nn">
              <WhatsappLogo size={24} />
            </Link>
            <Link href="https://youtube.com/@viseyindiaofficial">
              <YoutubeLogo size={24} />
            </Link>
            <Link href="https://www.linkedin.com/company/viseycompany">
              <LinkedinLogo size={24} />
            </Link>
            <Link href="https://www.instagram.com/visey.co.in">
              <InstagramLogo size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import ProfileCard from "@/app/(landing)/_components/ProfileCard";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

const profiles = [
  {
    name: "Jhonty Dhol",
    role: "Founder",
    image: "/img/Jhonty_dhol.jpg",
    linkedIn: "https://www.linkedin.com/in/jhonty-dhol-8997b7227/",
  },
  {
    name: "Riddhima",
    role: "Founder",
    image: "/img/Riddhima Headshot 2.webp",
    linkedIn: "https://www.linkedin.com/in/riddhima-goel-36b3a6217/",
  },
  // {
  //   name: "Rahul Chaurasiya",
  //   role: "Tech Lead",
  //   image: "/img/Rahul_chaurasiya.jpg",
  //   linkedIn: "https://www.linkedin.com/in/rahul-chourasiya-b80882254/",
  // },
  // {
  //   name: "Sahil Singh Tomar",
  //   role: "Fullstack Developer",
  //   image: "/img/sahil_singh_tomar.jpg",
  //   linkedIn: "https://www.linkedin.com/in/sahil-singh-tomar-83b22b22a/",
  // },
  // {
  //   name: "Varun Singh",
  //   role: "Frontend Developer",
  //   image: "/img/varun_bhatt.jpg",
  //   linkedIn: "https://www.linkedin.com/in/varun-bhatt-653109213/",
  // },
  // { name: "Paras", role: "AI/ML", image: "/img/Paras.jpg", linkedIn: "#" },
  // {
  //   name: "Sparsh Jain",
  //   role: "AI/ML",
  //   image: "/img/Sparsh_jain.jpg",
  //   linkedIn: "https://www.linkedin.com/in/sparsh-jain-1bb598298/",
  // },
];
export const metadata: Metadata = {
  title: "About Visey | Empowering Entrepreneurs in India's Startup Ecosystem",
  description:
    "At Visey, we connect Indian entrepreneurs with trusted resource providers, empowering them with the tools, mentorship, and support they need to succeed.",
};
const page = () => {
  return (
    <div className="pb-10">
      <div className="absolute inset-x-0 top-10 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-60">
        <Image
          src="/wave-real-2.png"
          fill={true}
          className="object-cover object-left"
          alt="bg-wave"
          priority
        />
      </div>
      <div className="flex flex-col justify-center items-center pt-32 max-w-[1000px] mx-auto pb-20">
        <h1 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug text-[#3f3f3f]">
          About Visey
        </h1>
        <div className="font-medium flex flex-col justify-center items-center gap-6 mt-5 text-base px-10 text-justify">
          <p>
            Welcome, Indian entrepreneurs! At Visey, we believe every visionary
            has the potential to change the world, and we’re here to make that
            journey more accessible and enriching. As active participants in the
            Indian startup ecosystem, we’ve experienced firsthand the challenges
            entrepreneurs face. We&#39;ve navigated the uncertainty and
            resilience required to succeed, and we truly understand the core
            struggles of entrepreneurs.
          </p>
          <p>
            To break through these barriers, we created Visey—a platform that
            connects startups with trusted resource providers across India’s
            entrepreneurial ecosystem. Whether you’re a startup looking for
            resources or a resource provider seeking clients, we help foster the
            right connections to fuel your growth.
          </p>
          <p>
            The Indian startup ecosystem is often centered in Tier 1 cities, but
            some of the brightest entrepreneurial talents come from Tier 2, Tier
            3, and rural areas. These entrepreneurs face immense challenges, but
            Visey is here to level the playing field, ensuring that every
            dreamer, regardless of their background, gets equal access to
            opportunities.
          </p>
        </div>
      </div>
      <div
        className="w-full h-20 bg-repeat-x opacity-10 mb-4"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="bg-primary-landing relative py-4">
        <div
          className="relative rotate-180 w-full h-20 bg-repeat-x"
          style={{
            backgroundImage: "url('/triangle.png')",
            backgroundSize: "100px 100%",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="max-w-[1000px] mx-auto py-16 text-base-white">
          <div className="px-12">
            <h2 className="text-center text-[32px] font-medium pb-4">
              Mission
            </h2>
            <h3 className="text-2xl text-center font-medium pb-2">
              &#34;Empowering Indian entrepreneurs with a world-class,
              accessible ecosystem that ignites growth, innovation, and lasting
              impact.&#34;
            </h3>
            <p className="text-base text-center">
              At the core of Visey is a vision to provide an accessible
              entrepreneurial ecosystem that supports Indian entrepreneurs in
              their pursuit of success. We are committed to providing the
              resources, mentorship, and growth solutions that every startup
              needs to thrive. Our ecosystem encourages creativity,
              collaboration, and growth, ensuring that every entrepreneur has
              the tools they need to achieve their dreams
            </p>
          </div>
          <Separator className="my-10" />
          <div className="px-12">
            <h2 className="text-center text-[32px] font-medium pb-4">Vision</h2>
            <h3 className="text-2xl text-center font-medium pb-2">
              &#34;A global landscape where every entrepreneur has the resources
              and support to thrive, no matter where they are.&#34;
            </h3>
            <p className="text-base text-center">
              We envision a future where no entrepreneurial spirit is hindered
              by geographical boundaries. Our goal is to create a global
              ecosystem where entrepreneurs from every corner of India,
              including rural areas, have access to the resources, mentorship,
              and connections they need to achieve their goals. Together, we can
              break barriers, unlock potential, and inspire the next generation
              of leaders.
            </p>
          </div>
        </div>
        <div
          className="w-full h-20 bg-repeat-x"
          style={{
            backgroundImage: "url('/triangle.png')",
            backgroundSize: "100px 100%",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="pt-4">
        <div
          className="relative rotate-180 w-full h-20 bg-repeat-x opacity-10"
          style={{
            backgroundImage: "url('/triangle.png')",
            backgroundSize: "100px 100%",
            backgroundPosition: "center",
          }}
        ></div>
        <div id="team" className="max-w-[1200px] mx-auto pt-12">
          <h1 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug text-[#3f3f3f] text-center">
            Meet the Team Behind Visey
          </h1>
          <p className="font-medium text-center pt-2 lg:px-24 md:px-4">
            Our team is a passionate mix of innovators, strategists, and
            dreamers, all united by one mission: to elevate India’s
            entrepreneurial spirit. Together, we are building a brighter, more
            inclusive future for startups, one bold step at a time.
          </p>
          <div className="pt-20 flex flex-wrap justify-around gap-12">
            {profiles.map((profile, idx) => {
              return (
                <div key={idx}>
                  <ProfileCard profile={profile} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

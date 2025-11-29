"use client";
import { useEffect, useState } from "react";
import { 
  FiMail, 
  FiPhone, 
  FiLinkedin, 
} from "react-icons/fi";
import { useAbout } from "@/hooks/useAbout";
import { About as AboutType } from "@/types/about";

const AboutPage = () => {
  const { data, loading, error } = useAbout();

   const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
const [text, setText] = useState("");
  const titles =
    data?.find((item: AboutType) => Array.isArray(item.title) && item.title.length)?.title || [];

  // ✨ Simple typing effect
  useEffect(() => {
    if (!titles.length) return;
    if (char < titles[index].length) {
      const timeout = setTimeout(() => setChar((c) => c + 1), 100);
      setText(titles[index].slice(0, char + 1));
      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setChar(0);
        setIndex((i) => (i + 1) % titles.length);
      }, 1200);
      return () => clearTimeout(pause);
    }
  }, [char, index, titles]);


 if (loading) return <p className="text-center mt-10">Loading about...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  return (
    <section className="pt-6 pb-20 md:pb-32 fade-in-up" id="home">
      {/* 🌟 Top Header */}
      <div className="grid grid-cols-2 sm:grid-cols-3 items-center  pb-4 mb-8">
        {/* Left */}
<h5 className="flex items-center gap-2 ">
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full dot opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 dot"></span>
  </span>
  Open To Work
</h5>

    
</div>
{/* 💼 About Section */}
{data &&
  data.map((item: AboutType) => (
    <main
      key={item._id}
      className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center"
    >
      {/* 🖼 Right Side (Profile Image) */}
      <div className="md:col-span-5 order-first md:order-last flex justify-center md:justify-end">
        {item.profilePicture && (
          <img
            src={item.profilePicture}
            alt={item.name}
            className="rounded-full object-cover h-96 w-96"
          />
        )}
      </div>

      {/* 📝 Left Side (Title, Name, and Contact Info) */}
      <div className="md:col-span-7 grid gap-8">
        {/* 🔠 Title + Name */}
        <div className="grid gap-2">
          <h4>{text}</h4>
          <h1>{item.name}</h1>
        </div>

        {/* 📇 Contact Info Grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 ">
          {/* Row 1 */}
          <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
            <FiMail className="icon" />
             <a
              href={`mailto:${item.email}`}
            target="_blank"
              rel="noopener noreferrer"
              className="anker"
            >
       <span className="inline">{item.email.slice(0, 27)}...</span>
            </a>
          </div>
          <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
            <FiPhone className="icon" />
 <a
    href={`https://wa.me/${item.phone.replace(/\D/g, "")}`}
    target="_blank"
    rel="noopener noreferrer"
    className="anker"
  >
    {item.phone}
  </a>            
          </div>

          {/* Row 2 */}
          <div className="flex items-center  gap-2  sm:col-span-1">
            <FiLinkedin className="icon" />
            <a
              href={
    item.linkedin?.startsWith("http")
      ? item.linkedin
      : `https://${item.linkedin}`
  }
             target="_blank"
              rel="noopener noreferrer"
              className="anker md:text-nowrap "
            >
              {item.linkedin}
            </a>
          </div>
          {/* <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
            <FiMapPin className="icon" />
            <span>{item.address}</span>
          </div> */}
        </div>
      </div>
        </main>
  ))}


    </section>
  );
};

export default AboutPage;

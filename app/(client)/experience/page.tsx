"use client";
import Link from "next/link";
import { useExperience } from "@/hooks/useExperience";
import { experience as ExperienceType } from "@/types/experience";
import { MdArrowOutward } from "react-icons/md";
const ExperiencePage = () => {
  const { data, loading, error } = useExperience();

  if (loading) return <p className="text-center mt-10">Loading experience...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section id="experience">
         <div className="pt-6 pb-20 md:pb-52 fade-in-up">
  <h2>Work Experience</h2>
  {data && data.length > 0 ? (
    data.map((exp: ExperienceType) => (
      <div key={exp._id} className="relative mb-16 md:pl-10 pl-4 lg:pl-16">
      {/* 🔹 Vertical line (visible only on large screens) */}
<div className="lg:block absolute left-0 md:left-5 top-4 bottom-4 w-0.5 bg-gray-400/40"></div>

{/* 🔹 Top dot (start of experience) */}
<div className="lg:block absolute -left-2 md:left-[0.8rem] top-0 w-4 h-4 rounded-full bg-(--primary) shadow-[0_0_10px_var(--primary)]"></div>

{/* 🔹 Bottom dot (end of experience) */}
<div className="lg:block absolute -left-2 md:left-[0.8rem] bottom-0 w-4 h-4 rounded-full bg-(--primary) shadow-[0_0_10px_var(--primary)]"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 mb-2">
        <h5 className="justify-self-start">{exp.position}</h5>
     <h5 className="justify-self-start md:justify-self-end">
  {exp.startDate
    ? new Date(exp.startDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : 
    "Present"}{" "}
  <span className="text-(--primary)  decoration-(--primary)">
    To
  </span>{" "}
  {exp.endDate
    ? new Date(exp.endDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Present"}
</h5>


        </div>
        <div>
          <h4>{exp.companyName}</h4>
        </div>
        <div>
          <p>{exp.description}</p>
        </div>
        <div className="mt-10">
  <h4>Technologies</h4>
  {
    exp.technologies && exp.technologies.length > 0 ? (
      <ul className="list-disc list-inside grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
        {exp.technologies.map((tech, index) => (
      <li
          key={index}
          className="border border-gray-400/30 text-sm text-center rounded-lg px-3 py-2  hover:bg-gray-800/40 transition duration-200"
        >
          {tech}
        </li>
     ))}
      </ul>
    ) : (
      <p>No technologies listed.</p>
    )
  }
          </div>
          <div className="mt-10">
  <h4>Selected Projects</h4>
{exp.projects && exp.projects.length > 0 && (
  <div className="">
    {exp.projects && exp.projects.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-6">
    {exp.projects.map((project, index) => (
      <Link
        key={index}
       href={`/experience/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
        className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
      >
        <img
          src={project.projectImage}
          alt={project.title}
          className="w-full h-52  transform group-hover:scale-105 transition duration-500"
        />

        <div className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition duration-300">
          <MdArrowOutward size={18} />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
          <h5 className="text-white text-lg font-semibold mb-1">
            {project.title}
          </h5>
        </div>
      </Link>
    ))}
  </div>
)}
     </div>
)}

</div>


  </div>
    ))
  ) : (
    <p>No experience data available.</p>
  )}
</div>
</section>

  );
};

export default ExperiencePage;

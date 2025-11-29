"use client";

import { useExperience } from "@/hooks/useExperience";
import { experience as ExperienceType, Project as ProjectType } from "@/types/experience";
import { notFound, useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import React from "react";

type ProjectPageProps = {
  params: Promise<{
    title: string;
  }>;
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const { title } = React.use(params);
  const router = useRouter();
  const { data, loading, error } = useExperience();

  if (loading) return <p className="text-center mt-10">Loading project...</p>;
  if (error) return <p className="text-center">{error}</p>;
  if (!data || !Array.isArray(data)) return notFound();

  let foundProject: ProjectType | null = null;
  let foundExperience: ExperienceType | null = null;

  for (const exp of data) {
    const project = exp.projects?.find(
      (p) =>
        p.title.toLowerCase().replace(/\s+/g, "-") ===
        decodeURIComponent(title.toLowerCase())
    );
    if (project) {
      foundProject = project;
      foundExperience = exp;
      break;
    }
  }

  if (!foundProject) return notFound();

  const otherProjects =
    foundExperience?.projects?.filter((p) => p.title !== foundProject?.title) || [];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 grid gap-12 fade-in-up">
      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 w-28"
      >
        <MdArrowBackIosNew size={18} /> Back
      </button>

      {/* 🧠 Project Detail */}
      <div className="grid gap-8">
        <img
          src={foundProject.projectImage}
          alt={foundProject.title}
          className="w-full h-full rounded-lg"
        />

        <div className="grid gap-3">
          <h2 className="font-semibold text-2xl">{foundProject.title}</h2>
<p dangerouslySetInnerHTML={{ __html: foundProject.description || "" }} />

        </div>
      </div>

      {/* ⚙️ Technologies */}
      {foundExperience &&  Array.isArray(foundExperience.technologies) && foundExperience?.technologies?.length > 0 && (
        <div className="grid gap-4">
          <h3 className="font-medium text-lg">Technologies Used</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {foundExperience.technologies.map((tech, index) => (
              <li
                key={index}
                className="border rounded-md text-center py-2"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🧩 More Projects */}
      {otherProjects.length > 0 && (
        <div className="grid gap-6">
          <h2 className="font-semibold text-xl">More Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {otherProjects.map((p, index) => (
              <div
                key={index}
                onClick={() =>
                  router.push(
                    `/experience/${p.title.toLowerCase().replace(/\s+/g, "-")}`
                  )
                }
                className="grid gap-2 p-2 rounded-xl overflow-hidden border cursor-pointer hover:shadow-md transition"
              >
                <img
                  src={p.projectImage}
                  alt={p.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-3">
                  <h5 className="font-medium">{p.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

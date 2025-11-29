"use client";

import { useSkillsAndTools } from "@/hooks/useSkills";
import { SkillType } from "@/types/skills";

const SkillsPage = () => {
  const { data: skills, loading, error } = useSkillsAndTools("skill");
 const { data: tools, loading: loadingTools, error: errorTools } = useSkillsAndTools("tool");
  if (loading) return <p className="text-center mt-10">Loading skills...</p>;
  if (error) return <p>{error}</p>;

 // ✅ Only group skills that have a level — prevents “Other” showing
const groupedSkills =
  Array.isArray(skills) && skills.length > 0
    ? skills.reduce((acc: Record<string, SkillType[]>, skill: SkillType) => {
        if (skill.level) {
          if (!acc[skill.level]) acc[skill.level] = [];
          acc[skill.level].push(skill);
        }
        return acc;
      }, {})
    : {};

  return (
    <section className="pt-6 pb-20 md:pb-52 fade-in-up" id="skills">

    <h2>Skills & Tools</h2>
    {/* ====================== SKILLS ====================== */}
      {skills && skills.length > 0 ? (
        <div className="">
          {Object.entries(groupedSkills).map(([type, group]) => (
            <div key={type} className="">
              <h4>{type}</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-6">
                {group.map((skill) => (
                  <li key={skill._id || skill.name} className="flex items-center gap-4">
                    {/* Colored dot using your global variable */}
                    <span className="dot w-2 h-2 rounded-full shrink-0"></span>

                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No skills found.</p>
      )}
    {/* ====================== TOOLS ====================== */}
{tools && tools.length > 0 ? (
  <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-16 md:pt-28">
    {tools.slice(0, 8).map((tool) => (
      <li
        key={tool._id || tool.name}
        className=""
      >
        {tool.icon && (
          <img
            src={tool.icon}
            alt={tool.name}
            className="w-16 h-16 object-contain"
          />
        
        )}
 <h5 className="items-center">{tool.name}</h5>
    </li>
    ))}
  </ul>
) : (
  <p>No tools found.</p>
)}
 </section>
  );
};

export default SkillsPage;

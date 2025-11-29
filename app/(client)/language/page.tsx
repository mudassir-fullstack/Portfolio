"use client";

import { useLanguages } from "@/hooks/useLanguage";

const proficiencyLevels: Record<string, number> = {
  Beginner: 25,
  Intermediate: 50,
  Fluent: 75,
  Native: 100,
};

const LanguagesPage = () => {
  const { data, loading, error } = useLanguages();

  if (loading) return <p className="text-center mt-10">Loading languages...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="pt-6 pb-20 md:pb-52 fade-in-up" id="skills">
      <h2>Languages</h2>

      <div className="grid grid-cols-1 gap-4">
        {data.map((lang, index) => (
          <div key={lang._id || index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span>{lang.name}</span>
            </div>
{/* Progress bar */}
<div className="grid grid-cols-12 w-full">
  <div className="md:col-span-6 col-span-12 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
    <div
      className="dot h-2 rounded-full transition-all duration-500"
      style={{
        width: `${proficiencyLevels[lang.proficiency] || 0}%`,
      }}
    ></div>
  </div>
</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LanguagesPage;

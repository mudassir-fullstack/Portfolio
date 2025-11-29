"use client";

import { useLinks } from "@/hooks/useLinks";

const LinksPage = () => {
  const { data, loading, error } = useLinks();

  if (loading) return <p className="text-center mt-10">Loading links...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="links" className="pt-6 pb-20 md:pb-52 fade-in-up">
      <h2>Social Links</h2>

      {data.length === 0 ? (
        <p>No links available yet.</p>
      ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-8 mt-8 justify-start items-start">
  {data.map((link) => (
    <a
      key={link._id || link.platform}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-start"
    >
      {link.icon && (
        <img
          src={link.icon}
          alt={link.platform}
          className="w-16 h-16"
        />
      )}
    </a>
  ))}
</div>
  )}
    </section>
  );
};

export default LinksPage;

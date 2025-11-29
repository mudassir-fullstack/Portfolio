"use client";

import { useAbout } from "@/hooks/useAbout";
import { About as AboutType } from "@/types/about";

const SummaryPage = () => {
  const { data, loading, error } = useAbout();  
    if (loading) return <p className="text-center mt-10">Loading summary...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>
    return (
      <section className="pt-6 pb-20 md:pb-52 fade-in-up">
        {data?.map((item: AboutType) => (   
        <section key={item._id} id="summary" className="grid gap-8">
          <div>
            <h2>Summary</h2>
            <p dangerouslySetInnerHTML={{ __html: item.description }} />

            </div>
        </section>
        ))}
      </section>
    );
}

export default SummaryPage;
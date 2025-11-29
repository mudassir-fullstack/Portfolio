"use client";

import { useCertificates } from "@/hooks/useCertificate";
import { MdOutlineArrowOutward } from "react-icons/md";

const CertificatesPage = () => {
  const { data, loading, error } = useCertificates();

  if (loading) return <p className="text-center mt-10">Loading certificates...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="certificate" className="pt-6 pb-20 md:pb-52 fade-in-up">
      <h2>Certificates</h2>

      {data.length === 0 ? (
        <p>No certificates available yet.</p>
      ) : (
        <div className="grid gap-10 mt-3">
          {data.map((cert) => (
            <div
              key={cert._id}
              className="
                grid grid-cols-1 sm:grid-cols-12 items-start gap-4
                
              "
            >
              {/* 🎓 Right side — title & organization */}
              <div className="sm:col-span-9">
                <h3 className="cursor-pointer">{cert.title}</h3>

                <div className="flex items-center gap-2 flex-wrap">
                  <h6>{cert.organization}</h6>

                  {/* 🔗 Clickable certificate icon */}
                  {Array.isArray(cert.certificateImages) &&
                    cert.certificateImages.length > 0 && (
                      <a
                        href={cert.certificateImages[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View Certificate"
                        className="inline-flex items-center"
                      >
                        <MdOutlineArrowOutward className="icon cursor-pointer hover:opacity-80 transition" />
                      </a>
                    )}
                </div>
              </div>

              {/* 📅 Left side — issue year */}
              <div className="sm:col-span-3 font-medium text-sm sm:text-right">
                <p>{cert.issueDate?.split("-")[0]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CertificatesPage;

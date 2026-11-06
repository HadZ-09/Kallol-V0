// function Project() {
//   return (
//     <section className="bg-[#0A192F] px-6 py-16 md:py-56 lg:px-64">
//       <p className="mb-10 flex items-center gap-4 text-base font-bold text-slate-200 md:text-4xl">
//         / projects
//         <span className="hidden h-px flex-1 bg-slate-700 sm:block" />
//         <a
//           href="https://github.com/HadZ-09"
//           className="text-base font-normal text-[#64ffda]"
//         >
//           View all projects
//         </a>
//       </p>

//       <a
//         href="https://productivity-dashboard-hazel-seven.vercel.app/"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block"
//       >
//         <img
//           src="/dashboard_project.png"
//           alt="Screenshot of the productivity dashboard"
//           className="mx-auto w-full max-w-4.5xl rounded-lg shadow-xl transition duration-300 hover:scale-[1.01]"
//         />
//       </a>
//     </section>
//   );
// }

// export default Project;

import { useState } from "react";

const projects = [
  {
    title: "Productivity Dashboard",
    image: "/dashboard_project.png",
    link: "https://productivity-dashboard-hazel-seven.vercel.app/",
    description: "A productivity dashboard built with React.",
  },
  // Add more projects here, e.g.:
  // {
  //   title: "Project Two",
  //   image: "/project_two.png",
  //   link: "https://...",
  //   description: "Short description.",
  // },
];

const arrowClass =
  "absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#64ffda] bg-[#0A192F]/80 p-3 text-[#64ffda] transition-colors hover:bg-[#64ffda]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]";

function Project() {
  const [index, setIndex] = useState(0);
  const count = projects.length;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  const current = projects[index];

  return (
    <section
      id="projects"
      className="bg-[#0A192F] px-6 py-16 md:py-56 lg:px-64"
    >
      <p className="mb-10 flex items-center gap-4 text-base font-bold text-slate-200 md:text-4xl">
        / projects
        <span className="hidden h-px flex-1 bg-slate-700 sm:block" />
        <a
          href="https://github.com/HadZ-09"
          className="text-base font-normal text-[#64ffda]"
        >
          View all projects
        </a>
      </p>

      <div className="relative mx-auto w-full max-w-4xl">
        <a
          href={current.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            key={current.title}
            src={current.image}
            alt={`Screenshot of ${current.title}`}
            className="w-full rounded-lg shadow-xl transition duration-300 hover:scale-[1.01]"
          />
        </a>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous project"
              className={`${arrowClass} -left-4 md:-left-16`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className={`${arrowClass} -right-4 md:-right-16`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold text-slate-200">{current.title}</h3>
        <p className="mt-2 text-slate-400">{current.description}</p>

        {count > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to ${p.title}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? "bg-[#64ffda]" : "bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Project;



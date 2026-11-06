const tech = [
  'Python',
  'PyTorch and scikit-learn',
  'FastAPI',
  'React.js',
  'JavaScript ES6+',
  'C++',
]

function Body() {
  return (
    <section
      id="about"
      className="bg-[#0A192F] px-6 py-15 text-slate-400 md:px-16 lg:px-32"
    >
      <div className="mx-auto max-w-5xl">
        {}
        <h2 className="mb-10 flex items-center gap-4 text-3xl font-bold text-slate-200 md:text-4xl">
          <span>/ about me</span>
          <span className="hidden h-px w-48 bg-slate-700 sm:block" />
        </h2>

        <div className="grid items-start gap-12 md:grid-cols-[3fr_2fr]">
          {/* Text column */}
          <div className="space-y-5 text-lg leading-8">
            <p>
              I'm a Computer Science student at{' '}
              <span className="font-bold text-[#64ffda]">IIIT Agartala</span>{' '}
              with a passion for software engineering, machine learning, and
              generative AI. I'm focused on building practical AI systems and
              continuously expanding my skills as the field evolves.
            </p>

            <p>Here are some technologies I've been working with:</p>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-base">
              {tech.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 before:text-xs before:leading-6 before:text-[#64ffda] before:content-['▸']"
                >
                  {item}    
                </li>
              ))}
            </ul>

            <p>
              In my free time, I'm nerdy about tech gadgets, I play high-skill
              games, travel whenever I can, and collect coins (yes, actual
              numismatics!).
            </p>
          </div>

          {/* Photo column */}
          <img
            src="/me_sunkissed_1.jpeg"
            alt="user pic"
            className="aspect-square w-full max-w-sm rounded-lg object-cover shadow-2xl shadow-black/50 md:justify-self-end"
          />
        </div>
      </div>
    </section>
  )
}

export default Body

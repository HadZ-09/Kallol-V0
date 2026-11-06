import './index.css'
import PendulumTree from './PendulumTree'

function TopBody() {
  return (
   <section className="flex items-top bg-[#0A192F] px-6 pt-4 pb-10 md:px-10 md:pt-6 md:pb-20 lg:px-32">
      <div className="mx-auto grid w-full max-w-6xl items-end gap-12 md:grid-cols-2">
        {/* Left: fractal tree */}
        <div className="h-[340px] w-full md:h-[500px] ">
          <PendulumTree
            color="#64ffda"
            tipColor="#8892b0"
            gravity={0.07}
            startAngle={90}
            ratio={0.69}
            thickness={0.05}
          />
        </div>

        {/* Right: text */}
        <div>
          <h1 className="text-5xl font-normal text-[#ccd6f6] md:text-6xl">
            hi, <span className="font-semibold text-[#64ffda]">Kallol</span> here.
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-blink bg-[#64ffda]"
            ></span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#8892b0]">
            Student by schedule, ML builder by obsession. I train models, break
            them, debug them, and fix them before letting them talk to the
            world.
          </p>

          <a
            href="mailto:daskallol671@gmail.com"
            className="mt-10 inline-flex items-center gap-3 rounded border border-[#64ffda] px-6 py-4 font-bold text-[#64ffda] transition-colors hover:bg-[#64ffda]/10"
          >
            {/* svg unchanged */}
            Say hi!
          </a>
        </div>
      </div>
    </section>
  )
}

export default TopBody
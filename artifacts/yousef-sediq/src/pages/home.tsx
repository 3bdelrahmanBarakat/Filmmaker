import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  Instagram, 
  Twitter, 
  Mail, 
  ArrowUpRight,
  MonitorPlay,
  Aperture,
  Film,
  Layers
} from "lucide-react";

// Helper for scroll animations
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-white selection:text-black">
      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50 mix-blend-difference"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-xl font-bold tracking-tight uppercase">
          Yousef Sediq
        </Link>
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          <a href="#work" className="hover:opacity-60 transition-opacity">Work</a>
          <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
        </div>
        <a href="mailto:hello@yousefsediq.com" className="font-mono text-xs uppercase tracking-widest hover:opacity-60 transition-opacity border-b border-white/30 pb-1">
          Available for Hire
        </a>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[100dvh] flex flex-col justify-end pb-24 px-6 md:px-12 overflow-hidden pt-32">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="z-10 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8 font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Based in Egypt
            <span className="opacity-30">/</span>
            Senior Video Editor & Filmmaker
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl md:text-6xl lg:text-8xl font-semibold tracking-tighter leading-[1.05] text-balance mb-8"
          >
            Crafting cinematic commercials & digital campaigns through storytelling.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 sm:items-center text-muted-foreground max-w-2xl text-lg md:text-xl"
          >
            <p className="leading-relaxed">
              5+ years helping brands turn ideas into films that connect with audiences. Specializing in editing, color, and motion.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Full-width Showreel */}
      <section id="work" className="relative w-full h-[70vh] md:h-[90vh] bg-muted overflow-hidden group">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-1000 opacity-80"
          src={`${import.meta.env.BASE_URL}generated_images/showreel.mp4`}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 rounded-full glass-panel flex items-center justify-center text-white backdrop-blur-md border border-white/20"
          >
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </motion.div>
        </div>
      </section>

      {/* Trusted By / Brands */}
      <section className="py-24 px-6 md:px-12 border-b border-border/50">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12 text-center">Trusted by 50+ Brand Partnerships</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale">
            {/* Generating typographic logos as placeholders for brand marks */}
            {['VOGUE', 'NIKE', 'RED BULL', 'PORSCHE', 'SONY'].map((brand, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold tracking-tighter uppercase">{brand}</span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Categories Showcase */}
      <section className="py-32 px-6 md:px-12">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-16">Areas of Expertise</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              title: "Video Editing", 
              desc: "Narrative pacing, rhythmic cuts, and seamless transitions.", 
              img: `${import.meta.env.BASE_URL}generated_images/cat-video-editing.jpg`,
              icon: <Film className="w-5 h-5" />
            },
            { 
              title: "Color Grading", 
              desc: "Cinematic looks, mood setting, and shot matching.", 
              img: `${import.meta.env.BASE_URL}generated_images/cat-color-grading.jpg`,
              icon: <Aperture className="w-5 h-5" />
            },
            { 
              title: "Motion Graphics", 
              desc: "Title design, 3D elements, and visual effects.", 
              img: `${import.meta.env.BASE_URL}generated_images/cat-motion-graphics.jpg`,
              icon: <Layers className="w-5 h-5" />
            },
            { 
              title: "Filmmaking", 
              desc: "Directing, framing, and on-set creative vision.", 
              img: `${import.meta.env.BASE_URL}generated_images/cat-filmmaking.jpg`,
              icon: <MonitorPlay className="w-5 h-5" />
            }
          ].map((cat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="group relative h-[400px] md:h-[500px] bg-muted overflow-hidden">
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-40" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    {cat.icon}
                  </div>
                  
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-semibold mb-2">{cat.title}</h3>
                    <p className="text-muted-foreground font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Software Grid */}
      <section className="py-24 px-6 md:px-12 bg-black border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter">Tools of the Trade</h2>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground max-w-xs">
                Mastery over industry standard post-production software.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
            {[
              "DaVinci Resolve", "Premiere Pro", "After Effects", 
              "Photoshop", "Illustrator", "Fusion", 
              "Audition", "Media Encoder", "Figma"
            ].map((tool, i) => (
              <FadeIn key={i} delay={i * 0.05} className="bg-black p-8 aspect-square flex flex-col justify-between group hover:bg-white/5 transition-colors">
                <span className="font-mono text-xs text-muted-foreground group-hover:text-white transition-colors">0{i+1}</span>
                <span className="text-lg font-medium tracking-tight text-muted-foreground group-hover:text-white transition-colors">{tool}</span>
              </FadeIn>
            ))}
            <div className="bg-black p-8 aspect-square hidden lg:block" />
            <div className="bg-black p-8 aspect-square hidden lg:block" />
            <div className="bg-black p-8 aspect-square hidden lg:block" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <FadeIn>
              <div className="aspect-[4/5] bg-muted relative overflow-hidden group">
                <img 
                  src={`${import.meta.env.BASE_URL}generated_images/about-editor.jpg`} 
                  alt="Yousef Sediq editing in studio" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
              </div>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7">
            <FadeIn>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">The Director's Cut</h2>
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tighter leading-tight mb-8">
                I believe editing is the final rewrite of any story. It dictates emotion, rhythm, and truth.
              </h3>
              
              <div className="space-y-6 text-muted-foreground text-lg md:text-xl font-light">
                <p>
                  I'm Yousef Sediq, a Senior Video Editor & Filmmaker based in Egypt with over 5 years of professional experience and 300+ completed projects under my belt.
                </p>
                <p>
                  My background is rooted in deep narrative structure—holding a BA in Drama & Theatre Criticism from Ain Shams University, and currently advancing my craft studying filmmaking at the Jesuit Cairo Cinema School.
                </p>
                <p>
                  I don't just cut clips; I build cinematic narratives. From commercial filmmaking to branded content, I blend editing, directing, motion graphics, and color grading to create pieces that demand attention and evoke emotion.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats & CTA Section */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-white text-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 border-b border-black/10 pb-24">
            <FadeIn delay={0.1}>
              <div className="text-5xl md:text-7xl font-semibold tracking-tighter mb-4">300+</div>
              <div className="font-mono text-xs uppercase tracking-widest text-black/60">Projects Delivered</div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-5xl md:text-7xl font-semibold tracking-tighter mb-4">5+</div>
              <div className="font-mono text-xs uppercase tracking-widest text-black/60">Years Experience</div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-5xl md:text-7xl font-semibold tracking-tighter mb-4">50+</div>
              <div className="font-mono text-xs uppercase tracking-widest text-black/60">Brand Partnerships</div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter leading-none mb-12 uppercase">
                Let's Work<br/>Together
              </h2>
              <a 
                href="mailto:hello@yousefsediq.com" 
                className="inline-flex items-center gap-4 bg-black text-white px-8 py-5 rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300 group"
              >
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-border/50 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} Yousef Sediq. All rights reserved.
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 hover:text-white text-muted-foreground transition-colors group">
              <Instagram className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-widest">Instagram</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-white text-muted-foreground transition-colors group">
              <Twitter className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-widest">Twitter</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
            </a>
            <a href="mailto:hello@yousefsediq.com" className="flex items-center gap-2 hover:text-white text-muted-foreground transition-colors group">
              <Mail className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-widest">Email</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

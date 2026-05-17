import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowRight,
  MessageCircle,
  Menu,
  X,
  Facebook
} from "lucide-react";

/** 
 * Asset Constants 
 */
const HERO_IMAGE = "/src/assets/images/hero_aesthetic_1779015465034.png";
const EXHIBITION_IMAGE = "/src/assets/images/kathakali_frame_pro_1779016895772.png";
const GTR_FRAME = "/src/assets/images/gtr_frame_pro_1779016853007.png";
const BIRD_FRAME = "/src/assets/images/bird_frame_pro_1779016872942.png";
const KATHAKALI_FRAME = "/src/assets/images/kathakali_frame_pro_1779016895772.png";

const collections = [
  { 
    id: "01", 
    name: "Speed & Style", 
    desc: "Modern aesthetics for dynamic spaces.", 
    img: GTR_FRAME,
    material: "Sport Series"
  },
  { 
    id: "02", 
    name: "Nature's Echo", 
    desc: "Delicate flora and fauna for serene interiors.", 
    img: BIRD_FRAME,
    material: "Traditional Craft"
  },
  { 
    id: "03", 
    name: "Heritage Soul", 
    desc: "The heartbeat of Kerala's artisan culture.", 
    img: KATHAKALI_FRAME,
    material: "Ethnic Series"
  },
];

/**
 * Animated Text Reveal Component
 */
const RevealText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="selection:bg-brand-primary selection:text-brand-cream">
      {/* 
        Ultra-Minimal Navigation 
      */}
      <nav className={`fixed top-0 left-0 w-full z-[100] px-10 py-8 flex justify-between items-center transition-all duration-500 uppercase text-[10px] tracking-[0.3em] font-bold ${isScrolled ? 'bg-brand-primary py-6 shadow-2xl' : 'bg-transparent'}`}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4"
        >
          <span className="font-serif text-3xl lowercase tracking-tighter text-brand-gold drop-shadow-md">Super Agencies.</span>
        </motion.div>

        <div className="hidden lg:flex items-center gap-16">
          {["Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-brand-cream hover:text-brand-gold transition-all drop-shadow-md">{item}</a>
          ))}
        </div>

        <div className="lg:hidden text-brand-cream">
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-brown text-brand-cream p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="font-serif text-3xl lowercase tracking-tighter">Super Agencies.</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-16 h-16 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-cream hover:text-brand-brown transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {["Gallery", "Process", "Shop", "Inquiry"].map((item, idx) => (
                <motion.a
                  key={item}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-6xl md:text-8xl font-serif italic hover:pl-8 transition-all duration-500"
                >
                  {item}.
                </motion.a>
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 opacity-70 text-[10px] uppercase tracking-widest font-black">
              <div>Kochi, Kerala</div>
              <div>+91 96335 70655</div>
              <div>Instagram</div>
              <div>Facebook</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero: Immersive Parallax */}
      <section className="relative h-screen bg-brand-primary overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={HERO_IMAGE} 
            className="w-full h-full object-cover brightness-75" 
            alt="Super Agencies Shop" 
          />
        </motion.div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-10 bg-brand-primary/20">
          <div className="max-w-4xl">
            <RevealText className="mb-6">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold">Wholesale Frame Manufacturers</span>
            </RevealText>
            <h1 className="text-brand-cream text-[14vw] md:text-[8vw] leading-[0.8] mb-12 italic tracking-tighter drop-shadow-2xl">
              Quality Frames. <br /> <span className="not-italic text-brand-gold">Wholesale Prices.</span>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
            </motion.div>
          </div>
        </div>
      </section>


      {/* 
        Collections: Grid-Border Style
      */}
      <section id="collection" className="py-40 bg-brand-cream">
        <div className="max-w-[1800px] mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32">
            <h2 className="text-7xl md:text-9xl tracking-tighter leading-none">The Series.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-brown/10">
            {collections.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ backgroundColor: "rgba(26, 18, 11, 0.02)" }}
                className="bg-brand-cream p-12 lg:p-16 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-brand-earth font-bold text-[12px] uppercase tracking-widest mb-10 block">{item.id}</span>
                  <div className="aspect-square overflow-hidden mb-12 rounded-lg group-hover:shadow-2xl transition-all duration-1000">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.name} />
                  </div>
                  <h3 className="text-4xl mb-6 text-brand-primary">{item.name}</h3>
                  <p className="text-brand-brown/80 font-light text-sm mb-10 max-w-xs">{item.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-8 border-t border-brand-brown/5">
                  <span className="text-[10px] uppercase font-black tracking-widest text-brand-teal">{item.material}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibition Section */}
      <section className="h-[80vh] bg-brand-primary relative overflow-hidden flex items-center justify-center">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 0.5 }}
           className="absolute inset-0"
        >
          <img src={EXHIBITION_IMAGE} className="w-full h-full object-cover" alt="Exhibition View" />
        </motion.div>
        <div className="relative z-10 text-brand-cream text-center max-w-4xl px-10">
            <h2 className="text-3xl md:text-5xl italic italic mb-10 leading-tight">
              Premium wholesale solutions <br/> for every frame.
            </h2>
        </div>
      </section>

      {/* 
        Inquiry / Contact 
      */}
      <section id="contact" className="py-40 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-60 mb-8 block"></span>
              <h2 className="text-6xl font-serif italic mb-12 tracking-tighter">Your wholesale <br /> partner.</h2>
              
              <div className="space-y-12">
                <a href="https://wa.me/919633570655" target="_blank" rel="noreferrer" className="group cursor-pointer block">
                  <span className="text-[10px] uppercase tracking-widest opacity-60 block mb-2">WhatsApp Direct</span>
                  <span className="text-3xl font-serif italic group-hover:text-brand-earth transition-colors">9633570655</span>
                </a>
              </div>
            </div>

            <div className="bg-brand-brown/5 rounded-[3rem] p-12 md:p-20">
              <h4 className="text-2xl font-serif italic mb-8">Visit our Shop</h4>
              <p className="text-sm font-light opacity-90 leading-relaxed uppercase tracking-wider">
                41/959, Pullpaday Road Pennakat, Mana Lane<br />
                Kochi, Kerala 682018<br /><br />
                <span className="opacity-60">Mon — Sat: 09:00 — 22:00</span>
              </p>
              <div className="mt-10">
                <a href="https://maps.app.goo.gl/JHzByLGDo3jtSLgN8" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest font-black flex items-center gap-2 hover:opacity-50 transition-opacity">
                   <MapPin size={12} /> View on Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-brand-brown/5 bg-brand-primary text-brand-cream">
        <div className="max-w-[1800px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <span className="font-serif text-3xl tracking-tighter lowercase text-brand-gold">Super Agencies.</span>
          
          <div className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-80 text-right">
             © {new Date().getFullYear()} Super Agencies • Premium Photo Frames • Kerala
          </div>
        </div>
      </footer>

      {/* Floating Button */}
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 z-[100]"
      >
        <a 
          href="https://wa.me/919633570655" target="_blank" rel="noreferrer"
          className="w-20 h-20 bg-brand-gold text-brand-primary rounded-full flex items-center justify-center shadow-3xl group no-underline"
        >
          <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute right-full mr-6 bg-brand-primary text-brand-cream px-6 py-3 rounded-full text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Wholesale Inquiry
          </div>
        </a>
      </motion.div>
    </div>
  );
}

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Menu, 
  X, 
  Scissors, 
  Palette, 
  Sparkles,
  Flower,
  Zap,
  Calendar,
  User,
  Mail,
  Send
} from 'lucide-react';
import { useState, useRef, useEffect, FormEvent } from 'react';

const Watermark = () => {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 bg-charcoal/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10 pointer-events-none">
      <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" 
          alt="Usher" 
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-[9px] uppercase tracking-widest text-white/90 font-bold whitespace-nowrap">Usher Artistry</span>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const galleryImages = [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1512496011220-420999b50b91?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1527799822367-474857a3f447?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1526045431048-f857369aba09?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1590670460285-cb502010892c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1595475243692-3a311aa80bc1?auto=format&fit=crop&q=80&w=1200'
  ];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
  };

  useEffect(() => {
    if (selectedImageIndex !== null || isBookingOpen || selectedServiceId || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImageIndex, isBookingOpen, selectedServiceId, isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setSelectedImageIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const services = [
    {
      id: 'makeup',
      category: 'makeup',
      title: 'Artistry Makeup',
      description: 'Personally executed by Usher: from editorial glam to timeless bridal looks, our artistry enhances your natural radiance.',
      longDescription: 'Artistry Makeup at this studio is a personal signature of Usher herself. This comprehensive beauty experience is designed to celebrate your unique features. Whether you are preparing for a high-fashion editorial shoot, a gala, or your most special wedding day, Usher brings her precision and passion to every stroke. We utilize only the finest premium products to ensure a flawless, long-lasting finish that reflects your internal glow under any lighting.',
      price: 'From $267 for full package bride',
      duration: '90 - 120 mins',
      includes: [
        'Custom complexion consultation',
        'Premium long-wear foundation application',
        'Bespoke eye artistry & lash enhancement',
        'Lip contouring & setting ritual',
        'Optional light contouring and highlighting'
      ],
      icon: <Palette className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'nails',
      category: 'nails',
      title: 'Nail Art & Repair',
      description: 'Master-level restoration combined with avant-garde nail artistry personally led by Usher.',
      longDescription: 'Elevate your aesthetic with our Nail Art & Repair ritual, a signature of Usher’s diverse expertise. We harmonize clinical structural reinforcement—using advanced silk and fiberglass techniques—with high-fashion artistry. From sleek minimalists to elaborate stiletto designs with bespoke gem placements, Usher ensures your nails are both a resilient foundation and a striking medium for personal expression.',
      price: 'From $1.33 for repair / $12.50 for art',
      duration: '45 - 90 mins',
      includes: [
        'Structural integrity assessment',
        'Fiberglass or silk wrap restoration',
        'Bespoke gemstone and 3D applique art',
        'Cuticle refinement & hydration',
        'Fortifying keratin treatment'
      ],
      icon: <Sparkles className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1604654894611-6973b376cbde?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'henna',
      category: 'henna',
      title: 'Henna Artistry',
      description: 'Intricate henna designs personally composed by Usher, blending herbal tradition with modern body art.',
      longDescription: 'Henna is an ancient art of storytelling on the skin, now refined through Usher’s artistic lens. She blends traditional motifs with contemporary minimalist lines to create body art that feels deeply personal and transiently beautiful. We use only organic, artisanal henna paste mixed with essential oils, ensuring a deep, rich stain and a therapeutic aromatic experience during application personally executed or guided by Usher.',
      price: 'From $8.45',
      duration: '60 - 180 mins',
      includes: [
        'Bespoke pattern design consultation with Usher',
        'Organic, hand-mixed henna paste',
        'Precision application led by the Creative Director',
        'Aftercare lemon-sugar sealant ritual',
        'Complimentary aftercare oil kit'
      ],
      icon: <Flower className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1590670460285-cb502010892c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'wig',
      category: 'wig',
      title: 'Wig Installation',
      description: 'Master-tier lace melting and seamless application for an undetectable, natural hair transformation.',
      longDescription: 'Achieve the absolute pinnacle of hair versatility with our signature Wig Installation. Usher specializes in the "invisible" finish—a meticulous process where lace is custom-tinted and gluelessly melted to mimic the scalp perfectly. Our technique prioritizes hairline integrity and comfort, utilizing precision plucking and expert braiding foundations to ensure a silhouette that is indistinguishable from natural growth.',
      price: 'From $13.32',
      duration: '120 - 180 mins',
      includes: [
        'Scalp preparation & scalp-mimic braiding',
        'Custom lace tinting & HD plucking ritual',
        'Premium glueless or secure adhesive bond',
        'Advanced edge refinement & styling',
        'Elastic band adjustment for perfect fit'
      ],
      icon: <Scissors className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const selectedService = services.find(s => s.id === selectedServiceId);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingStep(2);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    // Reset after a short delay to avoid jumpy UI while modal exits
    setTimeout(() => setBookingStep(1), 300);
  };

  return (
    <div className="min-h-screen bg-paper text-charcoal">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-beige">
        <div className="max-w-7xl mx-auto px-12 h-20 flex items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-xl font-serif italic tracking-[0.2em] uppercase">Usher Beauty</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-medium opacity-60">
              <a href="#services" className="hover:opacity-100 transition-opacity">Services</a>
              <a href="#team" className="hover:opacity-100 transition-opacity">Artisans</a>
              <a href="#about" className="hover:opacity-100 transition-opacity">Experience</a>
              <a href="#gallery" className="hover:opacity-100 transition-opacity">Portfolio</a>
              <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
            </div>

            <button 
              onClick={() => setIsBookingOpen(true)}
              className="hidden sm:block px-6 py-2 border border-charcoal text-[10px] uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all font-bold"
            >
              Book Appointment
            </button>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-paper border-b border-beige"
            >
              <div className="p-8 flex flex-col gap-6 uppercase tracking-widest text-center text-[11px] font-medium">
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="py-2">Services</a>
                <a href="#team" onClick={() => setIsMenuOpen(false)} className="py-2">Artisans</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="py-2">Experience</a>
                <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="py-2">Portfolio</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="py-2">Contact</a>
                <div className="pt-4 mt-2 border-t border-beige">
                  <button 
                    onClick={() => { setIsBookingOpen(true); setIsMenuOpen(false); }}
                    className="w-full bg-charcoal text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em]"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-[40] sm:hidden">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsBookingOpen(true)}
          className="w-14 h-14 bg-charcoal text-white rounded-full flex items-center justify-center shadow-2xl"
        >
          <Calendar size={24} className="stroke-1" />
        </motion.button>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-md" onClick={() => setSelectedServiceId(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedServiceId(null)}
                className="absolute top-6 right-6 z-10 text-charcoal/40 hover:text-charcoal bg-white/80 p-2 rounded-full backdrop-blur-sm"
              >
                <X size={20} className="stroke-1" />
              </button>

              <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden relative">
                <Watermark />
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                <div className="mb-10 text-olive">
                  {selectedService.icon}
                </div>
                <h2 className="text-4xl font-serif italic mb-6">{selectedService.title}</h2>
                <p className="text-charcoal/80 text-[13px] leading-relaxed mb-10 font-normal">
                  {selectedService.longDescription}
                </p>

                <div className="grid grid-cols-2 gap-8 mb-10 pb-10 border-b border-beige">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-2 font-bold">Investment</span>
                    <span className="text-sm font-medium">{selectedService.price}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-2 font-bold">Duration</span>
                    <span className="text-sm font-medium">{selectedService.duration}</span>
                  </div>
                </div>

                <div className="mb-12">
                  <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-6 font-bold">The Ritual Includes</span>
                  <ul className="space-y-4">
                    {selectedService.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs font-light opacity-70">
                        <div className="w-1 h-1 rounded-full bg-olive/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => {
                    setSelectedServiceId(null);
                    setIsBookingOpen(true);
                  }}
                  className="w-full bg-charcoal text-white py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-olive transition-colors font-bold"
                >
                  Book this Ritual
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" onClick={closeBookingModal} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative bg-paper w-full max-w-xl p-10 md:p-16 border border-beige shadow-sm"
            >
              <button 
                onClick={closeBookingModal}
                className="absolute top-6 right-6 text-charcoal/40 hover:text-charcoal"
              >
                <X size={20} className="stroke-1" />
              </button>

              {bookingStep === 1 ? (
                <>
                  <span className="text-charcoal/40 text-[10px] uppercase tracking-[0.3em] mb-4 block font-bold">Inquiry Form</span>
                  <h2 className="text-4xl mb-10 font-serif italic font-light">Begin Your Journey</h2>
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Full Name"
                          required
                          className="w-full bg-white border border-beige p-4 text-sm focus:border-charcoal outline-none transition-colors"
                        />
                      </div>
                      <div className="relative">
                        <input 
                          type="email" 
                          placeholder="Email Address"
                          required
                          className="w-full bg-white border border-beige p-4 text-sm focus:border-charcoal outline-none transition-colors"
                        />
                      </div>
                      <div className="relative">
                        <select className="w-full bg-white border border-beige p-4 text-sm focus:border-charcoal outline-none appearance-none transition-colors">
                          <option>Select Preferred Artisan</option>
                          <option>Usher (Creative Director & Global Lead)</option>
                          <option>Artisan Team (Guided by Usher)</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <input 
                            type="date" 
                            required
                            className="w-full bg-white border border-beige p-4 text-sm focus:border-charcoal outline-none transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <input 
                            type="time" 
                            required
                            className="w-full bg-white border border-beige p-4 text-sm focus:border-charcoal outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <select className="w-full bg-white border border-beige p-4 text-sm focus:border-charcoal outline-none appearance-none transition-colors">
                          <option>Select Service Type</option>
                          <option>Artistry Makeup</option>
                          <option>Nail Repair</option>
                          <option>Henna Artistry</option>
                          <option>Wig Installation</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full border border-charcoal py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-charcoal hover:text-white transition-all flex items-center justify-center gap-3 mt-6"
                    >
                      Request Appointment <Send size={14} className="stroke-1" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-charcoal/5 rounded-full flex items-center justify-center mx-auto mb-8"
                  >
                    <Star className="text-charcoal/20 fill-current w-6 h-6" />
                  </motion.div>
                  <h2 className="text-4xl mb-6 font-serif italic">Thank You</h2>
                  <p className="text-charcoal/60 font-light leading-relaxed mb-10 text-sm max-w-sm mx-auto">
                    We appreciate your interest in Usher Beauty. Our concierge team will review your request and contact you within 24 hours.
                  </p>
                  
                  <div className="space-y-4 mb-12 py-6 border-y border-beige max-w-xs mx-auto">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">WhatsApp</span>
                      <a href="https://wa.me/256700620671" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-olive transition-colors font-medium">
                        +256 700 620 671
                      </a>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Instagram</span>
                      <a href="https://www.instagram.com/usherbeautystudio" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-olive transition-colors font-medium flex items-center gap-2">
                        <Instagram size={14} className="stroke-1" /> @usherbeautystudio
                      </a>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">TikTok</span>
                      <a href="https://www.tiktok.com/@usherbeautystudio" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-olive transition-colors font-medium flex items-center gap-2">
                        @usherbeautystudio
                      </a>
                    </div>
                  </div>

                  <button 
                    onClick={closeBookingModal}
                    className="border border-charcoal px-10 py-3 text-[10px] uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all"
                  >
                    Return to Main Page
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 flex flex-col items-center justify-center p-4 md:p-12"
          >
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedImageIndex(null)} />
            
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white z-10 transition-colors p-2"
            >
              <X size={32} className="stroke-1" />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white z-10 transition-all p-4"
            >
              <ChevronLeft size={48} className="stroke-1" />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white z-10 transition-all p-4"
            >
              <ChevronRight size={48} className="stroke-1" />
            </button>

            <motion.div 
              key={selectedImageIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center pointer-events-none"
            >
              <img 
                src={galleryImages[selectedImageIndex]} 
                alt={`Portfolio full ${selectedImageIndex}`}
                className="max-w-full max-h-full object-contain shadow-2xl pointer-events-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="absolute bottom-10 text-white/40 text-[10px] uppercase tracking-[0.5em] font-light">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920" 
            alt="Usher Beautz Studio Hero"
            className="w-full h-full object-cover grayscale-[20%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-10 text-center text-charcoal px-6 w-full max-w-4xl"
        >
          <span className="inline-block mb-10 text-[11px] uppercase tracking-[0.5em] opacity-60">Curated Aesthetics</span>
          <h1 className="text-7xl md:text-9xl mb-10 leading-[0.9] font-serif italic font-light tracking-tight">Pure <br className="hidden md:block"/> Refinement.</h1>
          <p className="text-base md:text-sm max-w-md mx-auto opacity-70 leading-relaxed font-light mb-12">
            A sanctuary of intentional beauty. We believe in the art of subtlety, enhancing your essence through technical precision and luxury care.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="border border-charcoal px-10 py-3 text-[10px] uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all duration-500">
              Explore Services
            </button>
            <button className="text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity border-b border-charcoal/20 pb-1">
              Our Philosophy
            </button>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
        >
          <div className="w-[1px] h-12 bg-white/30 mx-auto mb-2" />
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-paper border-b border-beige">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.4em] mb-6 block opacity-50 font-bold">Services</span>
              <h2 className="text-6xl mb-8 font-serif italic">Bespoke Rituals</h2>
              <p className="text-sm opacity-70 leading-relaxed max-w-sm font-light">
                Every treatment is an intentional composition, designed to harmonize with your distinctive features.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-8 border-b border-beige pb-4">
              {['all', 'makeup', 'nails', 'henna', 'wig'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative pb-2 ${
                    activeFilter === filter ? 'text-charcoal' : 'text-charcoal/30 hover:text-charcoal/60'
                  }`}
                >
                  {filter === 'wig' ? 'Wig Installation' : filter}
                  {activeFilter === filter && (
                    <motion.div 
                      layoutId="activeFilter"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-charcoal"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
          >
            <AnimatePresence mode="popLayout">
              {services
                .filter(s => activeFilter === 'all' || s.category === activeFilter)
                .map((service, index) => (
                  <motion.div 
                    layout
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedServiceId(service.id)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden mb-10 bg-muted/20">
                      <Watermark />
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-serif italic">{service.title}</h3>
                      <p className="text-charcoal/60 text-xs leading-relaxed max-w-[280px] font-light">
                        {service.description}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-olive">
                        {service.price}
                      </p>
                      <div className="h-[1px] w-8 bg-charcoal/20 group-hover:w-full transition-all duration-500" />
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Signature Display Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] block opacity-50 font-bold">The Collection</span>
                <h2 className="text-6xl font-serif italic leading-tight">Curated <br /> Artistry on <br /> Display</h2>
              </div>
              <p className="text-sm opacity-70 leading-relaxed max-w-sm font-light">
                Our studio is more than a salon; it's a gallery of transformation. Explore our signature collection of hand-crafted wigs and artisan techniques, each displayed with the reverence of a masterpiece.
              </p>
              <div className="flex gap-10 pt-4">
                <div>
                   <span className="text-[32px] font-serif italic block">250+</span>
                   <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Custom Wigs</span>
                </div>
                <div>
                   <span className="text-[32px] font-serif italic block">15+</span>
                   <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Master Artists</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] bg-paper"
            >
              <Watermark />
              <img 
                src="https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=1200" 
                alt="Signature Display"
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-beige -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-24 gap-12">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.4em] mb-6 block opacity-50 font-bold">The Artisans</span>
              <h2 className="text-6xl mb-8 font-serif italic">Masters of Craft</h2>
              <p className="text-sm opacity-70 leading-relaxed max-w-sm font-light">
                Meet the visionaries behind Usher Beauty, dedicated to the art of individual expression.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                name: "Usher",
                role: "Lead Creative Director",
                bio: "A multi-disciplinary visionary, Usher leads the studio’s signature makeup, wig installations, nail artistry, and henna compositions.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              },
              {
                name: "Sophia Chen",
                role: "Senior Nail Artist / Specialist",
                bio: "Working under Usher’s lead, Sophia focuses on the technical precision of our nail restoration and structural rituals.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
              },
              {
                name: "Zara Ahmed",
                role: "Expert Henna Artist",
                bio: "Zara collaborates with Usher to execute intricate henna designs that bridge traditional heritage and modern minimalism.",
                image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800"
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-muted/10">
                  <Watermark />
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif italic">{member.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 text-olive">{member.role}</p>
                  <p className="text-charcoal/60 text-xs leading-relaxed font-light pt-2">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-paper border-y border-beige">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.4em] mb-6 block opacity-50 font-bold">Testimonials</span>
              <h2 className="text-6xl mb-8 font-serif italic">Client Voices</h2>
              <p className="text-sm opacity-70 leading-relaxed max-w-sm font-light italic">
                "We provide the best service to our customers, ensuring every visit is an unforgettable journey of refinement."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              {
                name: "Amara Okoro",
                location: "London",
                text: "The wig installation is so natural, it literally looks like my scalp. Usher is a true magician with hair.",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
              },
              {
                name: "Isabella Martinez",
                location: "New York",
                text: "Finally found a place that understands minimalist nail art. The precision at this studio is simply world-class.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
              },
              {
                name: "Elena Rossi",
                location: "Milan",
                text: "The henna designs are so intricate. It was more than a service; it was a peaceful artistic ceremony.",
                image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400"
              }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 border border-beige/50 relative"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full overflow-hidden grayscale">
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif italic">{review.name}</h4>
                    <p className="text-[9px] uppercase tracking-widest opacity-40">{review.location}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-charcoal/70 font-light italic">
                  "{review.text}"
                </p>
                <Star className="absolute top-8 right-8 text-olive/20 w-4 h-4 fill-current" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="relative aspect-[16/10] bg-beige overflow-hidden"
              >
                <Watermark />
                <img 
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200" 
                  alt="Studio Experience"
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] mb-6 block opacity-50 font-bold">The Ethos</span>
              <h2 className="text-5xl mb-8 font-serif italic">Subtle Stillness</h2>
              <p className="text-sm text-charcoal/70 mb-10 leading-relaxed font-light">
                Usher Beauty was established as a counterpoint to the rush of modern life. Our studio is a canvas where technical excellence meets a quiet, contemplative atmosphere.
              </p>
              <div className="border-l border-beige pl-8 py-2 mb-10">
                <p className="text-2xl font-serif italic text-olive leading-snug">
                  "The most tranquil experience. Every detail was intentional and refined."
                </p>
                <span className="text-[10px] uppercase tracking-widest mt-4 block opacity-40">— Elena R., Creative Director</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-paper border-t border-beige">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex justify-between items-end mb-20">
            <div>
              <h2 className="text-5xl font-serif italic mb-2">Visual Journal</h2>
              <p className="text-[10px] uppercase tracking-widest opacity-40">Transformations and detail studies</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {galleryImages.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative overflow-hidden aspect-[4/5] bg-muted/10 cursor-zoom-in"
                onClick={() => setSelectedImageIndex(i)}
              >
                <Watermark />
                <img 
                  src={img} 
                  alt={`Portfolio ${i}`} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 brightness-105"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] block opacity-50 font-bold">Get In Touch</span>
                <h2 className="text-6xl font-serif italic leading-tight">Inquire & <br /> Connect</h2>
              </div>
              <p className="text-sm opacity-70 leading-relaxed max-w-sm font-light">
                Have a specific vision or need expert advice? Reach out to our concierge team. Whether it's a bespoke wig inquiry or a bridal consultation, we are here to assist.
              </p>
              
              <div className="space-y-8 pt-6">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-beige flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-all duration-500">
                    <Phone size={18} className="stroke-1" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-1 font-bold">Call / WhatsApp</span>
                    <a href="tel:+256700620671" className="text-sm font-medium hover:text-olive transition-colors">+256 700 620 671</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-beige flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-all duration-500">
                    <Mail size={18} className="stroke-1" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-1 font-bold">Email</span>
                    <a href="mailto:hello@usherbeauty.studio" className="text-sm font-medium hover:text-olive transition-colors">hello@usherbeauty.studio</a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-beige flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-all duration-500">
                    <MapPin size={18} className="stroke-1" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-1 font-bold">Studio</span>
                    <p className="text-sm font-medium">Kasenge Nakawuka Road, Kampala</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-paper p-12 md:p-16 border border-beige shadow-sm"
            >
              {!isContactSubmitted ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsContactSubmitted(true);
                  }} 
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Name"
                        required
                        className="w-full bg-white border border-beige p-4 text-sm focus:border-charcoal outline-none transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="Email"
                        required
                        className="w-full bg-white border border-beige p-4 text-sm focus:border-charcoal outline-none transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <textarea 
                        placeholder="Message"
                        required
                        rows={4}
                        className="w-full bg-white border border-beige p-4 text-sm focus:border-charcoal outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-charcoal text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-olive transition-all flex items-center justify-center gap-3"
                  >
                    Send Message <Send size={14} className="stroke-1" />
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Star className="text-olive w-6 h-6 fill-current" />
                  </div>
                  <h3 className="text-3xl font-serif italic mb-4">Message Sent</h3>
                  <p className="text-sm text-charcoal/60 font-light max-w-xs mx-auto mb-10">
                    Your inquiry has been received. Our team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setIsContactSubmitted(false)}
                    className="text-[10px] uppercase tracking-widest border-b border-charcoal/20 pb-1 hover:border-charcoal transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-white text-charcoal/40 py-12 border-y border-beige">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Location</span>
            <span className="text-xs">Kasenge Nakawuka Road</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Direct</span>
            <span className="text-xs">+256 700 620 671</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Hours</span>
            <span className="text-xs">08:00am – 10:00pm</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Social</span>
            <span className="text-xs">@usherbeautystudio</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="flex flex-col">
              <span className="text-2xl font-serif italic tracking-[0.2em] uppercase mb-4">Usher Beauty</span>
              <p className="text-[10px] uppercase tracking-widest opacity-40 max-w-xs leading-relaxed">
                Elevating the singular essence of beauty. <br />
                A sanctuary of quiet luxury and intentional care.
              </p>
            </div>

            <div className="flex gap-20">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Studio</span>
                <ul className="text-[10px] uppercase tracking-widest space-y-2 opacity-40">
                  <li className="hover:opacity-100 cursor-pointer">Services</li>
                  <li className="hover:opacity-100 cursor-pointer">Portfolio</li>
                  <li className="hover:opacity-100 cursor-pointer">Academy</li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Connect</span>
                <ul className="text-[10px] uppercase tracking-widest space-y-3 opacity-40 font-bold">
                  <li>
                    <a href="https://www.instagram.com/usherbeautystudio" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity flex items-center gap-2">
                      <Instagram size={12} className="stroke-2" /> Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tiktok.com/@usherbeautystudio" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity flex items-center gap-2">
                      <Sparkles size={12} className="stroke-2" /> TikTok
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-beige flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[9px] uppercase tracking-widest opacity-40">
              ©2024 Usher Beauty Studio • Handcrafted Elegance
            </span>
            <div className="flex gap-8 text-[9px] uppercase tracking-widest opacity-40">
              <a href="#" className="hover:opacity-100">Private Policy</a>
              <a href="#contact" className="hover:opacity-100">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


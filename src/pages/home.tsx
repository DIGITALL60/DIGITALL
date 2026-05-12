import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView, animate } from "framer-motion";
import { 
  Check, MessageCircle, ArrowRight, Code, Cog, Megaphone, 
  Search, Rocket,
  Instagram, Facebook, Linkedin, Menu, X, Triangle,
  TrendingUp, Target, Users,
  Lightbulb, Smartphone, Video, Monitor, Plus, Send
} from "lucide-react";
import { FaWhatsapp, FaAws } from "react-icons/fa";
import heroIllustration from "@/assets/hero-dashboard.png";
import babySyp from "@/assets/baby-syp.png";
import babySypPro from "@/assets/baby-syp-pro.png";
import logoPuffin from "@/assets/logo-puffin.png";
import logoLevsa from "@/assets/logo-levsa.png";
import logoFusion from "@/assets/logo-fusion.png";
import {
  SiReact, SiAngular, SiDotnet, SiOpenjdk, SiNodedotjs,
  SiIos, SiAndroid, SiFlutter, SiGooglecloud,
  SiSelenium, SiDocker, SiKubernetes, SiJenkins,
} from "react-icons/si";
import { Cloud } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5493472629600";

function CountUp({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) ref.current.textContent = Math.round(value).toString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

function TypewriterServices({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [typed, setTyped] = useState<string[]>(() => items.map(() => ""));

  useEffect(() => {
    if (!inView) return;
    if (activeIndex >= items.length) return;
    const target = items[activeIndex];
    const current = typed[activeIndex];
    if (current.length < target.length) {
      const t = setTimeout(() => {
        setTyped((prev) => {
          const next = [...prev];
          next[activeIndex] = target.slice(0, current.length + 1);
          return next;
        });
      }, 38);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveIndex((i) => i + 1), 280);
    return () => clearTimeout(t);
  }, [activeIndex, typed, items, inView]);

  const allDone = activeIndex >= items.length;

  return (
    <div
      ref={containerRef}
      className="grid sm:grid-cols-2 gap-4 mb-10"
      aria-label="Servicios"
    >
      {items.map((item, i) => {
        const completed = typed[i].length === item.length;
        const isTyping = i === activeIndex && !allDone;
        const visible = i <= activeIndex || allDone;
        return (
          <div
            key={i}
            className={`flex items-center gap-3 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-30"}`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${completed ? "bg-primary/20 scale-100" : "bg-white/5 scale-90"}`}
            >
              <Check
                className={`w-3 h-3 text-primary transition-opacity duration-300 ${completed ? "opacity-100" : "opacity-0"}`}
              />
            </div>
            <span className="text-sm font-medium tabular-nums">
              {typed[i] || (i === activeIndex ? "" : "\u00A0")}
              {isTyping && (
                <span className="inline-block w-[2px] h-[1em] align-[-2px] bg-primary ml-0.5 animate-pulse" />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Tecnologías", href: "#tecnologias" },
    { label: "Nosotros", href: "#nosotros" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-purple-400 to-primary origin-left z-[60]"
        style={{ scaleX }}
      />
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Triangle className="w-7 h-7 text-white fill-white" />
            </div>
            <span
              className="tv-glitch font-bold text-2xl tracking-tight"
              data-text="DIGITALL"
            >
              DIGITALL
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -2 }}
                className="group relative text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-purple-400 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-background border-b border-white/10 p-6 flex flex-col md:hidden"
          >
            <div className="flex justify-end">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 mt-12 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-muted-foreground hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO */}
        <section id="inicio" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
              }}
              className="max-w-xl"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                AGENCIA DIGITAL
              </motion.div>
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
              >
                Impulsamos tu negocio en el <span className="text-shimmer">mundo digital</span>
              </motion.h1>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
              >
                Diseñamos páginas web, desarrollamos sistemas y creamos estrategias digitales que generan resultados reales.
              </motion.p>
              
              <TypewriterServices
                items={[
                  "Páginas Web Profesionales",
                  "Sistemas y Automatizaciones",
                  "Marketing Digital",
                  "SEO y Posicionamiento",
                ]}
              />

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                <motion.a
                  href="#tecnologias"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(168, 85, 247, 0.0)",
                      "0 0 24px 4px rgba(168, 85, 247, 0.35)",
                      "0 0 0 0 rgba(168, 85, 247, 0.0)",
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-transparent border border-primary/40 hover:border-primary text-white px-8 py-4 text-base font-semibold transition-colors"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out"
                  />
                  <span className="relative">Ver tecnologías</span>
                  <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              {/* Glowing Aura */}
              <div className="absolute inset-0 bg-primary/30 blur-[100px] rounded-full aspect-square animate-pulse-glow" />
              
              {/* Laptop Mockup */}
              <div className="relative z-10 w-full max-w-[600px] mx-auto animate-float-medium">
                <div className="bg-card border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-primary/10">
                  {/* Browser Header */}
                  <div className="h-8 bg-card border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  {/* Screen Content */}
                  <div className="aspect-[16/10] bg-background relative overflow-hidden">
                    <img
                      src={heroIllustration}
                      alt="Dashboard de analytics y métricas digitales"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                
                {/* Floating Card */}
                <motion.div 
                  initial={{ y: 30, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 180, damping: 14 }}
                  className="absolute -right-6 -bottom-6 bg-card border border-white/10 rounded-xl p-4 shadow-xl shadow-primary/20 flex items-center gap-4 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <Check className="w-6 h-6 text-green-400" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">+<CountUp to={127} suffix="%" duration={2.2} /></div>
                    <div className="text-sm text-muted-foreground">Nuevos clientes</div>
                  </div>
                </motion.div>

                {/* Baby SyP saliendo del hero */}
                <HeroBabySyp />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SOBRE NOSOTROS */}
        <section
          id="nosotros"
          className="relative py-24 px-6 bg-card/30 border-y border-white/5 overflow-hidden"
        >
          {/* Soft animated background blobs */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-24 w-[26rem] h-[26rem] rounded-full bg-purple-500/10 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -20, 0], opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.div
            className="relative max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block text-primary text-xs font-bold tracking-widest mb-3"
            >
              SOBRE NOSOTROS
            </motion.div>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_100%]"
              style={{ backgroundPosition: "0% 50%" }}
            >
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Quiénes somos
              </motion.span>
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              Digitall es una agencia digital enfocada en impulsar el crecimiento de empresas mediante soluciones tecnológicas integrales. Diseñamos y desarrollamos páginas web, sistemas y herramientas digitales a medida, optimizadas para generar clientes, automatizar procesos y mejorar la eficiencia operativa. Transformamos ideas en resultados concretos dentro del mundo digital.
            </motion.p>

            {/* TEAM CARDS */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto"
            >
              {[
                {
                  name: "Pía ♥",
                  role: "Fundadora & Estratega",
                  tagline: "La mente detrás de DIGITALL",
                  desc: "Mi trabajo es: escuchar, organizar ideas y crear soluciones digitales que generen impacto real.♥",
                  quote: "No se trata solo de tener ideas, sino de saber qué hacer con ellas. Ese es mi trabajo.",
                  skills: ["Pensamiento estratégico", "Creatividad funcional", "Enfoque en resultados", "Comunicación clara"],
                  photo: "/pia.jpeg",
                },
                {
                  name: "Sebas",
                  role: "Programador & Líder Técnico",
                  tagline: "Sistemas, automatizaciones y código limpio",
                  desc: "Transformo ideas en sistemas inteligentes y automatizaciones eficientes que simplifican procesos y hacen crecer negocios.",
                  quote: "Me enfoco en crear soluciones que funcionen hoy y estén preparadas para el futuro.",
                  skills: ["Desarrollo de sistemas", "Automatizaciones", "Integraciones y APIs", "Código limpio"],
                  photo: "/sebas.jpeg",
                },
              ].map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group relative bg-card border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  {/* Photo */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Dark gradient at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    {/* Subtle purple tint on top */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

                    {/* Name + role overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="text-2xl font-bold text-white">{member.name}</div>
                      <div className="text-xs font-bold text-primary tracking-wide">{member.role}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.desc}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((s) => (
                        <span key={s} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary border border-white/8 text-foreground/70 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="py-24 px-6">
          <div className="max-w-7xl mx-auto relative">
            {/* Soft animated background blobs */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-20 -left-20 w-[24rem] h-[24rem] rounded-full bg-primary/10 blur-3xl"
              animate={{ x: [0, 30, 0], y: [0, 15, 0], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-10 right-0 w-[22rem] h-[22rem] rounded-full bg-purple-500/10 blur-3xl"
              animate={{ x: [0, -25, 0], y: [0, 20, 0], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />

            <motion.div
              className="relative mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-bold tracking-widest mb-6"
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                SERVICIOS
              </motion.div>
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight"
              >
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_100%]"
                >
                  ¿Qué necesitás?
                </motion.span>
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Crear",
                  subtitle: "mi marca",
                  message: "¡Hola! Quiero información sobre el servicio de Crear mi marca (branding, naming, identidad y diseño gráfico).",
                  items: [
                    "Branding",
                    "Naming (nombre)",
                    "Identidad (logotipo)",
                    "Diseño Gráfico gral.",
                  ],
                },
                {
                  icon: Smartphone,
                  title: "Impulsar",
                  subtitle: "mis redes",
                  message: "¡Hola! Quiero información sobre el servicio de Impulsar mis redes (planes, estética, paid media y contenido).",
                  items: [
                    "Planes personalizados",
                    "Estética de redes (PaP)",
                    "Paid Media (META)",
                    "Creación de contenido",
                  ],
                },
                {
                  icon: Video,
                  title: "Contenido",
                  subtitle: "audiovisual",
                  message: "¡Hola! Quiero información sobre el servicio de Edición de video.",
                  items: [
                    "Edición de video",
                  ],
                },
                {
                  icon: Monitor,
                  title: "Crear",
                  subtitle: "mi web",
                  message: "¡Hola! Quiero información sobre el servicio de Crear mi web (one page, Google Ads, ecommerce y diseño web).",
                  items: [
                    "Desarrollo de one page",
                    "Gestión de Google Ads.",
                    "Desarrollo de ecommerce",
                    "Redacción y diseño web",
                  ],
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-white/5 rounded-3xl p-8 flex flex-col hover:border-primary/40 transition-all group"
                >
                  <a
                    href={`${WHATSAPP_URL}?text=${encodeURIComponent(service.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar sobre ${service.title} ${service.subtitle} por WhatsApp`}
                    className="w-14 h-14 rounded-full bg-white text-background flex items-center justify-center mb-8 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <service.icon className="w-6 h-6" />
                  </a>

                  <h3 className="text-3xl font-extrabold leading-tight mb-1">
                    {service.title}
                  </h3>
                  <h3 className="text-3xl font-extrabold leading-tight mb-8">
                    {service.subtitle}
                  </h3>

                  <ul className="space-y-3 mb-10 flex-1">
                    {service.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-muted-foreground">
                        <span className="text-primary mt-1.5 shrink-0">•</span>
                        <span className="text-[15px]">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`${WHATSAPP_URL}?text=${encodeURIComponent(service.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar sobre ${service.title} ${service.subtitle} por WhatsApp`}
                    className="self-end w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-white transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECNOLOGÍAS */}
        <section
          id="tecnologias"
          className="relative py-24 px-6 bg-card/30 border-y border-white/5 overflow-hidden"
        >
          {/* Soft animated background blobs */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/4 w-[26rem] h-[26rem] rounded-full bg-primary/10 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 25, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-10 right-1/4 w-[22rem] h-[22rem] rounded-full bg-purple-500/10 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, 20, 0], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.85 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center justify-center gap-2 mb-4"
              >
                <motion.div
                  animate={{ y: [0, -4, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Triangle className="w-6 h-6 text-primary fill-primary drop-shadow-[0_0_12px_rgba(168,85,247,0.55)]" />
                </motion.div>
              </motion.div>
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_100%]"
                >
                  Tecnologías modernas y{" "}
                </motion.span>
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-primary via-purple-300 to-primary bg-clip-text text-transparent bg-[length:200%_100%]"
                >
                  escalables
                </motion.span>
              </motion.h2>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto"
              >
                Trabajamos con un stack tecnológico actualizado y probado que nos permite desarrollar soluciones robustas, seguras y listas para escalar. Estas son algunas de las tecnologías que utilizamos en nuestros proyectos.
              </motion.p>
            </motion.div>

            {(() => {
              const techGroups = [
                {
                  category: "Frontend",
                  items: [
                    { name: "React", Icon: SiReact, color: "text-sky-400" },
                    { name: "Angular", Icon: SiAngular, color: "text-red-500" },
                  ],
                },
                {
                  category: "Backend",
                  items: [
                    { name: ".NET", Icon: SiDotnet, color: "text-violet-400" },
                    { name: "Java", Icon: SiOpenjdk, color: "text-orange-400" },
                    { name: "Node", Icon: SiNodedotjs, color: "text-green-500" },
                  ],
                },
                {
                  category: "Mobile",
                  items: [
                    { name: "iOS", Icon: SiIos, color: "text-white" },
                    { name: "Android", Icon: SiAndroid, color: "text-green-500" },
                    { name: "Flutter", Icon: SiFlutter, color: "text-sky-400" },
                  ],
                },
                {
                  category: "Cloud & Data",
                  items: [
                    { name: "AWS", Icon: FaAws, color: "text-orange-400" },
                    { name: "Azure", Icon: Cloud, color: "text-sky-400" },
                    { name: "Google Cloud", Icon: SiGooglecloud, color: "text-blue-400" },
                  ],
                },
                {
                  category: "QA & DevOps",
                  items: [
                    { name: "Selenium", Icon: SiSelenium, color: "text-emerald-400" },
                    { name: "Docker", Icon: SiDocker, color: "text-sky-400" },
                    { name: "Kubernetes", Icon: SiKubernetes, color: "text-blue-400" },
                    { name: "Jenkins", Icon: SiJenkins, color: "text-rose-400" },
                  ],
                },
              ];

              return (
                <div className="space-y-5">
                  {techGroups.map((group, gi) => (
                    <motion.div
                      key={group.category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: gi * 0.08 }}
                      className="bg-card/60 border border-white/10 rounded-2xl p-6"
                    >
                      <div className="text-sm font-bold text-muted-foreground tracking-wider mb-4">
                        {group.category}
                      </div>
                      <div className={`grid gap-4 ${
                        group.items.length === 2 ? "grid-cols-2" :
                        group.items.length === 3 ? "grid-cols-2 md:grid-cols-3" :
                        "grid-cols-2 md:grid-cols-4"
                      }`}>
                        {group.items.map((item) => (
                          <div
                            key={item.name}
                            className="bg-background/40 border border-white/5 rounded-xl px-6 py-5 flex items-center justify-center gap-3 hover:border-primary/40 hover:bg-background/70 transition-all group"
                          >
                            <item.Icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                            <span className="font-semibold text-base text-foreground/90">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        {/* LOGOS STRIP — Brand bar (inline logo list) */}
        <section className="py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center text-xs font-bold tracking-widest text-muted-foreground mb-10"
            >
              EMPRESAS QUE CONFÍAN EN NOSOTROS
            </motion.div>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {[
                {
                  src: logoPuffin,
                  name: "Puffin S.R.L.",
                  href: "https://www.instagram.com/puffinsrl/",
                },
                {
                  src: logoLevsa,
                  name: "LEVSA — Logística en Voladuras S.A.",
                  href: "https://www.instagram.com/logisticaenvoladurassa/",
                },
                {
                  src: logoFusion,
                  name: "Fusión Eventos",
                  href: "https://www.instagram.com/fusion_eventos_/",
                },
              ].map((logo, i) => (
                <motion.a
                  key={i}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center justify-center h-20 md:h-24 w-36 md:w-44 opacity-60 hover:opacity-100 hover:scale-[1.03] transition-all duration-300"
                  title={`${logo.name} — Ver en Instagram`}
                  aria-label={`${logo.name} en Instagram`}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* POR QUÉ ELEGIRNOS */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative text-center mb-16">
              {/* Subtle flame flicker stretched across the title width */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-40"
              >
                {/* Wide base glow */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-purple-600/35 via-violet-400/20 to-transparent blur-2xl"
                  animate={{
                    scaleY: [1, 1.15, 0.95, 1.1, 1],
                    opacity: [0.5, 0.7, 0.45, 0.65, 0.5],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "bottom" }}
                />
                {/* Multiple flame tongues across the width */}
                {[
                  { left: "8%", w: "10rem", h: "5.5rem", delay: 0, dur: 1.6, hue: "from-purple-600/45 via-violet-500/30" },
                  { left: "20%", w: "9rem", h: "6.5rem", delay: 0.4, dur: 1.9, hue: "from-fuchsia-600/40 via-purple-400/30" },
                  { left: "32%", w: "11rem", h: "5rem", delay: 0.2, dur: 1.5, hue: "from-purple-600/45 via-violet-500/30" },
                  { left: "44%", w: "10rem", h: "7rem", delay: 0.7, dur: 2.0, hue: "from-fuchsia-600/45 via-purple-400/30" },
                  { left: "56%", w: "9rem", h: "5.5rem", delay: 0.1, dur: 1.7, hue: "from-purple-600/45 via-violet-500/30" },
                  { left: "68%", w: "11rem", h: "6.5rem", delay: 0.5, dur: 1.8, hue: "from-fuchsia-600/40 via-purple-400/30" },
                  { left: "80%", w: "10rem", h: "5rem", delay: 0.3, dur: 1.6, hue: "from-purple-600/45 via-violet-500/30" },
                ].map((f, i) => (
                  <motion.div
                    key={`flame-${i}`}
                    className={`absolute bottom-2 rounded-[50%] bg-gradient-to-t ${f.hue} to-transparent blur-xl`}
                    style={{
                      left: f.left,
                      width: f.w,
                      height: f.h,
                      transformOrigin: "bottom",
                    }}
                    animate={{
                      scaleY: [1, 1.25, 0.9, 1.2, 1],
                      scaleX: [1, 0.92, 1.06, 0.96, 1],
                      opacity: [0.5, 0.85, 0.55, 0.8, 0.5],
                    }}
                    transition={{
                      duration: f.dur,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: f.delay,
                    }}
                  />
                ))}
                {/* Hot inner cores across the width */}
                {[
                  { left: "12%", w: "5rem", h: "3rem", delay: 0.1, dur: 1.3 },
                  { left: "26%", w: "4.5rem", h: "3.5rem", delay: 0.4, dur: 1.5 },
                  { left: "40%", w: "5rem", h: "3rem", delay: 0.0, dur: 1.2 },
                  { left: "52%", w: "5.5rem", h: "3.5rem", delay: 0.6, dur: 1.4 },
                  { left: "64%", w: "4.5rem", h: "3rem", delay: 0.2, dur: 1.3 },
                  { left: "76%", w: "5rem", h: "3.5rem", delay: 0.5, dur: 1.5 },
                  { left: "86%", w: "4.5rem", h: "3rem", delay: 0.3, dur: 1.2 },
                ].map((c, i) => (
                  <motion.div
                    key={`core-${i}`}
                    className="absolute bottom-4 rounded-[50%] bg-gradient-to-t from-fuchsia-300/55 via-violet-300/30 to-transparent blur-md"
                    style={{
                      left: c.left,
                      width: c.w,
                      height: c.h,
                      transformOrigin: "bottom",
                    }}
                    animate={{
                      scaleY: [1, 1.3, 0.85, 1.22, 1],
                      opacity: [0.55, 0.95, 0.5, 0.85, 0.55],
                    }}
                    transition={{
                      duration: c.dur,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: c.delay,
                    }}
                  />
                ))}
              </div>

              {/* Rising embers across the width */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 bottom-0 overflow-hidden">
                {[
                  { left: "6%", delay: 0, duration: 4 },
                  { left: "14%", delay: 1.2, duration: 5 },
                  { left: "22%", delay: 0.6, duration: 4.5 },
                  { left: "30%", delay: 2.0, duration: 5.5 },
                  { left: "38%", delay: 2.8, duration: 4.2 },
                  { left: "46%", delay: 0.3, duration: 4.8 },
                  { left: "54%", delay: 1.6, duration: 5.2 },
                  { left: "62%", delay: 0.9, duration: 4.4 },
                  { left: "70%", delay: 2.4, duration: 5.1 },
                  { left: "78%", delay: 1.0, duration: 4.6 },
                  { left: "86%", delay: 0.4, duration: 5.3 },
                  { left: "94%", delay: 1.8, duration: 4.7 },
                ].map((e, i) => (
                  <motion.span
                    key={i}
                    className="absolute bottom-8 w-1 h-1 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(168,85,247,0.9)]"
                    style={{ left: e.left }}
                    animate={{
                      y: [-0, -120, -180],
                      x: [0, i % 2 === 0 ? 12 : -12, 0],
                      opacity: [0, 0.9, 0],
                      scale: [0.6, 1, 0.4],
                    }}
                    transition={{
                      duration: e.duration,
                      repeat: Infinity,
                      delay: e.delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="inline-block text-primary text-xs font-bold tracking-widest mb-3"
                >
                  POR QUÉ ELEGIRNOS
                </motion.div>
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-3xl md:text-5xl font-bold mb-4"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 12px rgba(168,85,247,0.4), 0 0 24px rgba(139,92,246,0.2)",
                        "0 0 18px rgba(192,132,252,0.6), 0 0 32px rgba(168,85,247,0.35)",
                        "0 0 10px rgba(168,85,247,0.35), 0 0 22px rgba(139,92,246,0.22)",
                        "0 0 20px rgba(217,70,239,0.55), 0 0 36px rgba(168,85,247,0.4)",
                        "0 0 12px rgba(168,85,247,0.4), 0 0 24px rgba(139,92,246,0.2)",
                      ],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    Lo que nos hace diferentes
                  </motion.span>
                </motion.h2>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="text-muted-foreground text-lg max-w-2xl mx-auto"
                >
                  Cuatro pilares que guían cada proyecto que desarrollamos.
                </motion.p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: TrendingUp,
                  title: "Crecimiento",
                  desc: "Crecimiento sostenible",
                  tint: "from-blue-500/15 to-blue-500/5",
                  iconBg: "bg-blue-500/15",
                  iconColor: "text-blue-400",
                  border: "border-blue-500/20",
                },
                {
                  icon: Target,
                  title: "Estrategia",
                  desc: "Estrategia orientada",
                  tint: "from-amber-400/15 to-amber-400/5",
                  iconBg: "bg-amber-400/15",
                  iconColor: "text-amber-300",
                  border: "border-amber-400/20",
                },
                {
                  icon: Users,
                  title: "Equipo",
                  desc: "Equipo experto",
                  tint: "from-amber-400/15 to-amber-400/5",
                  iconBg: "bg-amber-400/15",
                  iconColor: "text-amber-300",
                  border: "border-amber-400/20",
                },
                {
                  icon: null,
                  title: "Resultados",
                  desc: "Resultados medibles",
                  tint: "from-blue-500/15 to-blue-500/5",
                  iconBg: "bg-blue-500",
                  iconColor: "text-white",
                  border: "border-blue-500/20",
                  isRoi: true,
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`bg-gradient-to-br ${card.tint} border ${card.border} rounded-2xl p-10 flex flex-col items-center text-center hover:border-primary/40 transition-colors`}
                >
                  <div className={`w-16 h-16 rounded-full ${card.iconBg} flex items-center justify-center mb-6`}>
                    {card.isRoi ? (
                      <span className={`text-base font-extrabold ${card.iconColor} tracking-tight`}>ROI</span>
                    ) : card.icon ? (
                      <card.icon className={`w-8 h-8 ${card.iconColor}`} />
                    ) : null}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-2xl mx-auto sm:divide-x divide-white/5"
            >
              {[
                { value: 5, suffix: "+", text: "Años de experiencia" },
                { value: 100, suffix: "%", text: "Compromiso y dedicación" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center px-4"
                >
                  <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 tabular-nums">
                    <CountUp to={stat.value} suffix={stat.suffix} duration={2} />
                  </div>
                  <div className="text-sm md:text-base font-medium text-muted-foreground">{stat.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-background border-t border-white/5 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <Triangle className="w-7 h-7 text-white fill-white" />
                </div>
                <span className="font-bold text-2xl tracking-tight">DIGITALL</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Agencia digital especializada en diseño web, sistemas y marketing digital.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Navegación</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Servicios</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li>Diseño Web</li>
                <li>Sistemas</li>
                <li>Marketing Digital</li>
                <li>SEO</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-muted-foreground text-sm text-center md:text-left">
              © 2026 DIGITALL - Todos los derechos reservados. Sitio creado por{" "}
              <a
                href="https://www.instagram.com/digitallw/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-white transition-colors font-medium"
              >
                DIGITALL
              </a>
              .
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a
                href="https://www.instagram.com/digitallw/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de DIGITALL"
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* BABY SYP — FLOATING MASCOT ASSISTANT */}
      <BabySypAssistant />
    </div>
  );
}

function HeroBabySyp() {
  const phrases = [
    "Estrategia, diseño y desarrollo a la medida de tu negocio.",
    "Transformamos métricas en crecimiento sostenido.",
    "Tecnología con propósito. Resultados con impacto.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 4500);
    return () => clearInterval(id);
  }, [phrases.length]);

  return (
    <>
      {/* Baby SyP — arriba a la izquierda del dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 160, damping: 16 }}
        className="absolute -top-16 md:-top-28 lg:-top-32 -right-2 md:right-auto md:-left-2 lg:-left-4 z-30 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-20 md:w-28 lg:w-36 drop-shadow-[0_15px_25px_rgba(124,58,237,0.45)]"
        >
          <div className="absolute inset-0 bg-primary/40 blur-3xl rounded-full" />
          <img
            src={babySypPro}
            alt="Baby SyP, mascota de DIGITALL"
            className="relative w-full h-auto select-none"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Globo de pensamiento — al costado de Baby SyP. En mobile va chiquito, arriba a la derecha (sin tapar el botón "Ver tecnologías"); en desktop más grande arriba a la izquierda. */}
      <div
        className="absolute -top-40 right-1 md:-top-32 lg:-top-36 md:right-auto md:left-28 lg:left-36 z-30 pointer-events-none w-[120px] md:w-[240px] lg:w-[270px]"
        style={{ opacity: 1 }}
      >
        {/* Burbujitas de pensamiento (van hacia Baby SyP, abajo-izquierda) — solo desktop */}
        <span className="hidden md:block absolute -left-8 bottom-1 w-2 h-2 rounded-full bg-card border border-primary/40 shadow-md shadow-primary/30" />
        <span className="hidden md:block absolute -left-3 -bottom-2 w-3 h-3 rounded-full bg-card border border-primary/40 shadow-md shadow-primary/30" />
        <span className="hidden md:block absolute left-3 -bottom-5 w-4 h-4 rounded-full bg-card border border-primary/40 shadow-md shadow-primary/30" />

        {/* Burbujitas chiquitas mobile — apuntan hacia Baby SyP (a la derecha-abajo) */}
        <span className="md:hidden absolute -right-2 bottom-0 w-1.5 h-1.5 rounded-full bg-card border border-primary/40 shadow shadow-primary/30" />
        <span className="md:hidden absolute right-1 -bottom-2 w-2 h-2 rounded-full bg-card border border-primary/40 shadow shadow-primary/30" />

        {/* Nube de pensamiento */}
        <div className="relative bg-card border border-primary/40 rounded-2xl md:rounded-[28px] px-3 py-1.5 md:px-5 md:py-3 shadow-xl md:shadow-2xl shadow-primary/30">
          <div className="text-[8px] md:text-[10px] font-bold tracking-widest text-primary mb-0.5 md:mb-1 leading-none">
            BABY SYP — DIGITALL
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="text-[10.5px] md:text-sm leading-snug text-foreground"
            >
              {phrases[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function renderRichChatText(text: string): React.ReactNode[] {
  const patterns: { regex: RegExp; build: (match: string) => React.ReactElement }[] = [
    {
      regex: /(\+?54\s*9?\s*3472[\s-]?62[\s-]?9600|3472[\s-]?629600|3472[\s-]?62[\s-]?9600)/g,
      build: (m) => (
        <a
          href="https://wa.me/5493472629600"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-white transition-colors font-medium"
        >
          {m}
        </a>
      ),
    },
    {
      regex: /(@digitallw|https?:\/\/(?:www\.)?instagram\.com\/digitallw\/?)/g,
      build: (m) => (
        <a
          href="https://www.instagram.com/digitallw/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-white transition-colors font-medium"
        >
          {m}
        </a>
      ),
    },
  ];
  let nodes: (string | React.ReactElement)[] = [text];
  for (const { regex, build } of patterns) {
    const next: (string | React.ReactElement)[] = [];
    for (const node of nodes) {
      if (typeof node !== "string") {
        next.push(node);
        continue;
      }
      let lastIndex = 0;
      const r = new RegExp(regex.source, regex.flags);
      let match: RegExpExecArray | null;
      while ((match = r.exec(node)) !== null) {
        if (match.index > lastIndex) next.push(node.slice(lastIndex, match.index));
        next.push(build(match[0]));
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < node.length) next.push(node.slice(lastIndex));
    }
    nodes = next;
  }
  return nodes.map((n, i) =>
    typeof n === "string" ? <React.Fragment key={i}>{n}</React.Fragment> : React.cloneElement(n, { key: i }),
  );
}

function BabySypAssistant() {
  const [chatOpen, setChatOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy Baby SyP 👋 Tu asistente digital de DIGITALL. ¿En qué te puedo ayudar hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-greet bubble after the user lands on the page
  useEffect(() => {
    const t = setTimeout(() => setHasGreeted(true), 3500);
    return () => clearTimeout(t);
  }, []);

  // Toggle visibility: invisible 10s -> visible 10s -> invisible 10s ...
  // While the chat is open, force the mascot to stay visible
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((v) => !v);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const mascotVisible = isVisible || chatOpen;

  // Auto-scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, chatOpen]);

  const sendMessage = async (textRaw: string) => {
    const text = textRaw.trim();
    if (!text || loading) return;
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const reply: string =
        data?.reply ??
        "Disculpá, tuve un problema para responderte. Probá de nuevo en un momento.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Disculpá, no pude conectarme. Probá de nuevo en unos segundos.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent("¡Hola DIGITALL! Quiero saber más sobre sus servicios.")}`;
  const quickReplies = [
    "¿Qué servicios ofrecen?",
    "¿Cuánto cuesta una web?",
    "¿Cómo los contacto?",
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="w-[calc(100vw-2rem)] max-w-[380px] h-[min(520px,calc(100vh-7rem))] flex flex-col rounded-2xl bg-card border border-white/10 shadow-2xl shadow-primary/30 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/30 to-primary/10 border-b border-white/10">
              <div className="relative w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center overflow-hidden">
                <img
                  src={babySyp}
                  alt="Baby SyP"
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-card" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-foreground leading-tight">
                  Baby SyP
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Asistente digital · En línea
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-background/40">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-secondary/80 text-foreground rounded-bl-sm border border-white/5"
                    }`}
                  >
                    {m.role === "assistant" ? renderRichChatText(m.content) : m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/80 border border-white/5 rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies (only show before user sends anything) */}
            {messages.length === 1 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 px-3 py-3 border-t border-white/10 bg-card"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribí tu consulta…"
                className="flex-1 bg-secondary/60 border border-white/10 rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                aria-label="Enviar"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* WhatsApp footer */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-semibold transition-colors border-t border-white/5"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
              ¿Preferís WhatsApp? Hablá con un humano
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting bubble — shown each time the mascot appears (while chat is closed) */}
      <AnimatePresence>
        {mascotVisible && !chatOpen && (
          <motion.button
            onClick={() => setChatOpen(true)}
            initial={{ opacity: 0, x: 10, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="relative max-w-[240px] rounded-2xl rounded-br-sm bg-card border border-white/10 px-4 py-3 shadow-2xl shadow-primary/20 text-left hover:border-primary/40 transition-colors"
          >
            <p className="text-sm font-medium text-foreground leading-snug">
              ¡Hola! 👋 Soy <span className="text-primary font-semibold">Baby SyP</span>, el asistente de <span className="text-primary font-semibold">DIGITALL</span>. ¿En qué te puedo ayudar?
            </p>
            <span className="absolute bottom-0 -right-2 w-4 h-4 bg-card border-r border-b border-white/10 transform rotate-45 -translate-y-1/2" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mascot button — appears 10s, hides 10s, repeating */}
      <AnimatePresence>
        {mascotVisible && (
          <motion.button
            onClick={() => setChatOpen((o) => !o)}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            whileHover={{ scale: 1.08, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center group cursor-pointer"
            aria-label="Hablar con Baby SyP"
          >
            {/* Glow */}
            <span className="absolute inset-0 rounded-full bg-primary/40 blur-2xl group-hover:bg-primary/60 transition-colors" />
            {/* Pulse ring (only before first greeting) */}
            {!hasGreeted && (
              <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
            )}
            {/* Notification dot */}
            {!chatOpen && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-background z-20" />
            )}
            <motion.img
              src={babySyp}
              alt="Baby SyP — asistente de DIGITALL"
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(139,92,246,0.5)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

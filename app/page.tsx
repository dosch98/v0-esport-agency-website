"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Crown, Shield, Target, Users, TrendingUp, ChevronDown } from "lucide-react"

const ImperialParticles = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      type: "roman" | "crown" | "diamond" | "dot"
      content: string
      duration: number
      delay: number
      size: number
    }>
  >([])

  useEffect(() => {
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]
    const particleTypes = ["roman", "crown", "diamond", "dot"] as const

    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
      content: romanNumerals[Math.floor(Math.random() * romanNumerals.length)],
      duration: 25 + Math.random() * 20,
      delay: Math.random() * 15,
      size: 0.8 + Math.random() * 0.8,
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute imperial-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.25,
          }}
        >
          {particle.type === "roman" && (
            <span
              className="font-serif text-amber-700/60 tracking-[0.3em]"
              style={{ fontSize: `${particle.size * 1.2}rem` }}
            >
              {particle.content}
            </span>
          )}
          {particle.type === "crown" && (
            <Crown
              className="text-amber-700/50"
              strokeWidth={1}
              style={{ width: `${particle.size * 16}px`, height: `${particle.size * 16}px` }}
            />
          )}
          {particle.type === "diamond" && (
            <svg
              width={particle.size * 12}
              height={particle.size * 12}
              viewBox="0 0 12 12"
              className="text-amber-700/50"
            >
              <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          )}
          {particle.type === "dot" && (
            <div
              className="rounded-full border border-amber-700/50"
              style={{ width: `${particle.size * 6}px`, height: `${particle.size * 6}px` }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function ImperaPage() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-stone-50 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <ImperialParticles />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0f0f0f]/95 backdrop-blur-xl border-b border-stone-800/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Crown className="h-5 w-5 text-amber-700/50" strokeWidth={1.2} />
            <span className="font-serif text-xl tracking-[0.35em] text-stone-50 uppercase">Impera</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[13px] tracking-[0.08em] uppercase">
            <button
              onClick={() => scrollToSection("leistungen")}
              className="text-stone-400 hover:text-stone-50 transition-colors duration-300"
            >
              Leistungen
            </button>
            <button
              onClick={() => scrollToSection("roster")}
              className="text-stone-400 hover:text-stone-50 transition-colors duration-300"
            >
              Talente
            </button>
            <button
              onClick={() => scrollToSection("marken")}
              className="text-stone-400 hover:text-stone-50 transition-colors duration-300"
            >
              Für Marken
            </button>
            <button
              onClick={() => scrollToSection("uber")}
              className="text-stone-400 hover:text-stone-50 transition-colors duration-300"
            >
              Über Impera
            </button>
            <Button
              onClick={() => scrollToSection("kontakt")}
              size="sm"
              className="bg-stone-50 text-[#0f0f0f] hover:bg-stone-200 transition-all duration-300 px-6 py-5 text-[12px] tracking-[0.08em] uppercase font-medium"
            >
              Kontakt
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a]/30 to-[#0f0f0f]" />

        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-2/5 opacity-[0.12]"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <img
            src="/classical-roman-marble-emperor-bust-statue-profile.jpg"
            alt=""
            className="h-full w-full object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]/60" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16 py-40">
          <div className="max-w-[800px]">
            <div className="mb-12 flex items-center gap-4">
              <Crown className="h-14 w-14 text-amber-700/40" strokeWidth={0.8} />
            </div>

            <h1 className="font-serif text-[clamp(5rem,12vw,9rem)] tracking-[0.2em] mb-8 text-balance leading-[0.9] uppercase">
              Impera
            </h1>

            <p className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] text-stone-400 mb-12 tracking-[0.15em] font-light">
              Lead the Game
            </p>

            <p className="text-[clamp(1.125rem,2vw,1.375rem)] text-stone-300 mb-16 leading-[1.7] max-w-[650px] text-pretty font-light">
              Exklusive Esport-Player-Agentur für Spieler, die führen statt folgen.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Button
                onClick={() => scrollToSection("kontakt")}
                size="lg"
                className="bg-stone-50 text-[#0f0f0f] hover:bg-stone-200 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase font-medium px-10 py-7"
              >
                Spieler werden
              </Button>
              <Button
                onClick={() => scrollToSection("marken")}
                size="lg"
                variant="outline"
                className="border-stone-700/50 text-stone-50 hover:bg-stone-900/30 hover:border-stone-600 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase font-medium px-10 py-7"
              >
                Für Marken & Sponsoren
              </Button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("leistungen")}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-stone-600 hover:text-stone-400 transition-colors duration-300 animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </section>

      <section id="leistungen" className="py-40 px-8 lg:px-16 border-t border-stone-800/20 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-serif text-[clamp(3rem,6vw,4.5rem)] tracking-[0.2em] mb-32 text-center uppercase leading-tight">
            Was wir für dich tun
          </h2>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                icon: Crown,
                title: "Player-Management",
                description:
                  "Strategische Karriereplanung, Vertragsverhandlungen und persönliche Betreuung für Elite-Spieler.",
              },
              {
                icon: Target,
                title: "Brand Partnerships",
                description: "Hochwertige Sponsoring-Deals und langfristige Partnerschaften mit führenden Marken.",
              },
              {
                icon: Users,
                title: "Talent Scouting",
                description: "Identifikation und Entwicklung der nächsten Generation von Esport-Champions.",
              },
            ].map((service, i) => (
              <Card
                key={i}
                className="bg-[#1a1a1a]/40 border-stone-800/30 p-12 hover:border-amber-700/20 hover:shadow-2xl hover:shadow-amber-950/5 transition-all duration-500 group backdrop-blur-sm"
              >
                <service.icon
                  className="h-11 w-11 text-amber-700/40 mb-10 group-hover:scale-105 group-hover:text-amber-700/60 transition-all duration-500"
                  strokeWidth={1.2}
                />
                <h3 className="font-serif text-[1.75rem] tracking-[0.12em] mb-5 text-stone-50 leading-tight">
                  {service.title}
                </h3>
                <p className="text-stone-400 leading-[1.7] font-light text-[15px]">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="roster" className="py-40 px-8 lg:px-16 bg-[#1a1a1a]/20 border-y border-stone-800/20 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-serif text-[clamp(3rem,6vw,4.5rem)] tracking-[0.2em] mb-32 text-center uppercase leading-tight">
            Impera Roster
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Maximus", game: "Valorant", role: "IGL", achievement: "Top 1% EU", featured: true },
              {
                name: "Caesar",
                game: "League of Legends",
                role: "Midlane",
                achievement: "Pro League Contender",
                featured: true,
              },
              { name: "Augustus", game: "CS2", role: "AWP", achievement: "Tournament Winner", featured: false },
              { name: "Nero", game: "Dota 2", role: "Carry", achievement: "Rookie of the Year", featured: true },
              {
                name: "Brutus",
                game: "Rocket League",
                role: "Striker",
                achievement: "Champion Series",
                featured: false,
              },
              { name: "Marcus", game: "Fortnite", role: "IGL", achievement: "FNCS Finalist", featured: false },
            ].map((player, i) => (
              <Card
                key={i}
                className="bg-[#0f0f0f]/90 border-stone-800/30 p-10 hover:border-amber-700/20 hover:shadow-2xl hover:shadow-amber-950/10 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm"
              >
                {player.featured && (
                  <Crown className="absolute top-6 right-6 h-5 w-5 text-amber-700/50" strokeWidth={1.2} />
                )}

                <div className="mb-8 h-40 w-40 mx-auto bg-gradient-to-br from-stone-800/30 to-stone-900/30 rounded-full flex items-center justify-center relative overflow-hidden border border-stone-800/20">
                  <img
                    src={`/classical-roman-marble-bust-statue-profile-monochr.jpg?height=280&width=280&query=classical roman marble bust statue profile monochrome emperor ${i}`}
                    alt={player.name}
                    className="h-full w-full object-cover grayscale opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <h3 className="font-serif text-[1.75rem] tracking-[0.25em] mb-4 text-center text-stone-50 uppercase">
                  {player.name}
                </h3>
                <p className="text-amber-700/60 text-[12px] tracking-[0.12em] mb-3 text-center uppercase font-medium">
                  {player.game} — {player.role}
                </p>
                <p className="text-stone-500 text-[13px] text-center font-light">{player.achievement}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="marken" className="py-40 px-8 lg:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] tracking-[0.15em] mb-16 text-center text-balance uppercase leading-tight max-w-[900px] mx-auto">
            Für Marken, die das Game ernst nehmen
          </h2>

          <div className="grid lg:grid-cols-2 gap-20 items-center mt-32">
            <div>
              <p className="text-[1.25rem] text-stone-300 mb-12 leading-[1.7] text-pretty font-light">
                Esport ist nicht nur Entertainment – es ist strategische Markenkommunikation mit einer hochengagierten
                Zielgruppe.
              </p>

              <div className="space-y-8 mb-16">
                {[
                  {
                    icon: TrendingUp,
                    title: "Brand Strategy",
                    desc: "Langfristige Positionierung im Esport-Ökosystem",
                  },
                  { icon: Target, title: "Campaign Management", desc: "Kreative Aktivierungen mit messbarem Impact" },
                  { icon: Shield, title: "Talent Activation", desc: "Authentische Kooperationen mit Elite-Spielern" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start group">
                    <item.icon
                      className="h-6 w-6 text-amber-700/40 mt-1 flex-shrink-0 group-hover:text-amber-700/60 transition-colors duration-300"
                      strokeWidth={1.2}
                    />
                    <div>
                      <h4 className="text-[1.125rem] font-medium text-stone-50 mb-2 tracking-wide">{item.title}</h4>
                      <p className="text-stone-400 text-[14px] font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => scrollToSection("kontakt")}
                size="lg"
                className="bg-stone-50 text-[#0f0f0f] hover:bg-stone-200 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase font-medium px-10"
              >
                Sponsoring-Anfrage
              </Button>
            </div>

            <div
              className="relative h-[600px] rounded-sm overflow-hidden border border-stone-800/30"
              style={{ transform: `translateY(${(scrollY - 2000) * 0.1}px)` }}
            >
              <img
                src="/classical-roman-statue-strategic-planning-chess-ta.jpg"
                alt="Strategic planning"
                className="h-full w-full object-cover grayscale opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-amber-700/[0.02]" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 px-8 lg:px-16 bg-[#1a1a1a]/20 border-y border-stone-800/20 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] tracking-[0.2em] mb-32 text-center uppercase">
            Vertrauen schafft Führung
          </h2>

          <div className="grid grid-cols-3 gap-20 mb-32">
            {[
              { value: "50+", label: "Betreute Spieler" },
              { value: "120+", label: "Kampagnen für Marken" },
              { value: "12", label: "Länder Reichweite" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-[clamp(4rem,8vw,6rem)] text-stone-50 mb-4 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-stone-500 tracking-[0.12em] text-[13px] uppercase font-light">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-20 grayscale">
            {["Partner 1", "Partner 2", "Partner 3", "Partner 4"].map((partner, i) => (
              <div
                key={i}
                className="h-16 flex items-center justify-center border border-stone-700/30 rounded-sm hover:opacity-100 transition-opacity duration-300"
              >
                <span className="font-serif tracking-[0.15em] text-stone-400 text-sm uppercase">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="uber" className="py-40 px-8 lg:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-serif text-[clamp(3rem,6vw,4.5rem)] tracking-[0.2em] mb-32 text-center uppercase leading-tight">
            Über Impera
          </h2>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div
              className="relative h-[600px] rounded-sm overflow-hidden border border-stone-800/30"
              style={{ transform: `translateY(${(scrollY - 3500) * 0.08}px)` }}
            >
              <img
                src="/classical-roman-emperor-bust-statue-marble-profile.jpg"
                alt="Classical statue"
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-transparent to-[#0f0f0f]/40" />
              <div className="absolute inset-0 bg-amber-700/[0.03]" />
            </div>

            <div>
              <p className="text-[1.25rem] text-stone-300 mb-10 leading-[1.7] text-pretty font-light">
                Impera positioniert Esport als moderne Gladiatorenarena. Unsere Spieler sind die Elite, wir sind der
                strategische Imperator im Hintergrund.
              </p>
              <p className="text-stone-400 leading-[1.7] text-pretty font-light text-[15px]">
                Wir glauben an langfristige Partnerschaften, strategische Führung und die Macht der Loyalität. In einer
                Industrie voller schneller Deals und kurzfristiger Erfolge bauen wir Dynastien.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-16 pt-20 border-t border-stone-800/20">
            {[
              { title: "Führung", desc: "Wir leiten Elite-Karrieren mit strategischer Vision und klarer Richtung." },
              { title: "Strategie", desc: "Jeder Move wird geplant. Jede Entscheidung hat ein Ziel." },
              { title: "Loyalität", desc: "Langfristige Partnerschaften statt kurzfristiger Transaktionen." },
            ].map((value, i) => (
              <div key={i} className="text-center">
                <h3 className="font-serif text-[2rem] tracking-[0.15em] mb-6 text-stone-50 uppercase">{value.title}</h3>
                <p className="text-stone-400 leading-[1.7] text-[14px] font-light max-w-xs mx-auto">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-40 px-8 lg:px-16 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-[clamp(3rem,6vw,4.5rem)] tracking-[0.2em] mb-20 text-center uppercase leading-tight">
            Kontakt
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <Card className="bg-[#1a1a1a]/40 border-stone-800/30 p-12 backdrop-blur-sm">
              <h3 className="font-serif text-[1.75rem] tracking-[0.12em] mb-10 text-stone-50">Als Spieler bewerben</h3>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Gamertag"
                    className="w-full bg-[#0f0f0f]/70 border border-stone-800/40 rounded-sm px-5 py-4 text-stone-50 placeholder:text-stone-600 focus:border-amber-700/40 focus:outline-none transition-all duration-300 text-[14px] tracking-wide"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="E-Mail"
                    className="w-full bg-[#0f0f0f]/70 border border-stone-800/40 rounded-sm px-5 py-4 text-stone-50 placeholder:text-stone-600 focus:border-amber-700/40 focus:outline-none transition-all duration-300 text-[14px] tracking-wide"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Spiel & Rolle"
                    className="w-full bg-[#0f0f0f]/70 border border-stone-800/40 rounded-sm px-5 py-4 text-stone-50 placeholder:text-stone-600 focus:border-amber-700/40 focus:outline-none transition-all duration-300 text-[14px] tracking-wide"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-stone-50 text-[#0f0f0f] hover:bg-stone-200 transition-all duration-300 py-6 text-[12px] tracking-[0.08em] uppercase font-medium"
                >
                  Bewerbung senden
                </Button>
              </form>
            </Card>

            <Card className="bg-[#1a1a1a]/40 border-stone-800/30 p-12 backdrop-blur-sm">
              <h3 className="font-serif text-[1.75rem] tracking-[0.12em] mb-10 text-stone-50">Als Marke anfragen</h3>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Unternehmen"
                    className="w-full bg-[#0f0f0f]/70 border border-stone-800/40 rounded-sm px-5 py-4 text-stone-50 placeholder:text-stone-600 focus:border-amber-700/40 focus:outline-none transition-all duration-300 text-[14px] tracking-wide"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="E-Mail"
                    className="w-full bg-[#0f0f0f]/70 border border-stone-800/40 rounded-sm px-5 py-4 text-stone-50 placeholder:text-stone-600 focus:border-amber-700/40 focus:outline-none transition-all duration-300 text-[14px] tracking-wide"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Projektbeschreibung"
                    rows={3}
                    className="w-full bg-[#0f0f0f]/70 border border-stone-800/40 rounded-sm px-5 py-4 text-stone-50 placeholder:text-stone-600 focus:border-amber-700/40 focus:outline-none transition-all duration-300 resize-none text-[14px] tracking-wide"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-stone-50 text-[#0f0f0f] hover:bg-stone-200 transition-all duration-300 py-6 text-[12px] tracking-[0.08em] uppercase font-medium"
                >
                  Anfrage senden
                </Button>
              </form>
            </Card>
          </div>

          <div className="text-center space-y-8 text-stone-400">
            <div className="space-y-3">
              <p className="tracking-[0.08em] text-[14px]">info@impera-esport.com</p>
              <p className="tracking-[0.08em] text-[14px]">Berlin, Deutschland</p>
            </div>
            <div className="flex justify-center gap-8 text-[12px] tracking-[0.1em] uppercase">
              <a
                href="#"
                className="hover:text-stone-50 transition-colors duration-300 font-light"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <span className="text-stone-700">·</span>
              <a
                href="#"
                className="hover:text-stone-50 transition-colors duration-300 font-light"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <span className="text-stone-700">·</span>
              <a
                href="#"
                className="hover:text-stone-50 transition-colors duration-300 font-light"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-800/20 py-16 px-8 lg:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Crown className="h-5 w-5 text-amber-700/40" strokeWidth={1.2} />
            <span className="font-serif text-lg tracking-[0.35em] text-stone-500 uppercase">Impera</span>
          </div>
          <p className="text-stone-600 text-[12px] tracking-[0.1em] uppercase font-light">
            © 2025 Impera. Lead the Game.
          </p>
        </div>
      </footer>
    </main>
  )
}

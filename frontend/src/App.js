import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

// shadcn ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Toaster } from "@/components/ui/sonner";

// icons
import { PhoneCall, Mail, Zap, AlarmSmoke, Flashlight, Megaphone, Camera, Wrench, Fan, PencilRuler, CircuitBoard, Star } from "lucide-react";

import { COMPANY, services, gallery, testimonials, certifications, faqs } from "./mock";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const icons = { Zap, AlarmSmoke, Flashlight, Megaphone, Camera, Wrench, Fan, PencilRuler, CircuitBoard };

function HomePage() {
  // Ping backend hello
  useEffect(() => {
    (async () => {
      try { await axios.get(`${API}/`); } catch (e) { /* ignore */ }
    })();
  }, []);

  const [quote, setQuote] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [booking, setBooking] = useState({ name: "", email: "", phone: "", date: undefined, time: "10:00 AM", notes: "", frequency: "Quarterly" });
  const [galleryFilter, setGalleryFilter] = useState("All");

  const filteredGallery = useMemo(() => {
    return gallery.items.filter(i => galleryFilter === "All" || i.category === galleryFilter);
  }, [galleryFilter]);

  const saveLocal = (key, data) => {
    try {
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push({ ...data, id: Date.now() });
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {}
  };

  const onQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quote.name || !(quote.email || quote.phone) || !quote.service) {
      toast.error("Please complete name, contact, and service.");
      return;
    }
    saveLocal("quotes", quote);
    toast.success("Quote request submitted. We'll reach out within 24-48h.");
    setQuote({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const onBookingSubmit = (e) => {
    e.preventDefault();
    if (!booking.name || !booking.date || !booking.time) {
      toast.error("Please add name, date and time.");
      return;
    }
    saveLocal("bookings", booking);
    toast.success("Maintenance booking saved locally.");
    setBooking({ name: "", email: "", phone: "", date: undefined, time: "10:00 AM", notes: "", frequency: "Quarterly" });
  };

  return (
    <div className="brand-body text-white bg-hero">
      {/* Top nav */}
      <div className="sticky top-0 z-50">
        <div className="glass shadow-soft">
          <nav className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-md bg-white/10 grid place-items-center text-amber-400 font-bold">AS</div>
              <div>
                <div className="brand-title text-base sm:text-lg font-extrabold">{COMPANY.name}</div>
                <div className="text-xs text-white/70 -mt-0.5">Electrical • FDAS • CCTV • Design</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#services" className="link-underline">Services</a>
              <a href="#gallery" className="link-underline">Projects</a>
              <a href="#testimonials" className="link-underline">Testimonials</a>
              <a href="#faq" className="link-underline">FAQ</a>
              <a href="#contact" className="link-underline">Contact</a>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button asChild className="btn-amber h-9 px-4">
                <a href="#quote">Request a Quote</a>
              </Button>
              <Button variant="outline" className="h-9 px-3 border-white/20 text-white hover:bg-white/10" asChild>
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2"><PhoneCall size={16} /> Call</a>
              </Button>
            </div>
            <div className="md:hidden">
              <Button asChild className="btn-amber h-9 px-3"><a href="#quote">Quote</a></Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-8 md:pt-16 md:pb-12 grid md:grid-cols-2 gap-8">
          <div className="relative z-10">
            <h1 className="brand-title text-3xl md:text-5xl font-extrabold leading-tight">
              Reliable Electrical, FDAS, and CCTV Solutions
            </h1>
            <p className="mt-4 text-white/80 text-base md:text-lg max-w-xl">
              From full electrical installations to fire alarm and surveillance systems, we deliver code-compliant, on-time projects for homes and commercial buildings.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="btn-amber h-11 px-6 text-base"><a href="#quote">Request a Quote</a></Button>
              <Button asChild variant="secondary" className="h-11 px-6 text-base bg-white/10 hover:bg-white/15 text-white border-white/15" >
                <a href="#maintenance">Book Preventive Maintenance</a>
              </Button>
              <Button asChild variant="outline" className="h-11 px-6 text-base border-white/20 text-white hover:bg-white/10">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2"><PhoneCall size={18}/> Call Now</a>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-white/70 text-sm">
              <div className="flex items-center gap-1"><Mail size={16}/> <a href={`mailto:${COMPANY.email}`} className="underline-offset-4 hover:underline">{COMPANY.email}</a></div>
              <div className="flex items-center gap-1"><PhoneCall size={16}/> {COMPANY.phone}</div>
            </div>
          </div>
          {/* Collage */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 -z-10 h-72 w-72 rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(255,176,32,0.25) 0%, rgba(255,176,32,0) 60%)" }}></div>
            <div className="grid grid-cols-3 grid-rows-3 gap-3">
              {gallery.items.slice(0,6).map((g, idx) => (
                <div key={g.id} className={`overflow-hidden rounded-xl glass shadow-soft ${idx % 5 === 0 ? 'row-span-2' : 'row-span-1'}`}>
                  <img src={g.img} alt={g.title} className="h-full w-full object-cover transition-transform duration-300 ease-out will-change-transform hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Certifications */}
      <section id="certs" className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certifications.map((c) => (
            <div key={c.name} className="glass rounded-xl px-4 py-3 text-center border-white/10">
              <div className="text-sm text-white/80 font-semibold">{c.name}</div>
              <div className="text-xs text-white/60">{c.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="max-w-2xl">
          <h2 className="brand-title text-2xl md:text-3xl font-extrabold">Professional Services</h2>
          <p className="text-white/70 mt-2">Single contractor, multiple disciplines — coordinated delivery.</p>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = icons[s.icon] || Zap;
            return (
              <Card key={s.key} className="glass border-white/10">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <div className="h-10 w-10 rounded-lg bg-amber-400/15 text-amber-400 grid place-items-center">
                    <Icon size={20} />
                  </div>
                  <CardTitle className="brand-title text-lg font-extrabold">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-white/70 text-sm">{s.desc}</CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Project Gallery */}
      <section id="gallery" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="brand-title text-2xl md:text-3xl font-extrabold">Recent Projects</h2>
            <p className="text-white/70 mt-2">Clean installs, neat cabling, code-compliant outcomes.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {gallery.categories.map((c) => (
              <Button key={c} variant="outline" className={`h-9 px-3 border-white/15 text-sm ${galleryFilter===c ? 'bg-white/15' : 'bg-transparent hover:bg-white/10'} text-white`} onClick={() => setGalleryFilter(c)}>
                {c}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGallery.map((g) => (
            <div key={g.id} className="group rounded-xl overflow-hidden glass border-white/10">
              <img src={g.img} alt={g.title} className="h-56 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" />
              <div className="px-4 py-3 text-white/80 text-sm">{g.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <h2 className="brand-title text-2xl md:text-3xl font-extrabold">What Clients Say</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="glass border-white/10">
              <CardHeader>
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 5 ? '#ffb020' : 'transparent'} color="#ffb020" />)}
                </div>
                <CardTitle className="text-base text-white/90">{t.quote}</CardTitle>
                <CardDescription className="text-white/60">{t.name} • {t.role}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="brand-title text-2xl md:text-3xl font-extrabold">Request a Quote</h2>
            <p className="text-white/70 mt-2 max-w-prose">Share your scope or upload plans later. We can schedule a site visit and get you a price fast.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/70">
              {services.slice(0,6).map(s => <div key={s.key} className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-amber-400" /> {s.title}</div>)}
            </div>
          </div>
          <Card className="glass border-white/10">
            <CardContent className="pt-6">
              <form onSubmit={onQuoteSubmit} className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/70">Name *</label>
                    <Input value={quote.name} onChange={e => setQuote({ ...quote, name: e.target.value })} placeholder="Full name" />
                  </div>
                  <div>
                    <label className="text-xs text-white/70">Phone</label>
                    <Input value={quote.phone} onChange={e =&gt; setQuote({ ...quote, phone: e.target.value })} placeholder="09xx xxx xxxx" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/70">Email</label>
                  <Input type="email" value={quote.email} onChange={e =&gt; setQuote({ ...quote, email: e.target.value })} placeholder="you@email.com" />
                </div>
                <div>
                  <label className="text-xs text-white/70">Service *</label>
                  <Select value={quote.service} onValueChange={(v) =&gt; setQuote({ ...quote, service: v })}>
                    <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                    <SelectContent>
                      {services.map(s =&gt; <SelectItem key={s.key} value={s.title}>{s.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-white/70">Message</label>
                  <Textarea rows={4} value={quote.message} onChange={e =&gt; setQuote({ ...quote, message: e.target.value })} placeholder="Tell us about your project..." />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Button type="submit" className="btn-amber h-10 px-6">Submit</Button>
                  <div className="text-xs text-white/60">or email us at <a className="underline underline-offset-4" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Preventive Maintenance Booking */}
      <section id="maintenance" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <h2 className="brand-title text-2xl md:text-3xl font-extrabold">Book Preventive Maintenance</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-8">
          <Card className="glass border-white/10">
            <CardContent className="pt-6 grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/70">Name *</label>
                  <Input value={booking.name} onChange={e =&gt; setBooking({ ...booking, name: e.target.value })} placeholder="Full name" />
                </div>
                <div>
                  <label className="text-xs text-white/70">Phone</label>
                  <Input value={booking.phone} onChange={e =&gt; setBooking({ ...booking, phone: e.target.value })} placeholder="09xx xxx xxxx" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/70">Email</label>
                  <Input type="email" value={booking.email} onChange={e =&gt; setBooking({ ...booking, email: e.target.value })} placeholder="you@email.com" />
                </div>
                <div>
                  <label className="text-xs text-white/70">Frequency</label>
                  <Select value={booking.frequency} onValueChange={(v) =&gt; setBooking({ ...booking, frequency: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Quarterly','Semi-Annual','Annual'].map(f =&gt; <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/70">Preferred Date *</label>
                <div className="rounded-lg border border-white/10 p-2">
                  <Calendar mode="single" selected={booking.date} onSelect={(d) =&gt; setBooking({ ...booking, date: d })} className="rounded-md" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/70">Time *</label>
                  <Select value={booking.time} onValueChange={(v) =&gt; setBooking({ ...booking, time: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM'].map(t =&gt; <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-white/70">Notes</label>
                  <Input value={booking.notes} onChange={e =&gt; setBooking({ ...booking, notes: e.target.value })} placeholder="e.g., panel cleaning, thermal scan" />
                </div>
              </div>
              <div>
                <Button onClick={onBookingSubmit} className="btn-amber h-10 px-6">Book Maintenance</Button>
              </div>
            </CardContent>
          </Card>
          <div className="glass rounded-xl p-6 border border-white/10">
            <h3 className="brand-title text-xl font-extrabold">What's included in PM?</h3>
            <ul className="mt-4 space-y-2 text-white/80 text-sm">
              <li>• Thermal scanning and load balancing checks</li>
              <li>• Panel tightening &amp; cleaning</li>
              <li>• FDAS device tests and reports</li>
              <li>• CCTV camera health check &amp; recording verification</li>
              <li>• BGM/PA system sweep and calibration</li>
            </ul>
            <div className="mt-6 text-white/60 text-sm">Need urgent support? Call us at <a className="underline underline-offset-4" href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-10 md:py-16">
        <h2 className="brand-title text-2xl md:text-3xl font-extrabold text-center md:text-left">FAQ</h2>
        <div className="mt-4 glass rounded-xl border border-white/10">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger className="px-4 text-white/90">{f.q}</AccordionTrigger>
                <AccordionContent className="px-4 text-white/70">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact/Footer */}
      <footer id="contact" className="relative mt-8">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="glass rounded-2xl border border-white/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="brand-title text-xl font-extrabold">Ready to start?</div>
                <div className="text-white/70">Call us or send your plans for fast pricing.</div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button asChild className="btn-amber h-11 px-6"><a href="#quote">Request a Quote</a></Button>
                <Button asChild variant="outline" className="h-11 px-6 border-white/20 text-white hover:bg-white/10" >
                  <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2"><PhoneCall size={18}/> {COMPANY.phone}</a>
                </Button>
                <Button asChild variant="secondary" className="h-11 px-6 bg-white/10 hover:bg-white/15 text-white border-white/15">
                  <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2"><Mail size={18}/> Email Us</a>
                </Button>
              </div>
            </div>
            <div className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <Toaster richColors position="top-center" />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
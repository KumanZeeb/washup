import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Truck, Clock, Shield, Star, ArrowRight, Shirt, Phone } from "lucide-react";

const services = [
  { icon: Shirt, label: "Cuci Reguler", price: "Rp 7.000/kg", desc: "Cuci bersih, wangi, dan rapi" },
  { icon: Sparkles, label: "Dry Clean", price: "Rp 25.000/pcs", desc: "Untuk pakaian formal & sensitif" },
  { icon: Star, label: "Setrika", price: "Rp 5.000/kg", desc: "Hasil rapi tanpa kusut" },
  { icon: Shield, label: "Cuci Selimut", price: "Rp 30.000/pcs", desc: "Selimut, bed cover, sprei" },
];

const features = [
  { icon: Truck, title: "Antar Jemput", desc: "Gratis jemput & antar ke lokasi kamu" },
  { icon: Clock, title: "Cepat & Tepat", desc: "Selesai dalam 1-2 hari kerja" },
  { icon: Shield, title: "Aman & Terjamin", desc: "Cucian diasuransikan & dikemas rapi" },
  { icon: Star, title: "Kualitas Terbaik", desc: "Detergen premium & mesin modern" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
		<header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
		  <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
		    {/* Logo dengan image dari public - warna balik kayak semula */}
		    <Link to="/" className="flex items-center gap-2">
		      <span className="text-lg font-bold text-foreground">
		        <span className="text-primary">Wash</span>Up
		      </span>
		    </Link>

		    {/* Navigation buttons - tetap pake gradient-primary */}
		    <div className="flex items-center gap-2">
		      <Link to="/register">
		        <Button variant="outline" size="sm">Daftar</Button>
		      </Link>
		      <Link to="/login">
		        <Button size="sm" className="gradient-primary">Masuk</Button>
		      </Link>
		    </div>
		  </div>
		</header>
      {/* Hero */}
      <section className="px-4 py-12 text-center md:py-20">
        <div className="mx-auto max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Laundry Praktis & Terpercaya
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
            Cucian Bersih,<br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Hidup Lebih Mudah
            </span>
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            Pesan layanan laundry kapan saja, tanpa ribet. Pickup sendiri atau minta kami jemput!
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/order">
              <Button size="lg" className="w-full gradient-primary font-semibold sm:w-auto">
                Pesan Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Phone className="mr-2 h-4 w-4" /> Hubungi Kami
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t bg-card px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Layanan Kami</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {services.map((s) => (
              <div key={s.label} className="rounded-xl border bg-background p-4 text-center shadow-soft transition-shadow hover:shadow-card">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{s.label}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                <p className="mt-2 text-sm font-bold text-primary">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Kenapa WashUp?</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full gradient-primary">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-card px-4 py-12">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold text-foreground">Siap Cuci?</h2>
          <p className="mt-2 text-muted-foreground">Pesan sekarang tanpa perlu daftar akun.</p>
          <Link to="/order">
            <Button size="lg" className="mt-5 w-full gradient-primary font-semibold sm:w-auto">
              Pesan Sekarang <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-6 text-center text-xs text-muted-foreground">
        &copy; 2026 WashUp. Semua hak dilindungi.
      </footer>
    </div>
  );
}

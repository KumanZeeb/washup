import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Code2, Globe, Server, Smartphone, Shield, Layers, 
  Database, Mail, Github, Facebook, Instagram, Phone,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

const APP_VERSION = "1.0.0";
const BUILD_DATE = "2026-03-01";

const specs = [
  {
    icon: Layers,
    title: "Frontend",
    items: [
      { label: "React", value: "18.3.x" },
      { label: "TypeScript", value: "5.x" },
      { label: "Vite", value: "Build Tool" },
    ],
  },
  {
    icon: Database,
    title: "Backend",
    items: [
      { label: "Laravel", value: "11.x" },
      { label: "PHP", value: "8.2+" },
      { label: "MySQL", value: "Database" },
      { label: "REST API", value: "JSON:API" },
    ],
  },
  {
    icon: Globe,
    title: "Styling & UI",
    items: [
      { label: "Tailwind CSS", value: "Utility-first" },
      { label: "shadcn/ui", value: "Component Library" },
      { label: "Lucide Icons", value: "Icon Set" },
      { label: "Framer Motion", value: "Animations" },
    ],
  },
  {
    icon: Server,
    title: "State & Data",
    items: [
      { label: "Zustand", value: "State Management" },
      { label: "TanStack Query", value: "Data Fetching" },
      { label: "React Hook Form", value: "Form Handling" },
      { label: "Zod", value: "Validation" },
    ],
  },
  {
    icon: Smartphone,
    title: "Fitur",
    items: [
      { label: "Responsive", value: "Mobile-first" },
      { label: "PWA Ready", value: "Installable" },
      { label: "Dark Mode", value: "Supported" },
      { label: "WhatsApp Integration", value: "Order & Notif" },
      { label: "Laravel Sanctum", value: "API Auth" },
    ],
  },
];

// Data kontak developer
const developer = {
  name: "Mann",
  role: "Full Stack Developer",
  email: "maakunn470@gmail.com",
  phone: "+6285723470609",
  photo: "/image/kuman.jpg",
  social: [
    { icon: Github, url: "https://github.com/KumanZeeb", label: "GitHub" },
    { icon: Facebook, url: "https://facebook.com/in/eruk.rukmana.39", label: "Fesnuk" },
    { icon: Instagram, url: "https://instagram.com/manzeeebbbb", label: "Instagram" },
  ]
};

export default function AdminDevInfo() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in p-4">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Informasi Aplikasi</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Detail versi dan spesifikasi teknis WashUp
        </p>
      </div>

      {/* Version card with backend info */}
      <Card className="shadow-card border-primary/20 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* App info */}
          <CardContent className="flex items-center gap-4 p-5 flex-1">
            <div className="rounded-xl gradient-primary p-3 text-primary-foreground">
              <Code2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">
                <span className="text-primary">Wash</span>Up
              </h2>
              <p className="text-xs text-muted-foreground">Laundry Management System</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="text-[10px]">
                  React Frontend
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  Laravel Backend
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Badge className="gradient-primary text-primary-foreground text-sm px-3 py-1">
                v{APP_VERSION}
              </Badge>
              <p className="text-[10px] text-muted-foreground mt-1">Build {BUILD_DATE}</p>
            </div>
          </CardContent>
          
          {/* Quick API status */}
          <div className="bg-muted/50 px-5 py-3 flex items-center gap-3 border-t sm:border-t-0 sm:border-l">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium">API Connected</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-xs text-muted-foreground">Laravel 11</span>
          </div>
        </div>
      </Card>

      {/* Tech Stack Cards - 3 columns on large screens */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specs.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {section.items.map((item, idx) => (
                  <div key={`${item.label}-${idx}`} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <Badge variant="secondary" className="text-[10px] font-medium">
                      {item.value}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Developer Contact Card - Enhanced with Image */}
      <Card className="shadow-card border-primary/20">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Developer Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-4">
          {/* Developer profile with image */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
              <img 
                src={developer.photo}
                alt={developer.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback kalau gambar gagal load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('gradient-primary', 'flex', 'items-center', 'justify-center', 'text-primary-foreground', 'font-bold', 'text-lg');
                  // Tambahin inisial sebagai fallback
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.fallback-initial')) {
                    const span = document.createElement('span');
                    span.className = 'fallback-initial';
                    span.textContent = developer.name[0];
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-base">{developer.name}</h3>
              <p className="text-xs text-muted-foreground">{developer.role}</p>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="secondary" className="text-[10px]">Full Stack</Badge>
                <Badge variant="secondary" className="text-[10px]">React & Laravel</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              <a 
                href={`mailto:${developer.email}`}
                className="text-primary hover:underline flex items-center gap-1"
              >
                {developer.email}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Phone className="w-3.5 h-3.5 text-muted-foreground" />
              <a 
                href={`https://wa.me/${developer.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                {developer.phone}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <Separator />

          {/* Social media */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Social Media</p>
            <div className="flex flex-wrap gap-2">
              {developer.social.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5"
                    asChild
                  >
                    <a 
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-xs hidden sm:inline">{social.label}</span>
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Support note */}
          <div className="bg-muted/50 rounded-lg p-3 text-xs">
            <p className="text-muted-foreground">
              Untuk pertanyaan teknis, bug report, atau custom development, 
              silakan hubungi developer via email atau WhatsApp.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center space-y-1 pb-4">
        <p className="text-[10px] text-muted-foreground">
          © 2026 WashUp. All rights reserved.
        </p>
      </div>
    </div>
  );
}

AdminDevInfo.displayName = "AdminDevInfo";
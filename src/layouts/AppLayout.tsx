import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Mic2, Rocket, Wallet, User } from "lucide-react";
import { cn } from "../lib/utils";
import { AIChatSupport } from "../components/AIChatSupport";

export default function AppLayout() {
  const location = useLocation();

  const navItems = [
    { path: "/app", icon: Home, label: "Home" },
    { path: "/app/studio", icon: Mic2, label: "Estúdio" },
    { path: "/app/distribution", icon: Rocket, label: "Lançar" },
    { path: "/app/earnings", icon: Wallet, label: "Ganhos" },
    { path: "/app/profile", icon: User, label: "Perfil" },
  ];

  return (
    <div className="flex flex-col h-screen bg-sonorix-bg text-gray-200 overflow-hidden">
      {/* Top Ad Bar - requested in prompt */}
      <div className="h-8 bg-sonorix-surface border-b border-sonorix-border flex items-center justify-center px-4 shrink-0 z-50">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 flex-1 truncate text-center">Novidade: <span className="text-sonorix-accent-1">Novo Álbum de David Gê no ar</span> • Patrocinado pela Sonorix Records</p>
        <button className="text-gray-500 hover:text-white ml-2">&times;</button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 relative">
        <Outlet />
      </main>

      <AIChatSupport />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-sonorix-bg/80 backdrop-blur-xl border-t border-sonorix-border z-50 px-6 sm:px-24 flex items-center justify-between sm:justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300 relative",
                isActive ? "text-sonorix-accent-2" : "text-gray-500 hover:text-gray-300"
              )}
            >
              <Icon strokeWidth={isActive ? 2.5 : 2} className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

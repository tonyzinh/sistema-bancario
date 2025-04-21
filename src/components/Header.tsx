import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/MediaQuery";
import { Button } from "@/components/ui/button";

import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const Mobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <header className="flex justify-between items-center p-4 border-b relative">
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <img
        src={theme === "dark" ? logoDark : logoLight}
        alt="Logo Banco Digital"
        className="h-8 w-8"
        style={{ transition: "filter 0.2s" }}
        />
        <h1 className="text-xl font-bold">Banco Digital</h1>
    </div>
      {Mobile ? (
        <>
          <Button variant="ghost" onClick={() => setMobileMenuOpen((v) => !v)} aria-label="Abrir menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          {mobileMenuOpen && (
            <nav className="absolute top-16 right-0 left-0 bg-background z-50 p-4 border-b shadow-md flex flex-col gap-2">
              <Button variant="ghost" onClick={() => {navigate('/'); setMobileMenuOpen(false);}}>Início</Button>
              <Button variant="ghost" onClick={toggleTheme}>
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                <span className="ml-2">{theme === "dark" ? "Modo Claro" : "Modo Escuro"}</span>
              </Button>
            </nav>
          )}
        </>
      ) : (
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/")}>Início</Button>
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      )}
    </header>
  );
}

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-5">
            <img src="favicon.png" alt="Logo" className="w-10 h-10" style={{ minWidth: 32, minHeight: 32 }}/>
            <span className="text-xl font-bold tracking-tight">
              Sistema Bancário - Processo Seletivo
            </span>
          </div>

          <button onClick={toggleTheme} className="p-1 rounded-md border hover:bg-muted transition-colors" aria-label="Alterar tema">
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

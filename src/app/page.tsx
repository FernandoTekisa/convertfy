import CurrencyConverter from "@/components/currency-converter";
import { ArrowLeft, HomeIcon } from "lucide-react";
import logo from "@/image/logo.png"

import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header com menu de navegação */}
      <header className="w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5"/>
              <span className="sr-only">Voltar</span>
            </Link>

            <Link
              href="/"
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {/* <HomeIcon  /> */}
              <Image
              src={logo}
              alt="logotipo do site"
              className="h-10 w-10"
              />
              <span className="sr-only">Início</span>
            </Link>
          </div>

          <h1 className="text-3xl font-medium">COVERTFY</h1>
          <div className="w-20">
            {/* Espaço reservado para manter o título centralizado */}
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center p-4">
        <CurrencyConverter />
      </main>

      {/* Footer simples */}
      <footer className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Conversor de Moedas
      </footer>
    </div>
  );
}

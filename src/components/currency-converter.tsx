"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnimatedResult from "@/components/animated-result";

// Moedas disponíveis para conversão
const currencies: Array<{
  value: CurrencyCode;
  label: string;
  symbol: string;
  flag: string;
}> = [
  { value: "BRL", label: "Real Brasileiro (BRL)", symbol: "R$", flag: "🇧🇷" },
  { value: "USD", label: "Dólar Americano (USD)", symbol: "$", flag: "🇺🇸" },
  { value: "EUR", label: "Euro (EUR)", symbol: "€", flag: "🇪🇺" },
  { value: "GBP", label: "Libra Esterlina (GBP)", symbol: "£", flag: "🇬🇧" },
  { value: "JPY", label: "Iene Japonês (JPY)", symbol: "¥", flag: "🇯🇵" },
  { value: "CNY", label: "Yuan Chinês (CNY)", symbol: "¥", flag: "🇨🇳" },
  { value: "AUD", label: "Dólar Australiano (AUD)", symbol: "A$", flag: "🇦🇺" },
  { value: "CAD", label: "Dólar Canadense (CAD)", symbol: "C$", flag: "🇨🇦" },
  { value: "CHF", label: "Franco Suíço (CHF)", symbol: "Fr", flag: "🇨🇭" },
  { value: "MXN", label: "Peso Mexicano (MXN)", symbol: "$", flag: "🇲🇽" },
  { value: "AOA", label: "Kwanza Angolano (AOA)", symbol: "Kz", flag: "🇦🇴" },
  { value: "CDF", label: "Franco Congolês (CDF)", symbol: "FC", flag: "🇨🇩" },
  { value: "ZAR", label: "Rand Sul-Africano (ZAR)", symbol: "R", flag: "🇿🇦" },
  { value: "NAD", label: "Dólar Namibiano (NAD)", symbol: "N$", flag: "🇳🇦" },
];

// Taxas de câmbio simuladas (em relação ao USD)
type CurrencyCode =
  | "USD"
  | "BRL"
  | "EUR"
  | "GBP"
  | "JPY"
  | "CNY"
  | "AUD"
  | "CAD"
  | "CHF"
  | "MXN"
  | "AOA"
  | "CDF"
  | "ZAR"
  | "NAD";

const exchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  BRL: 5.45,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 153.72,
  CNY: 7.24,
  AUD: 1.52,
  CAD: 1.37,
  CHF: 0.9,
  MXN: 16.82,
  AOA: 825.5,
  CDF: 2650.0,
  ZAR: 18.45,
  NAD: 18.4,
};

type CurrencySelectProps = {
  value: (typeof currencies)[0];
  onChange: (value: (typeof currencies)[0]) => void;
  label: string;
};

function CurrencySelect({ value, onChange, label }: CurrencySelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value.value}
        onChange={(e) => {
          const selected = currencies.find((c) => c.value === e.target.value);
          if (selected) onChange(selected);
        }}
        className="w-full p-2 border rounded-md"
      >
        {currencies.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {currency.flag} {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState(currencies[1]); // USD
  const [toCurrency, setToCurrency] = useState(currencies[0]); // BRL
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isConverting, setIsConverting] = useState(false);

  // Converter automaticamente quando os valores mudarem
  useEffect(() => {
    const convertCurrency = () => {
      if (amount && fromCurrency && toCurrency) {
        setIsConverting(true);

        // Simulando uma chamada de API com setTimeout
        setTimeout(() => {
          // Convertendo para USD primeiro, depois para a moeda de destino
          const amountInUSD =
            amount / exchangeRates[fromCurrency.value as CurrencyCode];
          const result =
            amountInUSD * exchangeRates[toCurrency.value as CurrencyCode];
          setConvertedAmount(result);
          setIsConverting(false);
        }, 600);
      }
    };

    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  // Função para trocar as moedas
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center">
          Conversor de Moedas
        </CardTitle>
        <CardDescription className="text-center">
          Converta entre diferentes moedas com taxas atualizadas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Valor a ser convertido */}
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Valor
          </label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
            className="text-lg"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
          {/* Moeda de origem */}
          <CurrencySelect
            value={fromCurrency}
            onChange={setFromCurrency}
            label="De"
          />

          {/* Botão para trocar moedas */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={swapCurrencies}
              className="rounded-full"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Moeda de destino */}
          <CurrencySelect
            value={toCurrency}
            onChange={setToCurrency}
            label="Para"
          />
        </div>

        {/* Resultado da conversão */}
        <AnimatedResult
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          convertedAmount={convertedAmount}
          isConverting={isConverting}
        />
      </CardContent>
    </Card>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function AnimatedResult({
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
  isConverting,
}: {
  amount: number;
  fromCurrency: { value: CurrencyCode };
  toCurrency: { value: CurrencyCode };
  convertedAmount: number;
  isConverting: boolean;
}) {
  // Formatar o valor com 2 casas decimais
  const formatValue = (value: number, currency: { value: string }) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency.value,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
        Resultado da conversão:
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">
          {formatValue(amount, fromCurrency)}
        </div>
        <div className="text-slate-500 dark:text-slate-400">=</div>

        <AnimatePresence mode="wait">
          {isConverting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <Loader2 className="h-5 w-5 animate-spin text-slate-500 dark:text-slate-400" />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
              className="text-xl font-bold text-slate-900 dark:text-slate-50"
            >
              {formatValue(convertedAmount, toCurrency)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="text-xs text-slate-500 dark:text-slate-400 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Taxa de câmbio: 1 {fromCurrency.value} ={" "}
        {(
          exchangeRates[toCurrency.value] / exchangeRates[fromCurrency.value]
        ).toFixed(4)}{" "}
        {toCurrency.value}
      </motion.div>
    </div>
  );
}

// Taxas de câmbio simuladas (em relação ao USD) - duplicadas aqui para o componente funcionar independentemente
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

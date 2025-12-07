"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";

type ToastType = "success" | "info" | "error";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info", duration = 2800) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[120] space-y-2 w-[320px] max-w-[90vw]">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal-900/90 backdrop-blur-xl shadow-xl"
            >
              <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              <div className="flex items-start gap-3 p-4">
                {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />}
                {toast.type === "info" && <Info className="w-5 h-5 text-gold-300 mt-0.5" />}
                {toast.type === "error" && <TriangleAlert className="w-5 h-5 text-rose-400 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm text-white leading-relaxed">{toast.message}</p>
                </div>
                <X className="w-4 h-4 text-white/60 mt-1" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}


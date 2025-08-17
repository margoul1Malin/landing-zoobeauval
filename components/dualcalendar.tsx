// component.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { addDays, isAfter, startOfDay } from "date-fns";
import { useTranslations } from "next-intl";

const DualCalendarWithPreset = (props: React.ComponentProps<typeof Calendar>) => {
  const t = useTranslations();
  const [currentDate] = React.useState(new Date());
  const [disabledDates, setDisabledDates] = React.useState<Date[]>([]);

  // Générer des dates aléatoires qui deviennent indisponibles
  React.useEffect(() => {
    const interval = setInterval(() => {
      const today = startOfDay(new Date());
      
      // Générer une nouvelle date aléatoire à désactiver
      const randomDays = Math.floor(Math.random() * 60) + 1;
      const newDisabledDate = addDays(today, randomDays);
      
      // Vérifier que la date n'est pas déjà désactivée et qu'elle est dans le futur
      if (!disabledDates.some(date => date.getTime() === newDisabledDate.getTime()) && 
          isAfter(newDisabledDate, today)) {
        setDisabledDates(prev => [...prev, newDisabledDate]);
      }
    }, 500); // Toutes les 1.5 secondes

    return () => clearInterval(interval);
  }, [disabledDates]);

  // Fonction pour désactiver les dates
  const disabledDays = React.useMemo(() => {
    return disabledDates.map(date => ({
      from: startOfDay(date),
      to: startOfDay(date)
    }));
  }, [disabledDates]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <Calendar
        mode="single"
        numberOfMonths={2}
        className="rounded-lg border shadow-sm bg-white"
        disabled={disabledDays}
        defaultMonth={currentDate}
        classNames={{
          day_button: "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg p-0 text-foreground outline-offset-2 group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 focus:outline-none group-data-[disabled]:pointer-events-none focus-visible:z-10 hover:bg-accent group-data-[selected]:bg-primary hover:text-foreground group-data-[selected]:text-primary-foreground group-data-[disabled]:bg-custom-color group-data-[disabled]:text-white group-data-[outside]:text-foreground/30 group-data-[outside]:group-data-[selected]:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-data-[selected]:group-[.range-middle]:bg-accent group-data-[selected]:group-[.range-middle]:text-foreground",
        }}
        {...props}
      />
      

      
      {/* Message d'alerte */}
      <AnimatePresence>
        {disabledDates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-sm text-red-700 font-medium">
              {t('cities.dynamic.calendar.warning', { count: disabledDates.length })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

DualCalendarWithPreset.displayName = "DualCalendarWithPreset";

export default DualCalendarWithPreset;
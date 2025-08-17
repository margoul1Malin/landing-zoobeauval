"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  autoPlayInterval = 8000, // Augmenté à 8 secondes
}: FeatureStepsProps) {
  const [currentGroup, setCurrentGroup] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  
  // Calculer le nombre de groupes (3 étapes par groupe)
  const stepsPerGroup = 3
  const totalGroups = Math.ceil(features.length / stepsPerGroup)
  
  // Obtenir les étapes du groupe actuel
  const currentFeatures = features.slice(
    currentGroup * stepsPerGroup,
    (currentGroup + 1) * stepsPerGroup
  )

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        // Passer à l'étape suivante dans le groupe actuel
        if (currentStep < stepsPerGroup - 1) {
          setCurrentStep(prev => prev + 1)
          setProgress(0)
        } else {
          // Passer au groupe suivant
          setCurrentGroup((prev) => (prev + 1) % totalGroups)
          setCurrentStep(0)
          setProgress(0)
        }
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, currentStep, stepsPerGroup, totalGroups, autoPlayInterval])

  const nextStep = () => {
    if (currentStep < stepsPerGroup - 1) {
      setCurrentStep(prev => prev + 1)
      setProgress(0)
    } else {
      // Passer au groupe suivant
      setCurrentGroup((prev) => (prev + 1) % totalGroups)
      setCurrentStep(0)
      setProgress(0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      setProgress(0)
    } else {
      // Passer au groupe précédent
      setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups)
      setCurrentStep(stepsPerGroup - 1)
      setProgress(0)
    }
  }

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {/* Affichage des 3 étapes du groupe actuel */}
            {currentFeatures.map((feature, index) => (
              <motion.div
                key={currentGroup * stepsPerGroup + index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= currentStep ? 1 : 0.3,
                  x: 0 
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    index <= currentStep
                      ? "bg-primary border-primary text-primary-foreground scale-110"
                      : "bg-muted border-muted-foreground text-muted-foreground"
                  )}
                >
                  {index < currentStep ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : index === currentStep ? (
                    <span className="text-lg font-bold animate-pulse">●</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-muted-foreground">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Navigation entre les étapes */}
            <div className="flex items-center justify-between pt-6">
              <button
                onClick={prevStep}
                className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              
              {/* Indicateurs de groupes */}
              <div className="flex gap-2">
                {Array.from({ length: totalGroups }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentGroup(index)
                      setCurrentStep(0)
                      setProgress(0)
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentGroup
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={nextStep}
                className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg"
            )}
          >
            <AnimatePresence mode="wait">
              {currentFeatures.map(
                (feature, index) =>
                  index === currentStep && (
                    <motion.div
                      key={`${currentGroup}-${currentStep}`}
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover transition-transform transform"
                        width={1000}
                        height={500}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

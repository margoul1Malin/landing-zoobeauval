"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Maison {
  id: string;
  nom: string;
  description: string;
  image: string;
  capacite: string;
  prix: string;
  activites: string[];
}

interface ReservationModalProps {
  maison: Maison;
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ maison, isOpen, onClose }: ReservationModalProps) {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    dates: "",
    personnes: 2,
    nom: "",
    email: "",
    telephone: "",
    message: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici on pourrait intégrer un système de réservation réel
    alert(t('reservationModal.success'));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-green-800">{maison.nom}</h2>
              <p className="text-gray-600">{maison.description}</p>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-gray-500">
              ✕
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative h-48">
              <Image
                src={maison.image}
                alt={maison.nom}
                className="w-full h-full object-cover rounded-lg"
                width={500}
                height={500}
              />
              <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                {maison.prix}
              </Badge>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-700 mb-2">{t('reservationModal.characteristics')}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">👥</span>
                  {t('reservationModal.capacity')} {maison.capacite}
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">💰</span>
                  {t('reservationModal.price')} {maison.prix}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="font-semibold text-green-700 mb-2">{t('reservationModal.includedActivities')}</h3>
              <ul className="text-sm space-y-1">
                {maison.activites.map((activite, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {activite}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dates de séjour *
                </label>
                <input
                  type="text"
                  placeholder="Du 15/06/2024 au 20/06/2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.dates}
                  onChange={(e) => setFormData({...formData, dates: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de personnes *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.personnes}
                  onChange={(e) => setFormData({...formData, personnes: parseInt(e.target.value)})}
                  required
                >
                  <option value={1}>1 personne</option>
                  <option value={2}>2 personnes</option>
                  <option value={3}>3 personnes</option>
                  <option value={4}>4 personnes</option>
                  <option value={5}>5 personnes</option>
                  <option value={6}>6 personnes</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                placeholder="+33 6 12 34 56 78"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.telephone}
                onChange={(e) => setFormData({...formData, telephone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (optionnel)
              </label>
              <textarea
                placeholder="Précisions sur votre séjour, demandes spéciales..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>💡 Bon à savoir :</strong> Votre demande sera traitée sous 24h. 
                Nous vous proposerons les meilleures dates disponibles et vous enverrons 
                un devis personnalisé.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Envoyer ma demande
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
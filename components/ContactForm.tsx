"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirection vers le site principal
    window.open('https://leclosdesrossignols.fr', '_blank');
  };

  return (
    <section className="py-20 px-4 bg-custom-color-2">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Formulaire à gauche */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-custom-color/10">
            <h3 className="text-3xl font-bold mb-6 text-custom-color">
              {t('contact.title')}
            </h3>
            <p className="text-gray-600 mb-8">
              {t('contact.subtitle')}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-custom-color font-medium">
                    {t('contact.form.name')}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-2 border-custom-color/20 focus:border-custom-color"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-custom-color font-medium">
                    {t('contact.form.email')}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-2 border-custom-color/20 focus:border-custom-color"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-custom-color font-medium">
                  {t('contact.form.message')}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-2 border-custom-color/20 focus:border-custom-color min-h-[120px]"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-custom-color hover:bg-custom-color/90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                {t('contact.form.submit')}
              </Button>
            </form>
          </div>

          {/* Contenu textuel à droite */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-custom-color">
                {t('contact.content.title')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {t('contact.content.subtitle')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-custom-color text-white p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-custom-color mb-2">{t('contact.content.phone.title')}</h3>
                  <p className="text-gray-600">{t('contact.content.phone.number')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-custom-color text-white p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-custom-color mb-2">{t('contact.content.email.title')}</h3>
                  <p className="text-gray-600">{t('contact.content.email.address')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-custom-color text-white p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-custom-color mb-2">{t('contact.content.address.title')}</h3>
                  <p className="text-gray-600">{t('contact.content.address.street')}</p>
                </div>
              </div>
            </div>

            <div className="bg-custom-color/5 p-6 rounded-xl border border-custom-color/10">
              <h3 className="text-lg font-semibold text-custom-color mb-3">
                {t('contact.content.why.title')}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="text-rose-500">✓</span>
                  <span>{t('contact.content.why.reservation')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-rose-500">✓</span>
                  <span>{t('contact.content.why.advice')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-rose-500">✓</span>
                  <span>{t('contact.content.why.response')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-rose-500">✓</span>
                  <span>{t('contact.content.why.support')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
"use client";

import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

// Type pour les villes
interface City {
    id: string;
    cityName: string;
    slug: string;
}

export function CitySearch() {
    const t = useTranslations();
    const [cities, setCities] = useState<City[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    // Charger les villes depuis l'API
    useEffect(() => {
        const fetchCities = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/cities');
                if (response.ok) {
                    const data = await response.json();
                    setCities(data);
                }
            } catch (error) {
                console.error(t('citySearch.error'), error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCities();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Filtrer les villes selon la recherche
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCities([]);
            setShowResults(false);
        } else {
            const filtered = cities.filter(city =>
                city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCities(filtered);
            setShowResults(true);
        }
    }, [searchTerm, cities]);

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder={t('citySearch.placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-white/95 backdrop-blur-md 
                    border border-gray-200 rounded-lg shadow-sm 
                    focus:border-custom-color focus:outline-none transition-all duration-300
                    placeholder:text-gray-500"
                />
            </div>

            {/* Résultats de recherche */}
            {showResults && (searchTerm.trim() !== "" || isLoading) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-md 
                border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                    {isLoading ? (
                        <div className="p-3 text-center text-gray-500 text-sm">
                            {t('citySearch.loading')}
                        </div>
                    ) : filteredCities.length > 0 ? (
                        <div>
                            {filteredCities.map((city) => (
                                <Link
                                    key={city.id}
                                    href={`/villes/${city.slug}`}
                                    onClick={() => {
                                        setSearchTerm("");
                                        setShowResults(false);
                                    }}
                                    className="flex items-center px-3 py-2 hover:bg-gray-50 
                                    transition-colors duration-200 border-b border-gray-100 
                                    last:border-b-0"
                                >
                                    <MapPin className="h-3 w-3 text-gray-400 mr-2 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">
                                        {city.cityName}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : searchTerm.trim() !== "" ? (
                        <div className="p-3 text-center text-gray-500 text-sm">
                            {t('citySearch.noResults')}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
} 
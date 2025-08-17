"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CityPreview from '@/components/CityPreview';
import MDEditor from '@uiw/react-md-editor';

interface CityPage {
  id: string;
  cityName: string;
  slug: string;
  backgroundImage: string;
  citySectionTitle: string;
  citySectionSubtitle: string;
  citySectionParagraphs: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [cities, setCities] = useState<CityPage[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityPage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    cityName: '',
    backgroundImage: '',
    citySectionTitle: '',
    citySectionSubtitle: '',
    citySectionParagraphs: ['', '', '', '']
  });

  const router = useRouter();

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchCities();
  }, [router]);

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/cities');
      if (response.ok) {
        const data = await response.json();
        setCities(data);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = isEditing ? `/api/cities/${selectedCity?.id}` : '/api/cities';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Une erreur est survenue');
      }

      setSuccess(isEditing ? 'Ville mise à jour avec succès' : 'Ville créée avec succès');
      setFormData({
        cityName: '',
        backgroundImage: '',
        citySectionTitle: '',
        citySectionSubtitle: '',
        citySectionParagraphs: ['', '', '', '']
      });
      setIsEditing(false);
      setSelectedCity(null);
      fetchCities();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (city: CityPage) => {
    setSelectedCity(city);
    setIsEditing(true);
    setFormData({
      cityName: city.cityName,
      backgroundImage: city.backgroundImage,
      citySectionTitle: city.citySectionTitle,
      citySectionSubtitle: city.citySectionSubtitle,
      citySectionParagraphs: [...city.citySectionParagraphs]
    });
  };

  const handleDelete = async (cityId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette ville ?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/cities/${cityId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Ville supprimée avec succès');
        fetchCities();
      }
    } catch (error) {
      setError('Erreur lors de la suppression' + error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedCity(null);
    setFormData({
      cityName: '',
      backgroundImage: '',
      citySectionTitle: '',
      citySectionSubtitle: '',
      citySectionParagraphs: ['', '', '', '']
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Panel Admin - Gestion des Villes</h1>
            <Button onClick={handleLogout} variant="outline">
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? 'Modifier une ville' : 'Créer une nouvelle ville'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="cityName">Nom de la ville *</Label>
                    <Input
                      id="cityName"
                      value={formData.cityName}
                      onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="backgroundImage">Image de fond *</Label>
                    <Input
                      id="backgroundImage"
                      value={formData.backgroundImage}
                      onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                      placeholder="/images/ville.jpg"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="citySectionTitle">Titre de la section *</Label>
                    <Input
                      id="citySectionTitle"
                      value={formData.citySectionTitle}
                      onChange={(e) => setFormData({ ...formData, citySectionTitle: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="citySectionSubtitle">Sous-titre de la section *</Label>
                    <Input
                      id="citySectionSubtitle"
                      value={formData.citySectionSubtitle}
                      onChange={(e) => setFormData({ ...formData, citySectionSubtitle: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Paragraphes de la section (4 paragraphes) *</Label>
                    {formData.citySectionParagraphs.map((paragraph, index) => (
                      <div key={index} className="mt-4 border rounded-lg p-4">
                        <Label htmlFor={`paragraph-${index}`} className="block mb-2 font-semibold">
                          Paragraphe {index + 1}
                        </Label>
                        <div data-color-mode="light">
                          <MDEditor
                            value={paragraph}
                            onChange={(value) => {
                              const newParagraphs = [...formData.citySectionParagraphs];
                              newParagraphs[index] = value || '';
                              setFormData({ ...formData, citySectionParagraphs: newParagraphs });
                            }}
                            preview="edit"
                            height={200}
                            className="min-h-[200px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">
                      {success}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Enregistrement...' : (isEditing ? 'Mettre à jour' : 'Créer')}
                    </Button>
                    {isEditing && (
                      <Button type="button" variant="outline" onClick={handleCancel}>
                        Annuler
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Liste des villes */}
            <Card>
              <CardHeader>
                <CardTitle>Villes existantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cities.map((city) => (
                    <div key={city.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">{city.cityName}</h3>
                        <p className="text-sm text-gray-600">Slug: {city.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleEdit(city)}>
                          Modifier
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(city.id)}>
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  ))}
                  {cities.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Aucune ville créée</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview de la page ville</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-lg overflow-y-auto" style={{ height: '80vh' }}>
                  <CityPreview formData={formData} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
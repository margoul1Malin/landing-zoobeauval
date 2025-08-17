import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

// GET - Récupérer toutes les villes
export async function GET() {
  try {
    const cities = await prisma.cityPage.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle ville
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const token = getTokenFromHeader(request.headers.get('authorization') || undefined);
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { cityName, backgroundImage, citySectionTitle, citySectionSubtitle, citySectionParagraphs } = body;

    // Validation
    if (!cityName || !backgroundImage || !citySectionTitle || !citySectionSubtitle || !citySectionParagraphs) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(citySectionParagraphs) || citySectionParagraphs.length !== 4) {
      return NextResponse.json(
        { error: 'citySectionParagraphs must be an array of exactly 4 paragraphs' },
        { status: 400 }
      );
    }

    // Créer le slug à partir du nom de la ville
    const slug = cityName.toLowerCase()
      .replace(/[éèê]/g, 'e')
      .replace(/[àâ]/g, 'a')
      .replace(/[ùû]/g, 'u')
      .replace(/[ôö]/g, 'o')
      .replace(/[îï]/g, 'i')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const city = await prisma.cityPage.create({
      data: {
        cityName,
        slug,
        backgroundImage,
        citySectionTitle,
        citySectionSubtitle,
        citySectionParagraphs
      }
    });

    return NextResponse.json(city, { status: 201 });
  } catch (error) {
    console.error('Error creating city:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
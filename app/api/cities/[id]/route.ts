import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

// GET - Récupérer une ville spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const city = await prisma.cityPage.findUnique({
      where: { id }
    });

    if (!city) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(city);
  } catch (error) {
    console.error('Error fetching city:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une ville
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const city = await prisma.cityPage.update({
      where: { id },
      data: {
        cityName,
        slug,
        backgroundImage,
        citySectionTitle,
        citySectionSubtitle,
        citySectionParagraphs
      }
    });

    return NextResponse.json(city);
  } catch (error) {
    console.error('Error updating city:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une ville
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    await prisma.cityPage.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'City deleted successfully' });
  } catch (error) {
    console.error('Error deleting city:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
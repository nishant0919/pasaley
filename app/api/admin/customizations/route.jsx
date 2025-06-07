import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Customization from '@/models/Customization';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const existing = await Customization.findOne();
    if (existing) {
      existing.branding = body.branding;
      existing.components = body.components;
      await existing.save();
    } else {
      await Customization.create(body);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save customization:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

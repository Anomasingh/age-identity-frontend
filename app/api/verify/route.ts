import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Get the incoming form data
  const formData = await req.formData();

  // Prepare a new FormData for the backend
  const backendForm = new FormData();
  for (const [key, value] of formData.entries()) {
    backendForm.append(key, value as Blob);
  }

  // Forward the form data to the Flask backend
  const flaskRes = await fetch('http://localhost:5000/verify', {
    method: 'POST',
    body: backendForm,
    // Do NOT set Content-Type header; fetch will set it with the correct boundary for FormData
  });

  // Get the JSON response from Flask
  const data = await flaskRes.json();

  // Return the JSON to the frontend
  return NextResponse.json(data, { status: flaskRes.status });
}
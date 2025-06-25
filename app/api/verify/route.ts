import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const backendForm = new FormData();
    for (const [key, value] of formData.entries()) {
      backendForm.append(key, value as Blob);
    }

    const flaskRes = await fetch('http://localhost:5000/verify', {
      method: 'POST',
      body: backendForm,
    });

    const contentType = flaskRes.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await flaskRes.json();
      return NextResponse.json(data, { status: flaskRes.status });
    } else {
      const text = await flaskRes.text();
      console.error('Flask returned non-JSON response:', text);
      return NextResponse.json({ error: 'Flask backend error', details: text }, { status: 500 });
    }
  } catch (err) {
    console.error('Error communicating with backend:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

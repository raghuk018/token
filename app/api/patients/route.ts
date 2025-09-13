// app/api/patients/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // 👈 make sure this exists

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, age, gender } = body;

    // Save patient in DB
    const patient = await prisma.patient.create({
      data: { name, phone, age: Number(age), gender },
    });

    // Create a token
    const token = await prisma.token.create({
      data: {
        number: Math.floor(Math.random() * 100) + 1,
        status: "Waiting",
        patientId: patient.id,
      },
    });

    return NextResponse.json({ patient, token });
  } catch (err) {
    console.error("❌ Error saving patient:", err);
    return NextResponse.json({ error: "Failed to save patient" }, { status: 500 });
  }
}

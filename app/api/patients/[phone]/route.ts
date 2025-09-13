import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/patients/[phone]
export async function GET(
  req: Request,
  { params }: { params: { phone: string } }
) {
  try {
    const { phone } = params;

    // 1. Find patient by phone
    const patient = await prisma.patient.findUnique({
      where: { phone },
      include: {
        tokens: {
          orderBy: { createdAt: "desc" },
          take: 1, // get latest token
        },
      },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const token = patient.tokens[0];

    return NextResponse.json({
      patient: { name: patient.name, phone: patient.phone },
      token: token ? { number: token.number, status: token.status } : null,
    });
  } catch (err) {
    console.error("Error fetching current token", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

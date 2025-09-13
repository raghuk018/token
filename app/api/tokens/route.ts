import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

// POST /api/tokens
export async function POST(req: Request) {
  try {
    const { patientId } = await req.json();

    if (!patientId) {
      return NextResponse.json({ error: "Patient ID required" }, { status: 400 });
    }

    // find last token
    const last = await prisma.token.findFirst({
      orderBy: { createdAt: "desc" },
    });

    const newTokenNumber = last ? last.number + 1 : 1;

    const token = await prisma.token.create({
      data: { 
        number: newTokenNumber, 
        patientId,
        scheduledAt: new Date(),
      },
    });

    return NextResponse.json(token, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create token" }, { status: 500 });
  }
}

// GET /api/tokens
export async function GET() {
  try {
    const tokens = await prisma.token.findMany({
      orderBy: { createdAt: "desc" },
      include: { patient: true },
    });
    return NextResponse.json(tokens);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch tokens" }, { status: 500 });
  }
}

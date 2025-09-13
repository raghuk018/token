import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/tokens/current
export async function GET() {
  try {
    const current = await prisma.token.findFirst({
      where: { status: "waiting" },
      orderBy: { createdAt: "asc" },
      include: { patient: true },
    });

    if (!current) {
      return NextResponse.json({ number: 0, message: "No current token" });
    }

    return NextResponse.json(current);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch current token" }, { status: 500 });
  }
}

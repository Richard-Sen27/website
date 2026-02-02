import { NextResponse } from "next/server";

export async function GET() {
    return new NextResponse('server is healthy', { status: 200 });
}
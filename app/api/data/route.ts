import { NextResponse } from "next/server";
import { data } from "@/constants/data";

export async function GET(
    req: Request,
    res: Response,
) {
    try {
        return NextResponse.json(data)

    } catch (error) {
        console.error(error, 'Error in GET /api/data')
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/chat";
import redis from "@/lib/redis";
import { auth } from "@clerk/nextjs/server";


export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({
                error : "Not authenticated",
            }, {
                status: 401
            });
        }
        const today = new Date().toISOString().split("T")[0];
        const key = `user:${userId}:queries:${today}`;
        let count = await redis.get<number>(key);

        if(!count) {
            await redis.set(key, 1, {ex: 60*60*24}); // for 1 day only
        } else if (count >= 15) {
            return NextResponse.json(
                { error: "Daily free limit reached (5 queries)" },
                { status: 429 }
            );
        } else {
            await redis.incr(key);
        }
 
        const body = await req.json();
        const { query } = body;
        const answer = await chat(query);
        return NextResponse.json({ answer: answer });
    } catch(err) {
        console.log(err);
        return NextResponse.json(
            {
                error : err
            }, 
            {
                status: 400
        });
    }
}
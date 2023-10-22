import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    let params: any = {};
    let req = request.nextUrl.searchParams.entries();
    for (const [key, val] of req as any) { params[key] = val; }
    
    const data = await fetch(`https://v3.football.api-sports.io/odds?season=${+params.season}&league=${+params.league}&bookmaker=${+params.bookmaker}&fixture=${+params.fixture}`, {
        'method': 'GET',
        'headers': {
            'x-apisports-key': `${process.env.FOOTBALL_KEY}`
        }
    }); 
    if (data.status === 200) {
        const res = await data.json()
        return NextResponse.json(res)
    } else {
        return NextResponse.json({
            message: 'There is an error. Please try again'
        }, {
            status: 500
        })
    }
}

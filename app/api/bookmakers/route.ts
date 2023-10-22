import { NextResponse } from 'next/server';

export async function GET() {
    const data = await fetch('https://v3.football.api-sports.io/odds/bookmakers', {
        'method': 'GET',
        'headers': {
            'x-apisports-key': `${process.env.FOOTBALL_KEY}`
        }
    }); 
    if (data.status === 200) {
        const res = await data.json();
        return NextResponse.json(res, {status: 200})
    } else {
        return NextResponse.json({
            message: 'There is an error. Please try again'
        }, {
            status: 500
        })
    }

}

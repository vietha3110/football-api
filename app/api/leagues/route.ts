import { NextResponse } from 'next/server';

export async function GET() {
  const data = await fetch('https://v3.football.api-sports.io/leagues', {
    'method': 'GET',
    'headers': {
      'x-apisports-key': `${global.process.env.FOOTBALL_KEY}`
    }
  });
  if (data.status === 200) {
    const res = await data.json();
    const info = res.response.map((ele: any) => ({
      league: ele.league,
      country: ele.country
    }))
    return NextResponse.json(info, { status: 200 })
  } else {
    return NextResponse.json({
      message: 'There is an error. Please try again'
    }, {
      status: 500
    })
  }
}

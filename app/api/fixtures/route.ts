import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  let params: any = {};
  let req = request.nextUrl.searchParams.entries();

  for (const [key, val] of req as any) {
    params[key] = val;
  }

  const data = await fetch(`https://v3.football.api-sports.io/fixtures?season=${params.season}&league=${params.league}`, {
    'method': 'GET',
    'headers': {
      'x-apisports-key': `${global.process.env.FOOTBALL_KEY}`
    }
  });

  if (data.status === 200) {
    const res = await data.json();
    const info = res.response.map((ele: any) => ({
      fixture: ele.fixture,
      team: ele.teams,
    }));

    return NextResponse.json(info, { status: 200 });
  } else {
    return NextResponse.json({
      message: 'There is an error. Please try again'
    }, {
      status: 500
    });
  }
}

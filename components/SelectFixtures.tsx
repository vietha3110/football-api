import { useQuery } from '@tanstack/react-query'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
import { Button } from './ui/button'

export default function SelectFixtures({ fixtureVal, setIsFixture, setFixtureVal, seasonVal, leagueVal, setIsBookmaker, setIsSeason}) {
    const {isError, data, isLoading, error } = useQuery({
        queryKey: ['fixtures'],
        queryFn: async () => {
            const res = await fetch(`/api/fixtures?season=${seasonVal}&league=${leagueVal}`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading || !data) {
        return (
            <div>Loading</div>
        )
    }
    if (isError) {
        return <span>Error, Please try again</span>
    }
    const handleFixture = (el) => () => {
        setFixtureVal(el);
        setIsFixture(false);
        setIsBookmaker(true)
    }
    const handleBack = () => {
        setIsSeason(true);
        setIsFixture(false);
    }
    return (
        <Table className='m-2'>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Fixture
                    </TableHead>
                    <TableHead>
                        Date(UTC)
                    </TableHead>
                    <TableHead>
                        Home                       
                    </TableHead>
                    <TableHead>
                        Away
                    </TableHead>
                </TableRow>
            </TableHeader>
            {
                data.map((ele) => 
                    <TableBody key={ele.fixture.id}>
                        <TableRow onClick={handleFixture(ele.fixture.id)} className='cursor-pointer'>
                            <TableCell>
                                {ele.fixture.id}
                            </TableCell>
                            <TableCell>
                                {ele.fixture.date}
                            </TableCell>
                            <TableCell>
                                {ele.team.home.name}
                            </TableCell>
                            <TableCell>
                                {ele.team.away.name}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )
            }
            <div className='mt-4'>
                <Button onClick={handleBack}>
                    Back
                </Button>
            </div>
        </Table>
    )
}

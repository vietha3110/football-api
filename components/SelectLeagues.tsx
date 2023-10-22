'use client'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'

function getDisplayText(league) {
    return `(${league.country.name}) ${league.league.name}`;
}

export function SelectLeagues({ setIsLeague, leagueVal, setLeagueVal, setIsSeason}) {
    const {isError, data, isLoading, error } = useQuery({
        queryKey: ['leagues'],
        queryFn: async () => {
            const res = await fetch(`/api/leagues/`); 
            const data = await res.json();
            data.sort((a, b) => {
                const displayTextA = getDisplayText(a);
                const displayTextB = getDisplayText(b);
                if (displayTextA === displayTextB) {
                    return 0;
                }
                if (displayTextA < displayTextB) {
                    return -1;
                }
                return 1;
            })

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

    const handleNext = () => {
        setIsLeague(false);
        setIsSeason(true);
    }
    return (
        <div className='flex flex-col'>
            <select className='h-[60px] mb-4 flex justify-center items-center border-2' value={leagueVal}onChange={e => setLeagueVal(e.target.value)}>
                <option value=''>Please choose an option</option>
                {
                    data.map(ele =>
                        <option key={ele.league.id} value={ele.league.id} >
                            {getDisplayText(ele)}
                        </option>)
                }
            </select>
            <div>
                <Button onClick={handleNext} disabled={!leagueVal}>
                    Next
                </Button>
            </div>
        </div>
    )
}

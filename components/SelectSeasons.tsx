import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'

const seasons = [2008, 2010, 2011, 2023, 2022]

export default function SelectSeasons({ setIsSeason, setIsFixture, setSeasonVal, seasonVal, setIsLeague}) {
    const {isError, data, isLoading, error } = useQuery({
        queryKey: ['seasons'],
        queryFn: async () => {
            const res = await fetch(`/api/seasons/`); 
            const data = await res.json();
            return data.response;
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
        setIsSeason(false);
        setIsFixture(true);
    }

    const handleBack = () => {
        setIsSeason(false);
        setIsLeague(true);
    }
    return (
        <div className='flex flex-col'>
            <select className='h-[60px] mb-4 flex justify-center items-center border-2' value={seasonVal} onChange={e => setSeasonVal(e.target.value)}>
                <option value=''>Please choose an option</option>
                {
                    data.map((ele:number) =>
                        <option key={ele} value={ele}>
                            {ele}
                        </option>)
                }
            </select>
            <div className='w-full flex justify-between'>
                <Button onClick={handleBack}>
                    Back
                </Button>
                <Button onClick={handleNext} disabled={!seasonVal}>
                    Next
                </Button>
            </div>
        </div>  
    )
}

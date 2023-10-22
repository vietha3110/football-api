import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { useQuery } from '@tanstack/react-query'
import { Button } from './ui/button'

export default function SelectOdds({ setIsOdd, setOddVal, oddVal, seasonVal, bookmakerVal, leagueVal, fixtureVal, setIsBookmaker }) {
    const {isError, data, isLoading, error } = useQuery({
        queryKey: ['odds'],
        queryFn: async () => {
            const res = await fetch(`/api/odds?season=${seasonVal}&league=${leagueVal}&bookmaker=${bookmakerVal}&fixture=${fixtureVal}`);
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
    const handleBack = () => {
        setIsOdd(false);
        setIsBookmaker(true);
    }
    return (
        <div>
            <div className='w-full'>
                <JsonView data={data}  shouldExpandNode={allExpanded} style={defaultStyles}/>
            </div>
            <div>
                <Button onClick={handleBack}>
                    Back
                </Button>
            </div>
        </div>
    )
}

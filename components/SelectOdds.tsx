import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { useQuery } from '@tanstack/react-query';
import { Button } from './ui/button';

type Props = {
  setIsOdd: (_: boolean) => any,
  seasonVal: number,
  bookmakerVal: number,
  leagueVal: number,
  fixtureVal: number,
  setIsBookmaker: (_: boolean) => any,
};

export default function SelectOdds({ setIsOdd, seasonVal, bookmakerVal, leagueVal, fixtureVal, setIsBookmaker }: Props) {
  const { isError, data, isLoading, error } = useQuery({
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
        <JsonView data={data} shouldExpandNode={allExpanded} style={defaultStyles} />
      </div>
      <div>
        <Button onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  )
}

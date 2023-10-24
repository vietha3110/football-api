import { useQuery } from '@tanstack/react-query'
import { Button } from './ui/button'

interface Response {
  id: number,
  name: String
}

interface ResponseWrapper {
  response: Response[]
}

interface Props {
  setIsBookmaker: (_: boolean) => any,
  setBookmakerVal: (_: number) => any,
  bookmakerVal: number,
  setIsOdd: (_: boolean) => any,
  setIsFixture: (_: boolean) => any,
}

export default function SelectBookmakers({ setIsBookmaker, setBookmakerVal, bookmakerVal, setIsOdd, setIsFixture }: Props) {
  const { isError, data, isLoading, error } = useQuery({
    queryKey: ['bookmakers'],
    queryFn: async () => {
      const res = await fetch(`/api/bookmakers/`);
      const data = (await res.json()) as ResponseWrapper;
      return data.response;
    }
  });

  if (isLoading || !data) {
    return (
      <div>Loading</div>
    )
  }
  if (isError) {
    return <span>Error, Please try again</span>
  }

  const handleNext = () => {
    setIsOdd(true);
    setIsBookmaker(false);
  }
  const handleBack = () => {
    setIsBookmaker(false);
    setIsFixture(true);
  }
  return (
    <div className='flex flex-col'>
      <select className='h-[60px] mb-4 flex justify-center items-center border-2' value={bookmakerVal} onChange={e => setBookmakerVal(+e.target.value)}>
        <option value=''>Please choose an option</option>

        {
          data.map(ele =>
            <option key={ele.id} value={ele.id} >
              {ele.name ? ele.name : ''}
            </option>)
        }
      </select>
      <div className='flex flex-row justify-between'>
        <Button onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!bookmakerVal}>
          Next
        </Button>
      </div>
    </div>
  )
}

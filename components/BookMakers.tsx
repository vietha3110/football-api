import { useQuery } from '@tanstack/react-query'


export default function BookMakers() {
    const {isError, data, isLoading, error } = useQuery({
        queryKey: ['bookmakers'],
        queryFn: async () => {
            const res = await fetch(`/api/bookmakers/`); 
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
    return (
        <div>
            {
                data.map((bookmaker: {id: number, name: string})=>
                    <div key={bookmaker.id} className='flex flex-row'> 
                        <span className='px-4'>{bookmaker.id}</span>
                        <span>{bookmaker.name}</span>
                    </div>
                )
            }
        </div>
    )
}

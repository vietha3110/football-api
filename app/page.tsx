import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className='w-full px-2'>
        <Tabs defaultValue='bookmaker' className='w-full'>
          <TabsList className='w-full'>
              <TabsTrigger value='bookmaker' className='w-1/4'>Book Makers</TabsTrigger>
              <TabsTrigger value='odds'className='w-1/4'>Odds</TabsTrigger>
              <TabsTrigger value='fixtures' className='w-1/4'>Fixtures</TabsTrigger>
              <TabsTrigger value='leagues'className='w-1/4'>Leagues</TabsTrigger>
          </TabsList>
          <TabsContent value='bookmaker' className='w-full'>bookmarkers</TabsContent>
          <TabsContent value='odds'className='w-full'>odds</TabsContent>
          <TabsContent value='fixtures' className='w-full'>fixtures</TabsContent>
          <TabsContent value='leagues'className='w-full'>leagues</TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

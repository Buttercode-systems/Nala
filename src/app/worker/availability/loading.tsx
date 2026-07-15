export default function AvailabilityLoading(){
 return <main className="min-h-screen bg-[#f3efe6] px-3 py-4 text-[#12211a] sm:px-5 sm:py-6 lg:px-8 lg:py-8">
  <div className="mx-auto w-full max-w-6xl">
   <div className="h-11 w-52 animate-pulse rounded-full bg-white"/>
   <div className="mt-5 h-64 animate-pulse rounded-[24px] bg-[#0d2b20] sm:rounded-[30px]"/>
   <div className="mt-4 h-80 animate-pulse rounded-[24px] bg-white sm:mt-5 sm:rounded-[28px]"/>
   <div className="mt-4 grid gap-4 sm:mt-5 lg:grid-cols-2">
    {Array.from({length:4}).map((_,index)=><div key={index} className="h-48 animate-pulse rounded-[22px] bg-[#fffdf8] sm:rounded-[24px]"/>)}
   </div>
  </div>
 </main>;
}

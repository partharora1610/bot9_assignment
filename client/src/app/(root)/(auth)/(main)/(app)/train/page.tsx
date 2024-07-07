import { TrainContent, TrainDataSearch } from "@/components/train/TrainContent"
import { getTraingData } from "@/lib/actions/data.action"

const Page = async () => {
  const data = await getTraingData()

  return (
    <main className="flex-1  ">
      <TrainDataSearch />
      <TrainContent data={data} />
    </main>
  )
}

export default Page

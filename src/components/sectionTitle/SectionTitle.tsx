import { Separator } from "@/components/ui/separator"

const SectionTitle = ({text}:{text:string}) => {
  return (
    <div>
      <h2 className="text-3xl font-medium tracking-wider capitalize mb-4">{text}</h2>
      <Separator className="mb-2"/>
    </div>
  )
}
export default SectionTitle
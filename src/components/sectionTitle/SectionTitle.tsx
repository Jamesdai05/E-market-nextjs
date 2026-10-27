import { Separator } from "@/components/ui/separator"

const SectionTitle = ({text}:{text:string}) => {
  return (
    <div>
      <h2 className="textt-3xl font-medium tracking-wider capitalized mb-8">{text}</h2>
      <Separator />
    </div>
  )
}
export default SectionTitle
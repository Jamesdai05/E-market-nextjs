import {cn} from "@/lib/utils"

type EmptylistProps = {
  className?: string;
  heading?: string;
}

const Emptylist = ({heading="No items found",className}:EmptylistProps) => {
  return (
    <h2 className={cn("text-xl",className)}>{heading}</h2>
  )
}
export default Emptylist
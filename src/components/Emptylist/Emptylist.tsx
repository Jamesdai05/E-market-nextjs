import {cn} from "@/lib/utils"

type EmptylistProps = {
  className?: string;
  heading?: string;
}

const Emptylist = ({heading="No items found",className}:EmptylistProps) => {
  return (
    <p className={cn("text-xl",className)}>{heading}</p>
  )
}
export default Emptylist
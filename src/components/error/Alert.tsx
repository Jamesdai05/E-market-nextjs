import type { ReactNode } from "react"
import { cn } from "@/lib/utils"


type AlertProps = {
  children: ReactNode;
  className?:string
}

const Alert= ({ className, children }: AlertProps) => {
  if(!children) return null

  return (
    <p role="alert" className={cn("text-red-600 text-xs",className)}>{children}</p>
  )
}
export default Alert;
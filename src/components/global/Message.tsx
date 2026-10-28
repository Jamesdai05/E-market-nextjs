import type { ReactNode } from "react"
import { cn } from "@/lib/utils";


type MessageType="info" | "success" | "warning" | "error";

type MessageProp = {
  type?: MessageType;
  className?: string;
  children: ReactNode;
}


const MessageStyleProps: Record < MessageType, string >= {
  info: "bg-blue-50 text-blue-600 border-blue-200",
  warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
  success: "bg-green-50 text-green-700 border-green-200",
  error:"text-red-600 border-red-200"
}


const Message = ({ type="info", className, children }:MessageProp) => {

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={cn("rounded-lg border p-4 text-sm font-medium",className,MessageStyleProps[type])}>{children}</div>
  )
}
export default Message
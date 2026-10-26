import type { ReactNode } from "react"

const FormContainer = ({ children }: { children:ReactNode}) => {
  return (
    <div className="form-container">{children}</div>
  )
}
export default FormContainer
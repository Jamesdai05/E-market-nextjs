const Row = ({ label, value, bold }: { label: string; value: number; bold?:boolean}) => {
  return (
    <div className={`flex items-center justify-between p-2 ${bold ? "text-base font-semibold" : ""}`}>
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span className="text-lg">${value.toFixed(2)}</span>
    </div>
  )
}
export default Row;
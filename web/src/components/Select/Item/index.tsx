import * as Select from "@radix-ui/react-select"
import { Check } from "phosphor-react"

interface SelectProps{
  value: string,
  title: string
}
export default function SelectItem({value, title }:SelectProps){
  return(
    <Select.Item 
    value={value} 
    className="
      flex 
      relative 
      w-15 
      h-5 
      px-4
      items-center
      flex-row-reverse
      justify-end
      gap-1 
      text-white 
      select-none 
      hover:bg-slate-400 
      hover:rounded">
    <Select.ItemText>
      {title}
    </Select.ItemText>
    <Select.ItemIndicator>
      <Check size={14}/>
    </Select.ItemIndicator>
  </Select.Item>
  )
}
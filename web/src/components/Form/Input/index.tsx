import { InputHTMLAttributes } from "react";

interface propsHtml extends InputHTMLAttributes<HTMLInputElement>{}

export default function Input(props:propsHtml){
  return(
    <input 
      {...props}
      className="
        bg-[#18181B] 
          rounded 
          py-4 
          px-3
          text-sm
          leading-6
          placeholder:text-zinc-500"
    />
  );
}
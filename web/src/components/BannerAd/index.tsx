import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export function BannerAd(){
  return(
    <>
    <div>
      <strong className='font-black text-white text-2xl block'>
        Não encontrou o seu duo?
      </strong>
      <span className='text-zinc-300'>
        Publique um anúncio para encontrar novos players
      </span>
    </div>
    <Dialog.Trigger 
      className="
        bg-violet-500 
        text-white rounded 
        py-2 
        px-4 
        hover:bg-violet-600 
        flex 
        flex-row 
        items-center 
        gap-3"
    >
      <MagnifyingGlassPlus size={24}/>
      Publicar Anúncio
    </Dialog.Trigger>
    </>
  )
}
interface ItemProps{
  url?:string,
  imgUrl:string,
  title:string,
  ads: number,
}
export default function Item(props:ItemProps){
  return(
    <a href="#" className="relative rounded-lg overflow-hidden">
      <img src={props.imgUrl} />
      <div className="w-full pt-16 pb-4 px-4 bg-nlw-game-gradient absolute bottom-0 right-0 left-0">
        <strong className="text-white font-bold block">{props.title}</strong>
        <span className="text-zinc-300 text-sm block">
            {props.ads}
            {props.ads%2==0 && props.ads > 0?' anúncios' : ' anúncio'}
        </span>
      </div>
    </a>
  )
}
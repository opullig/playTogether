
export default function Carroussel(props:any){
  return (
    <div className="
      flex 
      flex-row 
      gap-6
      w-4/5
      ml-10
    ">
      {props.children}
    </div>
  )
}
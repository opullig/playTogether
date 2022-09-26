import Logo from "../Logo";

export default function Header(){
  return (
    <div className='w-full flex flex-col items-center mt-20 mb-16'>
      <Logo />
      <h1 className="
        font-black 
        text-white 
        text-6xl"> 
        Seu 
        <span className="
          text-transparent 
          bg-clip-text 
          bg-nlw-gradient">
            Duo
        </span> 
        Aqui
      </h1>
    </div>
  )
}
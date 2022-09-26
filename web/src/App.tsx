import { useEffect, useState } from 'react'
import axios from 'axios'
import * as Dialog from '@radix-ui/react-dialog'

import Header from './components/Header'
import Carroussel from './components/Carroussel'
import Item from './components/Carroussel/Item'
import { BannerAd } from './components/BannerAd'
import { Modal } from './components/Modal'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count:{
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(()=>{
    axios('http://localhost:3333/games')
      .then(response => setGames(response.data))
  },[]);

  return (
    <div className='flex flex-col items-center'>
      <Header />
      <Carroussel>
        {games.map(game =>
          <Item
            key={game.id} 
            title={game.title} 
            ads={game._count.ads} 
            imgUrl={game.bannerUrl}
          />)
        }
      </Carroussel>
      <Dialog.Root>
        <div 
          className="
          bg-[#2A2634] 
          self-stretch 
          mt-8 px-8 py-6 
          rounded-lg 
          flex 
          w-3/4
          ml-auto
          mr-auto
          justify-around"
        >
          <BannerAd />
          <Modal />
        </div>
      </Dialog.Root>
    </div>
  )
}

export default App

import { FormEvent, useEffect, useState } from "react";
import { Check, GameController, CaretDown } from "phosphor-react";
import axios from 'axios';

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Select from "@radix-ui/react-select"

import Input from "../Form/Input";
import SelectItem from "../Select/Item";

interface gameProps{
  id: string,
  title: string
}

export function Modal(){
  
  const [games, setGames] = useState<gameProps[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');

  useEffect(()=>{
    
    axios('http://localhost:3333/games')
      .then(response => setGames(response.data))
  },[])

  async function handleCreateAd(event: FormEvent){
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:3333/games/${selectedGame}/ads`,{
        name:data.nickname,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })
    } catch (error) {
        console.log(error)
    }

  }

  return (
    <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 fixed inset-0"/>
            <Dialog.Content 
              className="
                fixed 
                bg-[#2A2634] 
                py-8 
                px-10 
                text-white 
                top-1/2 
                left-1/2 
                -translate-x-1/2 
                -translate-y-1/2
                rounded-lg
                w-[480px]
                gap-8"
              >
              <Dialog.Title className="font-black text-3xl mb-8"> 
                Publique um Anúncio
              </Dialog.Title>
              <form onSubmit={handleCreateAd} className="flex flex-col gap-4">
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'> 
                    Qual o game?
                  </label>
                  <Select.Root onValueChange={setSelectedGame} value={selectedGame}>
                    <Select.Trigger 
                      className="
                        flex 
                        flex-row 
                        justify-between 
                        items-center 
                        bg-[#18181B] 
                        rounded 
                        py-4
                        px-3 
                        text-sm
                        leading-6
                        text-zinc-500
                      "
                    >
                      <Select.Value placeholder="Selecione o game que deseja jogar"/>
                      <Select.Icon  asChild={true}>
                        <CaretDown size={20} color="rgb(113,113,122)"/>
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal >
                      <Select.Content>
                        <Select.Viewport 
                          className="
                            flex 
                            flex-col 
                            w-full 
                            h-fit 
                            gap-2
                            px-3 py-5 
                            rounded 
                            overflow-hidden 
                            bg-zinc-800 
                            ">
                        {games.map((game)=>  
                          <SelectItem key={game.id} value={game.id} title={game.title} />
                        )}
                         
    
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="nickname" className='font-semibold'> 
                    Seu nome (ou nickname)?
                  </label>
                  <Input 
                    type="text" 
                    id="nickname" 
                    name="nickname" 
                    placeholder="Como te chamam dentro do game?" 
                  />
                </div>
                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying" className='font-semibold'> 
                      Joga há quantos anos?
                    </label>
                    <Input type="number" id="yearsPlaying" name="yearsPlaying"
                      placeholder="Tudo bem ser ZERO"/>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord" className='font-semibold'> 
                      Qual seu Discord?
                    </label>
                    <Input type="text" id="discord" name="discord" placeholder="Usuario#0000"/>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="weekDays" className='font-semibold'> 
                      Quando costuma jogar?
                    </label>
                    <ToggleGroup.Root 
                      type="multiple" 
                      className="flex flex-row gap-1"
                      onValueChange={setWeekDays}
                      value={weekDays}
                    >
                      <ToggleGroup.Item
                         value="0" 
                         className={`w-10 h-10 font-bold rounded ${weekDays.includes('0') ? 'bg-violet-500' :'bg-zinc-900'}`} 
                         title="Domingo"
                      >
                        D
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                         value="1" 
                         className={`w-10 h-10 font-bold rounded ${weekDays.includes('1') ? 'bg-violet-500' :'bg-zinc-900'}`} 
                         title="Segunda"
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                         value="2" 
                         className={`w-10 h-10 font-bold rounded ${weekDays.includes('2') ? 'bg-violet-500' :'bg-zinc-900'}`} 
                         title="Terca"
                      >
                        T
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                         value="3" 
                         className={`w-10 h-10 font-bold rounded ${weekDays.includes('3') ? 'bg-violet-500' :'bg-zinc-900'}`} 
                         title="Quarta"
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                         value="4" 
                         className={`w-10 h-10 font-bold rounded ${weekDays.includes('4') ? 'bg-violet-500' :'bg-zinc-900'}`} 
                         title="Quinta"
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                         value="5" 
                         className={`w-10 h-10 font-bold rounded ${weekDays.includes('5') ? 'bg-violet-500' :'bg-zinc-900'}`} 
                         title="Sexta"
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                         value="6" 
                         className={`w-10 h-10 font-bold rounded ${weekDays.includes('6') ? 'bg-violet-500' :'bg-zinc-900'}`} 
                         title="Sabado"
                      >
                        S
                      </ToggleGroup.Item>
                    </ToggleGroup.Root>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="hour" className='font-semibold'> 
                      Qual horário do dia?
                    </label>
                    <div className="flex gap-2">
                      <Input type="time" id="hourStart" name="hourStart" placeholder="De"/>
                      <Input type="time" id="hourEnd" name="hourEnd" placeholder="Até"/>
                    </div>
                  </div>
                </div>
                <div className='flex gap-2 text-sm items-center'>
                  <Checkbox.Root
                    checked={useVoiceChannel}
                    onCheckedChange={(checked)=>{
                      if(checked === true)
                        setUseVoiceChannel(true)
                      else
                        setUseVoiceChannel(false)
                    }} 
                    className="
                      w-6 
                      h-6 
                      rounded 
                      bg-zinc-900 
                      flex 
                      justify-center 
                      items-center
                    ">
                    <Checkbox.Indicator>
                      <Check className="w-4 h-4 text-emerald-400 "/>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label htmlFor="voiceChat"> 
                    Costumo me conectar ao chat de voz
                  </label>
                </div>
                <footer className='flex flex-row gap-4 justify-end mt-8'>
                  <Dialog.Close 
                    type="button"
                    className="
                    bg-zinc-500 
                      py-3 
                      px-5 
                      font-semibold
                      rounded"
                  >
                    Cancelar
                  </Dialog.Close>
                  <button 
                    type="submit"
                    className="
                     flex
                     flex-row
                     justify-center
                     items-center
                     gap-3
                     bg-violet-500
                     py-3 
                     px-5 
                     rounded
                     font-semibold"
                  >
                    <GameController />
                    Encontrar Duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
  )
}
import express, { json } from "express";
import {PrismaClient} from '@prisma/client'
import cors from 'cors'

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

function convertHourStringToMinutes(hourString: string){
  const [hours, minutes] = hourString.split(':').map(Number);
  const minutesAmount = (hours * 60) + minutes;
  return minutesAmount;
}

function convertMinutesToHourString(minutesAmount: number){
  const hours = Math.floor(minutesAmount/60);
  const minutes = minutesAmount % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2,'0')}`
  
}

app.get('/games', async(request, response)=>{
    const games = await prisma.game.findMany({
      include:{
        _count:{
          select:{
            ads: true
          }
        }
      }
    }
    );
  
  return response.json(games)
});

app.get('/games/:id/ads', async(request, response)=> {
  const gameId = request.params.id;
  const ads = await prisma.ad.findMany({
    select:{
      id: true,
      name: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      yearsPlaying: true,
      useVoiceChannel: true,
    },
    where:{
      gameId
    },
    orderBy:{
      createdAt: 'desc'
    }
  })
  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd)
    }
  }))
});

app.get('/ads/:id/discord', async(request, response)=> {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select:{
      discord:true
    },
    where:{
      id:adId
    }
  })


  return response.json({discord : ad.discord})
});

app.post('/games/:id/ads', async(request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data:{
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel

    }
  })
  return response.json(ad)
})

app.listen(3333);
import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Virag } from './virag.js';
import type { CreateViragDto } from './createvirag.dto.js';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  viragok: Virag[] = [
    {
      fajta: 'Rózsa',
      szin: 'piros',
      ar: 790,
    },
    {
      fajta: 'Tulipán',
      szin: 'sárga',
      ar: 580,
    }
  ]

  @Get('ujvirag')
  @Render('ujviragform')
  ujViragForm(){
    return{
      viragok : this.viragok
    }
  }

  @Post('ujvirag')
  UjVirag(@Body() body: CreateViragDto){
    if(!body.fajta)
    {
      return{
      viragok: this.viragok,
      error: 'A fajtát kötelező megadni'
      }
    }
    if(!['prios','sárga','fehér'].includes(body.szin))
    {
      return{
      viragok: this.viragok,
      error: 'Érvénytelen szín'
      }
    }
    const ar = Number(body.ar);
    if(!ar || isNaN(ar) || ar < 0)
    {
      return{
      viragok: this.viragok,
      error: 'Az ár pozitív szám kell legyen'
      }
    }

    const UjVirag: Virag = {
      fajta : body.fajta,
      szin: body.szin,
      ar: Number(body.ar)
    };
    this.viragok.push(UjVirag);

    return{
      viragok: this.viragok,
    };

  }


  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }
}

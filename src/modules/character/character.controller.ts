import { Controller, Get, Query } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get()
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('name') name?: string,
  ) {
    let parsedPage: number;
    let parsedLimit: number;

    if (page) {
      parsedPage = +page;
    }

    if (limit) {
      parsedLimit = +limit;
    }
    return this.characterService.getAll(parsedPage, parsedLimit, name);
  }
}

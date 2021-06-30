import { HttpModule, Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  imports: [HttpModule],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}

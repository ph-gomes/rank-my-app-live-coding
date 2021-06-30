import { Module } from '@nestjs/common';
import { CharacterModule } from './modules/character/character.module';

@Module({
  imports: [CharacterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { HttpService, Injectable, Logger } from '@nestjs/common';
import {
  CharacterDTO,
  GetAllResponse,
  InfoGetAllResponse,
} from './dto/characte.dto';

@Injectable()
export class CharacterService {
  private logger = new Logger('Character Service');

  constructor(private httpService: HttpService) {}

  rawToCharacter(data: any): CharacterDTO {
    const character: CharacterDTO = {
      id: data.id,
      name: data.name,
      type: data.type,
      species: data.species,
      gender: data.gender,
      status: data.status,
    };

    return character;
  }

  async getData(): Promise<[CharacterDTO[], number]> {
    let url = 'http://rickandmortyapi.com/api/character';

    const { data } = await this.httpService
      .get<{ results: any[] }>(url)
      .toPromise();

    const results = data.results;
    const parsedResults = results.map((raw) => this.rawToCharacter(raw));
    const count = results.length;

    return [parsedResults, count];
  }

  filterDataByName(
    characters: CharacterDTO[],
    name: string,
  ): [CharacterDTO[], number] {
    const lowerName = name.toLowerCase();
    const filteredCharacters = characters.filter((character) => {
      const name = character.name.toLowerCase();
      const regex = new RegExp(lowerName);
      const result = name.match(regex);
      return result?.length ? true : false;
    });

    const count = filteredCharacters.length;

    return [filteredCharacters, count];
  }

  async getAll(
    page: number = 0,
    limit: number = 5,
    name?: string,
  ): Promise<GetAllResponse> {
    let [data, count] = await this.getData();

    if (name) {
      [data, count] = this.filterDataByName(data, name);
    }

    const pageLimit = Math.ceil(count / limit);

    if (page >= pageLimit) {
      page = pageLimit - 1;
    }

    const initialIndex = page * limit;
    const expectedFinalIndex = initialIndex + limit;
    const finalIndex = expectedFinalIndex > count ? count : expectedFinalIndex;

    const chunk = data.slice(initialIndex, finalIndex);

    const info: InfoGetAllResponse = {
      count,
      pages: pageLimit,
    };

    const response: GetAllResponse = {
      info,
      results: chunk,
    };

    return response;
  }
}

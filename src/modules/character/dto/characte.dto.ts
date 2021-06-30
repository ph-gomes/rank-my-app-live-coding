export interface CharacterDTO {
  id: string;
  name: string;
  status: string;
  type: string;
  gender: string;
  species: string;
}
export interface InfoGetAllResponse {
  count: number;
  pages: number;
}

export interface GetAllResponse {
  info: InfoGetAllResponse;
  results: CharacterDTO[];
}

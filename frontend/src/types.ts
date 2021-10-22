
export interface SelectedGeneration {
  id: number,
  selected: boolean,
  name: string
}

export interface SelectedType {
  id: number,
  selected: boolean,
  name: string
}

export interface DummyPokemon { //This is a dummy type that is being used to develop the listings.
  id: number,
  pokedexNr: number,
  type: string[],
  generation: number,
  name: string,
}

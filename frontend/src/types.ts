
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

export interface PokemonSimple {
  id: number,
  pokedexNr: number,
  name: string,
  generation: number,
  type1: string,
  type2: string
}

export interface PokemonAdvanced {
  id: number,
  pokedexNr: number,
  name: string,
  generation: number,
  species: string,
  type1: string,
  type2: string
  heightMeter: number,
  weightKg: number,
  hp: number,
  attack: number,
  defense: number,
  sp_attack: number,
  sp_defense: number,
  speed: number,
  ability1: string,
  ability2: string,
  ability3: string
}

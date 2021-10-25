
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
  weigthKg: number,
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

export interface Variables {
  where: WhereInputFields,
  orderBy: OrderByInputFields
  first: number,
  after: AfterInputFields
}

export interface WhereInputFields {
  generation?: number[]
  name?: string
  type?: string[]
}

export interface OrderByInputFields {
  pokedexNr?: string,
  name?: string,
}

export interface AfterInputFields {
  id: number
}

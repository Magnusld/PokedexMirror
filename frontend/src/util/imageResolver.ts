export function getFullSize(pokedexNr: number) {
    const formattedNumberString = pokedexNr.toString().padStart(3,"0")
    return process.env.PUBLIC_URL + '/images/fullsize/' + formattedNumberString+'.png'
}

export function getSprite(pokedexNr: number) {
    const formattedNumberString = pokedexNr.toString().padStart(3,"0")
    return process.env.PUBLIC_URL + '/images/sprites/' + formattedNumberString+'MS.png'
}

export function getThumbnail(pokedexNr: number) {
    const formattedNumberString = pokedexNr.toString().padStart(3,"0")
    return process.env.PUBLIC_URL + '/images/thumbnails/' + formattedNumberString+'.png'
}


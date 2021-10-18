import {PrismaClient, Prisma} from '@prisma/client';
import {PokemonCsv} from "../interfaces/pokemonCsv";

import * as fs from 'fs';
import * as path from 'path';
import * as csv from '@fast-csv/parse';

const prisma = new PrismaClient();


async function main() {

    const results = [] as PokemonCsv[]
    fs.createReadStream(path.resolve(__dirname, "../data", "PokemonData.csv"))
        .pipe(csv.parse({headers: true, delimiter: ";"}))
        .on("error", err => console.error(err))
        .on("data", async (entry: PokemonCsv) => {
            await prisma.pokemon.create({
                data: {
                    pokedexNr: parseInt(entry.pokedex_number),
                    name: entry.name,
                    generation: parseInt(entry.generation),
                    species: entry.species,
                    ability1: entry.ability_1,
                    ability2: entry.ability_2,
                    ability3: entry.ability_hidden,
                    heightMeter: parseFloat(entry.height_m),
                    weightKg: parseFloat(entry.weight_kg),
                    type1: entry.type_1,
                    type2: entry.type_2,
                    hp: parseInt(entry.hp),
                    attack: parseInt(entry.attack),
                    defense: parseInt(entry.defense),
                    sp_attack: parseInt(entry.sp_attack),
                    sp_defense: parseInt(entry.sp_defense),
                    speed: parseInt(entry.speed)
                }
            }).catch(e => console.log(e))
        })
        .on('end', (rowCount: number) => {
            console.log(results)
            console.log(`Parsed ${rowCount} rows`);
        });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

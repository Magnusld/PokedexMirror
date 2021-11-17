import {PrismaClient} from "@prisma/client";

export async function seedForTesting(client: PrismaClient) {
    await client.pokemon.create(pokemon1);
    await client.pokemon.create(pokemon2);
    await client.pokemonRating.create(rating)
}

export async function seedTestData() {
    const prismaClient = new PrismaClient({datasources: {db: {url: "file:./test.db"}}});
    await seedForTesting(prismaClient);
    prismaClient.$disconnect();
}

const pokemon1 = {
    data: {
        id: 0,
        name: "TestPokemon1",
        generation: 1,
        pokedexNr: 5,
        hp: 5,
        attack: 5,
        sp_attack: 5,
        defense: 5,
        sp_defense: 5,
        speed: 5,
        ability1: "TestAbility1",
        ability2: "TestAbility2",
        ability3: "TestAbility3",
        species: "Test1",
        type1: "Fire",
        type2: "Flying",
        heightMeter: 5,
        weightKg: 5,
    }
};

const pokemon2 = {
    data: {
        id: 1,
        name: "TestPokemon2",
        generation: 6,
        pokedexNr: 1,
        hp: 5,
        attack: 5,
        sp_attack: 5,
        defense: 5,
        sp_defense: 5,
        speed: 5,
        ability1: "TestAbility1",
        ability2: "TestAbility2",
        ability3: "TestAbility3",
        species: "Test2",
        type1: "Grass",
        type2: undefined,
        heightMeter: 5,
        weightKg: 5,
    }
};

const rating = {
    data: {
        id: 0,
        pokemonId: 0,
        rating: 5,
        userGuid: "testGuid"
    }
};
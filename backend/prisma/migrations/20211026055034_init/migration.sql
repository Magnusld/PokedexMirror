-- CreateTable
CREATE TABLE "PokemonRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userGuid" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokedexNr" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "generation" INTEGER NOT NULL,
    "species" TEXT NOT NULL,
    "type1" TEXT NOT NULL,
    "type2" TEXT,
    "heightMeter" REAL,
    "weightKg" REAL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "sp_attack" INTEGER NOT NULL,
    "sp_defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "ability1" TEXT,
    "ability2" TEXT,
    "ability3" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "PokemonRating.userGuid_pokemonId_unique" ON "PokemonRating"("userGuid", "pokemonId");

-- CreateIndex
CREATE INDEX "Pokemon.name_index" ON "Pokemon"("name");

-- CreateIndex
CREATE INDEX "Pokemon.pokedexNr_index" ON "Pokemon"("pokedexNr");

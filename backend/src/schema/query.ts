import {queryType} from "nexus";

export const Query = queryType({

    definition: t => {
        t.crud.pokemon();
        t.crud.pokemons({
            pagination: true,
            filtering: true,
            ordering: true,
        });
        t.crud.pokemonRating();
        t.crud.pokemonratings({
            pagination: true,
            filtering: true,
            ordering: true,
        });
    }
});
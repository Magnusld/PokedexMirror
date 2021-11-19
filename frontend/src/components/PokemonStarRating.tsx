import {SetStateAction, useEffect, useState} from "react";
import {Rating} from "react-simple-star-rating";
import {gql, useMutation, useQuery} from "@apollo/client";
import {getGuid} from "../util/guidHelper";
import {GET_POKEMON_INFO} from "../pages/Info";

export type PokemonStarRatingProps = {
    pokemonId: number
}

interface RatingDetails {
    "pokemonRating": {
        "rating": number
    } | null
}

const GET_RATING = gql`query Query($where: PokemonRatingWhereUniqueInput!) {
    pokemonRating(where: $where) {
        rating
    }
}`

interface RatingQueryVars {
    "where": {
        "userGuid_pokemonId": {
            "userGuid": string,
            "pokemonId": number
        }
    }
}

const NEW_RATING = gql`mutation CreateRatingMutation($data: RatingCreateInput!) {
    CreateRating(data: $data) {
        id
    }
}`

interface RatingNewDetails {
    "data": {
        "pokemonId": number,
        "userGuid": string,
        "rating": number
    }
}

const SAVE_RATING = gql`mutation ChangeRatingMutation($data: RatingUpdateInput!) {
    ChangeRating(data: $data) {
        id
    }
}`

interface RatingSaveDetails {
    "data": {
        "ratingToUpdate": {
            "pokemonId": number,
            "userGuid": string
        },
        "newRating": number
    }
}

interface UpsertResponse {
    "CreateRating": {
        "id": number
    }
}


export default function PokemonStarRating(props: PokemonStarRatingProps) {
    const [rating, setRating] = useState(0)
    const [hasRated, setHasRated] = useState(false)
    const {data} = useQuery<RatingDetails,RatingQueryVars>(GET_RATING, {
        variables: {where: {userGuid_pokemonId: { userGuid: getGuid(), pokemonId: props.pokemonId}}}
    })
    const [newRatingFunction] = useMutation<UpsertResponse, RatingNewDetails>(NEW_RATING, {
        variables: { data: { pokemonId: props.pokemonId, rating: rating, userGuid: getGuid()}},
        refetchQueries: [GET_RATING, GET_POKEMON_INFO]
    })
    const [saveRatingFunction] = useMutation<UpsertResponse,RatingSaveDetails>(SAVE_RATING, {
        variables: { data: {
            newRating: rating,
                ratingToUpdate: { pokemonId: props.pokemonId, userGuid: getGuid()
                }
            }},
        refetchQueries: [GET_RATING, GET_POKEMON_INFO]
    })

    const handleRating = async (rate: SetStateAction<number>) => {
        await setRating(rate)
        if (!hasRated) {
            await newRatingFunction()
        } else {
            await saveRatingFunction()
        }
    }

    useEffect( () => {
        if (data?.pokemonRating?.rating) {
            setRating(data.pokemonRating.rating)
            setHasRated(true)
        }
    },[data])

    return (
        <div className={"personal-rating-container"}>
            <div className={"rating-number"}>Din vurdering:</div>
            <Rating onClick={handleRating} ratingValue={rating} stars={5} />
        </div>
    )
}
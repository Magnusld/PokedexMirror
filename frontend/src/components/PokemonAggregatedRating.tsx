import {RatingView} from "react-simple-star-rating";

export type PokemonAggregatedRatingProps = {
    rating: number
}

export default function PokemonAggregatedRating( props: PokemonAggregatedRatingProps) {

    return (
        <div className={"aggregated-rating-container"}>
            <div className={"rating-number"}>Andres vurdering:</div>
            <RatingView ratingValue={props.rating} stars={5} />
        </div>
    )
}
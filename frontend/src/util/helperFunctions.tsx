import React, {useEffect, useState} from 'react';

import {ReactComponent as Bug} from "../assets/typeIconsSvg/Pokémon_Bug_Type_Icon.svg";
import {ReactComponent as Dark} from "../assets/typeIconsSvg/Pokémon_Dark_Type_Icon.svg";
import {ReactComponent as Dragon} from "../assets/typeIconsSvg/Pokémon_Dragon_Type_Icon.svg";
import {ReactComponent as Electric} from "../assets/typeIconsSvg/Pokémon_Electric_Type_Icon.svg";
import {ReactComponent as Fairy} from "../assets/typeIconsSvg/Pokémon_Fairy_Type_Icon.svg";
import {ReactComponent as Fighting} from "../assets/typeIconsSvg/Pokémon_Fighting_Type_Icon.svg";
import {ReactComponent as Fire} from "../assets/typeIconsSvg/Pokémon_Fire_Type_Icon.svg";
import {ReactComponent as Flying} from "../assets/typeIconsSvg/Pokémon_Flying_Type_Icon.svg";
import {ReactComponent as Ghost} from "../assets/typeIconsSvg/Pokémon_Ghost_Type_Icon.svg";
import {ReactComponent as Grass} from "../assets/typeIconsSvg/Pokémon_Grass_Type_Icon.svg";
import {ReactComponent as Ground} from "../assets/typeIconsSvg/Pokémon_Ground_Type_Icon.svg";
import {ReactComponent as Ice} from "../assets/typeIconsSvg/Pokémon_Ice_Type_Icon.svg";
import {ReactComponent as Normal} from "../assets/typeIconsSvg/Pokémon_Normal_Type_Icon.svg";
import {ReactComponent as Poison} from "../assets/typeIconsSvg/Pokémon_Poison_Type_Icon.svg";
import {ReactComponent as Psychic} from "../assets/typeIconsSvg/Pokémon_Psychic_Type_Icon.svg";
import {ReactComponent as Rock} from "../assets/typeIconsSvg/Pokémon_Rock_Type_Icon.svg";
import {ReactComponent as Steel} from "../assets/typeIconsSvg/Pokémon_Steel_Type_Icon.svg";
import {ReactComponent as Water} from "../assets/typeIconsSvg/Pokémon_Water_Type_Icon.svg";

// FOR FUNCTIONS USED IN MULTIPLE .ts/.tsx FILES

/**
* takes potential type 1 and type 2 and makes it into a list
* @param types rest param with one or two types
* @returns list with types
*/
export function typesToList(...types : string[]) : string[] {
    const typeList = types.filter((type) => type);
    return typeList;
}

/**
 * Converts up to 2 pokemon-types to emblems
 * @param type1 of pokemon
 * @param type2 of pokemon
 * @returns jsx with type-emblems
 */
export function typeListToEmblems(type1: string, type2: string) : JSX.Element[] {
    return typesToList(type1, type2).map((Type, i) => (
        <div key={i}>
          {Type === "Bug" ? <Bug className={"typeIcon"}/> : null}
          {Type === "Dark" ? <Dark className={"typeIcon"}/> : null}
          {Type === "Dragon" ? <Dragon className={"typeIcon"}/> : null}
          {Type === "Electric" ? <Electric className={"typeIcon"}/> : null}
          {Type === "Fairy" ? <Fairy className={"typeIcon"}/> : null}
          {Type === "Fighting" ? <Fighting className={"typeIcon"}/> : null}
          {Type === "Fire" ? <Fire className={"typeIcon"}/> : null}
          {Type === "Flying" ? <Flying className={"typeIcon"}/> : null}
          {Type === "Ghost" ? <Ghost className={"typeIcon"}/> : null}
          {Type === "Grass" ? <Grass className={"typeIcon"}/> : null}
          {Type === "Ground" ? <Ground className={"typeIcon"}/> : null}
          {Type === "Ice" ? <Ice className={"typeIcon"}/> : null}
          {Type === "Normal" ? <Normal className={"typeIcon"}/> : null}
          {Type === "Poison" ? <Poison className={"typeIcon"}/> : null}
          {Type === "Psychic" ? <Psychic className={"typeIcon"}/> : null}
          {Type === "Rock" ? <Rock className={"typeIcon"}/> : null}
          {Type === "Steel" ? <Steel className={"typeIcon"}/> : null}
          {Type === "Water" ? <Water className={"typeIcon"}/> : null}
        </div>
    ))
}
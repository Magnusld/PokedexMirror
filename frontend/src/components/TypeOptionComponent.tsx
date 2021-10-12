import React, {useState} from 'react';
import '../style/App.css';
import {Button, Form, ToggleButton} from "react-bootstrap";
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

export function TypeOptionComponent() {

  const [checked, setChecked] = useState(false) // Temp variabel

  return (
      <div style={{display: "flex", justifyContent: "center"}}>
        <div className={"filteringOptionsContainer"}>
          <div>
            <h3 style={{textAlign: "left"}}>Generasjon</h3>
          </div>
          <div className={"optionsButtonsContainer"}>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Bug style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Dark style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Dragon style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Electric style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Fairy style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Fighting style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Fire style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Flying style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Ghost style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Grass style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Ground style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Ice style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Normal style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Poison style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Psychic style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Rock style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Steel style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={checked}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => setChecked(!checked)}>
              <Water style={{height: 35, width: 35}}/></ToggleButton>
          </div>
        </div>
      </div>
  )
  /*
          By &lt;a href=&quot;//commons.wikimedia.org/wiki/User:Andreuvv&quot; title=&quot;User:Andreuvv&quot;&gt;Andreuvv&lt;/a&gt; - &lt;span class=&quot;int-own-work&quot; lang=&quot;en&quot;&gt;Own work&lt;/span&gt;, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=90080642">Link</a>
   */
}

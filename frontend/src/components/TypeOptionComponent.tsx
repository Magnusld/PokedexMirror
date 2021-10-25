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
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setAllTypesFalse, setAllTypesTrue, swapSelectedType} from "../redux/TypeSlice";
import {setAllGensTrue} from "../redux/generationSlice";

export function TypeOptionComponent() {
  const [checked, setChecked] = useState(false) // Temp variabel
  const selectedType = useSelector((state: RootState) => state.selectedType.value)
  const dispatch = useDispatch()

  const handleButtonClick = (id: number) => {
    dispatch(swapSelectedType(id))
  }

  return (
      <div style={{display: "flex", justifyContent: "center"}}>
        <div className={"filteringOptionsContainer"}>
          <div>
            <h3 style={{textAlign: "left", marginTop: 10}}>Type</h3>
          </div>
          <div className={"optionsButtonsContainer"}>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[0].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(0)}>
              <Bug style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[1].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(1)}>
              <Dark style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[2].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(2)}>
              <Dragon style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[3].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(3)}>
              <Electric style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[4].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(4)}>
              <Fairy style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[5].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(5)}>
              <Fighting style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[6].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(6)}>
              <Fire style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[7].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(7)}>
              <Flying style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[8].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(8)}>
              <Ghost style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[9].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(9)}>
              <Grass style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[10].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(10)}>
              <Ground style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[11].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(11)}>
              <Ice style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[12].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(12)}>
              <Normal style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[13].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(13)}>
              <Poison style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[14].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(14)}>
              <Psychic style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[15].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(15)}>
              <Rock style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[16].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(16)}>
              <Steel style={{height: 35, width: 35}}/></ToggleButton>
            <ToggleButton className="mb-2"
                          type="checkbox" value="1"
                          checked={selectedType[17].selected}
                          variant="outline-primary"
                          id="toggle-check"
                          onClick={() => handleButtonClick(17)}>
              <Water style={{height: 35, width: 35}}/></ToggleButton>
          </div>
          <div>
            <Button className="clearAllButton" variant="secondary"
                    onClick={() => dispatch(setAllTypesFalse())}>Fjerne alle valg</Button>
            <Button className="setAllButton" variant="secondary"
                    onClick={() => dispatch(setAllTypesTrue())}>Velg alle</Button>
          </div>
        </div>
      </div>
  )
  /*
          By &lt;a href=&quot;//commons.wikimedia.org/wiki/User:Andreuvv&quot; title=&quot;User:Andreuvv&quot;&gt;Andreuvv&lt;/a&gt; - &lt;span class=&quot;int-own-work&quot; lang=&quot;en&quot;&gt;Own work&lt;/span&gt;, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=90080642">Link</a>
   */
}

import React from 'react';
import '../style/App.css';
import { Form } from "react-bootstrap";
import {RootState} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";
import { changeSortOrder, changeSortType } from '../redux/sortSlice';

export function SortOptions() {
  const sortType = useSelector((state: RootState) => state.sort.value.type)
  const sortOrder = useSelector((state: RootState) => state.sort.value.ordering)


  const dispatch = useDispatch()

  /**
   * Change sorting type to select value
   * @param e event
   */
  function handleSortType(e: React.ChangeEvent<HTMLSelectElement>) {
      dispatch(changeSortType(e.target.value))
  }

  /**
   * Change sorting order to select value
   * @param e event
   */
  function handleSortOrder(e: React.ChangeEvent<HTMLSelectElement>) {
      dispatch(changeSortOrder(e.target.value))
  }

  return (
      <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
        <div className={"filteringOptionsContainer sortOptions"}>
          <div>
            <h3 style={{marginTop: 10}}>Sortering</h3>
          </div>
          <div className="sort-form-select">
            <div className="sort-inner-select">
                <h4>Type</h4>
                <Form.Select aria-label="Sorting type" className="sort-select" onChange={handleSortType} value={sortType}>
                    <option value="pokedexNr" >Nummer</option>
                    <option value="name">Navn</option>
                </Form.Select>
            </div>
            <div className="sort-inner-select">
                <h4>Rekkefølge</h4>
                <Form.Select aria-label="Sorting order" className="sort-select" onChange={handleSortOrder} value={sortOrder}>
                    <option value="asc">Stigende</option>
                    <option value="desc">Synkende</option>
                </Form.Select>
            </div>
          </div>
        </div>
      </div>
  )
}
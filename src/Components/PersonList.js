import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CharacterTable from './CharacterTable';


let starWarsPeople = "https://swapi.dev/api/people/?format=json"
let starWarsPlanets = "https://swapi.dev/api/planets/?format=json"
let starWarsSpecies = "https://swapi.dev/api/species/?format=json"

const PersonList = () => {

  const [people, setPeople] = useState([])
  const [planets, setPlanets] = useState([])
  const [species, setSpecies] = useState([])

React.useEffect(() => {
    
    async function fetchPeople() {
      let res1 = await fetch(starWarsPeople)
      let data1 = await res1.json(); 
      setPeople(data1.results)
    }

      async function fetchPlanets() {
      let res = await fetch(starWarsPlanets)
      let data = await res.json();
      setPlanets(data.results)
    }
  

    async function fetchSpecies(){
      let res = await fetch(starWarsSpecies)
      let data = await res.json();
      setSpecies(data.results)
    }
    
  fetchPeople();
  fetchPlanets();
  fetchSpecies();
}, [])

console.log('people', people);
console.log('planets', planets);
console.log('species', species);

  return (
<div>
    <CharacterTable 
    characterArray={people}
    />
</div>
  )
};

export default PersonList;

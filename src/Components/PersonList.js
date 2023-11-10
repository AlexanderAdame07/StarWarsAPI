import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CharacterTable from './CharacterTable';
import PageLinks from './PageNav';

const PersonList = () => {

  const [people, setPeople] = useState([]);
  const [starWarsPeopleUrl, setStarWarsPeopleUrl] = useState("https://swapi.dev/api/people/?search=");

  async function fetchPeople(searchTerm) {
    let peopleResponse = await fetch(starWarsPeopleUrl + searchTerm);
    let peopleResponseJsonResult = await peopleResponse.json();
    let people = peopleResponseJsonResult.results;

    for (let i = 0; i < people.length; i++) {
      let person = people[i];
      let homeworldResponse = await fetch(person.homeworld);
      let homeworldJson = await homeworldResponse.json();
      if (person.species != ""){
        let characterSpeciesResponse = await fetch(person.species);
        let speciesJson = await characterSpeciesResponse.json();
        people[i].species = speciesJson.name
      } else people[i].species = "unknown"

      people[i].homeworld = homeworldJson.name;
    }

    setPeople(people);
  } 

React.useEffect(() => {
  fetchPeople('');
}, [starWarsPeopleUrl])

  return (
<div>

    <CharacterTable 
    characterArray={people}
    />
    <PageLinks callback={ updatedUrl => { 
      setStarWarsPeopleUrl(updatedUrl)
    }}/>
</div>
  )
};

export default PersonList;

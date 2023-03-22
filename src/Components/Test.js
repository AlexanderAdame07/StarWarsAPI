import React, { useState, useEffect }  from 'react';
import axios from 'axios';


const Test = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [people, setPeople] = React.useState([]);
  const [species, setSpecies] = React.useState([]);
  const [planets, setPlanets] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
  const ENDPOINT = "https://swapi.dev/api/people"
    axios(ENDPOINT)
    .then((response) =>{
    setIsLoading(false);
      console.log("RES", response.data)

      if(response.data.results) {

      setPeople(response.data.results);
      } else {
      console.log("An error happened");
      }
    }) 
  const ENDPOINT2 = "https://swapi.dev/api/species"
    axios(ENDPOINT2)
    .then((responseTwo) =>{
    setIsLoading(false);
      console.log("Res2", responseTwo.data)

      if(responseTwo.data.results) {

        setSpecies(responseTwo.data.results);
      } else {
        console.log("An error happened")
      }
      })
  const ENDPOINT3 = "https://swapi.dev/api/planets"
    axios(ENDPOINT3)
    .then((responseThree) =>{
    setIsLoading(false);
      console.log("Res3", responseThree.data)

      if(responseThree.data.results) {

      setPlanets(responseThree.data.results);
      } else {
        console.log("An error happened")
      }
    })
    
  .catch(error =>{
  setIsLoading(false);
  console.log("An error happened", error);
    });
  
  const characterSwapi = axios.all([people, species, planets]).then(
    axios.spread((...allData) => {
      const allCharacterInfo = allData[0].data
      const allCharacterSpecies = allData[1].data
      const allCharacterPlanets = allData[2].data

      setPeople(allCharacterInfo)
      setSpecies(allCharacterSpecies)
      setPlanets(allCharacterPlanets)

      console.log("charactrers1", people)
      console.log("species2", species)
      console.log("planets3", planets)
      console.log("thebigone", characterSwapi)
    })
  )
  };

//Renders only the Names of characters
  const peopleRenderer = people.map((characterInformation) =>
  <div className="characterName" key={characterInformation.name}>
    {characterInformation.name}
   <div className="characterBirthYear">
    {characterInformation.birth_year}</div>
    <div className="characterHeight">
    {characterInformation.height}</div>
    <div className="characterMass">
    {characterInformation.Mass}</div>
    <div className="characterHomeWorld">
    {characterInformation.homeworld}</div>

    <div className="characterSpecies">
    {characterInformation.species.map((species) => 
      <div key={species} className="speciesLabel">

      {species}

      </div>
    )}
      {characterInformation.species?.length === 0 
        &&<div>Human</div>} 

    </div>
  </div>
  );
  

  const content = isLoading ? (
  <div>Loading...</div>
  ) : (
  <div>

    {peopleRenderer}

  </div>
    );

  return <>{content}</>;
};

export default Test;
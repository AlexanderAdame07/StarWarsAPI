import React, { useState, useEffect }  from 'react';
import axios from 'axios';


const PageLinks = (props) => {
  const [numPages, setNumPages] = useState(0);
  let starWarsPeople = "https://swapi.dev/api/people/?format=json"

  React.useEffect(() => {
    
    async function fetchPeopleLinks() {
      let peopleResponse = await fetch(starWarsPeople);
      let peopleResponseJsonResult = await peopleResponse.json();
      let countOfPeople = peopleResponseJsonResult.count;
      let resultsPerPage = peopleResponseJsonResult.results.length;
      let numPages = Math.ceil(countOfPeople / resultsPerPage);
      setNumPages(numPages);
    }

    fetchPeopleLinks();
  });

  const handleClick = (updatedUrl) => {
    props.callback(updatedUrl);
  }

  return (
    <div>
      {[...Array(numPages).keys()].map((i) => <button onClick={() => handleClick(`https://swapi.dev/api/people/?page=${i + 1}&format=json`)} >{`Page ${i + 1}`}</button> )}
    </div>
  );
}

export default PageLinks
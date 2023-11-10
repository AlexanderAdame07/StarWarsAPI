import React from 'react';
import Table from 'react-bootstrap/Table'

function CharacterTable ({ characterArray }) {

  const characterInfo = characterArray.map((character) => {
    return (
        <tr>
            <td>{character.name}</td>
            <td>{character.birth_year}</td>
            <td>{character.height}</td>
            <td>{character.mass}</td>
            <td>{character.homeworld}</td>
            <td>{character.species}</td>
        </tr>
    )
})

return (
    <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Homeworld</th>
                <th>Species</th>
            </tr>
        </thead>
        <tbody>
            { characterInfo }
        </tbody>
    </Table>
)
}
export default CharacterTable
import React from 'react';

const List = ({ persons, deleteFunction }) => {
    return (
        <>
            {persons.map(person => {
                return (
                    <div key={person.id}>
                        <p>{person.name} {person.number}</p>
                        <button onClick={() => deleteFunction(person.id)}>Remove</button>
                    </div>
                )
            })}
        </>
    )
};

export default List;

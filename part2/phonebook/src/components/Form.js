import React from 'react';

const Form = props => {
    const submitFunction = props.submitFunction;
    const nameChangeFunction = props.nameChangeFunction;
    const numberChangeFunction = props.numberChangeFunction;
    const newNumber = props.newNumber;
    const newName = props.newName;

    return (
        <form onSubmit={submitFunction}>
            <div>
                Name: <input type="text" value={newName} onChange={nameChangeFunction}/>
            </div>
            <div>
                Number: <input type="tel" value={newNumber} onChange={numberChangeFunction}/>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
};

export default Form;

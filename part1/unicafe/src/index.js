import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Heading = ({ text }) => <><h1>{text}</h1></>

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick} >{text}</button>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    return (
        <>
            <Heading text="Statistics"/>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const addGood = () => setGood(good + 1)
    const addNeutral = () => setNeutral(neutral + 1)
    const addBad = () => setBad(bad + 1)

    return (
        <div>
            <Heading text="Give feedback!" />
            <Button handleClick={addGood} text="Good"/>
            <Button handleClick={addNeutral} text="Neutral"/>
            <Button handleClick={addBad} text="Bad"/>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));

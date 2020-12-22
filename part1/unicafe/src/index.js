import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Heading = ({ text }) => <h1>{text}</h1>;
const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick} >{text}</button>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;

    if (total !== 0) {
        const avg = (good - bad) / total;
        return (
            <>
                <Heading text="Statistics"/>
                <table>
                    <tbody>
                        <Statistic text="Good" value={good} />
                        <Statistic text="Neutral" value={neutral} />
                        <Statistic text="Bad" value={bad} />
                        <Statistic text="All" value={total} />
                        <Statistic text="Average" value={avg} />
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <>
            <Heading text="Statistics"/>
            <p>No feedback received.</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const addGood = () => setGood(good + 1);
    const addNeutral = () => setNeutral(neutral + 1);
    const addBad = () => setBad(bad + 1);

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

import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => {
    return (
        <><h1>{name}</h1></>
    )
}

const Part = props => {
    const { name, exercises } = props.part

    return (
        <><p>{name} {exercises}</p></>
    )
}

const Content = props => {
    return (
        <div>
            {props.parts.map(item => <Part part={item} />)}
        </div>
    )
}

const Total = props => {
    const exercises = props.parts.map(item => item.exercises)

    return (
        <>
            <p>
                Number of exercises {exercises.reduce((acc, value) => acc + value)}
            </p>
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));

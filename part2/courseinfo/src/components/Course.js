import React from 'react';
import Header from './Header';

const Part = props => {
    const { name, exercises } = props.part

    return (
        <><p>{name} {exercises}</p></>
    )
}

const Content = props => {
    return (
        <div>
            {props.parts.map(item => <Part key={item.id} part={item} />)}
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

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;

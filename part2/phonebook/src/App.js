import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Form from './components/Form';
import List from './components/List';
import MessageBox from './components/MessageBox';
import ErrorBox from './components/ErrorBox';
import BackendService from './services/BackendServices';
import './index.css';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const filteredList = persons.filter(person => {
        const searchFor = filter.toLowerCase()
        return person.name.toLowerCase().includes(searchFor);
    });

    const handleFilterChange = event => {
        setFilter(event.target.value);
    };

    const handleNameChange = event => {
        setNewName(event.target.value);
    };

    const handleNumberChange = event => {
        setNewNumber(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (persons.map(person => person.name).includes(newName)) {
            if (window.confirm(`${newName} is already in the Phonebook, replace the old number with the new one?`)) {
                const person = persons.find(item => item.name === newName);
                const id = person.id;
                const newPerson = {
                    ...person,
                    number: newNumber,
                };

                BackendService.update(id, newPerson)
                    .then(newPersonItem => {
                        setPersons(persons.map(person => person.id !== newPerson.id ? person : newPersonItem));

                        setMessage(`${person.name}'s entry has been updated!`);
                        setTimeout(() => {
                            setMessage(null);
                        }, 5000);
                    })
                    .catch(() => {
                        setNewName('');
                        setNewNumber('');
                        setPersons(persons.filter(person => person.id !== id));
                        setErrorMessage(`${person.name} has already been deleted!`);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 6000);
                    });
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            };

            BackendService.create(newPerson)
                .then(newPersonResponse => {
                    setPersons(persons.concat(newPersonResponse));
                    setNewName('');
                    setNewNumber('');

                    setMessage(`${newPerson.name} added successfully!`);
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);
                })
                .catch(error => {
                    alert(`[${error}] returned from the server.`);
                });
        }
    };

    const handleDelete = id => {
        const personToDelete = persons.find(person => person.id === id);
        if (window.confirm(`Remove ${personToDelete.name}?`)) {
            BackendService.remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id));
                })
                .catch(error => {
                    alert(`[${error}] returned from the server.`);
                });
        }
    };

    useEffect(() => {
        BackendService.fetchAll()
            .then(personsInitialState => {
                setPersons(personsInitialState);
            })
            .catch(error => {
                setErrorMessage(`${error} returned from server.`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 6000);
            });
    }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <MessageBox message={message} />
            <ErrorBox message={errorMessage} />
            <Search value={filter} changeFunction={handleFilterChange}/>
            <h3>Add a new person</h3>
            <Form
                submitFunction={handleSubmit}
                nameChangeFunction={handleNameChange}
                numberChangeFunction={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <List persons={filteredList} deleteFunction={handleDelete}/>
        </div>
    )
}

export default App;


import './App.css';
import allContacts from "./contacts.json";
import { useState } from 'react'

function App() {

    const [ contacts, setContacts ] = useState(allContacts.slice(0, 5))

    const handleRandomContact = () => {

      if(contacts.length === allContacts.length) {
        return;
      }

    const randomNumber = Math.floor(Math.random() * allContacts.length);
    const randomContacts = allContacts[randomNumber];

    const contactsId = contacts.map((eachContact) => eachContact.id)

    if (contactsId.includes(randomContacts.id)) {
      handleRandomContact();
    } else {
      // Actualizar el estado
      setContacts([...contacts, randomContacts])
    }
  }

  const handleSort = () => {

    const contactsCopy = [...contacts];

    contactsCopy.sort((elem1, elem2) => elem1.popularity < elem2.popularity ? 1 : -1);

    // Actualizar el estado
    setContacts(contactsCopy)
  };

  const handleSortByName = () => {

    const contactsCopyByName = [...contacts]
    contactsCopyByName.sort((elem1, elem2) => elem1.name > elem2.name ? 1 : -1);

    // Actualizamos el estado
    setContacts(contactsCopyByName)

  }

  const handleBorrar = (idBorrar) => {
    console.log("ver si lo borra", idBorrar)
    const filteredArray = contacts.filter((eachContact) => eachContact.id !== idBorrar)

    // Actualizamos el estado
    setContacts(filteredArray);
  }

  return (
    <div className="App">
      <h1>Famosetes list</h1>
      <button onClick={handleRandomContact} >Add Random Contact</button>
      <button onClick={handleSort}> Ordena por popularidad</button>
      <button onClick={handleSortByName}> Ordenalos por nombre</button>
        <table className='tabla'>
            <thead className='celda'>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>popularity</th>
                  <th>Won Oscar</th>
                  <th>Won Emmy</th>
                  <th>Actions</th>
                </tr>
            </thead>
            <tbody className='celda'>
               {
                contacts.map((eachElem, index) => {
                  return (
                     <tr key={eachElem.id}>
                        <td><img src={eachElem.pictureUrl} alt="Famosete" width="90px"/></td>
                        <td><b>{eachElem.name} </b></td>
                        <td>{eachElem.popularity.toFixed(2)} </td> 
                        <td>{eachElem.wonOscar === true ? "🏆" : ""}</td>
                        <td>{eachElem.wonEmmy === true ? "⭐" : ""}</td>
                        <td><button className='btnBorrar' onClick={() => handleBorrar(eachElem.id)}>Borrar</button></td>
                     </tr>
                  )
                })
               }
        
            </tbody>
        </table>
    </div>
  );
}

export default App;

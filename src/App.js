import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Header} from './components/navbar'
import {Sidebar} from './components/sidebar'
import {MainPage} from './pages/MainPage'
import {NotesPage} from './pages/NotesPage'
import {NotePage} from './pages/NotePage'
import './App.css'
import axios from 'axios'

export default function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(({data}) => setNotes(data))
  }, [])

  const deleteNote = (id) => {
    axios.delete(`http://localhost:3001/notes/${id}`)
      .then(response => {
        if (response.status < 200 || response.status > 299) {
          throw new Error('Error deleting note')
        } else {
          const newNotes = notes.filter(note => note.id !== id);
          setNotes(newNotes);
        }
      })
      .catch(error => {
        console.log(error)
      })

  }

  const editNote = (id) => {

    console.log('edit is clicked')
  }

  const addNote = (e) => {
    e.preventDefault()
    console.log('add is clicked')
  }

  return (
    <div className='App'>
      <Router>
        <Sidebar/>
        <Header/>
        <div className='content'>
          <Switch>
            <Route
              path='/note/:id'
              render={(props) => <NotePage id={props.match.params.id}/>}
            />
            <Route path='/notes'>
              <NotesPage
                notes={notes}
                removeNote={deleteNote}
                editNote={editNote}
                addNote={addNote}
              />
            </Route>
            <Route path='/about'>
              <h1>About Page</h1>
            </Route>
            <Route path='/'>
              <MainPage/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

// Read existing notes from localStorage
const getSavedNotes = function(){
    const notesJSON = localStorage.getItem('notes')

    if(notesJSON !== null){
        return JSON.parse(notesJSON)
    } 
    else{
        return []
    }  
}

// Save notes to localStorage
const saveNotes = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Generate the DOM for a note
const generateNoteDOM = function(note){
    const noteEl = document.createElement('p')
    noteEl.textContent = (note.title.length > 0) ? note.title.length : 'Unnamed note'

    return noteEl
}

// Render application notes
const renderNotes = function(notes, filters){

    const filteredNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function(note){
        
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}
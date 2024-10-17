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

// Remove a note
const removeNote = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id === id
    })

    if(noteIndex >= 0){
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM for a note
const generateNoteDOM = function(note){
    const noteEl = document.createElement('div')
    const textEl = document.createElement('span')
    const linkEl = document.createElement('a')
    const btnEl = document.createElement('button')

    // Remove note button
    btnEl.textContent = 'X'
    noteEl.appendChild(btnEl)
    btnEl.addEventListener('click', function(){
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    // Note text
    textEl.textContent = (note.title.length > 0) ? note.title : 'Unnamed note'

    // Edit note link
    linkEl.appendChild(textEl)
    linkEl.href = `./edit.html#${note.id}`

    
    noteEl.appendChild(linkEl)

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

// Generate the last edited message
const generateLastEdited = function(timestamp){
    
    return `Last edited ${moment(timestamp).fromNow()}`
}
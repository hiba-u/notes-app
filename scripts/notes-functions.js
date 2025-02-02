// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try{
        if(notesJSON !== null){
            return JSON.parse(notesJSON)
        } 
        else{
            return []
        } 
    } catch(e){
        return []
    }
}

// Save notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if(noteIndex >= 0){
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Remove note button
    // btnEl.textContent = 'X'
    // noteEl.appendChild(btnEl)
    // btnEl.addEventListener('click', () => {
    //     removeNote(note.id)
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })

    // Note text
    textEl.textContent = (note.title.length > 0) ? note.title : 'Unnamed note'
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // Edit note link
    noteEl.href = `./edit.html#${note.id}`
    noteEl.classList.add('list-item')

    //Setup status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

// Sort notes
const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited'){
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            }
            else if(b.updatedAt > a.updatedAt){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if(sortBy === 'byCreated'){
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt){
                return -1
            }
            else if(b.createdAt > a.createdAt){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else{
        return notes.sort((a, b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }
            else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }
            else{
                return 0
            }
        })
    }
}

// Render application notes
const renderNotes = (notes, filters) => {

    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#notes').innerHTML = ''

    if(filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
        
            const noteEl = generateNoteDOM(note)
            document.querySelector('#notes').appendChild(noteEl)
        })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')

        document.querySelector('#notes').appendChild(emptyMessage)
    }
}

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

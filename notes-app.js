const notes = getSavedNotes()

const filters = {
    searchText: '',
}

renderNotes(notes, filters)

// Create note
document.querySelector("#create-note").addEventListener('click', function(e){
    notes.push({
        id: uuidv4(),
        title: '',
        body: ''
    })

    saveNotes(notes)
    renderNotes(notes, filters)
})

// Filter notes by title
document.querySelector('#search-text').addEventListener('input', function(e){
    
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

// Sort notes
document.querySelector('#sort-by').addEventListener('change', function(e){
    console.log(e.target.value)
})
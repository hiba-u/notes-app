let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

// Create note
document.querySelector("#create-note").addEventListener('click', function(e){
    const id = uuidv4()
    const currentTimestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp
    })

    saveNotes(notes)
    // renderNotes(notes, filters)
    location.assign(`./edit.html#${id}`)
})

// Filter notes by title
document.querySelector('#search-text').addEventListener('input', function(e){
    
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

// Sort notes
document.querySelector('#sort-by').addEventListener('change', function(e){
    // console.log(e.target.value)
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})


// Sync data across pages
window.addEventListener('storage', function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})
notes = [{
    title: 'Note 1',
    text: 'This is note 1'
}, {
    title: 'Example 2',
    text: 'This is example 2'
},{
    title: 'Sample note 3',
    text: 'This is sample note 3'
}]

const filters = {
    searchText: ''
}

const renderNotes = function(notes, filters){

    const filteredNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function(note){
        const noteEl = document.createElement('p')
        noteEl.textContent = note.title

        document.querySelector('#notes').appendChild(noteEl)
    })
}

document.querySelector('#search-text').addEventListener('input', function(e){
    
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})
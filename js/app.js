const searchBook = () => {
    let searchKeyword = document.getElementById('inp-search').value;
    const url = `http://openlibrary.org/search.json?q=${searchKeyword}`
    resultFound.innerText = '' // clear result ammount
    toggleSpinner('block') // Display spinner
    loadBook(url)
}

const loadBook = apiUrl => {
    //clearing old search result
    booksGrid.innerText = '';
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayResult(data))
        .catch(err => console.log('Got an Error', err))
}


const booksGrid = document.getElementById('books-grid');
const resultAmmount = document.getElementById('result-ammount');
const resultFound = document.getElementById('result-found')


const displayResult = data => {
    //Display result ammount
    displayResultFound(data)
    data.docs?.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 10909258}-M.jpg" class="card-img-top" height="320px">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    ${book.author_name ? '<p class="mb-0">by <span class="fw-bold">' + book.author_name[0] + '</span></p>' : ''}
                    ${book.publisher ? '<p>publisher: <i>' + book.publisher[0] + '</i></p>' : ''}
                    <small class="text-gray">First published in 1813</small>
                </div>
              </div>`
        booksGrid.appendChild(div)
    })
    toggleSpinner('none') // Hide spinner
}

// Toggle spinner : block/none
const toggleSpinner = (display) => { document.getElementById('spinner').style.display = display }

// function: display search result ammount
const displayResultFound = data => {
    if (data.numFound) {
        resultFound.innerHTML = `
        <h6>${data.numFound} result found.</h6>
        <h6 class="text-center p-2 border rounded"> showing result ${data.docs.length} of ${data.numFound}</h6>
        `
    }
    else {
        resultFound.innerHTML = '<h6>No result found..!!!<h6>'
    }
}

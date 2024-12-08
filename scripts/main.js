
let nameValueInput = document.querySelector('#nameValue');

let addBtn = document.querySelector('#addBtn');

let infoBlock = document.querySelector('#info');

let sortNameBtn = document.querySelector('#sortName');

let sortValueBtn = document.querySelector('#sortValue');

let deleteBtn = document.querySelector('#delete');


// loading data from Local Storage if data exist -----
loadFromLocalStorage();



// Validating ===============================================================
function validateInput(input) {
    let regex = /^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/;
    return regex.test(input);
}

function parseInput(input) {
    let arrParts = input.split('=').map(str => str.trim());

    return {name: arrParts[0], value: arrParts[1]};
}



// Updating Local Storage --------------

function updateLocalStorage() {
    let items = Array.from(infoBlock.children).map(item => ({
        name: item.dataset.name,
        value: item.dataset.value,
    }));
    localStorage.setItem('NameValuePairs', JSON.stringify(items));
}



//  Loading Data from Local Storage --------------

function loadFromLocalStorage() {
    let savedItems = JSON.parse(localStorage.getItem('NameValuePairs')) || [];
    savedItems.forEach(({name, value}) => addItemToInfo(name, value));
}



// Adding Name=Value pair =========================================================


function addItemToInfo(name, value) {
    let infoItem = document.createElement('div');
    infoItem.textContent = `${name}=${value}`;
    infoItem.classList.add('info-item');
    infoItem.dataset.name = name;
    infoItem.dataset.value = value;


    // Adding click event and class selected to selected items
    infoItem.addEventListener('click', () => {
        infoItem.classList.toggle('selected');
    });

    infoBlock.appendChild(infoItem);
}


// Adding new Name/Value pair to the infoBlock ---------
    addBtn.addEventListener('click', () => {
    let input = nameValueInput.value.trim();

    if(!validateInput(input)) {
        alert('Not valid data. Please enter info in Name=Value format using alphanumeric characters');
        nameValueInput.value = '';
        return;
    }

    let {name, value} = parseInput(input);

    addItemToInfo(name, value);
    updateLocalStorage();
    nameValueInput.value = '';
});



// Sorting ======================================================================

function sortInfo(key) {
    let items = Array.from(infoBlock.children);
    items.sort((a, b) => a.dataset[key].localeCompare(b.dataset[key]));

    while(infoBlock.firstChild) {
        infoBlock.removeChild(infoBlock.firstChild);
    }


    items.forEach(item => infoBlock.appendChild(item));
    updateLocalStorage();
}


// Sorting by Name ------------------------------

sortNameBtn.addEventListener('click', () => {
    sortInfo('name');
});


// Sorting by Value ------------------------------

sortValueBtn.addEventListener('click', () => {
    sortInfo('value');
});





// Deleting ======================================================================

deleteBtn.addEventListener('click', () => {
    let selectedItems = infoBlock.querySelectorAll('.selected');
    selectedItems.forEach(item => item.remove());
    updateLocalStorage();
});

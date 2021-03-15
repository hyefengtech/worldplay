//Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}


function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
  return `
      <li class= "item">
        <a href="${item.url}"><img src="${item.image}" alt="${item.type}" class="item__thumbnail" style="width:140px;height:160px;border-radius:5px;"></a>
        <span class="item__description"> 
        <span style="display:block;font-size:12px;">${item.genre}, ${item.place}</span>
        <a href="${item.url}" style="color:black;text-decoration:none;">${item.name}</a>
        <br>
        <div style="display:block;font-size:12px;">${item.description}</div>
        <br><br><br>${item.price}
        </span>
      </li>
    `;
 }

 function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }

    const filtered = items.filter(item => item[key] === value);
    //console.log(filtered);
    displayItems(filtered);
 }

 function setEventListeners(items) {
     const logo = document.querySelector('#logo');
     const buttons = document.querySelector('.filterBtn');
     logo.addEventListener('click', () => displayItems(items));
     buttons.addEventListener('click', event => onButtonClick(event, items));

 }

//main
loadItems()
.then(items => {
    console.log(items);
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);

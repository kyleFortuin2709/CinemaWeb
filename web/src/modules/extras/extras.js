const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookingRef = urlParams.get('id');
console.log('bookingRef: ', bookingRef);
const mainPath = '/resources'
const selectedItems = []

const getImagePathUrl = (path) => {
  return mainPath + path;
}

const createImages = (name, id, imagePath) => {
  const image = document.createElement('img'); 
  image.classList.add('snack');
  image.src = getImagePathUrl(imagePath);
  image.alt = name;
  image.id = id;
  return image;
};

const createExtraName = (name, id) => {
  const extraName = document.createElement('p')
  extraName.textContent = name
  extraName.id = 'name_'+id
  extraName.classList.add('name');
  return extraName;
};

const createExtraPrice = (price, id) => {
  const extraPrice = document.createElement('p');
  extraPrice.textContent = `R ${price}.00`;
  extraPrice.id = 'price_'+id;
  extraPrice.classList.add('price');
  return extraPrice;
};

const createAddButton = (id) => {
  const addButton = document.createElement('button')
    addButton.classList.add('btn-purple');
    addButton.classList.add('add');
    addButton.textContent = '+'
    addButton.addEventListener('click', () => {
      const amountElement = document.getElementById('amount_'+id)
      const amount = amountElement.textContent;
      const newAmount = Number(amount) + 1;
      amountElement.textContent = newAmount;
      const index = selectedItems.findIndex(item => item.id === id);
      selectedItems[index].selected = newAmount;
    });
    return addButton;
};

const createAmount = (id) => {
  const amount = document.createElement('p');
  amount.textContent = 0;
  amount.id = 'amount_'+ id;
  return amount;
}

const createRemoveButton = (id) => {
  const removerButton = document.createElement('button')
  removerButton.classList.add('btn-purple');
  removerButton.classList.add('remove');
  removerButton.textContent = '-'
  removerButton.addEventListener('click', () => {
    const amountElement = document.getElementById('amount_'+id)
    const amount = amountElement.textContent
    const newAmount = Number(amount) - 1;;
    amountElement.textContent = newAmount < 0 ? 0 : newAmount;

    const index = selectedItems.findIndex(item => item.id === id);
    selectedItems[index].selected = newAmount < 0 ? 0 : newAmount;
  });
  return removerButton;
}

const submitExtras = () => {
  console.log('submitExtras');
  const purchasedItems = selectedItems.filter(item => item.selected !== 0);
  fetch(`http://13.244.38.48:8080/extras`, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({purchasedItems, bookingRef})
  })
  .then(response => response.json())
  .then(data => {
    const url = `/confirmation?id=${bookingRef}`;
    window.location.href = url;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

fetch(`http://13.244.38.48:8080/extras`, {
  method: 'GET',
  headers: {
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(extras => {
  const extraItems = document.getElementById('extraItems');
  extras.forEach(extra => {
    const { id, name, price, imagePath } = extra;
    
    const listItem = document.createElement('li');
    listItem.classList.add('snackCard');
    
    listItem.appendChild(createImages(name, id, imagePath));
    listItem.appendChild(createExtraName(name, id));
		listItem.appendChild(createExtraPrice(price, id));


    const section = document.createElement('section')
    section.classList.add('details')
    section.appendChild(createRemoveButton(id));
    section.appendChild(createAmount(id));
    section.appendChild(createAddButton(id));
    listItem.appendChild(section);
    extraItems.appendChild(listItem);
    selectedItems.push({
      id: extra.id,
      price: extra.price,
      name: extra.name,
      selected : 0
    })
  });
})
.catch((error) => {
  console.error('Error:', error);
});
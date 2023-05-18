const mainPath = '/resources'

const getImagePathUrl = (path) => {
  return mainPath + path;
}

fetch(`http://localhost:8080/extras`, {
  method: 'GET',
  headers: {
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(extras => {
  const extraItems = document.getElementById('extraItems');
  extras.forEach(extra => {
    const id = extra.id;
    const name = extra.name;
    const price = extra.price;
    const imagePath = extra.imagePath;
    
    const listItem = document.createElement('li');
    listItem.classList.add('snackCard');
    
		const image = document.createElement('img'); 
    image.classList.add('snack');
    image.src = getImagePathUrl(imagePath);
    image.alt = name
    image.id = id
    listItem.appendChild(image);

    const extraName = document.createElement('p')
    extraName.textContent = name
    extraName.id = 'name_'+id
    listItem.appendChild(extraName);

    const extraPrice = document.createElement('p')
    extraPrice.textContent = `R ${price}.00`
    extraPrice.id = 'price_'+id
		listItem.appendChild(extraPrice);


    const section = document.createElement('section')
    section.classList.add('details')

    
    const addButton = document.createElement('button')
    addButton.classList.add('add');
    addButton.addEventListener('click', () => {
      const amountElement = document.getElementById('amount_'+id)
      const amount = amountElement.textContent
      amountElement.textContent = Number(amount) + 1;
    })

    const addImage = document.createElement('img'); 
    addImage.classList.add('selectItem');
    addImage.src = '/resources/add.png';
    addImage.id = 'addImage'+id

		addButton.appendChild(addImage);
		section.appendChild(addButton);
    

    const amount = document.createElement('p')
    amount.textContent = 0
    amount.id = 'amount_'+ id
  		section.appendChild(amount);

    const removerButton = document.createElement('button')
    removerButton.classList.add('remove');
    removerButton.addEventListener('click', () => {
      const amountElement = document.getElementById('amount_'+id)
      const amount = amountElement.textContent
      const newAmount = Number(amount) - 1;
      amountElement.textContent = newAmount < 0 ? 0 : newAmount;
    })
    const removeImage = document.createElement('img'); 
    removeImage.classList.add('selectItem');
    removeImage.src = '/resources/remove.png';
    removeImage.id = 'removeImage'+id

		removerButton.appendChild(removeImage);
		section.appendChild(removerButton);
    
		listItem.appendChild(section);
    extraItems.appendChild(listItem);
  });
})
.catch((error) => {
  console.error('Error:', error);
});
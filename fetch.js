const loadPhone = async (searchText) =>{
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json()
 const phones = data.data
disPlayPhone(phones)
}



const disPlayPhone = (phones) =>{
  // step-1
  const container = document.getElementById("phones-container"); 
  container.textContent = "";

  // condition
  const showAllBtn = document.getElementById("show-allBtn");
  if(phones.length > 20){
    showAllBtn.classList.remove('hidden')
  }
  else{
    showAllBtn.classList.add("hidden")
  }
phones = phones.slice(0, 20)

  phones.forEach(phone => {
    console.log(phone)
    // step-2
    const createDive = document.createElement('div');
    createDive.classList = `max-w-md bg-white rounded-lg overflow-hidden shadow-md`;
    // step-3
    createDive.innerHTML = `
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <img class=" mx-auto h-32 object-cover" src="${phone.image}" alt="Card Image">
    <div class="px-6 py-4">
        <h1 class="font-bold text-xl mb-2">${phone.phone_name}</h1>
        <button onclick="handleModal('${phone.slug}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Show Details
        </button>
    </div>
</div>`;

        // step-4

        container.appendChild(createDive);
        

    
  });

}

// search
const handleSearch = () =>{
  const searchField = document.getElementById("input-field");
  const searchText = searchField.value;
  // console.log(searchValue)
  loadPhone(searchText)
}




// open show modal

const handleModal = async (id) =>{

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const singlePhone = data.data;
  displayData(singlePhone)
  
}

// display data
const displayData = (singlePhone) =>{
  console.log(singlePhone)

  const modalContainer = document.getElementById("modal-details");
  modalContainer.innerHTML = `

   <div class="modal-box">
          <h3 class="font-bold text-lg">${singlePhone.name}</h3>
          <img class=" mx-auto h-32 object-cover" src="${singlePhone.image}" alt="Card Image">
          <h1>Storage :${singlePhone.mainFeatures.storage}</h1>
          <h1>size : ${singlePhone.mainFeatures.displaySize}</h1>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
  
  `;



  my_modal_5.showModal();

}

loadPhone('20')
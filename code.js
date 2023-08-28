const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

  //clear phone container during every search
  phoneContainer.textContent = "";

  //display show all div
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  //if isShowAll is not true then slice
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
  <figure class="px-10 pt-10">
            <img
              src="${phone.image}"
              alt=""
              class="rounded-xl"
            />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
              <button onclick="showDetailsModal('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
   
            </div>
          </div>  
  `;
    phoneContainer.appendChild(phoneCard);
  });
  //hide loading spinner
  toggleSpinner(false);
};

const handleSearch = (isShowAll) => {
  //load spinner
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
  // searchField.value = "";
};

//toggle spinner function
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

//handle show all
const handleShowAll = () => {
  handleSearch(true);
};

const showDetailsModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );
  showDetailsContainer.innerHTML = `
  <figure><img id src="${phone.image}" alt="Album"/></figure>
  <div class="card-body">
    <h2 class="card-title">${phone.name}</h2>
    <p><span class="font-bold">Released Date: </span>${
      phone?.releaseDate || `not available`
    }</p>
    <p><span class="font-bold">Storage: </span>${
      phone?.mainFeatures?.storage || `not available`
    }</p>
    <p><span class="font-bold">Chip Set: </span>${
      phone?.mainFeatures?.chipSet || `not available`
    }</p>
    <p><span class="font-bold">Memory: </span>${
      phone?.mainFeatures?.memory || `not available`
    }</p>
    <p><span class="font-bold">Display Size: </span>${
      phone?.mainFeatures?.displaySize || `not available`
    }</p>
    <p><span class="font-bold">Bluetooth: </span>${
      phone?.others?.Bluetooth || `not available`
    }</p>
    <p><span class="font-bold">GPS: </span>${
      phone?.others?.GPS || `not available`
    }</p>
    <p><span class="font-bold">USB: </span>${
      phone?.others?.USB || `not available`
    }</p>
    <p><span class="font-bold">WLAN: </span>${
      phone?.others?.WLAN || `not available`
    }</p>

    

    
    
  </div>
  `;

  console.log(phone);
};
loadPhone();

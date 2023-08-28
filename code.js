const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};
const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
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
              <button onclick="" class="btn btn-primary">Show Details</button>
            </div>
          </div>  
  `;
    phoneContainer.appendChild(phoneCard);
  });
};

const handleSearch = () => {
  const searchText = document.getElementById("search-field").value;
};
loadPhone();

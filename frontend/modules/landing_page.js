import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {

  try{
    const respose = await fetch(config.backendEndpoint+"/cities")
    const data= await respose.json();
    console.log(data)
    return data;
  }catch(error){
    console.log("Error debugged",error)
    return null
  }
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {

  const dataContainer = document.getElementById("data");

  const element = document.createElement("div");
  element.className = "col-6 col-lg-3 mb-2"

  element.innerHTML=`
  <a href="pages/adventures/?city=${id}" id=${id}>

    <div class="tile">
      
      <div class="tile-text tile-centre">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>

      <img class="" src="${image}" />

    </div>

  </a>

  `
  
  dataContainer.appendChild(element)
  
  //  TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

}

export { init, fetchCities, addCityToDOM };

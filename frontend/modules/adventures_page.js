
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  const urlParams = new URLSearchParams(search)
  const city = urlParams.get("city")
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return city
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {

  try{
    const respose = await fetch(config.backendEndpoint+`/adventures?city=${city}`)
    const data= await respose.json();
    console.log(data)
    return data;
  }catch(error){
    return null;
  }
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const dataContainer = document.getElementById("data");
  adventures.forEach((adventure)=>{

    const {id, currency,name,image,duration,costPerHead,category}=adventure;
  
  const element= document.createElement("div");
  element.className = "col-6 col-lg-3 mb-2"

  element.innerHTML=`

  

  <a href="detail/?adventure=${id}" id=${id}>
 
  <div class="activity-card"> 
  <div class="category-banner">${adventure.category}</div>
     

      <img class="" src="${image}" />


      <div class="w-100 mt-3 px-3">
          <div class="d-flex justify-content-between flex-wrap"> 
            <h5 class=""> ${name}</h5>
            <h5 class=""> ₹${costPerHead}</h5>
          </div>


          <div class="d-flex justify-content-between flex-wrap"> 
          <h5 class=""> Duration </h5>
          <h5 class=""> ${duration}Hours</h5>
          </div>
      
      </div>

  
  </div>

  </a>
  
  `

  dataContainer.appendChild(element)

  })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter(
    (adventure)=>adventure.duration > low && adventure.duration <= high
  );
    
  return filteredList;
}



//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredList =[];
  categoryList.forEach((category)=>{
    list.forEach((key)=>{
      if (key.category == category){
        filteredList.push(key);
      }
    });
  });

  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList=[];

  if(filters["duration"].length>0 && filters["category"].length>0){
    let choice = filters["duration"].split("-");

    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList,filters["category"]);
  }

  else if(filters["duration"].length >0) {

    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  else if(filters["category"].length>0){
    filteredList = filterByCategory(filteredList,filters["category"]);
  }

  else{
    filteredList = list;
  }

  return filteredList;
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;

  filters["category"].forEach((key)=>{
    let ele = document.createElement("div");
    ele.className="category-filter";
    ele.innerHTML=`
    <div>${key}</div>
    `;
    document.getElementById("category-list").appendChild(ele);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

  
/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=90374c8dbfe1ec518ee2dc519820506f';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// add event listener when clicked
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const zipCode = document.getElementById('zip').value;
  getWeather(baseURL, zipCode, apiKey)
}

const getWeather = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL+zipCode+apiKey);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log("error", e);
  }
  
}

// // Async POST
// const postData = async ( url = '', data = {})=>{

//   const response = await fetch(url, {
//   method: 'POST', 
//   credentials: 'same-origin', 
//   headers: {
//       'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data), // body data type must match "Content-Type" header        
// });

//   try {
//     const newData = await response.json();
//     return newData;
//   }catch(error) {
//   console.log("error", error);
//   }
// };

// // Async GET
// const retrieveData = async (url='') =>{ 
// const request = await fetch(url);
// try {
// // Transform into JSON
// const allData = await request.json()
// }
// catch(error) {
//   console.log("error", error);
//   // appropriately handle the error
// }
// };

// // TODO-Chain your async functions to post an animal then GET the resulting data
// function postGet(){
//   postData('/animal', {fav:'lion'})
//     .then(function(data){
//       retrieveData('/all')
//     })
// }


// // TODO-Call the chained function
// postGet()
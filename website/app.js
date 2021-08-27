/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='


// add event listener when generate button is clicked
document.getElementById('generate').addEventListener('click', performAction);

// Initilalize perfromAction function
function performAction(e) {
  // Create a new date instance dynamically with JS
  let d = new Date();
  // let month = d.getMonth() + 1
  let month = d.toLocaleString('default', { month: 'long' });
  let newDate = month + ' ' + d.getDate() + ', ' + d.getFullYear();
  // Get zipcode from user
  const zipCode = document.getElementById('zip').value;
  // Get user feeling
  const userResponse = document.getElementById('feelings').value;

  // Get data from weather API and add data to server
  getAPIKEY().then((apiKey) => {
    getWeather(baseURL, zipCode, apiKey)
    .then((data) => {
      postData('/addData', { temperature: data.main.temp, date: newDate, userResponse: userResponse })
      // update UI after getting data
      updateUI()
    })
    .catch(e => {
      console.log("Error", e);
    })
  })
}

// get apiKey function
const getAPIKEY = async () => {
  const res = await fetch('/apiKey')
  try {
    const api = await res.json();
    return api.key;
  } catch (e) {
    console.log("error", e);
  }
}

// Get weather data from web API
const getWeather = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL+zipCode+apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (e) {
    alert("Error: Please enter acceptable datas")
    console.log("error", e);
  }
  
}

// function getWeather(baseURL, zipCode, apiKey) {
//   axios.get(baseURL + zipCode + apiKey)
//     .then(res => res)
//   .catch(err => alert("ERROR :", err)) 
// }

// Async POST
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log("error", error);
  }
};

// update UI on client 
const updateUI = async () => {
  const request = await fetch('/data')
  try {
    const allData = await request.json()
    document.getElementById('date').innerHTML = "Date: " + allData.date
    document.getElementById('temp').innerHTML = "Temperature: " + allData.temperature
    document.getElementById('content').innerHTML = "My feeling: " + allData.userResponse
  } catch (e) {
    console.log("error", e);
  }
}

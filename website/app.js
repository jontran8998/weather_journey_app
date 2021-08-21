  
/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=90374c8dbfe1ec518ee2dc519820506f';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// add event listener when generate button is clicked
document.getElementById('generate').addEventListener('click', performAction);

// Initilalize perfromAction function
function performAction(e) {
  // Get zipcode from user
  const zipCode = document.getElementById('zip').value;
  // Get user feeling
  const userResponse = document.getElementById('feelings').value;
  // Get data from weather API and add data to server
  getWeather(baseURL, zipCode, apiKey).then((data) => {
    postData('/addData', { temperature: data.main.temp, date: newDate, userResponse: userResponse })
    // update UI after getting data
    updateUI()
  })
}

// Get weather data from web API
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
    console.log(newData);
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
    console.log(allData);
    const recentItem = allData.length - 1
    document.getElementById('date').innerHTML = allData[recentItem].date
    document.getElementById('temp').innerHTML = allData[recentItem].temperature
    document.getElementById('content').innerHTML = allData[recentItem].userResponse
  } catch (e) {
    console.log("error", e);
  }
}

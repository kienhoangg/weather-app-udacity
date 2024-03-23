const weatherOpenApiUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = '&appid=2485d52f534d0509a83585238713fd26&units=imperial'
const nodeServerUrl = 'http://localhost:3000'
document.getElementById('generate').addEventListener('click', performAction)

function performAction(e) {
  const zipcode = document.getElementById('zipcode').value
  const feelings = document.getElementById('feelings').value
  getWeatherByZipcode(weatherOpenApiUrl, zipcode, apiKey).then(function (data) {
    // Add data
    postData(`${nodeServerUrl}/feelings`, {
      date: new Date().toLocaleDateString(),
      temp: data.main.temp,
      feel: feelings,
    })
    retrieveData()
  })
}

const getWeatherByZipcode = async (weatherOpenApiUrl, zipcode, key) => {
  const res = await fetch(`${weatherOpenApiUrl}?zip=${zipcode}${apiKey}`)
  try {
    const data = await res.json()
    return data
  } catch (error) {
    console.log('error', error)
    // appropriately handle the error
  }
}

const retrieveData = async () => {
  const request = await fetch(`${nodeServerUrl}/all`)
  try {
    // Transform into JSON
    const allData = await request.json()
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML =
      'Temp: ' + Math.round(allData.temp) + ' degrees'
    document.getElementById('content').innerHTML = 'Content: ' + allData.feel
    document.getElementById('date').innerHTML = 'Date: ' + allData.date
  } catch (error) {
    console.log('error', error)
    // appropriately handle the error
  }
}
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  })

  try {
    const newData = await response.json()
    return newData
  } catch (error) {
    console.log('error', error)
  }
}

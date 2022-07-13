// console.log('Client side javascript file is loaded!');


const weatherForm = document.querySelector('Form');
const formInput = document.querySelector('input');
const errorMessage = document.querySelector('#error-message')
const dataMessage = document.querySelector('#data-message')
// console.log(weatherForm)

errorMessage.textContent = ''

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  errorMessage.textContent = `Loading...`;
  dataMessage.textContent = ``;
  const address = formInput.value;
  if (address.trim().length === 0) {
    errorMessage.textContent = `You must provide an address`;
    return console.log(`You must provide an address`)
  }
  fetch(`/weather?address=${encodeURI(address)}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data.error) {
        errorMessage.textContent = `error in fetching the data`;
        return console.log(`error in fetching the data`)
      }
      errorMessage.textContent = `${data.forecast}`;
      dataMessage.textContent = `${data.location}`;
    })
})





// const fetchWeatherData = (address) => {
//   fetch(`http://localhost:3000/weather?address=${encodeURI(address)}`)
//     .then((response) => {
//       return response.json()
//     })
//     .then((data) => {
//       if (data.error) {
//         return console.log(`error in fetching the data`)
//       }
//       console.log(data)
//     })
// }





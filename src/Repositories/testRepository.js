
function getTest() {

  fetch('http://localhost:8080/test')
  .then(res => console.log(res.json()))
  }

export default getTest
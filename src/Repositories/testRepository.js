
const testRepo ={
  async getTest() {

    const results= fetch('http://localhost:8080/items')
    .then(res => res.json())
    return results
   }
  }
export default testRepo
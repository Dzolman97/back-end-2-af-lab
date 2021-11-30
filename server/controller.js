let houses = require('./db.json')
let globalID = 4

module.exports = {
   gethouses: (req, res) => {
      res.status(200).send(houses)
   },
   createHouse: (req, res) => {
      const{address, price, imageURL} = req.body
      let newHouse = {
         id: globalID,
         address,
         price: +price,
         imageURL
      }
      houses.push(newHouse)
      res.status(200).send(houses)

      globalID++
   },
   updateHouse: (req, res) => {
      const{id} = req.params
      const {type} = req.body

      let index = houses.findIndex(elem => +elem.id === +id)

      if (houses[index].price === 10000 && type === 'minus') {
         res.status(400).send('cannot go below $10,000')
      } else if (type === 'plus') {
         houses[index].price += 10000
         res.status(200).send(houses)
      } else if (type === 'minus') {
         houses[index].price -= 10000
         res.status(200).send(houses)
      } 
   },
   deleteHouses: (req, res) => {
      let {id} = req.params.id

      let index = houses.findIndex(elem => +elem.id === +id)
      houses.splice(index, 1)
      res.status(200).send(houses)
   }
}
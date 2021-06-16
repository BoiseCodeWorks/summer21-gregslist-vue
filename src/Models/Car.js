export class Car {
  constructor({ id, make, model, year, price, imgUrl, creatorId, creator, comments }) {
    this.id = id
    this.year = year
    this.make = make
    this.model = model
    this.price = price
    this.imgUrl = imgUrl
    this.creatorId = creatorId
    this.creator = creator
    this.comments = comments
  }
}

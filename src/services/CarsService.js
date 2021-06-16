import { AppState } from '../AppState'
import { Car } from '../Models/Car'
import { api } from './AxiosService'

class CarsService {
  async getCars() {
    const res = await api.get('api/cars')
    AppState.cars = await res.data.map(c => new Car(c))
  }

  async getCarById(id) {
    AppState.activeCar = null
    const res = await api.get('api/cars/' + id)
    AppState.activeCar = new Car(res.data)
  }

  async getCarsBySellerProfileId(id) {
    const res = await api.get('api/cars?creatorId=' + id)
    AppState.cars = await res.data.map(c => new Car(c))
  }

  async updateCar(car) {
    const res = await api.put('api/cars/' + car.id, car)
    console.log(res)
  }

  async addComment(car, comment) {
    const res = await api.post('api/cars/' + car.id + '/comments', comment)
    AppState.activeCar = new Car(res.data)
  }
}

export const carsService = new CarsService()

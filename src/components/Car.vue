<template>
  <div class="col-lg-4 listing my-3">
    <div class="bg-white rounded">
      <div class="text-center">
        <router-link :to="{name: 'Car', params: { id: car.id } }">
          <img :src="car.imgUrl" height="250" class="img-fluid" />
        </router-link>
      </div>

      <div class="card-body">
        <p>
          <b>{{ car.make }} {{ car.model }}</b>
        </p>
        <p>
          <em>${{ car.price.toFixed(2) }}</em>
        </p>

        <router-link :to="{name: 'Car', params: { id: car.id } }">
          More...
        </router-link>

        <hr>

        <div class="text-right" v-if="car.creator">
          <router-link :to="{name: 'Profile', params: { id: car.creator.id }}">
            <img :src="car.creator.picture" alt="creator avatar" class="rounded-circle my-2" height="55">
            {{ car.creator.name }}
          </router-link>
        </div>

        <div v-if="car.creator && car.creator.id === account.id">
          <button class="btn btn-warning btn-block" @click="editCar">
            EDIT CAR
          </button>
          <button class="btn btn-danger btn-block" @click="deleteCar">
            DELETE CAR
          </button>
        </div>
        <button @click="showCommentForm = !showCommentForm">
          Add Comment
        </button>
        <form @submit.prevent="addComment" v-if="showCommentForm">
          <textarea class="form-control" rows="8" v-model="newComment.body"></textarea>
          <button type="submit">
            add
          </button>
        </form>

        <div class="p-4" v-for="comment in car.comments" :key="comment.id">
          {{ comment.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { carsService } from '../services/CarsService'
import Notification from '../utils/Notification'
export default {
  props: {
    car: { type: Object, required: true }
  },
  setup(props) {
    const showCommentForm = ref(false)
    const newComment = ref({})

    return {
      showCommentForm,
      newComment,
      account: computed(() => AppState.account),
      editCar() {
        // eslint-disable-next-line vue/no-mutating-props
        props.car.comments = []
        carsService.updateCar(props.car)
      },
      deleteCar() {

      },
      async addComment() {
        try {
          await carsService.addComment(props.car, newComment.value)
          newComment.value = {}
        } catch (e) {
          Notification.toast(e.message, 'error')
        }
      }
    }
  }
}
</script>

<style>

</style>

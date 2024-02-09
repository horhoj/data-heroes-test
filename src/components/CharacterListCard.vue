<script setup lang="ts">
import { Status, type CharacterListResponseItem, Gender } from '@/api/characters.types'
import { computed } from 'vue'
import classNames from 'classnames'

const props = defineProps<{ character: CharacterListResponseItem }>()

const statusClasses = computed(() =>
  classNames(
    'status',
    props.character.status === Status.Alive && 'status-alive',
    props.character.status === Status.Dead && 'status-dead'
  )
)

const gender = computed(() =>
  props.character.gender !== Gender.Unknown ? props.character.gender : null
)
</script>

<template>
  <li class="card">
    <div>
      <img :src="props.character.image" alt="hero img" class="img" />
    </div>
    <div class="info-wrap">
      <div class="info-field">
        <div class="character-name">{{ character.name }}</div>
        <div>
          <span :class="statusClasses" /> {{ character.status }} - {{ character.species }}
          <span v-if="gender !== null">- {{ gender }}</span>
        </div>
      </div>
      <div class="info-field">
        <div class="info-helper">Last known location:</div>
        <div>{{ character.location.name }}</div>
      </div>
      <div class="info-field">
        <div class="info-helper">First seen in:</div>
        <div>{{ character.origin.name }}</div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.card {
  display: flex;
  width: 600px;
  min-height: 225px;
  background-color: #3c3e44;
  border-radius: 10px;
  overflow: hidden;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    height: auto;
  }
}

.img {
  width: 100%;
  height: 100%;
  margin: 0px;
  object-fit: cover;
  width: 225px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    width: 100%;
  }
}

.info-wrap {
  padding: 15px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.info-field {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.character-name {
  font-weight: 700;
  font-size: 26px;
}

.status {
  background-color: lightblue;
  width: 10px;
  height: 10px;
  display: inline-flex;
  border-radius: 50%;
}

.status-alive {
  background-color: lime;
}

.status-dead {
  background-color: red;
}

.info-helper {
  color: rgb(158, 158, 158);
}
</style>

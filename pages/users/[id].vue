<template>
<el-container>
  <el-main>
    <section class="movie">

      <div class="movie__short-info">
        <div class="movie__short-info__header">
          <h3 class="movie__short-info__title">{{ selectedMovie.primaryTitle }}</h3>
          <div class="movie__short-info__meta">
            <span class="movie__short-info__release-date">{{ selectedMovie.startYear }}</span>
            <span class="movie__short-info__age-rating">{{ AgeRating[selectedMovie.contentRating] }}</span>
            <span class="movie__short-info__duration">{{ movieDuration }}</span>
          </div>
        </div>

        <div class="movie__short-info__score">
          <div class="rating">
            <span class="rating__value">{{selectedMovie.averageRating}}/10</span>
            <span class="rating__votes">{{ movieVotes }}</span>
          </div>
        </div>
      </div>

      <div class="movie__main-info">
        <div class="movie__main-info__poster">
          <img class="movie__main-info__image" height="900px" :src="selectedMovie.primaryImage">
        </div>
        <section class="movie__main-info__details">
          <div>
            <ul class="movie__main-info__genres">
              <li class="movie__main-info__genre" v-for="interest in selectedMovie.interests" :key="interest.id">
                {{ interest }}
              </li>
            </ul>
          </div>
          <div class="movie__main-info__description">
            {{ selectedMovie.description }}
          </div>
          <div class="movie__main-info__creators">
            <span class="movie__main-info__person">
              Director(s):
              <span v-for="director in selectedMovie.directors" :key="director.id">
                {{ director.fullName }}
              </span>
            </span>
            <span class="movie__main-info__person">
              Writer(s):
              <span v-for="writer in selectedMovie.writers" :key="writer.id">
                {{ writer.fullName }}
              </span>
            </span>
            <span class="movie__main-info__person">
              Cast:
              <span v-for="actor in selectedMovie.cast" :key="actor.id">
                {{ actor.fullName }}
              </span>
            </span>
          </div>
        </section>
      </div>
    </section>
  </el-main>
  <el-footer>

  </el-footer>
</el-container>
</template>



<script setup>
import { AgeRating } from '~/types/ageRatings'

const route = useRoute()
const id = route.params.id

const movieDetailsStore = UseMovieDetailsStore()
const {selectedMovie} = storeToRefs(movieDetailsStore)

const movieVotes = computed (() => {
  return movieDetailsStore.formatVotes(movieDetailsStore.selectedMovie.numVotes)
})

const movieDuration = computed(() => {
  return movieDetailsStore.formatDuration(movieDetailsStore.selectedMovie.runtimeMinutes)
})

onMounted(async () => {
  movieDetailsStore.selectedMovie = await movieDetailsStore.getMovieDetails(id)
})
</script>




<style scoped lang="scss">
@mixin flex($direction: row, $justify: flex-start, $align: stretch, $gap: 0) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
  gap: $gap;
}

.el-main{
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: rgb(34, 34, 34);
  @include flex(row, center, center,0);
}

.movie{
  padding: 30px;
  width: 1280px;
  min-height: 50vh;
  background-color: black;
  @include flex(column, center, center,0);

  &__short-info{
  color: white;
  width: 1280px;
  min-height: 100px;
  flex-grow: 1;
  @include flex(row, space-between, center,0);

    &__header{
      @include flex(column, center, flex-start, 10px);
    }

    &__title{
      font-size: 2rem;
      font-weight: bold;
    }

    &__meta{
      display: inline-block;
    }

    &__age-rating{
      margin-left: 10px;
    }

    &__duration{
      margin-left: 10px;
    }
  }

&__main-info{
  color: white;
  flex-grow: 5;
  height: 60vh;
  @include flex(row, space-between, center,0);

    &__poster{
      height: inherit;
      width: auto;
    }

    &__image{
      height: inherit;
      border-radius: 10px;
    }

    &__details{
      height: inherit;
      
    }

    &__genre{
      display: inline-block;
      margin: 0.2rem 0.2rem 0.2rem 2rem;
      padding: 8px 15px;
      font-weight: 400;
      border: 1px solid rgb(255, 217, 0);
      border-radius: 10px;
    }

    &__description{
      padding: 2rem;
      font-size: 1.3rem;
    }

    &__creators{
      @include flex(column, center, flex-start, 2rem);
    }
  }
}




</style>
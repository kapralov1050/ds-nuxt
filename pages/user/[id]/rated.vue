<template>
  <div>
    <h1 class="title">Rated Movies</h1>
    <div 
      class="movies-list-empty" 
      v-if="!ratingStore.ratedMovies.length"
    >
      <el-icon 
        size="40" 
        color="gold"
      >
        <List />
      </el-icon>
      <p>There are no movies in your watchlist.</p>
      <NuxtLink 
        to="/homepage" 
        style="color: black"
      >
        Back to Home
      </NuxtLink>
    </div>
    <ul
      v-else
      class="movies-list" 
      v-loading="isLoading"
      element-loading-text="Loading..."
    >
      <li 
        class="movies-list__item"
        v-for="movie in ratingStore.ratedMovies"
        :key="movie.id"
      >
        <MovieCard :movie="movie" />
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import { List } from '@element-plus/icons-vue'

definePageMeta({
  layout: 'userpage',
  middleware: 'auth',
  title: 'Rated'
})

const ratingStore = useRatingStore()
const authStore = useAuthStore()

const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    if (authStore.userData?.id) {
      ratingStore.ratedMovies = await ratingStore.getRatedMovies()
    }
  } catch (error) {
    console.error('error while loading rated movies',error)
  } finally {
    isLoading.value = false
  }
})
</script>


<style scoped lang="scss">
.title {
  padding-left: 1rem;
  margin-bottom: 2rem;
  font-size: 3rem;

  &::before {
    content: "";
    margin-right: 1rem;
    height: 4rem;
    border:  solid gold;
    border-radius: 1rem; 
  }
}

.movies-list-empty {
  margin-top: 3rem;
  align-self: center;
  @include flex(column, center, center, 1rem);
}

.movies-list {
  @include flex(column, flex-start, center, 2rem);
  align-self: center;
  height: fit-content;
  width: 95%;
  
  &__item {
    width: inherit;
    height: fit-content;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 2px 5px rgb(209, 209, 209);
  }
}
</style>
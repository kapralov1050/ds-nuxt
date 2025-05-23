<template>
  <section class="list-page">
    <section class="list-page__header">
      <h1 class="list-page__title">
        {{ listStore.listDetails?.name }}
      </h1>
      <div>
        <el-button 
          round 
          :icon="CloseBold" 
          type="primary" 
          @click="deleteList"
        >
          Delete List
        </el-button>
        <el-button 
          round 
          :icon="Finished" 
          type="primary" 
          @click="clearList"
        >
          Clear List
        </el-button>
        <el-button 
          round 
          :icon="EditPen" 
          type="primary" 
          @click="showAddMoviesModal = true"
        >
          Add Movies
        </el-button>
        <el-dialog 
          v-model="showAddMoviesModal" 
          @close="closeModal"
        >
          <template #header>
            <h1>Editing List</h1>
          </template>
          <AddMoviesToListForm />
        </el-dialog>
      </div>
    </section>
    <section class="list-page__info">
      <p class="list-page__description">
        {{ listStore.listDetails?.description || "No description entered." }}
      </p>
      <p v-if="listStore.moviesInList.length">
        Average Rating: {{ average }}
      </p>
    </section>
    <ul class="list-page__movies">
      <li 
        v-for="movie in listStore.moviesInList" 
        class="list-page__movie"
        :key="movie.id"
      >
        <div class="list-page__movie-info">
          <h1>
            <NuxtLink 
              :to="`/movie/${movie.id}`" 
              style="color: gold"
            >
              {{ movie.original_title }}
            </NuxtLink>
            (rating: {{ movie.vote_average.toFixed(1) }})
          </h1>
          <time 
            :datetime="movie.release_date" 
            class="list-page__movie-year"
          >
            {{ formatDateToYear(movie.release_date) }}
          </time>
        </div>
        <el-button 
          text 
          circle 
          :icon="CloseBold" 
          @click="removeMovie(movie.id)" 
          :disabled="isDeleting" 
        />
      </li>
    </ul>
  </section>
</template>

  
<script setup lang='ts'>
import { CloseBold, EditPen, Finished } from '@element-plus/icons-vue'
import { averageRating } from '~/helpers/averagerating'
import { formatDateToYear } from '~/helpers/formatDate'

definePageMeta({
  layout: 'userpage',
  middleware: 'auth',
  title: 'ListDetails'
})

const listStore = useListStore()
const authStore = useAuthStore()

const showAddMoviesModal = ref(false)
const isDeleting = ref(false)

const average = computed(() => averageRating(listStore.moviesInList))

const removeMovie = async (movieId: number) => {
  isDeleting.value = true
  try {
    if(listStore.listId) await listStore.deleteMovieFromList(movieId, listStore.listId)
    ElMessage.success('Movie removed from list')
  } catch (error) {
    console.error('error while removing rating', error)
  } finally {
    isDeleting.value = false
  }
}

const deleteList = async () => {
  isDeleting.value = true
  try {
    if(listStore.listId) await listStore.deleteList(listStore.listId)
    ElMessage.success('List deleted')
    const username = authStore.userData?.username;
    navigateTo(`/user/${username}/lists`)
  } catch (error) {
    console.error('error while deleting list', error)
  } finally {
    isDeleting.value = false
  }
}

const clearList = async () => {
  try {
    if(listStore.listId) await listStore.clearList(listStore.listId)
    ElMessage.success('List was successfully cleared')
  } catch(error) {
    console.error('error while clear list', error)
  }
}

const closeModal = async () => {
  try {
    if(listStore.listId) {
    const response = await listStore.loadListDetails(listStore.listId)
    if (response) {
      listStore.moviesInList = response.items
      }
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  if(listStore.listId) {
    const response = await listStore.loadListDetails(listStore.listId)
    if (response) {
      listStore.moviesInList = response.items
      listStore.listDetails = response
    }
  }
})
</script>
  
  
<style scoped lang='scss'>
.list-page {
  
  &__header {
    @include flex(row, space-between, flex-end, 2rem);
    padding: 0 1rem;
  }

  &__title {
    margin-left: 1rem;
    font-size: 3rem;
    color: rgb(255, 217, 0);
  }

  &__info {
    @include flex(row, space-between, center, 1rem);
    width: 100%;
    padding: 2rem 1rem;
    margin: 1.5rem 0 2rem 0;
    color: rgb(50.8, 116.6, 184.5);
    flex-wrap: wrap;
    border: 1px solid rgb(255, 217, 0);
    border-radius: 2rem;
    background-color: rgb(255, 255, 255);
  }

  &__description {
    overflow-wrap: anywhere;
  }

  &__movies {
    @include flex(column, flex-start, flex-start, 1rem);
    width: 100%;
  }

  &__movie {
    @include flex(row, space-between, center, 1rem);
    box-shadow: 0 2px 5px rgb(209, 209, 209);
    padding: 1rem;
    width: 100%;
  }

  &__movie-info {
    @include flex(column, center, flex-start, 0);
    flex-grow: 1;
  }

  &__movie-year {
    padding-top: 1rem;
    color: rgb(99, 99, 99);
  }
}
</style>
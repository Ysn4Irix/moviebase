<template>
  <div class="home">
    <!-- Header -->
    <MovieHeader />

    <!-- Search -->
    <div class="container search">
      <input
        v-model.lazy="searchInput"
        type="text"
        placeholder="Search"
        @keyup.enter="$fetch"
      />
      <button v-show="searchInput !== ''" class="button" @click="clearSearch">
        Clear
      </button>
    </div>

    <!-- Loading Animation -->
    <Loading v-if="$fetchState.pending" />
    <div v-else-if="$fetchState.error" class="section-title">
      <h1><span>Error</span> while fetching mountains</h1>
    </div>
    <!-- Movies -->
    <div v-else class="container movies">
      <div v-if="searchInput !== ''" class="section-title">
        <h1><span>Search</span> Result</h1>
      </div>
      <div v-else class="section-title">
        <h1><span>Now</span> Streaming</h1>
      </div>
      <!-- Search Results -->
      <div v-if="searchInput !== ''" class="movies-grid">
        <div
          v-for="(movie, index) in searchedMovies"
          :key="index"
          class="movie"
        >
          <div class="movie-img">
            <img
              :src="
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : 'https://via.placeholder.com/500x800?text=Not+Found'
              "
              alt="posterImg"
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25) }}
              <span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <nuxt-link
              class="button button-light"
              :to="{ name: 'movie-movieid', params: { movieid: movie.id } }"
            >
              Get More Info
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- Now Streaming  -->
      <div v-else class="movies-grid">
        <div
          v-for="(movie, index) in nowStreamngMovies"
          :key="index"
          class="movie"
        >
          <div class="movie-img">
            <img
              :src="
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : 'https://via.placeholder.com/500x800?text=Not+Found'
              "
              alt="posterImg"
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25)
              }}<span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <NuxtLink
              class="button button-light"
              :to="{ name: 'movie-movieid', params: { movieid: movie.id } }"
            >
              Get More Info
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      nowStreamngMovies: [],
      searchedMovies: [],
      trendingMovies: [],
      searchInput: '',
    }
  },
  async fetch() {
    if (this.searchInput === '') {
      await this.nowStreamingMovies()
      return
    }
    await this.searchedMovie()
  },
  head() {
    return {
      title: 'MovieBase - Latest Streaming Movies Info',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get all the latest streaming movies in theaters & online',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, stremaing',
        },
      ],
    }
  },
  fetchDelay: 2000,
  methods: {
    async nowStreamingMovies() {
      const data = (
        await this.$axios.get(
          `/movie/now_playing?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US&page=1`
        )
      ).data

      data.results.forEach((movie) => {
        this.nowStreamngMovies.push(movie)
      })
    },
    async gettrendingMovies() {
      const data = (
        await this.$axios.get(
          `/trending/movie/week/?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US&page=1`
        )
      ).data

      data.results.forEach((movie) => {
        this.trendingMovies.push(movie)
      })
    },
    async searchedMovie() {
      const data = (
        await this.$axios.get(
          `/search/movie?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US&page=1&query=${this.searchInput}`
        )
      ).data
      data.results.forEach((movie) => {
        this.searchedMovies.push(movie)
      })
    },
    clearSearch() {
      this.searchInput = ''
    },
  },
}
</script>
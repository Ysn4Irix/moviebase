<template>
  <div class="home">
    <MovieHeader />

    <!-- Loading Animation -->
    <Loading v-if="$fetchState.pending" />
    <div v-else-if="$fetchState.error" class="fetchError">
      <h1>There is an Error while we fetching data</h1>
    </div>
    
    <!-- Movies -->
    <div v-else class="container movies">
      <div class="section-title">
        <h1><span>Trending</span> This Week</h1>
      </div>

      <!-- Now Streaming  -->
      <div class="movies-grid">
        <div
          v-for="(movie, index) in trendingMovies"
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
            <p v-if="movie.overview !== ''" class="overview">
              {{ movie.overview.slice(0, 300) }}
              <span v-if="movie.overview.length > 300">...</span>
            </p>
            <p v-else class="overview">Overview not available</p>
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
  name: 'MoviesTrending',
  data() {
    return {
      trendingMovies: [],
    }
  },
  async fetch() {
    await this.getTrendingMovies()
  },
  fetchDelay: 2000,
  head() {
    return {
      title: 'MovieBase - Trending Movies',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Top Trending series',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, stremaing, trending',
        },
      ],
    }
  },
  methods: {
    async getTrendingMovies() {
      const data = (
        await this.$axios.get(
          `/trending/movie/week?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US&page=1`
        )
      ).data

      data.results.forEach((movie) => {
        this.trendingMovies.push(movie)
      })
    },
  },
}
</script>
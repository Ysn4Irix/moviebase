<template>
  <!-- Loading -->
  <Loading v-if="$fetchState.pending" />
  <div v-else-if="$fetchState.error" class="fetchError">
    <h1>Error while fetching data</h1>
  </div>
  <!-- Movie Info -->
  <div v-else class="single-movie container">
    <NuxtLink class="button" :to="{ name: 'index' }"> Back </NuxtLink>
    <div class="movie-info">
      <div class="movie-img">
        <img
          :src="
            movie.poster_path !== null
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : 'https://via.placeholder.com/500x800?text=Not+Found'
          "
          alt="posterImg"
        />
      </div>
      <div class="movie-content">
        <h1>{{ movie.title }}</h1>
        <p class="movie-fact tagline">
          <span>Tagline:</span> "{{ movie.tagline }}"
        </p>
        <p class="movie-fact">
          <span>Released:</span>
          {{
            new Date(movie.release_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Duration:</span> {{ movie.runtime }} minutes
        </p>
        <p class="movie-fact">
          <span>Revenue:</span>
          {{
            movie.revenue.toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </p>
        <p class="movie-fact"><span>Overview:</span> {{ movie.overview }}</p>
        <p class="movie-fact">
          <span class="movieInfos">Trailer:</span>
          <a
            v-if="videoHost !== ''"
            class="youtube-link"
            :href="`https://${videoHost}.com/watch?v=${videoKey}`"
          >
            Watch on Youtube
          </a>
          <span v-else class="not">Link not Available</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleMovie',
  data() {
    return {
      movie: '',
      videoHost: '',
      videoKey: '',
    }
  },
  async fetch() {
    await this.getSingleMovie()
    await this.getTrailerVideo()
  },
  // delay for fetching
  fetchDelay: 2000,
  head() {
    return {
      title: this.movie.title,
    }
  },

  methods: {
    async getSingleMovie() {
      const data = (
        await this.$axios.get(
          `/movie/${this.$route.params.movieid}?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US`
        )
      ).data

      this.movie = data
    },
    async getTrailerVideo() {
      const data = (
        await this.$axios.get(
          `/movie/${this.$route.params.movieid}/videos?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US`
        )
      ).data

      this.videoKey = data.results[0].key
      this.videoHost = data.results[0].site
    },
  },
}
</script>

<style lang="scss">
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .movie-img {
      img {
        max-height: 400px;
        width: 100%;
        border-radius: 15px;
        @media (min-width: 800px) {
          max-height: 500px;
          width: initial;
        }
      }
    }
    .movie-content {
      .youtube-link {
        text-decoration: none;
      }
      h1 {
        font-size: 46px;
        font-weight: 400;
      }
      .movie-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;
        span {
          font-weight: 600;
          color: #c92502;
        }
        .not {
          color: #fff;
        }
      }
      .tagline {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>
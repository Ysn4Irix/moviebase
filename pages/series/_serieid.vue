<template>
  <!-- Loading -->
  <Loading v-if="$fetchState.pending" />
  <div v-else-if="$fetchState.error" class="section-title">
    <h1><span>Error</span> while fetching mountains</h1>
  </div>
  
  <!-- serie Info -->
  <div v-else class="single-serie container">
    <NuxtLink class="serie-button" :to="{ name: 'series' }"> Back </NuxtLink>
    <div class="serie-info">
      <div class="serie-img">
        <img
          :src="
            serie.poster_path !== null
              ? `https://image.tmdb.org/t/p/w500/${serie.poster_path}`
              : 'https://via.placeholder.com/500x800?text=Not+Found'
          "
          alt="posterImg"
        />
      </div>
      <div class="serie-content">
        <h1>{{ serie.name }}</h1>
        <p class="serie-fact tagline">
          <span>Tagline:</span> "{{
            serie.tagline !== '' ? serie.tagline : 'Not available'
          }}"
        </p>
        <p class="serie-fact">
          <span>Number of episodes:</span>
          {{ serie.number_of_episodes }}
        </p>
        <p class="serie-fact">
          <span>Number of seasons:</span>
          {{ serie.number_of_seasons }}
        </p>
        <p class="serie-fact">
          <span>Released:</span>
          {{
            new Date(serie.first_air_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class="serie-fact">
          <span>Last Season Released:</span>
          {{
            new Date(serie.last_air_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class="serie-fact"><span>Status:</span> {{ serie.status }}</p>
        <p class="serie-fact">
          <span>Overview:</span>
          {{ serie.overview !== '' ? serie.overview : 'Not available' }}
        </p>
        <p class="serie-fact">
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
  name: 'Singleserie',
  data() {
    return {
      serie: '',
      videoHost: '',
      videoKey: '',
    }
  },
  async fetch() {
    await this.getSingleSerie()
    await this.getTrailerVideo()
  },
  // delay for fetching
  fetchDelay: 2000,
  head() {
    return {
      title: this.serie.name,
    }
  },

  methods: {
    async getSingleSerie() {
      const data = (
        await this.$axios.get(
          `/tv/${this.$route.params.serieid}?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US`
        )
      ).data

      this.serie = data
    },
    async getTrailerVideo() {
      const data = (
        await this.$axios.get(
          `/tv/${this.$route.params.serieid}/videos?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US`
        )
      ).data

      this.videoKey = data.results[0].key
      this.videoHost = data.results[0].site
    },
  },
}
</script>

<style lang="scss">
.single-serie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
  .serie-button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  .serie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .serie-img {
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
    .serie-content {
      h1 {
        font-size: 46px;
        font-weight: 400;
      }
      .serie-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;
        span {
          font-weight: 600;
          color: #44e6a3;
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
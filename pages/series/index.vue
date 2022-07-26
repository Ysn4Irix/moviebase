<template>
  <div class="home">
    <!-- Header -->
    <SerieHeader />

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
    <div v-else-if="$fetchState.error" class="fetchError">
      <h1>There is an Error while we fetching data</h1>
    </div>
    
    <!-- Series -->
    <div v-else class="container series">
      <div v-if="searchInput !== ''" class="serie-section-title">
        <h1><span>Search</span> Result</h1>
      </div>
      <div v-else class="serie-section-title">
        <h1><span>Now</span> Streaming</h1>
      </div>
      <!-- Search Results -->
      <div v-if="searchInput !== ''" class="series-grid">
        <div
          v-for="(serie, index) in searchedSeries"
          :key="index"
          class="serie"
        >
          <div class="serie-img">
            <img
              :src="
                serie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500/${serie.poster_path}`
                  : 'https://via.placeholder.com/500x800?text=Not+Found'
              "
              alt="posterImg"
            />
            <p class="serie-review">{{ serie.vote_average }}</p>
            <p v-if="serie.overview !== ''" class="serie-overview">
              {{ serie.overview.slice(0, 300) }}
              <span v-if="serie.overview.length > 300">...</span>
            </p>
            <p v-else class="serie-overview">Overview not available</p>
          </div>
          <div class="serie-info">
            <p class="serie-title">
              {{ serie.name.slice(0, 25) }}
              <span v-if="serie.name.length > 25">...</span>
            </p>
            <p class="serie-release">
              Released:
              {{
                new Date(serie.first_air_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <nuxt-link
              class="serie-button serie-button-light"
              :to="{ name: 'series-serieid', params: { serieid: serie.id } }"
            >
              Get More Info
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- Now Streaming  -->
      <div v-else class="series-grid">
        <div
          v-for="(serie, index) in nowStreamngSeries"
          :key="index"
          class="serie"
        >
          <div class="serie-img">
            <img
              :src="
                serie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500/${serie.poster_path}`
                  : 'https://via.placeholder.com/500x800?text=Not+Found'
              "
              alt="posterImg"
            />
            <p class="serie-review">{{ serie.vote_average }}</p>
            <p v-if="serie.overview !== ''" class="serie-overview">
              {{ serie.overview.slice(0, 300) }}
              <span v-if="serie.overview.length > 300">...</span>
            </p>
            <p v-else class="serie-overview">Overview not available</p>
          </div>
          <div class="serie-info">
            <p class="serie-title">
              {{ serie.name.slice(0, 25) }}
              <span v-if="serie.name.length > 25">...</span>
            </p>
            <p class="serie-release">
              Released:
              {{
                new Date(serie.first_air_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <NuxtLink
              class="serie-button serie-button-light"
              :to="{ name: 'series-serieid', params: { serieid: serie.id } }"
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
      nowStreamngSeries: [],
      searchedSeries: [],
      popularSeries: [],
      searchInput: '',
    }
  },
  async fetch() {
    if (this.searchInput === '') {
      await this.nowStreamingSeries()
      return
    }
    await this.searchedserie()
  },
  head() {
    return {
      title: 'SerieBase - Latest Streaming Series Info',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get all the latest streaming Series in theaters & online',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Series, stream, stremaing',
        },
      ],
    }
  },
  fetchDelay: 2000,
  methods: {
    async nowStreamingSeries() {
      const data = (
        await this.$axios.get(
          `/tv/on_the_air?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US&page=1`
        )
      ).data

      data.results.forEach((serie) => {
        this.nowStreamngSeries.push(serie)
      })
    },
    async getpopularSeries() {
      const data = (
        await this.$axios.get(
          `/tv/popular?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US&page=1`
        )
      ).data

      data.results.forEach((serie) => {
        this.popularSeries.push(serie)
      })
    },
    async searchedserie() {
      const data = (
        await this.$axios.get(
          `/search/tv?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US&page=1&query=${this.searchInput}`
        )
      ).data
      data.results.forEach((serie) => {
        this.searchedSeries.push(serie)
      })
    },
    clearSearch() {
      this.searchInput = ''
    },
  },
}
</script>
<template>
  <div class="home">
    <SerieHeader />

    <!-- Loading Animation -->
    <Loading v-if="$fetchState.pending" />
    <div v-else-if="$fetchState.error" class="fetchError">
      <h1>Error while fetching mountains</h1>
    </div>
    <!-- Series -->
    <div v-else class="container series">
      <div class="serie-section-title">
        <h1><span>Most</span> Popular</h1>
      </div>

      <!-- Populer Series  -->
      <div class="series-grid">
        <div v-for="(serie, index) in Popularseries" :key="index" class="serie">
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
  name: 'SeriePopular',
  data() {
    return {
      Popularseries: [],
    }
  },
  async fetch() {
    await this.getPopularseries()
  },
  fetchDelay: 2000,
  head() {
    return {
      title: 'SerieBase - Popular Series',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get all the popular series',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'series, stream, stremaing, popular',
        },
      ],
    }
  },
  methods: {
    async getPopularseries() {
      const data = (
        await this.$axios.get(
          `/tv/popular?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US&page=1`
        )
      ).data

      data.results.forEach((serie) => {
        this.Popularseries.push(serie)
      })
    },
  },
}
</script>
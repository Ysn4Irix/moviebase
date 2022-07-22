<template>
  <div class="header">
    <img src="../assets/images/Serieheader.webp" alt="headerImg1" />
    <div class="text-container">
      <div class="text">
        <div class="logo">
          <nuxt-link :to="{ name: 'index' }">
          <img src="../assets/images/seriebase.svg" alt="logo" />
          </nuxt-link>
        </div>
        <nuxt-link :to="{ name: 'series' }" class="serie-button">
          Now Streaming
        </nuxt-link>
        <nuxt-link :to="{ name: 'series-popular' }" class="serie-button">
          Most Popular
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SerieHeader',
}
</script>

<style lang="scss" scoped>
.header {
  height: 350px;
  position: relative;
  @media (min-width: 750px) {
    height: 250px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .text-container {
    z-index: 99;
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .text {
      padding: 0 20px;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .logo {
      margin-bottom: 20px;
      width: 300px;
      @media (min-width: 750px) {
        width: 350px;
      }
    }

    .serie-button {
      align-self: flex-start;
    }
  }
}
</style>
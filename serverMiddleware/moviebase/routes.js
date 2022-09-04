const router = require('express').Router()
const axios = require('axios')

router.get('/now', async (req, res, next) => {
  try {
    const data = (
      await axios.get(
        `${process.env.TMDB_API_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
      )
    ).data

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    })
  }
})

router.get('/trending', async (req, res, next) => {
  try {
    const data = (
      await axios.get(
        `${process.env.TMDB_API_URL}/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
      )
    ).data

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    })
  }
})

router.get('/search/:query', async (req, res, next) => {
  const { query } = req.params
  try {
    const data = (
      await axios.get(
        `${process.env.TMDB_API_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&query=${query}`
      )
    ).data

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    })
  }
})

router.get('/movie/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const data = (
      await axios.get(
        `${process.env.TMDB_API_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      )
    ).data

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    })
  }
})

router.get('/movie/trailer/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const data = (
      await axios.get(
        `${process.env.TMDB_API_URL}/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      )
    ).data

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    })
  }
})

router.get('/series/ontheair', async (req, res, next) => {
  try {
    const data = (
      await axios.get(
        `${process.env.TMDB_API_URL}/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
      )
    ).data

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    })
  }
})

router.get('/series/popular', async (req, res, next) => {
  try {
    const data = (
      await axios.get(
        `${process.env.TMDB_API_URL}/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
      )
    ).data

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    })
  }
})

router.get('/series/search/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const data = (
      await axios.get(
        `${process.env.TMDB_API_URL}/search/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&query=${id}`
      )
    ).data

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    })
  }
})

router.get('/series/show/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const data = (
      await axios.get(
        `${process.env.TMDB_API_URL}/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      )
    ).data

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    })
  }
})

router.get('/series/show/trailer/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const data = (
      await axios.get(
        `${process.env.TMDB_API_URL}/tv/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      )
    ).data

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({
      error: {
        message: e.message,
      },
    })
  }
})

module.exports = router

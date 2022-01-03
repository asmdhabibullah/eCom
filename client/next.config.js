require("dotenv").config()

module.exports = {
  env: {
    API: process.env.ENDPOINT,
  },
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'fakestoreapi.com'
    ]
  }
}

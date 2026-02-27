// Load dotenv if available, but continue if it's not installed
try {
  require('dotenv/config')
} catch (e) {
  // dotenv not installed  that's fine in some environments
}

// Export a plain config object to avoid requiring 'prisma/config'
module.exports = {
  schema: 'prisma/schema.prisma',

  migrations: {
    path: 'prisma/migrations',
    seed: 'node prisma/seed.js',
  },

  datasource: {
    // Use DATABASE_URL from environment; Prisma will accept this
    url: process.env.DATABASE_URL,
  },
}
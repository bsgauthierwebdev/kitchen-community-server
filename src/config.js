module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'production',
    DATABASE_URL: process.env.DATABASE_URL || 'https://stark-waters-43512.herokuapp.com',
    TEST_DATABASE_URL: 'postgresql://dunder_mifflin@localhost/kitchen-community-test'
}
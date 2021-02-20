module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'test',
    DATABASE_URL: 'postgresql://dunder_mifflin@localhost/kitchen-community',
    TEST_DATABASE_URL: 'postgresql://dunder_mifflin@localhost/kitchen-community-test'
}
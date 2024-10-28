module.exports = {
    i18: {
        defaultLocale: 'en',
        locales: ['en', 'tr', 'ar'],
        localeDetection: false
    },
    fallbacklang: 'en',
    ns: ['common'],
    reloadOnPreffered: process.env.NODE_ENV !== 'production'
}
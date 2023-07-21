const config = {
    app: {
        port: process.env.PORRT || 3000,
        origins: [
            "http://localhost:3001"
        ]
    },
    db: {
        url: "mongodb://127.0.0.1:27017/Kingbook"
    },
    jwt: {
        secret: "kingbook-secret-key"
    }

};
module.exports = config;
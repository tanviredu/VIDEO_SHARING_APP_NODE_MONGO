  
module.exports = {
    "mongourl": "mongodb+srv://trahman123456:trahman123456@cluster0.v1x5w.mongodb.net/todo?retryWrites=true&w=majority",
    "productionurl":"mongodb+srv://tanvir:aaaron007@cluster0.om6zd.mongodb.net/youtube?retryWrites=true&w=majority",
    "port": process.env.PORT || 3000,
    "secrets": process.env.JWT || "secret",
    "expiretime": 24 * 60 * 10
}
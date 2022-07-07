function getMongoOptions() {
    return '?readPreference=secondary';
}
function getMongoUri() {
    console.log('hh')
    return `mongodb://localhost:27017/demo`;
}
module.exports = { getMongoUri };

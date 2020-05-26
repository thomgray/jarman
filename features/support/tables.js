const tableToObject = (table) => {
    return table.rowsHash();
}

const tableToList = (table) => {
    return table.raw().map((row) => row[0]);
}

module.exports = {
    tableToObject,
    tableToList
}
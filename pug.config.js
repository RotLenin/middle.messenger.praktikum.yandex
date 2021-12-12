module.exports = {
    locals: {
        readFileSync: (name) => require("fs").readFileSync(__dirname + '/src/data/' + name , "utf-8"),
        requireData: (name) => require(__dirname + '/src/data/' + name)
    }
};
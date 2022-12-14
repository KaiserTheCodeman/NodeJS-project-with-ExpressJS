import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName :"lenslight_tr",
        useNewUrlParser : true,
        useUnifiedTopology: true,
        

    }).then(() => {
        console.log("connected to the DB successfully")
    }).catch((err) => {
        console.log(`DB connection is failed ${err}`)
    })
}

export default conn;
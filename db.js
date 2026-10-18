const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient
const ObjectId=mongodb.ObjectId
let database
const dataConnection= async ()=>{

    const client= await mongoClient.connect('mongodb://127.0.0.1:27017')
    database=client.db('library')

    if(!database){
        console.log('database set error');
        
    }
    return database
}
module.exports={dataConnection,ObjectId}
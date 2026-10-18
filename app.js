const express=require('express') //import
const app=express()
const bodyParser=require('body-parser')
const handleBars=require('express-handlebars')
const db=require('./db')
const { ObjectId } = require('mongodb')
app.engine('hbs',handleBars.engine({layoutsDir:'views/',defaultLayout:"main",extname:"hbs"}))
app.set('view engine','hbs') //middleware
app.set('views','views')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))

app.get('/', async(req,res)=>{
    let message='';
    let edit_id,edit_book; 
    let delete_id;
    let database= await db.dataConnection()
    let collection=database.collection('book')
    
    if(req.query.edit_id){
        edit_id=req.query.edit_id
        edit_book= await collection.findOne({_id:new ObjectId(edit_id)})
        

    }
    console.log('status',req.query.status);
     switch(req.query.status){
        case '1':
            message='success';
            break;

         case '2':
            message='Updated!';
            break;
        case '3':
            message='Deleted!';
            break;
        default:
            message:'ur one more added'
            break;
    }
    
    if(req.query.delete_id){
        delete_id=req.query.delete_id
        console.log(delete_id);
        
       await collection.deleteOne({_id:new ObjectId(delete_id)})
       return res.redirect('/?status=3')
    }
    
    
    const cursor =collection.find({})
    let employee=await cursor.toArray()
    res.render('main',{message,employee,edit_book,edit_id}) //route
    
   
})

app.post('/employee',async(req,res)=>{
    let database= await db.dataConnection()
    let collection=database.collection('book')
    let book= {name:req.body.emp}
    await collection.insertOne(book)
    return res.redirect('/?status=1')
})

app.post('/update_book/:edit_id',async(req,res)=>{
    let database= await db.dataConnection()
    let collection=database.collection('book')
    let book= {name:req.body.emp}
    let edit_id=req.params.edit_id
    await collection.updateOne({_id: new ObjectId(edit_id)},{$set:book})

    return res.redirect('/?status=2')
})

app.listen(3000,()=>(console.log('server is running...') //server
))
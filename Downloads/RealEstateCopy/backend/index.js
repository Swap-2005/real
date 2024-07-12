const port = 5000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/real-estate', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/', (req, res) => {
    res.send('Express App is running');
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('plot'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

const plotSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Plot = mongoose.model("Plot", plotSchema);

app.post('/addplot', async (req, res) => {
    let plots = await Plot.find({});
    let id;
    if (plots.length > 0) {
        let last_plot = plots[plots.length - 1];
        id = last_plot.id + 1;
    } else {
        id = 1;
    }

    const plot = new Plot({
        id: id,
        title: req.body.title,
        description: req.body.description,
        category:req.body.category,
        image: req.body.image,
        location: req.body.location,
        size: req.body.size,
        price: req.body.price,
    });

    await plot.save();
    console.log("Plot saved");
    res.json({
        success: true,
        title: req.body.title
    });
});

app.post('/removeplot', async (req, res) => {
    await Plot.findOneAndDelete({ id: req.body.id });
    console.log('Plot removed');
    res.json({
        success: true,
        id: req.body.id
    });
});

app.get('/allplots', async (req, res) => {
    let plots = await Plot.find({});
    console.log("All plots fetched");
    res.json(plots);  // Ensure this is sending a JSON response
});

// Creating endpoint for newListings data
app.get('/newlistings',async(req,res)=>{
    let plots = await Plot.find({});
    let newCollection=plots.slice(1).slice(-8);
    console.log('New Plots fetched');
    res.json(newCollection);  // Ensure this is sending a JSON response
})

//User Schema
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//User Model
const Users = mongoose.model('Users', UserSchema);

//creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).json({errors:"please authenticate using valid token"})  // Ensure this is sending a JSON response
    }
    else{
        try{
            const data =jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).json({error:"Please authenticate using a valid token"})  // Ensure this is sending a JSON response
        }
    }
 } 

 app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log(req.body,req.user);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.json({ message: "added" });  // Ensure this is sending a JSON response
})
// creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log('removed',req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId]-=1;
        await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
        res.json({ message: "Removed" });  // Ensure this is sending a JSON response
    } else {
        res.json({ message: "Item not in cart" });  // Ensure this is sending a JSON response
    }
})
//creating endpoint to get cart data
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log('Get Cart');
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);  // Ensure this is sending a JSON response
})

//creating API end point for registering users
app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:'existing user found'})  // Ensure this is sending a JSON response
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new Users({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();
    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})  // Ensure this is sending a JSON response
})

//creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data, 'secret_ecom');
            res.json({success:true,token});  // Ensure this is sending a JSON response
        }
        else{
            res.json({success:false,errors:"Wrong password"});  // Ensure this is sending a JSON response
        }
    }
    else{
        res.json({success:false,errors:'wrong email Id'})  // Ensure this is sending a JSON response
    }
})

app.listen(port, (error) => {
    if (!error) {
        console.log('Server running on Port ' + port);
    } else {
        console.log(error);
    }
});

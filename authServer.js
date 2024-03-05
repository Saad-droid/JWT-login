require('dotenv').config()
const express=require('express')
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app=express()

const jwt=require('jsonwebtoken')

app.use(express.json())
let refreshTokens=[]

app.use(cors({
    origin: 'http://localhost:3002',  // Replace with the actual origin of your React app
    credentials: true,
  }));

  app.use(bodyParser.json());

  const users = [
    { id: 1, username: 'saad', password: 'password123' },
    // Add more user entries as needed
  ];

app.post('/token',(req,res)=>{
    const refreshToken=req.body.token
    if(refreshToken==null) return res.sendStatus(401)
    if(refreshTokens.includes(refreshToken))return sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,user)=>{
if(err) return res.sendStatus(403)
const accessToken=generateAccessToken({name:user.name})
res.json({accessToken:accessToken})
})
})



app.post('/login',(req,res)=>{
    const { username, password } = req.body;
 
    const user = users.find((u) => u.username === username)

    if (user && user.password === password) {
        // Generate access token
       
const accessToken= generateAccessToken(user)
const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN)
res.json({accessToken:accessToken, refreshToken:refreshToken,user:user})
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
})

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN, {expiresIn:'30s'})
}


app.listen(4000)
require('dotenv').config()
const express=require('express')
const app=express()

const jwt=require('jsonwebtoken')

app.use(express.json())

const posts=[
    {
        username:'saad',
        title:'Admin'
    },
    {
        username:'Alfred',
        title:'User'
    }
]
app.get('/posts', AuthenticateToken,(req,res)=>{
    res.json(posts.filter(post=>post.username===req.user.name))
})


function AuthenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1] 

    if(token==null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN, (err,user)=>{
     if(err) return res.sendStatus(403)
     req.user=user
    next()       
    })
}


app.listen(3001)
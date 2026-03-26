const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let users = [];

router.post('/signup', async (req,res)=>{
    const hash = await bcrypt.hash(req.body.password,10);
    users.push({user:req.body.username, pass:hash});
    res.json({msg:"User created"});
});

router.post('/login', async (req,res)=>{
    const u = users.find(x=>x.user===req.body.username);
    if(!u) return res.json({msg:"User not found"});

    const valid = await bcrypt.compare(req.body.password,u.pass);
    if(!valid) return res.json({msg:"Wrong password"});

    const token = jwt.sign({user:u.user}, process.env.JWT_SECRET);
    res.json({token});
});

module.exports = router;
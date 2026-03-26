const router = require('express').Router();
const multer = require('multer');
const axios = require('axios');
const auth = require('../middleware/authMiddleware');

const upload = multer({ dest:'uploads/' });

router.post('/', auth, upload.single('file'), async (req,res)=>{
    const response = await axios.post('http://localhost:8000/analyze',{
        file:req.file.path
    });

    res.json(response.data);
});

module.exports = router;
const express=require('express')
const router=express.Router()
const Artist=require('../models/artist')

//All Artist Route
router.get('/', async (req, res)=> {
    let searchOptions={}
    if(req.query.name!=null && req.query.name!==''){
        searchOptions.name= new RegExp(req.query.name, 'i')
    }
    try{
        const artists=await Artist.find(searchOptions)
        res.render('artists/index', {
            artists: artists, 
            searchOptions: req.query})
    } catch{
       res.redirect('/')
    }
})

//New Artist Route
router.get('/new', (req, res)=>{
    res.render('artists/new', {artist: new Artist()})
})

//Create Artist Route
router.post('/', async (req, res)=>{
    const artist=new Artist({
        name: req.body.name
    })
    try{
        const newArtist= await artist.save()
        //res.redirect(`artists/${newArtist.id}`)
        res.redirect(`artists`)        
    } catch{
        res.render('artists/new', {
            artist: artist,
            errorMessage: 'Error creating Artist'
        })
    }
})

module.exports=router
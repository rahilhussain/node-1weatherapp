
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



const app = express()
const port = process.env.PORT || 3000
//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

 app.get('',(req, res) => {
    res.render('index',{
        title : 'weather app',
        name : 'rahil'
    })
 })
 app.get('/about',(req, res) => {
    res.render('about',{
        title : 'weather app',
        name : 'rahil'
    })
})
app.get('/help',(req, res) => {
    res.render('help',{
        msg : 'how can we help you'
        
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error
        })
    }
    geocode(req.query.address,( error ,{latitude,longitude,location} = {}) => {
    if(error){
        return res.send({error})
    }

    forecast(latitude,longitude,( error , forecastData) => {
    if(error){
        return res.send({error})
    }
    res.send({
        forecast : forecastData,
        location,
        address : req.query.address
        
    })
})})})



app.get('/help/*',(req,res) => {
    res.send('404')
})
app.get('*',(req,res) => {
    res.send('404')
})
  
app.listen(port, () => {
    console.log('server is up on ' + port)
})


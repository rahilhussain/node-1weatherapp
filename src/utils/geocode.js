const request = require('request')
const geocode = (x,call) => {
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ x +'.json?access_token=pk.eyJ1IjoicmFoaWxodXNzYWlucCIsImEiOiJjazJlbzdhYzUwYmpyM2NxcGI0aXBidGlmIn0.bSF3T2qAVorzmedtVuf8xA'

   request({url:url,json:true},( error , response) => {
   if( error ){
       call('unable to connect',undefined)
   }
   else if( response.body.features.length === 0) {
       call('location not found',undefined)
   }
   else{
       call(undefined,{
           
       latitude: response.body.features[0].center[1],
       longitude: response.body.features[0].center[0],
       location: response.body.features[0].placeName
       })
   }})}


module.exports = geocode
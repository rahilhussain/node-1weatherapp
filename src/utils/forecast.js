const request = require('request')
const forecast = (latitude,longitude,call) => {
   const url = 'https://api.darksky.net/forecast/418901111b5c1589ff8ba7d04f728aa7/'+latitude+','+longitude+''
   request({url:url,json:true},( error , response)=>{
   if( error ){
       call('unable to connect',undefined)
   }
   else if( response.body.error ){
       call('location not found',undefined)
   }
   else{
       call(undefined,response.body.daily.data[0].summary+'with current temperature of' + response.body.currently.temperature + ' and chance of rainfall will be ' +response.body.daily.data[0].precipProbability )
   }})}

module.exports = forecast
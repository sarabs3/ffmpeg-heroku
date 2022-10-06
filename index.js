const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;
var fluent_ffmpeg = require("fluent-ffmpeg");

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    var mergedVideo = fluent_ffmpeg();
var videoNames = ['./files/circles.MOV', './files/bemotions.MOV'];

videoNames.forEach(function(videoName){
    mergedVideo = mergedVideo.addInput(videoName);
});

mergedVideo.mergeToFile('./public/mergedVideo.mp4', './tmp/')
.on('error', function(err) {
    console.log('Error ' + err.message);
})
.on('end', function() {
    console.log('Finished!');
    res.render('pages/index');
});
    
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

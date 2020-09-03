const express = require('express')
const nunjucks = require('nunjucks')
const videos = require("./data")

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
})

server.get("/", function(req, res){

    const about = {
        avatar_url: "https://avatars2.githubusercontent.com/u/56072190?s=460&u=4150bb6561f1ad9e773625395d12bb2658a086d4&v=4",
        name: "Marcelo Tedesco de Miranda",
        role: "Desenvolvedor Web",
        description: 'Programador Full-Stack, focado em front-end. Desenvolvendo com o auxílio da <a href="http://www.rocketseat.com.br/" target="_blank">Rocektseat</a>',
        links: [
            {name: "Github", url: "https://github.com/MarceloCG-bot/"},
            {name: "Twitter", url: "https://twitter.com/MarceloTedes"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/marcelo-tedesco-de-miranda-0308071a1/"}
        ]
    }

    return res.render("about", {about:about})
})

server.get("/portfolio", function(req, res){

    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if(!video){
        return res.send("Video not found!")
    }
    return res.render("video", { item: video })
})

server.listen(5000, function(){
    console.log('server is running')
})
const url = "https://www.imdb.com/"
const request = require("request")
const cheerio = require("cheerio")
const allmovieobj=require("./allmovies")
const fs=require("fs")
const path=require("path")

function dirCreator(filepath) {
    if (fs.existsSync(filepath) == false) {
        fs.mkdirSync(filepath)
    }
}

let moviepath=path.join(__dirname,"Top 250 Movies List")
dirCreator(moviepath)

request(url, cb)

function cb(err, response, html) {
    if (err) {
        console.log(err)
    } else {
        ExtractTop250MovLink(html)
    }
}

function ExtractTop250MovLink(html) {
    let $ = cheerio.load(html)
    let anchorelearr = $(".ipc-list__item.nav-link.NavLink-sc-19k0khm-0.dvLykY.ipc-list__item--indent-one")
    let link = $(anchorelearr[2]).attr('href')
    let fulllink = "https://www.imdb.com/" + link
    // console.log(fulllink)
    allmovieobj.getallmovies(fulllink)

}




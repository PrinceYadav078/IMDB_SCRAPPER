const url="https://www.imdb.com/"
const request= require("request")

const cheerio= require("cheerio")


request(url,cb)

function cb(err,response,html){
    if(err){
        console.log(err)
    }else{
        ExtractTop250MovLink(html)
    }
}

function ExtractTop250MovLink(html){
    let $=cheerio.load(html)
    let anchorelearr=$(".ipc-list__item.nav-link.NavLink-sc-19k0khm-0.dvLykY.ipc-list__item--indent-one")
    let link=$(anchorelearr[2]).attr('href')
    let fulllink="https://www.imdb.com/"+link
    // console.log(fulllink)
    allmoviesLink(fulllink)

}

function allmoviesLink(url2){
    request(url2 , function(err, response, html){
        if(err){
            console.log(err)
        }else{
            getallmoviesLink(html)
        }
    })
}

function getallmoviesLink(html){
    let $=cheerio.load(html)
    let movieslinkarr=$(".titleColumn a")
    // let link=$(movieslinkarr[0]).attr('href')
    let count=0
    for(let i=0;i<movieslinkarr.length;i++){
        let link=$(movieslinkarr[i]).attr('href')
        let fulllink="https://www.imdb.com/"+link
    // console.log(link)
    count++
    console.log(fulllink)
    
    }
    console.log(count)
}
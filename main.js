const url = "https://www.imdb.com/"
const request = require("request")

const cheerio = require("cheerio")


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
    allmoviesLink(fulllink)

}

function allmoviesLink(url2) {
    request(url2, function (err, response, html) {
        if (err) {
            console.log(err)
        } else {
            getallmoviesLink(html)
        }
    })
}

function getallmoviesLink(html) {
    let $ = cheerio.load(html)
    let movieslinkarr = $(".titleColumn a")

    let count = 0
    // let link=$(movieslinkarr[0]).attr('href')
    // let fulllink="https://www.imdb.com/"+link
    // // console.log(link)
    // allmoviesdetail(fulllink)
    // // console.log(fulllink)


    for (let i = 0; i <250; i++) {
        let link = $(movieslinkarr[i]).attr('href')
        let fulllink = "https://www.imdb.com/" + link
        count++
        
        // console.log(link)
        allmoviesdetail(fulllink,i+1)
        
        
        
        // console.log(fulllink)

    }
    console.log(count)
    
}

function allmoviesdetail(url3,Rank) {
    request(url3, function (err, response, html) {
        if (err) {
            console.log(err)
        } else {
            getallmoviesdetail(html,Rank)
        }
    })
}

function getallmoviesdetail(html,Rank) {
    let $ = cheerio.load(html)
    let MoviesName = $('.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt h1').text()
    console.log(Rank)
    console.log(MoviesName)

    let date_durationelem = $(".ipc-inline-list.ipc-inline-list--show-dividers.TitleBlockMetaData__MetaDataList-sc-12ein40-0.dxizHm.baseAlt li")
    let duration = $(date_durationelem[2]).text()
    console.log(duration)

    // let dateele=$('.TitleBlockMetaData__ListItemText-sc-12ein40-2.jedhex').text()
    let dateele = $('.ipc-link.ipc-link--baseAlt.ipc-link--inherit-color.TitleBlockMetaData__StyledTextLink-sc-12ein40-1.rgaOW')
    let date = $(dateele[0]).text()
    console.log(date)

    let ImdbRatingele=$('.AggregateRatingButton__Rating-sc-1ll29m0-2.bmbYRW span')
    let ImdbRating=$(ImdbRatingele[0]).text()
    console.log(ImdbRating)

    let castingele = $('.ipc-metadata-list-item__content-container .ipc-metadata-list-item__list-content-item.ipc-metadata-list-item__list-content-item--link')
    let director = $(castingele[0]).text().trim()
    console.log(director)

    let writer = $(castingele[1]).text();
    console.log(writer)

    let actorele=$('.StyledComponents__ActorName-sc-y9ygcu-1.ezTgkS')
    let actor1=$(actorele[0]).text()
    let actor2=$(actorele[1]).text()
    let actor3=$(actorele[2]).text()
    let Actors=actor1+" , "+actor2+" , "+actor3
    console.log(Actors)



}
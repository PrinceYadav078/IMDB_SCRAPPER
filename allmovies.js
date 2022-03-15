const request =require("request")
const cheerio =require("cheerio")

const moviedetails=require("./processdetails")


function allmoviesLink(url2) {
    request(url2, function (err, response, html) {
        if (err) {
            console.log(err)
        } else {
            getallmoviesLink(html)
        }
    })
}


async function getallmoviesLink(html, i) {
    let $ = cheerio.load(html)
    let movieslinkarr = $(".titleColumn a")


    // let link=$(movieslinkarr[0]).attr('href')
    // let fulllink="https://www.imdb.com/"+link
    // // console.log(link)
    // allmoviesdetail(fulllink)
    // // console.log(fulllink)


    let movieLinkArr = [];
    for (let i = 0; i < 250; i++) {

        let link = $(movieslinkarr[i]).attr('href')
        let fulllink = "https://www.imdb.com/" + link
        

        // console.log(link)
        // console.log(fulllink)
        movieLinkArr.push(fulllink);

    }
    console.log(movieLinkArr.length)
    
    moviedetails.getdetails(0, movieLinkArr);
}

module.exports={
    getallmovies:allmoviesLink
}
const request = require("request")
const cheerio = require("cheerio")
const path = require("path")
const fs = require("fs")
const xlsx = require('xlsx')


function allmoviesdetail(idx, arr) {
    if (idx >= arr.length) {
        return;
    }
    request(arr[idx], function (err, response, html) {
        if (err) {
            console.log(err);
        } else {
            getallmoviesdetail(html, idx + 1)
            allmoviesdetail(idx + 1, arr);
            console.log("``````````````````````````````");

        }
    })
}


function getallmoviesdetail(html, Rank) {
    let $ = cheerio.load(html)
    let MoviesName = $('.sc-94726ce4-0.cMYixt .sc-94726ce4-1.iNShGo h1').text()
    // let MoviesName = $('.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt h1').text()
    console.log("RANK-> " + Rank)
    console.log("MOVIE-> " + MoviesName)

    let date_durationelem = $(".ipc-inline-list.ipc-inline-list--show-dividers.sc-52284603-0.blbaZJ.baseAlt li")
    let duration = $(date_durationelem[2]).text()
    console.log("DURATION-> " + duration)


    let dateele = $('.ipc-link.ipc-link--baseAlt.ipc-link--inherit-color.sc-52284603-1.ifnKcw')
    let date = $(dateele[0]).text()
    console.log("DATE-> " + date)

    let ImdbRatingele = $('.sc-7ab21ed2-0.fAePGh .sc-7ab21ed2-2.kYEdvH span')
    let ImdbRating = $(ImdbRatingele[0]).text()
    console.log("RATING-> " + ImdbRating)

    let castingele = $('.ipc-metadata-list-item__content-container .ipc-metadata-list-item__list-content-item.ipc-metadata-list-item__list-content-item--link')
    let director = $(castingele[0]).text().trim()
    console.log("DIRECTOR-> " + director)

    let writer = $(castingele[1]).text();
    console.log("WRITER-> " + writer)

    let actorele = $('.sc-11eed019-7.dlEERm .sc-11eed019-9.gRPuwU .sc-11eed019-1.jFeBIw')
    let actor1 = $(actorele[0]).text()
    let actor2 = $(actorele[1]).text()
    let actor3 = $(actorele[2]).text()
    let Actors = actor1 + " , " + actor2 + " , " + actor3
    console.log("ACTORS-> " + Actors)
    storedetailsinexcel(Rank, MoviesName, duration, date, ImdbRating, director, writer, Actors)

}
function dirCreator(filepath) {
    if (fs.existsSync(filepath) == false) {
        fs.mkdirSync(filepath)
    }
}

function storedetailsinexcel(Rank, MOVIE, DURATION, DATE, RATING, DIRECTOR, writer, ACTORS) {
    let moviesDetailpath = path.join(__dirname, "Top 250 Movies List","MoviesList" + ".xlsx")
    let Moviescontent=excelReader(moviesDetailpath,"MoviesList")
    
    let MoviescontentObj={
        Rank,
        MOVIE,
        DURATION,
        DATE,
        RATING,
        DIRECTOR,
        writer,
        ACTORS
    }

    Moviescontent.push(MoviescontentObj)
    excelWriter(moviesDetailpath,"MoviesList",Moviescontent)
}

function excelWriter(fileName, sheetName, jasonData) {
    let newWB = xlsx.utils.book_new();
    // CREATING A NEW WORKBOOK
    let newWS = xlsx.utils.json_to_sheet(jasonData);
    //JSON IS CONVERING TO SHEET FORMAT (ROWS & COL)
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    xlsx.writeFile(newWB, fileName);
}

function excelReader(fileName, sheetName) {
    if (fs.existsSync(fileName) == false) {
        return []
    }
    let wb = xlsx.readFile(fileName);
    let excelData = wb.Sheets[sheetName];
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans

}



module.exports = {
    getdetails: allmoviesdetail
}
$(document).ready(function(){
    renderTable()
    $('.target-search').keypress(function(e){
        let searchVal = $('.target-search').val()

        if(e.keyCode === 13 && searchVal) {
            getURL(searchVal)
            $('.target-search').val('')
        }
    })
})

function getURL(url) {
    fetch('http://127.0.0.1:80/getTitle?url=' + url)
    .then(response => response.text()) 
    .then(data => {
        //get list from storage
        var urlList = eval(localStorage.getItem("urlList")) || []

        //add item to list
        urlList.push({'date': Date.now(), 'url': url, 'title': data})

        //save list
        localStorage.setItem('urlList', JSON.stringify(urlList))

        renderTable()
    })
}

function renderTable(){
    var urlList = eval(localStorage.getItem("urlList")) || []

    $('.data-table > tbody > tr').remove();

    for (let i = urlList.length - 1; i >= 0; i--) {
        let newRow = $('.data-table-template tr', this.rootElement).clone();

        var formatedDate = new Date(urlList[i].date)
        const dd = formatedDate.getDay();
        const mm = formatedDate.getMonth();
        const yy = formatedDate.getFullYear();
        const hh = formatedDate.getHours();
        const m = formatedDate.getMinutes();
        const ss = formatedDate.getSeconds();

        $('.target-date', newRow).html(mm + '\/' + dd + '\/' + yy + ' ' + hh + ':' + m + ':' + ss);
        $('.target-url', newRow).html(urlList[i].url);
        $('.target-title', newRow).html(urlList[i].title);

        $('.data-table > tbody').append(newRow);
        newRow.show();
    }
}
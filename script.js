$(document).ready(function() {
    //AJAX REQUEST TO CSV FILE
    $.ajax({
        type: "GET",
        url: "TEST-Data in csv file with headings.csv",
        dataType: "text",
        success: function(data) {format(data);}
     });
});

let format = function (allData) {
    let allDataLines = allData.split(/\r\n|\n/); //SPLITS ALL TEXT FROM FILE INTO LINES
    let headers = allDataLines[0].split(','); // SPLITS HEADINGS INTO IT'S OWN ARRAY
    let stores = [];

    for (let i=1; i<allDataLines.length; i++) {
        let data = allDataLines[i].split(',');
        if (data.length == headers.length) { // VERIFIES THAT THE NUMBER OF DATA VALUES IS THE SAME AS THE NUMBER OF HEADERS

            let tarr = []; // TEMP ARRAY TO PUSH INTO THE MAIN STORES ARRAY
            for (let j=0; j<headers.length; j++) {
                tarr.push(headers[j]+": "+data[j]);
            }
            stores.push(tarr);
        }
    }
    // console.log(stores); <---THIS WAS TO TEST TO SEE EACH "STORE"
    
    let cardsHTML = "";
    // FUNCTION THAT CREATES THE CARD DIVS
    let cards = () => {
        $.each(stores, function(i, val) {
            cardsHTML += '<div class="card">';
            cardsHTML += '<ul>';
            let store = stores[i];
            for (let x=0; x<store.length; x++) {
                cardsHTML += '<li>' + store[x] + '</li>';
            }
            cardsHTML += '</ul>';
            cardsHTML += '</div>';
        });
        $('.output').html(cardsHTML);
    };
    cards();

    // FUNCTION THAT CHANGES THE STYLES OF LIST ITEMS DEPENDING ON THEIR RESULTS
    const changeListItemStyle = () => {
        $('li:contains("online"),li:contains("activated"),li:contains("installed")').addClass("green");
        $('li:contains("offline"),li:contains("inactive"),li:contains("awaiting")').addClass("red");
        $('li:contains("unknown")').addClass("orange");
        $('li:contains("Store")').addClass("store");
    }; 
    changeListItemStyle();
     
    // AUTO-SCROLL FUNCTION
    // CHANGES THE "scrollTop" property of the body and animates the change in milliseconds
    function scroll () {
        $('html, body').animate({ scrollTop: $(document).height() - $(window).height() }, 3000);
        $('html, body').animate({ scrollTop: 0 }, 3000);
        scrollDelay = setTimeout(scroll,1000);
    }
    scroll();
};





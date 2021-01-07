const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteTweet = document.getElementById('quote-tweet');
const newQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loader
function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loader
function hideLoader() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote from API
async function getQuote() {
    showLoader();
    const proxyUrl = "https://secret-ocean-49799.herokuapp.com/";
    const quoteUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + quoteUrl);
        const data = await response.json();
        // console.log(data);
        // Reduce font-size if quote is too long
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-text');
        } else {
            quoteText.classList.remove('long-text');
        }
        quoteText.innerText = data.quoteText;

        // If author is empty then add author as 'unknown'
        if (data.quoteAuthor === '') {
            quoteAuthor.innerText = 'Unknown';
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }
        hideLoader();
    } catch (error) {
        console.log("whoops!😞 no quotes", error);
        getQuote();
    }
}

// Tweet quotes
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet/?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// Add eventlistner
quoteTweet.addEventListener('click', tweetQuote);
newQuote.addEventListener('click', getQuote);


// On load
getQuote();






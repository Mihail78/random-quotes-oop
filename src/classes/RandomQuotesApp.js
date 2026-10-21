import RandomQuote from './RandomQuote.js';
import Quote from './Quote.js';

class RandomQuotesApp {
    constructor() {
        this.randomQuoteBtn = document.getElementById('random-quote-btn');
        this.randomQuoteAPIBtn = document.getElementById(
            'random-quote-api-btn',
        );
        this.quoteTextElement = document.getElementById('quote-text');
        this.quoteAuthorElement = document.getElementById('quote-author');
        this.currentQuote = null;

        this.init();
    }

    displayCurrentQuote() {
        this.quoteTextElement.textContent = this.currentQuote.formatText();
        this.quoteAuthorElement.textContent = this.currentQuote.formatAuthor();
    }

    changeCurrentQuote(newQuote) {
        if (newQuote instanceof Quote) {
            this.currentQuote = newQuote;
            this.displayCurrentQuote();
        }
    }

    getRandomQuote() {
        const randomQuote = RandomQuote.getRandomQuote();
        this.changeCurrentQuote(randomQuote);
    }

    getRandomQuoteViaAPI() {
        RandomQuote.getRandomQuoteViaAPI().then((quote) => {
            if (quote instanceof Quote) {
                this.changeCurrentQuote(quote);
            }
        });
    }

    init() {
        this.randomQuoteBtn.addEventListener('click', () =>
            this.getRandomQuote(),
        );
        this.randomQuoteAPIBtn.addEventListener('click', () =>
            this.getRandomQuoteViaAPI(),
        );
    }
}

export default RandomQuotesApp;

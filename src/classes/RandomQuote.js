import quotes from '../data/quotes.js';
import MathUtils from '../utils/MathUtils.js';
import Quote from '../classes/Quote.js';

class RandomQuote {
    static getRandomQuote() {
        const randomIndex = MathUtils.generateRandomInt(quotes.length);
        const { id, text, author } = quotes[randomIndex];
        return new Quote(id, text, author);
    }

    /**
     * 1. Each async function returns a Promise. When you call an async function, it immediately returns a Promise that will eventually resolve to the value returned by the function.
     * 2. If the "await" line of code Promise is rejected, code in the same block below "await" will be executed.
     * 3. Promise returned by the getRandomQuoteViaApi function will be always "fulfilled" because we catch all possible errors.
     * 4.Result of the "fullfilled" promise will be either Quote or undefined.
     * 5. Therefore there is no need for try/catch block where we call this function
     */

    static async getRandomQuoteViaAPI() {
        const url = 'https://api.quotable.io/random';
        const options = { headers: { 'Content-Type': 'application/json' } };
        try {
            const response = await fetch(url, options);
            const { _id: id, content, author } = await response.json();
            // resolves promise to Quote (Promise becomes "fulfilled")
            return new Quote(id, content, author);
        } catch (error) {
            console.error('Error fetching random quote:', error);
            /**
             * 1. Returns undefined implicitly (resolves promise to undefined)
             * 2. Promise becomes "fulfilled" with value undefined
             */
        }
    }
}

export default RandomQuote;

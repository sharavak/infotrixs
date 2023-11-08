This is simple REST API for generating random quotes.

To access this API,

The request endpoints are,
https://quotes-sp6t.onrender.com - Home request

https://quotes-sp6t.onrender.com/api/quotes/random - WIll give random quotes

To post or delete the quotes,generate the API KEY from the below link

https://quotes-sp6t.onrender.com/api/generate

To post the quotes - https://quotes-sp6t.onrender.com/api/quotes
Include the author,quote and apikey in the request body 
Example 
{"author":"Abraham Lincoln",quote:"quote","apikey":"your api key"}

To delete the quote - https://quotes-sp6t.onrender.com/api/quotes
Include the quote and apikey in the request body 
Example 
{quote:"quote","apikey":"your api key"}

To filter the quotes by author. Use query parameters
https://quotes-sp6t.onrender.com/api/quotes/?apikey=<your API KEY>&author="author"

Stay tunes for more updates for this API

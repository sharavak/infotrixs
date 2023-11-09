
# Random quote generator API 

A simple random quote generator api with full pledged CRUD operations.It is an open source.it is a part of my internship in INFOTRIXS

## Features

- Free API KEY
- Open Source


## API Reference

#### Base url:

```https
  GET https://quotes-sp6t.onrender.com/
```
#### To get random quotes:

```https
  GET /api/quotes/random
```


#### To post the quotes, API KEY is required.Use the below link to generate the API KEY

**Expiration time for API KEY is 2 hours.**

```http
  GET /api/quotes/generate
````

#### TO post the quotes, include all  the contents in the body of the request:
```https:
    GET /api/quotes
````
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `apikey`      | `string` | **Required** Your API KEY|
| `author`      | `string` |**Required**
| `quote`      | `string` | **Required**

#### To delete the quote:
```https:
    GET /api/quotes
````
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `apikey`      | `string` | **Required** Your API KEY|
| `quote`      | `string` | **Required**


#### To filter the quotes by the author:
```https:
    GET /api/quotes/?apikey=<YOUR API KEY>&author="author-name"
````

#### Stay tuned for updates.As this is an open souce project,Contributions are welcomed.

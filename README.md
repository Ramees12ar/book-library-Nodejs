# book-library-Nodejs

### node version:  v16.20.2
## Run Locally

Clone the project

```bash
  git clone https://github.com/Ramees12ar/book-library-Nodejs.git
```

Go to the project directory

```bash
  cd book-library-Nodejs
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## API Reference

### Host: ```http://localhost:3005```

#### Insert a Book
API to insert book to db

```http
  POST /api/insert

  # payload pass in body
```

| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. |
| `author` | `string` | **Required**.|
| `summary` | `string` | **Required**.|

#### Update a Book
API to update existing book

```http
  PUT /api/update

  # payload pass in body
```
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. |
| `title` | `string` | **Optional**. |
| `author` | `string` | **Optional**.|
| `summary` | `string` | **Optional**.|

#### Delete a Book
API to delete a book from db

```http
  DELETE /api/:bookId/delete

  # bookId pass in path
```
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bookId` | `string` | **Required**.|

#### Get a Book by Id
API to get a book details by Id

```http
  GET /api/:bookId/details

  # bookId pass in path
```
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bookId` | `string` | **Required**.|

#### Get List of Books 
get list of books with pagination 

```http
  GET /api/lists

  # fields pass in query
```
| Field | Type     | Description| default |
| :-------- | :------- | :------------------------- |--------------|
| `title` | `string` | **Optional**||
| `author` | `string` | **Optional**||
| `summary` | `string` | **Optional**||
| `status` | `string` | **Optional**|active/deleted|
| `limit` | `number` | **Optional**|10|
| `page` | `number` | **Optional**|0|

NB: title, author and summary are filter combinations. if pass any of them or both query will search the documents that including search texts.
status is only allowed active/deleted value. default will be active.



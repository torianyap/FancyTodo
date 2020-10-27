# FancyTodo

**Run**
`npm run dev`

**Create Todo**
----
  Returns JSON data from new todo

* **URL**

  /todos

* **Method:**

  `POST`

* **Data Params**

  `{title: 'study', description: 'learn REST API', due_date: '2020-10-31'}`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{id: 1, title: 'study', description: 'learn REST API', status: false, due_date: '2020-10-31'}`
 
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** `{validation errors}`

    OR

  * **Code:** 500 <br />
    **Content:** `{ error }`

<br />

**Read Todo**
----
  Returns JSON data about all todos

* **URL**

  /todos

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{id: 1, title: 'study', description: 'learn VSCode', status: false, due_date: date}, ...]`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error }`
    
<br />

**Get todo by ID**
----
  Returns JSON data about a single todo

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{id: 1, title: 'study', description: 'learn VSCode', status: false, due_date: '2020-10-31'}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error not found }`

    OR

  * **Code:** 500 <br />
    **Content:** `{ error }`

<br />

**Update todo by ID**
----
  Returns JSON data about updated todo

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`
  
* **Data Params**

  `{title: 'study', description: 'learn REST API', status: false, due_date: '2020-10-31'}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{id: 1, title: 'study', description: 'learn VSCode', status: false, due_date: '2020-10-31'}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error not found }`

    OR

  * **Code:** 500 <br />
    **Content:** `{ error }`  

<br />

**Update todo status by ID**
----
  Returns JSON data about updated todo

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{id: 1, title: 'study', description: 'learn VSCode', status: true, due_date: '2020-10-31'}`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ validation errors }`

    OR

  * **Code:** 404 <br />
    **Content:** `{ error not found }`

    OR

  * **Code:** 500 <br />
    **Content:** `{ error }`  

<br />

**Delete Todo by ID**
----
  Returns message

* **URL**

  /todos/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message: 'todo deleted successfuly'}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error not found }`

    OR

  * **Code:** 500 <br />
    **Content:** `{ error }`  
# FancyTodo

**Create Todo**
----
  Returns JSON data from new todo

* **URL**

  /todos

* **Method:**

  `POST`

* **Data Params**

  {ntar lah}

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{id: 1, title: 'study', description: 'learn VSCode', status: false, due_date: date}`
 
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** `{validation errors}`

    OR

  * **Code:** 500 <br />
    **Content:** `error`

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
    **Content:** `error`
    
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
    **Content:** `{id: 1, title: 'study', description: 'learn VSCode', status: false, due_date: date}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error }`
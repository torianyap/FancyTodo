# FancyTodo

* Web: <br /> 
  https://fancy-to-do-5ee22.web.app/
----
List of available endpoints:
* POST /register
* POST /login
* GET /todos
* POST /todos
* GET /todos/:id
* PUT /todos/:id
* PATCH /todos/:id
* DELETE /todos/:id
* GET /weathes

----
**REGISTER**
----
  Register to the app

* **URL**

  /users/register

* **Method:**

  `POST`

* **Data Params**

  ```javascript
  {
    email: "string",
    password: "string" 
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```javascript
    {
      id: "integer",
      email: "string"
    }
    ```
 
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** 
    ```javascript
    {
      msg: "errors"
    }
    ```

    OR

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
      msg: "internal server error"
    }
    ```
* **Sample Call**
```javascript
    $.ajax({
            method: 'POST',
            url: `${SERVER}/users/register`,
            data: {
                email,
                password
            }
        })
```
----

**LOGIN**
----
  Log into the app

* **URL**

  /users/login

* **Method:**

  `POST`

* **Data Params**

  ```javascript
  {
    email: "string",
    password: "string" 
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      access_token: "string"
    }
    ```
 
* **Error Response:**
  * **Code:** 401 <br />
    **Content:** 
    ```javascript
    {
      msg: "errors"
    }
    ```

    OR

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
      msg: "internal server error"
    }
    ```
* **Sample Call**
```javascript
    $.ajax({
            method: 'POST',
            url: `${SERVER}/users/login`,
            data: {
                email,
                password
            }
        })
```
----

**CREATE TODO**
----
  Returns JSON data from new todo

* **URL**

  /todos

* **Method:**

  `POST`

* **Data Params**
  *  **Data**
      ```javascript
      {
        title: "string",
        description: "string",
        due_date: date
      }
      ```
  * **Headers**
    ```javascript
    access_token = "string"
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```javascript
    {
      id: integer,
      title: "string",
      description: "string",
      status: boolean
      due_date: date
    }
    ```
* **Error Response:**
  * **Code:** 400 <br />
    **Content:**
    ```javascript
    {
      msg: "errors"
    }
    ```

    OR

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
      msg: "internal server error"
    }
    ```

    OR

  * **Code** 401
    **Content:**
    ```javascript
    {
      msg: 'authentication failed'
    }
    ```
    
* **Sample Call**
```javascript
    $.ajax({
            method: 'POST',
            url: `${SERVER}/todos`,
            data: {
                title,
                description,
                due_date
            },
            headers: {
                access_token
            }
        })
```
----

**READ TODO**
----
  Returns JSON data about all todos

* **URL**

  /todos

* **Method:**

  `GET`

* **Data Params**

  * **Headers**
    ```javascript
    access_token = "string"
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
      {
        id: integer,
        title: "string"
        description: "string",
        status: boolean,
        due_date: date
      },
      {
        ..
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      msg: 'errors'
    }
    ```
    OR
    
  * **Code** 401
    **Content:**
    ```javascript
    {
      msg: 'authentication failed'
    }
    ```

* **Sample Call**
```javascript
    $.ajax({
            method: 'GET',
            url: `${SERVER}/todos`,
            headers: {
                access_token: access_token
            }
        })
```
----

**GET A SINGLE TODO**
----
  Returns JSON data about a single todo

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
   ```
   id = integer
   ```

* **Data Params**

  * **Headers**
    ```javascript
    access_token = "string"
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      id: integer,
      title: "string",
      description: "string",
      status: boolean
      due_date: date
    }
    ```

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    {
      msg: "todo with id ... is not found"
    }
    ```

    OR

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
      msg: 'internal server error'
    }
    ```

    OR
    
  * **Code** 401
    **Content:**
    ```javascript
    {
      msg: 'authentication failed'
    }
    ```

----

**EDIT TODO**
----
  Returns JSON data about updated todo

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
    ```
    id=integer
    ```
  
* **Data Params**

  *  **Data**
      ```javascript
      {
        title: "string",
        description: "string",
        due_date: date
      }
      ```
  * **Headers**
    ```javascript
    access_token = "string"
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      ```javascript
      {
        id: integer,
        title: "string",
        description: "string",
        status: boolean,
        due_date: date
      }
      ```

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    {
      msg: "todo with id ... is not found"
    }
    ```

    OR

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
      msg: "internal server error"
    }
    ```  

    OR
    
  * **Code** 401
    **Content:**
    ```javascript
    {
      msg: 'authentication failed'
    }
    ```
* **Sample Call**
```javascript
    $.ajax({
            method: 'PUT',
            url: `${SERVER}/todos/${idTemp}`,
            headers: {
                access_token: access_token
            },
            data: {
                title,
                description,
                due_date
            }
        })
```

----

**FINISH TODO**
----
  Finish a todo

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
   ```
   id=integer
   ```

* **Data Params**

  * **Headers**
    ```javascript
    access_token = "string"
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      id: integer,
      title: "string",
      description: "string",
      status: boolean
      due_date: date
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** 
    ```javascript
    {
      msg: 'authentication failed'
    }
    ```

    OR

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    {
      msg: 'todo is not found'
    }
    ```

    OR

  * **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      msg: 'internal server error'
    }
    ```  
* **Sample Call**
```javascript
    $.ajax({
            method: 'PATCH',
            url: `${SERVER}/todos/${id}`,
            headers: {
                access_token: access_token
            }
        })
```

----

**DELETE TODO**
----
  Returns message

* **URL**

  /todos/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
   ```
   id=integer
   ```

* **Data Params**

  * **Headers**
    ```javascript
    access_token = "string"

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      msg: 'todo deleted successfully'
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:**
    ```javascript
    {
      msg: "todo is not found"
    }
    ```

    OR

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
      msg: "internal server error"
    }
    ```  

    OR
    
  * **Code** 401
    **Content:**
    ```javascript
    {
      msg: 'authentication failed'
    }
    ```

**Sample Call**
```javascript
    $.ajax({
            method: 'DELETE',
            url: `${SERVER}/todos/${id}`,
            headers: {
                access_token: access_token
            }
        })
```
----

**WEATHER**
----
  Returns current weather

* **URL**

  /weathers

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      base: "stations",
      clouds: {
        all: integer
      },
      coord: {
        lon: integer,
        lat: integer
      },
      main: {
        temp: integer,
        feels_like: integer,
        temp_min: integer,
        temp_max: integer,
        humidity: integer,
        pressure: integer
      },
      weather: [
        {
          id: integer,
          main: "string",
          description: "string",
        }
      ],
      name: "string",
      wind: {
        speed: integer,
        deg: integer
      },
      ...
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:**
    ```javascript
    {
      msg: "location is not found"
    }
    ```

    OR

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
      msg: "internal server error"
    }
    ``` 

**Sample Call**
```javascript
    $.ajax({
        method: 'GET',
        url: `${SERVER}/weathers`
    })
```
----
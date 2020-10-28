const SERVER = 'http://localhost:3000'

function beforeLogin() {
    $('#register').hide()
    $('#login').show()
    $('#content').hide()
    $('todos').hide()
    $('#form-addToDo').hide()
    $('#form-updateTodo').hide()
}

function afterLogin() {
    $('#register').hide()
    $('#login').hide()
    $('#content').show()
    $('#form-addToDo').hide()
    $('#form-updateTodo').hide()
    fetchToDos()
}

$(document).ready( _ => {
    const token = localStorage.getItem('access_token')
    if (token) {
        afterLogin()
    } else {
        beforeLogin()
    }
})

//move to login
$('#nav-login').on('click', () => {
    $('#register').hide()
    $('#login').show()
    $('#content').hide()
})

//move to register
$('#nav-register').on('click', () => {
    $('#register').show()
    $('#login').hide()
    $('#content').hide()
})

//register
const register = e => {
    e.preventDefault()
    const email = $('#register-email').val()
    const password = $('#register-pwd').val()

    $.ajax({
        method: 'POST',
        url: `${SERVER}/users/register`,
        data: {
            email,
            password
        }
    })
    .done(response => {
        $('#register').hide()
        $('#login').show()
        $('#todo').hide()
    })
    .fail(err => {
        console.log(err)
    })
}

//login
const login = e => {
    e.preventDefault()

    const email = $('#login-email').val()
    const password = $('#login-pwd').val()

    $.ajax({
        method: 'POST',
        url: `${SERVER}/users/login`,
        data: {
            email, 
            password
        }
    })
    .done(response => {
        $('#register').hide()
        $('#login').hide()
        $('#todo').show()
        const access_token = response.accessToken

        localStorage.setItem('access_token', access_token)
        fetchToDos()
    })
    .fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser) {
    const google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:'POST',
        url: `${SERVER}/users/googleLogin`,
        data: {
            google_access_token
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        afterLogin()
    })
    .fail(err => {
        console.log(err)
    })
}

//logout
$('#nav-logout').on('click', () => {
    beforeLogin()

    localStorage.removeItem('access_token')
    signOut()
})

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    }
)};

//readAll
const fetchToDos = () => {
    const access_token = localStorage.getItem('access_token')
    $('#todos').empty()
    $.ajax({
        method: 'GET',
        url: `${SERVER}/todos`,
        headers : {
            access_token: access_token
        }
    })
    .done(response => {
        console.log(response)
        if (response[0]) {
            response.forEach(el => {
                if(el.status === false) {
                    $('#todos').append(`        
                    <p class="text-right font-weight-bold">${el.title.toUpperCase()}</p>
                    <p class="text-muted">${el.description}</p>
                    <p>${new Date(el.due_date)}</p>
                    Finish <input type="checkbox" onclick="finishToDo(${el.id})">
                    <p class="text-warning btn-link text-left" id="form-update" onclick="updateToDoForm(${el.id})">Update</p>
                    <p class="text-danger btn-link text-right" onclick="deleteToDo(${el.id})">Delete</p>
                    <hr/>
                    `)
                } else {
                    $('#todos').append(`        
                    <p class="text-right font-weight-bold">${el.title.toUpperCase()}</p>
                    <p class="text-muted">${el.description}</p>
                    <p>${new Date(el.due_date)}</p>
                    Finish <input type="checkbox" checked>
                    <p class="text-danger btn-link text-right" onclick="deleteToDo(${el.id})">Delete</p>
                    <hr/>
                    `)
                }
            })
        } else {
            $('#todos').append(`<h5 class="d-flex justify-content-center">There's nothing here</h5> <h5 class="d-flex justify-content-center">Start adding some task</h5>`)
        }
    })
    .fail(err => {
        console.log(err)
    })
}

//addTodo
const addTodo = () => {
    const access_token = localStorage.getItem('access_token')
    const title = $('#title').val()
    const description = $('#description').val()
    const due_date = $('#due_date').val()

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
    .done(response => {
        afterLogin()

    })
    .fail(err => {
        console.log(err)
    })
}

$('#addTodo').on('click', () => {
    $('#form-addToDo').show()
    $('#form-updateTodo').hide()
})

//updateTodo
let goingToBeUpdated;

const updateToDo = id => {
    id = goingToBeUpdated.id
    const access_token = localStorage.getItem('access_token')
    const title = $('#update_title').val()
    const description = $('#update_description').val()
    const due_date = $('#update_due_date').val()

    $.ajax({
        method: 'PUT',
        url: `${SERVER}/todos/${id}`,
        headers: {
            access_token: access_token
        },
        data: {
            title,
            description,
            due_date
        }
    })
    .done(response => {
        afterLogin()
    })
    .fail(err => {
        console.log(err)
    })
}

const updateToDoForm = (id) => {
    const access_token = localStorage.getItem('access_token')

    $.ajax({
        method: 'GET',
        url: `${SERVER}/todos/${id}`,
        headers: {
            access_token
        }
    })
    .done(response => {
        $('#form-updateTodo').append(`
            <form onsubmit="updateToDo()">
            <div class="form-group">
                <label for="update_title">Title</label>
                <input type="text" id="update_title" class="form-control" value="${response.title}">
            </div>
            <div class="form-group">
                <label for="update_description">Description</label>
                <input type="text" id="update_description" class="form-control" value="${response.description}">
            </div>
            <div class="form-group">
                <label for="update_due_date">Due Date</label>
                <input type="date" id="update_due_date" class="form-control" value="${formatDate(response.due_date)}">
                <i>due date must be greater than today</i>
            </div>
            <button type="submit" class="btn btn-success">Update Task</button>
        </form>
        `)
    })

    $('#form-updateTodo').show()
    $('#form-addToDo').hide()
    .fail(err => {
        console.log(err)
    })
}

//finishTodo
const finishToDo = id => {
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: 'PATCH',
        url: `${SERVER}/todos/${id}`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => {
        afterLogin()
    })
    .fail(err => {
        console.log(err)
    })
}

//deleteToDo
const deleteToDo = id => {
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: 'DELETE',
        url: `${SERVER}/todos/${id}`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => {
        afterLogin()
    })
    .fail(err => {
        console.log(err)
    })
}
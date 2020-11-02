const SERVER = 'https://fancy-todo-tori.herokuapp.com'

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

function beforeLogin() {
    $('#register').hide()
    $('#nav-login').show()
    $('#nav-register').show()
    $('#nav-name').hide()
    $('#nav-logout').hide()
    $('#login').show()
    $('#content').hide()
    $('todos').hide()
    $('#form-addToDo').hide()
    $('#weather').hide()
    $('#form-updateTodo').hide()
}

function afterLogin() {
    $('#register').hide()
    $('#login').hide()
    $('#content').show()
    $('#todos').show()
    $('#nav-login').hide()
    $('#nav-name').empty()
    $('#nav-name').append(`<a class="navbar-brand">${localStorage.getItem('name')}</a>`)
    $('#nav-name').show()
    $('#nav-register').hide()
    $('#nav-logout').show()
    $('#form-addToDo').hide()
    $('#form-updateTodo').hide()
    $('#weather').show()
    $('#weather').empty()
    fetchToDos()
    weather()
}

$(document).ready(_ => {
    const token = localStorage.getItem('access_token')
    if (token) {
        afterLogin()
    } else {
        beforeLogin()
    }
})

$('#nav-name').on('click', () => {
    afterLogin()
})
$('.back-btn').on('click', () => {
    afterLogin()
}) 

//move to login
$('#nav-login').on('click', () => {
    $('#register').hide()
    $('#login').show()
    $('#content').hide()
})

$('#login-sc').on('click', () => {
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

$('#register-sc').on('click', () => {
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

            Swal.fire({
                icon: 'success',
                title: 'Sucess',
                text: 'Your account has been registered'
            })
        })
        .fail(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
        .always(() => {
            $('#register-pwd').val("")
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
            $('#nav-name').empty()
            localStorage.setItem('name', email.substring(0, email.indexOf('@')))
            const access_token = response.accessToken
            localStorage.setItem('access_token', access_token)
            afterLogin()

            Toast.fire({
                icon: 'success',
                title: 'Logged in successfully'
            })
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
        .always(() => {
            $('#login-pwd').val("")
        })
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const name = profile.getName()
    const google_access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
            method: 'POST',
            url: `${SERVER}/users/googleLogin`,
            data: {
                google_access_token
            }
        })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('name',name)
            $('#nav-name').empty()
            afterLogin()

            Toast.fire({
                icon: 'success',
                title: 'Logged in successfully'
            })

        })
        .fail(err => {
            console.log(err)
        })
}

//logout
$('#nav-logout').on('click', () => {
    Swal.fire({
        title: `Logout`,
        text: `You're going to be logged out`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      })
      .then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'info',
                title: 'Successfully logged out'
            })
            beforeLogin()
            localStorage.clear()
            signOut()

        } else {
            Toast.fire({
                icon: 'info',
                title: 'cancelled'
            })
            afterLogin()
        }
    })

})

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    })
};

//Weather
const weather = () => {
    $('#weather').empty()
    $.ajax({
        method: 'GET',
        url: `${SERVER}/weathers`
    })
    .done(response => {
        console.log(response)
        $('#weather').append(`
        <h5>Current Weather</h5>
        <p><strong>Place</strong>
        <br /><span id="weather-place">${response.name}</span></p>

        <p><strong>Description</strong>
        <br /><span id="weather-description">${response.weather[0].main}</span>
        <img src="${source(response.weather[0].main)}" width="30px" height="30px" id="weather-icon" alt="weather-icon"></p>

        <p><strong>Temperature</strong>
        <br />Temperature: <span id="weather-temp">${response.main.temp.toFixed(1)}°C</span>
        <br />Feels Like: <span id="feels">${response.main.feels_like.toFixed(1)}°C</span></p>

        <p><strong>Humidity</strong>
        <br /><span id="weather-humid">${response.main.humidity}%</span></p>
        `)
    })
    .fail(err => {
        Toast.fire({
            icon: 'warning',
            title: `i can't find your location`
        })
        $('#weather').hide()
    })
}

//fetchTodos
const fetchToDos = () => {
    const access_token = localStorage.getItem('access_token')
    $('#todos').empty()
    $.ajax({
            method: 'GET',
            url: `${SERVER}/todos`,
            headers: {
                access_token: access_token
            }
        })
        .done(response => {
            if (response[0]) {
                response.forEach(el => {
                    if (el.status === false) {
                        $('#todos').append(`
                            <div class="col my-2 p-3 card shadow-lg" style="background-color: white; margin-top: 50px; width: 18rem;">
                                <div class="card-body">
                                    <h5 class="card-title text-center"><strong>${el.title}</strong></h5>
                                    <h6 class="card-subtitle">
                                        ${el.description} <br> <br>
                                        <span>Due at: ${formatDate(el.due_date)}</span>
                                    </h6>
                                    <hr />
                                    <p class="card-text">
                                        Finish Task <input type="checkbox" onclick="finishToDo(${el.id})"> <br>
                                        <a class="card-link btn-outline-warning" href="#" onclick="updateToDoForm(${el.id}, '${el.title}', '${el.description}', '${el.due_date}')">Update Task</a>
                                        <a class="card-link btn-outline-danger" href="#" onclick="deleteToDo(${el.id})">Delete Task </a>
                                    </p>
                                </div>
                            </div>`)
                    } else {
                        $('#todos').append(`
                            <div class="col my-2 p-3 card" style="background-color: lightgrey; margin-top: 50px; width: 18rem;">
                                <div class="card-body text-dark text-muted">
                                    <h5 class="card-title text-center"><strong><strike>${el.title}</strike></strong></h5>
                                    <h6 class="card-subtitle">
                                        ${el.description} <br> <br>
                                        <span>Due at: ${formatDate(el.due_date)}</span>
                                    </h6>
                                    <hr />
                                    <p class="card-text">
                                        Task Finished <input type="checkbox" checked disabled> <br>
                                        <a class="card-link btn-outline-danger" href="#" onclick="deleteToDo(${el.id})">Delete Task </a>
                                    </p>
                                </div>
                            </div>`)
                    }
                })
            } else {
                $('#todos').append(`
                <h5 class="text-left">There's nothing here <br>Start adding some task</h5>`)
            }
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: err.responseJSON.msg
            })
        })
}

//addTodo
const addTodo = () => {
    const access_token = localStorage.getItem('access_token')
    const title = $('#add_title').val()
    const description = $('#add_description').val()
    const due_date = $('#add_due_date').val()

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
            Toast.fire({
                icon: 'success',
                title: 'ToDo added successfully'
            })

        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
        .always(() => {
            $('#add_title').val("")
            $('#add_description').val("")
            $('#add_due_date').val("")
        })
}

$('#addTodo').on('click', () => {
    $('#todos').hide()
    $('#form-addToDo').show()
    $('#form-updateTodo').hide()
})

//updateTodo
let idTemp;

const updateToDo = _ => {
    const access_token = localStorage.getItem('access_token')
    const title = $('#edit_title').val()
    const description = $('#edit_description').val()
    const due_date = $('#edit_due_date').val()

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
        .done(response => {
            afterLogin()
            Toast.fire({
                icon: 'success',
                title: `${response.title} has been updated`
            })
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
}

const updateToDoForm = (id, title, description, due_date) => {
    afterLogin()
    $('#form-updateTodo').show()
    $('#edit_title').val(title)
    $('#edit_description').val(description)
    $('#edit_due_date').val(formatDate(due_date))
    idTemp = id

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
            Toast.fire({
                icon: 'success',
                title: `you have finished todo ${response.title}`
            })
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.responseJSON.msg
            })
        })
}

//deleteToDo
const deleteToDo = id => {
    const access_token = localStorage.getItem('access_token')

    Swal.fire({
        title: `Delete  Task`,
        text: `You're going to delete this task`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      })
      .then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: 'DELETE',
                url: `${SERVER}/todos/${id}`,
                headers: {
                    access_token: access_token
                }
            })
            .done(response => {
                afterLogin()
                Toast.fire({
                    icon: 'success',
                    title: 'todo successfully deleted'
                })
            })
            .fail(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.responseJSON.msg
                })
            })

        } else {
            Toast.fire({
                icon: 'info',
                title: 'cancelled'
            })
            afterLogin()
        }
    })
}
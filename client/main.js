const baseURL = 'http://localhost:3000';

$('document').ready(function () {
    view();

    $('#link-home').on('click', function (e) {
        e.preventDefault();
        view();
    });

    $('#link-login-reg').on('click', function (e) {
        e.preventDefault();
        $('#form-login').show();
        $('#form-register').hide();
        $('#navBar').hide();
        $('#home-page').hide();
    });

    $('#link-register-reg').on('click', function (e) {
        e.preventDefault();
        $('#form-login').hide();
        $('#form-register').show();
        $('#navBar').hide();
        $('#home-page').hide();
    });

    $('#login-btn').on('click', function (e) {
        e.preventDefault();
        login();
    });

    $('#register-btn').on('click', function (e) {
        e.preventDefault();
        register();
    });

    $('#link-logout').on('click', function (e) {
        e.preventDefault();
        logout();
    });

    $('#link-addTodo').on('click', function (e) {
        e.preventDefault();
        Swal.fire({
            title: 'redi to add ?!',
            text: 'the form is at the bottom',
            icon: 'success',
            button: 'Aww yiss!',
        });
        $('#addTodoForm').show();
    });

    $('#cancelAddTodo-btn').on('click', function (e) {
        e.preventDefault();
        $('#addTodoForm').hide();
    });

    $('#addTodo-btn').on('click', function (e) {
        e.preventDefault();
        addTodo();
    });

    $('#editTodo-btn').on('click', function (e) {
        e.preventDefault();
        putTodo();
    });

    $('#cancelEditTodo-btn').on('click', function (e) {
        e.preventDefault();
        $('#editTodoForm').hide();
    });
});

function view() {
    if (localStorage.access_token) {
        $('#form-login').hide();
        $('#form-register').hide();
        $('#navBar').show();
        $('#example-todo').show();
        $('#todoPage').show();
        $('#addTodoForm').hide();
        $('#editTodoForm').hide();
        weatherApi();
        fetchTodos();
        quotesApi();
    } else {
        $('#form-login').show();
        $('#form-register').hide();
        $('#navBar').hide();
        $('#example-todo').hide();
        $('#todoPage').hide();
        $('#addTodoForm').hide();
        $('#editTodoForm').hide();
        $('#weather-page').hide();
        $('#qoutes-page').hide();
        $('#home-page').hide();
    }
}

function login() {
    const email = $('#email').val();
    const password = $('#password').val();
    $.ajax({
        url: baseURL + '/login',
        method: 'POST',
        data: {
            email: email,
            password: password,
        },
    })
        .done((response) => {
            console.log(response);
            Swal.fire({
                title: 'Appruf!',
                text: 'les go tu ur tuduLis!',
                icon: 'success',
                width: 600,
                padding: '3em',
                backdrop: `
                            rgba(0,0,123,0.4)
                            left top
                            no-repeat
                        `,
            });
            localStorage.setItem('access_token', response.access_token); // param 1 itu utk nama local storagenya, param 2 itu data token yang didapet dari generate token di login
            fetchTodos();
            view();
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `you did something wrong there`,
            });
        })
        .always(() => {
            // selalu dilakukan, sehingga email dan password setelah digunakan selalu di ubah value menjadi empty string
            $('#email').val('');
            $('#password').val('');
        });
}

function register() {
    const email = $('#email-reg').val();
    const password = $('#password-reg').val();
    console.log(email, password);
    $.ajax({
        url: baseURL + '/register',
        method: 'POST',
        data: {
            email,
            password,
        },
    })
        .done((response) => {
            Swal.fire({
                title: 'Appruf!',
                text: 'u ken login wid ur nu akon!',
                icon: 'success',
                button: 'Aww yiss!',
            });
            view();
        })
        .fail((xhr, test) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `u did something wrong there`,
            });
        })
        .always(() => {
            // selalu dilakukan, sehingga email dan password setelah digunakan selalu di ubah value menjadi empty string
            $('#email').val('');
            $('#password').val('');
        });
}

function createTodo() {
    const title = $('#add-title').val();
    const description = $('#add-description').val();
    const status = $('#add-status').val();
    const due_date = $('#add-due_date').val();
    $.ajax({
        url: baseURL + '/todos',
        method: 'POST',
        headers: { access_token: localStorage.access_token },
        data: {
            title: title,
            description: description,
            status: status,
            due_date: due_date,
        },
    })
        .done((response) => {
            view();
        })
        .fail((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        })
        .always(() => {
            $('#add-title').val('');
            $('#add-description').val('');
            $('#add-status').val('');
            $('#add-due_date').val('');
        });
}

function logout() {
    localStorage.removeItem('access_token');
    view();
    signOut();
    Swal.fire({
        title: 'u hav bin logot!',
        text: 'tenk u por using dis ap',
        icon: 'success',
        button: 'Aww yiss!',
    });
}

function fetchTodos() {
    $('#todoList').empty();
    $.ajax({
        url: baseURL + '/todos',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token,
        },
    })
        .done((response) => {
            console.log(response);
            const allTodo = response.todo; // ini di dapet dari findAll di controller

            allTodo.forEach((el) => {
                el.due_date = new Date(el.due_date).toLocaleString();
                $('#todoList').append(
                    `
                            <tr>
                                <td>${el.title}</td>
                                <td>${el.description}</td>
                                <td>${el.status}</td>
                                <td>${el.due_date}</td>
                                <td>
                                <a id="delete-todo" class="navbar-item" onclick="deleteTodo(
                                    ${el.id}
                                )" style="border-color: rgb(187, 233, 195);">
                                <i class="fas fa-trash"></i>
                                </a>
                                
                                <a id="edit-todo" class="navbar-item" onclick="getTodo(${el.id})" style="border-color: rgb(187, 233, 195);">
                                <i class="fas fa-edit"></i>
                                </a>
                                </td>
                            </tr>
                            `
                );
            });
        })
        .fail((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        });
}

function deleteTodo(id) {
    // ditaro di on click button pas di script yang ada di fetch booknya (button di website )
    $.ajax({
        url: baseURL + '/todos/' + id,
        method: 'DELETE',
        headers: {
            access_token: localStorage.access_token,
        },
    })
        .done(() => {
            fetchTodos();
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        });
}

function addTodo() {
    const title = $('#add-title').val();
    const description = $('#add-description').val();
    const status = $('#add-status').val();
    const due_date = $('#add-due_date').val();

    $.ajax({
        url: baseURL + '/todos',
        method: 'POST',
        headers: {
            access_token: localStorage.access_token,
        },
        data: {
            title,
            description,
            status,
            due_date,
        },
    })
        .done(() => {
            fetchTodos();
        })
        .fail((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        })
        .always(() => {
            $('#add-title').val('');
            $('#add-description').val('');
            $('#add-status').val('');
            $('#add-due_date').val('');
        });
}

function getTodo(id) {
    $.ajax({
        url: baseURL + '/todos/' + id,
        method: 'GET',
        headers: {
            access_token: localStorage.access_token,
        },
    })
        .done((response) => {
            console.log(response);
            Swal.fire({
                title: 'redi to edit ?!',
                text: 'the form is at the bottom',
                icon: 'success',
                button: 'Aww yiss!',
            });
            localStorage.setItem('theId', id);
            localStorage.setItem('theData', response); // untuk olah data di valuenya
            $('#editTodoForm').show();
        })
        .fail((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        })
        .always(() => {});
}
function putTodo() {
    const title = $('#edit-title').val();
    const description = $('#edit-description').val();
    const status = $('#edit-status').val();
    const due_date = $('#edit-due_date').val();
    const id = localStorage.getItem('theId');

    $.ajax({
        url: baseURL + '/todos/' + id,
        method: 'PUT',
        headers: {
            access_token: localStorage.access_token,
        },
        data: {
            title,
            description,
            status,
            due_date,
        },
    })
        .done((response) => {
            Swal.fire({
                title: 'saksess !',
                text: 'de data hes bin cenged',
                icon: 'success',
                button: 'Aww yiss!',
            });
            localStorage.removeItem('theId');
            localStorage.removeItem('theData');
            view();
        })
        .fail((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong, pls try again to edit and click the edit button again',
            });
        })
        .always(() => {
            $('#add-title').val('');
            $('#add-description').val('');
            $('#add-status').val('');
            $('#add-due_date').val('');
        });
}

// ------------------------------------------------------------- Weather -----------------------------------------------------//

function weatherApi() {
    $.ajax({
        method: 'GET',
        url: baseURL + '/weather',
        headers: {
            access_token: localStorage.access_token,
        },
    })

        .done((data) => {
            $('#weather-page').empty();
            $('#weather-page').append(
                `
                <div class="m-0" style="display: flex; justify-content: center; ">
                      <div class="d-flex">
                          <h6 class="flex-grow-1">${data.name}</h6>
                          <h6>${new Date().getHours()}:${
                    new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
                }</h6>

                          <h1> ${data.main.temp} ℃ </h1> <span class="small grey">${data.weather[0].main}</span>

                          <div class="temp-details flex-grow-1">
                              <p class="my-1"> <img src="https://i.imgur.com/B9kqOzp.png" style="height:45px;"> <span> ${
                                  data.wind.speed
                              } mp/h </span> </p>
                              <p class="my-1"><span> ${data.main.humidity}% humidity </span> </p>
                              <p class="my-1"> <span> Feels like ${data.main.feels_like} ℃</span> </p>
                          </div>

                          <div> <img src="http://openweathermap.org/img/w/${
                              data.weather[0].icon
                          }.png" alt="wheater-logo" width="100px"> </div>
                          </div>
      `
            );
        })
        .fail((err) => {
            console.log(err);
        });
}

// ------------------------------------------------------------- Weather -----------------------------------------------------//

// ------------------------------------------------------------- quotes -----------------------------------------------------//

function quotesApi() {
    $.ajax({
        method: 'GET',
        url: baseURL + '/quotes',
        headers: {
            access_token: localStorage.access_token,
        },
    })

        .done((data) => {
            $('#quotes-page').empty();
            $('#quotes-page').append(
                `
                <p> ur deili dos op <strong> gudnes : </strong> </p>
                <div>${data[0].content.rendered}</div>
      `
            );
        })
        .fail((err) => {
            console.log(err);
        });
}

// ------------------------------------------------------------- quotes -----------------------------------------------------//

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: baseURL + '/oAuth',
        data: {
            google_token: id_token,
        },
    })
        .done((response) => {
            localStorage.setItem('access_token', response.access_token);
            view();
        })
        .fail((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong with the Google Sign in!',
            });
        });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

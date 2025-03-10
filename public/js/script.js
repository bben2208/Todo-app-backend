console.log("script.js is connected!");

var userModalElement;

function makeModal(title, button_value, callback) {
    let html = `
    <div class="modal" tabindex="-1" id="userModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="userform">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label>Name</label>
                            <input type="text" name="name" id="name" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Email</label>
                            <input type="email" name="email" id="email" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Age</label>
                            <input type="number" name="age" id="age" class="form-control" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input type="hidden" name="user_id" id="user_id" />
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="${callback}()">${button_value}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;

    document.querySelector('#modalArea').innerHTML = html;
    userModalElement = new bootstrap.Modal(document.getElementById('userModal'));
    userModalElement.show();
}

function insertData() {
    let formElement = document.getElementById('userform');
    const formData = new FormData(formElement);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('/users', {
        method: 'POST',
        body: JSON.stringify(jsonData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        userModalElement.hide();
        getData();
    });
}

function getData() {
    fetch('/users')
    .then(response => response.json())
    .then(data => {
        let html = '';
        if (data.length > 0) {
            data.map((row) => {
                html += `
                <tr>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.age}</td>
                    <td>
                        <button type="button" class="btn btn-warning btn-sm" onclick="fetchSingleData('${row._id}')">Edit</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteData('${row._id}')">Delete</button>
                    </td>
                </tr>
                `;
            });
        } else {
            html = '<tr><td colspan="4" class="text-center">No Data Found</td></tr>';
        }
        document.getElementById('dataArea').innerHTML = html;
    });
}

function fetchSingleData(id) {
    fetch(`/users/${id}`)
    .then(response => response.json())
    .then(data => {
        makeModal('Edit User', 'Edit', 'editData');
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('age').value = data.age;
        document.getElementById('user_id').value = data._id;
    });
}

function editData() {
    let formElement = document.getElementById('userform');
    const formData = new FormData(formElement);
    let jsonData = {};
    formData.forEach((value, key) => { jsonData[key] = value; });

    const userId = document.getElementById('user_id').value;
    fetch(`/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(jsonData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        userModalElement.hide();
        getData();
    });
}

function deleteData(id) {
    if (confirm("Are you sure you want to delete this?")) {
        fetch(`/users/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => { getData(); });
    }
}

// Load data on page load
getData();

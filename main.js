// Utility function to generate a unique ID
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

//////////////////////////////////
// Create - Save User Details Function
const DB_NAME = 'user_db';

// Getting user details from form inputs
function saveUserDetails() {
  const username = document.querySelector('#username').value;
  const fullName = document.querySelector('#full-name').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  const address = document.querySelector('#address').value;
  const zipCode = document.querySelector('#zip-code').value;
  const phoneNumber = document.querySelector('#phone-number').value;
  const gender = document.querySelector('#gender').value;

  // Creating an object for the user
  const userDetails = {
    id: uuid(), // Generate a unique ID
    username: username,
    fullName: fullName,
    password: password,
    email: email,
    address: address,
    zipCode: zipCode,
    phoneNumber: phoneNumber,
    gender: gender,
    created_at: Date.now(),
  };

  // Retrieving the user details from local storage or initializing an empty array
  const user_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];

  // Adding the new user details to the array
  const new_user_db = [...user_db, userDetails];

  // Storing the updated user details array back in local storage
  localStorage.setItem(DB_NAME, JSON.stringify(new_user_db));

  fetchUserDetails();

  document.querySelector('#user-details-form').reset();
}

////////////////////////
// Read Function
function fetchUserDetails() {
  const userDetailsContainer = document.querySelector(
    '#user-details-container'
  );
  // Getting user details from local storage
  const user_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
  const noUser = user_db.length === 0;
  if (noUser) {
    userDetailsContainer.innerHTML = `<p class="text-center text-slate-500">No user details found, Enter your Details</p>`;
    return;
  }

  const users = user_db
    .sort((a, b) =>
      a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
    )
    .map((user) => {
      return `<div class="border rounded-lg p-3 my-2">
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Full Name:</strong> ${user.fullName}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Address:</strong> ${user.address}</p>
    <p><strong>Zip Code:</strong> ${user.zipCode}</p>
    <p><strong>Phone Number:</strong> ${user.phoneNumber}</p>
    <p><strong>Gender:</strong> ${user.gender}</p>
    <button onclick="editUser('${user.id}')" class="bg-blue-500 text-white px-3 py-1 rounded-md mt-2">Edit</button>
    <button onclick="deleteUser('${user.id}')" class="bg-red-500 text-white px-3 py-1 rounded-md mt-2">Delete</button>
  </div>`;
    });
  userDetailsContainer.innerHTML = users.join('');
}

// ///////////////////////////////////
// Update/Edit Function
function editUser(id) {
  const user_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
  const userToEdit = user_db.find((user) => user.id === id);

  if (!userToEdit) {
    return;
  }

  // Populating the form with the user details for editing
  document.querySelector('#username').value = userToEdit.username;
  document.querySelector('#full-name').value = userToEdit.fullName;
  document.querySelector('#password').value = userToEdit.password;
  document.querySelector('#email').value = userToEdit.email;
  document.querySelector('#address').value = userToEdit.address;
  document.querySelector('#zip-code').value = userToEdit.zipCode;
  document.querySelector('#phone-number').value = userToEdit.phoneNumber;
  document.querySelector('#gender').value = userToEdit.gender;

  //To hide and update btn
  const updateUserBtn = document.querySelector('#Update_Users_btn');
  updateUserBtn.classList.remove('hidden');
  updateUserBtn.setAttribute('user_id_to_update', id);
}

// Update/Edit Function to Save Updated User Details

function updateUser() {
  const user_id_to_update = document
    .querySelector('#Update_Users_btn')
    .getAttribute('user_id_to_update');
  // Get the user details from the form inputs
  const username = document.querySelector('#username').value;
  const fullName = document.querySelector('#full-name').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  const address = document.querySelector('#address').value;
  const zipCode = document.querySelector('#zip-code').value;
  const phoneNumber = document.querySelector('#phone-number').value;
  const gender = document.querySelector('#gender').value;

  // Retrieving the user details from local storage or initialize an empty array
  const user_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
  // Updating the specific user's details in the array
  const updated_user_db = user_db.map((user) => {
    if (user.id === user_id_to_update) {
      return {
        ...user,
        username: username,
        fullName: fullName,
        password: password,
        email: email,
        address: address,
        zipCode: zipCode,
        phoneNumber: phoneNumber,
        gender: gender,
      };
    } else {
      return user;
    }
  });

  localStorage.setItem(DB_NAME, JSON.stringify(updated_user_db));

  fetchUserDetails();

  document.querySelector('#user-details-form').reset();

  const updateUserBtn = document.querySelector('#Update_Users_btn');
  updateUserBtn.classList.add('hidden');
}

// ///////////////////
// Delete Function to Delete a User
function deleteUser(id) {
  Swal.fire({
    title: 'Delete Form',
    text: 'Are you sure you want to delete this Form Details?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    //to confirm the cancel btn
  }).then((result) => {
    if (result.isConfirmed) {
      const user_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
      // Filter out the user to be deleted
      const new_user_db = user_db.filter((user) => user.id !== id);
      // Saving the updated user details in local storage
      localStorage.setItem(DB_NAME, JSON.stringify(new_user_db));
      // Fetching and display the updated user details
      fetchUserDetails();
    }
  });
}
// Call the fetchUserDetails
fetchUserDetails();

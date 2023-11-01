// Utility function to generate a unique ID
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Read - Fetch User Details Function
const fetchUserDetails = () => {
  // Use your container element where the user details will be displayed
  const userDetailsContainer = document.querySelector(
    '#user-details-container'
  );
  // Get user details from local storage or API (in this example, we'll consider local storage)
  const user_db = JSON.parse(localStorage.getItem('user_db')) || [];

  // Check if there are no user details available
  if (user_db.length === 0) {
    userDetailsContainer.innerHTML = `<p class="text-center text-slate-500">No user details found.</p>`;
    return;
  }

  // Display user details
  userDetailsContainer.innerHTML = user_db
    .map(
      (user) =>
        `<div class="border rounded-lg p-3 my-2">
              <p><strong>Username:</strong> ${user.username}</p>
              <p><strong>Full Name:</strong> ${user.fullName}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Address:</strong> ${user.address}</p>
              <p><strong>Zip Code:</strong> ${user.zipCode}</p>
              <p><strong>Phone Number:</strong> ${user.phoneNumber}</p>
              <p><strong>Gender:</strong> ${user.gender}</p>
              <button onclick="editUser('${user.id}')" class="bg-blue-500 text-white px-3 py-1 rounded-md mt-2">Edit</button>
              <button onclick="deleteUser('${user.id}')" class="bg-red-500 text-white px-3 py-1 rounded-md mt-2">Delete</button>
            </div>`
    )
    .join('');
};

// Create - Save User Details Function
const saveUserDetails = () => {
  // Get user details from form inputs
  const username = document.querySelector('#username').value;
  const fullName = document.querySelector('#full-name').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  const address = document.querySelector('#address').value;
  const zipCode = document.querySelector('#zip-code').value;
  const phoneNumber = document.querySelector('#phone-number').value;
  const gender = document.querySelector('#gender').value;

  // Create an object for the user
  const userDetails = {
    id: uuid(), // Generate a unique ID
    username,
    fullName,
    password,
    email,
    address,
    zipCode,
    phoneNumber,
    gender,
  };

  // Retrieve the user details from local storage or initialize an empty array
  const user_db = JSON.parse(localStorage.getItem('user_db')) || [];

  // Add the new user details to the array
  user_db.push(userDetails);

  // Store the updated user details array back in local storage
  localStorage.setItem('user_db', JSON.stringify(user_db));

  // Fetch and display the updated user details
  fetchUserDetails();

  // Clear the form fields after submission
  document.querySelector('#username').value = '';
  document.querySelector('#full-name').value = '';
  document.querySelector('#password').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#address').value = '';
  document.querySelector('#zip-code').value = '';
  document.querySelector('#phone-number').value = '';
  document.querySelector('#gender').value = '';
};

// Update/Edit - Function to Populate Form with User Details for Editing
const editUser = (id) => {
  const user_db = JSON.parse(localStorage.getItem('user_db')) || [];
  const userToEdit = user_db.find((user) => user.id === id);

  // Populate the form with the user details for editing
  document.querySelector('#username').value = userToEdit.username;
  document.querySelector('#full-name').value = userToEdit.fullName;
  document.querySelector('#password').value = userToEdit.password;
  document.querySelector('#email').value = userToEdit.email;
  document.querySelector('#address').value = userToEdit.address;
  document.querySelector('#zip-code').value = userToEdit.zipCode;
  document.querySelector('#phone-number').value = userToEdit.phoneNumber;
  document.querySelector('#gender').value = userToEdit.gender;

  // You can add UI changes here if necessary, e.g., show/hide buttons for update/create
};

// Update/Edit - Function to Save Updated User Details
const updateUser = () => {
  // Get the user details from the form inputs
  const id = document.querySelector('#username').value; // Assuming username is used as the unique identifier
  const username = document.querySelector('#username').value;
  const fullName = document.querySelector('#full-name').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  const address = document.querySelector('#address').value;
  const zipCode = document.querySelector('#zip-code').value;
  const phoneNumber = document.querySelector('#phone-number').value;
  const gender = document.querySelector('#gender').value;

  // Retrieve the user details from local storage or initialize an empty array
  let user_db = JSON.parse(localStorage.getItem('user_db')) || [];

  // Update the specific user's details in the array
  user_db = user_db.map((user) => {
    if (user.id === id) {
      return {
        id,
        username,
        fullName,
        password,
        email,
        address,
        zipCode,
        phoneNumber,
        gender,
      };
    }
    return user;
  });

  // Save the updated user details in local storage
  localStorage.setItem('user_db', JSON.stringify(user_db));

  // Fetch and display the updated user details
  fetchUserDetails();

  // Clear the form fields after updating
  document.querySelector('#username').value = '';
  document.querySelector('#full-name').value = '';
  document.querySelector('#password').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#address').value = '';
  document.querySelector('#zip-code').value = '';
  document.querySelector('#phone-number').value = '';
  document.querySelector('#gender').value = '';
};

// Delete - Function to Delete a User
const deleteUser = (id) => {
  // Use a confirmation library or a built-in JavaScript confirmation box for better user experience
  const confirmDelete = confirm('Are you sure you want to delete this user?');

  if (confirmDelete) {
    let user_db = JSON.parse(localStorage.getItem('user_db')) || [];

    // Filter out the user to be deleted
    user_db = user_db.filter((user) => user.id !== id);

    // Save the updated user details in local storage
    localStorage.setItem('user_db', JSON.stringify(user_db));

    // Fetch and display the updated user details
    fetchUserDetails();
  }
};

// Call the fetchUserDetails function to display any existing user details on page load
fetchUserDetails();

const database = require('./js/database');

window.onload = function() {

  // Populate the table
  populateTable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var roadaddress = document.getElementById('roadaddress');
    var city = document.getElementById('city');
    var phone = document.getElementById('phone');
    var email = document.getElementById('email');    
    // Save the person in the database
    database.addPerson(firstname.value, lastname.value, roadaddress.value, city.value, phone.value, email.value);

    // Reset the input fields
    firstname.value = '';
    lastname.value = '';
    roadaddress.value = '';
    city.value = '';
    phone.value = '';
    email.value = '';

    // Repopulate the table
    populateTable();
  });
  document.getElementById('cancel').addEventListener('click', () => {
    firstname.value = '';
    lastname.value = '';
    roadaddress.value = '';
    city.value = '';
    phone.value = '';
    email.value = '';
    // remove class for js scope  missing
    var el = document.getElementById("noDirty");
    el.classList.remove("is-dirty");
  });
}

// Populates the persons table
function populateTable() {

  // Retrieve the persons
  database.getPersons(function(persons) {

    // Generate the table body
    var tableBody = '';
    for (i = 0; i < persons.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + persons[i].firstname + '</td>';
      tableBody += '  <td class="mdl-odd">' + persons[i].lastname + '</td>';
      tableBody += '  <td>' + persons[i].roadaddress + '</td>';
      tableBody += '  <td class="mdl-odd">' + persons[i].city + '</td>';
      tableBody += '  <td>' + persons[i].phone + '</td>';
      tableBody += '  <td class="mdl-odd">' + persons[i].email + '</td>';
      tableBody += '  <td><input type="button" value="Delete" onclick="deletePerson(\'' + persons[i]._id + '\')"></td>'
      tableBody += '</tr>';
    }

    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
  });
}

// Deletes a person
function deletePerson(id) {

  // Delete the person from the database
  database.deletePerson(id);

  // Repopulate the table
  populateTable();
}

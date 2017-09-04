const database = require('./js/database');
const {shell} = require('electron')

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
   // clear the form fields
  document.getElementById('cancel').addEventListener('click', () => {
    firstname.value = '';
    lastname.value = '';
    roadaddress.value = '';
    city.value = '';
    phone.value = '';
    email.value = '';
    // remove class after used
    var el = document.getElementById('noDirty');
    if (el.classList.contains('is-dirty')){
        el.classList.remove('is-dirty');
    }
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
      tableBody += '  <td class="mdl-data-table__cell--non-numeric">' + persons[i].firstname + '</td>';
      tableBody += '  <td class="mdl-data-table__cell--non-numeric">' + persons[i].lastname + '</td>';
      tableBody += '  <td class="mdl-data-table__cell--non-numeric">' + persons[i].roadaddress + '</td>';
      tableBody += '  <td class="mdl-data-table__cell--non-numeric">' + persons[i].city + '</td>';
      if (persons[i].roadaddress || persons[i].city !="" ){
      tableBody += '  <td class="mdl-data-table__cell--non-numeric"><button" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="shell.openExternal(\'https://www.google.it/maps/search/' + persons[i].roadaddress + '+' + persons[i].city + '\')"><i class="material-icons">map</i></button></td>';      
      } else {
      tableBody += ' <td class="mdl-data-table__cell--non-numeric"></td>';
      }
      tableBody += '  <td><a href="tel:' + persons[i].phone + '">' + persons[i].phone + '</a></td>';
      tableBody += '  <td class="mdl-data-table__cell--non-numeric"><a href="mailto:' + persons[i].email + '">' + persons[i].email + '</a></td>';
      tableBody += '  <td class="mdl-data-table__cell--non-numeric"><input type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" value="Rimuovi" onclick="deletePerson(\'' + persons[i]._id + '\')"></td>'
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

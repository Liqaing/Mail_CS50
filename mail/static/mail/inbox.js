import { createEmailTableRow, createEmailTableHead, createEmailTableHeadRecipient, createEmailTableRowRecipient } from "./util.js";

document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // compose_email form submition event
  document.querySelector('#compose-form').addEventListener('submit', send_email);

  // Add event listener for email container, use event delegation to check for child that trigger the event
  document.querySelector('#emails-view').addEventListener('click', e => {

    // Check if the target that trigger the event is table data element
    if (e.target.tagName === 'TD') {
      // Provide td parent element to function
      DisplayEmail(e.target.parentElement);
    }
  });

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Set compose-recipients class to valid, as not to display error message when open form
  document.querySelector('#compose-recipients').classList.remove('is-invalid');
  document.querySelector('#compose-recipients').classList.add('is-valid');

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Send api request to emails/inbox, sent or, archive
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {

    // Create new table element, add bootstrap class
    const table = document.createElement('table');
    table.classList.add('table', 'table-sm', 'table-hover');
    table.style.tableLayout = 'fixed';

    // Create table head element
    const thead = document.createElement('thead');

    // Create table body element
    const tbody = document.createElement('tbody');

    // If user visit sent mailbox, then display recipients email rather than sender
    if (mailbox === "sent") {
      // Display Recipient emails
      // Create html table header element
      const header = createEmailTableHeadRecipient();
      thead.appendChild(header);

      // Call function to create table row for each email
      emails.forEach((email) => {
        const emailRow = createEmailTableRowRecipient(email);
        // Append row to table
        tbody.appendChild(emailRow);
      });
    }
    else {
      // Display sender email
      // Create html table header element
      const header = createEmailTableHead();
      thead.appendChild(header);

      // Call function to create table row for each email
      emails.forEach((email) => {
        const emailRow = createEmailTableRow(email);
        // Append row to table
        tbody.appendChild(emailRow);
      });
    };
    
    // add table to email-view for display
    table.appendChild(thead);
    table.appendChild(tbody);
    document.querySelector('#emails-view').appendChild(table);

    console.log(emails);
  });
}

// Send compose email to server by API route (/emails)
function send_email(e) {

  // Prevent form from submit and reload while performing ajax (fetch)
  e.preventDefault();

  // Retrive content of compose email
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;
  
  // Send API request
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body,
    })
  })
  .then(response => {
    // Handle unexpected return status
    if (!response.ok) {
      throw new Error(`Unexpected erorr, Status: ${response.status}!`);
    }
    return response.json()
  })
  .then(result => {

    // Handle error
    if (result.error) {

      // Change error message in feedback
      document.querySelector('#recipients-invalid-feedback').innerHTML = result.error; 
      
      // Change class of input field to invalid 
      document.querySelector('#compose-recipients').classList.remove('is-valid');
      document.querySelector('#compose-recipients').classList.add('is-invalid');
  
      alert(result.error);
    }
    else {
      // Send user to sent mailbox
      load_mailbox('sent');
    }
    console.log(result);
  })
  .catch(error => {
    // alert("Error");
    console.log('Error:', error);
  });

  return false;
}
 
// Display an email to user
function DisplayEmail(email) {
  console.log(email)
}
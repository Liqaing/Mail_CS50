document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // compose_email form submition event
  document.querySelector('#compose-form').addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
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

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
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
  .then(response => response.json())

    // Handle error
    // if (!response.ok) {
    //   // Update message from API reponse to form validation
    //   const errorData = response.json();
    //   console.log(errorData.error);
    //   alert(errorData.error);
    //   return response.json();
    // }
    
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
      load_mailbox('sent');
    }
    console.log(result);
  })
  .catch(error => {
    // alert("Error");
    console.log('Error:', error);
  });
  
  // Load user sent mailbox
  // load_mailbox('sent'); 

  return false;
}


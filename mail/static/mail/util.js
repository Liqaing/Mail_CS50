

// Check if the email is read, to set bg color on its table row
function isEmailRead(email, tableRow) {
    // If read, set back ground to grey, else set to white
    if (email.read) {
        tableRow.classList.add('table-secondary');
    }
    else {
        tableRow.classList.add('table-light');
    }
    return tableRow;
}

// These function display recipients email rather than sender email
function createEmailTableRowRecipient(email) {
  
    // Create html row
    // Dynamically create tr element and set its inner html to create object, which i can later use appendChile method to add it into table element
    let tableRow = document.createElement('tr');
    
    // Set data attribute of tr to email id
    tableRow.dataset.id = email.id;
    
    const tableRowData = `
      <td class="text-truncate table-text">${email.recipients}</td>
      <td class="text-truncate table-text">${email.subject} - ${email.body}</td>
      <td class="text-truncate table-text">${email.timestamp}</td>
    `
    tableRow.innerHTML = tableRowData;

    tableRow = isEmailRead(email, tableRow);
    
    return tableRow;
}

function createEmailTableHeadRecipient() {
    // Create html row for table head
    const tableRow = document.createElement('tr');
    const tableHead = `
        <th class="w-25" scope="col">Recipients</th>
        <th class="w-50" scope="col">Content</th>
        <th class="w-25" scope="col">Date</th>
    `
    tableRow.innerHTML = tableHead;
    return tableRow;
}

// These function display sender email rather than recipient emails
// Create table row element for each email
function createEmailTableRow(email) {
  
    // Create html row
    // Dynamically create tr element and set its inner html to create object, which i can later use appendChile method to add it into table element
    let tableRow = document.createElement('tr');

    // Set data attribute of tr to email id
    tableRow.dataset.id = email.id;
    
    const tableRowData = `
      <td class="text-truncate">${email.sender}</td>
      <td class="text-truncate">${email.subject} - ${email.body}</td>
      <td class="text-truncate">${email.timestamp}</td>
    `
    tableRow.innerHTML = tableRowData;
    
    tableRow = isEmailRead(email, tableRow);

    return tableRow;
}

// Table head for display sender email
function createEmailTableHead() {
    // Create html row for table head
    const tableRow = document.createElement('tr');
    const tableHead = `
        <th class="w-25" scope="col">Sender</th>
        <th class="w-50" scope="col">Content</th>
        <th class="w-25" scope="col">Date</th>
    `
    tableRow.innerHTML = tableHead;
    return tableRow;
}

// Create html for display recieved mail, which display email of sender
function createSentEmailHtml(email) {

    // Generate string of anchor elements for recipient email
    let recipientEmailsAnchor = ''; 
    email.recipients.forEach(email => {
        recipientEmailsAnchor += `<a class="dropdown-item" href="#">${email}</a>`
    });

    // Show button to archive or unarchive the email
    // Show only when user visit mail that is not in sent mailbox
    let archivedButton = ''
    if (document.querySelector('#mailbox-title').innerHTML.toLowerCase() !== 'sent') {
        archivedButton = createArchivationButton(email);
    }

    // Html for display email
    const emailHtml = `
        <div class="h4 text-justify text-break">Subject: ${email.subject}</div>
        <p>Date: ${email.timestamp}</p>
        <br>
        <h5>Sender: ${email.sender}</h5>
        
        <div class="dropdown">
            <button class="btn dropdown-toggle mw-100 text-truncate p-0" data-toggle="dropdown" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                To: ${email.recipients}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                ${recipientEmailsAnchor}
            </div>
        </div>
        ${archivedButton}
        <button id="reply-button" class="btn btn-outline-secondary btn-sm mt-1 mb-0 p-1">Reply</button>
        <hr>
        <div class="text-justify text-indent">
            ${email.body}
        </div>
    `
    return emailHtml;
}

function createArchivationButton(email) {
    let archivedButton = '';
    // check if archive state of email
    if (email.archived === false) {
        // Not yet archive
        archivedButton = '<button id="archive-button" class="btn btn-outline-secondary btn-sm mt-1 mb-0 p-1">Archive</button>'
    }
    else {
        archivedButton = '<button id="archive-button" class="btn btn-outline-secondary btn-sm mt-1 mb-0 p-1">Unarchive</button>'
    }
    return archivedButton;
}

export { createEmailTableRow, createEmailTableHead, createEmailTableHeadRecipient, createEmailTableRowRecipient, createSentEmailHtml, createArchivationButton }
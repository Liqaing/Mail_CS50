

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
    const tableRowData = `
      <td class="text-truncate table-text">${email.sender}</td>
      <td class="text-truncate table-text">${email.subject} - ${email.body}</td>
      <td class="text-truncate table-text">${email.timestamp}</td>
    `
    tableRow.innerHTML = tableRowData;
    
    tableRow = isEmailRead(email, tableRow);

    return tableRow;
}

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

export { createEmailTableRow, createEmailTableHead, createEmailTableHeadRecipient, createEmailTableRowRecipient }
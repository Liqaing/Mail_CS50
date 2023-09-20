// Create table row element for each email
function createEmailTableRow(email) {
  
    // Create html row
    // Dynamically create tr element and set its inner html to create object, which i can later use appendChile method to add it into table element
    const tableRow = document.createElement('tr');
    const tableRowData = `
      <td class="text-truncate">${email.sender}</td>
      <td class="text-truncate">${email.subject}</td>
      <td class="text-truncate">${email.body}</td>
      <td class="text-truncate">${email.timestamp}</td>
    `
    tableRow.innerHTML = tableRowData;
    return tableRow;
}

function createEmailTableHead() {
    // Create html row for table head
    const tableRow = document.createElement('tr');
    const tableHead = `
        <th scope="col">Sender</th>
        <th scope="col">Subject</th>
        <th scope="col">Content</th>
        <th scope="col">Date</th>
    `
    tableRow.innerHTML = tableHead;
    return tableRow;
}

export { createEmailTableRow, createEmailTableHead }
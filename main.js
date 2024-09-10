document.addEventListener('DOMContentLoaded', function() {
    loadTableDataFromLocalStorage();
});

document.getElementById('add-reason-button').addEventListener('click', function() {
    // Get the input element
    const inputElement = document.getElementById('reason-input');

    if (inputElement.value == "") return

    const inputValue = inputElement.value.charAt(0).toUpperCase() + inputElement.value.slice(1);
    addReasonData(inputValue, true)
    inputElement.value = '';

    //save the data to storage
    saveTableDataToLocalStorage()
});

function addReasonData(inputValue, isShow) {
    const tableBody = document.querySelector('#tableReasons tbody');
    
    // Create a new row
    const newRow = document.createElement('tr');
    
    // Create cells and set their content
    const noReason = document.createElement('td');
    noReason.textContent = "•"; 
    
    const valueReason = document.createElement('td');
    valueReason.textContent = inputValue;
    valueReason.className = "table-columnReasonShow"

    const valueAction = document.createElement('td');
    valueAction.style.display = 'flex';
    valueAction.style.gap = '10px';
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'REMOVE'; // Set the button text
    removeButton.className = "remove-buttonShow"
    removeButton.colorh

    // Optionally, add an event listener to the button
    removeButton.addEventListener('click', function() {
        const removeButtons = document.querySelectorAll('.remove-buttonShow');
        removeButtons.forEach(button => {
            const row = this.closest('tr');    
            // Remove the row from the table
            if (row) {
                row.remove();
            }
        });
        saveTableDataToLocalStorage()
    });

    const hideButton = document.createElement('button');
    hideButton.className = "remove-buttonShow";

    const hideIcon = document.createElement('img');
    hideIcon.src = 'images/show.png';
    hideIcon.style.width = '16px';
    hideIcon.style.height = '16px';

    hideButton.appendChild(hideIcon);

    // initiate for the first time for the view
    if (isShow) {
        valueReason.className = "table-columnReasonShow";
        noReason.className = "table-columnNumberShow"
        removeButton.className = "remove-buttonShow"
        hideButton.className = "remove-buttonShow"
        hideIcon.src = 'images/show.png';
    } else {
        valueReason.className = "table-columnReasonHide";
        noReason.className = "table-columnNumberHide"
        removeButton.className = "remove-buttonHide"
        hideButton.className = "remove-buttonHide"
        hideIcon.src = 'images/hide.png';
    }

    hideButton.addEventListener('click', function() {
        isShow = !isShow
        if (isShow) {
            valueReason.className = "table-columnReasonShow";
            noReason.className = "table-columnNumberShow"
            removeButton.className = "remove-buttonShow"
            hideButton.className = "remove-buttonShow"
            hideIcon.src = 'images/show.png';
        } else {
            valueReason.className = "table-columnReasonHide";
            noReason.className = "table-columnNumberHide"
            removeButton.className = "remove-buttonHide"
            hideButton.className = "remove-buttonHide"
            hideIcon.src = 'images/hide.png';
        }
        saveTableDataToLocalStorage()
    });
    
    valueAction.appendChild(hideButton);
    valueAction.appendChild(removeButton);
    
    newRow.appendChild(noReason);
    newRow.appendChild(valueReason);
    newRow.appendChild(valueAction)
    
    // Append the new row to the table body
    tableBody.appendChild(newRow);
}

document.getElementById('reason-input').addEventListener('keydown', function(event) {
    // Check if the pressed key is ENTER (key code 13)
    if (event.key === 'Enter') {
        event.preventDefault(); // Optional: Prevent the default action (e.g., form submission)
        
        document.getElementById('add-reason-button').click();
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
    const table = document.getElementById("tableReasons");
    const tbody = table.querySelector('tbody'); // Get the table body

    // Ensure tbody exists before proceeding
    if (tbody) {
        // Start with the first child of tbody
        let row = tbody.firstChild;
        
        // Loop through each row
        while (row) {
            // Store the next row before removing the current row
            let nextRow = row.nextSibling;

            // Check if the current row is an element node (to avoid text nodes, etc.)
            if (row.nodeType === Node.ELEMENT_NODE) {
                // Get all cells in the row
                const cells = row.getElementsByTagName('td');

                // Check if there are at least two cells and if the text content of the second cell is 'rar'
                if (cells.length > 1 && cells[1].className !== "table-columnReasonHide") {
                    tbody.removeChild(row); // Remove the current row
                }
            }

            // Move to the next row
            row = nextRow;
        }
    }

    
});

function addRowClass(tableId, rowIndex, className) {
    const table = document.getElementById(tableId);
    const row = table.rows[rowIndex];
    
    if (row) {
        row.classList.add(className);
    }
}

document.getElementById('btn-pending-trucker').addEventListener('click', function() {
    navigator.clipboard.writeText(pendingFormat(0)).then(() => {
        const toast = document.getElementById('toast-pending-trucker');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-pending-lumberjack').addEventListener('click', function() {
    navigator.clipboard.writeText(pendingFormat(1)).then(() => {
        const toast = document.getElementById('toast-pending-lumberjack');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-pending-impound').addEventListener('click', function() {
    navigator.clipboard.writeText(pendingFormat(2)).then(() => {
        const toast = document.getElementById('toast-pending-impound');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-pending-cgc').addEventListener('click', function() {
    navigator.clipboard.writeText(pendingFormat(3)).then(() => {
        const toast = document.getElementById('toast-pending-cgc');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-accepted-trucker').addEventListener('click', function() {
    navigator.clipboard.writeText(acceptedFormat(0)).then(() => {
        const toast = document.getElementById('toast-accepted-trucker');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-accepted-lumberjack').addEventListener('click', function() {
    navigator.clipboard.writeText(acceptedFormat(1)).then(() => {
        const toast = document.getElementById('toast-accepted-lumberjack');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-accepted-impound').addEventListener('click', function() {
    navigator.clipboard.writeText(acceptedFormat(2)).then(() => {
        const toast = document.getElementById('toast-accepted-impound');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-accepted-cgc').addEventListener('click', function() {
    navigator.clipboard.writeText(acceptedFormat(3)).then(() => {
        const toast = document.getElementById('toast-accepted-cgc');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-denied-trucker').addEventListener('click', function() {
    navigator.clipboard.writeText(deniedFormat(0)).then(() => {
        const toast = document.getElementById('toast-denied-trucker');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-denied-lumberjack').addEventListener('click', function() {
    navigator.clipboard.writeText(deniedFormat(1)).then(() => {
        const toast = document.getElementById('toast-denied-lumberjack');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-denied-impound').addEventListener('click', function() {
    navigator.clipboard.writeText(deniedFormat(2)).then(() => {
        const toast = document.getElementById('toast-denied-impound');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('btn-denied-cgc').addEventListener('click', function() {
    navigator.clipboard.writeText(deniedFormat(3)).then(() => {
        const toast = document.getElementById('toast-denied-cgc');
        // Show toast
        toast.className = 'toast show';
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

/**
 * 
 * type
 * 0 > Trucker
 * 1 > Lumberjack
 * 2 > Impound
 */
function pendingFormat(num) {
    const lastNameOfApplicant = document.getElementById('applicant-input').value;
    const gcluRank = document.getElementById('rank-input').value
    const officerName = document.getElementById('officer-input').value
    const sign = document.getElementById('signature-input').value
    let formatType = ""
    switch(num) {
        case 0:
            formatType = "Trucking License"
            break;
        case 1:
            formatType = "Lumberjack License"
            break;
        case 2:
            formatType = "Impound License"
            break;
        case 3:
            formatType = "Certificate of Good Conduct"
            break;
        default:
            formatType = ""
    }

    const first = `[divbox=#F1F1F1][center]
[img]https://i.imgur.com/iHky2fT.png[/img]
[b][size=125]Administrative Services Bureau - Gun Control and Licensing Unit[/size][/b]
[b][size=125]License Application Response[/size][/b][/center]
[hr][/hr]
[divbox=#20354C][color=white][center]${formatType}[/center][/color][/divbox]

Dear Mr./Mrs. ${lastNameOfApplicant},

We've reviewed your application and your record, and after a long deliberation, we'd like to inform you that we've decided to [color=orange][b]PENDING[/b][/color] your application because of the following reason:

[b]Reason(s):[/b]
[list]`

    let second = ""

    // get value from table reasons
    const table = document.getElementById('tableReasons');
    let tableData = [];

    // Extracting the table data
    for (let i = 1; i < table.rows.length; i++) {
        let rowData = [];
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            if (table.rows[i].cells[j].className === 'table-columnReasonShow') {
                rowData.push(table.rows[i].cells[j].textContent);
            } else {
                rowData.push("");
            }
        }
        tableData.push(rowData);
    }

    // Loop through the table data and perform an action
    tableData.forEach(row => {
        if (row[1] && row[1].trim() !== '') {
            second += `[*] ${row[1]}`
        }
    });

    second += `[*]((Mohon gunakan icon pensil di kanan atas form untuk mengedit, dan tidak mengirimkan reply format baru))`

    const withSign = `[/list]

[b]Note(s):[/b]
[list][*]You have 7 days to make things right.[/list]

[right]Yours Sincerely, 
[img]${sign}[/img]
[b]${gcluRank}[/b], [i]${officerName}[/i][/right][/divbox]`

    const withoutSign = `[/list]

[b]Note(s):[/b]
[list][*]You have 7 days to make things right.[/list]
    
[right]Yours Sincerely, 
[b]${gcluRank}[/b], [i]${officerName}[/i][/right][/divbox]`


    // tracker
    // trackEventCreateFormat(formatType, 'Pending', officerName, lastNameOfApplicant, second)
    
    if (sign == "") {
        return first + second + withoutSign;
    } else {
        return first + second + withSign;
    }
}

function acceptedFormat(num) {
    let formatType = ""
    const lastNameOfApplicant = document.getElementById('applicant-input').value;
    const gcluRank = document.getElementById('rank-input').value
    const officerName = document.getElementById('officer-input').value
    const sign = document.getElementById('signature-input').value
    switch(num) {
        case 0:
            formatType = "Trucking License"
            break;
        case 1:
            formatType = "Lumberjack License"
            break;
        case 2:
            formatType = "Impound License"
            break;
        case 3:
            formatType = "Certificate of Good Conduct"
            break;
        default:
            formatType = ""
    }
    const first = `[divbox=#F1F1F1][center]
[img]https://i.imgur.com/iHky2fT.png[/img]
[b][size=125]Administrative Services Bureau - Gun Control and Licensing Unit[/size][/b]
[b][size=125]License Application Response[/size][/b][/center]
[hr][/hr]
[divbox=#20354C][color=white][center]${formatType}[/center][/color][/divbox]

Dear Mr./Mrs. ${lastNameOfApplicant},

We've reviewed your application and your record, and after a long deliberation, we'd like to inform you that your application has been [color=green][b]ACCEPTED[/b][/color]. However, this is not the end, you can finish your administration by coming to one of our HQ when we're [url=https://police.san-andreas.net/viewtopic.php?f=121&t=71534]available.[/url]

[b]Note(s):[/b]
[list][*]You have 7 days to finish your administration through [url=https://police.san-andreas.net/viewtopic.php?f=121&t=71534]GCLU Hours[/url].[/list]

[right]Yours Sincerely, 
`

    // tracker
    // trackEventCreateFormat(formatType, 'Accepted', officerName, lastNameOfApplicant, "")

    const withSign = `[img]${sign}[/img]
[b]${gcluRank}[/b], [i]${officerName}[/i][/right][/divbox]`
    const withoutSign = `[b]${gcluRank}[/b], [i]${officerName}[/i][/right][/divbox]`

    if (sign == "") {
        return first + withoutSign;
    } else {
        return first + withSign;
    }
}

function deniedFormat(num) {
    const lastNameOfApplicant = document.getElementById('applicant-input').value;
    const gcluRank = document.getElementById('rank-input').value
    const officerName = document.getElementById('officer-input').value
    const sign = document.getElementById('signature-input').value
    let formatType = ""
    switch(num) {
        case 0:
            formatType = "Trucking License"
            break;
        case 1:
            formatType = "Lumberjack License"
            break;
        case 2:
            formatType = "Impound License"
            break;
        case 3:
            formatType = "Certificate of Good Conduct"
            break;
        default:
            formatType = ""
    }

    const first = `[divbox=#F1F1F1][center]
[img]https://i.imgur.com/iHky2fT.png[/img]
[b][size=125]Administrative Services Bureau - Gun Control and Licensing Unit[/size][/b]
[b][size=125]License Application Response[/size][/b][/center]
[hr][/hr]
[divbox=#20354C][color=white][center]${formatType}[/center][/color][/divbox]

Dear Mr./Mrs. ${lastNameOfApplicant},

We've reviewed your application and your record, and after a long deliberation, we'd like to inform you that your application has been [color=red][b]DENIED[/b][/color] because of the following reason:

[b]Reason(s):[/b]
[list][*] Didn't give any responses within 7 days.`

    const withSign = `[/list]

[b]Note(s):[/b]
[list][*] You may create a new form again.[/list]

[right]Yours Sincerely, 
[img]${sign}[/img]
[b]${gcluRank}[/b], [i]${officerName}[/i][/right][/divbox]`

    const withoutSign = `[/list]

[b]Note(s):[/b]
[list][*] You may create a new form again.[/list]
    
[right]Yours Sincerely, 
[b]${gcluRank}[/b], [i]${officerName}[/i][/right][/divbox]`

    // tracker
    // trackEventCreateFormat(formatType, 'Denied', officerName, lastNameOfApplicant, "Didn't give any responses within 7 days.")

    if (sign == "") {
        return first + withoutSign;
    } else {
        return first + withSign;
    }
}

function saveTableDataToLocalStorage() {
    const table = document.getElementById('tableReasons');
    const tableData = [];
    
    // Loop through table rows (starting from 1 to skip header)
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const rowData = [];

        // Capture cell text and class name status
        rowData.push(row.cells[1].textContent.trim());
        rowData.push(row.cells[1].className === 'table-columnReasonHide' ? false : true);

        tableData.push(rowData);
    }

    const tableInformation = []
    tableInformation.push(document.getElementById("applicant-input").value)
    tableInformation.push(document.getElementById("rank-input").value)
    tableInformation.push(document.getElementById("officer-input").value)
    tableInformation.push(document.getElementById("signature-input").value)

    // Save table data to local storage
    localStorage.setItem('tableData', JSON.stringify(tableData));
    localStorage.setItem('tableInformation', JSON.stringify(tableInformation));
}

function loadTableDataFromLocalStorage() {
    const table = document.getElementById('tableReasons');
    const tbody = table.querySelector('tbody'); // Get the table body
    const tableData = JSON.parse(localStorage.getItem('tableData'));

    if (tableData) {
        // Clear existing rows
        tbody.innerHTML = '';

        // Add rows from stored data
        tableData.forEach(rowData => {
            addReasonData(rowData[0], rowData[1]);
        });
    }

    const tableInformation = JSON.parse(localStorage.getItem('tableInformation'))
    if (tableInformation) {
        document.getElementById('applicant-input').value = tableInformation[0];
        document.getElementById('rank-input').value = tableInformation[1];
        document.getElementById('officer-input').value = tableInformation[2];
        document.getElementById('signature-input').value = tableInformation[3];
    }
}

function trackEventCreateFormat(typeLicense, statusForm, name, applicant, reasons) {
    // logEvent(analytics, 'create_format', {
    //     type: typeLicense,
    //     status: statusForm,
    //     officer_name: name,
    //     applicant_name: applicant,
    //     reason: reasons,
    //     timestamp: new Date().toISOString()
    //   });
}
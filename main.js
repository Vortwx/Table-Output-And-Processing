fetch('Table_Input.csv').then(
    response => response.text()
).then(csv => {
    const content = parseCSV(csv)
    const header2 = ['Category', 'Value']
    const table2 = new Map([
        ['Alpha', content[1].get('A5')+content[1].get('A20')],
        ['Beta', content[1].get('A15')/content[1].get('A7')],
        ['Charlie', content[1].get('A13')*content[1].get('A12')]
    ])
    displayTable('first-table',content[0],content[1])
    displayTable('second-table',header2,table2)
}).catch(error=>console.error("Error loading this file:",error))



function displayTable(tableID,titles,dataMap){
    const table = document.getElementById(tableID)
    const tableHead = table.getElementsByTagName('thead')[0]
    const tableBody = table.getElementsByTagName('tbody')[0]
    
    tableHead.innerHTML = ''
    tableBody.innerHTML = ''

    createHeader(tableHead,titles)

    populateTable(tableBody,dataMap)
}

function createHeader(tableHead, titles){
    const headerRow = document.createElement('tr');
    titles.forEach(title => {
      const th = document.createElement('th');
      th.textContent = title;
      headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);
}

function populateTable(tableBody, dataMap){
    dataMap.forEach((val,key)=> {
        const tr = document.createElement('tr');

        const dataKey = document.createElement('td');
        dataKey.textContent = key;
        tr.appendChild(dataKey);

        const dataVal = document.createElement('td');
        dataVal.textContent = val;
        tr.appendChild(dataVal);

        tableBody.appendChild(tr);
    });
}

function parseCSV(csv){
    const rows = csv.trim().split('\n')
    const header = rows[0].split(',')
    const data = new Map (rows.slice(1).map(
        row => {
            const [name, value] = row.split(',')
            const intValue = parseInt(value.replace(/[^0-9]/g, ''))
            return [name,intValue]
        }
    )) //data is now hashMap, not efficient when the size scaled
    return [header,data]
}



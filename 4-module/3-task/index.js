let table = document.querySelector('.js-teachers');

function highlight(table){
    
    let tbody = table.querySelector('tbody');
    let rows = tbody.rows;   // body's rows
    
    for(let row of rows){
        // Third column action
        if(row.querySelector('[data-available="true"]')){
            row.classList.add('available');
        } else if(row.querySelector('[data-available="false"]')){
            row.classList.add('unavailable');
        } else{
            row.hidden = true;
        }
        // Second column action 
        for(let i = 0; i < row.cells.length; i++){
            if(row.cells[i].textContent === 'm'){
                row.classList.add('male');
            } else if(row.cells[i].textContent === 'f'){
                row.classList.add('female');
            }
            // First column action

            if(parseInt(row.cells[i].textContent) < 18){
                row.style.textDecoration = 'line-through';
            }

        }
    } 
     
}



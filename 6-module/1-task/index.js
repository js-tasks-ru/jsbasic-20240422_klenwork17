export default class UserTable {
    constructor(rows) {
        this.rows = rows;
        this.elem = this.element();
    } 
    
    element() {
        const table = document.createElement('table');
        // document.body.append(table);

        // Шапка таблицы
        
        const thead = document.createElement('thead');
        table.append(thead);
        
        const headerRow = document.createElement('tr');
        thead.append(headerRow)
        
        Object.keys(this.rows[0]).forEach(function(item){
            const th = document.createElement('th');
            th.textContent = item;

            headerRow.append(th);
        })

        // Тело таблицы 

        const tbody = document.createElement('tbody');
        table.append(tbody);

        this.rows.forEach(function(item) {
            const tr = document.createElement('tr');

            for(let key in item){
                const td = document.createElement('td');
                td.innerHTML = item[key];

                tr.append(td);
            }

            const buttonTd = document.createElement('td');
            tr.append(buttonTd);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.id = 'deleteButton';

            buttonTd.append(deleteButton);

            // Обработчики 

            deleteButton.addEventListener('click', function(event){
                deleteButton.closest('tr').remove();
            })

            tbody.append(tr);

        
        })

        return table;
    }
}







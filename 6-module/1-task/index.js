/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows){
      this.rows = rows;
      this.elem = this.table();
  }

  table() {
      const table = document.createElement('table');
      const BODY = document.body

      BODY.append(table);
      
      // Создание шапки таблицы

      const thead = document.createElement('thead');
      table.append(thead)

      const headerRow = document.createElement('tr'); 
      thead.append(headerRow)

      Object.keys(this.rows[0]).forEach(function(item){
          const th = document.createElement('th');
          th.textContent = item;

          headerRow.append(th)

      })
      const th = document.createElement('th');
      headerRow.append(th)


      // Создание Тела таблицы

      const tbody = document.createElement('tbody');
      table.append(tbody);

      // Для каждого объекта массива создаём строку, заполняем её количеством ячеек, 
      // которое равно количеству свойств. Содержимое ячеек - значение свойства

      this.rows.forEach(function(item){
          const tr = document.createElement('tr');

          for(let key in item){
              const td = document.createElement('td');
              td.textContent = item[key];

              tr.append(td);
          }

          const tdButtonContainer = document.createElement('td'); // ячейка для кнпоки
          tr.append(tdButtonContainer)

          const deleteButton = document.createElement('button');    
          deleteButton.className = 'btn';
          deleteButton.textContent = '[x]';   

          tdButtonContainer.append(deleteButton);

          // Обработчики

          deleteButton.addEventListener('click', function(event){
              deleteButton.closest('tr').remove()   
          })  
          
          tbody.append(tr);
          
      })
  }
}









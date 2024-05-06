// Напишите функцию camelize(str),
// которая преобразует строки вида 'my-short-string' в 'myShortString'.

// То есть дефисы удаляются, а все слова после них получают заглавную букву.
// Примеры:

camelize('background-color') == 'backgroundColor';

function camelize(str){
  str = str.split("-");
  str = str.map((word, index) => (index == 0) ? word : word[0].toUpperCase() + word.slice(1));
  str = str.join("");

  return str;
}

// P.S. Подсказка: используйте метод split,
// чтобы разбить строку на массив символов,
// потом переделайте всё как нужно и методом join соедините обратно.
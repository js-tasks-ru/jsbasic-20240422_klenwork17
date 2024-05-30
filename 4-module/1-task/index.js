let friends = [
  {
      firstName: 'Artsiom',
      lastName: 'Mezin'
  },
  {
      firstName: 'Ilia',
      lastName: 'Kantor'
  },
  {
      firstName: 'Christopher',
      lastName: 'Michael'
  }
];



function makeFriendsList(obj){
  let ul = document.createElement('ul');
  document.body.append(ul);

  let names = obj.map(el => el.firstName + ' ' + el.lastName)
  
  for(let i = 0; i < names.length; i++){
    let li = document.createElement('li');
    li.innerHTML = names[i];
    ul.append(li);
  }

  return ul;
}
function showSalary(users, age){
  let arr = users.filter(item => item.age <= age);

  let str = arr.map(item => item.name + ", " + item.balance);
  str = str.join("\n")

  return str;
}
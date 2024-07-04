

function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');

  btn.addEventListener('click', function() {
    text.hidden = !text.hidden
  }) 
  
}



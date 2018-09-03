let timeout;
const wait = 1000;
const input = document.getElementById("q");

input.addEventListener('keyup', function() {
  clearTimeout(timeout);
  timeout = setTimeout(movieSearch, wait);
});

input.addEventListener('keydown', function() {
  clearTimeout(timeout);
});

const movieSearch = () => {
  const term = input.value;
  if (term.length > 2) {
    let existingResults = document.getElementById('resultsList');
    if(existingResults) {
      existingResults.remove();
    }
  
    let http = new XMLHttpRequest();
    http.open('POST', 'http://localhost:3000/search');
    http.setRequestHeader('Content-Type', 'application/json');
    http.onload = function () {
      // console.log(http.responseText)
      let ul = document.createElement('ul');
      ul.id = 'resultsList';
      ul.className = 'list-group';
      document.getElementById('resultsContainer').appendChild(ul);
    
      JSON.parse(http.responseText).forEach((match) => {
        let li = document.createElement('li');
        li.className = 'list-group-item';
        ul.appendChild(li);
        li.innerHTML += match.title;
      });
    };
    http.send(JSON.stringify({ term: term }));
  }
}

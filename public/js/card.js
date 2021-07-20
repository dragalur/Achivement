function parsAchive(obj) {
   const text = `
    <div class="item z-depth-3">
              <header>
                <h5>${obj.name}</h5>
                <p class="count"><span class="progres">${obj.currentPoints}</span>
                 / <span class="allPoint">${obj.finishedPoints}</span></p>

              </header>
              <p class="description">${obj.description}</p>
              <p class='coin'>${obj.coin} coin</p>
            </div>`;
   return document.createRange().createContextualFragment(text);
}
const btAll = document.getElementById('allAchive');
btAll.addEventListener('click', e => {
   const conteiner = e.target.parentElement.nextElementSibling;
   conteiner.innerHTML = '';

   fetch('/userAllAchives')
      .then(response => response.json())
      .then(i => i.forEach(v => conteiner.appendChild(parsAchive(v))));
});

const btOne = document.getElementById('oneAchive');
btOne.addEventListener('click', e => {
   const conteiner = e.target.parentElement.nextElementSibling;
   conteiner.innerHTML = '';

   const name = document.getElementById('fieldOneAchive').value;
   fetch('/user/' + name)
      .then(response => response.json())
      .then(i => conteiner.appendChild(parsAchive(i)));
});

(function () {
   dataUser();
})();
function dataUser() {
   const name = document.getElementById('namePlayer');
   const coin = document.getElementById('coin');

   fetch('/userData')
      .then(response => response.json())
      .then(i => {
         name.innerText = 'Player name: ' + i.name;
         coin.innerText = 'Money: ' + i.coin;
      });
}

function doAchive(e) {
   const name = e.text;
   const messageP = document.getElementById('message');

   fetch('/userProgressAchive/' + name, {
      method: 'POST'
   })
      .then(response => response.json())
      .then(i => {
         messageP.innerText = name + '+ 1 point';
         dataUser();
      });
}

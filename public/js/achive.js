function parsAchive(obj) {
   const text = `
     <div class="item z-depth-3">
               <header>
                 <h5>${obj.name}</h5>
                 <p class="count">
                   <span class="allPoint">${obj.finishedPoints} Points</span></p>
 
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

   fetch('/achiveAll')
      .then(response => response.json())
      .then(i => i.forEach(v => conteiner.appendChild(parsAchive(v))));
});

const btOne = document.getElementById('oneAchive');
btOne.addEventListener('click', e => {
   const conteiner = e.target.parentElement.nextElementSibling;
   conteiner.innerHTML = '';

   const name = document.getElementById('fieldOneAchive').value;
   fetch('/achive/' + name)
      .then(response => response.json())
      .then(i => conteiner.appendChild(parsAchive(i)));
});

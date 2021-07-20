async function register() {
   const email = document.getElementById('Email_lb').value;
   const name = document.getElementById('name_lb').value;
   const password = document.getElementById('passwrod_lb').value;
   await fetch();
   console.log(email, name, password);
}
async function login() {
   const email = document.getElementById('lEmail_lb').value;
   const password = document.getElementById('lpasswrod_lb').value;
   try {
      const query = await fetch('/login', {
         method: 'POST',
         body: JSON.stringify({ email, password }),
         headers: { 'Content-Type': 'application/json' }
      });

      if (query.redirected) {
         window.location.replace(query.url);
         return;
      } else {
         const data = await query.json();
         !query.ok && setMessage(data.message);
      }
   } catch (e) {
      console.log('login query', e);
   }
}

function setMessage(text) {
   const field = document.getElementById('message');
   field.innerText = text;
}

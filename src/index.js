if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('sw.js')
    .then(function (registeration) { console.log('ServiceWorker registration successful with scope: ', registeration.scope); })
    .catch(function (err) {
      console.error('There is a problem', err);
    });

}
else {
  alert('down');
}

window.addEventListener('appinstalled', evt=>{
debugger
});

window.addEventListener('beforeinstallprompt',evt=>{
  debugger
  evt.preventDefault();
  window.promptEvt = evt;

  return false;

});


document.getElementById("btn").addEventListener("click", function(){
  alert('ads0');
  if(window.promptEvt !== undefined){
    promptEvt.prompt();
    promptEvt.userChoice.then(choice=>{
  var message = choice.outcome ==='dismissed' ? 'User Cancelled': 'User installed';
  alert(message);
})
  }
})
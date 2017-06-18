if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('./sw.js')
    .then(function (registeration) { console.log('ServiceWorker registration successful with scope: ', registeration.scope); })
    .catch(function (err) {
      console.error('There is a problem', err);
    });

}
else {
  alert('down');
}

if(Notification.permission !== 'denied'){
  Notification.requestPermission().then((p)=>{
    if(p=='granted') console.log('aproved');
  })
}


var vapidPublicKey= 'BNUjbpXXCmIlJ3m4qWZDneDJrG78xy-Zz6YEecmlAlJ3Jk4k_RkB_c3ky56S_sJRKANRp_r7H0xknfaUxXeb-Yg';
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
 
//End point = https://fcm.googleapis.com/fcm/send/f-Ar3GEBGpU:APA91bFNEKxeMFnjaoRcD1eYddT…hwdve7yBvGdD5nD5EAS3Tq3zRpVzRsjw7bXrWH9h-kLeVW4NtXZb4cyGGR1h0sM8DiObWV9Vmp
//'p2Zc70q-QpEvu3Hc4-SOGuqLkDcDyM94m0EAnyA0F-Y';
/*
{"endpoint":"https://fcm.googleapis.com/fcm/send/dO0S5XlG9ys:APA91bF2-otNKuw_-NY3-Z_pVV6piG5MJwEt02OSJaeyMbIRkKwkBRizXhasJS-0RSlQPbOLvse27rOCCr7NSwi2rFpQItdyZDjw-NtpaDPVj_LmgMXxvscwC5uAnYN2vq1rrLXXEk-m",
"keys":{"p256dh":"BJgerwudtj-zRRZ7xMDgfrnKuxiTzaHv527SBSqsIjuVqAS2bwKS-eA9TiHCT3RRcoEXySMsphJTvVD6_qMS9NQ=",
"auth":"WSd-78E18wcSNQ5HDZfnsw=="}}
*/
var notifyBtn = document.getElementById('getNotify');
notifyBtn.disabled = true;

if('serviceWorker' in navigator && 'PushManager' in window){
  if(Notification.permission != 'denied'){
        notifyBtn.disabled = false;
  }

navigator.serviceWorker.ready.then((sw)=>{
  
window.sw = sw;
sw.pushManager.getSubscription()
.then(s=>{
  if(!s){
    notifyBtn.value = 'Notify ME (subscribe yourself)';
    //Register key
    sw.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: convertedVapidKey
}).then(s=>{
  debugger
  console.log(JSON.stringify(s));
});;


    
  }
  else{
    s.unsubscribe();
  }
  
});
})

}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
 

// function showNotification(){
//   console.log('show notiffff');
//   var n = new Notification('title',{
//     body: 'body text',
//     badge: 'http://www.endlessicons.com/wp-content/uploads/2012/10/badge-icon-614x460.png',
//     icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_FbTmkdO6kdqD16ci_Vn4p4P6NoHS4D0l6wYptIfmK5t5KaU',
//     image: './images/mstile-150x150.png',
//     tag:'foo', //so multiple notif with same tag appear once
//     rentoify: true,//vibrate or make a sound if new notif with same tag appears
//     data: {'obj': 'hello data'},

//     requireInteraction: true,//will stay till action
//     // actions: [{
//     //   //max actions true
//     //   //they are kind of buttons
//     //   //helpful in persistant
//     //   action: 'accept',
//     //   title: 'Accept offer',
//     //   icon: './images/favicon-16x16.png'
//     // },
//     // {
//     //   //they are kind of buttons
//     //   //helpful in persistant
//     //   action: 'reject',
//     //   title: 'Reject offer',
//     //   icon: './images/favicon-16x16.png'
//     // }],
//     silent: false,
//     sound:'',//no browser support
//     vibrate: [200, 100, 200], //super mario theme
//     dir: 'rtl',
//     lang: 'en-us',
//     timestamp: Date.now
    


//   });
//   n.addEventListener('error', evt=>{
//     console.error('there was a problem', evt);
//   });
//   n.addEventListener('click',evt => {
//     console.log('notification.clicke!!');
//     n.close();
//   })
// }

//End showing notification




document.getElementById("btn").addEventListener("click", function(){

  navigator.serviceWorker.controller.postMessage({command:'displayNotification'})
})
var app = {};
app.init = function (){};
app.server = 'https://api.parse.com/1/classes/chatterbox/';
  var message = {
    username: window.location.search.slice(window.location.search.indexOf('=')+1),
    text: "",
    roomname: '8thfloor'
  }

app.send = function(message){ 
  $.ajax({
    type: 'POST',
    url: app.server,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(message),
    success: function(data){
      console.log(data);
      app.addMessage(message);
    }, 
    error: function(errorMsg){console.log(errorMsg);}
  })
}

app.fetch = function(){ 
  $.ajax({
    type: 'GET',
    url: app.server,  
    contentType: 'application/json',
    success: function(data){console.log(data);}, 
    error:  function(data){console.log(data);}
  })
}

app.clearMessages = function(){ 
  $('#chats').empty(); 
}

app.addMessage = function(message){ 
  $('#chats').append('<div class=\'message\'>'+message.username+': '+ message.text+'</div>');
}



$('#sbmtMsg').click(function(){
  console.log(message, message.username);
  app.send(message);
});

$('#textBox').on('keypress', function(){
  message.text = JSON.stringify($('#textBox').val());  
});
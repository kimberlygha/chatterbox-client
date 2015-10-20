var app = {};
app.init = function (){};
app.server = 'https://api.parse.com/1/classes/chatterbox/';
  var message = {
    username: window.location.search.slice(window.location.search.indexOf('=')+1),
    text: "",
    roomname: '8thfloor'
  }
app.friends = {}; 
app.addFriend = function (jqueryObject){
  // app.friends[$(this).text()] = true;
  console.log(jqueryObject.html());
};

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
      $('#textBox').val('').focus();
    }, 
    error: function(errorMsg){console.log(errorMsg);}
  })
}

app.fetch = function(){ 
  $.ajax({
    type: 'GET',
    url: app.server,  
    contentType: 'application/json',
    success: function(data){
      console.log('success!');
      app.clearMessages();
      for(var i= data['results'].length-1; i>data['results'].length-21; i--){
        var currentMessage = data['results'][i];
        //test currentMessage
        app.addMessage(data.results[i]);
      }
    }, 
    error:  function(data){console.log(data);}
  })
}


app.clearMessages = function(){ 
  $('#chats').empty(); 
}

app.addMessage = function(message){ 
  message.text = app.verifyInput(message.text);
  message.username = app.verifyInput(message.username);
  var message = $('<p><a href="#" class="username">'+message.username+'</a> : ' + message.text+'</p>');
  var msgContainer = $('<div class=\'message\'></div>');
  msgContainer.append(message);
  $('#chats').prepend(msgContainer);
  $('.username').click(function(){
    app.addFriend($(this));
  });
}

app.addRoom = function(room){

  $('#roomSelect').append('<option class=\'chatRoom\' value='+room+'>'+room+'</option>');
}

app.handleSubmit = function(){ 
  console.log('here');
  debugger; 
    app.send(message);
    return false; 
    // app.fetch();
}

  $('#sbmtMsg').on('click', app.handleSubmit)


$('#textBox').on('keyup', function(event){
  // if(event.which === 13){
  //   return app.handleSubmit();
  // }
  message.text = JSON.stringify($('#textBox').val());  
});

$('.refresh').click(app.fetch);

app.safety = {
  '&': '&amp',
 '<': '&lt',
' >': '&gt',
 '" ': '&quot',
 '\'' :'&#x27',    
 '/' :'&#x2F'
};



app.verifyInput = function (input){
  var result = "";
  if (input){
    
  }
  for (var index=0; index < input.length; ++index){
    if (app.safety.hasOwnProperty(input[index])){
      result += app.safety[input[index]];
    } else {
      result += input[index];
    }
  }
  return result;

}

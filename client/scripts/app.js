var app = {};
app.init = function (){};
app.server = 'https://api.parse.com/1/classes/chatterbox/';
  var message = {
    username: window.location.search.slice(window.location.search.indexOf('=')+1),
    text: "",
    roomname: '8thfloor'
  }

app.addFriend = function (){};

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
  $('#chats').append(msgContainer);
  $('.username').click(app.addFriend);
}

app.addRoom = function(room){

  $('#roomSelect').append('<option class=\'chatRoom\' value='+room+'>'+room+'</option>');
}

app.handleSubmit = function(event){ 
  console.log('here');
    event.preventDefault();
    app.send(message);
    // app.fetch();
}

  $('#sbmtMsg').click(app.handleSubmit)


$('#textBox').on('keyup', function(event){
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
  var result = ""; debugger;
  for (var index=0; index < input.length; ++index){
    if (app.safety.hasOwnProperty(input[index])){
      result += app.safety[input[index]];
    } else {
      result += input[index];
    }
  }
  return result;

}

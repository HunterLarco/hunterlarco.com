(function(){
  
  function TerminalFeed(){
    var self = this;
    
    
    var lines = [];
    
    var commands = [];
    var memoryindex;
    
    var cursor = new Cursor();
    var currentline;
    
    var functionsdict;
    var username;
    var lastupdate;
    
    var locked = false;
    
    
    self.update = Update;
    self.print = Print;
    self.clear = Clear;
    
    
    function Update(functs, mount, _username){
      if(!!functionsdict) Print('\n===========================================================================\n\n');
      
      username = _username;
      functionsdict = functs;
      
      if (typeof mount === 'function')
        mount(self);
    }
    function Print(text){
      var line = new TextLine(text);
      document.body.appendChild(line.getElement());
      
      lines.push(line);
    }
    function Clear(){
      for(var i=0,line; line=lines[i++];)
        if(!!line.getElement().parentElement)
          line.getElement().parentElement.removeChild(line.getElement());
    }
    
    
    function BindKeys(){
      window.addEventListener('keydown', KeyDown);
      window.addEventListener('keypress', KeyPressed);
    }
  
    function KeyDown(event){
      const stopped = [8, 37, 38, 39, 40, 13];
      
      ScrollToBottom();
    
      var keycode = event.which || event.keyCode;
      if(stopped.indexOf(keycode) == -1)
        return true;
    
      ProcessSpecialCharacter(keycode);
      event.preventDefault();
      return false;
    }
    function ProcessSpecialCharacter(keycode){
      if(locked) return;
      if(keycode == 8) DeleteLetter();
      else if(keycode == 37) cursor.shift(-1);
      else if(keycode == 39) cursor.shift( 1);
      else if(keycode == 40) SetMemoryCommand(-1);
      else if(keycode == 38) SetMemoryCommand( 1);
      else if(keycode == 13) ExecuteCurrentLine();
    }
    function KeyPressed(event){
      if(locked) return;
      
      var keycode = event.which || event.keyCode;
      var character = String.fromCharCode(keycode);
    
      if(character.match(/^[\u0020-\u007e\u00a0-\u00ff]*$/) === null)
        return
    
      AddLetter(character);
    }
  
    function AddLetter(char){
      currentline.insert(cursor.getIndex(), char);
      cursor.shift(1);
    }
    function DeleteLetter(){
      currentline.delete(cursor.getIndex());
      cursor.shift(-1);
    }
    
    function ExecuteCurrentLine(){
      if(!currentline || !currentline.getValue() || locked) return;
      
      locked = true;
      var isAtBottom = IsAtBottom();
      
      commands.push(currentline);
      var result = ExecuteCommand(currentline.getValue());
      
      if(result instanceof SyncCatch) result.listen(DelayedExecution);
      else DelayedExecution(result);
    
      function DelayedExecution(data){
        var line = currentline.setResult(data);
        if(!!line) lines.push(line);
        
        CreateNewLine();
        if(isAtBottom) ScrollToBottom();
        
        locked = false;
      }
    }
    function ExecuteCommand(command){
      var parts = command.split(' ');
      var func = parts[0];
      var args = parts.slice(1);
      
      if(!!functionsdict[func]) return functionsdict[func].apply(window, args) || '';
      else return func + ': command not found. Type help for a list of commands';
    }
    
    function CreateNewLine(){
      var line = new Line(null, username);
      lines.push(line);
      
      currentline = line;
      memoryindex = -1;
      
      AttachCursor(line);
      
      document.body.appendChild(line.getElement());
    }
    function AttachCursor(line){
      cursor.detach();
      cursor.attach(line);
      cursor.update(line.getValue().length);
    }
    
    function IsAtBottom(){
      return window.innerHeight + document.body.scrollTop >= document.body.offsetHeight;
    }
    function ScrollToBottom(){
      window.scrollTo(0, document.body.scrollHeight);
    }
    
    function SetMemoryCommand(direction){
      currentline.update(FindMemoryCommand(direction));
      cursor.update(currentline.getValue().length)
    }
    function FindMemoryCommand(direction){
      memoryindex += direction;
      memoryindex = Math.max(-1, Math.min(commands.length-1, memoryindex));
      
      if(memoryindex == -1) return '';
      
      return commands[commands.length-1-memoryindex].getValue();
    }
    
    
    (function Constructor(functs, mount, _username){
      username = _username;
      
      Update(functs, mount);
      CreateNewLine();
      BindKeys();
    }).apply(this, arguments);
  }
  
  
  window.TerminalFeed = TerminalFeed;
  
})();
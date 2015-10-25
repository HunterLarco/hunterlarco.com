(function(){
  
  function TextLine(){
    var self = this;
    
    
    var element;
    
    
    self.getElement = GetElement;
    
    
    function SetValue(new_result){
      result = new_result + '';
      
      var htmlsafe = result.replace(/\n/g, '<br/>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\s/g, '&nbsp;');
      var formatted = htmlsafe.replace(/`([^`]+)`/g, '<span class=\'func\'>$1</span>').replace(/~([^~]+)~/g, '<span class=\'colored\'>$1</span>');
      
      element.innerHTML = formatted;
    }
    function GetElement(){
      return element;
    }
    
    
    function CreateElement(){
      var line = document.createElement('div');
      line.setAttribute('class', 'line');
      
      element = line;
    }
    
    
    (function Constructor(text){
      CreateElement();
      SetValue(text);
    }).apply(this, arguments);
  }
  
  
  window.TextLine = TextLine;
  
})();
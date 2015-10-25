(function(){
  
  function Line(){
    var self = this;
    
    
    var MOUNT_STRING = 'console:~/ ';
    var END_MOUNT_STRING = '$ '
    var USERNAME = 'guest';
    
    var value = '';
    var result;
    
    var element;
    var textfield;
    
    
    self.insert = Insert;
    self.delete = Delete;
    self.append = Append;
    self.update = Update;
    
    self.setResult = SetResult;
    self.getResult = GetResult;
    
    self.getValue = GetValue;
    
    self.getElement = GetElement;
    self.getMountString = GetMountString;
    
    
    function Delete(index){
      if(index <= 0) return;
      Update(value.slice(0, index-1) + value.slice(index));
    }
    function Insert(index, addition){
      if(index < 0) index = 0;
      Update(value.slice(0, index) + addition + value.slice(index));
    }
    function Append(addition){
      Update(value + addition);
    }
    function Update(new_value){
      value = new_value;
      textfield.innerHTML = new_value.replace(/\s/g, '&nbsp;');
    }
    
    function SetResult(new_result){
      result = new_result + '';
      
      var line = new TextLine(result);
      
      if(!element.parentElement) return;
      
      element.parentElement.insertBefore(line.getElement(), element.nextSibling);
      return line;
    }
    function GetResult(){
      return result;
    }
    
    function GetValue(){
      return value;
    }
    
    function GetElement(){
      return element;
    }
    function GetMountString(){
      return MOUNT_STRING + USERNAME + END_MOUNT_STRING;
    }
    
    
    function CreateElement(){
      var line = document.createElement('div');
      line.setAttribute('class', 'line');
      
      var mount = document.createElement('span');
      mount.setAttribute('class', 'mount');
      mount.innerHTML = GetMountString().replace(/\s/g, '&nbsp;');
      
      var field = document.createElement('span');
      
      line.appendChild(mount);
      line.appendChild(field);
      
      element = line;
      textfield = field;
    }
    
    
    (function Constructor(mount_string, username){
      MOUNT_STRING = mount_string || MOUNT_STRING;
      USERNAME = username || USERNAME;
      
      CreateElement();
    }).apply(this, arguments);
  }
  
  
  window.Line = Line;
  
})();
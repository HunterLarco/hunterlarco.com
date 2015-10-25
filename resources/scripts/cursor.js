(function(){
  
  function Cursor(){
    var self = this;
    
    
    const undefined;
    
    const FLASH_RATE = 500;
    var hidden = false;
    var interval;
    
    var index = 0;
    var isattached = false;
    
    var element;
    
    var line;
    const WIDTH = 9;
    
    
    self.shift = Shift;
    self.update = Update;
    
    self.isAttached = IsAttached;
    self.attach = Attach;
    self.detach = Detach;
    
    self.getIndex = GetIndex;
    self.getElement = GetElement;
    
    
    function Shift(positions){
      Update(index + positions)
    }
    function Update(position){
      if(!line) return;
      if(position === undefined) position = index;
      
      position = Math.max(0, Math.min(line.getValue().length, position));
      index = position;
      
      element.style.left = WIDTH * (index + line.getMountString().length) + 'px';
      ResetFlash();
    }
    
    function IsAttached(){
      return isattached;
    }
    function Attach(dest_line){
      if(IsAttached()) return;
      isattached = true;
      
      line = dest_line;
      elem = line.getElement();
      
      elem.appendChild(element);
    }
    function Detach(){
      if(!IsAttached()) return;
      isattached = false;
      
      element.parentElement.removeChild(element);
      
      line = null;
    }
    
    function GetIndex(){
      return index;
    }
    function GetElement(){
      return element;
    }
    
    
    function ResetFlash(){
      hidden = true;
      clearInterval(interval);
      Flash();
      interval = setInterval(Flash, FLASH_RATE);
    }
    function Flash(){
      hidden = !hidden;
      element.style.opacity = hidden ? 0 : 1;
    }
    
    function CreateElement(){
      element = document.createElement('cursor');
    }
    
    
    (function Constructor(){
      CreateElement();
    }).apply(this, arguments);
  }
  
  
  window.Cursor = Cursor;
  
})();
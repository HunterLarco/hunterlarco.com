(function(){
  
  function SyncCatch(){
    var self = this;
    
    
    var listeners = [];
    
    
    self.listen = Listen;
    self.return = Return;
    
    
    function Listen(funct){
      listeners.push(funct);
    }
    function Return(data){
      for(var i=0,listener; listener=listeners[i++];)
        listener(data);
    }
  }
  
  
  window.SyncCatch = SyncCatch;
  
})();
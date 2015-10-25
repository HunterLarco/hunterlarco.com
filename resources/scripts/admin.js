(function(){
  
  window.ADMIN_PERMISSIONS = {
    help: Help,
    logs: Logs,
    traffic: Traffic,
    request: Request,
    clear: Clear,
    cookies: Cookies,
    exit: Exit
  }
  
  window.ADMIN_MOUNT = function(terminal){
    terminal.print('`Mounting` admin');
    terminal.print('Welcome administrator. The console has now been updated with admin permissions')
  }
  
  
  function Help(func){
    if(!func){
      return 'You can use the following shell commands:\n\t`help`    - man pages for each command [func]\n\t`logs`    - prints server logs [level]\n\t`traffic` - prints recent traffic\n\t`request` - sends a http request\n\t`clear`   - clears console\n\t`cookies` - Delivers cookies to your house. Try it!\n\t`exit`    - Exit the web console';
    }else if(func == 'logs'){
      return '`logs` [*optional level]\n\tPrints the server logs.\n\tlevel = log level to filter by (info, warning, error, breach)';
    }else if(func == 'help'){
      return '`help` [*optional help]\n\tPrints the man pages for each command'
    }else if(func == 'traffic'){
      return '`traffic`\n\tPrints recent website traffic'
    }else if(func == 'request'){
      return '`request` [method] [url] [key1:value1] ... [key999:value999]\n\tsends a http request to the given url using the given method (POST or GET).\n\tPOST requests may contain data in the form of key:value pairs.\n\tNote that the key:value pair userAgent:value will alter the useragent used to send the desired request.';
    }else if(func == 'cookies'){
      return '`cookies` \n\tDelivers cookies to your house. Try it!'
    }else if(func == 'exit'){
      return '`exit` \n\tExit the web console.'
    }else{
      return 'No help for command: '+func;
    }
  }
  
  function Logs(level){
    level = !level ? /^.*$/ : new RegExp('^'+level+'$');
    
    var logs = [
      {timestamp: 1445483922173, level:'error'  , message: 'TypeError: \'list\' object cannot be interpreted as an integer'},
      {timestamp: 1445372662069, level:'info'   , message: 'New user signed up'},
      {timestamp: 1445348896973, level:'info'   , message: 'New instance started'},
      {timestamp: 1445167453969, level:'error'  , message: 'AttributeError: \'str\' object has no attribute \'lowerr\''},
      {timestamp: 1445085051388, level:'error'  , message: 'MeaningOfLifeError: on every line'},
      {timestamp: 1444867929265, level:'warning', message: 'Multiple console login attempts made'},
      {timestamp: 1444801570324, level:'error'  , message: 'TypeError: \'list\' object cannot be interpreted as an integer'},
      {timestamp: 1444737685254, level:'error'  , message: 'TypeError: \'list\' object cannot be interpreted as an integer'},
      {timestamp: 1444681854241, level:'warning', message: 'Missing resource favicon.ico'},
      {timestamp: 1444676356215, level:'error'  , message: 'MemoryError: on line 42'},
      {timestamp: 1444642736493, level:'info'   , message: '/permissions.txt opened'},
      {timestamp: 1444528568251, level:'error'  , message: 'AttributeError: \'str\' object has no attribute \'lowerr\''},
      {timestamp: 1444454358586, level:'error'  , message: 'TypeError: \'list\' object cannot be interpreted as an integer'},
      {timestamp: 1444380143053, level:'info'   , message: 'New instance started'},
      {timestamp: 1444129122190, level:'error'  , message: 'MeaningOfLifeError: on every line'},
      {timestamp: 1444117779174, level:'warning', message: 'Multiple console login attempts made'},
      {timestamp: 1443825881515, level:'warning', message: 'Multiple console login attempts made'},
      {timestamp: 1443487729354, level:'error'  , message: 'MemoryError: on line 42'},
      {timestamp: 1443478249707, level:'info'   , message: 'superuser login for automated routine system check'},
      {timestamp: 1443392215560, level:'error'  , message: 'AttributeError: \'str\' object has no attribute \'lowerr\''},
      {timestamp: 1443149888864, level:'info'   , message: 'New user signed up'},
      {timestamp: 1443144646982, level:'info'   , message: 'New instance started'},
      {timestamp: 1443064117965, level:'error'  , message: 'AttributeError: \'str\' object has no attribute \'lowerr\''},
      {timestamp: 1442969053307, level:'error'  , message: 'ValueError: invalid literal for int() with base 10. Cannot convert \'str\' to \'int\''},
      {timestamp: 1442969053307, level:'breach' , message: 'Unauthorized system access at url /sys/db/drop'},
      {timestamp: 1442962884026, level:'error'  , message: 'TypeError: \'list\' object cannot be interpreted as an integer'},
      {timestamp: 1442730175934, level:'info'   , message: 'New user signed up'},
      {timestamp: 1442586296079, level:'warning', message: 'Missing resource favicon.ico'},
      {timestamp: 1442367036935, level:'warning', message: 'Missing resource favicon.ico'},
      {timestamp: 1442240034083, level:'error'  , message: 'MeaningOfLifeError: on every line'},
      {timestamp: 1442204374038, level:'error'  , message: 'TypeError: \'list\' object cannot be interpreted as an integer'}
    ];
    
    logs = logs.filter(function(log){
      return log.level.match(level) != null;
    });
    
    var output = logs.map(FormatLog);
    return output.join('\n') || 'No logs match your query';
  }
  function FormatLog(log){
    var date = new Date(log.timestamp);
    return log.message+'\n\tTIME: '+date+'\n\tLEVEL: ~'+log.level.toUpperCase()+'~';
  }
  
  function Traffic(){
    return '4053 unique visitors since launch\n3691 from USA\n237  from Russia\n46   from France\n32   from Germany\n27   from Spain\n19   from Antarctica\n1    from the Moon';
  }
  
  function Request(method, url){
    if(!method || (method != 'POST' && method != 'GET')) return 'Method required (POST or GET)';
    if(!url) return 'URL required';
    
    var data = [].slice.call(arguments, 2);
    if(method == 'GET' && data.length > 0) return 'GET request requires no data';
    
    var body = {};
    for(var i=0,item; item=data[i++];){
      item = item.split(':');
      body[item[0]] = item[1];
    }
    
    var sync = new SyncCatch();
    
    function OnSuccess(request){
      sync.return(request.responseText);
    }
    function OnFailure(request){
      window.re = request
      sync.return('Error code '+request.status+': '+(request.statusText || 'No status text'));
    }
    
    if(method == 'POST') Post(url, body, OnSuccess, OnFailure);
    else Get(url, OnSuccess, OnFailure);
    
    return sync;
  }
  
  function Clear(){
    terminal.clear();
  }
  
  function Cookies(){
    return 'Do you live in San Francisco? Do you love cookies? Order some with a $5 credit from the following link!\n~https://www.doughbies.com/#/r/d0hwb922~';
  }
  
  function Exit(){
    window.location = '/';
  }
  
})();
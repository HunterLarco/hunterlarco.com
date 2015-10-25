from google.appengine.ext.webapp import template
import webapp2
import os


def parameters(*params):
  def decorator(f):
    def helper(self, *args, **kwargs):
      try:
        from json import loads
        body = loads(self.request.body)
      except:
        self.response.out.write('FAILED: Improper JSON formatting')
        return
      
      for param in params:
        if not param in body:
          self.response.out.write('FAILED: Missing ~%s~ field' % param)
          return
        kwargs[param] = body[param]
      
      return f(self, *args, **kwargs)
    return helper
  return decorator


class MainHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'main.html')
    self.response.out.write(template.render(path, template_values))


class TerminalHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'terminal.html')
    self.response.out.write(template.render(path, template_values))


class FakeDropDatabase(webapp2.RequestHandler):
  def post(self):
    try:
      from json import loads
      body = loads(self.request.body)
    except:
      self.response.out.write('FAILED: Improper JSON formatting')
    
    if not 'userid' in body:
      self.response.out.write('FAILED: Missing ~userid~ field')
      return
    
    if not 'userauth' in body:
      self.response.out.write('FAILED: Missing ~userauth~ field')
      return
    
    userid = body['userid']
    userauth = body['userauth']
    
    try:
      float(userid)
    except:
      self.response.out.write('FAILED: ~userid~ field requires a number')
      return
    
    if userid.lower() == 'nan':
      error = '~ValueError~: invalid literal for int() with base 10. Cannot convert \'str(%s)\' to \'int\'' % userid
      import random
      deletetime = random.randint(9,27)
      self.response.out.write(error + '\nAccess granted. Unspecified user. Dropping entire user database.\ndb dropped in %sms\n\n~IMPORTANT~ You have deleted your administrator account. Please create a new one at /users/create' % deletetime)
      return
    
    self.response.out.write('FAILED: Invalid credentials')


class FakeCreateUser(webapp2.RequestHandler):
  def post(self):
    try:
      from json import loads
      body = loads(self.request.body)
    except:
      self.response.out.write('FAILED: Improper JSON formatting')
    
    if not 'username' in body:
      self.response.out.write('FAILED: Missing ~username~ field')
      return
    
    if not 'password' in body:
      self.response.out.write('FAILED: Missing ~password~ field')
      return
    
    username = body['username']
    password = body['password']
    
    if username != 'admin':
      self.response.out.write('User created.\n\n~IMPORTANT~ No administrator account detected. Please create a new one at /users/create')
      return
    
    useragent = body['userAgent'] if 'userAgent' in body else None
    if useragent != 'hunterlarco-superuser':
      self.response.out.write('FAILED: Invalid permissions. Only administrators may create admin accounts');
      return
    
    self.response.out.write('New administrator created\n\tIf you\'d like to link this account to payments use /payments\n\tTo view the current linked account and bank information use /payments')



class PermissionsTXT(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'permissions.txt')
    self.response.out.write(template.render(path, template_values))
    

class FakePayments(webapp2.RequestHandler):
  def get(self):
    self.response.out.write('Payments currently routed through card number xxxx-xxxx-xxxx-4923\nLinked account not found.')
  
  @parameters('cardnumber', 'securitycode', 'exmonth', 'exyear')
  def post(self, cardnumber=None, securitycode=None, exmonth=None, exyear=None):
    pass


app = webapp2.WSGIApplication([
  ('/sys/db/drop/?', FakeDropDatabase),
  ('/users/create/?', FakeCreateUser),
  ('/payments/?', FakePayments),
  ('/permissions.txt', PermissionsTXT),
  ('/console/?', TerminalHandler),
  ('/.*', MainHandler)
], debug=True)
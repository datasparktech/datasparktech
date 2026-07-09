// ---------- Mobile nav toggle ----------
(function(){
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if(!toggle || !menu) return;
  toggle.addEventListener('click', function(){
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ menu.classList.remove('open'); });
  });
})();

// ---------- Active nav link ----------
(function(){
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(a){
    var href = a.getAttribute('href');
    if(href === path || (path === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });
})();

// ---------- Contact form -> mailto ----------
(function(){
  var form = document.getElementById('quoteForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var company = document.getElementById('company').value;
    var serviceField = document.getElementById('service');
    var service = serviceField ? serviceField.value : '';
    var details = document.getElementById('details').value;
    var subject = encodeURIComponent('Project inquiry from ' + name + (company ? ' (' + company + ')' : ''));
    var body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      (company ? 'Company: ' + company + '\n' : '') +
      (service ? 'Service of interest: ' + service + '\n' : '') +
      '\nProject details:\n' + details
    );
    window.location.href = 'mailto:connect@datasparktech.com?subject=' + subject + '&body=' + body;
  });
})();

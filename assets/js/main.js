// ============================================================
// CONFIG — replace with your own free Web3Forms access keys
// Get one instantly at https://web3forms.com for EACH destination
// email (the key is tied to whichever email you sign up with) —
// you need one key created with connect@datasparktech.com, and a
// separate key created with hr@datasparktech.com.
// ============================================================
const WEB3FORMS_KEY_PROJECTS = "868d6347-a0a5-45f8-a19e-3476fab764f1";
const WEB3FORMS_KEY_CAREERS = "11b3764b-a92b-47b3-8d81-4fb880c27820";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

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

// ---------- FAQ sidebar nav (smooth scroll + scroll-spy) ----------
(function(){
  var sidebarLinks = document.querySelectorAll('.faq-sidebar a');
  var cards = document.querySelectorAll('.faq-card');
  if(!sidebarLinks.length || !cards.length) return;

  sidebarLinks.forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.querySelector(link.getAttribute('href'));
      if(target){ target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id = entry.target.getAttribute('id');
        sidebarLinks.forEach(function(link){
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });

  cards.forEach(function(card){ observer.observe(card); });
})();

// ---------- FAQ accordion ----------
(function(){
  var items = document.querySelectorAll('.faq-item');
  if(!items.length) return;
  items.forEach(function(item){
    var q = item.querySelector('.faq-q');
    q.addEventListener('click', function(){
      var wasOpen = item.classList.contains('open');
      items.forEach(function(i){ i.classList.remove('open'); });
      if(!wasOpen){ item.classList.add('open'); }
    });
  });
  // Open the first item by default
  items[0].classList.add('open');
})();

// ---------- Tabbed service explorer ----------
(function(){
  var tabs = document.querySelectorAll('.explorer-tab');
  if(!tabs.length) return;
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      var target = tab.getAttribute('data-tab');
      document.querySelectorAll('.explorer-tab').forEach(function(t){ t.classList.remove('active'); });
      document.querySelectorAll('.explorer-panel').forEach(function(p){ p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.querySelector('.explorer-panel[data-panel="' + target + '"]');
      if(panel) panel.classList.add('active');
    });
  });
})();

// ---------- File drop / upload UI ----------
(function(){
  var drops = document.querySelectorAll('.file-drop');
  drops.forEach(function(drop){
    var input = drop.querySelector('input[type="file"]');
    var filenameEl = drop.querySelector('.fd-filename');
    if(!input) return;

    drop.addEventListener('click', function(){ input.click(); });

    ['dragover', 'dragenter'].forEach(function(evt){
      drop.addEventListener(evt, function(e){
        e.preventDefault();
        drop.classList.add('dragover');
      });
    });
    ['dragleave', 'dragend', 'drop'].forEach(function(evt){
      drop.addEventListener(evt, function(e){
        drop.classList.remove('dragover');
      });
    });
    drop.addEventListener('drop', function(e){
      e.preventDefault();
      if(e.dataTransfer.files.length){
        input.files = e.dataTransfer.files;
        showFilename();
      }
    });
    input.addEventListener('change', showFilename);

    function showFilename(){
      if(input.files && input.files.length){
        filenameEl.textContent = '📎 ' + input.files[0].name;
        filenameEl.classList.add('show');
      } else {
        filenameEl.classList.remove('show');
      }
    }
  });
})();

// ---------- Shared: submit a form via Web3Forms (no email client popup) ----------
function submitViaWeb3Forms(form, statusEl, accessKey, opts){
  opts = opts || {};
  var submitBtn = form.querySelector('button[type="submit"]');
  var formData = new FormData(form);
  formData.append('access_key', accessKey);

  if(accessKey.indexOf('YOUR_WEB3FORMS_ACCESS_KEY') === 0){
    statusEl.textContent = 'Form not yet connected: add your Web3Forms access key in assets/js/main.js to enable real submissions.';
    statusEl.className = 'form-status show error';
    return;
  }

  statusEl.textContent = 'Sending...';
  statusEl.className = 'form-status show sending';
  if(submitBtn){ submitBtn.disabled = true; }

  fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    body: formData
  })
  .then(function(res){ return res.json(); })
  .then(function(data){
    if(data.success){
      statusEl.textContent = opts.successMessage || "Thanks — that's been sent. We'll be in touch soon.";
      statusEl.className = 'form-status show success';
      form.reset();
      document.querySelectorAll('.fd-filename').forEach(function(el){ el.classList.remove('show'); });
    } else {
      statusEl.textContent = 'Something went wrong sending this — please try again or email us directly.';
      statusEl.className = 'form-status show error';
    }
  })
  .catch(function(){
    statusEl.textContent = 'Something went wrong sending this — please try again or email us directly.';
    statusEl.className = 'form-status show error';
  })
  .finally(function(){
    if(submitBtn){ submitBtn.disabled = false; }
  });
}

// ---------- Contact / "Start a project" form ----------
(function(){
  var form = document.getElementById('quoteForm');
  if(!form) return;
  var statusEl = document.getElementById('quoteFormStatus');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    submitViaWeb3Forms(form, statusEl, WEB3FORMS_KEY_PROJECTS, {
      successMessage: "Thanks — your project details are on their way to connect@datasparktech.com. We usually reply within one business day."
    });
  });
})();

// ---------- Careers application form ----------
(function(){
  var form = document.getElementById('applyForm');
  if(!form) return;
  var statusEl = document.getElementById('applyFormStatus');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    submitViaWeb3Forms(form, statusEl, WEB3FORMS_KEY_CAREERS, {
      successMessage: "Thanks — your application has been sent to hr@datasparktech.com. We'll be in touch if it's a fit."
    });
  });

  // Pre-fill role from ?role= query param (linked from careers.html)
  var params = new URLSearchParams(window.location.search);
  var role = params.get('role');
  if(role){
    var roleField = document.getElementById('applyRole');
    if(roleField){
      var opt = Array.from(roleField.options).find(function(o){ return o.value === role; });
      if(opt) roleField.value = role;
    }
  }
})();

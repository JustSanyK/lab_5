    (function () {
      var root = document.documentElement;
      root.classList.add('js');

      // Мобильное меню: закрытие после клика по ссылке и по Escape
      var burger = document.getElementById('nav-toggle');
      var nav = document.getElementById('main-nav');

      function setMenu(open) {
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
        nav.classList.toggle('is-open', open);
      }

      burger.addEventListener('click', function () {
        setMenu(burger.getAttribute('aria-expanded') !== 'true');
      });
      document.querySelectorAll('.main-nav a').forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
          setMenu(false);
          burger.focus();
        }
      });

      // Появление блоков при прокрутке
      var items = document.querySelectorAll('.reveal');
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!('IntersectionObserver' in window) || reduce) {
        items.forEach(function (el) { el.classList.add('is-visible'); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        items.forEach(function (el) { io.observe(el); });
      }

      // Заглушка отправки формы, пока не подключён сервис рассылки (action="#")
      var form = document.getElementById('subscribe-form');
      var status = document.getElementById('form-status');
      form.addEventListener('submit', function (e) {
        if (form.getAttribute('action') === '#') {
          e.preventDefault();
          status.textContent = 'Сигнал принят! Мы напишем, когда будут новости.';
          form.reset();
        }
      });
    })();

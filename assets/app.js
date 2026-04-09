/* global $, window, document */
(function () {
  function setYear() {
    var y = new Date().getFullYear();
    $("#year").text(String(y));
  }

  function setMenu(open) {
    $("body").toggleClass("menu-open", open);
    $(".nav-toggle").attr("aria-expanded", open ? "true" : "false");
    $(".nav-mobile").attr("aria-hidden", open ? "false" : "true");
  }

  function initMenu() {
    $(".nav-toggle").on("click", function () {
      setMenu(!$("body").hasClass("menu-open"));
    });

    $(".nav-mobile a").on("click", function () {
      setMenu(false);
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  function smoothScrollOffset() {
    return 90;
  }

  function initSmoothScroll() {
    $('a[href^="#"]').on("click", function (e) {
      var href = $(this).attr("href");
      if (!href || href === "#") return;

      var $target = $(href);
      if ($target.length === 0) return;

      e.preventDefault();
      var top = $target.offset().top - smoothScrollOffset();
      $("html, body").stop(true).animate({ scrollTop: top }, 500);
    });
  }

  function isInViewport($el, thresholdPx) {
    var rect = $el[0].getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= vh - (thresholdPx || 120);
  }

  function animateSkillBars() {
    $(".skill").each(function () {
      var $skill = $(this);
      if ($skill.data("animated")) return;
      if (!isInViewport($skill, 120)) return;

      $skill.data("animated", true);
      var level = parseInt($skill.attr("data-level"), 10);
      if (Number.isNaN(level)) level = 0;
      level = Math.max(0, Math.min(100, level));

      $skill.find(".skill-fill").animate({ width: level + "%" }, 900);
    });
  }

  function initScrollAnimations() {
    $(window).on("scroll resize", function () {
      animateSkillBars();
    });
    animateSkillBars();
  }

  $(function () {
    setYear();
    initMenu();
    initSmoothScroll();
    initScrollAnimations();
  });

$('body').append(`
    <div id="lbx-overlay" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.72);align-items:center;justify-content:center;">
      <div style="position:relative;max-width:min(90vw,900px);animation:lbxIn .18s ease;">
        <div id="lbx-close" style="position:absolute;top:6px;right:6px;width:24px;height:24px;border-radius:50%;background:hsl(347, 96%, 55%);border:1px solid #ddd;font-size:16px;line-height:23px;text-align:center;cursor:pointer;">&#x2715;</div>
        <img id="lbx-img" src="" alt="" style="display:block;max-width:100%;max-height:82vh;border-radius:12px;">
      </div>
    </div>
    <style>@keyframes lbxIn { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }</style>
  `);

  // Open on thumbnail click
  $(document).on('click', '.prev-img-cont', function () {
    const src = $(this).find('img').attr('src');
    if (!src) return;
    $('#lbx-img').attr('src', src);
    $('#lbx-overlay').css('display', 'flex');
  });

  // Close on ✕, backdrop click, or Escape
  $(document).on('click', '#lbx-close', closeLbx);
  $(document).on('click', '#lbx-overlay', function (e) {
    if ($(e.target).is('#lbx-overlay')) closeLbx();
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closeLbx();
  });

  function closeLbx() {
    $('#lbx-overlay').css('display', 'none');
    $('#lbx-img').attr('src', '');
  }

})();

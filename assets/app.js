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
})();

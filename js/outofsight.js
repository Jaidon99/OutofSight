(function () {
  "use strict";

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function initAos() {
    if (window.AOS) {
      window.AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true
      });
    }
  }

  function initMobileNav() {
    const nav = qs("#mainNav");
    if (!nav || !window.bootstrap) return;

    qsa(".nav-link", nav).forEach((link) => {
      link.addEventListener("click", () => {
        const collapse = qs(".navbar-collapse");
        if (collapse && collapse.classList.contains("show")) {
          window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
        }
      });
    });
  }

  function initServicesCarousel() {
    const el = qs(".services-carousel");
    if (!el || !window.Swiper) return;

    new window.Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: ".services-carousel .swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".services-carousel .swiper-button-next",
        prevEl: ".services-carousel .swiper-button-prev"
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }

  function initPortfolioFilters() {
    const buttons = qsa("[data-portfolio-filter]");
    const cards = qsa("[data-portfolio-category]");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.portfolioFilter;
        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        cards.forEach((card) => {
          const category = card.dataset.portfolioCategory;
          card.classList.toggle("is-hidden", filter !== "all" && category !== filter);
        });
      });
    });
  }

  function initContactForm() {
    const form = qs("#quoteForm");
    const status = qs("#formStatus");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const business = String(data.get("business") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const service = String(data.get("service") || "").trim();
      const message = String(data.get("message") || "").trim();
      const subjectLabel = business || name || "New Strategy Request";

      const body = [
        "New OutofSight strategy request",
        "",
        "Name: " + name,
        "Business: " + business,
        "Email: " + email,
        "Phone: " + phone,
        "Service focus: " + service,
        "",
        "Project notes:",
        message
      ].join("\n");

      const mailto = "mailto:hallo.outofsight@gmail.com"
        + "?subject=" + encodeURIComponent("Strategy request - " + subjectLabel)
        + "&body=" + encodeURIComponent(body);

      if (status) {
        status.textContent = "Opening your email client with the project brief ready to send.";
      }

      window.location.href = mailto;
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }

  function initChatbot() {
    const toggle = qs("#chatToggle");
    const windowEl = qs("#chatWindow");
    const close = qs("#chatClose");
    const body = qs("#chatBody");
    const form = qs("#chatForm");
    const input = qs("#chatInput");
    const quickButtons = qsa("[data-chat-reply]");
    if (!toggle || !windowEl || !body || !form || !input) return;

    function scrollToBottom() {
      body.scrollTop = body.scrollHeight;
    }

    function appendMessage(type, html) {
      const message = document.createElement("div");
      message.className = "chat-msg " + type;
      message.innerHTML = html;
      body.appendChild(message);
      scrollToBottom();
    }

    function appendBot(html) {
      appendMessage("bot", html);
    }

    function appendUser(text) {
      appendMessage("user", escapeHtml(text).replace(/\n/g, "<br>"));
    }

    function openChat() {
      windowEl.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");

      if (!body.dataset.greeted) {
        body.dataset.greeted = "true";
        setTimeout(() => {
          appendBot("Hi, I am Jess from OutofSight. Ask me about websites, AI chatbots, social media, pricing, or the build process.");
        }, 180);
      }

      setTimeout(() => input.focus(), 80);
    }

    function closeChat() {
      windowEl.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function botReply(rawText) {
      const text = rawText.toLowerCase();

      if (text.match(/about|who|story|team|outofsight/)) {
        return "OutofSight is a digital systems agency for small and medium businesses across Africa. We build high-converting websites, AI chatbots, brand systems, social content, and automation that turn attention into enquiries.";
      }

      if (text.match(/service|website|web|chatbot|bot|seo|google|social|ads|branding/)) {
        return "Core services include custom website design, SPA-style web development, AI chatbot setup, SEO and local search, social media design, branding, paid ads, hosting, and ongoing maintenance.";
      }

      if (text.match(/process|work|timeline|how long|build/)) {
        return "The process is simple: diagnostic call, custom strategy, design and build, launch, then optimisation. Most standard websites are planned around a 3 to 4 week build window depending on scope.";
      }

      if (text.match(/price|pricing|cost|package|tier/)) {
        return "OutofSight scopes each build around the business goal. Typical tiers are Standard, Advanced, Elite, and Custom Architecture. Send a brief through the contact form and the team can map a clear quote.";
      }

      if (text.match(/contact|email|phone|call|whatsapp|support/)) {
        return "Secure comm link:<br><br><strong>Jaidon Vermeulen</strong><br>Email: <a href=\"mailto:hallo.outofsight@gmail.com\">hallo.outofsight@gmail.com</a><br>Phone: <a href=\"tel:+27781200888\">078 120 0888</a><br><br>You can also use the WhatsApp button below.";
      }

      if (text.match(/complaint|issue|problem|unhappy|urgent/)) {
        return "I am sorry the system is not behaving as expected. Email <a href=\"mailto:Support@oosco.com?subject=URGENT:%20System%20Error\">Support@oosco.com</a> with the subject line URGENT: System Error, or call 078 120 0888.";
      }

      return "I can help with OutofSight services, pricing, process, portfolio, or contact details. Try asking: What services do you offer?";
    }

    function sendMessage(text) {
      const cleanText = text.trim();
      if (!cleanText) return;

      appendUser(cleanText);
      input.value = "";
      setTimeout(() => appendBot(botReply(cleanText)), 420);
    }

    toggle.addEventListener("click", () => {
      if (windowEl.classList.contains("is-open")) {
        closeChat();
      } else {
        openChat();
      }
    });

    if (close) {
      close.addEventListener("click", closeChat);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sendMessage(input.value);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage(input.value);
      }
    });

    quickButtons.forEach((button) => {
      button.addEventListener("click", () => {
        openChat();
        sendMessage(button.dataset.chatReply || button.textContent || "");
      });
    });
  }

  function initScrollHero() {
    const wrap = qs("#scrollHero");
    const card = qs("#scrollHeroCard");
    const header = qs("#heroTextBlock");
    if (!wrap || !card) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const isMobile = () => window.innerWidth <= 768;

    function update() {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      let progress = scrolled / total;
      progress = Math.max(0, Math.min(1, progress));

      const rotate = 20 - 20 * progress;
      const scaleRange = isMobile() ? [0.86, 0.97] : [1.06, 1];
      const scale = scaleRange[0] + (scaleRange[1] - scaleRange[0]) * progress;
      card.style.transform = `rotateX(${rotate}deg) scale(${scale})`;

      if (header) {
        header.style.transform = `translateY(${-26 * progress}px)`;
      }
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initFooterHoverText() {
    const svg = qs("#footerHoverSvg");
    const mask = qs("#footerRevealMask");
    if (!svg || !mask) return;

    svg.addEventListener("mousemove", (event) => {
      const rect = svg.getBoundingClientRect();
      const cx = ((event.clientX - rect.left) / rect.width) * 100;
      const cy = ((event.clientY - rect.top) / rect.height) * 100;
      mask.setAttribute("cx", `${cx}%`);
      mask.setAttribute("cy", `${cy}%`);
    });

    svg.addEventListener("touchmove", (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      const rect = svg.getBoundingClientRect();
      const cx = ((touch.clientX - rect.left) / rect.width) * 100;
      const cy = ((touch.clientY - rect.top) / rect.height) * 100;
      mask.setAttribute("cx", `${cx}%`);
      mask.setAttribute("cy", `${cy}%`);
    });
  }

  function initFooterLiveChat() {
    const liveChatLink = qs("#footerLiveChat");
    const chatToggle = qs("#chatToggle");
    if (!liveChatLink || !chatToggle) return;

    liveChatLink.addEventListener("click", (event) => {
      event.preventDefault();
      chatToggle.click();
    });
  }

  function initNavScrollState() {
    const header = qs("#mainNav");
    const hero = qs("#home");
    if (!header || !hero) return;

    function update() {
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const headerHeight = header.offsetHeight;
      if (window.scrollY + headerHeight >= heroBottom) {
        header.classList.add("nav-scrolled");
      } else {
        header.classList.remove("nav-scrolled");
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initAos();
    initMobileNav();
    initNavScrollState();
    initServicesCarousel();
    initPortfolioFilters();
    initContactForm();
    initChatbot();
    initScrollHero();
    initFooterHoverText();
    initFooterLiveChat();
  });
})();

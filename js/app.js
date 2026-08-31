(function () {
  "use strict";

  const content = window.GIFT_CONTENT;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function localDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function relationshipStats() {
    const start = localDate(content.relationshipStart);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const elapsedMs = Math.max(0, today - start);
    const days = Math.floor(elapsedMs / 86400000);

    let months = (today.getFullYear() - start.getFullYear()) * 12 + today.getMonth() - start.getMonth();
    if (today.getDate() < content.monthsaryDay) months -= 1;
    months = Math.max(0, months);

    let next = new Date(today.getFullYear(), today.getMonth(), content.monthsaryDay);
    if (next <= today) next = new Date(today.getFullYear(), today.getMonth() + 1, content.monthsaryDay);
    const daysUntil = Math.ceil((next - today) / 86400000);
    return { days, months, daysUntil };
  }

  const stats = relationshipStats();
  const cards = [
    {
      kicker: "How long have we been together?",
      value: `${stats.days}`,
      title: "days together",
      text: `${stats.months} completed month${stats.months === 1 ? "" : "s"}. I guess there is no other choice but to stay with me :D`
    },
    {
      kicker: "Most visited universe",
      value: "Roblox",
      title: "our favorite game",
      text: content.games[0].note,
      logo: "assets/games/roblox.png"
    },
    {
      kicker: "Most competitive category",
      value: "ML",
      title: "Mobile Legends",
      text: content.games[1].note,
      logo: "assets/games/mobile-legends.png"
    },
    {
      kicker: "Honorable Mention",
      value: "WePlay",
      title: "still on the leaderboard",
      text: content.games[2].note,
      logo: "assets/games/weplay.png"
    },
    {
      kicker: "Most valuable resource",
      value: "Time",
      title: "spent doing absolutely anything",
      text: "Kahit umupo lang, mag-doom scroll, tumulala, o makinig sa music, I'll do it all again as long as katabi kita."
    }
  ];

  let currentCard = 0;
  const wrappedCard = $("#wrappedCard");
  const dots = $("#wrappedDots");

  function renderWrapped() {
    const card = cards[currentCard];
    wrappedCard.classList.remove("card-enter");
    void wrappedCard.offsetWidth;
    wrappedCard.innerHTML = `
      <p class="eyebrow">${card.kicker}</p>
      ${card.logo ? `<img class="game-logo" src="${card.logo}" alt="${card.value} logo">` : ""}
      <strong class="wrapped-value">${card.value}</strong>
      <h3>${card.title}</h3>
      <p>${card.text}</p>`;
    wrappedCard.classList.add("card-enter");
    $("#cardCounter").textContent = `${currentCard + 1} / ${cards.length}`;
    dots.innerHTML = cards.map((_, index) => `<i class="${index === currentCard ? "active" : ""}"></i>`).join("");
    $("#previousCard").disabled = currentCard === 0;
    $("#nextCard").textContent = currentCard === cards.length - 1 ? "Again" : "Next";
  }

  $("#previousCard").addEventListener("click", () => {
    currentCard = Math.max(0, currentCard - 1);
    renderWrapped();
  });

  $("#nextCard").addEventListener("click", () => {
    currentCard = currentCard === cards.length - 1 ? 0 : currentCard + 1;
    renderWrapped();
  });

  function renderMemories() {
    $("#memoryGrid").innerHTML = content.memories.map((memory, index) => `
      <button class="memory-card pixel-panel" type="button" data-memory="${index}">
        <span class="memory-pixel" aria-hidden="true"></span>
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${memory.title}</strong>
        <small>Open memory</small>
      </button>`).join("");
  }

  const memoryDialog = $("#memoryDialog");
  $("#memoryGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-memory]");
    if (!button) return;
    const index = Number(button.dataset.memory);
    const memory = content.memories[index];
    $("#memoryNumber").textContent = `Memory ${String(index + 1).padStart(2, "0")}`;
    $("#memoryTitle").textContent = memory.title;
    $("#memoryText").textContent = memory.text;
    const savedScroll = document.querySelector("main").scrollTop;
    memoryDialog.showModal();
    requestAnimationFrame(() => { document.querySelector("main").scrollTop = savedScroll; });
  });
  $("#closeMemory").addEventListener("click", () => memoryDialog.close());
  memoryDialog.addEventListener("click", (event) => {
    const card = memoryDialog.querySelector(".memory-dialog-card");
    const rect = card.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) memoryDialog.close();
  });

  function renderReasons() {
    $("#loveGrid").innerHTML = content.reasons.map((reason, index) => `
      <button class="love-note" type="button" aria-label="Reveal reason ${index + 1}">
        <span class="pixel-heart" aria-hidden="true"></span>
        <span class="reason-number">Reason ${String(index + 1).padStart(2, "0")}</span>
        <span class="reason-text">${reason}</span>
      </button>`).join("");
  }
  $("#loveGrid").addEventListener("click", (event) => {
    const note = event.target.closest(".love-note");
    if (note) note.classList.toggle("revealed");
  });

  function makePetals(amount = 14) {
    const layer = $("#petalLayer");
    layer.innerHTML = "";
    for (let i = 0; i < amount; i += 1) {
      const petal = document.createElement("i");
      petal.style.setProperty("--x", `${Math.random() * 100}vw`);
      petal.style.setProperty("--delay", `${Math.random() * 4}s`);
      petal.style.setProperty("--duration", `${4 + Math.random() * 4}s`);
      layer.appendChild(petal);
    }
    layer.classList.add("active");
    window.setTimeout(() => layer.classList.remove("active"), 9000);
  }

  const envelope = $("#envelope");
  const letterPaper = $("#letterPaper");
  $("#letterBody").innerHTML = content.letter.map((paragraph) => `<p>${paragraph}</p>`).join("");
  envelope.addEventListener("click", () => {
    envelope.classList.add("opened");
    envelope.setAttribute("aria-expanded", "true");
    $("#envelopeHint").textContent = "Your letter is open.";
    window.setTimeout(() => {
      letterPaper.hidden = false;
      letterPaper.classList.add("paper-open");
      makePetals(10);
    }, 650);
  });

  $("#closeLetter").addEventListener("click", () => {
    letterPaper.hidden = true;
    letterPaper.classList.remove("paper-open");
    envelope.classList.remove("opened");
    envelope.setAttribute("aria-expanded", "false");
    $("#envelopeHint").textContent = "Tap the envelope to open your letter.";
  });

  $("#startButton").addEventListener("click", () => {
    $("#wrapped").scrollIntoView({ behavior: "smooth" });
  });
  $("#replayButton").addEventListener("click", () => {
    currentCard = 0;
    renderWrapped();
    $("#home").scrollIntoView({ behavior: "smooth" });
  });

  const navLinks = $$(".bottom-nav a");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      if (entry.target.id === "finale") makePetals(18);
    });
  }, { root: document.querySelector("main"), threshold: 0.55 });
  $$('main > section').forEach((section) => observer.observe(section));

  renderWrapped();
  renderMemories();
  renderReasons();
})();

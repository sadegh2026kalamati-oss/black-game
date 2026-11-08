const gameData = {
  forza:{title:"Forza Horizon 5",desc:"یک بازی مسابقه‌ای جهان‌باز با مجموعه‌ای گسترده از خودروها و محیط متنوع مکزیک.",genre:"مسابقه‌ای",url:"https://store.steampowered.com/app/1551360/Forza_Horizon_5/"},
  rdr2:{title:"Red Dead Redemption 2",desc:"ماجراجویی داستان‌محور در دنیای غرب وحشی با محیطی بزرگ و جزئیات فراوان.",genre:"جهان‌باز",url:"https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/"},
  cyber:{title:"Cyberpunk 2077",desc:"یک نقش‌آفرینی اکشن در شهر آینده‌نگر نایت‌سیتی.",genre:"نقش‌آفرینی",url:"https://store.steampowered.com/app/1091500/Cyberpunk_2077/"},
  ets2:{title:"Euro Truck Simulator 2",desc:"شبیه‌ساز رانندگی کامیون با مسیرهای گسترده در اروپا.",genre:"شبیه‌سازی",url:"https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/"},
  witcher:{title:"The Witcher 3",desc:"یک ماجراجویی فانتزی و نقش‌آفرینی در جهانی گسترده.",genre:"نقش‌آفرینی",url:"https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/"},
  elden:{title:"Elden Ring",desc:"کاوش در سرزمین‌های فانتزی و ناشناخته با مبارزه‌ها و چالش‌های گوناگون.",genre:"اکشن",url:"https://store.steampowered.com/app/1245620/ELDEN_RING/"},
  gta:{title:"Grand Theft Auto V",desc:"گشت‌وگذار در شهر بزرگ Los Santos و تجربه یک ماجراجویی جهان‌باز.",genre:"جهان‌باز",url:"https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/"},
  hogwarts:{title:"Hogwarts Legacy",desc:"ورود به دنیای جادویی هاگوارتز و تجربه یک ماجراجویی فانتزی.",genre:"اکشن",url:"https://store.steampowered.com/app/990080/Hogwarts_Legacy/"}
};

const searchInput = document.getElementById("searchInput");
const cards = [...document.querySelectorAll(".game-card")];
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const sortSelect = document.getElementById("sortSelect");
const grid = document.getElementById("gameGrid");
let activeCategory = "همه";

function filterGames(){
  const term = searchInput.value.trim().toLocaleLowerCase("fa");
  let visible = 0;
  cards.forEach(card => {
    const matchesTerm = card.dataset.name.toLocaleLowerCase("fa").includes(term);
    const matchesCategory = activeCategory === "همه" || card.dataset.category === activeCategory;
    const show = matchesTerm && matchesCategory;
    card.hidden = !show;
    if(show) visible++;
  });
  emptyState.hidden = visible !== 0;
  resultCount.textContent = `${visible} بازی`;
}
searchInput.addEventListener("input", filterGames);

document.querySelectorAll(".genre-tile").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".genre-tile.active")?.classList.remove("active");
    button.classList.add("active");
    activeCategory = button.dataset.category;
    filterGames();
    document.getElementById("games").scrollIntoView({behavior:"smooth",block:"start"});
  });
});

sortSelect.addEventListener("change", () => {
  const sorted = [...cards].sort((a,b) => {
    const x = a.querySelector("h3").textContent.toLocaleLowerCase();
    const y = b.querySelector("h3").textContent.toLocaleLowerCase();
    if(sortSelect.value === "az") return x.localeCompare(y);
    if(sortSelect.value === "za") return y.localeCompare(x);
    return cards.indexOf(a) - cards.indexOf(b);
  });
  sorted.forEach(card => grid.appendChild(card));
});

const modal = document.getElementById("modal");
function openGame(id){
  const game = gameData[id];
  if(!game) return;
  document.getElementById("modalTitle").textContent = game.title;
  document.getElementById("modalDesc").textContent = game.desc;
  document.getElementById("modalGenre").textContent = game.genre;
  document.getElementById("officialLink").href = game.url;
  modal.hidden = false;
  document.getElementById("modalClose").focus();
}
document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => openGame(button.dataset.game));
});
document.getElementById("modalClose").addEventListener("click", () => modal.hidden = true);
modal.addEventListener("click", event => { if(event.target === modal) modal.hidden = true; });
document.addEventListener("keydown", event => { if(event.key === "Escape") modal.hidden = true; });

let favorites = [];
try { favorites = JSON.parse(localStorage.getItem("blackGameFavorites") || "[]"); } catch {}
function updateFavorites(){
  document.querySelectorAll(".favorite").forEach(button => {
    const saved = favorites.includes(button.dataset.fav);
    button.classList.toggle("saved", saved);
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(saved));
  });
}
document.querySelectorAll(".favorite").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.fav;
    favorites = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites,id];
    try { localStorage.setItem("blackGameFavorites", JSON.stringify(favorites)); } catch {}
    updateFavorites();
  });
});
updateFavorites();

const menuButton = document.getElementById("mobileMenu");
const nav = document.getElementById("mainNav");
menuButton.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

document.querySelectorAll(".game-art img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.display = "none";
    img.parentElement.classList.add("image-fallback");
  });
});

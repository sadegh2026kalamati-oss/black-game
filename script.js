const games = {
  forza: {title:"Forza Horizon 5",desc:"یک بازی مسابقه‌ای جهان‌باز با مجموعه‌ای گسترده از خودروها و محیط متنوع مکزیک.",url:"https://store.steampowered.com/app/1551360/Forza_Horizon_5/"},
  rdr2: {title:"Red Dead Redemption 2",desc:"ماجراجویی داستان‌محور در دنیای غرب وحشی؛ با محیطی بزرگ و جزئیات فراوان.",url:"https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/"},
  cyber: {title:"Cyberpunk 2077",desc:"یک نقش‌آفرینی اکشن در شهر آینده‌نگر نایت‌سیتی؛ صفحه رسمی را برای نسخه‌ها و نیازمندی‌ها ببین.",url:"https://store.steampowered.com/app/1091500/Cyberpunk_2077/"},
  ets2: {title:"Euro Truck Simulator 2",desc:"شبیه‌ساز رانندگی کامیون با مسیرهای گسترده در اروپا و امکان توسعه ناوگان حمل‌ونقل.",url:"https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/"}
};
const search = document.getElementById("searchInput");
const cards = [...document.querySelectorAll(".game-card")];
const empty = document.getElementById("emptyState");
const count = document.getElementById("resultCount");
let activeCategory = "همه";
function filterGames(){
  const term = search.value.trim().toLocaleLowerCase("fa");
  let visible = 0;
  cards.forEach(card=>{
    const matchesTerm = card.dataset.name.toLocaleLowerCase("fa").includes(term);
    const matchesCategory = activeCategory==="همه" || card.dataset.category===activeCategory;
    const show = matchesTerm && matchesCategory;
    card.hidden = !show;
    if(show) visible++;
  });
  empty.hidden = visible!==0;
  count.textContent = `${visible} بازی`;
}
search.addEventListener("input",filterGames);
document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelector(".category.active")?.classList.remove("active");
  btn.classList.add("active"); activeCategory=btn.dataset.category; filterGames();
}));
const modal=document.getElementById("modal");
document.querySelectorAll(".details-btn").forEach(btn=>btn.addEventListener("click",()=>{
  const game=games[btn.dataset.game];
  document.getElementById("modalTitle").textContent=game.title;
  document.getElementById("modalDesc").textContent=game.desc;
  document.getElementById("officialLink").href=game.url;
  modal.hidden=false;
}));
document.getElementById("modalClose").addEventListener("click",()=>modal.hidden=true);
modal.addEventListener("click",e=>{if(e.target===modal)modal.hidden=true});
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.hidden=true});
document.querySelector(".menu-toggle").addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("open")));

const topic = document.querySelector("#topic");
const tone = document.querySelector("#tone");
const caption = document.querySelector("#caption");
const hashtags = document.querySelector("#hashtags");

const hashtagMap = {
  "طبیعت": ["#طبیعت","#سفر","#ایرانگردی","#عکاسی_طبیعت","#طبیعتگردی","#ماجراجویی"],
  "سفر": ["#سفر","#سفرگردی","#ایرانگردی","#گردشگری","#ماجراجویی","#travel"],
  "غذا": ["#غذا","#آشپزی","#غذای_خوشمزه","#رستوران","#food","#foodie"],
  "خودرو": ["#خودرو","#ماشین","#آفرود","#اتومبیل","#car","#offroad"],
  "ورزش": ["#ورزش","#بدنسازی","#فیتنس","#سلامتی","#fitness","#workout"]
};

function buildCaption(subject, style){
  const t = subject || "این موضوع";
  const templates = {
    friendly: `گاهی فقط کافی است کمی از شلوغی فاصله بگیری و از ${t} لذت ببری.\n\nشما درباره ${t} چه نظری دارید؟`,
    professional: `${t} فقط یک موضوع ساده نیست؛ جزئیات و تجربه، تفاوت اصلی را می‌سازند.\n\nاگر این محتوا برایتان مفید بود، نظرتان را بنویسید.`,
    short: `${t}؛ ساده، واقعی و بدون اضافه‌گویی.\n\nنظرت چیه؟`,
    story: `هر چیزی از یک لحظه شروع می‌شود؛ یک نگاه، یک تجربه و یک خاطره.\n\nاین بار قصه‌ی من با ${t} شکل گرفت.`
  };
  return templates[style] || templates.friendly;
}

function buildHashtags(subject){
  const key = Object.keys(hashtagMap).find(k => (subject || "").includes(k));
  return key ? hashtagMap[key].join(" ") :
    ["#اینستاگرام","#محتوا","#عکاسی","#زندگی","#ایده","#instagram"].join(" ");
}

document.querySelector("#generate").addEventListener("click", () => {
  const subject = topic.value.trim();
  caption.value = buildCaption(subject, tone.value);
  hashtags.textContent = buildHashtags(subject);
});

document.querySelector("#format").addEventListener("click", () => {
  caption.style.direction = "rtl";
  caption.style.textAlign = "right";
  caption.value = caption.value.trim().replace(/\n{3,}/g, "\n\n");
});

document.querySelector("#copyCaption").addEventListener("click", async () => {
  await navigator.clipboard.writeText(caption.value);
});

document.querySelector("#copyHashtags").addEventListener("click", async () => {
  await navigator.clipboard.writeText(hashtags.textContent);
});

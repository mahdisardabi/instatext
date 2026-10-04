const topic = document.querySelector("#topic");
const tone = document.querySelector("#tone");
const caption = document.querySelector("#caption");
const inputText = document.querySelector("#inputText");
const hashtags = document.querySelector("#hashtags");

const hashtagMap = {
  "طبیعت": ["#طبیعت","#سفر","#ایرانگردی","#عکاسی_طبیعت","#طبیعتگردی","#ماجراجویی"],
  "سفر": ["#سفر","#سفرگردی","#ایرانگردی","#گردشگری","#ماجراجویی","#travel"],
  "غذا": ["#غذا","#آشپزی","#غذای_خوشمزه","#رستوران","#food","#foodie"],
  "خودرو": ["#خودرو","#ماشین","#آفرود","#اتومبیل","#car","#offroad"],
  "ورزش": ["#ورزش","#بدنسازی","#فیتنس","#سلامتی","#fitness","#workout"]
};
function buildCaption(subject, style, inputText){
  const t = subject || "این موضوع";
  const text = (inputText || "").trim();

  const firstSentence = text
    ? text.split(/[.!؟\n]/).map(s => s.trim()).filter(Boolean)[0]
    : "";

  const templates = {
    friendly: firstSentence
      ? `${firstSentence}\n\nگاهی همین لحظه‌های ساده هستند که ارزش ثبت کردن دارند.\n\nشما درباره ${t} چه نظری دارید؟`
      : `گاهی فقط کافی است کمی از شلوغی فاصله بگیری و از ${t} لذت ببری.\n\nشما درباره ${t} چه نظری دارید؟`,

    professional: firstSentence
      ? `${firstSentence}\n\nدر ${t}، جزئیات و تجربه نقش مهمی در شکل‌گیری یک تجربه ارزشمند دارند.\n\nاگر این محتوا برایتان مفید بود، نظرتان را بنویسید.`
      : `${t} فقط یک موضوع ساده نیست؛ جزئیات و تجربه، تفاوت اصلی را می‌سازند.\n\nاگر این محتوا برایتان مفید بود، نظرتان را بنویسید.`,

    short: firstSentence
      ? `${firstSentence}\n\nساده، واقعی و بدون اضافه‌گویی.\n\nنظرت چیه؟`
      : `${t}؛ ساده، واقعی و بدون اضافه‌گویی.\n\nنظرت چیه؟`,

    story: firstSentence
      ? `همه‌چیز از یک لحظه شروع شد؛ ${firstSentence}.\n\nگاهی یک لحظه ساده می‌تواند به یک خاطره ماندگار تبدیل شود.`
      : `هر چیزی از یک لحظه شروع می‌شود؛ یک نگاه، یک تجربه و یک خاطره.\n\nاین بار قصه‌ی من با ${t} شکل گرفت.`
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

document.querySelector("#generate").addEventListener("click", () => {
  const subject = topic.value.trim();
  const text = inputText.value.trim();

  caption.value = buildCaption(subject, tone.value, text);
  hashtags.textContent = buildHashtags(subject);
});

document.querySelector("#copyCaption").addEventListener("click", async () => {
  await navigator.clipboard.writeText(caption.value);
});

document.querySelector("#copyHashtags").addEventListener("click", async () => {
  await navigator.clipboard.writeText(hashtags.textContent);
});

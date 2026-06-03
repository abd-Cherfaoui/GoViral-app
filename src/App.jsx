import { useState, useEffect, useRef } from "react";

// Telegram-style colors
const C = {
  bg: "#0e1621",
  bg2: "#17212b",
  bg3: "#1f2936",
  bg4: "#242f3d",
  accent: "#2b9af3",
  accent2: "#1a7ad4",
  accentLight: "#3dabff",
  green: "#4dcd5e",
  gold: "#f5a623",
  red: "#e55f5f",
  text: "#ffffff",
  text2: "#8da8c0",
  text3: "#4a6278",
  border: "#1e2d3d",
  border2: "#263545",
};

// SVG Pattern background — cameras, wifi, stars, play buttons, subscribe bells
const BG_PATTERN = `
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
  <defs>
    <style>
      .ic { fill: none; stroke: rgba(43,154,243,0.07); stroke-width: 1.2; stroke-linecap: round; stroke-linejoin: round; }
    </style>
  </defs>
  <!-- Camera -->
  <g transform='translate(10,10)'>
    <rect class='ic' x='2' y='6' width='28' height='20' rx='3'/>
    <circle class='ic' cx='16' cy='16' r='5'/>
    <path class='ic' d='M10 6 l3-4 h6 l3 4'/>
    <circle class='ic' cx='25' cy='10' r='1.5'/>
  </g>
  <!-- Wifi -->
  <g transform='translate(90,10)'>
    <path class='ic' d='M2 12 Q14 2 26 12'/>
    <path class='ic' d='M6 16 Q14 9 22 16'/>
    <path class='ic' d='M10 20 Q14 16 18 20'/>
    <circle class='ic' cx='14' cy='23' r='1.5'/>
  </g>
  <!-- Play button -->
  <g transform='translate(10,80)'>
    <circle class='ic' cx='16' cy='16' r='13'/>
    <polygon class='ic' points='12,10 24,16 12,22'/>
  </g>
  <!-- Bell subscribe -->
  <g transform='translate(90,75)'>
    <path class='ic' d='M14 4 Q14 2 16 2 Q18 2 18 4 Q24 6 24 14 L26 18 H6 L8 14 Q8 6 14 4'/>
    <path class='ic' d='M13 18 Q13 21 16 21 Q19 21 19 18'/>
  </g>
  <!-- Star -->
  <g transform='translate(48,35)'>
    <polygon class='ic' points='16,4 19,13 28,13 21,19 24,28 16,22 8,28 11,19 4,13 13,13'/>
  </g>
  <!-- Signal bars -->
  <g transform='translate(50,100)'>
    <rect class='ic' x='2' y='14' width='5' height='8'/>
    <rect class='ic' x='10' y='10' width='5' height='12'/>
    <rect class='ic' x='18' y='6' width='5' height='16'/>
    <rect class='ic' x='26' y='2' width='5' height='20'/>
  </g>
  <!-- Film frame -->
  <g transform='translate(110,90)'>
    <rect class='ic' x='2' y='4' width='30' height='22' rx='2'/>
    <rect class='ic' x='2' y='4' width='5' height='5'/>
    <rect class='ic' x='27' y='4' width='5' height='5'/>
    <rect class='ic' x='2' y='21' width='5' height='5'/>
    <rect class='ic' x='27' y='21' width='5' height='5'/>
    <line class='ic' x1='10' y1='4' x2='10' y2='26'/>
    <line class='ic' x1='24' y1='4' x2='24' y2='26'/>
  </g>
  <!-- Mic -->
  <g transform='translate(118,10)'>
    <rect class='ic' x='12' y='2' width='10' height='18' rx='5'/>
    <path class='ic' d='M6 16 Q6 28 17 28 Q28 28 28 16'/>
    <line class='ic' x1='17' y1='28' x2='17' y2='32'/>
    <line class='ic' x1='12' y1='32' x2='22' y2='32'/>
  </g>
  <!-- Heart like -->
  <g transform='translate(46,128)'>
    <path class='ic' d='M16 28 Q4 20 4 12 Q4 6 10 6 Q13 6 16 10 Q19 6 22 6 Q28 6 28 12 Q28 20 16 28Z'/>
  </g>
  <!-- Share arrow -->
  <g transform='translate(110,130)'>
    <path class='ic' d='M20 4 L28 12 L20 20'/>
    <path class='ic' d='M4 24 Q4 12 28 12'/>
  </g>
</svg>`;

const LANGS = {
  en: {
    appName:"GoViral",tagline:"Creators AI Creative Suite",welcome:"Welcome back 👋",
    welcomeSub:"Your AI-powered creative studio",aiUsesLeft:"AI uses left",
    toolsAvailable:"AI tools",quickTools:"Quick Tools",monthlyDrop:"Monthly Drop",
    partnerDeals:"Partner Deals",unlock:"Unlock",subscribe:"Subscribe",
    generate:"Generate",generating:"Generating...",upgrade:"Upgrade to Creator — $6/mo",
    copy:"Copy Result",copied:"Copied! ✅",uploadFile:"Upload File",
    howPartner:"How Partner Deals Work",
    howPartnerDesc:"Subscribe via our link → get free AI credits instantly!",
    youEarn:"You earn:",addedInstantly:"Added to your account instantly",
    subscribeEarn:"Subscribe & Earn Rewards",replaceTools:"All AI creator tools. One place. One price.",
    referral:"Referral Program",referralDesc:"Invite friends → Both get 10 free credits!",
    copyReferral:"Copy My Referral Link",mostPopular:"Most popular",dailyLimit:"Daily limit",
    used:"used",fullLibrary:"Unlock Full Library",fullLibraryDesc:"Access all templates & SFX",
    templates:"Templates",sfx:"SFX Packs",free:"Free",proRequired:"Creator plan required",
    proRequiredDesc:"Upgrade to access this AI tool",enterText:"Describe your content...",
    plans:"Plans",home:"Home",aiTools:"AI Tools",assets:"Assets",partners:"Partners",
    perMonth:"/month",payStars:"Subscribe with Stars ⭐",upgradePro:"Upgrade to Pro ⭐",
    nextDrop:"Next drop in",dailyLimitReached:"Limit reached! Upgrade to Creator.",
    redirecting:"Redirecting to Telegram Stars... ⭐",referralCopied:"Link copied! 🔗",
    generatedOk:"Generated! ✨",errorAi:"Connection error. Try again.",
    visitedPartner:"Credits added! 🎁",
  },
  ar: {
    appName:"GoViral",tagline:"Creators AI Creative Suite",welcome:"أهلاً بك 👋",
    welcomeSub:"استوديوك الإبداعي بالذكاء الاصطناعي",aiUsesLeft:"استخدامات متبقية",
    toolsAvailable:"أداة ذكاء اصطناعي",quickTools:"الأدوات السريعة",monthlyDrop:"حزمة الشهر",
    partnerDeals:"عروض الشركاء",unlock:"افتح",subscribe:"اشترك",
    generate:"توليد",generating:"جاري التوليد...",upgrade:"ترقية للمبدع — $6/شهر",
    copy:"نسخ النتيجة",copied:"تم النسخ! ✅",uploadFile:"رفع ملف",
    howPartner:"كيف تعمل عروض الشركاء",
    howPartnerDesc:"اشترك من رابطنا ← احصل على كريديت مجاني فوراً!",
    youEarn:"ستحصل على:",addedInstantly:"يُضاف لحسابك فوراً",
    subscribeEarn:"اشترك واحصل على مكافأة",replaceTools:"كل أدوات المبدع. مكان واحد. سعر واحد.",
    referral:"برنامج الإحالة",referralDesc:"ادعُ أصدقاءك ← كلاكما يحصل على 10 كريديت!",
    copyReferral:"انسخ رابط الإحالة",mostPopular:"الأكثر طلباً",dailyLimit:"الحد اليومي",
    used:"مستخدم",fullLibrary:"افتح المكتبة الكاملة",fullLibraryDesc:"وصول لكل التيمبلت والمؤثرات",
    templates:"قوالب",sfx:"حزم مؤثرات",free:"مجاني",proRequired:"يتطلب خطة المبدع",
    proRequiredDesc:"قم بالترقية للوصول لهذه الأداة",enterText:"صف محتواك...",
    plans:"الخطط",home:"الرئيسية",aiTools:"أدوات AI",assets:"الملفات",partners:"الشركاء",
    perMonth:"/شهر",payStars:"اشترك بـ Stars ⭐",upgradePro:"الترقية للاحترافي ⭐",
    nextDrop:"الحزمة القادمة",dailyLimitReached:"وصلت للحد! قم بالترقية.",
    redirecting:"جارٍ التحويل لـ Telegram Stars... ⭐",referralCopied:"تم نسخ الرابط! 🔗",
    generatedOk:"تم التوليد! ✨",errorAi:"خطأ في الاتصال. حاول مجدداً.",
    visitedPartner:"تم إضافة الكريديت! 🎁",
  },
  ru: {
    appName:"GoViral",tagline:"Creators AI Creative Suite",welcome:"Добро пожаловать 👋",
    welcomeSub:"Ваша AI-студия в Telegram",aiUsesLeft:"Осталось запросов",
    toolsAvailable:"AI инструментов",quickTools:"Быстрые инструменты",monthlyDrop:"Пак месяца",
    partnerDeals:"Партнёрские предложения",unlock:"Открыть",subscribe:"Подписаться",
    generate:"Создать",generating:"Генерация...",upgrade:"Перейти на Creator — $6/мес",
    copy:"Скопировать",copied:"Скопировано! ✅",uploadFile:"Загрузить файл",
    howPartner:"Как работают партнёрские предложения",
    howPartnerDesc:"Подпишитесь через нашу ссылку → получите кредиты мгновенно!",
    youEarn:"Вы получаете:",addedInstantly:"Зачисляется мгновенно",
    subscribeEarn:"Подписаться и получить бонус",replaceTools:"Все AI инструменты. Одно место. Одна цена.",
    referral:"Реферальная программа",referralDesc:"Пригласи друга → оба получают 10 кредитов!",
    copyReferral:"Скопировать реферальную ссылку",mostPopular:"Популярный",dailyLimit:"Лимит",
    used:"использовано",fullLibrary:"Открыть всю библиотеку",fullLibraryDesc:"Доступ ко всем шаблонам и звукам",
    templates:"Шаблоны",sfx:"Звуки",free:"Бесплатно",proRequired:"Требуется план Creator",
    proRequiredDesc:"Обновитесь для доступа",enterText:"Опишите ваш контент...",
    plans:"Тарифы",home:"Главная",aiTools:"AI Tools",assets:"Файлы",partners:"Партнёры",
    perMonth:"/мес",payStars:"Подписаться через Stars ⭐",upgradePro:"Перейти на Pro ⭐",
    nextDrop:"Следующий пак через",dailyLimitReached:"Лимит достигнут! Обновитесь.",
    redirecting:"Переход к оплате Stars... ⭐",referralCopied:"Ссылка скопирована! 🔗",
    generatedOk:"Успешно создано! ✨",errorAi:"Ошибка подключения. Попробуйте снова.",
    visitedPartner:"Кредиты добавлены! 🎁",
  },
};

const TOOLS = [
  {id:"captions",icon:"📝",name:{en:"Auto Captions",ar:"ترجمة تلقائية",ru:"Субтитры"},free:true},
  {id:"hashtags",icon:"#️⃣",name:{en:"Hashtags",ar:"هاشتاقات",ru:"Хэштеги"},free:true},
  {id:"thumbnail",icon:"🖼️",name:{en:"AI Thumbnail",ar:"صورة مصغرة",ru:"Миниатюра"},free:false},
  {id:"voiceover",icon:"🎙️",name:{en:"Voiceover",ar:"تعليق صوتي",ru:"Озвучка"},free:false},
  {id:"script",icon:"🎬",name:{en:"Script Writer",ar:"كتابة سكريبت",ru:"Сценарий"},free:false},
  {id:"translator",icon:"🌍",name:{en:"Translator",ar:"ترجمة فورية",ru:"Переводчик"},free:true},
  {id:"bio",icon:"✍️",name:{en:"Bio Generator",ar:"كتابة بايو",ru:"Био"},free:false},
  {id:"planner",icon:"📊",name:{en:"Content Planner",ar:"تخطيط المحتوى",ru:"Планировщик"},free:false},
  {id:"vocal",icon:"🎤",name:{en:"Vocal Remover",ar:"فصل الصوت",ru:"Вокал"},free:false},
  {id:"music",icon:"🎵",name:{en:"Music Extractor",ar:"استخراج الموسيقى",ru:"Музыка"},free:false},
  {id:"logo",icon:"🎨",name:{en:"Logo Maker",ar:"صنع لوغو",ru:"Логотип"},free:false},
  {id:"reelplan",icon:"🎞️",name:{en:"Reel Planner",ar:"تخطيط الريلز",ru:"Рилс планер"},free:false},
];

const PARTNERS=[
  {id:"capcut",name:"CapCut Pro",icon:"✂️",price:"$13/mo",reward:"20 AI Credits",commission:"20%"},
  {id:"canva",name:"Canva Pro",icon:"🎨",price:"$13/mo",reward:"1 Month Free Credits",commission:"80%"},
  {id:"epidemic",name:"Epidemic Sound",icon:"🎵",price:"$15/mo",reward:"30 AI Credits",commission:"50%"},
  {id:"tubebuddy",name:"TubeBuddy",icon:"📺",price:"$9/mo",reward:"25 AI Credits",commission:"50%"},
  {id:"envato",name:"Envato Elements",icon:"🗂️",price:"$16.50/mo",reward:"15 AI Credits",commission:"30%"},
  {id:"vidiq",name:"VidIQ Pro",icon:"📈",price:"$7.50/mo",reward:"20 AI Credits",commission:"25%"},
];

const ASSETS={
  templates:[
    {name:{en:"Cinematic Pack",ar:"حزمة سينمائية",ru:"Кино пак"},icon:"🎬",count:8,free:true},
    {name:{en:"Reels Pack",ar:"حزمة ريلز",ru:"Пак Рилс"},icon:"📱",count:5,free:true},
    {name:{en:"Luxury Style",ar:"ستايل فاخر",ru:"Люкс стиль"},icon:"✨",count:10,free:false},
    {name:{en:"Music Video",ar:"فيديو موسيقي",ru:"Муз. видео"},icon:"🎵",count:6,free:false},
    {name:{en:"Arabic Style",ar:"ستايل عربي",ru:"Арабский стиль"},icon:"🌙",count:8,free:false},
    {name:{en:"Gaming Pack",ar:"حزمة جيمينج",ru:"Игровой пак"},icon:"🎮",count:7,free:false},
  ],
  sfx:[
    {name:{en:"Impact Hits",ar:"مؤثرات صدم",ru:"Удары"},icon:"💥",count:10,free:true},
    {name:{en:"Transitions",ar:"انتقالات",ru:"Переходы"},icon:"⚡",count:8,free:true},
    {name:{en:"Ambient Pack",ar:"أصوات بيئية",ru:"Атмосфера"},icon:"🌊",count:15,free:false},
    {name:{en:"Gaming SFX",ar:"مؤثرات جيمينج",ru:"Игровые звуки"},icon:"🎮",count:20,free:false},
    {name:{en:"Cinematic FX",ar:"مؤثرات سينما",ru:"Кино эффекты"},icon:"🎬",count:12,free:false},
    {name:{en:"Arab Vibes",ar:"فايبز عربية",ru:"Арабские вайбы"},icon:"🎶",count:10,free:false},
  ],
};

const PLANS_DATA=[
  {key:"free",price:"$0",
    features:{en:["3 AI uses/day","5 sample templates","10 basic SFX","1 platform export"],ar:["3 استخدامات يومياً","5 قوالب تجريبية","10 مؤثرات أساسية","تصدير منصة واحدة"],ru:["3 запроса в день","5 шаблонов","10 звуков","1 платформа"]},
    locked:{en:["Monthly drops","Full library","Partner rewards"],ar:["الحزم الشهرية","المكتبة الكاملة","مكافآت الشركاء"],ru:["Паки","Библиотека","Бонусы"]},
    featured:false},
  {key:"creator",price:"$6",
    features:{en:["30 AI uses/day","Full library access","Monthly drops 🎁","3 platforms export","Partner rewards","Referral bonuses"],ar:["30 استخداماً يومياً","وصول للمكتبة الكاملة","حزم شهرية 🎁","تصدير 3 منصات","مكافآت الشركاء","مكافآت الإحالة"],ru:["30 запросов/день","Вся библиотека","Паки 🎁","3 платформы","Бонусы партнёров","Реферал"]},
    locked:{en:["Priority speed","Brand voice"],ar:["أولوية المعالجة","صوت العلامة"],ru:["Приоритет","Голос бренда"]},
    featured:true},
  {key:"pro",price:"$15",
    features:{en:["150 AI uses/day","Everything in Creator","Priority speed ⚡","Brand voice saved","Batch 20 videos","Early drops access","VIP support"],ar:["150 استخداماً يومياً","كل مزايا المبدع","أولوية المعالجة ⚡","صوت العلامة محفوظ","معالجة 20 فيديو","وصول مبكر للحزم","دعم VIP"],ru:["150 запросов/день","Всё из Creator","Приоритет ⚡","Голос бренда","20 видео пакет","Ранний доступ","VIP"]},
    locked:{en:[],ar:[],ru:[]},
    featured:false},
];

const AI_PROMPTS={
  captions:(v)=>`Generate 3 short captions for a video about: "${v}". Numbered. Under 150 chars each. EN + AR.`,
  hashtags:(v)=>`Generate 15 English + 10 Arabic viral hashtags for: "${v}". Group by language.`,
  thumbnail:(v)=>`Describe a striking thumbnail for: "${v}". Cover: composition, text overlay, color scheme.`,
  voiceover:(v)=>`Polish into professional voiceover script with Arabic version: "${v}"`,
  script:(v)=>`Write a complete video script for: "${v}". Hook(5s) Intro(15s) Main(60s) CTA(10s). EN+AR.`,
  translator:(v)=>`Translate naturally to Arabic for social media: "${v}"`,
  bio:(v)=>`Write 3 social media bios for: "${v}". Short/Medium/Long. EN+AR each.`,
  planner:(v)=>`1-week content plan for "${v}" niche. 7 post ideas with caption angles and best times.`,
  vocal:()=>`Explain how AI vocal separation works and best practices for clean audio.`,
  music:()=>`Explain best audio formats for video editing and why WAV or 320kbps MP3 is recommended.`,
  logo:(v)=>`Minimal logo concept for: "${v}". Symbol, typography, color palette, emotion.`,
  reelplan:(v)=>`Reel/TikTok shot plan for: "${v}". Each scene: duration, angle, text, transition, SFX. Under 60s.`,
};

function useEntrance(dep){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{setVisible(false);const t=setTimeout(()=>setVisible(true),30);return()=>clearTimeout(t);},[dep]);
  return visible;
}

function AnimCard({children,delay=0,style={}}){
  const [show,setShow]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setShow(true),delay);return()=>clearTimeout(t);},[delay]);
  return(
    <div style={{...style,opacity:show?1:0,transform:show?"translateY(0)":"translateY(16px)",transition:`opacity 0.35s ease ${delay}ms,transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`}}>
      {children}
    </div>
  );
}

function RippleBtn({onClick,style,children,disabled}){
  const ref=useRef();
  const handleClick=(e)=>{
    if(disabled)return;
    const btn=ref.current;
    const circle=document.createElement("span");
    const d=Math.max(btn.clientWidth,btn.clientHeight);
    const r=btn.getBoundingClientRect();
    circle.style.cssText=`position:absolute;width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px;background:rgba(255,255,255,0.2);border-radius:50%;transform:scale(0);animation:ripple 0.5s linear;pointer-events:none;`;
    btn.appendChild(circle);
    setTimeout(()=>circle.remove(),600);
    onClick&&onClick(e);
  };
  return(
    <button ref={ref} onClick={handleClick} disabled={disabled}
      style={{position:"relative",overflow:"hidden",cursor:disabled?"not-allowed":"pointer",...style}}>
      {children}
      <style>{`@keyframes ripple{to{transform:scale(2.5);opacity:0}}`}</style>
    </button>
  );
}

function ToolCard({tool,active,lang,freeLabel,onClick,delay}){
  const [hovered,setHovered]=useState(false);
  const [pop,setPop]=useState(false);
  const [show,setShow]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setShow(true),delay);return()=>clearTimeout(t);},[delay]);
  return(
    <div onClick={()=>{setPop(true);setTimeout(()=>setPop(false),400);onClick();}}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{background:active?`${C.accent}18`:hovered?C.bg3:C.bg2,
        border:`1px solid ${active?C.accent:hovered?`${C.accent}50`:C.border}`,
        borderRadius:12,padding:14,cursor:"pointer",
        opacity:show?1:0,transform:show?(hovered?"translateY(-2px)":pop?"scale(0.95)":"translateY(0)"):"translateY(18px)",
        transition:"opacity 0.35s,transform 0.35s cubic-bezier(0.34,1.56,0.64,1),background 0.2s,border-color 0.2s"}}>
      <div style={{fontSize:22,marginBottom:6,display:"inline-block",
        transform:pop?"rotate(12deg) scale(1.25)":hovered?"scale(1.1)":"scale(1)",
        transition:"transform 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}>{tool.icon}</div>
      <div style={{fontSize:11,fontWeight:500,marginBottom:4,color:active?C.accent:C.text}}>{tool.name[lang]}</div>
      {!tool.free
        ?<span style={{background:`${C.text3}25`,color:C.text3,fontSize:10,padding:"2px 7px",borderRadius:6}}>🔒</span>
        :<span style={{background:`${C.accent}20`,color:C.accentLight,fontSize:10,padding:"2px 8px",borderRadius:10,fontWeight:500}}>{freeLabel}</span>}
    </div>
  );
}

export default function App(){
  const [lang,setLang]=useState("en");
  const [tab,setTab]=useState("home");
  const [activeTool,setActiveTool]=useState(null);
  const [assetTab,setAssetTab]=useState("templates");
  const [usesLeft,setUsesLeft]=useState(3);
  const [inputs,setInputs]=useState({});
  const [results,setResults]=useState({});
  const [loading,setLoading]=useState({});
  const [credits,setCredits]=useState(0);
  const [notification,setNotification]=useState(null);
  const [countdown,setCountdown]=useState("");
  const [transitioning,setTransitioning]=useState(false);
  const [langAnim,setLangAnim]=useState(false);
  const screenVisible=useEntrance(tab);
  const t=LANGS[lang];
  const isRtl=lang==="ar";

  useEffect(()=>{
    const update=()=>{
      const diff=new Date("2026-07-01")-new Date();
      if(diff<=0){setCountdown("Now!");return;}
      setCountdown(`${Math.floor(diff/86400000)}d ${Math.floor((diff%86400000)/3600000)}h ${Math.floor((diff%3600000)/60000)}m`);
    };
    update();const i=setInterval(update,60000);return()=>clearInterval(i);
  },[]);

  const showNotif=(msg,type="success")=>{setNotification({msg,type});setTimeout(()=>setNotification(null),3000);};

  const switchTab=(newTab)=>{
    if(newTab===tab||transitioning)return;
    setTransitioning(true);
    setTimeout(()=>{setTab(newTab);setTransitioning(false);},180);
  };

  const switchLang=(l)=>{setLangAnim(true);setTimeout(()=>{setLang(l);setLangAnim(false);},200);};

  const runAI=async(toolId)=>{
    if(usesLeft<=0){showNotif(t.dailyLimitReached,"error");switchTab("plans");return;}
    const input=inputs[toolId]||"";
    if(!input.trim()&&!["vocal","music"].includes(toolId)){showNotif("Please enter text first","error");return;}
    setLoading(l=>({...l,[toolId]:true}));
    setResults(r=>({...r,[toolId]:""}));
    setUsesLeft(u=>u-1);
    try{
      const resp=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          messages:[{role:"user",content:AI_PROMPTS[toolId]?.(input)}]}),
      });
      const data=await resp.json();
      const text=data.content?.map(i=>i.text||"").join("\n")||"Error";
      setResults(r=>({...r,[toolId]:text}));showNotif(t.generatedOk);
    }catch{
      setResults(r=>({...r,[toolId]:t.errorAi}));setUsesLeft(u=>u+1);showNotif(t.errorAi,"error");
    }
    setLoading(l=>({...l,[toolId]:false}));
  };

  const card={background:C.bg2,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:12};
  const btn=(bg=C.accent,color="#fff")=>({background:bg,color,border:"none",borderRadius:10,padding:"12px 20px",fontSize:13,fontWeight:600,cursor:"pointer",width:"100%",letterSpacing:0.2,transition:"transform 0.15s,opacity 0.15s"});
  const inputStyle={width:"100%",background:C.bg3,border:`1px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:13,padding:12,resize:"none",fontFamily:"inherit",boxSizing:"border-box",outline:"none",transition:"border-color 0.2s"};

  const TABS=[
    {id:"home",icon:"⊞",label:t.home},
    {id:"ai",icon:"◈",label:t.aiTools},
    {id:"assets",icon:"⊟",label:t.assets},
    {id:"partners",icon:"◉",label:t.partners},
    {id:"plans",icon:"◆",label:t.plans},
  ];

  const encodedSvg = encodeURIComponent(BG_PATTERN);

  const screenStyle={
    opacity:screenVisible&&!transitioning?1:0,
    transform:screenVisible&&!transitioning?"translateX(0)":"translateX(10px)",
    transition:"opacity 0.3s ease,transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
    padding:16,paddingBottom:90,direction:isRtl?"rtl":"ltr",
  };

  return(
    <div style={{
      background:`url("data:image/svg+xml,${encodedSvg}") repeat, ${C.bg}`,
      minHeight:"100vh",color:C.text,
      fontFamily:"-apple-system,'SF Pro Display',sans-serif",
      fontSize:14,maxWidth:420,margin:"0 auto",direction:isRtl?"rtl":"ltr"
    }}>
      <style>{`
        @keyframes ripple{to{transform:scale(2.5);opacity:0}}
        @keyframes slideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes popIn{0%{transform:scale(0.5);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
        @keyframes floatUp{0%{transform:translateY(0)}50%{transform:translateY(-5px)}100%{transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes shimmer{0%{opacity:0.5}50%{opacity:1}100%{opacity:0.5}}
        textarea:focus{border-color:${C.accent} !important;box-shadow:0 0 0 3px ${C.accent}18}
        ::-webkit-scrollbar{display:none}
        .nav-icon{transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1)}
        .nav-active .nav-icon{transform:scale(1.2) translateY(-2px)}
      `}</style>

      {/* NOTIFICATION */}
      {notification&&(
        <div style={{position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",
          background:notification.type==="error"?C.red:C.green,
          color:"#fff",padding:"10px 24px",borderRadius:24,fontSize:12,fontWeight:700,
          zIndex:9999,whiteSpace:"nowrap",animation:"slideDown 0.3s cubic-bezier(0.34,1.56,0.64,1)",letterSpacing:0.3}}>
          {notification.msg}
        </div>
      )}

      {/* HEADER */}
      <div style={{background:`${C.bg2}ee`,backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${C.border}`,padding:"12px 16px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {/* GoViral logo */}
          <div style={{width:38,height:38,borderRadius:10,overflow:"hidden",animation:"floatUp 3s ease-in-out infinite",boxShadow:`0 4px 12px ${C.accent}40`,flexShrink:0}}>
            <svg viewBox="0 0 38 38" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ibg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0e1621"/><stop offset="100%" stopColor="#17212b"/></linearGradient>
                <linearGradient id="iacc" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2b9af3"/><stop offset="100%" stopColor="#3dabff"/></linearGradient>
              </defs>
              <rect width="38" height="38" fill="url(#ibg)" rx="9"/>
              <circle cx="19" cy="18" r="11" fill="none" stroke="#2b9af3" strokeWidth="1.2"/>
              <circle cx="19" cy="18" r="11" fill="none" stroke="#2b9af3" strokeWidth="0.6" strokeDasharray="2.5 4" opacity="0.3"/>
              <polygon points="15,12 15,24 27,18" fill="url(#iacc)"/>
              <path d="M9,8 Q13,4 17,8" fill="none" stroke="#2b9af3" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
              <path d="M7,6 Q13,1 19,6" fill="none" stroke="#2b9af3" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
            </svg>
          </div>
          <div style={{opacity:langAnim?0:1,transform:langAnim?"translateY(-4px)":"translateY(0)",transition:"all 0.2s"}}>
            <div style={{fontSize:16,fontWeight:800,letterSpacing:-0.5,
              background:`linear-gradient(90deg,${C.text},${C.accentLight})`,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              {t.appName}
            </div>
            <div style={{fontSize:10,color:C.text3,letterSpacing:0.3}}>{t.tagline}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {credits>0&&(
            <div style={{background:`${C.accent}20`,color:C.accentLight,fontSize:11,
              padding:"4px 10px",borderRadius:20,fontWeight:700,
              animation:"popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)"}}>
              🎁 {credits}
            </div>
          )}
          <div style={{display:"flex",background:C.bg3,borderRadius:8,border:`1px solid ${C.border}`,overflow:"hidden"}}>
            {["en","ar","ru"].map(l=>(
              <button key={l} onClick={()=>switchLang(l)}
                style={{padding:"5px 9px",border:"none",
                  background:lang===l?C.accent:"none",
                  color:lang===l?"#fff":C.text3,
                  fontSize:10,fontWeight:700,cursor:"pointer",letterSpacing:0.5,
                  transition:"all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  transform:lang===l?"scale(1.05)":"scale(1)"}}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav style={{display:"flex",background:`${C.bg2}ee`,backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${C.border}`,position:"sticky",top:65,zIndex:99}}>
        {TABS.map(tb=>{
          const active=tab===tb.id;
          return(
            <button key={tb.id} className={active?"nav-active":""} onClick={()=>switchTab(tb.id)}
              style={{flex:1,padding:"10px 2px",border:"none",background:"none",
                color:active?C.accent:C.text3,fontSize:10,cursor:"pointer",
                display:"flex",flexDirection:"column",alignItems:"center",gap:3,
                borderTop:`2px solid ${active?C.accent:"transparent"}`,
                transition:"color 0.25s,border-color 0.25s"}}>
              <span className="nav-icon" style={{fontSize:16}}>{tb.icon}</span>
              <span style={{opacity:langAnim?0:1,transition:"opacity 0.2s"}}>{tb.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={screenStyle}>

        {/* HOME */}
        {tab==="home"&&(
          <>
            <AnimCard delay={0} style={{background:`linear-gradient(135deg,${C.bg2},${C.bg3})`,
              border:`1px solid ${C.border}`,borderRadius:20,padding:20,marginBottom:14,
              position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-40,right:-40,width:150,height:150,
                background:`${C.accent}08`,borderRadius:"50%",border:`1px solid ${C.accent}15`,
                animation:"floatUp 4s ease-in-out infinite"}}/>
              <div style={{position:"absolute",bottom:-30,left:-20,width:100,height:100,
                background:`${C.accent}05`,borderRadius:"50%",animation:"floatUp 5s ease-in-out infinite reverse"}}/>
              <div style={{fontSize:22,fontWeight:800,marginBottom:4,letterSpacing:-0.5}}>{t.welcome}</div>
              <div style={{fontSize:12,color:C.text2,marginBottom:18}}>{t.welcomeSub}</div>
              <RippleBtn style={{...btn(),width:"auto",padding:"10px 22px",fontSize:12,borderRadius:10,
                boxShadow:`0 4px 14px ${C.accent}40`}} onClick={()=>switchTab("ai")}>
                {t.generate} →
              </RippleBtn>
            </AnimCard>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              {[
                {val:usesLeft,label:t.aiUsesLeft,color:usesLeft>1?C.green:C.red,pct:(usesLeft/3)*100},
                {val:12,label:t.toolsAvailable,color:C.accent,pct:100},
              ].map((s,i)=>(
                <AnimCard key={i} delay={i*80} style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:14,padding:14}}>
                  <div style={{fontSize:30,fontWeight:800,color:s.color,letterSpacing:-1,transition:"color 0.4s"}}>{s.val}</div>
                  <div style={{fontSize:11,color:C.text2,marginTop:2}}>{s.label}</div>
                  <div style={{height:2,background:C.bg4,borderRadius:1,marginTop:8}}>
                    <div style={{height:"100%",width:`${s.pct}%`,background:s.color,borderRadius:1,transition:"width 0.6s cubic-bezier(0.34,1.56,0.64,1)"}}/>
                  </div>
                </AnimCard>
              ))}
            </div>

            <div style={{fontSize:11,color:C.text3,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>{t.quickTools}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
              {TOOLS.slice(0,4).map((tool,i)=>(
                <ToolCard key={tool.id} tool={tool} active={false} lang={lang} freeLabel={t.free} delay={i*60}
                  onClick={()=>{setActiveTool(tool.id);switchTab("ai");}}/>
              ))}
            </div>

            <div style={{fontSize:11,color:C.text3,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>{t.monthlyDrop}</div>
            <AnimCard delay={300} style={{...card,display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:48,height:48,background:C.bg3,borderRadius:12,display:"flex",
                alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,
                animation:"floatUp 3s ease-in-out infinite"}}>🎁</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:13}}>June 2026 Pack</div>
                <div style={{fontSize:11,color:C.text2,marginTop:2}}>12 templates + 30 SFX</div>
                <div style={{fontSize:11,color:C.accent,marginTop:2}}>⏰ {countdown}</div>
              </div>
              <RippleBtn style={{...btn(),width:"auto",padding:"8px 14px",fontSize:11,borderRadius:8}} onClick={()=>switchTab("plans")}>
                {t.unlock}
              </RippleBtn>
            </AnimCard>

            <div style={{fontSize:11,color:C.text3,letterSpacing:1,textTransform:"uppercase",marginBottom:10,marginTop:4}}>{t.partnerDeals}</div>
            {PARTNERS.slice(0,2).map((p,i)=>(
              <AnimCard key={p.id} delay={350+i*80} style={{...card,display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:22,animation:`floatUp ${3+i}s ease-in-out infinite`}}>{p.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600}}>{p.name}</div>
                  <div style={{fontSize:11,color:C.green}}>🎁 {p.reward}</div>
                </div>
                <RippleBtn style={{background:`${C.accent}20`,border:`1px solid ${C.accent}40`,
                  color:C.accentLight,borderRadius:8,padding:"8px 12px",fontSize:11,fontWeight:700,cursor:"pointer",width:"auto"}}
                  onClick={()=>{setCredits(c=>c+20);showNotif(t.visitedPartner);switchTab("partners");}}>
                  {t.subscribe}
                </RippleBtn>
              </AnimCard>
            ))}
          </>
        )}

        {/* AI TOOLS */}
        {tab==="ai"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
              {TOOLS.map((tool,i)=>(
                <ToolCard key={tool.id} tool={tool} active={activeTool===tool.id} lang={lang} freeLabel={t.free} delay={i*40}
                  onClick={()=>setActiveTool(activeTool===tool.id?null:tool.id)}/>
              ))}
            </div>

            {activeTool&&(()=>{
              const tool=TOOLS.find(tt=>tt.id===activeTool);
              if(!tool)return null;
              return(
                <AnimCard delay={0} style={{...card,border:`1px solid ${C.border2}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                    <span style={{fontSize:26,display:"inline-block",animation:"popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)"}}>{tool.icon}</span>
                    <div style={{fontWeight:700,fontSize:15}}>{tool.name[lang]}</div>
                  </div>
                  {!tool.free?(
                    <div style={{textAlign:"center",padding:"28px 0"}}>
                      <div style={{fontSize:40,marginBottom:12,animation:"floatUp 3s ease-in-out infinite"}}>🔒</div>
                      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{t.proRequired}</div>
                      <div style={{fontSize:12,color:C.text2,marginBottom:18}}>{t.proRequiredDesc}</div>
                      <RippleBtn style={btn()} onClick={()=>switchTab("plans")}>{t.upgrade} →</RippleBtn>
                    </div>
                  ):(
                    <>
                      {!["vocal","music"].includes(tool.id)?(
                        <textarea rows={3} style={inputStyle} placeholder={t.enterText}
                          value={inputs[tool.id]||""} onChange={e=>setInputs(i=>({...i,[tool.id]:e.target.value}))}/>
                      ):(
                        <div style={{background:C.bg3,border:`1px dashed ${C.border2}`,borderRadius:10,padding:22,textAlign:"center",marginBottom:10}}>
                          <div style={{fontSize:30,marginBottom:8,animation:"floatUp 3s ease-in-out infinite"}}>{tool.icon}</div>
                          <div style={{fontSize:12,color:C.text2,marginBottom:12}}>{t.uploadFile}</div>
                          <RippleBtn style={{...btn(C.bg4,C.text2),width:"auto",padding:"8px 20px",border:`1px solid ${C.border2}`}} onClick={()=>{}}>
                            📎 {t.uploadFile}
                          </RippleBtn>
                        </div>
                      )}
                      <RippleBtn style={{...btn(loading[tool.id]?C.bg4:C.accent),marginTop:10,opacity:loading[tool.id]?0.7:1,
                        boxShadow:loading[tool.id]?"none":`0 4px 14px ${C.accent}35`}}
                        onClick={()=>runAI(tool.id)} disabled={loading[tool.id]}>
                        {loading[tool.id]?(
                          <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                            <span style={{display:"inline-block",width:12,height:12,border:`2px solid ${C.text2}`,
                              borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
                            {t.generating}
                          </span>
                        ):`${t.generate} →`}
                      </RippleBtn>
                      {results[tool.id]&&(
                        <AnimCard delay={0} style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:10,padding:14,marginTop:12,fontSize:12,color:C.text2,lineHeight:1.8,whiteSpace:"pre-wrap"}}>
                          {results[tool.id]}
                          <RippleBtn style={{...btn(C.bg4,C.text2),marginTop:10,fontSize:11,border:`1px solid ${C.border2}`}}
                            onClick={()=>{navigator.clipboard?.writeText(results[tool.id]);showNotif(t.copied);}}>
                            {t.copy}
                          </RippleBtn>
                        </AnimCard>
                      )}
                      <div style={{background:C.bg3,borderRadius:8,padding:"10px 12px",marginTop:12}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.text3,marginBottom:6}}>
                          <span>{t.dailyLimit}</span><span>{3-usesLeft} / 3 {t.used}</span>
                        </div>
                        <div style={{height:2,background:C.bg4,borderRadius:1}}>
                          <div style={{height:"100%",width:`${((3-usesLeft)/3)*100}%`,background:C.accent,borderRadius:1,transition:"width 0.5s cubic-bezier(0.34,1.56,0.64,1)"}}/>
                        </div>
                      </div>
                    </>
                  )}
                </AnimCard>
              );
            })()}
          </>
        )}

        {/* ASSETS */}
        {tab==="assets"&&(
          <>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              {["templates","sfx"].map(at=>{
                const active=assetTab===at;
                return(
                  <button key={at} onClick={()=>setAssetTab(at)}
                    style={{padding:"7px 18px",borderRadius:20,fontSize:12,cursor:"pointer",
                      border:`1px solid ${active?C.accent:C.border}`,
                      background:active?`${C.accent}20`:"none",
                      color:active?C.accentLight:C.text2,fontWeight:active?600:400,
                      transition:"all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                      transform:active?"scale(1.04)":"scale(1)"}}>
                    {at==="templates"?`🎬 ${t.templates}`:`🔊 ${t.sfx}`}
                  </button>
                );
              })}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {ASSETS[assetTab].map((asset,i)=>(
                <AnimCard key={i} delay={i*50} style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",opacity:asset.free?1:0.6}}>
                  <div style={{height:72,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,background:C.bg3}}>
                    <span style={{display:"inline-block",animation:`floatUp ${2.5+i*0.3}s ease-in-out infinite`}}>{asset.icon}</span>
                  </div>
                  <div style={{padding:"10px 12px"}}>
                    <div style={{fontSize:12,fontWeight:600,marginBottom:6}}>{asset.name[lang]}</div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontSize:10,color:C.text3}}>{asset.count} files</span>
                      {asset.free
                        ?<span style={{background:`${C.accent}20`,color:C.accentLight,fontSize:10,padding:"2px 8px",borderRadius:10,fontWeight:500}}>{t.free}</span>
                        :<span style={{background:`${C.text3}20`,color:C.text3,fontSize:10,padding:"2px 7px",borderRadius:6}}>🔒</span>}
                    </div>
                  </div>
                </AnimCard>
              ))}
            </div>
            <AnimCard delay={300} style={{...card,textAlign:"center",marginTop:16}}>
              <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{t.fullLibrary}</div>
              <div style={{fontSize:12,color:C.text2,marginBottom:16}}>{t.fullLibraryDesc}</div>
              <RippleBtn style={{...btn(),boxShadow:`0 4px 14px ${C.accent}35`}} onClick={()=>switchTab("plans")}>{t.upgrade} →</RippleBtn>
            </AnimCard>
          </>
        )}

        {/* PARTNERS */}
        {tab==="partners"&&(
          <>
            <AnimCard delay={0} style={{background:`${C.accent}10`,border:`1px solid ${C.accent}25`,borderRadius:14,padding:14,marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>🤝 {t.howPartner}</div>
              <div style={{fontSize:12,color:C.text2,lineHeight:1.6}}>{t.howPartnerDesc}</div>
            </AnimCard>
            {PARTNERS.map((p,i)=>(
              <AnimCard key={p.id} delay={i*60} style={card}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                  <div style={{width:46,height:46,background:C.bg3,borderRadius:12,display:"flex",
                    alignItems:"center",justifyContent:"center",fontSize:22,
                    animation:`floatUp ${3+i*0.4}s ease-in-out infinite`}}>{p.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:14}}>{p.name}</div>
                    <div style={{fontSize:11,color:C.text2}}>{p.price}/month</div>
                  </div>
                  <span style={{background:`${C.accent}20`,color:C.accentLight,fontSize:11,padding:"3px 10px",borderRadius:20,fontWeight:600}}>{p.price}</span>
                </div>
                <div style={{background:`${C.green}10`,border:`1px solid ${C.green}25`,borderRadius:10,padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:20}}>🎁</span>
                  <div>
                    <div style={{fontSize:12,color:C.green,fontWeight:700}}>{t.youEarn} {p.reward}</div>
                    <div style={{fontSize:11,color:C.text2}}>{t.addedInstantly}</div>
                  </div>
                </div>
                <RippleBtn style={{...btn(),boxShadow:`0 4px 14px ${C.accent}30`}} onClick={()=>{setCredits(c=>c+20);showNotif(t.visitedPartner);}}>
                  {t.subscribeEarn} →
                </RippleBtn>
              </AnimCard>
            ))}
          </>
        )}

        {/* PLANS */}
        {tab==="plans"&&(
          <>
            <AnimCard delay={0} style={{...card,textAlign:"center"}}>
              <div style={{fontSize:12,color:C.text2,marginBottom:4}}>{t.replaceTools}</div>
              <div style={{fontSize:11,color:C.text3}}>Captions • Thumbnails • Voiceover • Scripts • Templates • SFX</div>
              <div style={{fontSize:20,color:C.accent,fontWeight:800,marginTop:6,letterSpacing:-0.5}}>All in one — GoViral $6/mo ✅</div>
            </AnimCard>

            {PLANS_DATA.map((plan,pi)=>(
              <AnimCard key={plan.key} delay={pi*80} style={{background:C.bg2,
                border:`1px solid ${plan.featured?C.accent:C.border}`,
                borderRadius:18,padding:18,marginBottom:12,position:"relative",
                boxShadow:plan.featured?`0 0 24px ${C.accent}20`:"none"}}>
                {plan.featured&&(
                  <div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",
                    background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,
                    color:"#fff",fontSize:10,fontWeight:800,padding:"3px 18px",
                    borderRadius:20,whiteSpace:"nowrap",letterSpacing:0.8,
                    animation:"popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)"}}>
                    {t.mostPopular.toUpperCase()}
                  </div>
                )}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <div style={{fontSize:17,fontWeight:800,letterSpacing:-0.3}}>
                    {plan.key==="free"?t.free:plan.key==="creator"?"Creator":"Pro"}
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:30,fontWeight:900,color:plan.featured?C.accent:C.text,letterSpacing:-1}}>{plan.price}</div>
                    <div style={{fontSize:11,color:C.text3}}>{t.perMonth}</div>
                  </div>
                </div>
                <div style={{height:1,background:C.border,marginBottom:14}}/>
                {plan.features[lang].map((f,j)=>(
                  <div key={j} style={{fontSize:12,color:C.text2,display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <span style={{color:C.green,fontSize:14,fontWeight:700}}>✓</span>{f}
                  </div>
                ))}
                {plan.locked[lang].map((f,j)=>(
                  <div key={j} style={{fontSize:12,color:C.text3,display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <span style={{fontSize:14}}>✕</span>{f}
                  </div>
                ))}
                {plan.key!=="free"&&(
                  <RippleBtn style={{...btn(plan.featured?C.accent:C.bg3,plan.featured?"#fff":C.text2),
                    boxShadow:plan.featured?`0 4px 14px ${C.accent}40`:"none"}}
                    onClick={()=>showNotif(t.redirecting)}>
                    {plan.featured?t.payStars:t.upgradePro}
                  </RippleBtn>
                )}
              </AnimCard>
            ))}

            <AnimCard delay={280} style={{...card,textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>🔗 {t.referral}</div>
              <div style={{fontSize:12,color:C.text2,marginBottom:12}}>{t.referralDesc}</div>
              <div style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:8,
                padding:"10px 14px",fontSize:12,color:C.accent,fontFamily:"monospace",
                marginBottom:12,letterSpacing:0.5,animation:"shimmer 2s ease-in-out infinite"}}>
                t.me/GoViralCreators_bot?ref=USER123
              </div>
              <RippleBtn style={{...btn(),boxShadow:`0 4px 14px ${C.accent}35`}} onClick={()=>showNotif(t.referralCopied)}>{t.copyReferral}</RippleBtn>
            </AnimCard>
          </>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  ██████╗  █████╗ ████████╗ █████╗
//  ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
//  ██║  ██║███████║   ██║   ███████║
//  ██║  ██║██╔══██║   ██║   ██╔══██║
//  ██████╔╝██║  ██║   ██║   ██║  ██║
//  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
// ══════════════════════════════════════════════════

// ──── QUALITY CONFIG ────
const QC={
  common: {n:"普通",  c:"#9ca3af",p:18, bc:"rgba(156,163,175,.38)", pwMul:1},
  rare:   {n:"稀有",  c:"#3b82f6",p:24, bc:"rgba(59,130,246,.5)",   pwMul:1.5},
  epic:   {n:"史诗",  c:"#8b5cf6",p:21, bc:"rgba(139,92,246,.58)",  pwMul:2},
  legend: {n:"传说",  c:"#f59e0b",p:17, bc:"rgba(245,158,11,.58)",  pwMul:3},
  apex:   {n:"顶级",  c:"#ef4444",p:8,  bc:"rgba(239,68,68,.68)",   pwMul:5},
  hc:     {n:"普通隐藏",c:"#10b981",p:4, bc:"rgba(16,185,129,.58)", pwMul:2.5},
  ha:     {n:"顶级隐藏",c:"#ec4899",p:2, bc:"rgba(236,72,153,.65)", pwMul:4},
  twin:   {n:"双生武魂",c:"#f0abfc",p:4, bc:"rgba(240,171,252,.65)",pwMul:6},
  triple: {n:"三生武魂",c:"#e2e8f0",p:0.5,bc:"rgba(226,232,240,.5)",pwMul:10},
};

// ──── REALM DEFINITIONS ────
const REALMS=[
  {lv:1,  n:'魂士',    sub:'踏上修炼之路',        ico:'🌱',col:'#9ca3af',hex:'156,163,175'},
  {lv:11, n:'魂师',    sub:'魂力初现，武魂觉醒',    ico:'⚡',col:'#60a5fa',hex:'96,165,250'},
  {lv:21, n:'大魂师',  sub:'三环傍身，初露锋芒',    ico:'🔮',col:'#34d399',hex:'52,211,153'},
  {lv:31, n:'魂尊',    sub:'四环之力，独当一面',    ico:'💫',col:'#a78bfa',hex:'167,139,250'},
  {lv:41, n:'魂宗',    sub:'五环蜕变，踏入强者之列',ico:'🌀',col:'#f59e0b',hex:'245,158,11'},
  {lv:51, n:'魂王',    sub:'六环威压，万人之上',    ico:'👑',col:'#fb923c',hex:'251,146,60'},
  {lv:61, n:'魂帝',    sub:'七环君临，一方帝者',    ico:'🔥',col:'#f87171',hex:'248,113,113'},
  {lv:71, n:'魂圣',    sub:'八环圣境，超凡入圣',    ico:'✨',col:'#e879f9',hex:'232,121,249'},
  {lv:81, n:'魂斗罗',  sub:'九环归位，斗罗境界',    ico:'🐉',col:'#ffd700',hex:'255,215,0'},
  {lv:91, n:'封号斗罗',sub:'封号天赋，名动四方',    ico:'⚔️',col:'#ef4444',hex:'239,68,68'},
  {lv:95, n:'超级斗罗',sub:'超越极限，神之门槛',    ico:'🌟',col:'#ff6b6b',hex:'255,107,107'},
  {lv:99, n:'极限斗罗',sub:'斗罗之巅，俯视众生',    ico:'∞', col:'#00ffff',hex:'0,255,255'},
  {lv:100,n:'神级',    sub:'踏入神之领域，超越凡间', ico:'🙏',col:'#fffbeb',hex:'255,251,235'},
];
const REALM_BONUSES={
  11:{sp:500,msg:'魂师境：魂力+500'},
  21:{sp:1000,ticket:'common',count:3,msg:'大魂师境：魂力+1000·普通券×3'},
  31:{sp:2000,ticket:'common',count:5,msg:'魂尊境：魂力+2000·普通券×5'},
  41:{sp:5000,ticket:'advanced',count:2,msg:'魂宗境：魂力+5000·高级券×2'},
  51:{sp:10000,ticket:'advanced',count:5,msg:'魂王境：魂力+10000·高级券×5'},
  61:{sp:20000,ticket:'apex',count:2,msg:'魂帝境：魂力+20000·顶级券×2'},
  71:{sp:50000,ticket:'apex',count:5,msg:'魂圣境：魂力+50000·顶级券×5'},
  81:{sp:100000,ticket:'apex',count:1,ten:true,msg:'魂斗罗境：魂力+100000·顶级十连×1'},
  91:{sp:200000,ticket:'apex',count:2,ten:true,power:50000,msg:'封号斗罗境：魂力+200000·顶级十连×2·战力+50000'},
  95:{sp:500000,ticket:'apex',count:3,ten:true,power:100000,msg:'超级斗罗境：魂力+500000·顶级十连×3·战力+100000'},
  99:{sp:1000000,ticket:'apex',count:5,ten:true,power:300000,msg:'极限斗罗境：顶级十连×5·战力+300000'},
  100:{sp:5000000,ticket:'apex',count:10,ten:true,power:999999,msg:'神级境：顶级十连×10·战力+999999'},
};

// ──── TALENT SYSTEM ────
const TALENTS=[
  {id:'power', name:'破天', icon:'⚔️', col:'#ef4444', bgc:'rgba(239,68,68,.1)',  tr:239,tg:68, tb:68,
   desc:'以力破万法·攻击凌驾一切', stats:['攻击力 ×1.3 (战力)','魂技伤害 +30%','暴击率 +20%']},
  {id:'defense',name:'铁壁', icon:'🛡️', col:'#60a5fa', bgc:'rgba(96,165,250,.1)', tr:96, tg:165,tb:250,
   desc:'以守破攻·坚不可摧',       stats:['战力 ×1.2','受伤害 -30%','血量 +100%']},
  {id:'speed',  name:'疾风', icon:'💨', col:'#34d399', bgc:'rgba(52,211,153,.1)', tr:52, tg:211,tb:153,
   desc:'以快制慢·先手为王',       stats:['战力 ×1.15','先手攻击率 +40%','回避率 +15%']},
  {id:'support',name:'调和', icon:'🌊', col:'#a78bfa', bgc:'rgba(167,139,250,.1)',tr:167,tg:139,tb:250,
   desc:'持续积累·终以量取胜',     stats:['战力 ×1.1','令牌上限 +2','抽奖幸运 +30']},
];
const AWK_FRAG_COSTS=[0,5,10,20,35,50,75,100,150,200,300];
const AWK_POWER_BONUS=[0,200,500,1000,2000,4000,8000,15000,25000,40000,60000];

const AWK_FX=['','轨道粒子增加','+2条轨道环','魂技特效增强','暗光效果','专属光晕','发光增强','极光特效','粒子持续散发','神级光轮','∞ 极限形态'];

// ──── ACHIEVEMENT SYSTEM ────
const ACH_DEF=[
  {id:'pow_1k',   cat:'power',  n:'初显锋芒',  ico:'⚔️', desc:'战力突破1000',    pts:10, col:'#9ca3af', check:()=>calcPower()>=1000},
  {id:'pow_10k',  cat:'power',  n:'崭露头角',  ico:'🗡️', desc:'战力突破10000',   pts:30, col:'#60a5fa', check:()=>calcPower()>=10000},
  {id:'pow_50k',  cat:'power',  n:'强者初现',  ico:'⚡', desc:'战力突破50000',   pts:60, col:'#a78bfa', check:()=>calcPower()>=50000},
  {id:'pow_100k', cat:'power',  n:'百万雄兵',  ico:'🔥', desc:'战力突破100000',  pts:100,col:'#f59e0b', check:()=>calcPower()>=100000},
  {id:'pow_500k', cat:'power',  n:'无双之力',  ico:'🐉', desc:'战力突破500000',  pts:200,col:'#ef4444', check:()=>calcPower()>=500000},
  {id:'pow_1m',   cat:'power',  n:'战神降临',  ico:'🌟', desc:'战力突破1000000', pts:500,col:'#ffd700', check:()=>calcPower()>=1000000},
  {id:'hunt_10',  cat:'explore',n:'初入猎场',  ico:'🌲', desc:'完成10次狩猎',    pts:15, col:'#34d399', check:()=>(G.huntCount||0)>=10},
  {id:'hunt_50',  cat:'explore',n:'猎魂老手',  ico:'🔮', desc:'完成50次狩猎',    pts:40, col:'#34d399', check:()=>(G.huntCount||0)>=50},
  {id:'hunt_100', cat:'explore',n:'猎魂大师',  ico:'🏹', desc:'完成100次狩猎',   pts:80, col:'#34d399', check:()=>(G.huntCount||0)>=100},
  {id:'lv30',     cat:'explore',n:'世界解锁',  ico:'🌍', desc:'达到Lv.30',       pts:50, col:'#a78bfa', check:()=>G.level>=30},
  {id:'lv50',     cat:'explore',n:'魂宗境',    ico:'💫', desc:'达到Lv.50',       pts:80, col:'#f59e0b', check:()=>G.level>=50},
  {id:'lv99',     cat:'explore',n:'极限斗罗',  ico:'∞',  desc:'达到Lv.99',       pts:300,col:'#00ffff', check:()=>G.level>=99},
  {id:'rings_5',  cat:'collect',n:'初集五环',  ico:'⭕', desc:'拥有5个魂环',     pts:20, col:'#a78bfa', check:()=>(G.soul?.rings?.length||0)>=5},
  {id:'rings_9',  cat:'collect',n:'九环归位',  ico:'🌀', desc:'拥有9个魂环',     pts:80, col:'#e879f9', check:()=>(G.soul?.rings?.length||0)>=9},
  {id:'rings_10', cat:'collect',n:'十全十美',  ico:'🔮', desc:'拥有10个魂环',    pts:200,col:'#ffd700', check:()=>(G.soul?.rings?.length||0)>=10},
  {id:'bones_all',cat:'collect',n:'骨骼天成',  ico:'🦴', desc:'装备6个魂骨',     pts:100,col:'#fbbf24', check:()=>Object.values(G.equippedBones||{}).filter(Boolean).length>=6},
  {id:'art_equip',cat:'collect',n:'神器在手',  ico:'⚔️', desc:'装备神器',        pts:30, col:'#f59e0b', check:()=>!!G.equippedArt},
  {id:'grim_50',  cat:'collect',n:'传承半数',  ico:'📖', desc:'图鉴收录50种武魂', pts:100,col:'#8b5cf6', check:()=>Object.keys(GRIMOIRE.discovered||{}).length>=50},
  {id:'cosmic',   cat:'legend', n:'宇宙之子',  ico:'🌌', desc:'获得宇宙之核',    pts:500,col:'#00ffff', check:()=>G.cosmicOwned},
  {id:'godpath',  cat:'legend', n:'成神候选',  ico:'🌟', desc:'通关成神之路',    pts:300,col:'#fca5a5', check:()=>(G.godTrials||[]).every(t=>t.cleared)},
  {id:'godbecome',cat:'legend', n:'神位传承',  ico:'🙏', desc:'完成神位传承',    pts:1000,col:'#ffd700',check:()=>!!G.godType},
  {id:'lot_1000', cat:'legend', n:'千次星运',  ico:'🎰', desc:'累计抽取1000次',  pts:200,col:'#f59e0b', check:()=>(G.lotTotal||0)>=1000},
  {id:'talent',   cat:'legend', n:'封号天才',  ico:'⚔️', desc:'解锁封号天赋',    pts:150,col:'#ef4444', check:()=>!!G.talent},
  {id:'awaken10', cat:'legend', n:'极限觉醒',  ico:'✦',  desc:'觉醒等级达到10',  pts:500,col:'#a78bfa', check:()=>(G.awakenLevel||0)>=10},
  {id:'easter',   cat:'special',n:'彩蛋猎人',  ico:'🥚', desc:'发现隐藏彩蛋',    pts:300,col:'#00ffff', check:()=>!!G.easterEggSeen},
  {id:'arena10',  cat:'special',n:'竞技老手',  ico:'🏟️',desc:'赢得10场竞技场',   pts:100,col:'#ef4444', check:()=>(G.arenaWins||0)>=10},
  {id:'calendar7',cat:'special',n:'连续修炼',  ico:'📅', desc:'连续登录7天',     pts:150,col:'#34d399', check:()=>(G.calendarStreak||0)>=7},
  {id:'streak5',  cat:'special',n:'连胜达人',  ico:'🔥', desc:'异界5连胜',       pts:80, col:'#f87171', check:()=>(G.abyss?.streak||0)>=5},
];

// ──── LUCK VALUE SYSTEM ────
const TIDAL_STATES=[
  {n:'低迷', col:'#9ca3af', fill:'linear-gradient(90deg,#374151,#9ca3af)', threshold:0},
  {n:'平稳', col:'#60a5fa', fill:'linear-gradient(90deg,#1d4ed8,#60a5fa)', threshold:30},
  {n:'高涨', col:'#f59e0b', fill:'linear-gradient(90deg,#b45309,#fbbf24)', threshold:60},
  {n:'巅峰', col:'#ef4444', fill:'linear-gradient(90deg,#991b1b,#ef4444)', threshold:90},
];
const TIDAL_MAX=90;

// ──── CALENDAR LOGIN SYSTEM ────
const CAL_REWARDS=[
  {ico:'🎟️',lbl:'普通券×3',  fn:()=>addTicketToBag('common',3)},
  {ico:'💫',lbl:'魂力+2000', fn:()=>{G.sp+=2000;updateHUD();}},
  {ico:'🎫',lbl:'高级券×2',  fn:()=>addTicketToBag('advanced',2)},
  {ico:'🦴',lbl:'随机魂骨',   fn:()=>{const k=pick(['head','body','arm','leg']);const pool=BONE_POOL[k]||BONE_POOL.head;const b=pool[ri(0,Math.min(3,pool.length-1))];const pw=genBonePw(b.tier);bagPush('bone',{...b,pw,id:Date.now()});}},
  {ico:'🎫',lbl:'高级券×5',  fn:()=>addTicketToBag('advanced',5)},
  {ico:'💫',lbl:'魂力+10000',fn:()=>{G.sp+=10000;updateHUD();}},
  {ico:'🏆',lbl:'顶级十连券', fn:()=>addTicketToBag('apex',1,true)},
];

// ──── PVP ARENA SYSTEM ────
const ARENA_ENEMIES=[
  {n:'刃魂少年',  ico:'⚔️',pw:5000,   atk:280,  hp:8000,  q:'common',  desc:'初出茅庐的剑系魂师'},
  {n:'冰霜使者',  ico:'❄️',pw:15000,  atk:560,  hp:14000, q:'rare',    desc:'冰系魂师，防御为主'},
  {n:'雷霆战士',  ico:'⚡',pw:30000,  atk:1100, hp:24000, q:'epic',    desc:'雷系魂师，攻击凶猛'},
  {n:'暗影刺客',  ico:'🌑',pw:60000,  atk:2300, hp:20000, q:'epic',    desc:'暗系魂师，快准狠'},
  {n:'传说魂帝',  ico:'🔥',pw:120000, atk:4800, hp:75000, q:'legend',  desc:'顶尖魂帝，全面强者'},
  {n:'神赐候选',  ico:'✨',pw:300000, atk:11000,hp:180000,q:'apex',    desc:'神级战力候选者'},
  {n:'混沌之主',  ico:'🌀',pw:600000, atk:24000,hp:450000,q:'ha',      desc:'混沌属性，难以捉摸'},
  {n:'宇宙守望者',ico:'🌌',pw:1500000,atk:55000,hp:900000,q:'triple',  desc:'触碰宇宙法则的强者'},
];

const ARENA_MILESTONES=[
  {honor:100, n:'竞技新人',  pool:'common',  count:5,  ten:false},
  {honor:300, n:'初级竞技者',pool:'advanced',count:3,  ten:false},
  {honor:600, n:'荣耀战士',  pool:'advanced',count:10, ten:false},
  {honor:1000,n:'竞技精英',  pool:'apex',    count:3,  ten:false},
  {honor:2000,n:'竞技大师',  pool:'apex',    count:1,  ten:true},
  {honor:5000,n:'竞技王者',  pool:'apex',    count:5,  ten:true},
];

function getCurrentRealm(lv){
  let r=REALMS[0];
  for(const realm of REALMS){if(lv>=realm.lv)r=realm;else break;}
  return r;
}
function updateRealmBadge(){
  // Reserved for future top-bar realm/awaken indicators
}
function checkRealmBreakthrough(lv){
  const isBreak=REALMS.some(r=>r.lv===lv);
  if(!isBreak){
    notify('🎉 升级！'+rankStr(lv),'legend');
    spawnBurst('#ffd700',45);
    return;
  }
  const r=getCurrentRealm(lv);
  spawnBurst(r.col,100);
  setTimeout(()=>showRealmOverlay(r,lv),250);
}
function showRealmOverlay(r,lv){
  const ov=$('realm-ov');if(!ov)return;
  ov.style.setProperty('--realm-col',r.col);
  const bg=$('realm-bg');
  if(bg)bg.style.background=`radial-gradient(ellipse at 50% 40%,rgba(${r.hex},.32),rgba(0,0,0,.97) 66%)`;
  $set('realm-ico','textContent',r.ico);
  $set('realm-title','textContent',r.n);
  $set('realm-sub','textContent',r.sub);
  $set('realm-lv','textContent','Lv.'+lv+' · '+rankStr(lv));
  // Ring animation
  const ring=document.createElement('div');ring.className='realm-ring-anim';
  ring.style.setProperty('--realm-col',r.col+'60');
  ov.appendChild(ring);setTimeout(()=>ring.remove(),1500);
  ov.classList.add('show');
  // Grant realm bonus (once per level milestone)
  if(!G.realmBonusClaimed)G.realmBonusClaimed=[];
  if(!G.realmBonusClaimed.includes(lv)){
    G.realmBonusClaimed.push(lv);
    const b=REALM_BONUSES[lv];
    if(b){
      if(b.sp)G.sp+=b.sp;
      if(b.power)G.extraPower+=(b.power||0);
      if(b.ticket)addTicketToBag(b.ticket,b.count,b.ten||false);
      setTimeout(()=>notify('🎁 '+b.msg,'divine'),700);
    }
    updateHUD();saveG();
  }
  // Auto dismiss after 5s
  setTimeout(()=>closeRealmOverlay(),5000);
  // Talent unlock hint at 91
  if(lv===91&&!G.talent){
    setTimeout(()=>{closeRealmOverlay();openTalentSelect();},1400);
  }
}
function closeRealmOverlay(){const ov=$('realm-ov');if(ov)ov.classList.remove('show');}

// TALENTS moved to top of script
function openTalentSelect(){
  if(G.level<91){notify('需要达到封号斗罗（Lv.91）才能觉醒封号天赋！','normal');return;}
  const resetCost=50000*Math.pow(3,G.talentResets||0);
  const cardsH=TALENTS.map(t=>`
    <div class="talent-card ${G.talent===t.id?'selected':''}" style="--tc:${t.col};--tr:${t.tr};--tg:${t.tg};--tb:${t.tb}" onclick="selectTalent('${t.id}')">
      ${G.talent===t.id?`<div class="tc-sel-badge">已选</div>`:''}
      <div class="tc-ico">${t.icon}</div>
      <div class="tc-name">${t.name}</div>
      <div class="tc-desc">${t.desc}</div>
      ${t.stats.map(s=>`<div class="tc-stat">▶ ${s}</div>`).join('')}
    </div>`).join('');
  openModal(`<div class="m-title" style="color:var(--gold)">⚔️ 封号天赋</div>
    <div class="m-sub">${G.talent?'当前：'+TALENTS.find(t=>t.id===G.talent).name+' · 可重置':'Lv.91专属·永久强化战力'}</div>
    <div class="talent-grid">${cardsH}</div>
    ${G.talent?`<div style="margin-top:10px;text-align:center;font-size:10px;color:var(--dim)">重置需 <span style="color:var(--apex)">${resetCost.toLocaleString()} 魂力</span>
      <span onclick="resetTalent()" style="color:var(--apex);cursor:pointer;margin-left:8px;padding:2px 8px;border:1px solid rgba(239,68,68,.3);border-radius:5px">重置</span>
    </div>`:''}
  `);
}
function selectTalent(id){
  if(G.talent&&G.talent!==id){notify('已有天赋，请先重置','normal');return;}
  if(G.talent===id){$remCls('modal','show');return;}
  const t=TALENTS.find(x=>x.id===id);if(!t)return;
  G.talent=id;
  if(id==='support'){G.abyss.maxTokens=Math.min(20,(G.abyss.maxTokens||10)+2);}
  notify(`🔥 封号天赋「${t.name}」觉醒！${t.stats[0]}`,'divine');
  spawnBurst(t.col,90);updateHUD();saveG();renderSoulPage();$remCls('modal','show');
  checkAchievement('talent');
}
function resetTalent(){
  if(!G.talentResets)G.talentResets=0;
  const cost=50000*Math.pow(3,G.talentResets);
  if(G.sp<cost){notify('魂力不足！需要'+cost.toLocaleString(),'normal');return;}
  G.sp-=cost;G.talentResets++;
  G.talent=null;
  notify('⚔️ 封号天赋已重置','normal');
  updateHUD();saveG();renderSoulPage();$remCls('modal','show');
}

// ──── AWAKEN LEVEL SYSTEM ────
// (AWK moved to top)

// ──── SOUL DATABASE ────
const SD={
  common:[
    {n:"蓝银草",i:"🌿",d:"最平凡的草系武魂，蕴含无限可能。",a:["草"],p:1},
    {n:"镰刀",i:"⚔️",d:"普通农器武魂，修炼潜力有限。",a:["金属"],p:1},
    {n:"香草",i:"🌸",d:"散发淡淡清香的植物武魂。",a:["自然"],p:2},
    {n:"木棍",i:"🪄",d:"最朴实无华的器武魂。",a:["木"],p:1},
    {n:"含羞草",i:"🌱",d:"植物系武魂，遇敌防御增强。",a:["草","防御"],p:2},
    {n:"铁锤",i:"🔨",d:"器武魂，拥有沉重的打击力。",a:["金属","力量"],p:2},
    {n:"渔网",i:"🕸️",d:"控制系器武魂，网罗天下。",a:["控制","器"],p:1},
    {n:"蒲公英",i:"🌻",d:"随风飘散的植物武魂，拥有散布之力。",a:["自然","风"],p:2},
    {n:"芦苇杆",i:"🎋",d:"水边生长的柔韧植物武魂，以柔克刚。",a:["水","柔韧","植物"],p:1},
    {n:"铁锅",i:"🫕",d:"最朴实的器武魂，防御与反弹并存。",a:["金属","防御"],p:2},
    {n:"荆棘藤",i:"🌵",d:"满布荆棘的藤蔓武魂，缠绕束缚敌人。",a:["草","控制","毒"],p:2},
    {n:"石头",i:"🪨",d:"最原始的器武魂，坚硬无比毫无弱点。",a:["大地","坚韧"],p:1},
    {n:"陶笛",i:"🎵",d:"音律系武魂，以声波影响周围环境。",a:["音波","精神"],p:2},
  ],
  rare:[
    {n:"白虎",i:"🐯",d:"百兽之王，力量与速度的完美结合。",a:["兽","力量"],p:5},
    {n:"火凤凰",i:"🔥",d:"凤凰一族，圣洁火焰之力，不死重生。",a:["火","凤凰"],p:6},
    {n:"冰凤凰",i:"❄️",d:"冰系凤凰，冻结万物，令一切静止。",a:["冰","凤凰"],p:6},
    {n:"盘龙棍",i:"🐉",d:"器武魂佼佼者，龙形缠绕蕴含破坏力。",a:["龙","器"],p:5},
    {n:"七宝琉璃塔",i:"🗼",d:"天下第一辅助武魂，增幅队友全属性。",a:["辅助","光"],p:7},
    {n:"幽冥灵猫",i:"🐱",d:"暗系极速兽武魂，来去无影。",a:["暗","速度"],p:5},
    {n:"碧磷蛇皇",i:"🐍",d:"毒系蛇类武魂，致命毒素与缠绕。",a:["毒","蛇"],p:6},
    {n:"金龙爪",i:"🦅",d:"爪系器武魂，锋利穿透破坏力。",a:["龙","锋利"],p:6},
    {n:"朱雀圣火",i:"🦜",d:"南方火之神鸟，纯粹炎属性。",a:["火","神鸟"],p:6},
    {n:"玄武神盾",i:"🛡️",d:"防御系武魂极品，坚不可摧。",a:["防御","水","龟"],p:5},
    {n:"白鹤翎羽",i:"🦢",d:"速度与优雅的化身，风属性武魂。",a:["风","飞行","速度"],p:6},
    {n:"青龙护卫",i:"🐲",d:"东方青龙护卫，拥有强大的守护之力。",a:["龙","护卫","东方"],p:6},
    {n:"冰火蛟龙",i:"🌊",d:"冰与火属性并存的蛟龙武魂。",a:["冰","火","蛟龙"],p:7},
    {n:"雷电狼王",i:"🐺",d:"雷属性狼族武魂，速度与爆发并重。",a:["雷","兽","速度"],p:6},
    {n:"幽灵蝶",i:"🦋",d:"精神系蝴蝶武魂，幻象迷惑敌人。",a:["精神","幻象","飞行"],p:5},
    {n:"赤炎狮王",i:"🦁",d:"火焰狮族武魂，王者之气令敌人颤抖。",a:["火","兽","王者"],p:6},
    {n:"碧海银鲸",i:"🐋",d:"大洋武魂，以水力横扫千军。",a:["水","海洋","力量"],p:6},
    {n:"紫电金鹰",i:"🦅",d:"雷与风双属性的猛禽武魂，俯冲斩杀。",a:["雷","风","飞行"],p:6},
    {n:"幽影黑豹",i:"🐆",d:"极速暗系武魂，暗影偷袭无处遁形。",a:["暗","速度","暗杀"],p:5},
    {n:"碎星陨铁",i:"☄️",d:"天外陨石凝聚的器武魂，蕴含星辰之力。",a:["金属","星辰","破甲"],p:7},
  ],
  epic:[
    {n:"蓝电霸王龙",i:"⚡",d:"龙类武魂顶端，雷与龙力的完美融合。",a:["雷","龙","霸王"],p:8},
    {n:"昊天锤",i:"🔨",d:"昊天宗镇宗至宝，天下无物不可破。",a:["力量","混沌"],p:9},
    {n:"六翼天使",i:"👼",d:"神级血脉，先天魂力20级，神灵降临。",a:["神圣","光明","飞行"],p:9},
    {n:"泰坦巨猿",i:"🦍",d:"力量极品，毁天灭地蛮力。",a:["力量","大地"],p:8},
    {n:"噬魂蛛皇",i:"🕷️",d:"蛛类之皇，精神力与陷阱双重恐怖。",a:["精神","毒","蜘蛛"],p:8},
    {n:"死亡蛛皇",i:"💀",d:"死亡属性蛛皇，黑暗力量无可抵挡。",a:["死亡","暗","精神"],p:9},
    {n:"冰碧帝皇蝎",i:"🦂",d:"冰与毒完美融合，封印一切。",a:["冰","毒","帝皇"],p:8},
    {n:"烈火剑圣",i:"🗡️",d:"剑与火焰合一，斩杀与焚烧并存。",a:["火","剑","圣"],p:8},
    {n:"星辰神兽",i:"🦁",d:"汲取星辰之力的神秘兽武魂。",a:["星辰","神兽","光"],p:9},
    {n:"雷霆战神",i:"⚡",d:"雷系战神级武魂，九天雷霆为我所用。",a:["雷","战神","破坏"],p:8},
    {n:"极寒冰皇",i:"🌨️",d:"冰系极限武魂，绝对零度的掌控者。",a:["冰","皇者","极限"],p:9},
    {n:"焰灵骑士",i:"🔱",d:"火焰骑士武魂，灼热与荣耀并存。",a:["火","骑士","荣耀"],p:8},
    {n:"黄金圣龙",i:"🐉",d:"黄金龙族精英，守护与攻击兼备。",a:["龙","神圣","黄金"],p:9},
    {n:"狂风战鹰",i:"🦅",d:"风系顶级猛禽，切断气流形成狂暴风刃。",a:["风","速度","斩切"],p:8},
    {n:"暗域鬼王",i:"👻",d:"死域之主，阴魂摄魄令敌精神崩溃。",a:["死亡","精神","暗"],p:8},
    {n:"极焱炎神",i:"🌋",d:"火山之神怒火具现，熔岩与烈焰的化身。",a:["火","熔岩","破坏"],p:9},
    {n:"时沙巨蟒",i:"🐍",d:"以时间毒素腐蚀一切的古老蟒蛇武魂。",a:["时间","毒","古老"],p:8},
  ],
  legend:[
    {n:"九宝琉璃塔",i:"✨",d:"七宝琉璃塔进化，天下第一辅助，传说级。",a:["辅助","光明","神圣"],p:12},
    {n:"蓝银皇",i:"👑",d:"蓝银草皇者血脉，最强控制系武魂。",a:["控制","草","皇者"],p:13},
    {n:"堕落天使",i:"😈",d:"神圣天使对立面，黑暗颠覆之力。",a:["暗","堕落","天使"],p:12},
    {n:"极品火凤凰",i:"🌋",d:"世界最强火系，极致火焰焚尽一切。",a:["极致之火","凤凰","毁灭"],p:14},
    {n:"金龙王",i:"🐲",d:"龙中之王，无上龙族血脉。",a:["极致之力","龙王","血脉"],p:14},
    {n:"海神武魂",i:"🌊",d:"神赐武魂，历代海神守护者。",a:["神力","水","海"],p:13},
    {n:"七杀剑",i:"⚔️",d:"天下第一攻击，七重杀意无物不斩。",a:["极致之刃","杀意","剑"],p:14},
    {n:"雷灵王",i:"⚡",d:"雷霆极致，召唤九天雷霆降临。",a:["雷","王者","天空"],p:13},
    {n:"星宿命盘",i:"🌠",d:"掌控星宿命运的神秘武魂，改写天命。",a:["星宿","命运","神秘"],p:13},
    {n:"幽冥神眼",i:"👁️",d:"冥界神眼，看穿一切虚幻与真实。",a:["冥界","洞察","神秘"],p:12},
    {n:"混沌之翼",i:"🦋",d:"混沌属性翅翼，破开一切束缚。",a:["混沌","飞行","自由"],p:13},
    {n:"天罚神雷",i:"🌩️",d:"天道降罚的神雷武魂，代天行道。",a:["雷","天道","神罚"],p:14},
    {n:"永恒冰魂",i:"🔮",d:"亘古冰封之力，将时间凝固于永恒瞬间。",a:["冰","时间","永恒"],p:13},
    {n:"炎狱魔神",i:"😈",d:"地狱烈焰与恶魔力量的终极融合体。",a:["火","魔","地狱"],p:14},
    {n:"天命神弓",i:"🏹",d:"以命运之力引导每一支箭矢，百发百中。",a:["命运","远程","穿透"],p:12},
    {n:"混沌剑魂",i:"⚔️",d:"混沌之力凝聚成剑，斩断一切规则束缚。",a:["混沌","剑","规则"],p:13},
  ],
  apex:[
    {n:"神圣天使",i:"😇",d:"先天魂力20级，神灵真正的代行者。",a:["极致之光","神圣","天使","神力"],p:17},
    {n:"柔骨兔王",i:"🐇",d:"月兔之神血脉传承，无可比拟。",a:["神秘","月","灵魂"],p:16},
    {n:"混沌属性",i:"🌀",d:"极罕见混沌属性，凌驾一切属性之上。",a:["混沌","无序","万有"],p:19},
    {n:"宇宙之源",i:"🌌",d:"掌管宇宙规则，理论上不应存在。",a:["宇宙","规则","万物"],p:20},
    {n:"时空裂缝",i:"⏳",d:"时间与空间的交汇点，掌控时空扭曲。",a:["时间","空间","裂缝"],p:18},
    {n:"虚无之主",i:"🌑",d:"虚无本身具现为武魂，存在即是毁灭。",a:["虚无","毁灭","超越"],p:19},
    {n:"因果律者",i:"⚖️",d:"掌握因果法则，可改写战局的必然走向。",a:["因果","法则","预知"],p:17},
    {n:"神格化身",i:"🌟",d:"神之力量在人体内直接化身，超凡入圣。",a:["神力","化身","超越"],p:18},
  ],
  hc:[
    {n:"如意环",i:"⭕",d:"昊天锤变异而来，自带领域之力。",a:["隐匿","领域","混沌"],p:11},
    {n:"幽冥之眼",i:"👁️",d:"窥视冥界的神秘眼睛武魂。",a:["死亡","洞察","冥界"],p:10},
    {n:"九心海棠",i:"🌺",d:"天下第一治愈，同时只能两人持有。",a:["治愈","生命","神圣"],p:11},
    {n:"奇茸通天菊",i:"🌼",d:"极罕见植物武魂，通天彻地之力。",a:["自然","治愈","通灵"],p:10},
    {n:"无形剑意",i:"💨",d:"无形却最致命的剑意武魂。",a:["剑","无形","意志"],p:11},
    {n:"千机算盘",i:"🧮",d:"计算一切可能的神秘器武魂，预判每个变数。",a:["智慧","预知","算计"],p:10},
    {n:"月影神狐",i:"🦊",d:"月光下现身的隐藏武魂，以幻术迷惑众生。",a:["月","幻象","隐藏"],p:11},
    {n:"幽莲血心",i:"🪷",d:"生长于幽冥的血莲，以生命力量反制敌人。",a:["生命","幽冥","反制"],p:10},
  ],
  ha:[
    {n:"昊天九绝锤",i:"⚡🔨",d:"昊天锤终极形态，毁灭一切的绝世力量。",a:["混沌","极致之力","毁灭","昊天"],p:18},
    {n:"饕餮神牛",i:"🐂",d:"龙神九子之一，吞噬天地之力。",a:["吞噬","大地","龙神"],p:17},
    {n:"死神镰刀",i:"💀⚔️",d:"死神降临之器，斩断生死轮回。",a:["死亡","斩断","混沌"],p:18},
    {n:"虚空裂爪",i:"🌑",d:"来自虚空的暗裂之爪，撕碎一切防御。",a:["虚空","暗","裂爪"],p:17},
    {n:"天魔琴",i:"🎸",d:"以魔音震碎敌人意志与肉体的绝世神器。",a:["音波","魔","精神破碎"],p:18},
    {n:"混沌神炉",i:"🫕",d:"以混沌之火熔炼一切存在，吞噬敌人本源。",a:["混沌","火","吞噬"],p:17},
  ],
  twin:[
    {n:"蓝银草+昊天锤",i:"🌿⚡",d:"史上最强双生武魂，控制与力量融合。",a:["草","力量","控制","双生"],p:21,tw:true},
    {n:"圣天使+堕天使",i:"😇😈",d:"光明与黑暗双生，阴阳并存超越极限。",a:["光明","黑暗","天使","双生"],p:23,tw:true},
    {n:"金龙+银龙",i:"🐲🐉",d:"龙神血脉双重传承，无上神威。",a:["龙神","金银","极致","双生"],p:26,tw:true},
    {n:"冰火双凤",i:"❄️🔥",d:"冰与火并存双生凤凰，对立统一。",a:["冰","火","凤凰","双生"],p:23,tw:true},
    {n:"雷剑双生",i:"⚡⚔️",d:"雷霆与剑意的双生结合，速斩万物。",a:["雷","剑","双生"],p:22,tw:true},
    {n:"星辰+混沌",i:"🌠🌀",d:"星辰与混沌的双生，秩序与混沌并立。",a:["星辰","混沌","双生"],p:24,tw:true},
    {n:"幽冥+圣光",i:"💀✨",d:"死亡与圣光双生，生死循环之力。",a:["幽冥","圣光","双生"],p:24,tw:true},
    {n:"时间+空间",i:"⏳🌌",d:"时空双生，同时掌控时间流速与空间折叠。",a:["时间","空间","双生","法则"],p:27,tw:true},
    {n:"神火+神冰",i:"🔥❄️",d:"神级冰火双生，两种极端在同一灵魂中共鸣。",a:["神火","神冰","双生","极致"],p:25,tw:true},
  ],
  triple:[
    {n:"冰火雷三生龙",i:"⚡🔥❄️",d:"三生武魂极致，三属性龙族并存。",a:["冰","火","雷","龙","三生"],p:31,tri:true},
    {n:"昊天极光混沌三生",i:"🔨✨🌀",d:"传说三生武魂，三种最强属性融合。",a:["混沌","极光","昊天","三生"],p:36,tri:true},
    {n:"神圣幽冥混沌三生",i:"😇💀🌀",d:"三生武魂之最，神圣幽冥混沌三力合一。",a:["神圣","幽冥","混沌","三生"],p:40,tri:true},
    {n:"时空因果三生",i:"⏳🌌⚖️",d:"掌握时间、空间、因果三大法则的绝世三生武魂。",a:["时间","空间","因果","三生","法则"],p:45,tri:true},
  ]
};

// ──── RING TIERS ────
const RT=[
  {n:"百年",   y:100,         c:"#a78bfa", pw:80,  sk:["体质强化","感知提升","速度小幅提升","防御加强"]},
  {n:"千年",   y:1000,        c:"#60a5fa", pw:200, sk:["元素亲和","属性共鸣","魂力恢复","感知扩展"]},
  {n:"万年",   y:10000,       c:"#34d399", pw:500, sk:["领域破开","属性变异","精神力提升","真实伤害"]},
  {n:"十万年", y:100000,      c:"#fbbf24", pw:1200,sk:["领域降临","属性极化","时间感知","神通萌芽"],
   attr:{spd:15,atk:20,def:10}},
  {n:"百万年", y:1000000,     c:"#f87171", pw:3500,sk:["时空法则触碰","神通降临","属性逆转","混沌感知"],
   attr:{spd:30,atk:50,def:25,special:"魂力恢复+10/秒"}},
  {n:"不可估量",y:999999999,  c:"#e879f9", pw:15000,sk:["混沌法则","空间撕裂","时间停滞","因果逆转"],
   attr:{spd:80,atk:200,def:100,special:"攻击忽视防御30%"},
   mutateSkills:["混沌裂空斩·质变","因果逆转·质变","虚空湮灭","时间回溯·质变"]},
  {n:"神赐",   y:9999999999,  c:"#fffbeb", pw:50000,sk:["神力灌注","神赐领域","超越肉体","不死之身"],
   attr:{spd:200,atk:800,def:400,special:"受到致死伤害时概率免疫"},special:true},
  {n:"宇宙之核",y:1e14,       c:"#00ffff", pw:999999,sk:["宇宙意志","规则掌控","虚空创生","你即宇宙"],
   attr:{spd:9999,atk:99999,def:9999,special:"无视一切防御"},unique:true},
];

// ──── BONE DATABASE ────
// ──── BONE SYSTEM ────
// Bone tier power ranges: [百年100-200, 千年500-1000, 万年5000-8000, 十万年10000-15000, 百万年20000-30000, 不可估量40000-50000, 神赐1000000]
const BONE_TIER_PW={
  "百年":    [150,  180],
  "千年":    [900,  1100],
  "万年":    [5200, 5800],
  "十万年":  [12500,13500],
  "百万年":  [26000,27500],
  "不可估量":[47000,49500],
  "神赐":    [1000000,1000000]
};
function genBonePw(ringYear){
  const r=BONE_TIER_PW[ringYear]||[100,200];
  return ri(r[0],r[1]);
}

const BONE_SLOTS=[
  {s:"head",n:"头部",i:"💀",bonus:"精神力+15%",types:["head"]},
  {s:"body",n:"躯干",i:"🦴",bonus:"生命值+20%",types:["body"]},
  {s:"la",  n:"左臂",i:"💪",bonus:"攻击力+12%",types:["arm"]},
  {s:"ra",  n:"右臂",i:"💪",bonus:"攻击力+12%",types:["arm"]},
  {s:"ll",  n:"左腿",i:"🦵",bonus:"速度+10%",  types:["leg"]},
  {s:"rl",  n:"右腿",i:"🦵",bonus:"速度+10%",  types:["leg"]},
];

// Each slot-typed bone pool — ensures slot-matching
const BONE_POOL={
  head:[
    {id:"bh1",n:"百年头颅骨",i:"💀",s:"head",tier:"百年", bonus:"精神力+15%",attr:"精神"},
    {id:"bh2",n:"千年神识骨",i:"💀",s:"head",tier:"千年", bonus:"精神力+25%,感知+10%",attr:"感知"},
    {id:"bh3",n:"万年灵脑骨",i:"💀",s:"head",tier:"万年", bonus:"精神力+40%,魂技CD-10%",attr:"智慧"},
    {id:"bh4",n:"十万年神念骨",i:"💀",s:"head",tier:"十万年",bonus:"精神力+60%,领域扩展20%",attr:"领域"},
    {id:"bh5",n:"百万年慧眼骨",i:"💀",s:"head",tier:"百万年",bonus:"精神力+100%,洞察所有隐匿",attr:"洞察"},
    {id:"bh6",n:"不可估量意识骨",i:"💀",s:"head",tier:"不可估量",bonus:"精神力+300%,无视精神防御",attr:"混沌意识"},
    {id:"bhg",n:"神赐灵识骨",i:"👑",s:"head",tier:"神赐",bonus:"精神力+∞,神识覆盖千里",attr:"神赐",god:true},
  ],
  body:[
    {id:"bb1",n:"百年躯骨",i:"🦴",s:"body",tier:"百年", bonus:"生命值+15%",attr:"体质"},
    {id:"bb2",n:"千年钢骨",i:"🦴",s:"body",tier:"千年", bonus:"生命值+25%,防御+8%",attr:"坚韧"},
    {id:"bb3",n:"万年玄铁骨",i:"🦴",s:"body",tier:"万年", bonus:"生命值+40%,防御+15%",attr:"钢铁"},
    {id:"bb4",n:"十万年龙脊骨",i:"🦴",s:"body",tier:"十万年",bonus:"生命值+70%,反弹伤害5%",attr:"龙骨"},
    {id:"bb5",n:"百万年不灭骨",i:"🦴",s:"body",tier:"百万年",bonus:"生命值+120%,不死复活1次/天",attr:"不灭"},
    {id:"bb6",n:"不可估量混沌躯骨",i:"🦴",s:"body",tier:"不可估量",bonus:"生命值+500%,免疫控制",attr:"混沌体"},
    {id:"bbg",n:"神赐永恒骨",i:"👑",s:"body",tier:"神赐",bonus:"生命值+∞,永恒不灭之体",attr:"神赐",god:true},
  ],
  arm:[
    {id:"ba1",n:"百年臂骨",i:"💪",s:"arm",tier:"百年", bonus:"攻击力+12%",attr:"力量"},
    {id:"ba2",n:"千年破金臂骨",i:"💪",s:"arm",tier:"千年", bonus:"攻击力+20%,穿透+5%",attr:"穿透"},
    {id:"ba3",n:"万年雷霆臂骨",i:"💪",s:"arm",tier:"万年", bonus:"攻击力+35%,附带雷击",attr:"雷击"},
    {id:"ba4",n:"十万年爆炎臂骨",i:"💪",s:"arm",tier:"十万年",bonus:"攻击力+55%,攻击可燃烧",attr:"火焰"},
    {id:"ba5",n:"百万年龙爪骨",i:"💪",s:"arm",tier:"百万年",bonus:"攻击力+90%,龙威震慑",attr:"龙爪"},
    {id:"ba6",n:"不可估量混沌拳骨",i:"💪",s:"arm",tier:"不可估量",bonus:"攻击力+250%,击穿所有防御",attr:"混沌拳"},
    {id:"bag",n:"神赐神力臂骨",i:"👑",s:"arm",tier:"神赐",bonus:"攻击力+∞,一击之力毁天灭地",attr:"神赐",god:true},
  ],
  leg:[
    {id:"bl1",n:"百年腿骨",i:"🦵",s:"leg",tier:"百年", bonus:"速度+10%",attr:"敏捷"},
    {id:"bl2",n:"千年疾风腿骨",i:"🦵",s:"leg",tier:"千年", bonus:"速度+18%,闪避+5%",attr:"疾风"},
    {id:"bl3",n:"万年迅影腿骨",i:"🦵",s:"leg",tier:"万年", bonus:"速度+30%,瞬移初现",attr:"影速"},
    {id:"bl4",n:"十万年电光腿骨",i:"🦵",s:"leg",tier:"十万年",bonus:"速度+50%,可短暂突进",attr:"电光"},
    {id:"bl5",n:"百万年风神腿骨",i:"🦵",s:"leg",tier:"百万年",bonus:"速度+80%,疾风领域",attr:"风神"},
    {id:"bl6",n:"不可估量空间腿骨",i:"🦵",s:"leg",tier:"不可估量",bonus:"速度+200%,空间步伐",attr:"空间"},
    {id:"blg",n:"神赐天行腿骨",i:"👑",s:"leg",tier:"神赐",bonus:"速度+∞,瞬息万里",attr:"神赐",god:true},
  ],
};

const SPECIAL_BONES=[
  {id:"dragon_scale",n:"神龙鳞甲",i:"🐉",s:"extra",tier:"不可估量",pw:47200,bonus:"防御力+40%",special:"受到伤害时10%反弹"},
  {id:"angel_wing",  n:"天使羽翼",i:"🪽",s:"extra",tier:"不可估量",pw:47500,bonus:"速度+50%",special:"可短暂飞行"},
  {id:"chaos_core",  n:"混沌魂核",i:"🌀",s:"extra",tier:"不可估量",pw:49500,bonus:"全属性+20%",special:"攻击有概率触发混沌爆发"},
  {id:"god_eye",     n:"神之眼",  i:"👁️",s:"extra",tier:"不可估量",pw:47800,bonus:"感知+100%",special:"可预判敌方下一动作"},
  {id:"death_spine", n:"死神脊骨",i:"💀",s:"extra",tier:"不可估量",pw:48300,bonus:"暴击率+25%",special:"致命一击秒杀概率5%"},
  {id:"star_rib",    n:"星辰肋骨",i:"✨",s:"extra",tier:"不可估量",pw:48800,bonus:"魂技伤害+35%",special:"每次使用魂技积攒星力"},
  {id:"void_marrow", n:"虚空髓液",i:"🌑",s:"extra",tier:"不可估量",pw:49200,bonus:"无视防御15%",special:"攻击有概率穿透空间"},
];
const MAX_SPECIAL_BONES=6;

// ──── HERBS ────
const HERBS=[
  {id:"h1",n:"清灵草",  i:"🌿",c:"#22c55e",e:"sp",   v:200,  d:"直接增加200魂力，草系武魂效果双倍。",fb:{s:5,m:1}},
  {id:"h2",n:"天材宝草",i:"🌱",c:"#a3e635",e:"exp",  v:150,  d:"获得150点经验，高品质武魂效果更强。",fb:{s:8,m:2}},
  {id:"h3",n:"星辰花",  i:"🌸",c:"#f9a8d4",e:"luck", v:10,   d:"幸运值+10，下次抽奖概率提升。",fb:{s:3,m:3}},
  {id:"h4",n:"魂凝果",  i:"🍇",c:"#7c3aed",e:"fuse", v:0,    d:"专用融合药草，大幅提升成功率。",fb:{s:15,m:8}},
  {id:"h5",n:"极天灵芝",i:"🍄",c:"#f97316",e:"exp",  v:500,  d:"极品药草，获得500点经验。",fb:{s:12,m:5}},
  {id:"h6",n:"万灵液",  i:"💧",c:"#38bdf8",e:"sp",   v:1000, d:"凝聚万物灵气，直接增加1000魂力。",fb:{s:10,m:4}},
  {id:"h7",n:"神根草",  i:"🌾",c:"#fde68a",e:"fuse", v:0,    d:"神级融合草，极大提升质变概率。",fb:{s:20,m:15}},
  {id:"h8",n:"龙血草",  i:"🩸",c:"#dc2626",e:"power",v:500,  d:"服用后战力+500，龙系武魂效果翻倍。",fb:{s:6,m:4}},
  {id:"h9",n:"天音蘑菇",i:"🎵",c:"#818cf8",e:"exp",  v:800,  d:"神奇的音乐蘑菇，食用后经验+800。",fb:{s:9,m:3}},
  {id:"h10",n:"混沌灵液",i:"🌀",c:"#e879f9",e:"power",v:2000, d:"混沌之力凝聚的液体，战力+2000。",fb:{s:18,m:10}},
  {id:"h11",n:"宇宙露珠",i:"💫",c:"#00ffff",e:"all",  v:0,    d:"宇宙诞生时的露珠，触碰即获全属性增幅。",fb:{s:25,m:20}},
  {id:"h12",n:"凤凰羽火",i:"🔥",c:"#fb923c",e:"exp",  v:2000, d:"不死凤凰燃烧的羽毛，经验+2000。",fb:{s:14,m:7}},
  {id:"h13",n:"神树精华",i:"🌳",c:"#86efac",e:"sp",   v:3000, d:"万年神树积累的精华，魂力+3000。",fb:{s:16,m:9}},
  {id:"h14",n:"龙珠碎屑",i:"🐲",c:"#fde68a",e:"power",v:5000, d:"龙珠碎裂后留下的碎屑，战力+5000。",fb:{s:22,m:14}},
];

// ──── RESOURCES ────
const RESOURCES=[
  {id:"r1",n:"灵石",     i:"💠",c:"#60a5fa",e:"sp",  v:100, d:"凝聚灵力的结晶，可转化为魂力+100。"},
  {id:"r2",n:"精铁矿",   i:"⚙️", c:"#9ca3af",e:"craft",d:"高品质矿石，可用于锻造强化。"},
  {id:"r3",n:"星辰砂",   i:"✨",c:"#fbbf24",e:"luck", v:5,  d:"星辰坠落留下的砂粒，幸运+5。"},
  {id:"r4",n:"幽灵晶",   i:"🔮",c:"#8b5cf6",e:"exp",  v:200,d:"幽灵能量结晶，吸收后经验+200。"},
  {id:"r5",n:"龙鳞碎片", i:"🐉",c:"#f59e0b",e:"power",v:300,d:"古龙脱落的鳞甲碎片，战力+300。"},
  {id:"r6",n:"混沌晶核", i:"🌀",c:"#e879f9",e:"power",v:1000,d:"混沌之力凝聚而成，战力+1000。"},
  {id:"r7",n:"神力液晶", i:"💫",c:"#ffd700",e:"power",v:3000,d:"神级液晶，极大提升综合战力+3000。"},
  {id:"r8",n:"宇宙尘埃", i:"🌌",c:"#00ffff",e:"all",  v:0,  d:"宇宙诞生时的尘埃，提升全属性5%。"},
  {id:"r9",n:"魂力水晶", i:"🔷",c:"#3b82f6",e:"sp",  v:500, d:"高纯度魂力水晶，转化魂力+500。"},
  {id:"r10",n:"时间碎片",i:"⏰",c:"#6ee7b7",e:"exp",  v:1000,d:"时间碎片，内含大量精炼经验+1000。"},
];

// ──── ARTIFACTS ────
// quality: 1=普通 2=精品 3=稀有 4=史诗 5=传说 10=极致(×10倍战力)
const ARTS=[
  {id:"a1",n:"天青石髓",i:"💎",d:"天地精华宝石，魂力大幅提升。",pw:500,q:2,mul:2,bonus:"魂力上限+500"},
  {id:"a2",n:"九天仙草",i:"🌿",d:"万年仙草，突破修炼瓶颈。",pw:1000,q:2,mul:2,bonus:"经验获取+20%"},
  {id:"a3",n:"神龙心脏",i:"❤️",d:"古神龙遗留，无尽龙力蕴含其中。",pw:2000,q:3,mul:3,bonus:"防御力+30%"},
  {id:"a4",n:"海神三叉戟",i:"🔱",d:"海神神器，拥有海神之力的记忆。",pw:3000,q:3,mul:3,bonus:"水系伤害+50%"},
  {id:"a5",n:"破界神剑",i:"⚔️",d:"传说斩断规则的神剑，诸天之斩。",pw:5000,q:4,mul:4,bonus:"攻击力+40%,无视防御5%"},
  {id:"a6",n:"混沌珠",i:"🌀",d:"混沌之初凝聚能量核心。",pw:4000,q:4,mul:4,bonus:"全属性+15%"},
  {id:"a7",n:"宇宙碎片",i:"🌌",d:"宇宙诞生遗留碎片，法则蕴含其中。",pw:8000,q:5,mul:5,bonus:"全属性+25%,规则之力"},
  {id:"a8",n:"星宿盘",i:"🌠",d:"掌控星宿命运的神器，改写命运轨迹。",pw:6000,q:5,mul:5,bonus:"暴击率+20%,幸运+50"},
  // 极致品质神器 (×10倍战力加成)
  {id:"ae1",n:"太初神器·混沌剑",i:"🌀",d:"太初之初诞生的第一把神剑，斩断混沌开辟新天地。",pw:50000,q:10,mul:10,bonus:"全属性+100%,无视一切防御",extreme:true},
  {id:"ae2",n:"太初神器·宇宙鼎",i:"🏛️",d:"以宇宙为材，以规则为火铸就的神鼎，内含天地万物。",pw:50000,q:10,mul:10,bonus:"生命+∞,宇宙抗性",extreme:true},
  {id:"ae3",n:"太初神器·时光镜",i:"🪞",d:"镜中可见过去未来，掌控时间之力的传世神器。",pw:50000,q:10,mul:10,bonus:"时间感知+∞,预知未来",extreme:true},
  {id:"ae4",n:"太初神器·虚空塔",i:"🗼",d:"建于虚空之中，收纳万物的无底神塔。",pw:50000,q:10,mul:10,bonus:"空间掌控,无限收纳",extreme:true},
  {id:"ae5",n:"太初神器·神王冕",i:"👑",d:"神王所戴之冕，佩戴者将成为凌驾诸神之上的存在。",pw:50000,q:10,mul:10,bonus:"全属性+200%,神王威压",extreme:true},
];

// ──── TITLES ────
const TITLES={
  rare:[
    {n:"幽冥行者",c:"#8b5cf6",d:"踏入深渊不回头的修炼者。",pw:50,bonus:"暗属性+15%"},
    {n:"炎灵使者",c:"#f97316",d:"与火焰共鸣的天才魂师。",pw:80,bonus:"火属性+20%"},
    {n:"雷霆斗士",c:"#60a5fa",d:"雷属性觉醒的强大战士。",pw:60,bonus:"速度+10%"},
    {n:"冰雪霜姬",c:"#a5f3fc",d:"掌控冰雪的绝世天才。",pw:70,bonus:"冰属性+20%"},
    {n:"暗影行者",c:"#6366f1",d:"藏于黑暗的致命存在。",pw:55,bonus:"隐身概率+5%"},
    {n:"草木传人",c:"#22c55e",d:"与草木共生的自然魂师。",pw:45,bonus:"草属性+15%,治愈+10%"},
  ],
  advanced:[
    {n:"破天一剑",c:"#fbbf24",d:"以一剑之力破开天际。",pw:200,bonus:"攻击力+25%,穿透+10%"},
    {n:"神通宗师",c:"#f59e0b",d:"神通之力已达宗师境界。",pw:300,bonus:"魂技伤害+30%"},
    {n:"龙魂觉醒",c:"#f97316",d:"龙族血脉觉醒的传说魂师。",pw:250,bonus:"龙系属性+40%"},
    {n:"万古魂帝",c:"#d97706",d:"万古难遇的顶尖魂帝。",pw:400,bonus:"全属性+10%"},
    {n:"天命强者",c:"#eab308",d:"受天命眷顾的绝世强者。",pw:350,bonus:"暴击率+15%,幸运+30"},
  ],
  legend:[
    {n:"斗罗天帝",c:"#ef4444",d:"凌驾于斗罗之上的天帝存在。",pw:800,bonus:"全属性+20%,威压范围50m"},
    {n:"混沌魔神",c:"#dc2626",d:"混沌之力的掌控者，魔神降临。",pw:1200,bonus:"混沌属性+100%,无序之力"},
    {n:"宇宙法则者",c:"#ff6b6b",d:"触碰宇宙法则的绝世强者。",pw:2000,bonus:"无视所有防御10%,规则之力"},
    {n:"永恒之主",c:"#f87171",d:"永恒与时间的掌控者。",pw:1500,bonus:"时间感知,免疫减速"},
  ],
  hunt:[
    {n:"猎魂先驱",c:"#6ee7b7",d:"无数次踏入危险之地的勇士。",pw:100,bonus:"狩猎魂力+10%"},
    {n:"星斗传说",c:"#67e8f9",d:"星斗大森林中成为传说之人。",pw:120,bonus:"森林资源+20%"},
    {n:"混沌探索者",c:"#c084fc",d:"踏入混沌之地并生还者。",pw:200,bonus:"混沌属性感知"},
    {n:"原初触碰者",c:"#00ffff",d:"触碰原初之地秘密的存在。",pw:300,bonus:"宇宙感知初现"},
  ],
  special:[
    {n:"欧皇",c:"#ffd700",d:"传说幸运之神降临者，下次抽取必中顶级！",pw:500,bonus:"幸运+100,必中顶级(一次)"},
  ],
  godpath:[
    {n:"成神候选者",c:"#fca5a5",d:"通过成神之路试炼的有望成神者。",pw:1000,bonus:"全属性+15%,成神之力"},
    {n:"神之子",c:"#ef4444",d:"血脉中流淌着神之力量的天选之人。",pw:3000,bonus:"全属性+30%,神之眷顾"},
    {n:"半神",c:"#dc2626",d:"踏入神之领域的半神存在。",pw:8000,bonus:"全属性+50%,神力减损30%"},
  ]
};

// ──── SOUL RESONANCE (v9) ────
// Each quality has a fragment cap; collecting fragments grants passive power boost
const RESONANCE_CFG={
  common:  {fragPerLevel:5,  maxLevel:10, powerPerLevel:80,   bonusDesc:'基础魂力+80'},
  rare:    {fragPerLevel:5,  maxLevel:10, powerPerLevel:200,  bonusDesc:'稀有共鸣+200战力'},
  epic:    {fragPerLevel:4,  maxLevel:8,  powerPerLevel:500,  bonusDesc:'史诗共鸣+500战力'},
  legend:  {fragPerLevel:3,  maxLevel:6,  powerPerLevel:1500, bonusDesc:'传说共鸣+1500战力'},
  apex:    {fragPerLevel:2,  maxLevel:4,  powerPerLevel:5000, bonusDesc:'顶级共鸣+5000战力'},
  hc:      {fragPerLevel:3,  maxLevel:5,  powerPerLevel:800,  bonusDesc:'隐藏共鸣+800战力'},
  ha:      {fragPerLevel:2,  maxLevel:4,  powerPerLevel:2000, bonusDesc:'顶隐共鸣+2000战力'},
  twin:    {fragPerLevel:2,  maxLevel:3,  powerPerLevel:6000, bonusDesc:'双生共鸣+6000战力'},
  triple:  {fragPerLevel:1,  maxLevel:2,  powerPerLevel:20000,bonusDesc:'三生共鸣+20000战力'},
};

// ── 碎片来源说明（用于 UI 展示）──
const FRAGMENT_SOURCES=[
  {icon:'⚡',label:'觉醒/二次觉醒',desc:'每次觉醒获得当前品质碎片×1'},
  {icon:'🔮',label:'狩猎掉落',desc:'每次狩猎有概率掉落低~高阶碎片'},
  {icon:'💍',label:'装配魂环',desc:'装配百万年以上魂环可获得碎片'},
  {icon:'🌟',label:'星运抽取',desc:'抽到百万年以上魂环时额外获得碎片'},
  {icon:'📋',label:'任务完成',desc:'特定任务完成奖励武魂碎片'},
  {icon:'🌐',label:'异界副本',desc:'通关精英/BOSS关卡随机掉落碎片'},
];
// Soul evolution chains: {soulName → {toName, cost(fragments of current quality), reqLv}}
const SOUL_EVOLUTIONS={
  '蓝银草':    {to:'蓝银皇',   fragCost:15, reqLv:30, toQ:'legend'},
  '镰刀':      {to:'铁锤',     fragCost:8,  reqLv:10, toQ:'common'},
  '白虎':      {to:'白虎',     fragCost:10, reqLv:20, toQ:'rare'},
  '火凤凰':    {to:'极品火凤凰',fragCost:12, reqLv:40, toQ:'legend'},
  '冰凤凰':    {to:'极品火凤凰',fragCost:12, reqLv:40, toQ:'legend'},
  '七宝琉璃塔':{to:'九宝琉璃塔',fragCost:10, reqLv:35, toQ:'legend'},
  '蓝电霸王龙':{to:'金龙王',   fragCost:8,  reqLv:45, toQ:'legend'},
  '昊天锤':    {to:'昊天九绝锤',fragCost:6,  reqLv:50, toQ:'ha'},
  '六翼天使':  {to:'神圣天使', fragCost:5,  reqLv:50, toQ:'apex'},
};

function calcResonancePower(){
  if(!G.soulFragments||!G.soulResonance)return 0;
  let total=0;
  Object.entries(G.soulFragments).forEach(([q,count])=>{
    const cfg=RESONANCE_CFG[q];if(!cfg)return;
    const lv=Math.min(cfg.maxLevel,Math.floor(count/cfg.fragPerLevel));
    total+=lv*cfg.powerPerLevel;
  });
  return total;
}

function addSoulFragment(quality, count=1){
  if(!G.soulFragments)G.soulFragments={};
  G.soulFragments[quality]=(G.soulFragments[quality]||0)+count;
  const cfg=RESONANCE_CFG[quality];
  if(cfg){
    const oldLv=Math.min(cfg.maxLevel,Math.floor(((G.soulFragments[quality])-count)/cfg.fragPerLevel));
    const newLv=Math.min(cfg.maxLevel,Math.floor(G.soulFragments[quality]/cfg.fragPerLevel));
    if(newLv>oldLv){
      notify(`✨ 武魂共鸣提升！${QC[quality]?.n||quality}共鸣 Lv.${newLv} · 战力+${newLv*cfg.powerPerLevel}`,'legend');
      spawnBurst(QC[quality]?.c||'#ffd700',50);
    }
  }
}

function openSoulResonance(){
  if(!G.awakenDone||!G.soul){notify('请先觉醒武魂','normal');return;}
  const totalFrags=Object.values(G.soulFragments||{}).reduce((a,b)=>a+b,0);
  const rows=Object.entries(RESONANCE_CFG).map(([q,cfg])=>{
    const qFrags=G.soulFragments?.[q]||0;
    const lv=Math.min(cfg.maxLevel,Math.floor(qFrags/cfg.fragPerLevel));
    const pct=lv>=cfg.maxLevel?100:(qFrags%cfg.fragPerLevel)/cfg.fragPerLevel*100;
    const pw=lv*cfg.powerPerLevel;
    const qc=QC[q]||QC.common;
    const nextFrag=lv<cfg.maxLevel?(cfg.fragPerLevel-(qFrags%cfg.fragPerLevel)):0;
    return`<div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <span style="font-size:11px;font-weight:700;color:${qc.c}">${qc.n}</span>
        <span style="font-size:10px;color:var(--gold)">Lv.${lv}/${cfg.maxLevel} · +${pw.toLocaleString()}</span>
      </div>
      <div style="height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden;margin-bottom:3px">
        <div style="height:100%;width:${pct}%;background:${qc.c};border-radius:2px;transition:width .4s"></div>
      </div>
      <div style="font-size:9px;color:var(--dim)">${qFrags} ${qc.n}碎片${lv<cfg.maxLevel?` · 升级还需 ${nextFrag}`:' · 已满级'} · 通用总计 ${totalFrags}</div>
    </div>`;
  }).join('');

  const sourcesH=FRAGMENT_SOURCES.map(s=>`
    <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.03)">
      <span style="display:flex;align-items:center;flex-shrink:0">${getSoulIcon(s.name,s.quality,{sizeClass:'size-small',animated:false})}</span>
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--txt)">${s.label}</div>
        <div style="font-size:9px;color:var(--dim)">${s.desc}</div>
      </div>
    </div>`).join('');

  const totalPow=calcResonancePower();
  openModal(`<div class="m-title">✨ 武魂共鸣</div>
    <div class="m-sub">总共鸣战力 +${totalPow.toLocaleString()}</div>
    <div style="margin-bottom:10px">${rows}</div>
    <div class="m-sec-t" style="margin:10px 0 6px">碎片获取途径</div>
    <div>${sourcesH}</div>`);
}

function openSoulEvolution(){
  if(!G.awakenDone||!G.soul){notify('请先觉醒武魂','normal');return;}
  const ev=SOUL_EVOLUTIONS[G.soul.name];
  const frags=Object.values(G.soulFragments||{}).reduce((a,b)=>a+b,0);
  if(!ev){
    openModal(`<div class="m-title">🌟 武魂传承</div>
      <div class="m-sub" style="color:var(--dim)">当前武魂暂无传承链</div>
      <div style="font-size:11px;color:var(--dim);text-align:center;padding:20px;line-height:1.8">
        ${G.soul.name} 暂无已知传承形态。<br>
        特殊武魂、双生武魂可通过其他方式进化。<br><br>
        <span style="color:var(--gl)">已有碎片：${frags} 枚</span>
      </div>`);
    return;
  }
  const canEvolve=frags>=ev.fragCost&&G.level>=ev.reqLv;
  openModal(`<div class="m-title" style="color:var(--gl)">🌟 武魂传承</div>
    <div class="m-sub" style="display:flex;align-items:center;justify-content:center;gap:6px;"><span style="display:flex;align-items:center;">${getSoulIcon(G.soul.name,G.soul.quality,{sizeClass:'size-small'})}</span> <span>${G.soul.name} → ${ev.to}</span></div>
    <div style="display:flex;align-items:center;justify-content:center;gap:16px;padding:16px 0">
      <div style="text-align:center">
        <div style="display:flex;align-items:center;justify-content:center;">${getSoulIcon(G.soul.name,G.soul.quality,{sizeClass:'size-large'})}</div>
        <div style="font-size:11px;color:var(--dim);margin-top:4px">${G.soul.name}</div>
      </div>
      <div style="font-size:22px;color:var(--gl)">→</div>
      <div style="text-align:center">
        <div style="font-size:44px">✨</div>
        <div style="font-size:11px;color:${QC[ev.toQ]?.c||'var(--gl)'};margin-top:4px">${ev.to}</div>
      </div>
    </div>
    <div class="m-ag" style="margin-bottom:12px">
      <div class="m-at"><div class="m-an">所需通用碎片</div><div class="m-av" style="color:${frags>=ev.fragCost?'var(--hc)':'var(--apex)'}">${frags}/${ev.fragCost}</div></div>
      <div class="m-at"><div class="m-an">等级要求</div><div class="m-av" style="color:${G.level>=ev.reqLv?'var(--hc)':'var(--apex)'}">Lv.${G.level}/${ev.reqLv}</div></div>
    </div>
    <div class="m-acts">
      <div class="m-btn ok" style="${canEvolve?'':'opacity:.4;pointer-events:none'}" onclick="execSoulEvolution()">传承进化</div>
    </div>`);
}

function execSoulEvolution(){
  if(!G.soul)return;
  const ev=SOUL_EVOLUTIONS[G.soul.name];if(!ev)return;
  const frags=Object.values(G.soulFragments||{}).reduce((a,b)=>a+b,0);
  if(frags<ev.fragCost||G.level<ev.reqLv){notify('条件不满足','normal');return;}
  // Deduct from all qualities proportionally (same as awaken level up)
  let remain=ev.fragCost;
  for(const k of Object.keys(G.soulFragments||{})){if(remain<=0)break;const v=G.soulFragments[k]||0;const use=Math.min(v,remain);G.soulFragments[k]=v-use;remain-=use;}
  // Find the target soul in SD
  const newQ=ev.toQ;
  const newSd=SD[newQ]?.find(s=>s.n===ev.to)||(SD[newQ]?.[0]);
  if(!newSd){notify('传承目标不存在','normal');return;}
  const oldName=G.soul.name;
  G.soul.name=newSd.n;G.soul.icon=newSd.i;G.soul.quality=newQ;
  G.soul.desc=newSd.d;G.soul.attrs=[...newSd.a,...(G.soul.attrs||[])].slice(0,8);
  G.soul.divine=G.soul.divine||['apex','ha','twin','triple'].includes(newQ);
  addExp(5000);G.extraPower+=2000;
  grimoireDiscover(newSd.n,newQ);
  notify(`🌟 ${oldName} 传承为 ${newSd.n}！武魂进化成功！战力+2000`,'divine');
  spawnBurst(QC[newQ]?.c||'#ffd700',120);
  $remCls('modal','show');
  saveG();renderSoulPage();
}

// ──── GOD PATH TRIALS ────
const GOD_TRIALS=[
  {id:"t1",n:"苦难之关",i:"🔥",d:"承受烈焰淬炼，坚守心中意志不熄灭。",rew:"经验+2000,战力+300,获得灵石×5",rsp:500,cleared:false},
  {id:"t2",n:"孤独之关",i:"❄️",d:"在极寒孤独中修炼，感受寂静之力。",rew:"经验+3000,战力+500,获得稀有称号",rsp:800,cleared:false},
  {id:"t3",n:"诱惑之关",i:"💛",d:"抵御一切诱惑，守住本心方可通关。",rew:"经验+4000,战力+800,获得神器",rsp:1000,cleared:false},
  {id:"t4",n:"死亡之关",i:"💀",d:"面对虚拟死亡恐惧，突破生死界限。",rew:"经验+8000,战力+1500,解锁神级属性",rsp:1500,cleared:false},
  {id:"t5",n:"超越之关",i:"🌟",d:"超越自我极限，触碰神之领域边缘。",rew:"经验+15000,战力+3000,神之子称号",rsp:2000,cleared:false},
  {id:"t6",n:"虚无之关",i:"🌌",d:"在虚无中找寻存在意义，完成最终蜕变。",rew:"经验+30000,战力+8000,半神称号+成神道路解锁",rsp:3000,cleared:false},
];

// ──── LOTTERY CONFIG ────
const LOT=[
  // ── 普通奖池 ──
  {name:"普通奖池",sub:"基础奖励",bg:"linear-gradient(135deg,rgba(156,163,175,.16),rgba(59,130,246,.09))",cost:100,
   pool:[
     {w:32,fn:()=>({t:'sp',v:100,l:"100魂力"})},
     {w:22,fn:()=>({t:'ringbone',ti:1,l:"千年魂环+千年魂骨",bone:true})},
     {w:16,fn:()=>({t:'ring',ti:2,l:"万年魂环"})},
     {w:12,fn:()=>({t:'ringbone',ti:3,l:"低潮+十万年魂骨",bone:true})},
     {w:8, fn:()=>({t:'herb',grade:'common',l:"随机普通药草"})},
     {w:7, fn:()=>({t:'resource',grade:'common',l:"随机普通资源"})},
     {w:0.5,fn:()=>({t:'artifact',l:"随机神器"})},
     {w:1, fn:()=>({t:'title',pool:'rare',l:"稀有称号(紫)"})},
   ],
   detail:[
     {n:"100魂力",p:"32%"},{n:"千年魂环+魂骨",p:"22%"},{n:"万年魂环",p:"16%"},
     {n:"低潮+魂骨",p:"12%"},{n:"随机普通药草",p:"8%"},{n:"随机普通资源",p:"7%"},
     {n:"随机神器",p:"0.5%"},{n:"稀有称号",p:"1%"},
   ]},
  // ── 高级奖池 ──
  {name:"高级奖池",sub:"精英奖励",bg:"linear-gradient(135deg,rgba(59,130,246,.2),rgba(139,92,246,.12))",cost:500,
   pool:[
     {w:28,fn:()=>({t:'sp',v:250,l:"250魂力"})},
     {w:20,fn:()=>({t:'sp',v:500,l:"500魂力"})},
     {w:16,fn:()=>({t:'ringbone',ti:2,l:"万年魂环+万年魂骨",bone:true})},
     {w:12,fn:()=>({t:'ring',ti:3,l:"低潮"})},
     {w:8, fn:()=>({t:'ringbone',ti:4,l:"百万年魂环+百万年魂骨",bone:true,bonus:true})},
     {w:6, fn:()=>({t:'herb',grade:'rare',l:"随机稀有药草"})},
     {w:5, fn:()=>({t:'resource',grade:'rare',l:"随机稀有资源"})},
     {w:1, fn:()=>({t:'artifact',l:"随机神器"})},
     {w:1, fn:()=>({t:'title',pool:'advanced',l:"高级称号(金)"})},
     {w:0.001,fn:()=>({t:'title',pool:'special',l:"欧皇称号"})},
   ],
   detail:[
     {n:"250魂力",p:"28%"},{n:"500魂力",p:"20%"},{n:"万年魂环+魂骨",p:"16%"},
     {n:"低潮",p:"12%"},{n:"涨潮",p:"8%"},
     {n:"随机稀有药草",p:"6%"},{n:"随机稀有资源",p:"5%"},
     {n:"随机神器",p:"1%"},{n:"高级称号(金)",p:"1%"},{n:"欧皇称号",p:"0.001%"},
   ]},
  // ── 顶级奖池 ──
  {name:"顶级奖池",sub:"绝世奖励",bg:"linear-gradient(135deg,rgba(245,158,11,.25),rgba(239,68,68,.16))",cost:1000,
   pool:[
     {w:22,fn:()=>({t:'sp',v:500,l:"500魂力"})},
     {w:16,fn:()=>({t:'sp',v:1000,l:"1000魂力"})},
     {w:14,fn:()=>({t:'ringbone',ti:3,l:"十万年魂骨+低潮",bone:true})},
     {w:10,fn:()=>({t:'ringbone',ti:4,l:"百万年魂环+百万年魂骨",bone:true,bonus:true})},
     {w:1.5,fn:()=>({t:'artifact',l:"随机神器"})},
     {w:6, fn:()=>({t:'herb',grade:'advanced',l:"随机高级药草"})},
     {w:6, fn:()=>({t:'resource',grade:'advanced',l:"随机高级资源"})},
     {w:0.5,fn:()=>({t:'title',pool:'legend',l:"传说称号(红)"})},
     {w:4, fn:()=>({t:'ring',ti:5,l:"怒潮",bonus:true})},
     {w:0.01,fn:()=>({t:'title',pool:'special',ouhuangSpecial:true,l:"欧皇称号(特殊保底)"})},
     {w:0.001,fn:(ten)=>({t:'ring',cosmic:true,l:"宇宙之核(唯一)"+(ten?"[十连]":"")})},
   ],
   detail:[
     {n:"500魂力",p:"22%"},{n:"1000魂力",p:"16%"},{n:"十万年魂骨+魂环",p:"14%"},
     {n:"涨潮",p:"10%"},{n:"随机神器",p:"1.5%"},
     {n:"随机高级药草",p:"6%"},{n:"随机高级资源",p:"6%"},
     {n:"传说称号(红)",p:"0.5%"},{n:"怒潮",p:"4%"},
     {n:"欧皇称号",p:"0.01%"},{n:"宇宙之核(唯一)",p:"0.001%"},
   ]},
];

// ──── TASK TEMPLATES ────
const TASK_TPL=[

  {n:"魂环狩猎",d:"狩猎3次",g:3,r:600,t:"hunt",i:"🔮",ticket:'common',ticketN:1},
  {n:"武魂强化",d:"装配魂环1次",g:1,r:700,t:"ring_equip",i:"💍",ticket:'advanced',ticketN:1},
  {n:"星运参与",d:"抽取2次",g:2,r:400,t:"lottery",i:"🌟",ticket:'common',ticketN:2},

  {n:"魂力积累",d:"获取2000魂力",g:2000,r:1200,t:"earn",i:"💫",ticket:'advanced',ticketN:1},

  {n:"深度狩猎",d:"狩猎5次",g:5,r:1500,t:"hunt",i:"⚔️",ticket:'advanced',ticketN:1},
  {n:"资源收集",d:"获取资源3次",g:3,r:900,t:"resource",i:"📦",ticket:'common',ticketN:1},
  {n:"药草采集",d:"获取药草2次",g:2,r:600,t:"herb",i:"🌿",ticket:'common',ticketN:1},
];

// ══════════════════════════════════════════════════
//  GAME STATE
// ══════════════════════════════════════════════════
function defState(){
  return{
    sp:1000,exp:0,level:1,
    awakenDone:false,soul:null,
    grimoire:null,  // 武魂图鉴（重置后由confirmReset恢复）
    equippedBones:{},
    equippedArt:null,
    bag:[],titles:[],
    tasks:[],taskRT:0,refreshCount:0,
    cultCount:0,explCount:0,
    dailyEarned:0,idleEarned:0,explEarned:0,
    huntCount:0,lotTotal:0,lotMode:0,
    lotTopCount:0,
    lotHistory:[],recentRings:[],
    cosmicOwned:false,ouhuang:false,luckBonus:0,
    extraPower:0,
    stats:{rings:0,bones:0,arts:0,hunts:0},
    godTrials:JSON.parse(JSON.stringify(GOD_TRIALS)),
    newbieGiftClaimed:false,
    powerMilestones:[],
    taskDotPending:false,
    easterEggSeen:false,
    equippedTitle:null,
    seasonal:{completions:{s1:0,s2:0,s3:0,s4:0,s5:0},s2count:0,s4count:0,s5milestone:0},
    abyss:{tokens:10,maxTokens:10,lastTokenTime:Date.now(),shards:0,progress:{},curLayer:1,firstClear:{},wins:0,streak:0,totalBattles:0},
    // v9: content unlock tracking
    unlockedSystems:{bone:false,fusion:false,specialPathPreview:false},
    unlockNotified:{bone:false,fusion:false,specialPathPreview:false},
    // v9: god trial will tracking
    godTrialWill:{},  // {trialId: failCount}
    // v9: soul resonance / soul fragments
    soulFragments:{},  // {quality: count}
    soulResonance:{level:0,totalFragments:0},
    // v9: soul evolution chains
    soulEvolutions:{},  // {soulName: evolveTo}
    // v9: activity system
    activity:{
      id:'springFestival',name:'踏春欧皇',active:true,
      startTime:Date.now(),duration:14*24*3600*1000,
      currency:0,  // 春分灵露
      shop:[],shopClaimed:{},
      tasks:{},
    },
    lastSave:Date.now(),
    _ver:10,
    // V8 fields
    talent:null, awakenLevel:0, honorPoints:0,
    realmBonusClaimed:[],
    achievements:{},
    arenaHonor:0, arenaWins:0, arenaLosses:0,
    calendarStreak:0, calendarLastLogin:0,
    tidalPulls:[0,0,0],
    hiddenTasks:[],
  };
}

// ── v9 state migration ──
function migrateState(g){
  if(!g)return g;
  if(!g._ver||g._ver<9){
    g.unlockedSystems=g.unlockedSystems||{bone:false,fusion:false,specialPathPreview:false};
    g.unlockNotified=g.unlockNotified||{bone:false,fusion:false,specialPathPreview:false};
    g.godTrialWill=g.godTrialWill||{};
    g.soulFragments=g.soulFragments||{};
    g.soulResonance=g.soulResonance||{level:0,totalFragments:0};
    g.soulEvolutions=g.soulEvolutions||{};
    g.activity=g.activity||{id:'springFestival',name:'踏春欧皇',active:true,startTime:Date.now(),duration:14*24*3600*1000,currency:0,shop:[],shopClaimed:{},tasks:{}};
    g._ver=9;
  }
  if(!g._ver||g._ver<10){
    g.talent=g.talent||null;
    g.awakenLevel=g.awakenLevel||0;
    g.honorPoints=g.honorPoints||0;
    g.realmBonusClaimed=g.realmBonusClaimed||[];
    g.achievements=g.achievements||{};
    g.arenaHonor=g.arenaHonor||0;
    g.arenaWins=g.arenaWins||0;
    g.arenaLosses=g.arenaLosses||0;
    g.calendarStreak=g.calendarStreak||0;
    g.calendarLastLogin=g.calendarLastLogin||0;
    g.tidalPulls=g.tidalPulls||[0,0,0];
    g.hiddenTasks=g.hiddenTasks||[];
    g._ver=10;
  }
  return g;
}

// G 由模块系统通过 window.G  getter 提供，此处不再重复声明
let curLotMode=(window.G&&window.G.lotMode)||0;
let curBagFilter='all';
let fusState={a:null,b:null,herbs:[]};
let fusSelTgt=null, fusHerbTgt=null;

function saveG(){try{localStorage.setItem('dlv3',JSON.stringify(G));}catch(e){}}
function loadG(){try{const s=localStorage.getItem('dlv3');return s?JSON.parse(s):null;}catch(e){return null;}}

// ══════════════════════════════════════════════════
//  UTILS
// ══════════════════════════════════════════════════
const rand=m=>Math.random()*m;
// Shared element accessors (reduces repeated getElementById)
const $=id=>document.getElementById(id);
const $set=(id,prop,val)=>{const e=$(id);if(e)e[prop]=val;};
const $style=(id,prop,val)=>{const e=$(id);if(e)e.style[prop]=val;};
const $show=id=>{const e=$(id);if(e)e.style.display='';};
const $hide=id=>{const e=$(id);if(e)e.style.display='none';};
const $addCls=(id,cls)=>{const e=$(id);if(e)e.classList.add(cls);};
const $remCls=(id,cls)=>{const e=$(id);if(e)e.classList.remove(cls);};
// Shared bag item push helper
const bagPush=(type,data,count=1)=>G.bag.push({type,data,count,id:Date.now()+ri(0,9999)});
// Shared after-action cleanup (updateHUD + save + render)
const afterAction=(pages=[])=>{updateHUD();saveG();pages.forEach(p=>{if(p==='bag')renderBag();else if(p==='soul')renderSoulPage();});};
const ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[ri(0,a.length-1)];
function wPick(arr,k){
  const t=arr.reduce((s,i)=>s+(i[k]||0),0);
  let r=Math.random()*t,c=0;
  for(const i of arr){c+=(i[k]||0);if(r<=c)return i;}
  return arr[arr.length-1];
}
function getQK(){
  const e=Object.entries(QC);
  return wPick(e.map(([k,v])=>({k,p:v.p})),'p').k;
}
function rankStr(lv){
  if(lv<=10)return`魂士·${lv}级`;if(lv<=20)return`魂师·${lv}级`;
  if(lv<=30)return`大魂师·${lv}级`;if(lv<=40)return`魂尊·${lv}级`;
  if(lv<=50)return`魂宗·${lv}级`;if(lv<=60)return`魂王·${lv}级`;
  if(lv<=70)return`魂帝·${lv}级`;if(lv<=80)return`魂圣·${lv}级`;
  if(lv<=90)return`魂斗罗·${lv}级`;if(lv<=94)return`封号斗罗·${lv}级`;
  if(lv<=98)return`超级斗罗·${lv}级`;if(lv===99)return`极限斗罗·99级`;
  if(lv<=109)return`神级·${lv}级`;if(lv<=119)return`真神级·${lv}级`;
  return`超神级·${lv}级`;
}
function expForLv(lv){
  if(lv<=10)return 200;
  // lv11 needs 300, lv12 needs 400, etc. (200 + (lv-10)*100)
  return 200+(lv-10)*100;
}

function calcPower(){
  let p=G.level*80+G.extraPower;
  if(G.soul){
    const q=QC[G.soul.quality];
    p+=Math.floor((q?q.p:1)*80*(q?q.pwMul:1));
    (G.soul.rings||[]).forEach(r=>{
      const t=RT.find(x=>x.n===r.n);
      p+=t?t.pw:80;
    });
  }
  // Bone power — already scaled by tier at drop time
  Object.values(G.equippedBones||{}).forEach(b=>{
    if(b)p+=(b.pw||0);
  });
  // Artifact power — multiplied by artifact quality mul (2~5x, extreme=10x)
  if(G.equippedArt){
    const mul=G.equippedArt.mul||2;
    const basePw=G.equippedArt.pw||0;
    p+=Math.floor(basePw*mul);
    // God bone resonance: if any god bone equipped + artifact, add bonus
    const godBones=Object.values(G.equippedBones||{}).filter(b=>b&&b.god);
    if(godBones.length>0){
      p+=Math.floor(basePw*mul*0.5*godBones.length); // 50% resonance per god bone
    }
  }
  // v9: Soul resonance passive power
  p+=calcResonancePower();
  // Only the currently equipped title contributes power
  if(G.equippedTitle&&G.equippedTitle.pw)p+=G.equippedTitle.pw;
  // V8: Talent multiplier
  if(G.talent){const tm={power:1.3,defense:1.2,speed:1.15,support:1.1};p=Math.floor(p*(tm[G.talent]||1));}
  // V8: Awaken level bonus
  if(G.awakenLevel>0){const awk=[0,200,500,1000,2000,4000,8000,15000,25000,40000,60000];p+=awk[Math.min(10,G.awakenLevel)]||0;}
  return Math.floor(p);
}

function addSP(v,label){
  G.sp+=v;G.dailyEarned+=v;
  updateHUD();
  if(label)notify(`+${v} 魂力${label?` (${label})`:''}`,'normal');
}

function addExp(v){
  G.exp+=v;
  let leveled=false;
  while(G.exp>=expForLv(G.level)){
    G.exp-=expForLv(G.level);G.level++;leveled=true;
    // V8: realm breakthrough or normal level up
    checkRealmBreakthrough(G.level);
    triggerSeasonal('level');
    checkContentUnlocks();
    // Unlock abyss at Lv.30
    if(G.level===30){
      notify('⚔️ 异界封印解除！世界页面已开启！','divine');
      spawnBurst('#c084fc',80);
      const niAbyss=$('ni-abyss');
      if(niAbyss){niAbyss.style.opacity='1';}
    }
    // V8: talent unlock at 91
    if(G.level===91&&!G.talent){setTimeout(()=>openTalentSelect(),1500);}
  }
  if(leveled)renderSoulPage();
  updateHUD();updateExpBar();
  checkPowerMilestones();
}

// ──── CONTENT UNLOCK CHECKS (v9) ────
function checkContentUnlocks(){
  if(!G.unlockedSystems)G.unlockedSystems={bone:false,fusion:false,specialPathPreview:false};
  if(!G.unlockNotified)G.unlockNotified={bone:false,fusion:false,specialPathPreview:false};

  // Lv.10 → 魂骨系统
  if(G.level>=10&&!G.unlockedSystems.bone){
    G.unlockedSystems.bone=true;
    if(!G.unlockNotified.bone){
      G.unlockNotified.bone=true;
      notify('🦴 Lv.10 解锁！魂骨系统已开放 — 武魂页可装备魂骨！','divine');
      spawnBurst('#fbbf24',60);
    }
  }
  // Lv.20 → 魂环融合
  if(G.level>=20&&!G.unlockedSystems.fusion){
    G.unlockedSystems.fusion=true;
    if(!G.unlockNotified.fusion){
      G.unlockNotified.fusion=true;
      notify('⚗️ Lv.20 解锁！魂环融合系统已开放 — 背包中可进行魂环融合！','divine');
      spawnBurst('#8b5cf6',60);
    }
  }
  // Lv.25 → 特殊道路预览
  if(G.level>=25&&!G.unlockedSystems.specialPathPreview){
    G.unlockedSystems.specialPathPreview=true;
    if(!G.unlockNotified.specialPathPreview){
      G.unlockNotified.specialPathPreview=true;
      notify('🌟 Lv.25 解锁！特殊道路预览已开放 — 试炼页可查看特殊道路！','legend');
      spawnBurst('#f59e0b',60);
    }
  }
}

function updateHUD(){
  $set('hud-lv','textContent','Lv.'+G.level);
  $set('hud-sp','textContent',G.sp);
  $set('hud-pow','textContent',calcPower().toLocaleString());
  $set('hud-honor','textContent',G.honorPoints||0);
  updateRealmBadge();
  updateSidebar();
}
function updateExpBar(){
  const need=expForLv(G.level);
  const pct=Math.min(100,(G.exp/need)*100);
  $style('exp-fill','width',pct+'%');
}

// ──── POWER MILESTONES ────
const POWER_MILESTONES=[10000,50000,100000,200000,300000,500000,700000,1000000];
function checkPowerMilestones(){
  const pw=calcPower();
  (G.powerMilestones=G.powerMilestones||[]);
  POWER_MILESTONES.forEach(m=>{
    if(pw>=m&&!G.powerMilestones.includes(m)){
      G.powerMilestones.push(m);
      addTicketToBag('apex',1);
      const disp=m>=10000?`${m/10000}万`:`${m}`;
      notify(`🏆 战力突破${disp}！获得顶级星运十连券×1！`,'divine');
      spawnBurst('#ef4444',80);
      saveG();
    }
  });
}

// ──── TASK DOT ────
function setTaskDot(has){
  G.taskDotPending=has;
  document.querySelectorAll('.ni').forEach(ni=>{
    const lbl=ni.querySelector('.lbl');
    if(lbl&&lbl.textContent.includes('任务')){
      let dot=ni.querySelector('.task-dot');
      if(has&&!dot){
        dot=document.createElement('div');
        dot.className='task-dot';
        dot.style.cssText='position:absolute;top:6px;right:12px;width:7px;height:7px;border-radius:50%;background:#ef4444;box-shadow:0 0 6px #ef4444';
        ni.appendChild(dot);
      }else if(!has&&dot){dot.remove();}
    }
  });
}

// ──── TICKET HELPERS ────
function addTicketToBag(pool,count,ten=false){
  const ticketId='ticket_'+pool+(ten?'_ten':'');
  const name=poolTicketName(pool)+(ten?'（十连）':'');
  if(ten){
    // Ten-pull tickets stored separately
    const ex=G.bag.find(i=>i.type==='ticket'&&i.data?.pool===pool&&i.data?.ten);
    if(ex)ex.count+=count;
    else G.bag.push({type:'ticket',data:{id:ticketId,pool,n:name,i:poolTicketIcon(pool),c:poolTicketColor(pool),ten:true},count,id:Date.now()+Math.random()});
  } else {
    const ex=G.bag.find(i=>i.type==='ticket'&&i.data?.pool===pool&&!i.data?.ten);
    if(ex)ex.count+=count;
    else G.bag.push({type:'ticket',data:{id:ticketId,pool,n:poolTicketName(pool),i:poolTicketIcon(pool),c:poolTicketColor(pool)},count,id:Date.now()+Math.random()});
  }
}
function poolTicketName(p){return p==='common'?'普通星运券':p==='advanced'?'高级星运券':'顶级星运券';}
function poolTicketIcon(p){return p==='common'?'🎟️':p==='advanced'?'🎫':'🏆';}
function poolTicketColor(p){return p==='common'?'#9ca3af':p==='advanced'?'#3b82f6':'#ef4444';}
function poolTicketIdx(p){return p==='common'?0:p==='advanced'?1:2;}
function notify(msg,type='normal'){
  const a=$('notif');if(!a)return;
  // Cap stack at 5 — remove oldest
  while(a.children.length>=5)a.firstChild.remove();
  const el=document.createElement('div');
  const isLong=msg.length>22;
  el.className='ntf '+(type||'')+(isLong?' long':'');
  el.textContent=msg;
  a.appendChild(el);
  // Fade out then remove
  setTimeout(()=>{
    el.style.animation='ntfOut .35s ease forwards';
    setTimeout(()=>el.remove(),350);
  },3000);
}

// ──── NAVIGATION ────
let _bagOpen=false;
function setBagFabIcon(open=false){
  const fab=$('bag-fab');if(!fab)return;
  fab.innerHTML=open?'✕':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px;display:block;"><path d="M6 9V7.5A5.5 5.5 0 0117 7.5V9"/><path d="M3.5 9h17L19 20.5H5L3.5 9z"/><path d="M9.5 13.5h5" stroke-width="1.2" opacity=".6"/></svg>';
}
function toggleBagFab(){
  _bagOpen=!_bagOpen;
  const fab=$('bag-fab');
  if(_bagOpen){
    // Show bag as overlay page on top of current page
    let bagOv=$('bag-overlay');
    if(!bagOv){
      bagOv=document.createElement('div');
      bagOv.id='bag-overlay';
      bagOv.style.cssText='position:fixed;inset:0 0 58px 0;z-index:90;background:linear-gradient(180deg,#050810,#08101a);overflow-y:auto;animation:sUp .25s ease;padding:11px';
      bagOv.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div class="st">🎒 背包</div></div>'+
        '<div class="bag-tabs" id="bag-tabs-ov"><div class="btab active" onclick="fBagOv(\'all\',this)">全部</div><div class="btab" onclick="fBagOv(\'bone\',this)">魂骨</div><div class="btab" onclick="fBagOv(\'artifact\',this)">神器</div><div class="btab" onclick="fBagOv(\'herb\',this)">药草</div><div class="btab" onclick="fBagOv(\'resource\',this)">资源</div><div class="btab" onclick="fBagOv(\'ticket\',this)">奖券</div></div>'+
        '<div class="bag-grid" id="bag-grid-ov"></div>';
      $('app').appendChild(bagOv);
    }
    bagOv.style.display='block';
    curBagFilter='all';
    renderBagOv();
    if(fab)fab.classList.add('open');
    setBagFabIcon(true);
  }else{
    const bagOv=$('bag-overlay');
    if(bagOv)bagOv.style.display='none';
    if(fab)fab.classList.remove('open');
    setBagFabIcon(false);
  }
}

let _bagDrag={on:false,sx:0,sy:0,l:0,t:0,moved:false};
function initBagFabDrag(){
  const fab=$('bag-fab');if(!fab)return;
  fab.addEventListener('pointerdown',e=>{
    _bagDrag.on=true;_bagDrag.moved=false;
    const r=fab.getBoundingClientRect();
    _bagDrag.sx=e.clientX;_bagDrag.sy=e.clientY;_bagDrag.l=r.left;_bagDrag.t=r.top;
    fab.setPointerCapture(e.pointerId);
  });
  fab.addEventListener('pointermove',e=>{
    if(!_bagDrag.on)return;
    const dx=e.clientX-_bagDrag.sx,dy=e.clientY-_bagDrag.sy;
    if(Math.abs(dx)+Math.abs(dy)>6)_bagDrag.moved=true;
    const maxL=window.innerWidth-fab.offsetWidth,maxT=window.innerHeight-fab.offsetHeight-8;
    const nl=Math.min(maxL,Math.max(0,_bagDrag.l+dx));
    const nt=Math.min(maxT,Math.max(50,_bagDrag.t+dy));
    fab.style.left=nl+'px';fab.style.top=nt+'px';fab.style.right='auto';fab.style.bottom='auto';
  });
  fab.addEventListener('pointerup',e=>{_bagDrag.on=false;if(_bagDrag.moved)e.preventDefault();});
  fab.addEventListener('click',e=>{if(_bagDrag.moved){e.preventDefault();e.stopPropagation();_bagDrag.moved=false;}});
}
function fBagOv(f,el){
  curBagFilter=f;
  document.querySelectorAll('#bag-tabs-ov .btab').forEach(t=>t.classList.remove('active'));
  if(el)el.classList.add('active');
  renderBagOv();
}
function navTo(page,el){
  // Close bag overlay when navigating
  if(_bagOpen)toggleBagFab();
  const pf=$('PF');
  if(pf){pf.style.display='none';pf.classList.remove('active');}
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(n=>n.classList.remove('active'));
  const pg=document.getElementById('page-'+page);
  if(pg)pg.classList.add('active');
  if(el)el.classList.add('active');
  if(page==='soul'){stopLotGeo();stopCwGeo();stopSbGeo();renderSoulPage();}
  else if(page==='hunt'){stopLotGeo();hideSoulGeo();stopCwGeo();renderSeasonalTasks();renderRecentRings();updateGodPath();setTimeout(()=>{if(!_sbGeoRaf)initSeasonalGeo();},80);}
  else if(page==='lottery'){hideSoulGeo();stopCwGeo();stopSbGeo();renderLotPage();}
  else if(page==='tasks'){stopLotGeo();hideSoulGeo();renderTasks();updateCultUI();renderSeasonalTasks();renderCalendar();setTimeout(()=>{if(!_cwGeoRaf)initCwGeo();if(!_sbGeoRaf)initSeasonalGeo();},80);}
  else if(page==='abyss'){stopLotGeo();hideSoulGeo();stopCwGeo();stopSbGeo();renderAbyssPage();}
  else{stopLotGeo();hideSoulGeo();stopCwGeo();stopSbGeo();}
}

function mergeTaskModulesIntoHunt(){
  const hunt=$('page-hunt');const task=$('page-tasks');
  if(!hunt||!task||hunt.dataset.merged==='1')return;
  const seasonal=task.querySelector('.sb-banner');
  if(seasonal){
    hunt.insertBefore(seasonal,hunt.children[1]);
  }
  task.style.display='none';
  hunt.dataset.merged='1';
}
// ══════════════════════════════════════════════════
//  AWAKENING
// ══════════════════════════════════════════════════
// game.js 版本保留但不直接覆盖模块版 triggerAwaken
// 模块版 triggerAwaken（在 awakening.js 中）是主要实现
// 此函数作为备用，通过 window.triggerAwakenGame 暴露
function triggerAwakenGame(){
  try {
    const saEl=$('SA');
    const c=saEl?saEl.querySelector('.aw-c'):null;
    if(c){c.style.transform='scale(.94)';setTimeout(()=>c.style.transform='',220);}

    const qk=getQK();
    const pool=SD[qk]||SD.common;
    const sd=pick(pool);
    const qc=QC[qk];
    if(!qc){console.error('[觉醒] QC缺失:',qk);return;}
    if(!sd){console.error('[觉醒] SD缺失');return;}

    let attrs=[...(sd.a||[])];
    if(Math.random()<0.06){attrs.push(pick(["混沌","神秘","极致","变异","觉醒","逆天"])+'·'+(attrs[0]||'未知'));notify('⚡ 属性变异！','epic');}

    G.soul={
      id:Date.now(),name:sd.n,icon:sd.i,quality:qk,
      desc:sd.d,attrs,initPow:Math.min(10,sd.p||1),
      rings:[],skills:genSkills(sd,qk),
      secondAwakened:false,divine:false,
    };
    G.awakenDone=true;G.level=Math.max(G.level,G.soul.initPow);
    addExp(G.soul.initPow*60);updateHUD();
    if(typeof addSoulFragment==='function') addSoulFragment(qk,1);

    // show result
    const orB=document.getElementById('or-b');
    if(orB)orB.style.setProperty('--bc',qc.bc);
    
    const orIE=document.getElementById('or-i');
    if(orIE){
      try{orIE.innerHTML=typeof getSoulIcon==='function'?getSoulIcon(sd.n,qk,{sizeClass:'size-xlarge'}):(sd.i||'⚡');}catch(e){orIE.innerHTML=sd.i||'⚡';}
      orIE.style.display='flex';orIE.style.alignItems='center';orIE.style.justifyContent='center';
    }
    
    const orQ=document.getElementById('or-q');
    if(orQ){orQ.textContent=qc.n+' 品质';orQ.style.color=qc.c;}
    
    const orN=document.getElementById('or-n');
    if(orN){orN.textContent=sd.n;orN.style.color=qc.c;}
    
    const orD=document.getElementById('or-d');
    if(orD)orD.textContent=sd.d;
    
    const orP=document.getElementById('or-p');
    if(orP)orP.textContent=G.soul.initPow;
    
    const orA=document.getElementById('or-a');
    if(orA)orA.textContent=(attrs.slice(0,2).join('·'));
    
    const orQ2=document.getElementById('or-q2');
    if(orQ2)orQ2.textContent=qc.n;
    
    const orEl=$('OR');
    if(orEl)orEl.classList.add('show');
    
    if(typeof spawnBurst==='function')spawnBurst(qc.c,110);
    
    if(['legend','apex','hc','ha','twin','triple'].includes(qk)){
      const m={legend:'🌟 传说武魂！',apex:'🔥 顶级武魂！震撼！',hc:'🟢 隐藏武魂！',ha:'💗 顶级隐藏！',twin:'✨ 双生武魂！旷世奇才！',triple:'🌈 三生武魂！天命之子！'};
      setTimeout(()=>notify(m[qk],'divine'),250);
    }
    if(typeof saveG==='function') saveG();
    console.log('[觉醒] 觉醒完成:',sd.n,qc.n);
  } catch(err) {
    console.error('[觉醒] triggerAwakenGame 错误:',err);
  }
}

function closeResult(){
  $remCls('OR','show');$style('SA','display','none');
  // Record in grimoire
  if(G.soul)grimoireDiscover(G.soul.name,G.soul.quality);
  // Ensure soul page is active before rendering
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(n=>n.classList.remove('active'));
  const sp=document.getElementById('page-soul');
  if(sp)sp.classList.add('active');
  const firstNi=document.querySelector('#bnav .ni');
  if(firstNi)firstNi.classList.add('active');
  renderSoulPage();
  setTimeout(()=>checkNewbieGift(),600);
}

// ══════════════════════════════════════════════════
//  SKILL GENERATION
// ══════════════════════════════════════════════════
function genSkills(sd,qk){
  const bm={
    common:[{n:"体质强化",d:"提升躯体素质与耐久。",p:["攻击+2","防御+2","体质+3"]}],
    rare:  [{n:"属性共鸣",d:"与武魂属性共鸣，属性伤害大幅提升。",p:["属性伤害+20%","共鸣时长5秒"]}],
    epic:  [{n:"领域感知",d:"感知领域边缘，获取初期领域能力。",p:["领域范围10m","压制20%","持续8秒"]}],
    legend:[{n:"领域半开",d:"领域半开展，产生显著特殊效果。",p:["领域范围25m","速度-30%(敌)","持续15秒"]}],
    apex:  [{n:"领域全开",d:"领域完全展开，范围内强力压制。",p:["领域范围50m","全属性-50%(敌)","持续30秒"]}],
    hc:    [{n:"隐匿天赋",d:"隐藏武魂特殊天赋觉醒。",p:["隐身效果+40%","暗属性+60%"]}],
    ha:    [{n:"绝世之力",d:"绝世之力爆发，凌驾一切。",p:["伤害×5","无视防御20%","持续10秒"]}],
    twin:  [{n:"双生共鸣",d:"双生武魂共鸣，两种力量互相增幅。",p:["双重伤害+100%","共鸣爆发概率15%"]}],
    triple:[{n:"三生轮回",d:"三生武魂轮回之力觉醒。",p:["轮回伤害+200%","生命恢复+50%/秒"]}],
  };
  const base=bm[qk]||bm.common;
  const attrSk={n:`${(sd.a||['未知'])[0]}精通`,d:`天生${(sd.a||[''])[0]}属性精通。`,p:[`${(sd.a||[''])[0]}伤害+35%`,`感知+50%`]};
  return [...base,attrSk].map(sk=>{
    const mut=Math.random()<0.006;
    return{name:sk.n+(mut?'·质变':''),desc:sk.d+(mut?' 【质变：效果+300%！】':''),params:sk.p,ring:0};
  });
}

// ══════════════════════════════════════════════════
//  SOUL PAGE RENDER
// ══════════════════════════════════════════════════

function renderSoulPage(){
  const p=document.getElementById('page-soul');
  if(!G.awakenDone||!G.soul){
    p.innerHTML='<div class="empty-st"><div class="ei">🌀</div><div class="em">尚未觉醒武魂</div></div>';
    hideSoulGeo();return;
  }
  const s=G.soul,qc=QC[s.quality]||QC.common;
  const need=expForLv(G.level);
  const ePct=Math.min(100,(G.exp/need)*100);

  // Quality theme colors
  const QTHEMES={
    common: {col:'#9ca3af',glow:'rgba(156,163,175,.3)',bg1:'rgba(156,163,175,.07)',rgb:'156,163,175',geo:2},
    rare:   {col:'#3b82f6',glow:'rgba(59,130,246,.35)',bg1:'rgba(59,130,246,.09)',rgb:'59,130,246',geo:3},
    epic:   {col:'#8b5cf6',glow:'rgba(139,92,246,.4)',bg1:'rgba(139,92,246,.1)',rgb:'139,92,246',geo:3},
    legend: {col:'#f59e0b',glow:'rgba(245,158,11,.4)',bg1:'rgba(245,158,11,.1)',rgb:'245,158,11',geo:4},
    apex:   {col:'#ef4444',glow:'rgba(239,68,68,.45)',bg1:'rgba(239,68,68,.1)',rgb:'239,68,68',geo:5},
    hc:     {col:'#10b981',glow:'rgba(16,185,129,.4)',bg1:'rgba(16,185,129,.09)',rgb:'16,185,129',geo:3},
    ha:     {col:'#ec4899',glow:'rgba(236,72,153,.45)',bg1:'rgba(236,72,153,.1)',rgb:'236,72,153',geo:4},
    twin:   {col:'#f0abfc',glow:'rgba(240,171,252,.5)',bg1:'rgba(240,171,252,.08)',rgb:'240,171,252',geo:5},
    triple: {col:'#e2e8f0',glow:'rgba(226,232,240,.5)',bg1:'rgba(226,232,240,.08)',rgb:'226,232,240',geo:6},
  };
  const qt=QTHEMES[s.quality]||QTHEMES.common;

  // Parse RGB
  const [qR,qG,qB]=qt.rgb.split(',');

  // Title display
  const eq_t=G.equippedTitle;
  const titleH=eq_t
    ?`<div class="sol-title" onclick="openTitleSelect()">
        <span class="sol-title-star" style="color:${eq_t.c||qt.col}">★</span>
        <span class="sol-title-name">${eq_t.n}</span>
        <span class="sol-title-change">更换 ›</span>
      </div>`
    :(G.titles.length>0
      ?`<div class="sol-title" onclick="openTitleSelect()"><span class="sol-title-name" style="color:var(--dim)">选择称号 ›</span></div>`
      :'');

  // Ring arc HTML
  const RING_COLS=['#a78bfa','#a78bfa','#60a5fa','#34d399','#fbbf24','#f87171','#e879f9','#fffbeb','#00ffff','#ffd700'];
  const arcPositions=[
    {l:0,b:8},{l:32,b:8},{l:64,b:8},{l:96,b:8},{l:128,b:8},
    {l:160,b:8},{l:192,b:8},{l:224,b:8},{l:256,b:8},{l:288,b:8}
  ];
  const ringArcH=Array(10).fill(0).map((_,i)=>{
    const r=s.rings[i];
    const pos=arcPositions[i]||{l:i*30,b:0};
    if(r){
      const tc=RING_COLS[i]||r.c||'#a78bfa';
      return `<div class="sv2-r-orb" style="--rc:${tc};left:${pos.l}px;bottom:${pos.b}px">${r.n?r.n[0]:i+1}</div>`;
    }
    return `<div class="sv2-r-orb empty" style="left:${pos.l}px;bottom:${pos.b}px">+</div>`;
  }).join('');

  // Ring list (top 3 + more)
  const ringListH=(s.rings.length>0?s.rings.slice(0,3).map((r,i)=>{
    const tc=RING_COLS[i]||r.c||'#a78bfa';
    return`<div class="sv2-rl-row">
      <div class="sv2-rl-dot" style="background:${tc}"></div>
      <div class="sv2-rl-name">${r.sk||r.n}</div>
      <div class="sv2-rl-tier">${r.n}</div>
      <div class="sv2-rl-pw">+${r.pw||0}</div>
    </div>`;
  }).join(''):'<div style="font-size:10px;color:var(--dim);text-align:center;padding:6px">暂无魂环 · 狩猎获取</div>');

  // Ring hint
  const nextSlot=s.rings.length+1;
  const reqLv=nextSlot*10;
  const ringHintH=s.rings.length<10
    ?(G.level<reqLv
      ?`<div style="font-size:9px;color:var(--apex);margin-top:5px">⚠️ 第${nextSlot}环需 Lv.${reqLv}</div>`
      :`<div style="font-size:9px;color:var(--hc);margin-top:5px">✅ 可装配第${nextSlot}环</div>`)
    :'<div style="font-size:9px;color:var(--gold);margin-top:5px">✅ 已满十环</div>';

  // Bone slots mini
  const boneSlotH=BONE_SLOTS.map(bs=>{
    const eq=G.equippedBones[bs.s];
    return`<div class="sv2-b-slot${eq?' on':''}" onclick="openBoneSlot('${bs.s}')">
      ${eq?eq.i:bs.i}
      <div class="sv2-b-pw">${eq?'+'+eq.pw:'空'}</div>
    </div>`;
  }).join('');
  const boneCount=Object.values(G.equippedBones).filter(Boolean).length;
  const specCount=Object.keys(G.equippedBones).filter(k=>k.startsWith('extra_')).length;

  // Artifact
  let artBodyH='';
  if(G.equippedArt){
    const a=G.equippedArt;
    artBodyH=`<div class="sv2-art">
      <div class="sv2-art-wrap eq"><span style="filter:drop-shadow(0 0 7px ${qt.glow})">${a.i}</span></div>
      <div class="sv2-art-name">${a.n}</div>
      <div class="sv2-art-pw">战力+${a.pw}</div>
      <div class="sv2-art-bonus">${a.bonus}</div>
    </div>`;
  } else {
    const av=G.bag.filter(i=>i.type==='artifact');
    if(av.length){
      artBodyH=`<div style="display:flex;flex-direction:column;gap:6px">${av.slice(0,1).map(it=>`
        <div style="display:flex;align-items:center;gap:7px">
          <span style="font-size:22px">${it.data.i}</span>
          <div style="flex:1;font-size:10px;color:var(--legend)">${it.data.n}</div>
          <div onclick="equipArt('${it.data.id}')" style="font-size:9px;padding:3px 8px;border-radius:6px;border:1px solid var(--bdrB);color:var(--gl);cursor:pointer;background:rgba(201,162,39,.08)">穿戴</div>
        </div>`).join('')}</div>`;
    } else {
      artBodyH=`<div class="sv2-art-none">暂无神器</div>`;
    }
  }

  // Skills top 3
  const skIcos=['⚡','🐉','🌀','✨','💫','🔮'];
  const skillsH=(s.skills||[]).slice(0,3).map((sk,i)=>`
    <div class="sv2-sk">
      <div class="sv2-sk-ico">${skIcos[i%skIcos.length]}</div>
      <div class="sv2-sk-body">
        <div class="sv2-sk-name">${sk.name}</div>
        <div class="sv2-sk-desc">${sk.desc}</div>
      </div>
      <div class="sv2-sk-ring" ${sk.ring&&sk.name.includes('质变')?'style="color:#e879f9;background:rgba(232,121,249,.1)"':''}>${sk.ring?`第${sk.ring}环`:'基础'}</div>
    </div>`).join('');

  // God banner
  const godBannerH=s.isGod&&s.godType?(()=>{
    const GOD_COLS={exam_poseidon:'#38bdf8',exam_angel:'#fde68a',exam_asura:'#ef4444'};
    const GOD_ICOS={exam_poseidon:'🌊',exam_angel:'😇',exam_asura:'⚔️'};
    const col=GOD_COLS[s.godType]||'#ffd700';
    const ico=GOD_ICOS[s.godType]||'✨';
    return`<div class="sv2-god-banner" style="background:${col}12;border:1px solid ${col}40">
      <div class="sv2-god-ico">${ico}</div>
      <div>
        <div class="sv2-god-name" style="color:${col}">${s.name}</div>
        <div class="sv2-god-sub" style="color:${col}">神位传承完成 · 神力永恒</div>
      </div>
    </div>`;
  })():'';

  // Resonance
  const godBoneCount=Object.values(G.equippedBones||{}).filter(b=>b&&b.god).length;
  const resonanceH=(G.equippedArt&&godBoneCount>0)
    ?`<div class="sv2-resonance">⚡ 神骨共鸣 · 神器战力额外+50% <span style="color:#00ffff">×${godBoneCount}件</span></div>`:'';

  // Awaken level persistent FX
  const awkLv=G.awakenLevel||0;
  const awkCol=qc.c||'#a78bfa';
  let awakenFXH='';
  if(awkLv>=1){
    awakenFXH+=`<div class="sol-dot" style="background:${awkCol};box-shadow:0 0 6px ${awkCol},0 0 12px ${awkCol};--s:45deg;animation-duration:11s"></div>`;
    awakenFXH+=`<div class="sol-dot" style="background:${awkCol};box-shadow:0 0 6px ${awkCol},0 0 12px ${awkCol};--s:225deg;animation-duration:11s"></div>`;
  }
  if(awkLv>=2){
    awakenFXH+=`<div class="sol-ring" style="width:140px;height:140px;border-color:${awkCol};opacity:.12;animation:solSpin 18s linear infinite reverse"></div>`;
    awakenFXH+=`<div class="sol-ring" style="width:210px;height:210px;border-color:${awkCol};opacity:.06;border-style:dashed;animation:solSpin 32s linear infinite"></div>`;
  }
  if(awkLv>=5) awakenFXH+=`<div class="awk-aura-ring" style="width:175px;height:175px;--awk-col:${awkCol}"></div>`;
  if(awkLv>=6) awakenFXH+=`<div class="awk-aura-ring" style="width:205px;height:205px;animation-delay:.4s;--awk-col:${awkCol}"></div>`;
  if(awkLv>=7) awakenFXH+=`<div class="awk-aurora" style="--awk-col:${awkCol}"></div>`;
  if(awkLv>=8){
    for(let i=0;i<6;i++){const deg=i*60,delay=(i*.4).toFixed(1);awakenFXH+=`<div class="awk-particle" style="--awk-col:${awkCol};left:50%;top:50%;transform:rotate(${deg}deg) translateX(55px);animation-delay:${delay}s"></div>`;}
  }
  if(awkLv>=9) awakenFXH+=`<div class="awk-halo" style="--awk-col:${awkCol}"></div>`;
  if(awkLv>=10) awakenFXH+=`<div class="awk-limit-badge">∞</div>`;

  p.innerHTML=`
    <div class="soul-v2-hero">
      <!-- Orbit system -->
      <div class="soul-orbit">
        <div class="sol-ring r1" style="border-color:${qt.col}"></div>
        <div class="sol-ring r2" style="border-color:${qt.col}"></div>
        <div class="sol-ring r3" style="border-color:${qt.col}"></div>
        <div class="sol-dot" style="background:${qt.col};box-shadow:0 0 6px ${qt.col},0 0 12px ${qt.col};--s:0deg"></div>
        <div class="sol-dot" style="background:${qt.col};box-shadow:0 0 6px ${qt.col},0 0 12px ${qt.col};--s:180deg"></div>
        <div class="sol-dot s2" style="background:${qt.col};opacity:.6;--s:90deg;animation-name:solDotOrbit2"></div>
        <div class="sol-dot s2" style="background:${qt.col};opacity:.6;--s:270deg;animation-name:solDotOrbit2"></div>
        <div class="sol-glow" style="background:radial-gradient(ellipse at 40% 35%,${qt.bg1},transparent 70%)"></div>
        <div class="sol-icon" style="filter:drop-shadow(0 0 16px ${qt.glow}) drop-shadow(0 4px 8px rgba(0,0,0,.6));display:flex;align-items:center;justify-content:center;">${getSoulIcon(s.name,s.quality,{sizeClass:'size-large'})}</div>
        ${awakenFXH}
      </div>
      ${(G.awakenLevel||0)>=10?`<div class="awk-∞-hero" style="--∞c:${qt.col};--∞r:${qR};--∞g:${qG};--∞b:${qB}"><div class="awk-∞-glow"></div><div class="awk-∞-symbol">∞</div><div class="awk-∞-label">极限觉醒</div></div>`:''}
      <!-- Identity -->
      <div class="sol-name" style="color:${qt.col};text-shadow:0 0 22px ${qt.glow}">${s.name}</div>
      <div class="sol-meta">
        <div class="sol-quality-tag" style="border-color:${qt.col};color:${qt.col};background:rgba(${qt.rgb},.1);box-shadow:0 0 10px rgba(${qt.rgb},.25)">
            <div class="sol-qt-dot" style="background:${qt.col};box-shadow:0 0 5px ${qt.col}"></div>
            ${qc.n}
          </div>
        <div class="sol-dot-sep"></div>
        <div class="sol-rank">${rankStr(G.level)}</div>
        ${s.secondAwakened||s.divine?`<div class="sol-dot-sep"></div><div class="sol-rank" style="color:rgba(255,255,255,.3)">${s.isGod?'神位传承':'二次觉醒'}</div>`:''}
        <div class="sol-dot-sep"></div>
        ${eq_t
          ?`<div class="sol-title" onclick="openTitleSelect()" style="margin-bottom:0"><span class="sol-title-star" style="color:${eq_t.c||qt.col}">★</span><span class="sol-title-name">${eq_t.n}</span></div>`
          :(G.titles.length>0
            ?`<div class="sol-title" onclick="openTitleSelect()" style="margin-bottom:0"><span class="sol-title-name" style="color:var(--dim)">选择称号 ›</span></div>`
            :'')}
        ${G.awakenLevel>0?`<div class="sol-dot-sep"></div><div class="sol-rank" style="color:#c4b5fd">✦ Lv.${G.awakenLevel}</div>`:''}
        ${(()=>{const t=TALENTS.find(x=>x.id===G.talent);if(!t)return '';return '<div class="sol-dot-sep"></div><div class="sol-rank" style="color:'+t.col+'">'+t.icon+' '+t.name+'</div>';})()}
      </div>

      <!-- v9: Unified 4-action row — width matches ring card (padding 0 11px) -->
      <div class="sol-actions" style="margin:0 -5px 10px">
        <div class="sol-act" onclick="doSecondAwaken()">
          <div class="sol-act-ico">⚡</div><div class="sol-act-lbl">二次觉醒</div>
        </div>
        <div class="sol-act" onclick="openSoulResonance()">
          <div class="sol-act-ico">✨</div><div class="sol-act-lbl">武魂共鸣</div>
        </div>
        <div class="sol-act" onclick="openSoulEvolution()">
          <div class="sol-act-ico">🌟</div><div class="sol-act-lbl">武魂传承</div>
        </div>
        <div class="sol-act" onclick="openSoulDetail()">
          <div class="sol-act-ico">📖</div><div class="sol-act-lbl">魂技详情</div>
        </div>
        <div class="sol-act" onclick="openTaskPage()">
          <div class="sol-act-ico">📜</div><div class="sol-act-lbl">修炼任务</div>
        </div>
      </div>
    </div>

    ${godBannerH}

    <!-- Rings -->
    <div class="sv2-card accent">
      <div class="sv2-head">
        <div class="sv2-title">魂环 ${s.rings.length}/10</div>
        <div class="sv2-action" onclick="openAssignRing()">${s.rings.length<10?'装配 +':''}</div>
      </div>
      <div class="sv2-ring-arc">${ringArcH}</div>
      <div class="sv2-rl">${ringListH}</div>
      ${s.rings.length>3?`<div class="sv2-rl-more" onclick="openSoulDetail()">还有 ${s.rings.length-3} 个魂技 · 展开</div>`:''}
      ${ringHintH}
    </div>

    <!-- Bone + Art -->
    <div class="sv2-gear">
      <div class="sv2-gcol">
        <div class="sv2-gc-head">
          <div class="sv2-gc-title">魂骨</div>
          <div class="sv2-gc-action" onclick="openBonePanel()">管理 ›</div>
        </div>
        <div class="sv2-bone-grid">${boneSlotH}</div>
        <div class="sv2-bone-sum">${boneCount}/6装备 · 特殊${specCount}/6</div>
      </div>
      <div class="sv2-gcol">
        <div class="sv2-gc-head">
          <div class="sv2-gc-title">神器</div>
          <div class="sv2-gc-action" onclick="${G.equippedArt?'unequipArt()':''}">
            ${G.equippedArt?'卸下 ›':''}
          </div>
        </div>
        ${artBodyH}
      </div>
    </div>

    ${resonanceH}

    <!-- Skills -->
    <div class="sv2-card">
      <div class="sv2-head">
        <div class="sv2-title">魂技</div>
        <div class="sv2-action" onclick="openSoulDetail()">全部 ${s.skills?.length||0} 个 ›</div>
      </div>
      ${skillsH||'<div style="font-size:10px;color:var(--dim)">暂无魂技</div>'}
    </div>

    <div class="sv2-bottom-row" style="margin-top:0">
      <div class="sv2-reawaken-btn" onclick="confirmReset()">🔄 再次觉醒</div>
    </div>
    <div style="height:6px;position:relative;z-index:1"></div>
  `;

  // 重新应用2.5D效果
  if(window.reinitSoulPage)window.reinitSoulPage();

  // Trigger geo background
  showSoulGeo(qt, [parseFloat(qR),parseFloat(qG),parseFloat(qB)], qt.geo);
  // Set CSS vars for rgb-based rules
  document.documentElement.style.setProperty('--qcR',qR);
  document.documentElement.style.setProperty('--qcG',qG);
  document.documentElement.style.setProperty('--qcB',qB);
  document.documentElement.style.setProperty('--soul-col',qt.col);
  document.documentElement.style.setProperty('--soul-glow',qt.glow);
  document.documentElement.style.setProperty('--qc-border',`rgba(${qR},${qG},${qB},.28)`);
  document.documentElement.style.setProperty('--qc-bg',`rgba(${qR},${qG},${qB},.06)`);
  document.documentElement.style.setProperty('--qc-bg2',`rgba(${qR},${qG},${qB},.04)`);
  document.documentElement.style.setProperty('--qc-accent',`rgba(${qR},${qG},${qB},.12)`);
  document.documentElement.style.setProperty('--qc-accent2',`rgba(${qR},${qG},${qB},.08)`);
  document.documentElement.style.setProperty('--qc-accent3',`rgba(${qR},${qG},${qB},.35)`);
  updateHUD();
}

function isLightQColor(hex){
  const r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(!r)return false;
  return(parseInt(r[1],16)*.299+parseInt(r[2],16)*.587+parseInt(r[3],16)*.114)>150;
}

// ── Soul geo background system (已禁用) ──
let _geoAnimFrame=null;
function showSoulGeo(qt,rgb,rings){
  // 背景特效已移除
  return;
}
function hideSoulGeo(){
  const cvs=document.getElementById('soul-geo-canvas');
  if(cvs)cvs.classList.remove('visible');
  if(_geoAnimFrame){cancelAnimationFrame(_geoAnimFrame);_geoAnimFrame=null;}
}

// ──── BONE MANAGEMENT ────
function slotBoneType(slot){
  if(slot==='head')return 'head';
  if(slot==='body')return 'body';
  if(slot==='la'||slot==='ra')return 'arm';
  if(slot==='ll'||slot==='rl')return 'leg';
  return slot;
}
function openBoneSlot(slot){
  if(!G.unlockedSystems?.bone&&G.level<10){
    notify('🦴 魂骨系统在 Lv.10 解锁！','normal');return;
  }
  const eq=G.equippedBones[slot];
  const slotType=slotBoneType(slot);
  // Only show bones matching this slot type
  const allBones=G.bag.filter(i=>i.type==='bone'&&i.data&&(i.data.s===slot||i.data.s===slotType));

  let html=`<div class="m-title">🦴 魂骨管理</div>`;
  if(eq){
    html+=`<div class="m-sub" style="color:var(--gold)">当前装备: ${eq.n}</div>
      <div class="m-ag" style="margin-bottom:12px">
        <div class="m-at"><div class="m-an">战力加成</div><div class="m-av">+${eq.pw}</div></div>
        <div class="m-at"><div class="m-an">增益</div><div class="m-av" style="font-size:11px">${eq.bonus||'-'}</div></div>
        ${eq.special?`<div class="m-at" style="grid-column:span 2"><div class="m-an">特殊效果</div><div class="m-av" style="font-size:11px;color:var(--hc)">${eq.special}</div></div>`:''}
      </div>
      <div class="m-acts">
        <div class="m-btn bad" onclick="unequipBone('${slot}');cModal(event)">卸下魂骨</div>
      </div>`;
  }else{
    html+=`<div class="m-sub">选择魂骨装备到此部位</div>`;
    if(allBones.length){
      html+=`<div style="display:flex;flex-direction:column;gap:7px;margin-top:8px">
        ${allBones.slice(0,6).map(b=>`<div class="ring-item" style="cursor:pointer" onclick="equipBoneToSlot('${b.data.id||b.id}','${slot}')">
          <div style="font-size:22px;flex-shrink:0">${b.data.i||'🦴'}</div>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600;color:var(--gl)">${b.data.n}</div>
            <div style="font-size:10px;color:var(--dim)">战力+${b.data.pw||0} · ${b.data.bonus||''}</div>
            ${b.data.special?`<div style="font-size:9px;color:var(--hc)">${b.data.special}</div>`:''}
          </div>
          <div class="m-btn ok" style="padding:4px 8px;font-size:10px">装备</div>
        </div>`).join('')}
      </div>`;
    }else{
      html+=`<div style="text-align:center;padding:20px;color:var(--dim);font-size:12px">背包中暂无魂骨</div>`;
    }
  }
  openModal(html);
}

function openBonePanel(){
  if(!G.unlockedSystems?.bone&&G.level<10){
    notify('🦴 魂骨系统在 Lv.10 解锁！当前：Lv.'+G.level,'normal');return;
  }
  let html=`<div class="m-title">🦴 魂骨总览</div><div class="m-sub">点击部位管理魂骨</div>`;
  html+=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:10px">`;
  BONE_SLOTS.forEach(bs=>{
    const eq=G.equippedBones[bs.s];
    html+=`<div style="background:${eq?'rgba(251,191,36,.06)':'var(--bgc)'};border:1px solid ${eq?'rgba(251,191,36,.35)':'var(--bdr)'};border-radius:8px;padding:8px 5px;text-align:center;cursor:pointer" onclick="openBoneSlot('${bs.s}');cModal(event);setTimeout(()=>document.getElementById('modal').classList.add('show'),50)">
      <div style="font-size:22px">${eq?eq.i:bs.i}</div>
      <div style="font-size:9px;color:var(--dim);margin-top:2px">${bs.n}</div>
      <div style="font-size:9px;color:var(--gold);margin-top:1px">${eq?`+${eq.pw}`:'-'}</div>
    </div>`;
  });
  html+=`</div>`;
  // Special bones in bag
  const specAvail=G.bag.filter(i=>i.type==='bone'&&i.data&&i.data.s==='extra');
  const specEquippedCount=Object.keys(G.equippedBones).filter(k=>k.startsWith('extra_')).length;
  if(specAvail.length){
    const specSlotsFull=specEquippedCount>=(MAX_SPECIAL_BONES||6);
    html+=`<div style="margin-top:12px;display:flex;align-items:center;justify-content:space-between;margin-bottom:7px">
      <span style="font-size:11px;color:var(--dim)">特殊魂骨（上限6件）</span>
      <span style="font-size:10px;color:${specSlotsFull?'var(--apex)':'var(--hc)'}">${specEquippedCount}/${MAX_SPECIAL_BONES||6}${specSlotsFull?' 已满':''}</span>
    </div>`;
    html+=specAvail.map(b=>`<div class="ring-item" style="cursor:pointer" onclick="equipSpecialBone('${b.data.id||b.id}')">
      <div style="font-size:22px;flex-shrink:0">${b.data.i}</div>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:600;color:var(--apex)">${b.data.n}</div>
        <div style="font-size:10px;color:var(--dim)">战力+${b.data.pw} · ${b.data.bonus}</div>
        <div style="font-size:9px;color:var(--hc)">${b.data.special}</div>
      </div>
      <div class="m-btn ok" style="padding:4px 8px;font-size:10px">装备</div>
    </div>`).join('');
  }
  openModal(html);
}

function equipBoneToSlot(id,slot){
  const item=G.bag.find(i=>(i.data?.id==id)||(i.id==id));
  if(!item)return;
  if(G.equippedBones[slot]){
    G.bag.push({type:'bone',data:G.equippedBones[slot],count:1,id:Date.now()});
  }
  G.equippedBones[slot]=item.data;
  G.bag=G.bag.filter(i=>(i.data?.id!=id)&&(i.id!=id));
  notify('🦴 '+(item.data.n)+' 已装备！战力+'+(item.data.pw),'epic');
  afterAction(['soul']);$remCls('modal','show');
}

function equipSpecialBone(id){
  const item=G.bag.find(i=>(i.data?.id==id)||(i.id==id));
  if(!item)return;
  // Enforce 6-slot limit for special bones
  const specCount=Object.keys(G.equippedBones).filter(k=>k.startsWith('extra_')).length;
  if(specCount>=(MAX_SPECIAL_BONES||6)){
    notify('特殊魂骨已达上限（最多6件），请先卸下一件！','normal');
    return;
  }
  const key='extra_'+id;
  G.equippedBones[key]=item.data;
  G.bag=G.bag.filter(i=>(i.data?.id!=id)&&(i.id!=id));
  notify('✨ '+item.data.n+' 特殊魂骨已装备！战力+'+item.data.pw+'，'+item.data.special,'legend');
  spawnBurst('#ef4444',50);
  afterAction(['soul']);
  $remCls('modal','show');
}

function unequipBone(slotOrId){
  if(G.equippedBones[slotOrId]){
    G.bag.push({type:'bone',data:G.equippedBones[slotOrId],count:1,id:Date.now()});
    delete G.equippedBones[slotOrId];
    notify('魂骨已卸下','normal');
    updateHUD();saveG();renderSoulPage();
    $remCls('modal','show');
  }
}

function doSecondAwaken(){
  if(!G.soul){notify('请先觉醒武魂','normal');return;}
  if(G.soul.divine){notify('该武魂已为神级','normal');return;}
  if(G.sp<500){notify('魂力不足！需要500','normal');return;}
  G.sp-=500;
  if(Math.random()<0.22){
    G.soul.divine=true;G.soul.quality='apex';
    G.soul.attrs.push('神级','超越');
    notify(`🌟 ${G.soul.name} 晋升神级武魂！`,'divine');spawnBurst('#ffd700',120);
  }else{
    if(Math.random()<0.28){G.soul.attrs.push('暴击·'+pick(G.soul.attrs||['力量']));notify('⚡ 属性暴击！','epic');}
    const od=['common','rare','epic','legend','apex'],idx=od.indexOf(G.soul.quality);
    if(idx<od.length-1&&Math.random()<0.42){
      G.soul.quality=od[idx+1];
      notify(`✨ ${G.soul.name} 品质提升为 ${QC[G.soul.quality].n}！`,'legend');
    }else notify(`${G.soul.name} 二次觉醒完成`,'normal');
    G.soul.secondAwakened=true;
  }
  if(G.soul)grimoireDiscover(G.soul.name,G.soul.quality);
  addExp(250);updateHUD();saveG();renderSoulPage();
}

function openSoulDetail(){
  if(!G.soul)return;
  const s=G.soul,qc=QC[s.quality]||QC.common;
  const skH=(s.skills||[]).map(sk=>`
    <div class="skill-item">
      <div class="ski-head"><span class="ski-name">${sk.name}</span><span class="ski-ring">${sk.ring?`第${sk.ring}环`:'基础'}</span></div>
      <div class="ski-desc">${sk.desc}</div>
      <div class="ski-params">${(sk.params||[]).map(p=>`<span class="ski-p">${p}</span>`).join('')}</div>
    </div>`).join('');
  openModal(`
    <div style="font-size:11px;color:var(--dim);text-align:center;margin-bottom:11px;line-height:1.7">${s.desc}</div>
    <div class="m-ag" style="margin-bottom:11px">
      <div class="m-at"><div class="m-an">初始魂力</div><div class="m-av">${s.initPow}</div></div>
      <div class="m-at"><div class="m-an">品质</div><div class="m-av" style="color:${qc.c};font-size:12px">${qc.n}</div></div>
      ${s.attrs.map(a=>`<div class="m-at"><div class="m-an">属性</div><div class="m-av" style="font-size:11px">${a}</div></div>`).join('')}
    </div>
    <div class="m-sec"><div class="m-sec-t">魂技列表</div>${skH||'<div style="font-size:11px;color:var(--dim)">暂无</div>'}</div>`,
    `<span style="display:flex;align-items:center;gap:8px;"><span style="display:flex;align-items:center;">${getSoulIcon(s.name,s.quality,{sizeClass:'size-small'})}</span><span>${s.name} · ${qc.n}品质</span></span>`);
}

function openTaskPage(){
  if(!G.soul){notify('请先觉醒武魂','normal');return;}
  if(!G.tasks.length)genTasks();
  const taskHtml='<div class="task-modal-page">'+
    '<div class="cult-widget"><div class="cw-body">'+
      '<div class="cw-head"><div class="cw-title">魂力修炼</div><div class="cw-income"><span style="color:#6ee7b7">+2/秒</span><span style="opacity:.5"> 挂机</span>&nbsp;·&nbsp;<span style="color:#93c5fd">+100/分</span><span style="opacity:.5"> 在线</span></div></div>'+
      '<div class="cw-bars">'+
        '<div class="cw-bar-row"><div class="cw-bar-lbl" style="color:#6ee7b7">修炼</div><div class="cw-bar-trk"><div class="cw-bar-fill cult-f idle-bar-m" id="idle-bar" style="width:0%"></div></div><div class="cw-bar-num idle-txt-m">0/5000</div></div>'+
        '<div class="cw-bar-row"><div class="cw-bar-lbl" style="color:#93c5fd">探索</div><div class="cw-bar-trk"><div class="cw-bar-fill expl-f expl-bar-m" id="expl-bar" style="width:0%"></div></div><div class="cw-bar-num expl-txt-m">0/5000</div></div>'+
      '</div>'+
      '<div class="cw-acts">'+
        '<div class="cw-btn cult-b" onclick="cultivate()"><div class="cw-btn-ico">🧘</div><div class="cw-btn-lbl">修炼 (+200)</div><div class="cw-btn-cnt cult-cnt-m">0/10</div></div>'+
        '<div class="cw-btn expl-b" onclick="explore()"><div class="cw-btn-ico">🌲</div><div class="cw-btn-lbl">探索 (+500)</div><div class="cw-btn-cnt expl-cnt-m">0/10</div></div>'+
      '</div>'+
    '</div></div>'+
    '<div class="tasks-sh" style="padding-top:12px">'+
      '<div class="tasks-sh-title">日常任务</div>'+
      '<div class="tasks-sh-right"><div class="tasks-refresh-btn" onclick="refreshTasks()">刷新 <span class="refresh-cost-m"></span></div></div>'+
    '</div>'+
    '<div class="daily-tasks-m"></div>'+
    '<div class="tasks-sh" style="padding-top:10px">'+
      '<div class="tasks-sh-title">隐藏任务</div>'+
    '</div>'+
    '<div class="hidden-tasks-m"></div>'+
  '</div>';
  openModal(taskHtml,'📜 修炼任务');
  setTimeout(()=>{
    renderModalTasks();
    const de=document.querySelector('.daily-e-m');
    if(de)de.textContent=G.dailyEarned;
    updateRefreshBtn();
    updateCultUI();
  },10);
}
function equipArt(id){
  const it=G.bag.find(i=>i.type==='artifact'&&i.data.id===id);
  if(!it)return;
  if(G.equippedArt)G.bag.push({type:'artifact',data:G.equippedArt,count:1,id:Date.now()});
  G.equippedArt=it.data;
  G.bag=G.bag.filter(i=>!(i.type==='artifact'&&i.data.id===id));
  notify(`⚔️ ${it.data.n} 已装备！战力+${it.data.pw}`,'legend');
  updateHUD();saveG();renderSoulPage();
  $remCls('modal','show');
}
function unequipArt(){
  if(!G.equippedArt)return;
  G.bag.push({type:'artifact',data:G.equippedArt,count:1,id:Date.now()});
  notify(`${G.equippedArt.n} 已卸下`,'normal');
  G.equippedArt=null;updateHUD();saveG();renderSoulPage();
}

function openAssignRing(filterCat){
  const rings=G.bag.filter(i=>i.type==='ring');
  if(!G.soul){notify('请先觉醒武魂','normal');return;}
  if(G.soul.rings.length>=10){notify('武魂已满10环！','normal');return;}
  const nextSlot=G.soul.rings.length+1;
  const reqLv=nextSlot*10;
  // Fix: check level gate BEFORE opening RSM (was checked after, causing UX split)
  if(G.level<reqLv){
    notify('装配第'+nextSlot+'环需要 Lv.'+reqLv+'（当前 Lv.'+G.level+'）','normal');
    return;
  }
  if(!rings.length){notify('背包中无可用魂环，请先狩猎！','normal');return;}
  const cat=filterCat||'all';
  // Category filter: low=百年/千年/万年, mid=十万年, high=百万年, ultra=不可估量+
  function ringCat(r){
    const y=r.data.y||0;
    if(y>=999999999)return 'ultra';
    if(y>=1000000)return 'high';
    if(y>=100000)return 'mid';
    return 'low';
  }
  const filtered=cat==='all'?rings:rings.filter(r=>ringCat(r)===cat);
  const catBtns=['all','low','mid','high','ultra'].map(cc=>`
    <span onclick="openAssignRing('${cc}')" style="padding:3px 9px;border-radius:6px;font-size:10px;cursor:pointer;border:1px solid ${cc===cat?'var(--bdrB)':'var(--bdr)'};background:${cc===cat?'rgba(201,162,39,.15)':'transparent'};color:${cc===cat?'var(--gl)':'var(--dim)'}">
      ${{all:'全部',low:'万年以下',mid:'十万年',high:'百万年',ultra:'不估量以上'}[cc]}
    </span>`).join('');
  const listHtml=filtered.length?filtered.map(r=>`
    <div class="ring-item" onclick="assignRingFromSel('${r.data?.id||r.id}')">
      <div class="ring-orb" style="background:${r.data.c}">${r.data.n[0]}</div>
      <div style="flex:1">
        <div class="ring-yr" style="color:${r.data.c}">${r.data.n}</div>
        <div class="ring-sk">${r.data.sk||r.data.skill||''}</div>
        <div class="ring-pow">战力 +${r.data.pw||0}</div>
      </div>
      ${ringCat(r)==='low'?`<div onclick="decomposeRing('${r.data?.id||r.id}',event)" style="font-size:10px;padding:3px 8px;border-radius:6px;border:1px solid rgba(239,68,68,.3);background:rgba(239,68,68,.06);color:#f87171;cursor:pointer;flex-shrink:0;margin-left:4px">分解</div>`:''}
    </div>`).join(''):'<div style="text-align:center;padding:20px;color:var(--dim);font-size:12px">此分类无魂环</div>';
  $set('rsm-list','innerHTML','<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">'+catBtns+'</div>'+listHtml);
  $set('rsm-title','textContent','装配魂环');
  $style('RSM','display','flex');
}
function decomposeRing(rid,evt){
  if(evt)evt.stopPropagation();
  const item=G.bag.find(i=>i.type==='ring'&&((i.data?.id==rid)||(i.id==rid)));
  if(!item)return;
  // Guard: only allow low-tier decomposition (百年/千年/万年)
  const lowTiers=['百年','千年','万年'];
  if(!lowTiers.includes(item.data?.n)){
    notify('此魂环品阶过高，无法分解！','normal');return;
  }
  const expGain=Math.floor((item.data.pw||80)*0.5+50);
  G.bag=G.bag.filter(i=>!((i.type==='ring')&&((i.data?.id==rid)||(i.id==rid))));
  addExp(expGain);
  notify('🔥 '+item.data.n+'已分解 → 经验+'+expGain,'epic');
  saveG();openAssignRing('low');
}

function assignRingFromSel(rid){
  const it=G.bag.find(i=>i.type==='ring'&&((i.data?.id==rid)||(i.id==rid)));
  if(!it||!G.soul)return;
  if(G.soul.rings.length>=10){notify('已达10环上限','normal');return;}
  // Level gate: ring slot n requires Lv.(n*10)
  const nextSlot=G.soul.rings.length+1;
  const reqLv=nextSlot*10;
  if(G.level<reqLv){
    notify(`装配第${nextSlot}环需要 Lv.${reqLv}（当前 Lv.${G.level}）`,'normal');
    cRSM();return;
  }
  const rObj={...it.data,id:Date.now()};
  G.soul.rings.push(rObj);

  // Generate ring skill
  const t=RT.find(x=>x.n===it.data.n)||RT[0];
  const sk=pick(t.sk);
  const mut=Math.random()<0.01;
  G.soul.skills.push({
    name:sk+(mut?'·质变':''),
    desc:`由${it.data.n}魂环赋予。${mut?'【质变：效果+500%！】':''}`,
    params:[`来源: ${it.data.n}`,`战力: +${t.pw}`,...(t.attr?[`攻击+${t.attr.atk||0}%`,`速度+${t.attr.spd||0}%`]:[]),...(mut?['质变觉醒✨']:[])],
    ring:G.soul.rings.length
  });
  // Check unlimited ring special
  if(it.data.n==='不可估量'&&t.mutateSkills){
    const msk=pick(t.mutateSkills);
    G.soul.skills.push({name:msk,desc:'怒潮触发的质变魂技！效果超越常规！',params:['质变效果×3','无视部分规则'],ring:G.soul.rings.length});
    notify(`🌀 怒潮触发质变魂技：${msk}！`,'divine');spawnBurst('#e879f9',80);
  }
  if(mut)notify('✨ 魂技质变觉醒！','legend');

  // Remove from bag
  it.count--;if(it.count<=0)G.bag=G.bag.filter(i=>!(i.type==='ring'&&((i.data?.id==rid)||(i.id==rid))));

  if(G.soul.rings.length>=9)notify('🌌 九环达成！成神之路已在试炼页解锁！','divine');

  G.stats.rings++;addExp(60);
  progressTask('ring_equip');
  // v9: Equipping high-tier rings yields soul fragments
  if(['百万年','不可估量','神赐','宇宙之核'].includes(it.data.n)&&G.soul){
    const fragQ=it.data.n==='宇宙之核'?'triple':it.data.n==='神赐'?'apex':it.data.n==='不可估量'?'ha':'legend';
    addSoulFragment(fragQ,1);
  }
  if(it.data.n==='百万年'||it.data.n==='不可估量'||it.data.n==='神赐'||it.data.n==='宇宙之核')triggerSeasonal('ring_legend');
  cRSM();saveG();renderSoulPage();updateGodPath();
  notify(`✅ ${it.data.n} 魂环装配成功！战力+${t.pw}`,'normal');
}

function confirmReset(){
  if(confirm('⚠️ 再次觉醒将重置所有游戏数据！\n仅保留武魂图鉴中觉醒过的历史。\n\n确认继续？')){
    if(confirm('最终确认：清除所有进度，仅保留武魂图鉴历史？\n此操作不可撤销！')){
      // 1. 停止所有定时器
      stopGameTimers();

      // 2. 停止所有动画帧
      if(_geoAnimFrame){cancelAnimationFrame(_geoAnimFrame);_geoAnimFrame=null;}
      if(_gsRaf){cancelAnimationFrame(_gsRaf);_gsRaf=null;}
      if(_cwGeoRaf){cancelAnimationFrame(_cwGeoRaf);_cwGeoRaf=null;}
      if(_sbGeoRaf){cancelAnimationFrame(_sbGeoRaf);_sbGeoRaf=null;}

      if(_achRaf){cancelAnimationFrame(_achRaf);_achRaf=null;}

      // 3. 保存武魂图鉴历史（用于重置后恢复）
      const keptGrimoire = G.grimoire ? { ...G.grimoire } : null;

      // 4. 清除游戏存档（保留武魂图鉴 dlv3-grimoire）
      localStorage.removeItem('dlv3');

      // 5. 重置所有全局状态变量
      _lotCurPool=0;_lotTouchX=0;_lotMouseX=0;_lotMouseDown=false;
      curLotMode=0;curBagFilter='all';
      fusState={a:null,b:null,herbs:[]};
      fusSelTgt=null;fusHerbTgt=null;
      // 战斗状态
      if(combatAnimTimer){clearTimeout(combatAnimTimer);combatAnimTimer=null;}
      combatState=null;combatLog=[];
      // 分页状态
      worldPage=0;
      // 页面可见性
      pageHidden=false;
      // GM控制台
      if(gmPressTimer){clearTimeout(gmPressTimer);gmPressTimer=null;}
      // 水晶球动画
      if(_cbTimer){clearTimeout(_cbTimer);_cbTimer=null;}
      // 图鉴筛选
      _gsFilter='all';_gsSearch='';
      // 成就筛选
      _achFilter='all';

      // 6. 清理DOM状态
      // 关闭模态框
      $remCls('modal','show');
      // 关闭侧边栏（统一调用 closeSidebar，避免直接操作 ls-panel 导致 display 永久为 none）
      closeSidebar();
      // 清除通知
      document.querySelectorAll('.ntf').forEach(n=>n.remove());
      // 清除成就覆盖层
      const achOv=document.getElementById('ach-ov');if(achOv)achOv.remove();
      // 清除图鉴完成覆盖层
      const gsOv=document.getElementById('gs-complete-ov');if(gsOv)gsOv.remove();
      // 清除领域突破覆盖层
      const ro=document.getElementById('realm-overlay');if(ro)ro.classList.remove('show');

      // 7. 重置游戏状态
      G=defState();

      // 7. 恢复武魂图鉴历史
      if(keptGrimoire && keptGrimoire.souls && keptGrimoire.souls.length > 0){
        G.grimoire = {
          souls: [...keptGrimoire.souls],
          rings: [...(keptGrimoire.rings || [])],
          bones: [...(keptGrimoire.bones || [])]
        };
        // 同时恢复 GRIMOIRE 全局变量
        if(keptGrimoire.discovered) GRIMOIRE.discovered = {...keptGrimoire.discovered};
        if(keptGrimoire.souls) GRIMOIRE.souls = [...keptGrimoire.souls];
        if(keptGrimoire.rings) GRIMOIRE.rings = [...keptGrimoire.rings];
        if(keptGrimoire.bones) GRIMOIRE.bones = [...keptGrimoire.bones];
        GRIMOIRE.completionClaimed = keptGrimoire.completionClaimed || false;
        saveGrimoire(); // 立即保存到 localStorage
      }

      saveG(); // 立即保存

      // 8. 重新启动定时器
      startGameTimers();

      // 9. 跳转到武魂页并显示觉醒界面
      navTo('soul');
      $style('SA','display','flex');
      updateHUD();updateExpBar();
      notify('✨ 再次觉醒！一切归零，武魂图鉴历史永存。','divine');
      spawnBurst('#8b5cf6',80);
    }
  }
}

// ══════════════════════════════════════════════════
//  HUNT / TRIALS
// ══════════════════════════════════════════════════
function hunt(zone){
  const costs={forest:100,chaos:500,primordial:1000,random:300};
  const cost=costs[zone];
  if(G.sp<cost){notify(`魂力不足！需要${cost}`,'normal');return;}
  G.sp-=cost;G.huntCount++;G.stats.hunts++;
  progressTask('hunt');

  let ring=null;
  if(zone==='forest')      ring=rollRing([38,28,18,10,4,1.5,0.4,0]);
  else if(zone==='chaos')  ring=rollRing([0,8,22,32,22,13,2.5,0]);
  else if(zone==='primordial')ring=rollRing([0,0,4,12,28,32,16,0.0000000001]);
  else if(zone==='random'){
    const r=Math.random();
    if(r<0.3)ring=rollRing([38,28,18,10,4,1.5,0.4,0]);
    else if(r<0.6)ring=rollRing([0,8,22,32,22,13,2.5,0]);
    else if(r<0.85)ring=rollRing([0,0,4,12,28,32,16,0.0000000001]);
    else{notify('🌪️ 传送失败！迷失虚空，损失200魂力','normal');G.sp-=Math.min(200,G.sp);updateHUD();saveG();return;}
  }
  if(!ring)return;

  const tier=RT.find(t=>t.n===ring.n)||RT[0];
  const sk=pick(tier.sk);
  const ringObj={id:Date.now(),n:ring.n,y:ring.y,c:ring.c,sk,pw:tier.pw,tier:ring.n};

  if(ring.unique&&G.cosmicOwned){notify('宇宙之核已被持有，改为神赐魂环','normal');ringObj.n=RT[6].n;ringObj.y=RT[6].y;ringObj.c=RT[6].c;ringObj.pw=RT[6].pw;}
  if(ring.unique&&!G.cosmicOwned){G.cosmicOwned=true;notify('🌌 ！！宇宙之核降临！亘古唯一！！','cosmic');spawnBurst('#00ffff',200);}

  // Bone drop
  if(Math.random()<0.22){
    const bs=pick(BONE_SLOTS);
    const bp=genBonePw(ring.n);
    const bon={...bs,n:`${ring.n}${bs.n}魂骨`,pw:bp,id:Date.now()+1,ringYear:ring.n};
    G.bag.push({type:'bone',data:bon,count:1,id:Date.now()+10});
    G.stats.bones++;notify(`🦴 掉落魂骨：${bon.n} (战力+${bp})`,'epic');
  }
  // Special bone drop (low prob in chaos/primordial)
  const specProb={forest:0.01,chaos:0.05,primordial:0.1,random:0.03}[zone]||0;
  if(Math.random()<specProb){
    const sb=pick(SPECIAL_BONES);
    G.bag.push({type:'bone',data:{...sb,id:Date.now()+2},count:1,id:Date.now()+20});
    notify(`✨ 特殊魂骨：${sb.n} 已掉落！${sb.special}`,'legend');spawnBurst('#ef4444',60);
  }

  // ── Zone-specific secondary drops (V5) ──
  if(zone==='forest'){
    addExp(50); // Fixed +50 exp
    if(Math.random()<0.15){addTicketToBag('common',1);notify('🎟️ 获得普通星运券×1!','epic');}
    if(Math.random()<0.20){const h=HERBS[pick([0,1,2,4])];addHerbToBag(h);notify('🌿 获得药草：'+h.n,'epic');progressTask('herb');}
  } else if(zone==='chaos'){
    const bTierName=pick(['千年','万年','十万年']);
    const bSlotKey=pick(['head','body','arm','leg']);
    const bPool=BONE_POOL[bSlotKey]||BONE_POOL.head;
    const matchB=bPool.filter(b=>b.tier===bTierName);
    const chB=matchB.length?pick(matchB):bPool[1]||bPool[0];
    const bpw=genBonePw(bTierName);
    G.bag.push({type:'bone',data:{...chB,pw:bpw,id:Date.now()+50},count:1,id:Date.now()+51});
    G.stats.bones++;
    notify('🦴 混沌魂骨：'+chB.n+' 战力+'+bpw,'epic');
    addExp(ri(100,300));
    if(Math.random()<0.12){addTicketToBag('advanced',1);notify('🎫 获得高级星运券×1!','legend');}
    if(Math.random()<0.10){const h=HERBS[pick([3,4,5,6,9,10])];addHerbToBag(h);notify('🌿 混沌药草：'+h.n,'epic');progressTask('herb');}
  } else if(zone==='primordial'){
    addExp(ri(500,1500));
    if(Math.random()<0.10){addTicketToBag('apex',1);notify('🏆 获得顶级星运券×1!','divine');}
    if(Math.random()<0.001){
      const extArts=ARTS.filter(a=>a.extreme);
      if(extArts.length){const ea=pick(extArts);G.bag.push({type:'artifact',data:ea,count:1,id:Date.now()+52});
        notify('⚡！极致神器降临！'+ea.n,'cosmic');spawnBurst('#ffd700',150);G.stats.arts++;}
    }
    if(Math.random()<0.20){const h=HERBS[pick([5,6,7,10,11,12,13])];addHerbToBag(h);notify('🌿 原初药草：'+h.n,'epic');progressTask('herb');}
  } else if(zone==='random'){
    if(Math.random()<0.15){const pools=['common','advanced','apex'];addTicketToBag(pick(pools),1);notify('🎲 随机星运券！','epic');}
    if(Math.random()<0.25){const res=RESOURCES[ri(0,RESOURCES.length-1)];addResourceToBag(res);notify('📦 资源：'+res.n,'normal');progressTask('resource');}
    if(Math.random()<0.12){const h=HERBS[ri(0,HERBS.length-1)];addHerbToBag(h);notify('🌿 随机药草：'+h.n,'epic');progressTask('herb');}
  }

  // Title drop 1%
  if(Math.random()<0.01){
    const tp=TITLES.hunt;const t=pick(tp);
    if(!G.titles.find(x=>x.n===t.n)){G.titles.push(t);notify(`👑 获得称号：${t.n}！`,t.n.includes('原初')?'cosmic':'divine');}
  }

  // 5x event
  if(Math.random()<0.025){const b=cost*5;addSP(b,'5倍魂力奇遇');notify(`🌟 5倍魂力奇遇！+${b}`,'legend');}

  // v9: Soul fragment drop from hunt (quality based on zone)
  const fragChance={forest:.08,chaos:.12,primordial:.18,random:.06}[zone]||0;
  if(G.soul&&Math.random()<fragChance){
    // Drop fragment of a quality relevant to the zone tier
    const zoneFragQ={forest:'common',chaos:'rare',primordial:'epic',random:['common','rare'][ri(0,1)]}[zone]||'common';
    addSoulFragment(zoneFragQ,1);
    notify(`🔮 武魂碎片·${QC[zoneFragQ]?.n||zoneFragQ} ×1`,'epic');
  }

  G.bag.push({type:'ring',data:ringObj,count:1,id:Date.now()+30});
  G.recentRings.unshift(ringObj);if(G.recentRings.length>12)G.recentRings.pop();
  G.stats.rings++;addExp(35);
  triggerSeasonal('hunt');
  if(ring.y>=1000000)triggerSeasonal('ring_legend');

  notify(`🔮 ${ring.n} 魂环·${sk}·战力+${tier.pw}`,ring.unique?'cosmic':ring.special?'divine':ring.y>=999999999?'legend':'normal');
  $('hunt-cnt').textContent=G.huntCount;
  updateHUD();saveG();renderRecentRings();renderBag();
}

function rollRing(w){
  const t=w.reduce((s,x)=>s+x,0);let r=Math.random()*t,c=0;
  for(let i=0;i<RT.length;i++){c+=w[i];if(r<=c)return RT[i];}
  return RT[0];
}

function renderRecentRings(){
  const c=$('recent-rings');if(!c)return;
  if(!G.recentRings.length){c.innerHTML='<div class="empty-st"><div class="ei">💫</div><div class="em">尚未狩猎</div></div>';return;}
  c.innerHTML=G.recentRings.slice(0,8).map(r=>`
    <div class="ring-item">
      <div class="ring-orb" style="background:${r.c}">${r.n[0]}</div>
      <div style="flex:1">
        <div class="ring-yr" style="color:${r.c}">${r.n}</div>
        <div class="ring-sk">${r.sk||r.skill||''}</div>
        <div class="ring-pow">战力 +${r.pw||0}</div>
      </div>
    </div>`).join('');
}

// ──── GOD PATH ────
function updateGodPath(){
  const rings=(G.soul?.rings||[]).length;
  const card=$('godpath-card');
  const hint=$('gp-hint');
  if(card){
    if(rings>=9){
      card.classList.remove('locked');
      if(hint){hint.textContent='✅ 条件已满足！点击进入成神之路试炼';hint.style.color='var(--hc)';}
    }else{
      card.classList.add('locked');
      if(hint){hint.textContent=`🔒 当前武魂魂环 ${rings}/9，不足无法开启`;hint.style.color='var(--apex)';}
    }
  }
  renderSpecialPaths();
}

function showGodPath(){
  const rings=(G.soul?.rings||[]).length;
  if(rings<9){notify('需要9个魂环才能进入成神之路！','normal');return;}
  const trials=G.godTrials||GOD_TRIALS;
  const stH=trials.map((t,i)=>{
    const prev=i===0||trials[i-1].cleared;
    const cls=t.cleared?'cleared':prev?'':'locked';
    const badge=t.cleared?`<span class="ts-badge clear">已通关</span>`:prev?`<span class="ts-badge go">挑战</span>`:`<span class="ts-badge locked">🔒</span>`;
    return`<div class="trial-stage ${cls}" onclick="${prev&&!t.cleared?`startTrial('${t.id}')`:t.cleared?'':''}">
      <div class="ts-ico">${t.i}</div>
      <div class="ts-info">
        <div class="ts-name">${t.n}</div>
        <div class="ts-desc">${t.d}</div>
        <div class="ts-rew">通关奖励：${t.rew}</div>
      </div>
      ${badge}
    </div>`;
  }).join('');

  openModal(`
    <div class="m-title" style="color:#fca5a5">🌟 成神之路</div>
    <div class="m-sub">共6关试炼，逐步突破成神极限</div>
    <div style="font-size:11px;color:var(--dim);text-align:center;margin-bottom:12px;line-height:1.7">
      每一关皆是对灵魂的淬炼，通关后可获得丰厚奖励和特殊称号。
    </div>
    <div class="trial-stages">${stH}</div>
  `);
}

function startTrial(id){
  const t=(G.godTrials||GOD_TRIALS).find(x=>x.id===id);
  if(!t)return;
  const cost=t.rsp||500;
  if(G.sp<cost){notify(`试炼需要${cost}魂力`,'normal');return;}
  G.sp-=cost;

  // v9: Fixed probability zone (60%~85%) regardless of power
  // Will system: each consecutive fail accumulates will; 3 fails = guaranteed success
  if(!G.godTrialWill)G.godTrialWill={};
  const failCount=G.godTrialWill[id]||0;

  // Base rate fixed between 60%-85% — capped, no longer scales to 90% with power
  const baseRate=0.62;
  const maxRate=0.85;
  // Small power boost (max +8% at very high power) keeps power relevant but not dominant
  const pw=calcPower();
  const minPow={t1:500,t2:1000,t3:2000,t4:4000,t5:8000,t6:15000}[id]||500;
  const powerBonus=Math.min(0.08, (pw-minPow)/Math.max(minPow*10,1)*0.08);
  const finalRate=Math.min(maxRate, baseRate+powerBonus);

  // Pity: 3 consecutive failures guarantee success
  const guaranteed=failCount>=3;
  const success=guaranteed||Math.random()<finalRate;

  if(success){
    // Reset will on success
    G.godTrialWill[id]=0;
    t.cleared=true;
    const expM=t.rew.match(/经验\+(\d+)/);const pwM=t.rew.match(/战力\+(\d+)/);
    if(expM)addExp(parseInt(expM[1]));
    if(pwM){G.extraPower+=parseInt(pwM[1]);}
    if(t.rew.includes('神之子'))awardTitle('godpath','神之子');
    if(t.rew.includes('半神'))awardTitle('godpath','半神');
    if(t.rew.includes('稀有称号'))awardTitle('hunt',pick(TITLES.hunt).n);
    if(t.rew.includes('神器')){const a=pick(ARTS);G.bag.push({type:'artifact',data:a,count:1,id:Date.now()});}
    const bonusMsg=guaranteed?' 【意志加持·必胜！】':'';
    notify(`🏆 ${t.n} 试炼通关！${bonusMsg}`,'divine');
    spawnBurst('#fca5a5',80);
  }else{
    // Accumulate will, give consolation
    G.godTrialWill[id]=(failCount+1);
    const willNow=G.godTrialWill[id];
    // Consolation rewards scale with fail count
    const consoleSP=Math.floor(cost*0.3);
    const consoleExp=Math.floor(cost*2);
    addSP(consoleSP,null);addExp(consoleExp);
    // Tip about pity counter
    const pityMsg=willNow>=2?` 【意志值${willNow}/3，再败必胜！】`:` 【意志值${willNow}/3】`;
    notify(`💔 ${t.n} 试炼失败... 获得安慰：+${consoleSP}魂力/+${consoleExp}经验${pityMsg}`,'normal');
  }
  G.godTrials=G.godTrials||GOD_TRIALS;
  updateHUD();saveG();showGodPath();
}

function awardTitle(pool,name){
  const titlePool=TITLES[pool]||TITLES.hunt;
  const t=titlePool.find(x=>x.n===name)||pick(titlePool);
  if(!G.titles.find(x=>x.n===t.n)){G.titles.push(t);notify(`👑 获得称号：${t.n}！`,'divine');}
}

// ══════════════════════════════════════════════════
//  LOTTERY
// ══════════════════════════════════════════════════
// ── Lot pool config per-pool geo ──
const LOT_GEO_CFG=[
  {rgb:[156,163,175],rings:[{rx:105,ry:76,spd:.0018,dir:1,op:.13,dash:false},{rx:152,ry:110,spd:.0011,dir:-1,op:.08,dash:false},{rx:202,ry:146,spd:.0007,dir:1,op:.05,dash:true},{rx:258,ry:186,spd:.0004,dir:-1,op:.03,dash:false}]},
  {rgb:[167,139,250],rings:[{rx:95,ry:68,spd:.0024,dir:1,op:.18,dash:false},{rx:140,ry:100,spd:.0015,dir:-1,op:.12,dash:false},{rx:190,ry:136,spd:.0009,dir:1,op:.08,dash:true},{rx:245,ry:176,spd:.0005,dir:-1,op:.05,dash:false},{rx:305,ry:220,spd:.0003,dir:1,op:.03,dash:true}]},
  {rgb:[245,158,11], rings:[{rx:88,ry:63,spd:.003,dir:1,op:.22,dash:false},{rx:132,ry:95,spd:.0018,dir:-1,op:.15,dash:false},{rx:180,ry:130,spd:.0011,dir:1,op:.10,dash:false},{rx:232,ry:167,spd:.0007,dir:-1,op:.07,dash:true},{rx:288,ry:208,spd:.0004,dir:1,op:.04,dash:false},{rx:350,ry:252,spd:.0002,dir:-1,op:.025,dash:true}]},
];
const LOT_POOL_PITY=[{max:100,hint:'十连特别概率提升'},{max:80,hint:'80抽内必出百万年以上'},{max:50,hint:'50抽内必出不可估量以上'}];
const LOT_POOL_COL=['#9ca3af','#a78bfa','#f59e0b'];
const LOT_POOL_WASH=['rgba(156,163,175,.06)','rgba(139,92,246,.08)','rgba(245,158,11,.08)'];
// Per-pool pull counters (in-memory, sync to G.lotTotal for total)
const _lotPoolPulls=[0,0,0];

function stopLotGeo(){}
function startLotGeo(){}
// Swipe logic
let _lotCurPool=0,_lotTouchX=0,_lotMouseX=0,_lotMouseDown=false;
function goLotPool(idx){
  _lotCurPool=idx;curLotMode=idx;G.lotMode=idx;
  const track=document.getElementById('lot-banner-track');
  if(track){track.style.transition='transform .38s cubic-bezier(.4,0,.2,1)';track.style.transform=`translateX(-${idx*100}%)`;}

  // 更新奖池标签样式
  const tabs=document.querySelectorAll('.lot-pool-tab');
  tabs.forEach((t,i)=>{t.classList.toggle('active',i===idx);});

  // 更新banner外层颜色变量
  const bannerOuter=document.getElementById('lot-banner-outer');
  if(bannerOuter){
    const [r,g,b]=LOT_GEO_CFG[idx].rgb;
    bannerOuter.style.setProperty('--pool-r',r);
    bannerOuter.style.setProperty('--pool-g',g);
    bannerOuter.style.setProperty('--pool-b',b);
  }

  updateLotPoolUI(idx);
  updateTidalUI(idx);
}
function updateLotPoolUI(idx){
  const cfg=LOT[idx];
  const col=LOT_POOL_COL[idx];
  const [r,g,b]=LOT_GEO_CFG[idx].rgb;
  // Panel wash
  const panel=document.getElementById('lot-panel');
  if(panel)panel.style.setProperty('--lpc-wash',LOT_POOL_WASH[idx]);
  // Ten-pull sub label
  const sub=document.getElementById('lc10-sub');
  if(sub)sub.textContent='特别概率提升 · 必有高价值';
  // Draw grid (handles all costs + ticket badges)
  renderLotDrawGrid(idx);
  // Pool detail rates
  const pd=document.getElementById('pool-detail');
  if(pd)pd.innerHTML=cfg.detail.map(d=>`<div class="lr-row"><div class="lr-item"><div class="lr-dot" style="background:${d.col||'var(--gold)'}"></div>${d.n}</div><div><span class="lr-lim">${d.lim?'限时':''}</span><span class="lr-pct">${d.p}</span></div></div>`).join('');
}

function renderLotDrawGrid(idx){
  const el=document.getElementById('lot-draw-grid');if(!el)return;
  const cfg=LOT[idx];
  const pool=['common','advanced','apex'][idx];
  const [r,g,b]=LOT_GEO_CFG[idx].rgb;

  // Count tickets for this pool
  const singles=G.bag.filter(i=>i.type==='ticket'&&i.data?.pool===pool&&!i.data?.ten);
  const tens=G.bag.filter(i=>i.type==='ticket'&&i.data?.pool===pool&&i.data?.ten);
  const sc=singles.reduce((s,i)=>s+i.count,0);
  const tc=tens.reduce((s,i)=>s+i.count,0);
  const col=LOT_POOL_COL[idx];

  // Single draw button (1x)
  const s1HasTix=sc>0;
  const s1Ico=s1HasTix?'🎟️':'🎲';
  const s1Lbl='单次抽取';
  const s1Cost=`× ${cfg.cost} 魂力`;
  const s1TixHtml=s1HasTix
    ?`<div class="ldg-tix-badge" style="border-color:${col}50;color:${col}">券 ×${sc}</div>`
    :'';
  const s1Action=s1HasTix
    ?`<div class="ldg-tix-action" style="color:${col}">点击使用券抽 →</div>`
    :'';

  // Ten-pull cost & note
  const hasTenTix=tc>0||(sc>=10);
  const tenCost=hasTenTix?`× 0 魂力 (券)`:`× ${cfg.cost*10} 魂力`;
  const tenNote=tc>0?`🏆 十连专属券 ×${tc}`:(sc>=10?`🎟️ 可使用 10 张单抽券十连`:'');
  const tenTixHtml=hasTenTix
    ?`<div class="ldg-tix-badge" style="border-color:rgba(245,158,11,.4);color:#fbbf24">券 ×${tc||Math.floor(sc/10)*10}</div>`
    :'';
  const tenAction=tenNote?`<div class="ldg-tix-action" style="color:rgba(245,158,11,.55)">${tenNote}</div>`:'';

  el.innerHTML=`
    <div class="lot-dg-btn${s1HasTix?' has-tix':''}" style="--lpc-r:${r};--lpc-g:${g};--lpc-b:${b}" onclick="doLotSmart(1)">
      <div class="ldg-top">
        <div class="ldg-ico">${s1Ico}</div>
        ${s1TixHtml}
      </div>
      <div class="ldg-lbl">${s1Lbl}</div>
      <div class="ldg-cost" id="lc1">${s1Cost}</div>
      ${s1Action}
    </div>
    <div class="lot-dg-btn ten" style="--lpc-r:245;--lpc-g:158;--lpc-b:11" onclick="doLotSmart(10)">
      <div class="ldg-top">
        <div class="ldg-ico">✨</div>
        ${tenTixHtml}
      </div>
      <div class="ldg-lbl">十连抽取</div>
      <div class="ldg-cost">${tenCost}</div>
      ${tenAction}
    </div>
  `;
}

// ──── 水晶球抽奖动画 ────
let _cbTimer=null;
function showCrystalBall(callback){
  const cb=document.getElementById('crystal-ball');
  if(!cb){callback();return;}
  const idx=_lotCurPool;
  const cols=LOT_POOL_COL;
  cb.style.setProperty('--pool-r',LOT_GEO_CFG[idx].rgb[0]);
  cb.style.setProperty('--pool-g',LOT_GEO_CFG[idx].rgb[1]);
  cb.style.setProperty('--pool-b',LOT_GEO_CFG[idx].rgb[2]);
  cb.classList.remove('reveal','active');
  void cb.offsetWidth;
  cb.classList.add('active');
  if(_cbTimer)clearTimeout(_cbTimer);
  _cbTimer=setTimeout(()=>{
    cb.classList.remove('active');
    cb.classList.add('reveal');
    setTimeout(()=>{
      cb.classList.remove('reveal');
      callback();
    },400);
  },1000);
}

// Smart draw: shows crystal ball then executes draw
function doLotSmart(times){
  showCrystalBall(()=>{
    const pool=['common','advanced','apex'][_lotCurPool];
    const cfg=LOT[_lotCurPool];
    if(times===1){
      const s=G.bag.find(i=>i.type==='ticket'&&i.data?.pool===pool&&!i.data?.ten);
      if(s&&s.count>0){doLotWithTicketSingle(pool);renderLotDrawGrid(_lotCurPool);return;}
    } else if(times===10){
      const tenT=G.bag.find(i=>i.type==='ticket'&&i.data?.pool===pool&&i.data?.ten);
      if(tenT&&tenT.count>0){doLotWithTicketTenDirect(pool);renderLotDrawGrid(_lotCurPool);return;}
      const singles=G.bag.filter(i=>i.type==='ticket'&&i.data?.pool===pool&&!i.data?.ten);
      const sc=singles.reduce((s,i)=>s+i.count,0);
      if(sc>=10){doLotWithTicketTen(pool);renderLotDrawGrid(_lotCurPool);return;}
    }
    doLot(times);
    renderLotDrawGrid(_lotCurPool);
  });
}

function initLotSwipe(){
  const track=document.getElementById('lot-banner-track');
  if(!track||track._swipeInit)return;
  track._swipeInit=true;
  let tx=0,isSliding=false;
  track.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;isSliding=false;},{passive:true});
  track.addEventListener('touchmove',e=>{
    const dx=e.touches[0].clientX-tx;
    const dy=e.touches[0].clientY-(e.touches[0].clientY);
    if(!isSliding&&Math.abs(dx)>8){isSliding=true;}
    if(isSliding){e.preventDefault();const base=-_lotCurPool*100;track.style.transition='none';track.style.transform=`translateX(calc(${base}% + ${dx*.6}px))`;}
  },{passive:false});
  track.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-tx;track.style.transition='';
    if(isSliding){if(dx<-40&&_lotCurPool<2)goLotPool(_lotCurPool+1);else if(dx>40&&_lotCurPool>0)goLotPool(_lotCurPool-1);else goLotPool(_lotCurPool);}
    isSliding=false;
  },{passive:true});
  // Mouse for desktop
  track.addEventListener('mousedown',e=>{_lotMouseDown=true;_lotMouseX=e.clientX;track.style.transition='none';});
  window.addEventListener('mousemove',e=>{if(!_lotMouseDown)return;const dx=e.clientX-_lotMouseX;const base=-_lotCurPool*100;track.style.transform=`translateX(calc(${base}% + ${dx*.6}px))`;});
  window.addEventListener('mouseup',e=>{if(!_lotMouseDown)return;_lotMouseDown=false;const dx=e.clientX-_lotMouseX;track.style.transition='';if(dx<-40&&_lotCurPool<2)goLotPool(_lotCurPool+1);else if(dx>40&&_lotCurPool>0)goLotPool(_lotCurPool-1);else goLotPool(_lotCurPool);});
}

function toggleLotRates(){
  const b=document.getElementById('lr-body');
  const t=document.getElementById('lr-tog');
  if(!b)return;
  const open=b.style.display==='block';
  b.style.display=open?'none':'block';
  if(t)t.textContent=open?'展开 ▼':'收起 ▲';
}

function toggleSection(bodyId,togId){
  const b=document.getElementById(bodyId);
  const t=document.getElementById(togId);
  if(!b)return;
  const hidden=b.style.display==='none'||b.style.display==='';
  b.style.display=hidden?'block':'none';
  if(t)t.textContent=hidden?'收起 ▲':'展开 ▼';
}
function toggleRecentRings(btn){
  const el=$('recent-rings');if(!el)return;
  const hidden=el.style.display==='none';
  el.style.display=hidden?'block':'none';
  if(btn)btn.textContent=hidden?'收起 ▲':'展开 ▼';
  if(hidden)renderRecentRings();
}

function renderLotPage(){
  // 先同步渲染抽奖按钮
  goLotPool(_lotCurPool);
  // 再异步初始化滑动
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      initLotSwipe();
    });
  });
  // Sync pull counters from G.lotHistory
  _lotPoolPulls[0]=G.lotTotal||0;_lotPoolPulls[1]=0;_lotPoolPulls[2]=0;
  // Update total display
  const lt=document.getElementById('lot-total');if(lt)lt.textContent=G.lotTotal||0;
  // Update pull counter badges from G
  [0,1,2].forEach(pi=>{
    const el=document.getElementById('lcnt-'+pi);
    if(el)el.textContent=G.lotTotal||0;
  });
}
function doLotWithTicketSingle(pool){
  const pIdx=poolTicketIdx(pool);
  const cfg=LOT[pIdx];
  const it=G.bag.find(i=>i.type==='ticket'&&i.data?.pool===pool&&!i.data?.ten);
  if(!it||it.count<1){notify('没有单抽券！','normal');return;}
  it.count--;if(it.count<=0)G.bag=G.bag.filter(i=>i!==it);
  doLotInternal(cfg,pIdx,1,true);
  renderLotDrawGrid(_lotCurPool);
}
function doLotWithTicketTen(pool){
  // Use 10 single tickets for a 10-pull
  const pIdx=poolTicketIdx(pool);
  const cfg=LOT[pIdx];
  let remaining=10;
  const singles=G.bag.filter(i=>i.type==='ticket'&&i.data?.pool===pool&&!i.data?.ten);
  const total=singles.reduce((s,i)=>s+i.count,0);
  if(total<10){notify('单抽券不足10张！','normal');return;}
  for(const it of singles){
    if(remaining<=0)break;
    const use=Math.min(remaining,it.count);
    it.count-=use;remaining-=use;
  }
  G.bag=G.bag.filter(i=>!(i.type==='ticket'&&i.count<=0));
  doLotInternal(cfg,pIdx,10,true);
  renderLotDrawGrid(_lotCurPool);
}
function doLotWithTicketTenDirect(pool){
  // Use 1 ten-pull ticket
  const pIdx=poolTicketIdx(pool);
  const cfg=LOT[pIdx];
  const it=G.bag.find(i=>i.type==='ticket'&&i.data?.pool===pool&&i.data?.ten);
  if(!it||it.count<1){notify('没有十连券！','normal');return;}
  it.count--;if(it.count<=0)G.bag=G.bag.filter(i=>i!==it);
  doLotInternal(cfg,pIdx,10,true);
  renderLotDrawGrid(_lotCurPool);
}
// Lot Shop — buy tickets with SP
const LOT_SHOP=[
  {id:"ls1",n:"普通星运券×1",i:"🎟️",pool:"common",cost:100,currency:"sp",count:1},
  {id:"ls2",n:"普通星运券×5",i:"🎟️",pool:"common",cost:500,currency:"sp",count:5},
  {id:"ls3",n:"高级星运券×1",i:"🎫",pool:"advanced",cost:500,currency:"sp",count:1},
  {id:"ls4",n:"高级星运券×3",i:"🎫",pool:"advanced",cost:1500,currency:"sp",count:3},
  {id:"ls5",n:"顶级星运券×1",i:"🏆",pool:"apex",cost:1000,currency:"sp",count:1},
  {id:"ls6",n:"顶级星运十连券×1",i:"🏆",pool:"apex",cost:10000,currency:"sp",count:1,ten:true},
];
function openLotShop(){
  const rows=LOT_SHOP.map(item=>{
    const canAfford=G.sp>=item.cost;
    return`<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04)">
      <div style="font-size:22px">${item.i}</div>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:600;color:var(--txt)">${item.n}</div>
        <div style="font-size:10px;color:var(--gold)">💫 ${item.cost.toLocaleString()} 魂力</div>
      </div>
      <div class="m-btn ok" style="padding:5px 12px;font-size:10px;flex-shrink:0;${canAfford?'':'opacity:.35;pointer-events:none'}" onclick="buyLotTicket('${item.id}')">购买</div>
    </div>`;
  }).join('');
  openModal(`<div class="m-title">🛒 星运商店</div>
    <div class="m-sub">当前魂力: <span style="color:var(--gl);font-weight:700">${G.sp.toLocaleString()}</span></div>
    <div style="margin-top:8px">${rows}</div>`);
}
function buyLotTicket(id){
  const item=LOT_SHOP.find(x=>x.id===id);if(!item)return;
  if(G.sp<item.cost){notify('魂力不足！','normal');return;}
  G.sp-=item.cost;
  addTicketToBag(item.pool,item.count,item.ten||false);
  notify('✅ 购买成功：'+item.n,'epic');
  updateHUD();saveG();
  openLotShop(); // refresh modal
  const pool=['common','advanced','apex'][poolTicketIdx(item.pool)];
  renderLotDrawGrid(_lotCurPool);
}
function doLot(times){
  const cfg=LOT[curLotMode];
  const total=cfg.cost*times;
  if(G.sp<total){notify(`魂力不足！需要${total}`,'normal');return;}
  G.sp-=total;
  doLotInternal(cfg,curLotMode,times,false);
}
function doLotInternal(cfg,modeIdx,times,fromTicket){
  G.lotTotal+=times;
  // V8: advance tidal counter
  if(!G.tidalPulls)G.tidalPulls=[0,0,0];
  G.tidalPulls[modeIdx]=(G.tidalPulls[modeIdx]||0)+times;
  updateTidalUI(modeIdx);
  _lotPoolPulls[modeIdx]=(_lotPoolPulls[modeIdx]||0)+times;
  // Update per-pool counter badge
  const cntEl=document.getElementById('lcnt-'+modeIdx);
  if(cntEl)cntEl.textContent=_lotPoolPulls[modeIdx];
  // Update lot-total displays
  const lt=document.getElementById('lot-total');if(lt)lt.textContent=G.lotTotal;
  const lt2=document.getElementById('lot-total-2');if(lt2)lt2.textContent=G.lotTotal;
  // Refresh pity if on current pool
  if(modeIdx===_lotCurPool)updateLotPoolUI(modeIdx);
  const isTen=times>=10;
  // Track apex pulls
  if(modeIdx===2){G.lotTopCount=(G.lotTopCount||0)+times;for(let _i=0;_i<times;_i++)triggerSeasonal('apex_lot');}
  const results=[];
  for(let i=0;i<times;i++){results.push(rollLot(cfg,isTen));applyLot(results[results.length-1],isTen);}
  G.lotHistory.unshift({time:Date.now(),sum:results.map(r=>r.l).join(' · '),count:times,fromTicket});
  if(G.lotHistory.length>14)G.lotHistory.pop();
  const lotEl=$('lot-total');if(lotEl)lotEl.textContent=G.lotTotal;
  G.luckBonus=0;
  updateHUD();saveG();renderBag();
  progressTask('lottery');
  grantActivityDew('lottery');
  // Refresh draw grid ticket counts
  renderLotDrawGrid(_lotCurPool);
  if(isTen)setTimeout(()=>showTenPullAnim(results),80);
  else{
    // v9 unified single-pull feedback
    const res=results[0];
    const tier=getLotTier(res);
    if(tier==='S'){
      const meta=lotTierMeta(res);
      setTimeout(()=>flashTopItem(meta.label,meta.color,meta.icon),300);
    } else if(tier==='A'){
      const meta=lotTierMeta(res);
      setTimeout(()=>flashTopItem(meta.label,meta.color,meta.icon),250);
    } else if(tier==='B'){
      // Tier B: elevated notify only (no full-screen splash)
      const meta=lotTierMeta(res);
      notify('✨ '+meta.label,'legend');
      spawnBurst(meta.color,70);
    }
    // Tier C: already handled by applyLot notify — no extra feedback
  }
  checkEasterEgg();
}
function rollLot(cfg,isTen){
  if(G.ouhuang){
    G.ouhuang=false;
    notify('👑 欧皇激活！','divine');
    if(G.ouhuangSpecial){
      G.ouhuangSpecial=false;
      // Guaranteed: artifact / unlimited ring / cosmic (1/3 each)
      const r3=Math.random();
      if(r3<0.333)return{t:'artifact',self:true,l:'自选神器(欧皇保底)'};
      if(r3<0.666)return{t:'ring',ti:5,l:'怒潮(欧皇保底)',bonus:true};
      return{t:'ring',cosmic:true,l:'宇宙之核(欧皇保底)'};
    }
    const topItem=cfg.pool[cfg.pool.length-2]||cfg.pool[cfg.pool.length-1];
    return topItem.fn(isTen);
  }
  const pool=cfg.pool.map(p=>{
    let w=p.w;
    try{const r=p.fn(false);if(r&&r.t==='herb')w*=2;}catch(e){}
    if(G.luckBonus>0)w*=(1+G.luckBonus*0.03);
    return{...p,_w:w};
  });
  const tot=pool.reduce((s,p)=>s+(p._w||0),0);
  if(tot<=0)return pool[0].fn(isTen);
  let r=Math.random()*tot,c=0;
  for(const p of pool){c+=(p._w||0);if(r<=c)return p.fn(isTen);}
  return pool[0].fn(isTen);
}
// ── Lot helper functions ──
function genRingFromTier(tier){
  const sk=pick(tier.sk);
  const ro={id:Date.now(),n:tier.n,y:tier.y,c:tier.c,sk,pw:tier.pw,tier:tier.n};
  bagPush('ring',ro);
  G.stats.rings++;
  return ro;
}
function genBoneFromTier(tier){
  const slotKey=pick(['head','body','arm','leg']);
  const pool=BONE_POOL[slotKey]||BONE_POOL.head;
  const match=pool.filter(b=>b.tier===tier.n);
  const chosen=match.length?pick(match):pool[Math.min(1,pool.length-1)];
  const bpw=genBonePw(tier.n);
  const boneObj={...chosen,pw:bpw,id:Date.now()+ri(100,999),ringYear:tier.n};
  bagPush('bone',boneObj);
  G.stats.bones++;
  return boneObj;
}
function herbByGrade(grade){
  const gradeMap={common:[0,1,2],rare:[3,4,5,6],advanced:[7,8,9,10,11,12,13]};
  const pool=(gradeMap[grade]||gradeMap.common).filter(i=>i<HERBS.length);
  return HERBS[pick(pool)];
}
function resourceByGrade(grade){
  const gradeMap={common:[0,1,2],rare:[3,4,5],advanced:[6,7,8,9]};
  const pool=(gradeMap[grade]||gradeMap.common).filter(i=>i<RESOURCES.length);
  return RESOURCES[pick(pool)];
}
function applyLot(res,isTen){
  if(res.t==='sp'){addSP(res.v,null);notify('🎲 获得 '+res.v+' 魂力','normal');}
  else if(res.t==='ring'||res.t==='ringbone'){
    const ti=Math.min(res.ti||0,RT.length-1);
    const tier=res.cosmic?RT[7]:RT[ti];
    if(res.cosmic){
      if(!G.cosmicOwned){G.cosmicOwned=true;genRingFromTier(tier);notify('🌌 ！！！宇宙之核！！！','cosmic');spawnBurst('#00ffff',200);addSoulFragment('triple',2);}
      else{const alt=RT[6];genRingFromTier(alt);notify('宇宙之核已持有，改为神赐魂环','divine');}
    } else {
      const ro=genRingFromTier(tier);
      notify('🔮 '+tier.n+'·'+ro.sk+'·战力+'+tier.pw,tier.y>=999999999?'legend':'normal');
      if(res.bonus&&tier.attr)notify('✨ '+tier.n+'附带特殊属性！','epic');
      if(res.t==='ringbone'||res.bone){const bo=genBoneFromTier(tier);notify('🦴 '+bo.n+' 战力+'+bo.pw,'epic');}
      // v9: fragment drop for high-tier lottery rings
      if(G.soul){
        if(tier.n==='神赐')addSoulFragment('apex',1);
        else if(tier.n==='不可估量')addSoulFragment('ha',1);
        else if(tier.n==='百万年')addSoulFragment('legend',1);
      }
    }
    if(tier.y>=1000000)triggerSeasonal('ring_legend');
  }
  else if(res.t==='bone'){
    const ti=Math.min(res.ti||0,RT.length-1);const tier=RT[ti];
    const bo=genBoneFromTier(tier);notify('🦴 '+bo.n+' 战力+'+bo.pw,'epic');
  }
  else if(res.t==='artifact'){
    if(res.self){setTimeout(()=>openArtSelect(),300);}
    else{const a=pick(ARTS.filter(x=>!x.extreme));G.bag.push({type:'artifact',data:a,count:1,id:Date.now()});notify('⚔️ 神器：'+a.n+'！战力×'+a.mul,'legend');G.stats.arts++;}
  }
  else if(res.t==='herb'){
    const h=herbByGrade(res.grade||'common');addHerbToBag(h);notify('🌿 药草：'+h.n+'！','epic');
  }
  else if(res.t==='resource'){
    const r=resourceByGrade(res.grade||'common');addResourceToBag(r);notify('📦 资源：'+r.n+'！','normal');
  }
  else if(res.t==='title'){
    const tp=TITLES[res.pool]||TITLES.rare;const t=pick(tp);
    if(!G.titles.find(x=>x.n===t.n)){G.titles.push(t);notify('👑 称号：'+t.n+'·战力+'+t.pw,'divine');}
    if(t.n==='欧皇'){
      G.ouhuang=true;
      if(res.ouhuangSpecial)G.ouhuangSpecial=true;
      notify('🌟 欧皇！下次必中高价值奖励！','divine');
    }
  }
}
// ──── UNIFIED GACHA FEEDBACK (v9) ────
// Tier definitions:
//   S (cosmic/god): full-screen splash + particle burst
//   A (unlimited+/legend title/special title): full-screen flash
//   B (million-year ring/artifact/advanced title): notify 'legend' + particle
//   C (anything else): notify 'normal' or 'epic'

function getLotTier(res){
  if(!res)return'C';
  if(res.t==='ring'&&res.cosmic)return'S';
  if(res.t==='ring'&&(res.ti||0)>=6)return'S';   // 神赐 or 宇宙之核
  if(res.t==='title'&&res.pool==='special')return'S';
  if(res.t==='ring'&&(res.ti||0)===5)return'A';   // 不可估量
  if(res.t==='title'&&res.pool==='legend')return'A';
  if(res.t==='artifact'&&res.self)return'A';       // 自选神器(欧皇)
  if(res.t==='ring'&&(res.ti||0)===4)return'B';   // 百万年
  if(res.t==='artifact')return'B';
  if(res.t==='title'&&res.pool==='advanced')return'B';
  if(res.t==='bone'&&res.bonus)return'B';
  return'C';
}
function lotTierMeta(res){
  // Returns {label,color,icon} for the result
  if(res.t==='ring'){
    const tier=res.cosmic?RT[7]:(res.ti!=null&&res.ti>=0&&res.ti<RT.length?RT[res.ti]:RT[0]);
    return{label:res.cosmic?'🌌 宇宙之核降临！亘古唯一！':`✨ 获得 ${tier?.n}！`,color:tier?.c||'#ffd700',icon:'⭕'};
  }
  if(res.t==='title')return{label:`👑 ${res.l}`,color:res.pool==='legend'?'#ef4444':res.pool==='special'?'#ffd700':'#f59e0b',icon:'👑'};
  if(res.t==='artifact')return{label:`⚔️ ${res.l}`,color:'#f59e0b',icon:'⚔️'};
  return{label:res.l||'--',color:'#9ca3af',icon:'🎲'};
}

function flashTopItem(label,color,icon){
  let ov=$('top-flash');
  if(!ov){
    ov=document.createElement('div');ov.id='top-flash';
    ov.style.cssText='position:fixed;inset:0;z-index:402;background:rgba(0,0,0,.93);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer';
    ov.innerHTML=`<style>@keyframes tfIn{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}</style>
      <div style="animation:tfIn .4s ease both">
        <div style="font-size:86px;animation:iconFloat 2s ease infinite;margin-bottom:16px;text-align:center">${icon||'🌟'}</div>
        <div style="font-family:"Ma Shan Zheng",serif;font-size:28px;color:${color||'#ffd700'};text-shadow:0 0 22px ${color||'#ffd700'};letter-spacing:3px;text-align:center;padding:0 24px">${label}</div>
        <div style="margin-top:22px;text-align:center;font-size:11px;color:rgba(255,255,255,.38);animation:blk 1.5s infinite">点击任意处继续</div>
      </div>
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 44%,${color||'#ffd700'}22,transparent 65%);pointer-events:none;animation:bP .9s ease infinite"></div>`;
    ov.onclick=()=>ov.remove();
    document.body.appendChild(ov);
    spawnBurst(color||'#ffd700',180);
    setTimeout(()=>ov&&ov.remove(),9000);
  }
}

// Replaced isTopItem - now used only internally for compatibility
function isTopItem(res){
  const t=getLotTier(res);
  if(t==='S'||t==='A'){const m=lotTierMeta(res);return{label:m.label,color:m.color,icon:m.icon};}
  return null;
}

// ──── TEN-PULL ANIMATION (v9 unified) ────
let tenPullQueue=[];
function showTenPullAnim(results){
  let ov=$('ten-pull-ov');
  if(ov)ov.remove();
  ov=document.createElement('div');ov.id='ten-pull-ov';
  ov.style.cssText='position:fixed;inset:0;z-index:390;background:rgba(0,0,0,.96);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px';

  // Sort: highest tier first for visual clarity within the grid
  const tierOrder={S:0,A:1,B:2,C:3};
  const annotated=results.map(r=>({r,tier:getLotTier(r)}));
  // Don't re-sort — keep original order for reveal feel; add tier glow instead

  const cards=annotated.map(({r,tier},i)=>{
    let ico='🎲',label=r.l||'--',col='#9ca3af';
    if(r.t==='ring'){const t=r.cosmic?RT[7]:(r.ti!=null&&r.ti>=0&&r.ti<RT.length?RT[r.ti]:RT[0]);ico='⭕';label=t?t.n:'魂环';col=t?t.c:'#a78bfa';}
    else if(r.t==='ringbone'){const t=r.ti!=null?RT[Math.min(r.ti,7)]:RT[0];ico='⭕';label=t?t.n+'骨':'魂环+骨';col=t?t.c:'#a78bfa';}
    else if(r.t==='title'){ico='👑';col=r.pool==='legend'?'#ef4444':r.pool==='advanced'?'#f59e0b':r.pool==='special'?'#ffd700':'#8b5cf6';label=r.l||'称号';}
    else if(r.t==='artifact'){ico='⚔️';col='#f59e0b';}
    else if(r.t==='herb'){ico='🌿';col='#22c55e';}
    else if(r.t==='resource'){ico='📦';col='#9ca3af';}
    else if(r.t==='sp'){ico='💫';col='#f0d060';}
    else if(r.t==='bone'){ico='🦴';col='#fbbf24';}
    // Tier-specific card styles
    const glowSize=tier==='S'?'20px':tier==='A'?'12px':tier==='B'?'6px':'2px';
    const borderW=tier==='S'||tier==='A'?'2px':'1.5px';
    const bg=tier==='S'?`linear-gradient(135deg,rgba(0,255,255,.12),rgba(0,0,0,.3))`
            :tier==='A'?`linear-gradient(135deg,rgba(${col.replace('#','').match(/../g).map(h=>parseInt(h,16)).join(',')},0.1),rgba(0,0,0,.25))`
            :'linear-gradient(135deg,rgba(255,255,255,.05),rgba(0,0,0,.2))';
    return`<div style="background:${bg};border:${borderW} solid ${col}${tier==='S'?'':tier==='A'?'bb':'70'};border-radius:10px;padding:9px 5px;text-align:center;animation:tfIn .32s ease ${i*.07}s both;box-shadow:0 2px 8px rgba(0,0,0,.5),0 0 ${glowSize} ${col}${tier==='S'?'55':tier==='A'?'33':'18'}">
      <div style="font-size:22px;filter:drop-shadow(0 0 ${tier==='S'?'10px':tier==='A'?'6px':'3px'} ${col})">${ico}</div>
      <div style="font-size:9px;color:${col};margin-top:3px;line-height:1.3;font-weight:${tier==='S'||tier==='A'?700:400}">${label.length>7?label.slice(0,7)+'…':label}</div>
      ${tier==='S'?'<div style="font-size:7px;color:#00ffff;margin-top:2px;letter-spacing:.5px">★ 绝世</div>':tier==='A'?`<div style="font-size:7px;color:${col};margin-top:2px;opacity:.7">◆ 顶级</div>`:''}
    </div>`;
  }).join('');

  // Find best result for background glow color
  const bestTier=annotated.reduce((b,a)=>tierOrder[a.tier]<tierOrder[b.tier]?a:b,annotated[0]);
  const bgCol=bestTier.tier==='S'?'rgba(0,255,255,.1)':bestTier.tier==='A'?'rgba(239,68,68,.09)':bestTier.tier==='B'?'rgba(245,158,11,.07)':'rgba(201,162,39,.06)';

  ov.innerHTML=`<style>
    @keyframes tfIn{from{opacity:0;transform:scale(.55) translateY(24px)}70%{transform:scale(1.06) translateY(-2px)}to{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes bgP{0%,100%{opacity:.6}50%{opacity:1}}
  </style>
  <div style="animation:bgP 2s ease infinite;position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,${bgCol},transparent 62%);pointer-events:none"></div>
  <div style="font-family:"Ma Shan Zheng",serif;font-size:20px;color:var(--gl);letter-spacing:3px;margin-bottom:14px;text-shadow:0 0 14px rgba(245,158,11,.5);position:relative;z-index:1">✨ 十连结果 ✨</div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;width:100%;max-width:390px;margin-bottom:18px;position:relative;z-index:1">${cards}</div>
  <button onclick="$('ten-pull-ov').remove()" style="padding:10px 32px;border-radius:10px;border:1px solid var(--bdrB);background:rgba(201,162,39,.15);color:var(--gl);font-size:14px;cursor:pointer;font-family:"Ma Shan Zheng",serif;letter-spacing:3px;position:relative;z-index:1">关闭</button>`;
  document.body.appendChild(ov);
  spawnBurst('#f0d060',50);

  // Tiered post-reveal: S triggers full-screen splash after cards animate in
  const topResults=annotated.filter(a=>a.tier==='S'||a.tier==='A');
  if(topResults.length>0){
    const best=topResults[0];
    const meta=lotTierMeta(best.r);
    setTimeout(()=>{
      if($('ten-pull-ov'))flashTopItem(meta.label,meta.color,meta.icon);
    },annotated.length*80+600);
  }
}

// ──── EASTER EGG ────
function checkEasterEgg(){
  if((G.lotTopCount||0)>=1001&&!G.easterEggSeen){
    G.easterEggSeen=true;saveG();
    setTimeout(()=>showEasterEgg(),500);
  }
}
function showEasterEgg(){
  let ov=$('egg-ov');if(ov)return;
  ov=document.createElement('div');ov.id='egg-ov';
  ov.style.cssText='position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.97);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px';
  ov.innerHTML=`
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(0,255,255,.08),transparent 65%);pointer-events:none"></div>
    <div style="font-size:72px;animation:iconFloat 2s ease infinite;margin-bottom:16px;position:relative;z-index:1">∞</div>
    <div style="font-family:'Ma Shan Zheng',serif;font-size:28px;color:#00ffff;text-shadow:0 0 20px #00ffff;letter-spacing:4px;margin-bottom:8px;z-index:1">彩蛋觉醒</div>
    <div style="font-family:'Ma Shan Zheng',serif;font-size:22px;color:#ffd700;letter-spacing:3px;margin-bottom:16px;z-index:1">超顶级武魂『初』</div>
    <div style="font-size:12px;color:rgba(255,255,255,.6);text-align:center;max-width:280px;line-height:1.8;margin-bottom:20px;z-index:1">
      你在顶级奖池中的坚持终于触动了宇宙意志。<br/>
      武魂『初』——一切的起点，也是终点。<br/>
      <span style="color:#fca5a5">初始战力：10,000,000</span><br/>
      <span style="color:#f87171">装备将被完全重置</span>
    </div>
    <div style="display:flex;gap:12px;z-index:1">
      <button onclick="claimEasterEgg()" style="padding:12px 28px;border-radius:10px;border:1px solid rgba(0,255,255,.5);background:rgba(0,255,255,.12);color:#00ffff;font-family:'Ma Shan Zheng',serif;font-size:16px;letter-spacing:3px;cursor:pointer">接受『初』</button>
      <button onclick="$('egg-ov').remove()" style="padding:12px 22px;border-radius:10px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:rgba(255,255,255,.5);font-size:13px;cursor:pointer">暂不接受</button>
    </div>`;
  document.body.appendChild(ov);
  spawnBurst('#00ffff',200);
}
function claimEasterEgg(){
  const ov=$('egg-ov');if(ov)ov.remove();
  G.soul={
    id:Date.now(),name:'初',icon:'∞',quality:'triple',
    desc:'一切武魂的起源，也是一切的终结。超越了品质概念本身的存在。',
    attrs:['宇宙','起源','终结','超越','混沌','虚无','存在'],
    initPow:100,rings:[],skills:[
      {name:'宇宙归一',desc:'以『初』之力将宇宙法则归纳于一身，超越一切已知边界。',params:['全属性×∞','无视规则','宇宙意志'],ring:0},
      {name:'万物溯源',desc:'追溯万物起源，可以改写任何属性的底层逻辑。',params:['改写属性','溯源力+∞'],ring:0},
      {name:'虚无之眼',desc:'以虚无之眼洞察一切，无物可逃脱其感知。',params:['全感知+∞','穿透所有防御'],ring:0},
    ],
    secondAwakened:false,divine:true,isChu:true,
  };
  G.equippedBones={};G.equippedArt=null;
  G.extraPower=10000000;
  notify('∞ 武魂「初」觉醒！战力：10,000,000！宇宙意志降临！','cosmic');
  spawnBurst('#00ffff',300);
  updateHUD();saveG();renderSoulPage();
}

// ──── NEWBIE GIFT ────
function checkNewbieGift(){
  if(!G.newbieGiftClaimed&&G.awakenDone){
    G.newbieGiftClaimed=true;
    // 1% chance 百万年魂环
    if(Math.random()<0.01){
      const t=RT[4];const ro={id:Date.now(),n:t.n,y:t.y,c:t.c,sk:pick(t.sk),pw:t.pw,tier:t.n};
      G.bag.push({type:'ring',data:ro,count:1,id:Date.now()});
      notify('🎁 新手礼包：百万年魂环！超稀有！','legend');spawnBurst('#f87171',80);
    }
    // 8 herbs (random assortment)
    const herbGift=[0,1,2,3,4,5,6,7];
    herbGift.forEach(i=>addHerbToBag(HERBS[i%HERBS.length]));
    notify('🌿 新手礼包：8种药草已发放！','epic');
    // Tickets
    addTicketToBag('common',5);  // 普通×5张
    // Advanced ×2 (ten-pull)
    for(let i=0;i<2;i++){
      const ex=G.bag.find(b=>b.type==='ticket'&&b.data?.pool==='advanced'&&b.data?.ten);
      if(ex)ex.count++;
      else G.bag.push({type:'ticket',data:{id:'ticket_advanced_ten_'+i,pool:'advanced',n:'高级星运十连券',i:'🎫',c:'#3b82f6',ten:true},count:1,id:Date.now()+i});
    }
    // Apex ×1 (ten-pull)
    const exA=G.bag.find(b=>b.type==='ticket'&&b.data?.pool==='apex'&&b.data?.ten);
    if(exA)exA.count++;
    else G.bag.push({type:'ticket',data:{id:'ticket_apex_ten_0',pool:'apex',n:'顶级星运十连券',i:'🏆',c:'#ef4444',ten:true},count:1,id:Date.now()+99});
    notify('🎁 新手礼包已发放！顶级十连券×1·高级十连券×2·普通×5','divine');
    spawnBurst('#ffd700',100);
    saveG();renderBag();
  }
}
function renderLotHist(){
  const c=$('lot-hist');if(!c)return;
  const lt2=document.getElementById('lot-total-2');if(lt2)lt2.textContent=G.lotTotal||0;
  if(!G.lotHistory.length){c.innerHTML='<div class="empty-st"><div class="ei">🎲</div><div class="em">尚未抽取</div></div>';return;}
  c.innerHTML=G.lotHistory.slice(0,8).map(h=>{
    const isCosmic=h.sum&&h.sum.includes('宇宙之核');
    const isLeg=h.sum&&(h.sum.includes('不可估量')||h.sum.includes('百万年')||h.sum.includes('神赐'));
    return`<div class="lh-item${isCosmic?' cos':isLeg?' leg':''}">
      <div class="lh-n">×${h.count}</div>
      <div class="lh-b">
        <div class="lh-items">${h.sum}</div>
        <div class="lh-meta">
          <span>${h.count}连抽</span>
          ${h.fromTicket?'<span class="lh-tag lh-tk">🎟️ 券抽</span>':''}
          ${isCosmic?'<span class="lh-tag lh-cs">宇宙唯一</span>':isLeg?'<span class="lh-tag lh-lg">传说命中</span>':''}
        </div>
      </div>
    </div>`;
  }).join('');
}

// ──── HERB & RESOURCE HELPERS ────
function addHerbToBag(herb){
  const e=G.bag.find(i=>i.type==='herb'&&i.data.id===herb.id);
  if(e)e.count++;else G.bag.push({type:'herb',data:herb,count:1,id:Date.now()});
}
function addResourceToBag(res){
  const e=G.bag.find(i=>i.type==='resource'&&i.data.id===res.id);
  if(e)e.count++;else G.bag.push({type:'resource',data:res,count:1,id:Date.now()});
}

// ══════════════════════════════════════════════════
//  SEASONAL TASKS — 踏春欧皇
// ══════════════════════════════════════════════════
const SEASONAL_TASKS=[
  {id:"s1",n:"一、升级奖励",d:"每升一级获得顶级星运券×1",icon:"⬆️",
   trigger:'level', hint:"提升等级即可触发"},
  {id:"s2",n:"二、猎魂不止",d:"每完成5次任意狩猎获得顶级星运券×1",icon:"🔮",
   trigger:'hunt5', count:0, threshold:5},
  {id:"s3",n:"三、百万传奇",d:"每获得一个百万年及以上魂环获得顶级星运券×1",icon:"⭕",
   trigger:'ring_legend'},
  {id:"s4",n:"四、顶级常客",d:"每进行10次顶级星运获得顶级星运券×1",icon:"🏆",
   trigger:'apex_lot10', count:0, threshold:10},
  {id:"s5",n:"五、全能强者",d:"每累计完成上述任一任务10次，额外获得顶级星运券×1",icon:"👑",
   trigger:'all_combo10', count:0, threshold:10},
];

function initSeasonalTasks(){
  if(!G.seasonal)G.seasonal={
    completions:{s1:0,s2:0,s3:0,s4:0,s5:0},
    s2count:0, s4count:0, s5allCount:0
  };
}

function triggerSeasonal(type, extra){
  initSeasonalTasks();
  const S=G.seasonal;
  let rewarded=false;
  if(type==='level'){
    addTicketToBag('apex',1);S.completions.s1++;rewarded=true;
    notify('🌸 踏春欧皇·一：升级奖励！顶级星运券×1','divine');
  } else if(type==='hunt'){
    S.s2count=(S.s2count||0)+1;
    if(S.s2count>=5){S.s2count-=5;addTicketToBag('apex',1);S.completions.s2++;rewarded=true;
      notify('🌸 踏春欧皇·二：5次狩猎达成！顶级星运券×1','divine');}
  } else if(type==='ring_legend'){
    addTicketToBag('apex',1);S.completions.s3++;rewarded=true;
    notify('🌸 踏春欧皇·三：百万年魂环！顶级星运券×1','divine');
  } else if(type==='apex_lot'){
    S.s4count=(S.s4count||0)+1;
    if(S.s4count>=10){S.s4count-=10;addTicketToBag('apex',1);S.completions.s4++;rewarded=true;
      notify('🌸 踏春欧皇·四：10次顶级星运！顶级星运券×1','divine');}
  }
  // Task 5: every 10 completions across s1-s4
  if(rewarded){
    const total=S.completions.s1+S.completions.s2+S.completions.s3+S.completions.s4;
    const milestone=Math.floor(total/10);
    if(milestone>(S.s5milestone||0)){
      const times=milestone-(S.s5milestone||0);
      S.s5milestone=milestone;
      S.completions.s5+=times;
      for(let i=0;i<times;i++)addTicketToBag('apex',1);
      notify('🌸 踏春欧皇·五：综合达成×10！顶级星运券×'+times,'cosmic');spawnBurst('#f9a8d4',80);
    }
    saveG();renderBag();renderSeasonalTasks();
  }
}

function renderSeasonalTasks(){
  initSeasonalTasks();
  const S=G.seasonal;
  const c=document.getElementById('seasonal-tasks');if(!c)return;
  const tasks=[
    {id:"s1",n:"任务一：升级奖励",d:"每升一级 → 顶级星运券×1",ico:"⬆️",cnt:S.completions.s1||0,prog:null},
    {id:"s2",n:"任务二：猎魂不止",d:"每5次狩猎 → 顶级星运券×1",ico:"🔮",cnt:S.completions.s2||0,prog:`${S.s2count||0}/5次`},
    {id:"s3",n:"任务三：百万传奇",d:"每百万年+魂环 → 顶级星运券×1",ico:"⭕",cnt:S.completions.s3||0,prog:null},
    {id:"s4",n:"任务四：顶级常客",d:"每10次顶级星运 → 顶级星运券×1",ico:"🏆",cnt:S.completions.s4||0,prog:`${S.s4count||0}/10次`},
    {id:"s5",n:"任务五：全能强者",d:"累计10次任意任务 → 顶级星运券×1",ico:"👑",cnt:S.completions.s5||0,prog:`已完成${(S.completions.s1||0)+(S.completions.s2||0)+(S.completions.s3||0)+(S.completions.s4||0)}次`},
  ];
  c.innerHTML=tasks.map(t=>`
    <div class="sb-task-row">
      <div class="sb-task-ico">${t.ico}</div>
      <div class="sb-task-body">
        <div class="sb-task-name">${t.n}</div>
        <div class="sb-task-desc">${t.d}</div>
        ${t.prog?`<div class="sb-task-prog">进度: ${t.prog}</div>`:''}
      </div>
      <div class="sb-task-rew">
        <div class="sb-task-cnt">×${t.cnt||0}</div>
        <div class="sb-task-lbl">已领取</div>
      </div>
    </div>`).join('');
  // Update banner total count
  const total=(S.completions.s1||0)+(S.completions.s2||0)+(S.completions.s3||0)+(S.completions.s4||0)+(S.completions.s5||0);
  const cnt=$('sb-total-cnt');if(cnt)cnt.textContent=`已领取 ${total} 次`;
  // Init geo canvas if needed
  initSeasonalGeo();
  renderModalSeasonalTasks();
}
function renderModalSeasonalTasks(){
  if(!G.activity?.active)return;
  const sc=document.querySelector('.seasonal-tasks-m');
  if(!sc||document.getElementById('modal')?.classList.contains('show')===false)return;
  initSeasonalTasks();
  const S=G.seasonal;
  const tasks=[
    {id:"s1",n:"任务一：升级奖励",d:"每升一级 → 顶级星运券×1",ico:"⬆️",cnt:S.completions.s1||0,prog:null},
    {id:"s2",n:"任务二：猎魂不止",d:"每5次狩猎 → 顶级星运券×1",ico:"🔮",cnt:S.completions.s2||0,prog:`${S.s2count||0}/5次`},
    {id:"s3",n:"任务三：百万传奇",d:"每百万年+魂环 → 顶级星运券×1",ico:"⭕",cnt:S.completions.s3||0,prog:null},
    {id:"s4",n:"任务四：顶级常客",d:"每10次顶级星运 → 顶级星运券×1",ico:"🏆",cnt:S.completions.s4||0,prog:`${S.s4count||0}/10次`},
    {id:"s5",n:"任务五：全能强者",d:"累计10次任意任务 → 顶级星运券×1",ico:"👑",cnt:S.completions.s5||0,prog:`已完成${(S.completions.s1||0)+(S.completions.s2||0)+(S.completions.s3||0)+(S.completions.s4||0)}次`},
  ];
  sc.innerHTML=tasks.map(t=>`
    <div class="sb-task-row">
      <div class="sb-task-ico">${t.ico}</div>
      <div class="sb-task-body">
        <div class="sb-task-name">${t.n}</div>
        <div class="sb-task-desc">${t.d}</div>
        ${t.prog?`<div class="sb-task-prog">进度: ${t.prog}</div>`:''}
      </div>
      <div class="sb-task-rew">
        <div class="sb-task-cnt">×${t.cnt||0}</div>
        <div class="sb-task-lbl">已领取</div>
      </div>
    </div>`).join('');
  const total=(S.completions.s1||0)+(S.completions.s2||0)+(S.completions.s3||0)+(S.completions.s4||0)+(S.completions.s5||0);
  const tc=document.querySelector('.sb-total-cnt-m');
  if(tc)tc.textContent=total;
}

let _sbGeoRaf=null;const _sbGeoAng=[];
function stopSbGeo(){if(_sbGeoRaf){cancelAnimationFrame(_sbGeoRaf);_sbGeoRaf=null;}}
function initSeasonalGeo(){
  // 季节几何动画已禁用
  return;
}

function toggleSeasonalBanner(){
  const banner=$('sb-banner');if(!banner)return;
  const isOpen=banner.classList.toggle('open');
  const arrow=$('sb-arrow');if(arrow)arrow.textContent=isOpen?'▲':'▼';
  // Resize canvas when detail opens (height changes)
  if(isOpen){
    setTimeout(()=>{
      const cvs=$('sb-geo');if(!cvs)return;
      const rect=banner.getBoundingClientRect();
      cvs.width=rect.width||390;cvs.height=rect.height||100;
    },50);
  }
}

// ══════════════════════════════════════════════════
//  ACTIVITY SYSTEM (v9) — 限时活动框架
// ══════════════════════════════════════════════════
const ACTIVITY_DEF={
  id:'springFestival',
  name:'踏春欧皇',
  icon:'🌸',
  currency:{icon:'💧',name:'春分灵露'},
  // Shop items purchasable with spring dew
  shop:[
    {id:'as1',n:'限定称号·春日传说',i:'🌸',cost:200,type:'title',data:{n:'春日传说',c:'#f9a8d4',d:'踏春活动限定称号，春意盎然。',pw:300,bonus:'春季双倍狩猎魂力'},onetime:true},
    {id:'as2',n:'限定魂骨皮肤·春华骨纹',i:'🌺',cost:150,type:'skin',data:{n:'春华骨纹',d:'春日限定魂骨外观，不影响属性。'},onetime:true},
    {id:'as3',n:'顶级星运券×3',i:'🏆',cost:120,type:'ticket',pool:'apex',count:3},
    {id:'as4',n:'高级星运券×5',i:'🎫',cost:60,type:'ticket',pool:'advanced',count:5},
    {id:'as5',n:'普通星运券×10',i:'🎟️',cost:30,type:'ticket',pool:'common',count:10},
    {id:'as6',n:'灵石×10',i:'💠',cost:20,type:'resource',resId:'r1',count:10},
    {id:'as7',n:'限定活动武魂·春日灵狐',i:'🦊',cost:500,type:'soulUnlock',data:{n:'春日灵狐',i:'🦊',quality:'hc',desc:'踏春活动专属武魂，仅入图鉴不影响战力。',a:['春日','灵气','活动限定']},onetime:true},
  ],
};

function getActivityCurrency(){return G.activity?.currency||0;}
function addActivityCurrency(v,label){
  if(!G.activity)return;
  G.activity.currency=(G.activity.currency||0)+v;
  if(label)notify(`💧 +${v} 春分灵露 (${label})`,'epic');
  updateActivityHUD();
}
function updateActivityHUD(){
  const el=$('act-currency');
  if(el)el.textContent=(G.activity?.currency||0);
}

function openActivityShop(){
  const cur=G.activity?.currency||0;
  const claimed=G.activity?.shopClaimed||{};
  const rows=ACTIVITY_DEF.shop.map(item=>{
    const isClaimed=item.onetime&&claimed[item.id];
    const canAfford=cur>=item.cost&&!isClaimed;
    return`<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);opacity:${isClaimed?.5:1}">
      <div style="font-size:22px">${item.i}</div>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:600;color:var(--txt)">${item.n}</div>
        <div style="font-size:10px;color:#f9a8d4">💧 ${item.cost} 春分灵露${item.onetime?' · 限购一次':''}</div>
      </div>
      <div class="m-btn ok" style="flex-shrink:0;font-size:10px;padding:5px 10px;${canAfford?'cursor:pointer':'opacity:.35;pointer-events:none'}" onclick="buyActivityItem('${item.id}')">
        ${isClaimed?'已购':'兑换'}
      </div>
    </div>`;
  }).join('');
  openModal(`<div class="m-title">🌸 活动商店</div>
    <div class="m-sub">春分灵露: <span style="color:#f9a8d4;font-weight:700">${cur}</span> 💧</div>
    <div style="font-size:10px;color:var(--dim);text-align:center;margin:6px 0 8px">修炼·探索·任务完成均可获得春分灵露</div>
    <div>${rows}</div>`);
}

function buyActivityItem(id){
  const item=ACTIVITY_DEF.shop.find(x=>x.id===id);if(!item)return;
  const cur=G.activity?.currency||0;
  if(cur<item.cost){notify('春分灵露不足！','normal');return;}
  if(item.onetime&&G.activity?.shopClaimed?.[id]){notify('该商品已购买','normal');return;}
  G.activity.currency-=item.cost;
  if(item.onetime){if(!G.activity.shopClaimed)G.activity.shopClaimed={};G.activity.shopClaimed[id]=true;}
  if(item.type==='ticket'){addTicketToBag(item.pool,item.count);notify(`✅ 获得 ${item.n}`,'epic');}
  else if(item.type==='title'){if(!G.titles.find(t=>t.n===item.data.n))G.titles.push(item.data);notify(`👑 限定称号：${item.data.n}！`,'divine');spawnBurst('#f9a8d4',80);}
  else if(item.type==='resource'){const res=RESOURCES.find(r=>r.id===item.resId);if(res)for(let i=0;i<(item.count||1);i++)addResourceToBag(res);notify(`📦 获得 ${item.n}`,'epic');}
  else if(item.type==='soulUnlock'){
    grimoireDiscover(item.data.n,item.data.quality);
    // Add as special "lore" entry to bag (cosmetic, no equip)
    G.bag.push({type:'other',data:{...item.data,id:'actSoul_'+item.id,i:item.data.i,n:'[活动]'+item.data.n,c:'#f9a8d4'},count:1,id:Date.now()});
    notify(`🦊 限定武魂「${item.data.n}」已入图鉴！`,'divine');spawnBurst('#f9a8d4',100);
  }
  else if(item.type==='skin'){G.bag.push({type:'other',data:{id:'skin_'+item.id,i:item.i,n:item.data.n,d:item.data.d,c:'#f9a8d4'},count:1,id:Date.now()});notify(`🌺 ${item.data.n} 已获得！`,'epic');}
  updateHUD();saveG();openActivityShop();
}

// Grant spring dew from cultivate/explore/tasks (called in existing functions)
function grantActivityDew(source){
  if(!G.activity?.active)return;
  const dewMap={cultivate:2,explore:5,task:8,hunt:3,lottery:1};
  const v=dewMap[source]||1;
  addActivityCurrency(v,null);
  saveG();updateActivityHUD();
}
const HIDDEN_TASK_TPL=[
  {n:"🎯 秘境挑战",d:"在一次狩猎中触发特殊事件",g:1,r:5000,t:"hunt",i:"🎯",ticket:'apex',ticketN:1,hidden:true},
  {n:"🌀 混沌试炼",d:"进入混沌之地狩猎3次",g:3,r:3000,t:"hunt",i:"🌀",ticket:'advanced',ticketN:2,hidden:true},
  {n:"👑 神级追溯",d:"对武魂进行二次觉醒",g:1,r:8000,t:"awaken",i:"👑",ticket:'apex',ticketN:1,hidden:true},
  {n:"⚔️ 古器发掘",d:"在狩猎中获得神器",g:1,r:4000,t:"artifact",i:"⚔️",ticket:'advanced',ticketN:1,hidden:true},
  {n:"🌿 百草采撷",d:"收集5种不同药草",g:5,r:2500,t:"herb",i:"🌿",ticket:'common',ticketN:3,hidden:true},
  {n:"💎 神骨降临",d:"在特殊道路中获得神骨",g:1,r:10000,t:"godbone",i:"💎",ticket:'apex',ticketN:2,hidden:true},
];
function genTasks(){
  // 仅生成日常任务（已移除隐藏任务）
  const sh=[...TASK_TPL].sort(()=>Math.random()-.5);
  G.tasks=[
    ...sh.slice(0,4).map(t=>({...t,prog:0,claimed:false,id:Date.now()+Math.random()})),
  ];
  G.taskRT=Date.now();G.refreshCount=0;saveG();
}
function refreshTasks(){
  if(G.refreshCount>=2){
    const cost=100;
    if(G.sp<cost){notify('魂力不足！需要100魂力刷新','normal');return;}
    if(!confirm(`第${G.refreshCount+1}次刷新需要100魂力，确认吗？`))return;
    G.sp-=cost;updateHUD();
  }
  G.refreshCount=(G.refreshCount||0)+1;
  genTasks();renderTasks();renderModalTasks();
  const rc=$('refresh-cost');
  if(rc)rc.textContent=G.refreshCount>=2?'(100魂力)':'';
  notify('任务已刷新','normal');
}
function updateRefreshBtn(){
  const paid=(G.refreshCount||0)>=2;
  $set('refresh-cost','textContent',paid?'(100)':'');
  const btn=$('refresh-btn');
  if(btn){btn.className='tasks-refresh-btn'+(paid?' paid':'');}
  const mc=document.querySelector('.refresh-cost-m');
  if(mc)mc.textContent=paid?'(100)':'';
}
function renderModalTasks(){
  const mc=document.querySelector('.daily-tasks-m');
  if(!mc||document.getElementById('modal')?.classList.contains('show')===false)return;
  if(!G.tasks.length)genTasks();
  mc.innerHTML=G.tasks.map(t=>{
    const pct=Math.min(100,(t.prog/t.g)*100);
    const done=t.prog>=t.g;
    const isHidden=t.hidden;
    let cls='tc'+(t.claimed?' claimed':done?' claimable':isHidden?' hidden':'');
    const btnCls=t.claimed?'done':done?'do':'wait';
    const btnTxt=t.claimed?'已领取':done?'领取':'进行中';
    const tixH=t.ticket&&!t.claimed
      ?`<div class="tc-tix">🎟️ ${poolTicketName(t.ticket)}×${t.ticketN}</div>`
      :'';
    return`<div class="${cls}"><div class="tc-main">
      <div class="tc-ico-w">${t.i}</div>
      <div class="tc-body">
        <div class="tc-name">${t.n}</div>
        <div class="tc-desc">${t.d} (${Math.min(t.prog,t.g)}/${t.g})</div>
        <div class="tc-pb"><div class="tc-pf" style="width:${pct}%"></div></div>
        ${tixH}
      </div>
      <div class="tc-right">
        <div class="tc-rew">+${t.r}</div>
        <div class="tc-btn ${btnCls}" onclick="claimTask('${t.id}')">${btnTxt}</div>
      </div>
    </div></div>`;
  }).join('');
  const de=document.querySelector('.daily-e-m');
  if(de)de.textContent=G.dailyEarned;
  // Render hidden tasks
  const hmc=document.querySelector('.hidden-tasks-m');
  if(hmc){
    const ht=G.hiddenTasks||[];
    if(!ht.length){
      hmc.innerHTML='<div style="font-size:9px;color:var(--dim);text-align:center;padding:10px 0;opacity:.6">🔮 完成日常任务有概率触发隐藏任务…</div>';
    }else{
      hmc.innerHTML=ht.map(t=>{
        const pct=Math.min(100,(t.prog/t.g)*100);
        const done=t.prog>=t.g;
        let cls='tc hidden'+(t.claimed?' claimed':done?' claimable':'');
        const btnCls=t.claimed?'done':done?'do':'wait';
        const btnTxt=t.claimed?'已领取':done?'领取':'??';
        const tixH=t.ticket&&!t.claimed
          ?`<div class="tc-tix">🎟️ ${poolTicketName(t.ticket)}×${t.ticketN}</div>`
          :'';
        return`<div class="${cls}"><div class="tc-main">
          <div class="tc-ico-w">${t.i}</div>
          <div class="tc-body">
            <div class="tc-name">${t.n}</div>
            <div class="tc-desc">${t.d} (${Math.min(t.prog,t.g)}/${t.g})</div>
            <div class="tc-pb"><div class="tc-pf" style="width:${pct}%"></div></div>
            ${tixH}
          </div>
          <div class="tc-right">
            <div class="tc-rew">+${t.r}</div>
            <div class="tc-btn ${btnCls}" onclick="claimModalHiddenTask('${t.id}')">${btnTxt}</div>
          </div>
        </div></div>`;
      }).join('');
    }
  }
}
function renderTasks(){
  if(!G.tasks.length)genTasks();
  const c=document.getElementById('daily-tasks');if(!c)return;
  c.innerHTML=G.tasks.map(t=>{
    const pct=Math.min(100,(t.prog/t.g)*100);
    const done=t.prog>=t.g;
    const isHidden=t.hidden;
    let cls='tc'+(t.claimed?' claimed':done?' claimable':isHidden?' hidden':'');
    const btnCls=t.claimed?'done':done?'do':'wait';
    const btnTxt=t.claimed?'已领取':done?'领取':'进行中';
    const tixH=t.ticket&&!t.claimed
      ?`<div class="tc-tix">${{common:'🎟️',advanced:'🎫',apex:'🏆'}[t.ticket]||'🎟️'} ${poolTicketName(t.ticket)}×${t.ticketN}</div>`
      :'';
    return`<div class="${cls}">
      <div class="tc-main">
        <div class="tc-ico-w">${t.i}</div>
        <div class="tc-body">
          <div class="tc-name">${t.n}</div>
          <div class="tc-desc">${t.d} (${Math.min(t.prog,t.g)}/${t.g})</div>
          <div class="tc-pb"><div class="tc-pf" style="width:${pct}%"></div></div>
          ${tixH}
        </div>
        <div class="tc-right">
          <div class="tc-rew">+${t.r}</div>
          <div class="tc-btn ${btnCls}" onclick="claimTask('${t.id}')">${btnTxt}</div>
        </div>
      </div>
    </div>`;
  }).join('');
  $set('daily-e','textContent',G.dailyEarned);
  updateRefreshBtn();
}
function claimTask(id){
  const t=G.tasks.find(x=>x.id==id);
  if(!t||t.claimed||t.prog<t.g)return;
  t.claimed=true;addSP(t.r,`任务:${t.n}`);addExp(t.r/8);
  grantActivityDew('task');
  // v9: task completion yields soul fragment based on ticket type
  if(t.ticket==='apex'&&G.soul)addSoulFragment(G.soul.quality,1);
  else if(t.ticket==='advanced'&&G.soul)addSoulFragment('common',1);
  if(t.ticket&&t.ticketN){
    addTicketToBag(t.ticket,t.ticketN);
    const tn=poolTicketName(t.ticket);
    notify(`✅ ${t.n}！+${t.r}魂力+${tn}×${t.ticketN}`,'epic');
  } else {
    notify(`✅ ${t.n}完成！+${t.r} 魂力`,'epic');
  }
  renderTasks();renderModalTasks();saveG();
  // Update dot — remove if all done
  const hasPending=G.tasks.some(x=>x.prog>=x.g&&!x.claimed);
  setTaskDot(hasPending);
}
function progressTask(type,amt=1){
  if(!G.tasks.length)return;
  G.tasks.filter(t=>t.t===type&&!t.claimed).forEach(t=>{
    const wasDone=t.prog>=t.g;
    t.prog=Math.min(t.g,t.prog+amt);
    const nowDone=t.prog>=t.g;
    if(!wasDone&&nowDone)setTaskDot(true); // newly completed
  });
  const c=$('daily-tasks');if(c)renderTasks();
  renderModalTasks();
  // Also progress hidden tasks
  progressHiddenTask(type,amt);
}
function updateCultUI(){
  const ci=document.getElementById('cult-cnt'),ei=document.getElementById('expl-cnt');
  if(ci)ci.textContent=`${G.cultCount}/10`;if(ei)ei.textContent=`${G.explCount}/10`;
  const bc=document.getElementById('btn-cult'),be=document.getElementById('btn-expl');
  if(bc){bc.className='cw-btn cult-b'+(G.cultCount>=10?' dis':'');}
  if(be){be.className='cw-btn expl-b'+(G.explCount>=10?' dis':'');}
  // Progress bars — new ids same, just update width and text
  const it=document.getElementById('idle-txt');if(it)it.textContent=G.idleEarned+'/5000';
  const ib=document.getElementById('idle-bar');if(ib)ib.style.width=Math.min(100,G.idleEarned/50)+'%';
  const et=document.getElementById('expl-txt');if(et)et.textContent=G.explEarned+'/5000';
  const eb=document.getElementById('expl-bar');if(eb)eb.style.width=Math.min(100,G.explEarned/50)+'%';
  // Modal elements
  const cim=document.querySelector('.cult-cnt-m');if(cim)cim.textContent=G.cultCount+'/10';
  const eim=document.querySelector('.expl-cnt-m');if(eim)eim.textContent=G.explCount+'/10';
  const itm=document.querySelector('.idle-txt-m');if(itm)itm.textContent=G.idleEarned+'/5000';
  const etm=document.querySelector('.expl-txt-m');if(etm)etm.textContent=G.explEarned+'/5000';
  const ibm=document.querySelector('.idle-bar-m');if(ibm)ibm.style.width=Math.min(100,G.idleEarned/50)+'%';
  const ebm=document.querySelector('.expl-bar-m');if(ebm)ebm.style.width=Math.min(100,G.explEarned/50)+'%';
  // Init geo on first call
  if(!_cwGeoRaf)initCwGeo();
}
function cultivate(){
  if(G.cultCount>=10){notify('今日修炼已达上限(10次)','normal');return;}
  G.cultCount++;
  if(G.idleEarned<1000){const a=Math.min(200,1000-G.idleEarned);G.idleEarned+=a;addSP(a,'修炼');}
  else notify('今日挂机魂力已满','normal');
  addExp(45);progressTask('cultivate');progressTask('earn',200);
  grantActivityDew('cultivate');
  if(Math.random()<0.025){addSP(1000,'修炼奇遇×5');notify('✨ 修炼奇遇！5倍魂力！','legend');}

  updateCultUI();saveG();
}
function explore(){
  if(G.explCount>=10){notify('今日探索已达上限(10次)','normal');return;}
  G.explCount++;
  if(G.explEarned<5000){const a=Math.min(500,5000-G.explEarned);G.explEarned+=a;addSP(a,'探索');}
  else notify('今日探索魂力已满','normal');
  addExp(85);progressTask('explore');progressTask('earn',500);
  grantActivityDew('explore');
  if(Math.random()<0.12){const b=['遗迹+200','魂兽+300','灵矿+500','秘洞+800'];const e=pick(b);const v=parseInt(e.match(/\d+/)?.[0]||200);addSP(v,null);notify(`🌲 ${e}魂力！`,'epic');}
  if(Math.random()<0.1){const h=pick(HERBS);addHerbToBag(h);notify(`🌿 探索发现：${h.n}！`,'epic');progressTask('herb');}
  if(Math.random()<0.12){const r=RESOURCES[ri(0,5)];addResourceToBag(r);notify(`📦 发现资源：${r.n}！`,'normal');progressTask('resource');}
  updateCultUI();saveG();renderBag();
}
function unlockHiddenTask(){}
function claimHidden(){}

// ══════════════════════════════════════════════════
//  BAG
// ══════════════════════════════════════════════════
// ── Shared bag render helper (v9) ──
function _bagItemHtml(it){
  let ico,nm,col='var(--dim)';
  if(it.type==='ring'){ico='⭕';nm=it.data.n;col=it.data.c;}
  else if(it.type==='bone'){ico=it.data.i||'🦴';nm=it.data.n;col='#fbbf24';}
  else if(it.type==='artifact'){ico=it.data.i;nm=it.data.n;col='var(--legend)';}
  else if(it.type==='herb'){ico=it.data.i;nm=it.data.n;col=it.data.c;}
  else if(it.type==='resource'){ico=it.data.i;nm=it.data.n;col=it.data.c;}
  else if(it.type==='ticket'){ico=it.data.i||'🎟️';nm=it.data.n;col=it.data.c||'#9ca3af';}
  else if(it.type==='title'){ico='👑';nm=it.data?.n||it.data;col=it.data?.c||'var(--divine)';}
  else{ico=it.data?.i||'📦';nm=it.data?.n||it.type;col=it.data?.c||'var(--dim)';}
  return`<div class="bag-item" onclick="openBagItem('${it.id||it.data?.id}','${it.type}')">
    <div class="bi">${ico}</div>
    <div class="bn" style="color:${col}">${nm}</div>
    ${it.count>1?`<div class="bc">${it.count}</div>`:''}
  </div>`;
}
function _renderBagGrid(gridId,filter){
  const c=$(gridId);if(!c)return;
  let items=G.bag;
  if(filter==='other')items=items.filter(it=>bagIsOther(it));
  else if(filter&&filter!=='all')items=items.filter(i=>i.type===filter);
  if(!items.length){c.innerHTML='<div style="grid-column:span 4" class="empty-st"><div class="ei">🎒</div><div class="em">此分类为空</div></div>';return;}
  c.innerHTML=items.map(it=>_bagItemHtml(it)).join('');
}
function fBag(f,el){
  curBagFilter=f;
  document.querySelectorAll('.btab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');renderBag();
}
function bagIsOther(it){
  return!['ring','bone','artifact','herb','resource','ticket','title'].includes(it.type);
}
function renderBag(){_renderBagGrid('bag-grid',curBagFilter);}
function renderBagOv(){_renderBagGrid('bag-grid-ov',curBagFilter);}
function openBagItem(id,type){
  const it=G.bag.find(i=>(i.id==id)||(i.data?.id==id));
  if(!it)return;
  let html='';
  if(type==='ring'){
    html=`<div class="m-title" style="color:${it.data.c}">⭕ ${it.data.n}</div>
      <div class="m-sub">魂环 · 数量: ${it.count}</div>
      <div class="m-ag" style="margin-bottom:11px">
        <div class="m-at"><div class="m-an">年份</div><div class="m-av" style="color:${it.data.c};font-size:12px">${it.data.n}</div></div>
        <div class="m-at"><div class="m-an">战力</div><div class="m-av">+${it.data.pw||0}</div></div>
        <div class="m-at" style="grid-column:span 2"><div class="m-an">魂技</div><div class="m-av" style="font-size:11px">${it.data.sk||it.data.skill||'--'}</div></div>
        ${it.data.n==='不可估量'?`<div class="m-at" style="grid-column:span 2"><div class="m-an">特殊</div><div class="m-av" style="font-size:10px;color:var(--rUnk)">装配时可触发质变魂技</div></div>`:''}
      </div>
      <div class="m-acts">
        <div class="m-btn ok" onclick="openAssignRing();cModal(event)">装配武魂</div>
        <div class="m-btn grn" onclick="openFusWithRing('${it.data?.id||it.id}');cModal(event)">融合</div>
        <div class="m-btn bad" onclick="dropItem('${it.id||id}');cModal(event)">丢弃</div>
      </div>`;
  }else if(type==='bone'){
    html=`<div class="m-title">🦴 ${it.data.n}</div>
      <div class="m-sub">${it.data.ringYear||'魂骨'}</div>
      <div class="m-ag" style="margin-bottom:11px">
        <div class="m-at"><div class="m-an">战力</div><div class="m-av">+${it.data.pw||0}</div></div>
        <div class="m-at"><div class="m-an">部位</div><div class="m-av" style="font-size:11px">${it.data.s||'--'}</div></div>
        ${it.data.bonus?`<div class="m-at" style="grid-column:span 2"><div class="m-an">增益效果</div><div class="m-av" style="font-size:11px;color:var(--gold)">${it.data.bonus}</div></div>`:''}
        ${it.data.special?`<div class="m-at" style="grid-column:span 2"><div class="m-an">特殊效果</div><div class="m-av" style="font-size:11px;color:var(--hc)">${it.data.special}</div></div>`:''}
      </div>
      <div class="m-acts">
        <div class="m-btn ok" onclick="openBonePanel();cModal(event)">管理装备</div>
        <div class="m-btn bad" onclick="dropItem('${it.id||id}');cModal(event)">丢弃</div>
      </div>`;
  }else if(type==='herb'){
    html=`<div class="m-title" style="color:${it.data.c}">${it.data.i} ${it.data.n}</div>
      <div class="m-sub">药草 · 数量: ${it.count}</div>
      <div style="font-size:11px;color:var(--dim);text-align:center;margin:9px 0;line-height:1.7">${it.data.d}</div>
      <div class="m-ag" style="margin-bottom:11px">
        <div class="m-at"><div class="m-an">融合成功率加成</div><div class="m-av">+${it.data.fb?.s||0}%</div></div>
        <div class="m-at"><div class="m-an">质变概率加成</div><div class="m-av">+${it.data.fb?.m||0}%</div></div>
      </div>
      <div class="m-acts">
        ${it.data.e!=='fuse'?`<div class="m-btn ok" onclick="useHerb('${it.data.id||it.id}');cModal(event)">使用</div>`:''}
        <div class="m-btn grn" onclick="openFusWithHerb('${it.data.id||it.id}');cModal(event)">用于融合</div>
        <div class="m-btn bad" onclick="dropItem('${it.id||id}');cModal(event)">丢弃</div>
      </div>`;
  }else if(type==='artifact'){
    html=`<div class="m-title">${it.data.i} ${it.data.n}</div>
      <div class="m-sub" style="color:var(--legend)">神器</div>
      <div style="font-size:11px;color:var(--dim);text-align:center;margin:9px 0">${it.data.d}</div>
      <div class="m-ag" style="margin-bottom:11px">
        <div class="m-at"><div class="m-an">战力</div><div class="m-av">+${it.data.pw}</div></div>
        <div class="m-at"><div class="m-an">增益</div><div class="m-av" style="font-size:11px">${it.data.bonus||'-'}</div></div>
      </div>
      <div class="m-acts">
        <div class="m-btn ok" onclick="equipArt('${it.data.id}');cModal(event)">穿戴</div>
        <div class="m-btn bad" onclick="dropItem('${it.id||id}');cModal(event)">丢弃</div>
      </div>`;
  }else if(type==='resource'){
    html=`<div class="m-title" style="color:${it.data.c}">${it.data.i} ${it.data.n}</div>
      <div class="m-sub">资源 · 数量: ${it.count}</div>
      <div style="font-size:11px;color:var(--dim);text-align:center;margin:9px 0;line-height:1.7">${it.data.d}</div>
      <div class="m-acts">
        <div class="m-btn ok" onclick="useResource('${it.data.id||it.id}');cModal(event)">使用</div>
        <div class="m-btn bad" onclick="dropItem('${it.id||id}');cModal(event)">丢弃</div>
      </div>`;
  }else if(type==='ticket'){
    const tk=it.data;
    const poolName=poolTicketName(tk.pool);
    const isTen=tk.ten===true;
    const hasSingle=!isTen&&it.count>=1;
    const hasTen=it.count>=10;
    const poolColor=tk.c||'#9ca3af';
    const poolIdx=poolTicketIdx(tk.pool);
    html=`<div class="m-title" style="color:${poolColor}">${tk.i||'🎟️'} ${tk.n}</div>
      <div class="m-sub">抽奖券 · 剩余: <span style="color:${poolColor};font-weight:700">${it.count}张</span></div>
      <div style="font-size:11px;color:var(--dim);text-align:center;margin:10px 0;line-height:1.8">
        ${isTen
          ?'十连专属券，<span style="color:'+poolColor+'">'+poolName+'</span> 十连一次，免费使用。'
          :'普通抽奖券，可用于<span style="color:'+poolColor+'">'+poolName+'</span>，单抽或积攒10张十连。'
        }
      </div>
      <div class="m-ag" style="margin-bottom:12px">
        <div class="m-at"><div class="m-an">奖池费用</div><div class="m-av" style="font-size:12px">${LOT[poolIdx].cost} 魂力/次</div></div>
        <div class="m-at"><div class="m-an">当前节省</div><div class="m-av" style="font-size:12px;color:var(--hc)">${isTen?LOT[poolIdx].cost*10:LOT[poolIdx].cost} 魂力</div></div>
      </div>
      <div class="m-acts" style="flex-wrap:wrap;gap:6px">
        ${isTen||hasSingle?`<div class="t-btn t-btn-ok" onclick="useTicket('${it.id||it.data?.id}',1);cModal(event)">🎟️ ${isTen?'十连使用':'单次使用'}</div>`:''}
        ${!isTen&&hasTen?`<div class="t-btn t-btn-ten" onclick="useTicket('${it.id||it.data?.id}',10);cModal(event)">✨ 十连使用 (×10张)</div>`:''}
        ${!isTen&&!hasTen&&it.count>0?`<div style="font-size:10px;color:var(--dim);text-align:center;padding:6px 0;grid-column:span 2">还需积攒 ${10-it.count} 张可进行十连</div>`:''}
        <div class="t-btn t-btn-bad" onclick="dropItem('${it.id||id}');cModal(event)">丢弃</div>
      </div>`;
  }else if(type==='title'){
    const t=it.data;
    const isEquipped=G.equippedTitle&&G.equippedTitle.n===t.n;
    html=`<div class="m-title" style="color:${t.c||'var(--gl)'}">👑 ${t.n||t}</div>
      <div class="m-sub">称号${isEquipped?' · ✅ 已装备':''}</div>
      <div style="font-size:12px;color:var(--dim);text-align:center;margin:10px 0;line-height:1.7">${t.d||''}</div>
      ${t.pw?`<div class="m-ag" style="margin-bottom:10px">
        <div class="m-at"><div class="m-an">战力加成</div><div class="m-av">+${t.pw}</div></div>
        <div class="m-at"><div class="m-an">特殊属性</div><div class="m-av" style="font-size:10px">${t.bonus||'-'}</div></div>
      </div>`:''}
      <div class="m-acts">
        ${isEquipped
          ?`<div class="m-btn bad" onclick="unequipTitle();cModal(event)">卸下称号</div>`
          :`<div class="m-btn ok" onclick="equipTitle('${t.n}');cModal(event)">装备称号</div>`
        }
      </div>`;
  }
  openModal(html);
}
function equipTitle(name){
  const t=G.titles.find(x=>x.n===name);if(!t)return;
  G.equippedTitle=t;
  notify('👑 称号「'+t.n+'」已装备！战力+'+t.pw,'divine');
  afterAction(['soul','bag']);
  $remCls('modal','show');
}
function unequipTitle(){
  if(!G.equippedTitle)return;
  notify('称号「'+G.equippedTitle.n+'」已卸下','normal');
  G.equippedTitle=null;
  afterAction(['soul','bag']);
  $remCls('modal','show');
}
function openTitleSelect(){
  if(!G.titles.length){notify('暂无称号','normal');return;}
  const rows=G.titles.map(t=>{
    const isEq=G.equippedTitle&&G.equippedTitle.n===t.n;
    return`<div style="display:flex;align-items:center;gap:9px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">
      <span style="font-size:16px">👑</span>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:700;color:${t.c||'var(--gl)'}">${t.n}</div>
        <div style="font-size:10px;color:var(--dim)">${t.d||''}</div>
        <div style="font-size:10px;color:var(--gold);margin-top:2px">战力+${t.pw||0} · ${t.bonus||''}</div>
      </div>
      <div>
        ${isEq
          ?`<div class="m-btn bad" style="padding:4px 10px;font-size:10px" onclick="unequipTitle()">卸下</div>`
          :`<div class="m-btn ok" style="padding:4px 10px;font-size:10px" onclick="equipTitle('${t.n}')">装备</div>`
        }
      </div>
    </div>`;
  }).join('');
  openModal(`<div class="m-title">👑 称号选择</div>
    <div class="m-sub">共 ${G.titles.length} 个称号 · 当前: ${G.equippedTitle?G.equippedTitle.n:'未装备'}</div>
    <div style="margin-top:8px">${rows}</div>`);
}
function useHerb(id){
  const it=G.bag.find(i=>(i.data?.id==id)||(i.id==id));
  if(!it||it.type!=='herb')return;
  const h=it.data;
  if(h.e==='sp'){addSP(h.v,`使用${h.n}`);}
  else if(h.e==='exp'){addExp(h.v);notify(`🌿 ${h.n}：+${h.v} 经验`,'epic');}
  else if(h.e==='luck'){G.luckBonus=(G.luckBonus||0)+h.v;notify(`🌿 ${h.n}：幸运+${h.v}`,'epic');}
  else if(h.e==='power'){G.extraPower=(G.extraPower||0)+h.v;notify(`🌿 ${h.n}：战力+${h.v}！`,'legend');updateHUD();}
  it.count--;if(it.count<=0)G.bag=G.bag.filter(i=>(i.data?.id!=id)&&(i.id!=id));
  saveG();renderBag();
}
function useResource(id){
  const it=G.bag.find(i=>(i.data?.id==id)||(i.id==id));
  if(!it||it.type!=='resource')return;
  const r=it.data;
  if(r.e==='sp'){addSP(r.v,r.n);}
  else if(r.e==='exp'){addExp(r.v);notify(`📦 ${r.n}：+${r.v} 经验`,'epic');}
  else if(r.e==='luck'){G.luckBonus=(G.luckBonus||0)+r.v;notify(`📦 ${r.n}：幸运+${r.v}`,'epic');}
  else if(r.e==='power'){G.extraPower=(G.extraPower||0)+r.v;notify(`📦 ${r.n}：战力+${r.v}！`,'legend');updateHUD();}
  else if(r.e==='all'){G.extraPower=(G.extraPower||0)+500;notify(`📦 ${r.n}：全属性+5%·战力+500！`,'divine');spawnBurst('#00ffff',60);updateHUD();}
  else{notify(`📦 ${r.n} 已使用`,'normal');}
  it.count--;if(it.count<=0)G.bag=G.bag.filter(i=>(i.data?.id!=id)&&(i.id!=id));
  saveG();renderBag();
}
function dropItem(id){
  G.bag=G.bag.filter(i=>(i.id!=id)&&(i.data?.id!=id));
  notify('已丢弃','normal');saveG();renderBag();
}
function useTicket(id,useCount){
  const it=G.bag.find(i=>(i.id==id)||(i.data?.id==id));
  if(!it||it.type!=='ticket')return;
  const pool=it.data.pool;
  const isTen=it.data.ten===true;
  // useCount: 1 = use 1 ticket (1 or 10 pulls depending on ticket type)
  //           10 = use 10 single tickets for a 10-pull
  const ticketsToUse=useCount||1;
  const times=(isTen||ticketsToUse>=10)?10:1;
  const actualUse=isTen?1:Math.min(ticketsToUse,it.count);
  it.count-=actualUse;
  if(it.count<=0)G.bag=G.bag.filter(i=>i!==it);
  const cfg=LOT[poolTicketIdx(pool)];
  doLotInternal(cfg,poolTicketIdx(pool),times,true);
  afterAction(['bag']);
}

// ──── ARTIFACT SELF-SELECT ────
function openArtSelect(){
  const normalArts=ARTS.filter(a=>!a.extreme);
  const html=`<div class="m-title" style="color:var(--legend)">⚔️ 自选神器</div>
    <div class="m-sub">从以下神器中选择一件</div>
    <div style="display:flex;flex-direction:column;gap:7px;margin-top:10px">
      ${normalArts.map(a=>`<div class="art-row" style="cursor:pointer" onclick="claimArtSelect('${a.id}')">
        <div class="art-i">${a.i}</div>
        <div class="art-inf">
          <div class="art-nm">${a.n}</div>
          <div class="art-d">${a.d}</div>
          <div class="art-pw">战力 ×${a.mul} = +${a.pw*a.mul} · ${a.bonus}</div>
        </div>
        <div class="art-btn">选择</div>
      </div>`).join('')}
    </div>`;
  openModal(html);
}
function claimArtSelect(id){
  const a=ARTS.find(x=>x.id===id);if(!a)return;
  G.bag.push({type:'artifact',data:a,count:1,id:Date.now()});
  G.stats.arts++;
  notify('⚔️ 自选神器：'+a.n+'！战力×'+a.mul,'legend');
  const mo=document.getElementById('modal');if(mo)mo.classList.remove('show');
  renderBag();saveG();
}

// ──── SPECIAL PATHS ────
const SPECIAL_PATHS=[
  {id:"p_chaos",n:"混沌之路",i:"🌀",col:"#c084fc",req:"混沌属性武魂",
   desc:"游走于秩序规则之外，通过混沌试炼获取混沌之力。",
   unlock:()=>G.soul&&((G.soul.attrs&&G.soul.attrs.some(a=>a.includes('混沌')))||(G.soul.name&&G.soul.name.includes('混沌'))||['apex','hc','ha','twin','triple'].includes(G.soul.quality)),
   trials:[
    {n:"混沌感知",d:"感受混沌流动，让思维进入无序状态。",rew:"经验+3000,战力+500",cost:600},
    {n:"混沌共鸣",d:"与混沌能量产生共鸣，获取混沌初始之力。",rew:"经验+6000,战力+1200,混沌晶核×3",cost:1000},
    {n:"混沌法则触碰",d:"主动触碰混沌法则边界，承受混沌冲击。",rew:"经验+12000,战力+3000,特殊属性增幅",cost:1500},
    {n:"混沌化身",d:"将混沌之力融入武魂，成为混沌的代言人。",rew:"经验+25000,战力+8000,混沌魂骨",cost:2500},
   ]},
  {id:"p_hidden",n:"隐藏之路",i:"🔮",col:"#10b981",req:"隐藏武魂",
   desc:"隐藏武魂持有者独有的神秘道路，通向不为人知的力量之源。",
   unlock:()=>G.soul&&(G.soul.divine||['hc','ha'].includes(G.soul.quality)||(['apex'].includes(G.soul.quality)&&G.soul.secondAwakened)),
   trials:[
    {n:"隐匿修炼",d:"在无人之境独自修炼，磨砺隐藏本能。",rew:"经验+4000,战力+600",cost:500},
    {n:"影中影",d:"在自身阴影中寻找另一个自我，实现意识分裂。",rew:"经验+8000,战力+1500,药草×5",cost:900},
    {n:"秘境共鸣",d:"与隐藏秘境产生共鸣，获取秘境之力。",rew:"经验+15000,战力+4000,特殊魂骨",cost:1500},
    {n:"隐藏真身",d:"武魂真身完全隐藏，达到无中生有的境界。",rew:"经验+30000,战力+10000,超稀有称号",cost:2800},
   ]},
  {id:"p_above",n:"神之上",i:"👁️",col:"#ffd700",req:"神级武魂(divine)或顶级品质",
   desc:"超越神级存在本身，窥探凌驾于神之上的力量。",
   unlock:()=>G.soul&&(G.soul.divine||G.soul.quality==='apex'||G.soul.quality==='ha'||G.soul.quality==='twin'||G.soul.quality==='triple'),
   trials:[
    {n:"神性淬炼",d:"将神力在体内反复淬炼，使之纯粹化。",rew:"经验+8000,战力+1500",cost:1000},
    {n:"超神领域",d:"展开超越神级的领域，压制所有神域。",rew:"经验+15000,战力+4000,神赐魂环",cost:2000},
    {n:"神之律法",d:"理解并掌握神之律法，成为律法的执行者。",rew:"经验+30000,战力+9000,律法神器",cost:3000},
    {n:"神格觉醒",d:"真正的神格从武魂中苏醒，超越一切神祇。",rew:"经验+60000,战力+25000,永恒之主称号",cost:5000},
   ]},
  {id:"p_plane",n:"位面规则",i:"⚖️",col:"#67e8f9",req:"宇宙感知(通关原初之地)",
   unlock:()=>G.titles&&G.titles.some(t=>t.n==='原初触碰者'),
   desc:"掌控位面规则，成为多个位面的共同主宰。",
   trials:[
    {n:"位面感知",d:"感知不同位面的规则差异，理解位面本质。",rew:"经验+10000,战力+2000",cost:1200},
    {n:"规则折叠",d:"将位面规则折叠压缩，在缝隙中穿行。",rew:"经验+20000,战力+5000,宇宙尘埃×2",cost:2000},
    {n:"规则重写",d:"尝试重写局部位面的规则，改变其运作逻辑。",rew:"经验+40000,战力+12000,神力液晶×3",cost:3500},
    {n:"位面主宰",d:"宣告自身为位面规则本身，永恒掌控位面秩序。",rew:"经验+80000,战力+30000,宇宙法则者称号",cost:6000},
   ]},
  {id:"p_you",n:"你",i:"∞",col:"#00ffff",req:"宇宙之核 或 武魂「初」",
   unlock:()=>G.cosmicOwned||(G.soul&&G.soul.isChu),
   desc:"超越一切分类与存在，成为你，成为宇宙本身。",
   trials:[
    {n:"自我认知",d:"认清自身的真实存在，剥离所有附加的身份。",rew:"经验+20000,战力+5000",cost:2000},
    {n:"虚实转换",d:"在虚无与实体之间任意切换，掌控存在形态。",rew:"经验+50000,战力+15000",cost:4000},
    {n:"定义超越",d:"超越所有已知定义，成为无法被定义的存在。",rew:"经验+100000,战力+50000",cost:8000},
    {n:"成为你",d:"你即是宇宙，宇宙即是你，一切归于统一。",rew:"战力+999999,全属性∞,超越一切称号",cost:15000},
   ]},
  {id:"p_godexam",n:"神位传承",i:"🙏",col:"#ffd700",req:"通关成神之路全部6关",
   unlock:()=>allGodTrialsCleared(),
   desc:"通关成神之路后，三位神祇召唤你，选择成为海神·天使神·修罗神之一。此路一经选择永不可更改。",
   trials:[
    {n:"海神·天使神·修罗神 三选一",d:"进入此道路选择神位。",rew:"成为神·战力+150000",cost:0},
   ]},
];
// ──── GOD EXAM DATA ────
const GOD_EXAMS=[
  {
    id:"exam_poseidon",n:"海神九考",i:"🌊",col:"#38bdf8",godName:"海神",godIcon:"🌊",
    godTitle:{n:"海神传人",c:"#38bdf8",d:"通过海神九考，被海神认可的唯一传人。",pw:50000,bonus:"水系无敌·命运之叉指引"},
    desc:"历代海神候选者必须通过的九项试炼，每一考皆是对灵魂的极致考验。",
    trials:[
      {n:"第一考·沧海感知",d:"感受大海的无尽深邃，让心灵与海洋共鸣。",rew:"经验+10000,战力+2000",cost:2000},
      {n:"第二考·海浪淬炼",d:"在无尽海浪冲击中锤炼肉身，感受水之力。",rew:"经验+15000,战力+3000",cost:2500},
      {n:"第三考·深渊凝视",d:"直视海底深渊，承受精神压迫而不崩溃。",rew:"经验+20000,战力+5000",cost:3000},
      {n:"第四考·命运之叉",d:"在两条截然不同的命运道路前，做出选择。",rew:"经验+25000,战力+8000",cost:3500},
      {n:"第五考·孤岛修炼",d:"独居孤岛百日，在孤独中积累神力。",rew:"经验+30000,战力+12000",cost:4000},
      {n:"第六考·海神圣光",d:"沐浴海神圣光，让神力渗透全身经脉。",rew:"经验+40000,战力+18000",cost:5000},
      {n:"第七考·命运长河",d:"在命运长河中逆流而上，寻找属于自己的位置。",rew:"经验+50000,战力+25000",cost:6000},
      {n:"第八考·神力觉醒",d:"海神之力在体内彻底觉醒，完成最后的淬炼。",rew:"经验+70000,战力+40000",cost:8000},
      {n:"第九考·成为海神",d:"最终试炼：成为新一任海神，承担守护大海的责任。",rew:"战力+100000,成为海神",cost:12000},
    ]
  },
  {
    id:"exam_angel",n:"天使神九考",i:"😇",col:"#fde68a",godName:"天使神",godIcon:"😇",
    godTitle:{n:"天使神传人",c:"#fde68a",d:"通过天使神九考，圣洁光明之力的唯一继承者。",pw:50000,bonus:"光明无敌·圣洁护盾永恒"},
    desc:"天使神传承的九项神圣试炼，光明与圣洁的极致考验。",
    trials:[
      {n:"第一考·圣光洗礼",d:"接受圣光的洗礼，净化心灵中一切黑暗念头。",rew:"经验+10000,战力+2000",cost:2000},
      {n:"第二考·天使之翼",d:"以意志为羽，展开内心的天使翅膀。",rew:"经验+15000,战力+3000",cost:2500},
      {n:"第三考·光明信仰",d:"在黑暗最深处保持对光明的绝对信仰。",rew:"经验+20000,战力+5000",cost:3000},
      {n:"第四考·圣洁之心",d:"以最纯粹的心灵直面世间所有诱惑与污浊。",rew:"经验+25000,战力+8000",cost:3500},
      {n:"第五考·神圣宣言",d:"向宇宙宣告自身的圣洁誓言，永不背叛光明。",rew:"经验+30000,战力+12000",cost:4000},
      {n:"第六考·光芒万丈",d:"以自身为光源，照耀方圆万里的黑暗。",rew:"经验+40000,战力+18000",cost:5000},
      {n:"第七考·天界之门",d:"触碰天界之门的门环，感受神界的震慑与召唤。",rew:"经验+50000,战力+25000",cost:6000},
      {n:"第八考·神力灌顶",d:"天使神将全部神力灌入体内，完成最后的神化。",rew:"经验+70000,战力+40000",cost:8000},
      {n:"第九考·成为天使神",d:"最终试炼：继承天使神神位，成为光明与圣洁的守护者。",rew:"战力+100000,成为天使神",cost:12000},
    ]
  },
  {
    id:"exam_asura",n:"修罗神九考",i:"⚔️",col:"#ef4444",godName:"修罗神",godIcon:"⚔️",
    godTitle:{n:"修罗神传人",c:"#ef4444",d:"通过修罗神九考，杀戮与力量的极致体现。",pw:50000,bonus:"杀戮无敌·修罗领域永恒"},
    desc:"修罗神留下的九项极限试炼，以杀戮与力量证明自身的资格。",
    trials:[
      {n:"第一考·杀意初现",d:"释放内心深处最原始的杀意，感受修罗之力的觉醒。",rew:"经验+10000,战力+2000",cost:2000},
      {n:"第二考·百战淬身",d:"以连续战斗锤炼肉身，承受极限痛苦而不退缩。",rew:"经验+15000,战力+3000",cost:2500},
      {n:"第三考·修罗领域",d:"展开修罗领域，在领域中感受绝对的杀戮之力。",rew:"经验+20000,战力+5000",cost:3000},
      {n:"第四考·无情之刃",d:"放下所有情感，成为最纯粹的战斗机器。",rew:"经验+25000,战力+8000",cost:3500},
      {n:"第五考·血战不休",d:"在不间断的血腥战斗中找到真正的自我。",rew:"经验+30000,战力+12000",cost:4000},
      {n:"第六考·杀戮之道",d:"领悟杀戮之道的真谛：杀戮并非目的，强大才是。",rew:"经验+40000,战力+18000",cost:5000},
      {n:"第七考·修罗之怒",d:"激发修罗神的愤怒之力，以怒火超越自身极限。",rew:"经验+50000,战力+25000",cost:6000},
      {n:"第八考·绝命一击",d:"以全部力量发出修罗神的绝命一击，证明自身价值。",rew:"经验+70000,战力+40000",cost:8000},
      {n:"第九考·成为修罗神",d:"最终试炼：继承修罗神神位，成为杀戮与战争的主宰。",rew:"战力+100000,成为修罗神",cost:12000},
    ]
  },
];

function allGodTrialsCleared(){
  return (G.godTrials||[]).every(t=>t.cleared);
}

function showGodExamSelect(){
  if(!allGodTrialsCleared()){notify('需要通关所有成神之路试炼！','normal');return;}
  if(G.godChoice){
    openGodExam(G.godChoice);return;
  }
  // Show selection modal
  const rows=GOD_EXAMS.map(ex=>`
    <div onclick="selectGodExam('${ex.id}')" style="background:linear-gradient(135deg,rgba(0,0,0,.4),rgba(0,0,0,.2));border:1.5px solid ${ex.col}50;border-radius:12px;padding:14px;margin-bottom:10px;cursor:pointer;transition:all .2s" onmouseenter="this.style.borderColor='${ex.col}'" onmouseleave="this.style.borderColor='${ex.col}50'">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div style="font-size:36px">${ex.i}</div>
        <div>
          <div style="font-family:'Ma Shan Zheng',serif;font-size:18px;color:${ex.col};letter-spacing:2px">${ex.n}</div>
          <div style="font-size:10px;color:var(--dim);margin-top:2px">${ex.desc.slice(0,30)}...</div>
        </div>
      </div>
      <div style="font-size:10px;color:${ex.col};background:${ex.col}15;border-radius:6px;padding:5px 9px;display:inline-block">
        ✨ 成为${ex.godName} · 战力+150000
      </div>
      <div style="font-size:9px;color:var(--apex);margin-top:6px">⚠️ 选择后不可更改</div>
    </div>`).join('');
  openModal(`<div class="m-title" style="color:#ffd700">🙏 神位传承</div>
    <div class="m-sub">选择你的神位道路，此选择永久不可逆</div>
    <div style="font-size:11px;color:var(--dim);text-align:center;margin:8px 0 14px;line-height:1.7">
      成神之路已完全打通。<br/>三位神祇正在等待继承者的选择。
    </div>
    ${rows}`);
}

function selectGodExam(examId){
  const ex=GOD_EXAMS.find(e=>e.id===examId);if(!ex)return;
  if(!confirm('确认选择「'+ex.n+'」？此选择永久不可更改！'))return;
  G.godChoice=examId;
  saveG();
  openModal('');
  notify('✨ 已选择'+ex.n+'！神位传承之路正式开启！','divine');
  spawnBurst(ex.col,100);
  openGodExam(examId);
}

function openGodExam(examId){
  const ex=GOD_EXAMS.find(e=>e.id===examId);if(!ex)return;
  const prog=(G.godExamProgress=G.godExamProgress||{})[examId]||0;
  const isComplete=prog>=ex.trials.length;
  const triH=ex.trials.map((t,i)=>{
    const cleared=i<prog;
    const canDo=i===prog&&!isComplete;
    return`<div class="trial-stage ${cleared?'cleared':canDo?'':'locked'}" onclick="${canDo?`doGodExam('${examId}',${i})`:''}">
      <div class="ts-ico">${cleared?'✅':canDo?ex.i:'🔒'}</div>
      <div class="ts-info">
        <div class="ts-name" style="color:${ex.col}">${t.n}</div>
        <div class="ts-desc">${t.d}</div>
        <div class="ts-rew">奖励: ${t.rew}</div>
        <div style="font-size:9px;color:var(--dim);margin-top:2px">消耗: ${t.cost} 魂力</div>
      </div>
      ${cleared?`<span class="ts-badge clear">已通</span>`:canDo?`<span class="ts-badge go" style="border-color:${ex.col}60;color:${ex.col}">挑战</span>`:`<span class="ts-badge locked">🔒</span>`}
    </div>`;
  }).join('');
  openModal(`
    <div class="m-title" style="color:${ex.col}">${ex.i} ${ex.n}</div>
    <div class="m-sub">神位传承 · 进度 ${prog}/${ex.trials.length}${isComplete?' · ✅ 已成神':''}</div>
    <div style="font-size:11px;color:var(--dim);text-align:center;margin-bottom:12px;line-height:1.7">${ex.desc}</div>
    ${isComplete?`<div style="text-align:center;padding:14px;background:${ex.col}15;border:1px solid ${ex.col}40;border-radius:10px;margin-bottom:12px">
      <div style="font-size:40px;margin-bottom:8px">${ex.i}</div>
      <div style="font-family:'Ma Shan Zheng',serif;font-size:20px;color:${ex.col};letter-spacing:3px">你已成为${ex.godName}</div>
    </div>`:''}
    <div class="trial-stages">${triH}</div>`);
}

function doGodExam(examId,idx){
  const ex=GOD_EXAMS.find(e=>e.id===examId);if(!ex)return;
  const t=ex.trials[idx];if(!t)return;
  if(G.sp<t.cost){notify(`需要 ${t.cost} 魂力`,'normal');return;}
  G.sp-=t.cost;
  const pw=calcPower();
  const rate=Math.min(0.92,0.4+pw/200000*0.5);
  if(Math.random()<Math.max(0.2,rate)){
    (G.godExamProgress=G.godExamProgress||{})[examId]=((G.godExamProgress||{})[examId]||0)+1;
    const expM=t.rew.match(/经验\+(\d+)/);const pwM=t.rew.match(/战力\+(\d+)/);
    if(expM)addExp(parseInt(expM[1]));
    if(pwM)G.extraPower+=parseInt(pwM[1]);
    const isLast=idx===ex.trials.length-1;
    if(isLast){
      // Become god
      G.godType=ex.id;
      G.soul.name=ex.godName;G.soul.icon=ex.i;G.soul.isGod=true;G.soul.godType=ex.id;
      G.soul.quality='triple';G.soul.divine=true;
      G.soul.attrs=[ex.godName+'·神格','神力觉醒','超越一切','∞战力'];
      G.extraPower+=100000;
      if(!G.titles.find(tt=>tt.n===ex.godTitle.n))G.titles.push(ex.godTitle);
      G.equippedTitle=ex.godTitle;
      notify(`🙏 恭喜！你已正式成为${ex.godName}！神位传承完成！`,'cosmic');
      spawnBurst(ex.col,300);
      setTimeout(()=>spawnBurst('#ffd700',200),500);
    } else {
      notify(`✨ ${t.n} 通关！`,'divine');spawnBurst(ex.col,60);
    }
    updateHUD();saveG();openGodExam(examId);renderSoulPage();
  } else {
    notify(`💔 ${t.n} 失败... 继续修炼！`,'normal');
    updateHUD();saveG();
  }
}

function renderSpecialPaths(){
  const grid=$('special-paths-grid');if(!grid)return;
  if(!G.soul){grid.innerHTML='<div style="grid-column:span 2;font-size:11px;color:var(--dim);text-align:center;padding:12px">觉醒武魂后解锁特殊道路</div>';return;}
  // Lv.25 gate for preview
  if(G.level<25&&!G.unlockedSystems?.specialPathPreview){
    grid.innerHTML=`<div style="grid-column:span 2;text-align:center;padding:16px 8px">
      <div style="font-size:32px;margin-bottom:8px;filter:grayscale(1);opacity:.4">🌟</div>
      <div style="font-size:11px;color:var(--dim)">特殊道路 Lv.25 解锁</div>
      <div style="font-size:10px;color:var(--apex);margin-top:4px">当前 Lv.${G.level}，还需 ${25-G.level} 级</div>
    </div>`;
    return;
  }
  grid.innerHTML=SPECIAL_PATHS.map(path=>{
    const unlocked=path.unlock();
    const cleared=(G.specialPathProgress||{})[path.id]||0;
    const totalTrials=path.trials.length;
    return`<div class="pcard" style="border-color:${unlocked?path.col+'60':'var(--bdr)'};background:${unlocked?'rgba(0,0,0,.3)':'var(--bgc)'};opacity:${unlocked?1:.5}" onclick="${unlocked?`openSpecialPath('${path.id}')`:''}" style="cursor:${unlocked?'pointer':'not-allowed'}">
      <div class="pc-i">${path.i}</div>
      <div class="pc-n" style="color:${unlocked?path.col:'var(--dim)'}">${path.n}</div>
      <div class="pc-d">${path.desc.slice(0,30)}...</div>
      <div class="pc-r">${unlocked?`进度: ${cleared}/${totalTrials}`:`需要: ${path.req}`}</div>
    </div>`;
  }).join('');
}

function openSpecialPath(pathId){
  if(pathId==='p_godexam'){showGodExamSelect();return;}
  const path=SPECIAL_PATHS.find(p=>p.id===pathId);if(!path)return;
  if(!path.unlock()){notify(`需要满足条件: ${path.req}`,'normal');return;}
  const prog=(G.specialPathProgress=G.specialPathProgress||{});
  const cleared=prog[pathId]||0;
  const trialsH=path.trials.map((t,i)=>{
    const isCleared=i<cleared;
    const canDo=i===cleared;
    return`<div class="trial-stage ${isCleared?'cleared':canDo?'':'locked'}" onclick="${canDo?`doSpecialTrial('${pathId}',${i})`:''}">
      <div class="ts-ico">${isCleared?'✅':canDo?path.i:'🔒'}</div>
      <div class="ts-info">
        <div class="ts-name" style="color:${path.col}">${t.n}</div>
        <div class="ts-desc">${t.d}</div>
        <div class="ts-rew">奖励: ${t.rew}</div>
      </div>
      ${isCleared?`<span class="ts-badge clear">已通</span>`:canDo?`<span class="ts-badge go" style="border-color:${path.col}60;color:${path.col}">挑战</span>`:`<span class="ts-badge locked">🔒</span>`}
    </div>`;
  }).join('');
  openModal(`
    <div class="m-title" style="color:${path.col}">${path.i} ${path.n}</div>
    <div class="m-sub">${path.req} · 进度 ${cleared}/${path.trials.length}</div>
    <div style="font-size:11px;color:var(--dim);text-align:center;margin-bottom:12px;line-height:1.7">${path.desc}</div>
    <div class="trial-stages">${trialsH}</div>`);
}

function doSpecialTrial(pathId,idx){
  const path=SPECIAL_PATHS.find(p=>p.id===pathId);if(!path)return;
  const t=path.trials[idx];if(!t)return;
  if(G.sp<t.cost){notify(`需要 ${t.cost} 魂力`,'normal');return;}
  G.sp-=t.cost;
  const pw=calcPower();
  const rate=Math.min(0.9,0.35+pw/50000*0.4);
  if(Math.random()<Math.max(0.15,rate)){
    (G.specialPathProgress=G.specialPathProgress||{})[pathId]=(G.specialPathProgress[pathId]||0)+1;
    // Parse rewards
    const expM=t.rew.match(/经验\+(\d+)/);const pwM=t.rew.match(/战力\+(\d+)/);
    if(expM)addExp(parseInt(expM[1]));
    if(pwM)G.extraPower+=(parseInt(pwM[1]));
    if(t.rew.includes('称号')){const pool=t.rew.includes('永恒')||t.rew.includes('超越')||t.rew.includes('主宰')?'legend':'advanced';awardTitle(pool,null);}
    if(t.rew.includes('混沌晶核')){for(let i=0;i<3;i++)addResourceToBag(RESOURCES[5]);}
    if(t.rew.includes('宇宙尘埃')){for(let i=0;i<2;i++)addResourceToBag(RESOURCES[7]);}
    if(t.rew.includes('神力液晶')){for(let i=0;i<3;i++)addResourceToBag(RESOURCES[6]);}
    if(t.rew.includes('药草')){for(let i=0;i<5;i++)addHerbToBag(pick(HERBS));}
    if(t.rew.includes('神赐魂环')){const tier=RT[6];G.bag.push({type:'ring',data:{id:Date.now(),n:tier.n,y:tier.y,c:tier.c,sk:pick(tier.sk),pw:tier.pw,tier:tier.n},count:1,id:Date.now()});}
    if(t.rew.includes('魂骨')){const sb=pick(SPECIAL_BONES);G.bag.push({type:'bone',data:{...sb,id:Date.now()},count:1,id:Date.now()});}
    if(t.rew.includes('神器')){G.bag.push({type:'artifact',data:pick(ARTS.filter(a=>!a.extreme)),count:1,id:Date.now()});}
    // 0.1% god bone drop in special trials
    if(Math.random()<0.001){
      const godBones=[].concat(...Object.values(BONE_POOL).map(pool=>pool.filter(b=>b.god)));
      if(godBones.length){
        const gb=pick(godBones);
        G.bag.push({type:'bone',data:{...gb,pw:1000000,id:Date.now()+1},count:1,id:Date.now()+2});
        notify('🙏！！神赐魂骨降临！'+gb.n,'cosmic');spawnBurst('#ffd700',200);G.stats.bones++;
      }
    }
    notify(`🏆 ${t.n} 通关！${t.rew}`,'divine');spawnBurst(path.col,70);
    updateHUD();saveG();openSpecialPath(pathId);
  }else{
    notify(`💔 ${t.n} 失败... 继续修炼！`,'normal');
    updateHUD();saveG();
  }
}
function openModal(html, title){
  if(title){
    $set('modal-title','innerHTML',title);
  } else {
    $set('modal-title','innerHTML','');
  }
  $set('modal-body','innerHTML',html);
  $addCls('modal','show');
}
function cModal(e){
  const mo=$('modal');if(!mo)return;
  if(!e||e.target===mo)mo.classList.remove('show');
}
function cRSM(){$style('RSM','display','none');}

// ══════════════════════════════════════════════════
//  RING FUSION
// ══════════════════════════════════════════════════
function openFusWithRing(rid){
  fusState={a:null,b:null,herbs:[]};
  const it=G.bag.find(i=>(i.data?.id==rid)||(i.id==rid));
  if(it){fusState.a=it;updFusCircle('a',it);}
  showFusPage();
}
function openFusWithHerb(hid){
  fusState={a:null,b:null,herbs:[]};
  const it=G.bag.find(i=>(i.data?.id==hid)||(i.id==hid));
  if(it){fusState.herbs=[it];updFusHSlot(0,it);}
  showFusPage();
}
function showFusPage(){
  if(!G.unlockedSystems?.fusion&&G.level<20){
    notify('⚗️ 魂环融合在 Lv.20 解锁！当前：Lv.'+G.level,'normal');return;
  }
  document.getElementById('page-bag').classList.remove('active');
  const fp=$('PF');fp.style.display='block';fp.classList.add('active');
  updFusRates();
}
function closeFusion(){
  $('PF').style.display='none';$('PF').classList.remove('active');
  document.getElementById('page-bag').classList.add('active');
  fusState={a:null,b:null,herbs:[]};
  ['a','b'].forEach(s=>{
    const i=document.getElementById(`fc-${s}i`),n=document.getElementById(`fc-${s}n`),c=document.getElementById(`fc-${s}`);
    if(i)i.textContent='⭕';if(n)n.textContent=`选择${s.toUpperCase()}`;if(c)c.classList.remove('filled');
  });
  [0,1,2].forEach(i=>{const sl=document.getElementById(`fhs-${i}`);if(sl){sl.innerHTML='<span>+</span>';sl.classList.remove('filled');}});
  $('fc-res').innerHTML='<div style="font-size:22px">✨</div><div style="font-size:8px;margin-top:2px;text-align:center;color:var(--dim)">结果</div>';
  renderBag();
}
function selFR(slot){
  fusSelTgt=slot;
  const rings=G.bag.filter(i=>i.type==='ring');
  if(!rings.length){notify('背包中无魂环','normal');return;}
  $set('rsm-list','innerHTML',rings.map(r=>`
    <div class="ring-item" onclick="pickFR('${r.data?.id||r.id}')">
      <div class="ring-orb" style="background:${r.data.c}">${r.data.n[0]}</div>
      <div style="flex:1"><div class="ring-yr" style="color:${r.data.c}">${r.data.n}</div><div class="ring-pow">战力+${r.data.pw||0}</div></div>
    </div>`).join(''));
  $set('rsm-title','textContent','选择融合魂环');
  $style('RSM','display','flex');
}
function pickFR(id){
  const it=G.bag.find(i=>(i.data?.id==id)||(i.id==id));
  if(!it)return;
  if(fusSelTgt==='a')fusState.a=it;else fusState.b=it;
  updFusCircle(fusSelTgt,it);cRSM();updFusRates();prevFusResult();
}
function updFusCircle(slot,it){
  const i=document.getElementById(`fc-${slot}i`),n=document.getElementById(`fc-${slot}n`),c=document.getElementById(`fc-${slot}`);
  if(i){i.style.color=it.data.c;i.textContent='⭕';}
  if(n){n.textContent=it.data.n;n.style.color=it.data.c;}
  if(c)c.classList.add('filled');
}
function addFH(slot){
  const herbs=G.bag.filter(i=>i.type==='herb');
  if(!herbs.length){notify('背包中无药草','normal');return;}
  fusHerbTgt=slot;
  $('rsm-list').innerHTML=herbs.map(h=>`
    <div class="herb-item" style="cursor:pointer" onclick="pickFH('${h.data?.id||h.id}')">
      <div class="herb-icon" style="font-size:22px">${h.data.i}</div>
      <div style="flex:1"><div style="font-size:12px;font-weight:600;color:${h.data.c}">${h.data.n}</div>
        <div style="font-size:10px;color:var(--dim)">成功+${h.data.fb?.s||0}% · 质变+${h.data.fb?.m||0}%</div>
      </div>
    </div>`).join('');
  $('rsm-title').textContent='选择药草';
  $style('RSM','display','flex');
}
function pickFH(id){
  const it=G.bag.find(i=>(i.data?.id==id)||(i.id==id));if(!it)return;
  if(fusState.herbs.length<=fusHerbTgt)fusState.herbs.push(it);else fusState.herbs[fusHerbTgt]=it;
  updFusHSlot(fusHerbTgt,it);cRSM();updFusRates();
}
function updFusHSlot(slot,it){
  const el=document.getElementById(`fhs-${slot}`);if(!el)return;
  el.innerHTML=`<span style="font-size:20px">${it.data.i}</span><span style="font-size:7px;color:${it.data.c}">${it.data.n.slice(0,4)}</span><div class="fhs-rm" onclick="remFH(${slot})">×</div>`;
  el.classList.add('filled');
}
function remFH(slot){
  fusState.herbs.splice(slot,1);
  const el=document.getElementById(`fhs-${slot}`);if(el){el.innerHTML='<span>+</span>';el.classList.remove('filled');}
  updFusRates();
}
function updFusRates(){
  let hs=0,hm=0;
  fusState.herbs.forEach(h=>{if(h?.data?.fb){hs+=h.data.fb.s;hm+=h.data.fb.m;}});
  const fr=Math.min(95,50+hs),fm=Math.min(50,1+hm);
  const f=id=>document.getElementById(id);
  if(f('fr-b'))f('fr-b').textContent='50%';
  if(f('fr-h'))f('fr-h').textContent=`+${hs}%`;
  if(f('fr-f'))f('fr-f').textContent=`${fr}%`;
  if(f('fr-m'))f('fr-m').textContent='1%';
  if(f('fr-hm'))f('fr-hm').textContent=`+${hm}%`;
}
function prevFusResult(){
  if(!fusState.a||!fusState.b)return;
  const ai=RT.findIndex(t=>t.n===fusState.a.data.n),bi=RT.findIndex(t=>t.n===fusState.b.data.n);
  const mi=Math.max(ai>=0?ai:0,bi>=0?bi:0);
  const rt=RT[Math.min(mi,RT.length-2)];
  const el=$('fc-res');
  if(el)el.innerHTML=`<div style="font-size:18px;color:${rt.c}">⭕</div><div style="font-size:8px;margin-top:2px;text-align:center;color:${rt.c}">${rt.n}</div>`;
}
function execFusion(){
  if(!fusState.a||!fusState.b){notify('请选择两个魂环','normal');return;}
  let hs=0,hm=0;
  fusState.herbs.forEach(h=>{if(h?.data?.fb){hs+=h.data.fb.s;hm+=h.data.fb.m;}});
  const fr=Math.min(95,50+hs),fm=Math.min(50,1+hm);
  if(Math.random()*100>fr){notify('💔 融合失败！两个魂环消耗。','normal');}
  else{
    const ai=RT.findIndex(t=>t.n===fusState.a.data.n),bi=RT.findIndex(t=>t.n===fusState.b.data.n);
    let mi=Math.max(ai>=0?ai:0,bi>=0?bi:0);
    const mut=Math.random()*100<fm;
    if(mut){mi=Math.min(mi+1,RT.length-2);notify('✨ 融合质变！品质提升！','legend');spawnBurst('#f0d060',70);}
    const rt=RT[mi];const sk=pick(rt.sk);
    const ro={id:Date.now(),n:rt.n,y:rt.y,c:rt.c,sk,pw:rt.pw,tier:rt.n};
    G.bag.push({type:'ring',data:ro,count:1,id:Date.now()});
    notify(`⚗ 融合成功！${rt.n}·${sk}·战力+${rt.pw}${mut?' (质变)':''}`,rt.y>=999999999?'legend':'epic');
  }
  [fusState.a,fusState.b].forEach(it=>{
    if(!it)return;
    const bi=G.bag.find(i=>(i.id===it.id)||(i.data?.id===it.data?.id));
    if(bi){bi.count--;if(bi.count<=0)G.bag=G.bag.filter(i=>i!==bi);}
  });
  fusState.herbs.forEach(it=>{
    if(!it)return;
    const bi=G.bag.find(i=>(i.id===it.id)||(i.data?.id===it.data?.id));
    if(bi){bi.count--;if(bi.count<=0)G.bag=G.bag.filter(i=>i!==bi);}
  });
  saveG();closeFusion();
}

// ══════════════════════════════════════════════════
//  IDLE & TIMERS
// ══════════════════════════════════════════════════
// 保存定时器引用，以便清理
let idleIntervalId = null;
let rewardIntervalId = null;
let saveIntervalId = null;
let milestoneIntervalId = null;

// 页面可见性检测
let pageHidden = false;
document.addEventListener('visibilitychange', () => {
  pageHidden = document.hidden;
  if (!pageHidden) {
    // 页面重新可见时，立即保存一次
    saveG();
  }
});

function startGameTimers() {
  // 避免重复启动
  if (idleIntervalId) return;

  idleIntervalId = setInterval(() => {
    if (pageHidden) return; // 页面不可见时跳过
    if (G.idleEarned < 5000) {
      G.sp += 2; G.idleEarned += 2; G.dailyEarned += 2;
      const spEl = document.getElementById('hud-sp'); if (spEl) spEl.textContent = G.sp;
      const itEl = $('idle-txt'); if (itEl) itEl.textContent = G.idleEarned + '/5000';
      const ibEl = $('idle-bar'); if (ibEl) ibEl.style.width = Math.min(100, G.idleEarned / 50) + '%';
    }
  }, 1000);

  rewardIntervalId = setInterval(() => {
    if (pageHidden) return;
    addSP(100, '在线奖励'); progressTask('earn', 100);
  }, 60000);

  saveIntervalId = setInterval(() => {
    saveG();
  }, 10000);

  milestoneIntervalId = setInterval(() => {
    if (pageHidden) return;
    checkPowerMilestones();
  }, 5000);
}

function stopGameTimers() {
  if (idleIntervalId) { clearInterval(idleIntervalId); idleIntervalId = null; }
  if (rewardIntervalId) { clearInterval(rewardIntervalId); rewardIntervalId = null; }
  if (saveIntervalId) { clearInterval(saveIntervalId); saveIntervalId = null; }
  if (milestoneIntervalId) { clearInterval(milestoneIntervalId); milestoneIntervalId = null; }
}

// 启动定时器
startGameTimers();

// ══════════════════════════════════════════════════
// ═══════════════════════════════════════════════
//  PARTICLES & STARS (已禁用)
// ═══════════════════════════════════════════════
// 粒子效果已移除 - 保留函数定义以避免调用报错
function spawnBurst(col,n){/* 粒子效果已移除 */}
function flashScreen(col,ms){/* 屏幕闪烁效果已移除 */}
function screenShake(ms){/* 屏幕震动效果已移除 */}
function spawnRingBurst(col,n,rings){/* 环形粒子效果已移除 */}
//  ABYSS (异界) SYSTEM — V6.0
// ══════════════════════════════════════════════════

// ──── ABYSS DATA ────
const ABYSS_LAYERS=[
  {id:1,n:"幽冥边境",col:"#c084fc",req:30,stages:[
    {id:"1-1",n:"幽魂初遇",type:"normal",cost:1,enemy:{n:"幽冥游魂",i:"👻",hp:7200,atk:780,spd:14,skills:[{n:"灵魂侵蚀",d:"持续造成中毒伤害",dmg:416,cd:2,status:"poison",icon:"☠️"}]}},
    {id:"1-2",n:"腐化猎场",type:"normal",cost:1,enemy:{n:"腐化魂兽",i:"🐺",hp:10800,atk:1300,spd:10,skills:[{n:"狂怒冲击",d:"造成2倍物理伤害",dmg:2080,cd:3,icon:"💥"}]}},
    {id:"1-3",n:"深渊哨所",type:"normal",cost:1,enemy:{n:"幽冥哨兵",i:"🗡️",hp:9000,atk:1040,spd:12,skills:[{n:"减速斩",d:"攻击并使目标减速",dmg:832,cd:2,status:"slow",icon:"🌀"}]}},
    {id:"1-4",n:"黑雾迷阵",type:"normal",cost:1,enemy:{n:"黑雾迷途者",i:"🌑",hp:8100,atk:1170,spd:11,skills:[{n:"燃烧意志",d:"点燃目标造成持续伤害",dmg:520,cd:2,status:"burn",icon:"🔥"}]}},
    {id:"1-5",n:"幽境深处",type:"normal",cost:1,enemy:{n:"古老游魂",i:"💀",hp:12600,atk:1430,spd:9,skills:[{n:"寒冰缠绕",d:"冰冻目标跳过其下一回合行动",dmg:624,cd:3,status:"freeze",icon:"❄️"}]}},
    {id:"1-E1",n:"幽将降临",type:"elite",cost:2,enemy:{n:"幽冥将领",i:"⚔️",hp:22500,atk:1950,spd:13,skills:[{n:"幽冥召唤",d:"造成大量伤害并附加中毒",dmg:1820,cd:3,status:"poison",icon:"☠️"},{n:"将领震慑",d:"降低目标攻击力20%",dmg:200,cd:4,status:"weaken",icon:"💔"}]}},
    {id:"1-E2",n:"双煞联手",type:"elite",cost:2,enemy:{n:"异界双煞",i:"👥",hp:27000,atk:1820,spd:15,skills:[{n:"连环斩",d:"连续攻击2次",dmg:1456,cd:2,icon:"⚡"},{n:"毒刃奥义",d:"造成伤害并重度中毒",dmg:250,cd:3,status:"poison2",icon:"☠️"}]}},
    {id:"1-BOSS",n:"边境守卫者",type:"boss",cost:3,enemy:{n:"幽冥边境守卫",i:"👁️",hp:72000,atk:2925,spd:11,phases:[
      {threshold:1.0,msg:"守卫者苏醒，异界之门震颤！"},
      {threshold:0.6,msg:"守卫者爆发！幽冥之力涌现！",atkBoost:1.3},
      {threshold:0.3,msg:"守卫者濒死，释放绝命之力！",atkBoost:1.8,spdBoost:1.5},
    ],skills:[{n:"死亡审判",d:"对目标造成重创",dmg:600,cd:3,icon:"💀"},{n:"幽冥领域",d:"全面压制，造成伤害并附加减速",dmg:400,cd:4,status:"slow",icon:"🌀"},{n:"灵魂吸取",d:"造成伤害并吸取生命",dmg:350,cd:3,heal:0.3,icon:"💜"}]}},
  ]},
  {id:2,n:"混沌裂缝",col:"#f87171",req:50,stages:[
    {id:"2-1",n:"裂缝边缘",type:"normal",cost:1,enemy:{n:"混沌碎片体",i:"🌀",hp:18000,atk:2275,spd:14,skills:[{n:"混沌爆炸",d:"随机造成大量伤害",dmg:2600,cd:3,icon:"💥"}]}},
    {id:"2-2",n:"时空扭曲",type:"normal",cost:1,enemy:{n:"时空扭曲体",i:"⏰",hp:16200,atk:2080,spd:18,skills:[{n:"时间减速",d:"目标减速2回合",dmg:1040,cd:2,status:"slow",icon:"🌀"},{n:"时空撕裂",d:"无视防御造成伤害",dmg:400,cd:4,icon:"⚡"}]}},
    {id:"2-3",n:"混沌深渊",type:"normal",cost:1,enemy:{n:"深渊猎手",i:"🌑",hp:22500,atk:2600,spd:13,skills:[{n:"剧毒攻势",d:"附加强力中毒",dmg:1560,cd:2,status:"poison2",icon:"☠️"}]}},
    {id:"2-4",n:"法则崩坏",type:"normal",cost:1,enemy:{n:"法则破坏者",i:"⚖️",hp:19800,atk:2470,spd:12,skills:[{n:"法则削弱",d:"削弱目标防御50%",dmg:1300,cd:3,status:"weaken",icon:"💔"},{n:"规则燃烧",d:"燃烧法则，持续伤害",dmg:200,cd:2,status:"burn",icon:"🔥"}]}},
    {id:"2-5",n:"混沌核心",type:"normal",cost:1,enemy:{n:"混沌核心兽",i:"💎",hp:27000,atk:2730,spd:15,skills:[{n:"核心爆发",d:"蓄力后造成巨大伤害",dmg:3640,cd:4,icon:"💥"},{n:"冰封时空",d:"冰冻目标",dmg:300,cd:3,status:"freeze",icon:"❄️"}]}},
    {id:"2-E1",n:"混沌将军",type:"elite",cost:2,enemy:{n:"混沌军团将军",i:"⚔️",hp:54000,atk:3250,spd:14,skills:[{n:"混沌剑雨",d:"全力攻击造成大量伤害",dmg:3120,cd:3,icon:"⚡"},{n:"混沌诅咒",d:"中毒+减速+燃烧三重状态",dmg:300,cd:4,status:"all",icon:"☠️"}]}},
    {id:"2-E2",n:"虚空恶魔",type:"elite",cost:2,enemy:{n:"虚空恶魔王",i:"👿",hp:63000,atk:3575,spd:16,skills:[{n:"虚空撕裂",d:"无视防御重创",dmg:3640,cd:3,icon:"💀"},{n:"恶魔之怒",d:"怒气爆发，攻击翻倍",dmg:800,cd:5,icon:"💥"}]}},
    {id:"2-BOSS",n:"混沌裂缝守卫",type:"boss",cost:3,enemy:{n:"混沌之主碎片",i:"🌀",hp:180000,atk:4550,spd:13,phases:[
      {threshold:1.0,msg:"混沌之主的意志化为实体！"},
      {threshold:0.5,msg:"混沌之力觉醒！时空扭曲！",atkBoost:1.5},
      {threshold:0.25,msg:"绝望之力，混沌终焉！",atkBoost:2.0,spdBoost:1.8},
    ],skills:[{n:"混沌湮灭",d:"造成重大伤害",dmg:900,cd:3,icon:"💥"},{n:"时空乱流",d:"全状态异常",dmg:500,cd:4,status:"all",icon:"🌀"},{n:"混沌再生",d:"恢复自身生命",dmg:0,cd:5,heal:0.15,icon:"💜"}]}},
  ]},
  {id:3,n:"时空迷域",col:"#ffd700",req:70,stages:[{id:"3-1",n:"时间迷宫",type:"normal",cost:1,enemy:{n:"时间幻影",i:"⏳",hp:45000,atk:5200,spd:20,skills:[{n:"时间逆转",d:"恢复敌方部分生命",dmg:0,cd:3,heal:0.2,icon:"💜"},{n:"时间冲击",d:"造成大量伤害",dmg:1000,cd:2,icon:"⚡"}]}}]},
  {id:4,n:"神魔禁地",col:"#ef4444",req:90,stages:[{id:"4-1",n:"神魔领域",type:"normal",cost:2,enemy:{n:"堕落神使",i:"😈",hp:135000,atk:13000,spd:18,skills:[{n:"神魔之力",d:"毁灭性攻击",dmg:13000,cd:3,icon:"💀"},{n:"神圣燃烧",d:"神圣火焰灼烧",dmg:1500,cd:2,status:"burn",icon:"🔥"}]}}]},
  {id:5,n:"宇宙本源",col:"#00ffff",req:100,stages:[{id:"5-1",n:"宇宙起点",type:"normal",cost:3,enemy:{n:"宇宙意志化身",i:"∞",hp:450000,atk:32500,spd:25,skills:[{n:"宇宙湮灭",d:"近乎毁灭的攻击",dmg:41600,cd:4,icon:"💥"},{n:"规则重写",d:"无视一切防御",dmg:5000,cd:3,icon:"⚡"}]}}]},
];

(function boostAbyssDifficulty(){
  ABYSS_LAYERS.forEach(layer=>layer.stages.forEach(st=>{
    const mul=st.type==='boss'?12:st.type==='elite'?8:6;
    st.enemy.hp=Math.floor(st.enemy.hp*mul);
    st.enemy.atk=Math.floor(st.enemy.atk*mul);
    if(st.enemy.skills)st.enemy.skills.forEach(sk=>{if(sk.dmg)sk.dmg=Math.floor(sk.dmg*mul);});
  }));
})();

const ABYSS_SHOP=[
  // Token purchase (dual currency)
  {id:"t1",n:"异界令牌×3（碎片）",i:"🔑",costType:"shards",cost:100,fn:()=>{G.abyss.tokens=Math.min(G.abyss.maxTokens,G.abyss.tokens+3);$set('ab-tokens','textContent',G.abyss.tokens);}},
  {id:"t2",n:"异界令牌×3（魂力）",i:"🔑",costType:"sp",cost:2500,fn:()=>{G.abyss.tokens=Math.min(G.abyss.maxTokens,G.abyss.tokens+3);}},
  {id:"t3",n:"异界令牌×10（满充）",i:"🔑",costType:"shards",cost:300,fn:()=>{G.abyss.tokens=G.abyss.maxTokens;$set('ab-tokens','textContent',G.abyss.tokens);}},
  // Tickets
  {id:"s1",n:"普通星运券×5",i:"🎟️",costType:"shards",cost:50,fn:()=>{addTicketToBag('common',5);}},
  {id:"s2",n:"高级星运券×2",i:"🎫",costType:"shards",cost:80,fn:()=>{addTicketToBag('advanced',2);}},
  {id:"s3",n:"顶级星运十连券×1",i:"🏆",costType:"shards",cost:300,fn:()=>{addTicketToBag('apex',1,true);}},
  // Bones & gear
  {id:"s4",n:"随机高级魂骨",i:"🦴",costType:"shards",cost:200,fn:()=>{const slotKey=pick(['head','body','arm','leg']);const pool=BONE_POOL[slotKey];const b=pool[3+ri(0,2)];const bpw=genBonePw(b.tier);bagPush('bone',{...b,pw:bpw,id:Date.now()});}},
  {id:"s5",n:"异界探索者称号",i:"👑",costType:"shards",cost:500,fn:()=>{const t={n:"异界探索者",c:"#c084fc",d:"踏入异界并生还的勇者。",pw:1500,bonus:"异界战斗攻击+20%"};if(!G.titles.find(x=>x.n===t.n))G.titles.push(t);}},
  {id:"s6",n:"异界精华神器",i:"🌀",costType:"shards",cost:800,fn:()=>{const a={id:"a_abyss",n:"异界精华结晶",i:"🌀",d:"凝聚无数异界战斗精华的神器。",pw:12000,q:5,mul:5,bonus:"异界战斗全属性+30%"};bagPush('artifact',a);}},
];

// ──── ABYSS STATE ────
function initAbyssState(){
  if(!G.abyss)G.abyss={
    tokens:10,maxTokens:10,lastTokenTime:Date.now(),
    shards:0,progress:{},curLayer:1,firstClear:{},
    wins:0,streak:0,totalBattles:0,
  };
}

// Token regeneration: 1 per 30 min
function tickAbyssTokens(){
  initAbyssState();
  const now=Date.now();
  const elapsed=Math.floor((now-G.abyss.lastTokenTime)/60000/30);
  if(elapsed>0&&G.abyss.tokens<G.abyss.maxTokens){
    G.abyss.tokens=Math.min(G.abyss.maxTokens,G.abyss.tokens+elapsed);
    G.abyss.lastTokenTime=now;
    saveG();
  }
}

// ──── COMBAT STATE ────
let combatState=null;
let combatLog=[];
let combatAnimTimer=null;

function buildPlayerStats(){
  initAbyssState();
  const pw=calcPower();
  const s=G.soul||{};
  const rings=s.rings||[];
  const spdBonus=rings.reduce((sum,r)=>{const t=RT.find(x=>x.n===r.n);return sum+(t?.attr?.spd||0);},0);
  const atkBonus=rings.reduce((sum,r)=>{const t=RT.find(x=>x.n===r.n);return sum+(t?.attr?.atk||0);},0);
  const defBonus=Object.values(G.equippedBones||{}).filter(b=>b&&b.bonus&&b.bonus.includes('防御')).length*5;
  return{
    name:s.name||'魂师',icon:s.icon||'⚡',
    maxHp:Math.floor(pw*2+G.level*500),hp:0,
    atk:Math.floor(pw*0.8*(1+atkBonus/100)),
    spd:10+Math.floor(spdBonus/10),
    def:defBonus,
    mp:100,maxMp:100,
    skills:(s.skills||[]).slice(0,4).map((sk,i)=>({
      name:sk.name,desc:sk.desc,icon:'✨',
      dmgMul:1.5+i*0.3,mpCost:20+i*10,cd:i+2,curCd:0,
      status:i===1?'burn':i===2?'slow':null,
      params:sk.params||[]
    })),
    isTwin:['twin','triple'].includes(s.quality),
    quality:s.quality,
    statuses:{},
  };
}

function buildEnemyStats(enemyDef,phase){
  return{
    ...enemyDef,maxHp:enemyDef.hp,hp:enemyDef.hp,
    curPhase:0,statuses:{},
    skills:(enemyDef.skills||[]).map(sk=>({...sk,curCd:0})),
  };
}

// ──── RENDER ABYSS PAGE ────
// ──── WORLD PAGE (formerly Abyss) ────
let worldPage=0;
function renderAbyssPage(){
  initAbyssState();tickAbyssTokens();
  const unlocked=G.level>=30;
  $style('abyss-lock-msg','display',unlocked?'none':'block');
  $style('abyss-main','display',unlocked?'block':'none');
  const curlvEl=$('ab-cur-lv');if(curlvEl)curlvEl.textContent='Lv.'+G.level;
  $set('ab-tokens','textContent',G.abyss.tokens);
  $set('ab-shards','textContent',G.abyss.shards);
  if(!unlocked)return;
  renderWorldDots();renderWorldPage();
}
function renderWorldDots(){
  // Tabs replace dots — update tab styles only
  [0,1].forEach(i=>{
    const t=document.getElementById('wtab-'+i);if(!t)return;
    const active=i===worldPage;
    const cols=['rgba(192,132,252,.6)','rgba(201,162,39,.5)'];
    const bgcols=['rgba(192,132,252,.15)','rgba(201,162,39,.1)'];
    const tcols=['#c084fc','var(--gl)'];
    t.style.borderColor=active?cols[i]:'var(--bdr)';
    t.style.background=active?bgcols[i]:'transparent';
    t.style.color=active?tcols[i]:'var(--dim)';
    t.style.fontWeight=active?'600':'400';
  });
}
function setWorldPage(pg){
  worldPage=pg;
  // Update tab styles
  [0,1].forEach(i=>{
    const t=document.getElementById('wtab-'+i);if(!t)return;
    const cols=['rgba(192,132,252,.6)','rgba(201,162,39,.5)'];
    const bgcols=['rgba(192,132,252,.15)','rgba(201,162,39,.1)'];
    const tcols=['#c084fc','var(--gl)'];
    if(i===pg){t.style.borderColor=cols[i];t.style.background=bgcols[i];t.style.color=tcols[i];t.style.fontWeight='600';}
    else{t.style.borderColor='var(--bdr)';t.style.background='transparent';t.style.color='var(--dim)';t.style.fontWeight='400';}
  });
  renderWorldPage();
}
function renderWorldPage(){
  const wc=$('world-cards');if(!wc)return;
  if(worldPage===1){
    wc.style.animation='none';
    wc.innerHTML=renderArenaPage();
    return;
  }
  // Page 0: Abyss dungeon big cards
  const grads={1:'linear-gradient(160deg,#1a0a2e,#2d1654,#0d0520)',2:'linear-gradient(160deg,#1a0808,#3d1010,#0a0505)',3:'linear-gradient(160deg,#1a1200,#3d2e00,#0a0800)',4:'linear-gradient(160deg,#1a0005,#3d0010,#0a0003)',5:'linear-gradient(160deg,#001a1a,#003d3d,#000a0a)'};
  const icons={1:'👁️',2:'🌀',3:'⏳',4:'😈',5:'∞'};
  wc.innerHTML=ABYSS_LAYERS.map(l=>{
    const unlocked=G.level>=l.req;
    const prog=G.abyss.progress[l.id]||[];
    const total=l.stages.length;
    const pct=Math.round(prog.length/total*100);
    const bossCleared=prog.includes(l.id+'-BOSS');
    const border=unlocked?`1.5px solid ${l.col}50`:'1px solid rgba(255,255,255,.08)';
    const clickStr=unlocked?`onclick="showAbyssLayer(${l.id})"`:';';
    return`<div class="world-card-big ${unlocked?'':'locked'}" style="background:${grads[l.id]||grads[1]};border:${border};margin-bottom:12px" ${unlocked?`onclick="showAbyssLayer(${l.id})"`:''}>
      <div class="wc-bg" style="background:radial-gradient(ellipse at 30% 30%,${l.col}18,transparent 60%)"></div>
      <div class="wc-body">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px">
          <div>
            <div style="font-size:11px;color:${l.col};font-weight:600;letter-spacing:1px;margin-bottom:4px">${unlocked?'已解锁':'Lv.'+l.req+' 解锁'}</div>
            <div class="wc-title" style="color:#fff">${l.n}</div>
          </div>
          <div style="font-size:44px;opacity:${unlocked?1:.4}">${icons[l.id]||'⚔️'}</div>
        </div>
        <div class="wc-tags">
          <span class="wc-tag" style="color:${l.col}">${l.stages.filter(s=>s.type==='normal').length}普通</span>
          <span class="wc-tag" style="color:#fbbf24">${l.stages.filter(s=>s.type==='elite').length}精英</span>
          <span class="wc-tag" style="color:var(--apex)">1 BOSS</span>
          ${bossCleared?'<span class="wc-tag" style="color:var(--hc)">✅通关</span>':''}
        </div>
        <div style="margin-top:8px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:9px;color:rgba(255,255,255,.4)">通关进度</span>
            <span style="font-size:9px;color:${l.col}">${prog.length}/${total}</span>
          </div>
          <div style="height:4px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${l.col};border-radius:2px;transition:width .5s ease"></div>
          </div>
        </div>
        ${unlocked?`<div style="margin-top:12px;display:flex;justify-content:flex-end">
          <div style="font-size:11px;font-weight:700;color:${l.col};padding:6px 16px;border-radius:8px;border:1px solid ${l.col}60;background:${l.col}18">进入探索 →</div>
        </div>`:''}
      </div>
    </div>`;
  }).join('');
}
function showAbyssLayer(layerId){
  initAbyssState();G.abyss.curLayer=layerId;
  const layer=ABYSS_LAYERS.find(l=>l.id===layerId);if(!layer)return;
  const prog=G.abyss.progress[layerId]||[];
  const stagesH=layer.stages.map((st,i)=>{
    const cleared=prog.includes(st.id);
    const prevOk=i===0||prog.includes(layer.stages[i-1].id);
    const isLocked=!cleared&&!prevOk;
    const isBoss=st.type==='boss';
    const isFirst=!G.abyss.firstClear[st.id];
    const typeCol=isBoss?layer.col:st.type==='elite'?'#fbbf24':'var(--txt)';
    const clickAttr=isLocked?'':`onclick="enterStage('${st.id}')"`;
    return`<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);opacity:${isLocked?.4:1};cursor:${isLocked?'not-allowed':'pointer'}" ${clickAttr}>
      <div style="font-size:${isBoss?24:18}px;flex-shrink:0">${cleared?'✅':isLocked?'🔒':st.enemy.i}</div>
      <div style="flex:1">
        <div style="font-size:11px;font-weight:700;color:${typeCol}">${isBoss?'👑 BOSS：':st.type==='elite'?'⭐ ':''}${st.n}</div>
        <div style="font-size:9px;color:var(--dim);margin-top:1px">${st.enemy.n} · 令牌×${st.cost}</div>
        <div style="font-size:9px;display:flex;gap:4px;flex-wrap:wrap;margin-top:3px">
          ${(st.enemy.skills||[]).map(sk=>`<span style="background:rgba(255,255,255,.06);border-radius:3px;padding:1px 5px;color:var(--dim)">${sk.icon||'⚡'} ${sk.n}</span>`).join('')}
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        ${cleared?'<div style="font-size:9px;color:var(--hc)">通关</div>':''}
        ${isFirst&&!cleared?'<div style="font-size:8px;color:var(--apex);border:1px solid rgba(239,68,68,.3);border-radius:3px;padding:1px 5px">首通</div>':''}
      </div>
    </div>`;
  }).join('');
  openModal(`<div class="m-title" style="color:${layer.col}">${layer.n}</div>
    <div class="m-sub">进度 ${prog.length}/${layer.stages.length} · 令牌 ${G.abyss.tokens}/10</div>
    <div style="margin-top:8px">${stagesH}</div>`);
}
// Compat stubs
function renderAbyssLayers(){}
function setAbyssLayer(id){G.abyss.curLayer=id;}
function renderAbyssMap(){}

function enterStage(stageId){
  initAbyssState();tickAbyssTokens();
  const layer=ABYSS_LAYERS.find(l=>l.stages.some(s=>s.id===stageId));
  const stage=layer&&layer.stages.find(s=>s.id===stageId);
  if(!stage||!layer)return;
  if(G.abyss.tokens<stage.cost){notify('异界令牌不足！（'+G.abyss.tokens+'/'+stage.cost+'）','normal');return;}
  if(!G.awakenDone||!G.soul){notify('请先觉醒武魂！','normal');return;}
  // Build combat
  const player=buildPlayerStats();
  player.hp=player.maxHp;
  const enemy=buildEnemyStats(stage.enemy);
  combatState={player,enemy,round:1,maxRounds:8,stage,layer,
    turnOrder:[],log:[],phase:0,ended:false,speed:'normal'};
  combatLog=[];
  G.abyss.tokens-=stage.cost;G.abyss.totalBattles++;
  saveG();renderAbyssPage();
  showCombatUI();
}

// ──── COMBAT UI V7 ────
let cbtFloatContainer=null;
function ensureFloatContainer(){
  if(!cbtFloatContainer){cbtFloatContainer=document.createElement('div');
    cbtFloatContainer.className='cbt-float-container';document.body.appendChild(cbtFloatContainer);}
}
function showCombatUI(){
  let ov=$('combat-ov');
  if(!ov){ov=document.createElement('div');ov.id='combat-ov';document.body.appendChild(ov);}
  ov.className='';
  ensureFloatContainer();
  renderCombat();
}

function renderCombat(){
  const ov=$('combat-ov');if(!ov||!combatState)return;
  const cs=combatState;
  const p=cs.player,e=cs.enemy;
  const pHpPct=Math.max(0,Math.min(100,p.hp/p.maxHp*100));
  const eHpPct=Math.max(0,Math.min(100,e.hp/e.maxHp*100));
  const pMpPct=Math.max(0,Math.min(100,p.mp/p.maxMp*100));
  const pStatusHtml=renderStatusesV7(p.statuses);
  const eStatusHtml=renderStatusesV7(e.statuses);
  let phaseHtml='';
  if(e.phases&&e.phases.length>1){
    const curPhase=e.phases.filter(ph=>e.hp/e.maxHp<=ph.threshold).length-1;
    phaseHtml=`<div class="cbt-phase-tag">⚠ 阶段 ${curPhase+1}/${e.phases.length}</div>`;
  }
  const skillBtns=p.skills.slice(0,4).map((sk,i)=>{
    const onCd=sk.curCd>0;const noMp=p.mp<sk.mpCost;const disabled=onCd||noMp||cs.ended;
    const cdPct=onCd?Math.floor(sk.curCd/sk.cd*100):0;
    return`<div class="cbt-sk-btn ${(onCd?'cd':'')+(noMp?' nomp':'')}" onclick="${disabled?'':('useSkill('+i+')')}">
      <div class="cbt-sk-ico">${sk.icon||'✨'}</div>
      <div class="cbt-sk-nm">${sk.name.slice(0,5)}</div>
      <div class="cbt-sk-cost">${onCd?'CD '+sk.curCd:'MP '+sk.mpCost}</div>
      ${onCd?`<div class="cbt-sk-cd-overlay" style="height:${cdPct}%">${sk.curCd}t</div>`:''}
    </div>`;
  }).join('');
  const logHtml=combatLog.slice(-6).map(l=>`<div class="cbt-log-entry" style="color:${l.c||'var(--txt)'}">${l.t}</div>`).join('');
  const isWin=cs.ended&&e.hp<=0;
  const isLose=cs.ended&&p.hp<=0;
  const resultOverlay=(isWin||isLose)?`<div class="cbt-result-overlay ${isWin?'cbt-res-win':'cbt-res-lose'}">
    <div class="cbt-res-close" onclick="closeCombat()">✕</div>
    <div class="cbt-res-icon">${isWin?'🏆':'💔'}</div><div class="cbt-res-text">${isWin?'胜利':'战败'}</div>
    ${isWin?`<div class="cbt-res-rewards">${cs.lastRewards||''}</div>`:''}
    ${(()=>{
      if(isLose)return`<div style="margin-top:14px"><div class="cbt-leave-btn" onclick="closeCombat()" style="padding:10px 32px">离开战场</div></div>`;
      const curIdx=cs.layer.stages.findIndex(s=>s.id===cs.stage.id);
      const next=cs.layer.stages[curIdx+1];
      const canNext=next&&G.abyss.tokens>=next.cost;
      return`<div style="margin-top:14px;display:flex;gap:8px">${canNext?`<div class="cbt-leave-btn" onclick="closeCombat()" style="padding:10px 24px">离开</div><div class="cbt-next-btn" onclick="nextStage()" style="padding:10px 24px">下一关 →</div>`:`<div class="cbt-leave-btn" onclick="closeCombat()" style="padding:10px 32px">离开战场</div>`}</div>`;
    })()}
  </div>`:'';
  ov.className='cbt-ov-active';
  ov.innerHTML=`
    <div class="cbt-hd"><div class="cbt-hd-top">
      <div class="cbt-title">${cs.layer.n} · ${cs.stage.n}</div>
      <div class="cbt-hd-btns">
        <div class="cbt-hd-btn" onclick="toggleCombatSpeed()">${cs.speed==='fast'?'⏩ 快速':'▶ 正常'}</div>
        <div class="cbt-hd-btn danger" onclick="retreatCombat()">撤退</div></div></div>
      <div class="cbt-round-info"><div class="cbt-round-num">${cs.round}</div><span>/${cs.maxRounds} 回合${cs.ended?' · 已结束':''}</span></div></div>
    <div class="cbt-stage">
      <div class="cbt-enemy" id="cbt-enemy-card"><div class="cbt-enemy-head">
        <div class="cbt-enemy-icon" id="cbt-e-icon">${e.i}</div>
        <div class="cbt-enemy-info">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
            <span class="cbt-enemy-name">${e.n}</span>
            <span class="cbt-enemy-hp-val">${fmtNum(e.hp)} / ${fmtNum(e.maxHp)}</span></div>
          <div class="cbt-hp-bar-wrap"><div class="cbt-hp-bar" style="width:${eHpPct}%"><span class="cbt-hp-text">${eHpPct.toFixed(0)}%</span></div></div>
          ${phaseHtml}</div></div>
        ${eStatusHtml?`<div class="cbt-status-row">${eStatusHtml}</div>`:''}></div>
      <div class="cbt-vs"><div class="cbt-vs-line">⚔</div></div>
      <div class="cbt-player" id="cbt-player-card"><div class="cbt-player-head">
        <div class="cbt-player-icon" id="cbt-p-icon">${p.icon}</div>
        <div class="cbt-player-info">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
            <span class="cbt-player-name">${p.name}</span>
            <span class="cbt-player-hp-val">${fmtNum(p.hp)} / ${fmtNum(p.maxHp)}</span></div>
          <div class="cbt-hp-bar-wrap"><div class="cbt-hp-bar" style="width:${pHpPct}%;background:linear-gradient(90deg,#16a34a,#22c55e,#4ade80)"><span class="cbt-hp-text">${pHpPct.toFixed(0)}%</span></div></div>
          <div class="cbt-mp-row"><span class="cbt-mp-label">MP</span><div class="cbt-mp-bar-wrap"><div class="cbt-mp-bar" style="width:${pMpPct}%"></div></div>
            <span style="font-size:8px;color:var(--dim);flex-shrink:0">${Math.floor(p.mp)}/${p.maxMp}</span></div></div></div>
        ${pStatusHtml?`<div class="cbt-status-row">${pStatusHtml}</div>`:''}></div>
      <div class="cbt-log" id="cbt-log-scroll">${logHtml||'<div class="cbt-log-empty">⚔ 战斗开始，准备出击！</div>'}></div></div>
    <div class="cbt-actions">
      ${cs.ended?`${resultOverlay}`
        :`<div class="cbt-base-row"><div class="cbt-atk-btn" onclick="combatAttack()">⚔ 攻击</div><div class="cbt-def-btn" onclick="doDefend()">🛡 防御</div></div>
        <div class="cbt-skills">${skillBtns}</div>`}</div>`;
  setTimeout(()=>{const lg=$('cbt-log-scroll');if(lg)lg.scrollTop=lg.scrollHeight;},50);
}

/* V7 Status renderer with styled tags */
const ST_CLASS_MAP={poison:'cbt-st-poison',poison2:'cbt-st-poison',burn:'cbt-st-burn',
  slow:'cbt-st-slow',freeze:'cbt-st-freeze',weaken:'cbt-st-weaken'};
const ST_LABEL_MAP={poison:'☠ 中毒',poison2:'☠ 剧毒',burn:'🔥 燃烧',
  slow:'🌀 减速',freeze:'❄ 冰封',weaken:'💔 虚弱'};
function renderStatusesV7(st){
  if(!st)return'';
  return Object.entries(st).filter(([,v])=>v>0).map(([k,v])=>
    `<span class="cbt-st-tag ${ST_CLASS_MAP[k]||''}">${ST_LABEL_MAP[k]||k} ${v}t</span>`
  ).join('');
}
function fmtNum(n){return Math.floor(n).toLocaleString();}

function renderStatuses(st){
  if(!st)return'';
  const labels={poison:'☠️中毒',poison2:'☠️强毒',burn:'🔥燃烧',slow:'🌀减速',freeze:'❄️冰封',weaken:'💔虚弱'};
  return Object.entries(st).filter(([,v])=>v>0).map(([k,v])=>`<span style="font-size:9px;padding:1px 5px;border-radius:4px;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.1);color:var(--dim)">${labels[k]||k} ${v}t</span>`).join('');
}

function addLog(text,color){
  combatLog.push({t:text,c:color||'var(--txt)'});
  renderCombat();
}

/* ══════════════════════════════════════
   COMBAT V7 — 特效系统
   ══════════════════════════════════════ */
function cbtShowDamage(amount,targetElId,type){
  /* type: normal/skill/crit/heal/miss */
  ensureFloatContainer();
  const el=document.getElementById(targetElId);
  if(!el)return;
  const r=el.getBoundingClientRect();
  const x=r.left+r.width*(.3+.4*Math.random());
  const y=r.top+r.height*.3;
  const d=document.createElement('div');
  d.className='cbt-dmg-txt cbt-dmg-'+(type||'normal');
  d.textContent=(type==='heal'?'+':'-')+Math.floor(amount).toLocaleString();
  d.style.left=x+'px';d.style.top=y+'px';
  cbtFloatContainer.appendChild(d);
  setTimeout(()=>{if(d.parentNode)d.parentNode.removeChild(d);},900)}
function cbtShake(){
  const ov=$('combat-ov');if(!ov)return;
  ov.classList.remove('cbt-shake');void ov.offsetWidth; /* reflow */
  ov.classList.add('cbt-shake');
  setTimeout(()=>ov.classList.remove('cbt-shake'),320)}
function cbtHitFlash(targetId){
  const el=document.getElementById(targetId);if(!el)return;
  const f=document.createElement('div');
  f.className='cbt-hit-flash';el.appendChild(f);
  setTimeout(()=>{if(f.parentNode)f.parentNode.removeChild(f);},220)}
function cbtBossTransition(msg){
  ensureFloatContainer();
  const t=document.createElement('div');
  t.className='cbt-boss-transition';
  t.innerHTML='<div class="cbt-boss-trans-text">'+(msg||'BOSS TRANSITION')+'</div>';
  document.body.appendChild(t);
  setTimeout(()=>{if(t.parentNode)t.parentNode.removeChild(t);},1400)}

// ──── COMBAT ACTIONS V7 ────
function doAttack(){
  if(!combatState||combatState.ended)return;
  const cs=combatState,p=cs.player,e=cs.enemy;
  if(p.statuses.freeze>0){addLog('> 你被冰封，本回合跳过！','#67e8f9');doEnemyTurn();return;}
  const dmg=calcDamage(p.atk,e,false,p);
  e.hp=Math.max(0,e.hp-dmg);
  p.mp=Math.min(p.maxMp,p.mp+15);
  addLog(`> ⚔ 普通攻击`,'var(--gl)');
  addLog(`> ${e.n} 受到 ${dmg.toLocaleString()} 点伤害`,'#f87171');
  cbtShowDamage(dmg,'cbt-enemy-card','normal');cbtHitFlash('cbt-e-icon');cbtShake();
  checkBossPhase();
  // Fix: return immediately if enemy dies — doEnemyTurn must NOT fire after victory
  if(checkVictory())return;
  doEnemyTurn();
}
function doDefend(){
  if(!combatState||combatState.ended)return;
  const cs=combatState,p=cs.player;
  if(p.statuses.freeze>0){addLog('> 你被冰封，本回合跳过！','#67e8f9');doEnemyTurn();return;}
  p._defending=true;p.mp=Math.min(p.maxMp,p.mp+25);
  addLog('> 🛡 防御姿态 (减伤40%)','#93c5fd');
  doEnemyTurn();
}
function useSkill(idx){
  if(!combatState||combatState.ended)return;
  const cs=combatState,p=cs.player,e=cs.enemy,sk=p.skills[idx];
  if(!sk||sk.curCd>0||p.mp<sk.mpCost)return;
  if(p.statuses.freeze>0){addLog('> 你被冰封，本回合跳过！','#67e8f9');doEnemyTurn();return;}
  sk.curCd=sk.cd;p.mp=Math.max(0,p.mp-sk.mpCost);
  const dmg=Math.floor(calcDamage(p.atk,e,true,p)*sk.dmgMul);
  e.hp=Math.max(0,e.hp-dmg);
  addLog(`> ✦ ${sk.name}`,'#c4b5fd');
  addLog(`> ${e.n} 受到 ${dmg.toLocaleString()} 点伤害`,'#f87171');
  cbtShowDamage(dmg,'cbt-enemy-card','skill');cbtHitFlash('cbt-e-icon');cbtShake();
  if(sk.status)applyStatus(e,sk.status,2);
  // Twin/Triple soul special: fusion skill
  if(p.isTwin&&idx===3&&p.quality==='twin'){
    const fusionDmg=Math.floor(dmg*1.8);
    e.hp=Math.max(0,e.hp-fusionDmg);
    addLog(`> ✨ 双生融合爆发！额外 ${fusionDmg.toLocaleString()} 融合伤害！`,'#f0abfc');
    cbtShowDamage(fusionDmg,'cbt-enemy-card','crit');
  }
  if(p.quality==='triple'&&idx===3){
    const triDmg=Math.floor(dmg*2.5);
    e.hp=Math.max(0,e.hp-triDmg);
    addLog(`> 🌈 三生共鸣爆发！额外 ${triDmg.toLocaleString()} 三重融合伤害！`,'#e2e8f0');
    cbtShowDamage(triDmg,'cbt-enemy-card','crit');
  }
  checkBossPhase();
  // Fix: return immediately if enemy dies — no enemy turn after one-shot kill
  if(checkVictory())return;
  doEnemyTurn();
}
function doEnemyTurn(){
  const cs=combatState,p=cs.player,e=cs.enemy;
  if(!cs||cs.ended)return;
  tickStatuses(p);tickStatuses(e);
  tickSkillCooldowns(p);tickSkillCooldowns(e);
  // Status damage on player
  let statusDmg=0;
  if(p.statuses.poison>0){statusDmg+=Math.floor(p.maxHp*0.03);addLog('> 中毒持续伤害！','#a3e635');}
  if(p.statuses.burn>0){statusDmg+=Math.floor(p.maxHp*0.04);addLog('> 燃烧持续伤害！','#fb923c');}
  if(statusDmg>0){p.hp=Math.max(0,p.hp-statusDmg);addLog(`> 你受到 ${statusDmg} 点状态伤害`,'#f87171');}
  // Status effects on enemy (DoT)
  let eStatusDmg=0;
  if(e.statuses.poison>0){eStatusDmg+=Math.floor(e.maxHp*0.03);}
  if(e.statuses.burn>0){eStatusDmg+=Math.floor(e.maxHp*0.04);}
  if(eStatusDmg>0){e.hp=Math.max(0,e.hp-eStatusDmg);addLog(`> ${e.n} 受到 ${eStatusDmg} 点状态伤害`,'#a3e635');}
  // Fix: check both victory (enemy DoT killed) and defeat (player DoT killed) before enemy acts
  if(checkVictory())return;
  if(checkDefeat())return;
  // Enemy checks freeze
  if(e.statuses.freeze>0){addLog(`> ${e.n} 被冰封，跳过行动！`,'#67e8f9');endRound();return;}
  // Enemy AI: use skill or attack
  const slow=e.statuses.slow>0;
  const avail=e.skills.filter(sk=>sk.curCd<=0);
  const usesSk=avail.length>0&&Math.random()<0.5;
  let dmgToPlayer=0;
  if(usesSk){
    const sk=pick(avail);
    sk.curCd=sk.cd;
      if(sk.heal&&sk.heal>0){
        const healed=Math.floor(e.maxHp*sk.heal);
        e.hp=Math.min(e.maxHp,e.hp+healed);
        addLog(`> ${e.n} 使用【${sk.name}】，恢复 ${healed.toLocaleString()} 生命！`,'#4ade80');
        cbtShowDamage(healed,'cbt-enemy-card','heal');
      } else {
        const raw=Math.floor(sk.dmg*(slow?0.7:1));
        dmgToPlayer=calcDamageOnPlayer(raw,p);
        p.hp=Math.max(0,p.hp-dmgToPlayer);
        if(sk.status)applyStatus(p,sk.status,2);
        addLog(`> ${e.n} 使用【${sk.name}】！`,'var(--apex)');
        addLog(`> 你受到 ${dmgToPlayer.toLocaleString()} 点伤害`,'#f87171');
        cbtShowDamage(dmgToPlayer,'cbt-player-card','normal');cbtHitFlash('cbt-p-icon');cbtShake();
      }
    } else {
      const raw=Math.floor(e.atk*(slow?0.7:1));
      dmgToPlayer=calcDamageOnPlayer(raw,p);
      p.hp=Math.max(0,p.hp-dmgToPlayer);
      addLog(`> ${e.n} 发动普通攻击`,'var(--apex)');
      addLog(`> 你受到 ${dmgToPlayer.toLocaleString()} 点伤害`,'#f87171');
      cbtShowDamage(dmgToPlayer,'cbt-player-card','normal');cbtHitFlash('cbt-p-icon');cbtShake();
    }
  p._defending=false;
  if(checkDefeat())return;
  endRound();
}
function endRound(){
  const cs=combatState;if(!cs)return;
  cs.round++;
  if(cs.round>cs.maxRounds&&!cs.ended){
    addLog('> ⏰ 超时！撤退成功但未通关。','var(--dim)');
    cs.ended=true;
    addLog('','');
    addLog('> 战力不足，无法在规定回合内击败敌人。安慰奖：经验+200','var(--dim)');
    addExp(200);saveG();
    setTimeout(()=>renderCombat(),cs.speed==='fast'?100:300);
    return;
  }
  setTimeout(()=>renderCombat(),cs.speed==='fast'?50:200);
}
function calcDamage(atk,enemy,isSkill,player){
  let dmg=Math.floor(atk*(isSkill?1.4:1));
  if(player?.statuses?.weaken>0)dmg=Math.floor(dmg*0.8);
  const variance=0.9+Math.random()*0.2;
  return Math.max(1,Math.floor(dmg*variance));
}
function calcDamageOnPlayer(raw,player){
  let dmg=raw;
  if(player._defending)dmg=Math.floor(dmg*0.6);
  if(player.statuses.weaken>0)dmg=Math.floor(dmg*1.2);
  // Bone defense bonus
  const defBones=Object.values(G.equippedBones||{}).filter(b=>b&&b.bonus&&b.bonus.includes('防御')).length;
  if(defBones>0)dmg=Math.floor(dmg*(1-defBones*0.04));
  return Math.max(1,Math.floor(dmg*(0.9+Math.random()*0.2)));
}
function applyStatus(target,status,turns){
  if(!target.statuses)target.statuses={};
  if(status==='all'){['poison','burn','slow'].forEach(s=>target.statuses[s]=(target.statuses[s]||0)+turns);}
  else if(status==='poison2'){target.statuses.poison=(target.statuses.poison||0)+turns+1;}
  else{target.statuses[status]=(target.statuses[status]||0)+turns;}
  const labels={poison:'中毒',burn:'燃烧',slow:'减速',freeze:'冰封',weaken:'虚弱',all:'全状态'};
  addLog(`> 附加 ${labels[status]||status} 状态！`,'#a3e635');
}
function tickStatuses(entity){
  if(!entity.statuses)return;
  Object.keys(entity.statuses).forEach(k=>{if(entity.statuses[k]>0)entity.statuses[k]--;});
}
function tickSkillCooldowns(entity){
  (entity.skills||[]).forEach(sk=>{if(sk.curCd>0)sk.curCd--;});
}
function checkBossPhase(){
  const cs=combatState,e=cs.enemy;
  if(!e.phases)return;
  const pct=e.hp/e.maxHp;
  const newPhase=e.phases.filter(ph=>pct<=ph.threshold).length-1;
  if(newPhase>cs.phase){
    cs.phase=newPhase;
    const ph=e.phases[newPhase];
    if(ph.msg)addLog(`> ⚠ ${ph.msg}`,'var(--apex)');
    cbtBossTransition(ph.msg||'BOSS PHASE TRANSITION');
    if(ph.atkBoost)e.atk=Math.floor(e.atk*ph.atkBoost);
    if(ph.spdBoost)e.spd=Math.floor(e.spd*ph.spdBoost);
    spawnBurst('#ef4444',60);
  }
}
function checkVictory(){
  const cs=combatState,e=cs.enemy;
  if(e.hp>0)return false;
  cs.ended=true;
  addLog('','');
  addLog(`> 🏆 胜利！${e.n} 已被击败！`,'#22c55e');
  // Record clear
  initAbyssState();
  const prog=G.abyss.progress[cs.layer.id]||[];
  if(!prog.includes(cs.stage.id)){prog.push(cs.stage.id);G.abyss.progress[cs.layer.id]=prog;}
  G.abyss.wins++;G.abyss.streak++;
  // Rewards
  const isFirst=!G.abyss.firstClear[cs.stage.id];
  G.abyss.firstClear[cs.stage.id]=true;
  // V8: arena result
  if(cs.isArena){handleArenaResult(true);setTimeout(()=>renderCombat(),300);return true;}
  const shards=cs.stage.type==='boss'?60:cs.stage.type==='elite'?25:10;
  const expGain=cs.stage.type==='boss'?15000:cs.stage.type==='elite'?5000:1500;
  const spGain=cs.stage.type==='boss'?3000:cs.stage.type==='elite'?1000:300;
  G.abyss.shards+=shards;
  addExp(expGain);addSP(spGain,null);
  addLog(`> 获得: ${shards}碎片 / ${expGain}经验 / ${spGain}魂力`,'var(--gl)');
  if(isFirst){
    const firstReward=cs.stage.type==='boss'?'顶级星运券×2':cs.stage.type==='elite'?'高级星运券×2':'普通星运券×3';
    if(cs.stage.type==='boss'){addTicketToBag('apex',2);}
    else if(cs.stage.type==='elite'){addTicketToBag('advanced',2);}
    else{addTicketToBag('common',3);}
    addLog(`> 🌟 首通奖励: ${firstReward}`,'#ffd700');
    spawnBurst('#ffd700',100);
  }
  // v9: abyss elite/boss drop soul fragment
  if(G.soul&&(cs.stage.type==='elite'||cs.stage.type==='boss')){
    const fragQ=cs.stage.type==='boss'?'epic':'rare';
    addSoulFragment(fragQ,1);
    addLog(`> 🔮 武魂碎片·${QC[fragQ]?.n||fragQ} ×1`,'var(--gl)');
  }
  if(G.abyss.streak>=3){addLog(`> 🔥 ${G.abyss.streak}连胜！额外高级星运券×1`,'var(--legend)');addTicketToBag('advanced',1);}
  cs.lastRewards=`${shards}碎片 · ${expGain}经验 · ${spGain}魂力${isFirst?' · 🌟首通':''}`;
  saveG();
  setTimeout(()=>renderCombat(),cs.speed==='fast'?100:500);
  return true;
}
function checkDefeat(){
  const cs=combatState,p=cs.player;
  if(p.hp>0)return false;
  cs.ended=true;G.abyss.streak=0;
  // V8: arena defeat
  if(cs.isArena){handleArenaResult(false);setTimeout(()=>renderCombat(),300);return true;}
  addLog('','');
  addLog('> 💔 你的战斗意志已消耗殆尽...','#f87171');
  addLog('> 安慰奖：经验+500 · 碎片+2','var(--dim)');
  G.abyss.shards+=2;addExp(500);
  saveG();
  setTimeout(()=>renderCombat(),cs.speed==='fast'?100:500);
  return true;
}
function toggleCombatSpeed(){
  if(!combatState)return;
  combatState.speed=combatState.speed==='fast'?'normal':'fast';
  renderCombat();
}
function retreatCombat(){
  if(!combatState)return;
  addLog('> 你主动撤退，此战无功而返。','var(--dim)');
  combatState.ended=true;G.abyss.streak=0;saveG();
  renderCombat();
}
function closeCombat(){
  const ov=$('combat-ov');if(ov)ov.remove();
  combatState=null;combatLog=[];
  renderAbyssPage();
}
function nextStage(){
  if(!combatState)return;
  const cs=combatState;
  const curIdx=cs.layer.stages.findIndex(s=>s.id===cs.stage.id);
  const next=cs.layer.stages[curIdx+1];
  if(!next){closeCombat();return;}
  if(G.abyss.tokens<next.cost){notify('令牌不足，无法挑战下一关！','normal');closeCombat();return;}
  const layerId=cs.layer.id;
  // Close current combat
  const ov=$('combat-ov');if(ov)ov.remove();
  combatState=null;combatLog=[];
  // Enter next stage directly
  enterStage(next.id);
}

// ──── ABYSS SHOP ────
function openAbyssShop(){
  initAbyssState();
  const rows=ABYSS_SHOP.map(item=>{
    const ct=item.costType||'shards';
    const have=ct==='shards'?G.abyss.shards:G.sp;
    const canAfford=have>=item.cost;
    const costLabel=ct==='shards'?'🔮 '+item.cost+' 碎片':'💫 '+item.cost.toLocaleString()+' 魂力';
    // Group separator for tokens
    const isToken=item.id.startsWith('t');
    return`<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04)">
      <div style="font-size:${isToken?28:22}px">${item.i}</div>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:600;color:${isToken?'var(--gl)':'var(--txt)'}">${item.n}</div>
        <div style="font-size:10px;color:${ct==='sp'?'var(--hc)':'var(--gold)'}">${costLabel}</div>
      </div>
      <div class="m-btn ok" style="padding:5px 12px;font-size:10px;flex-shrink:0;${canAfford?'cursor:pointer':'opacity:.35;pointer-events:none'}" onclick="buyAbyssItem('${item.id}')">兑换</div>
    </div>`;
  }).join('');
  const tokenSection='<div style="font-size:10px;color:var(--gold);font-weight:600;margin:4px 0 2px">🔑 令牌补充</div>';
  const otherSection='<div style="font-size:10px;color:var(--dim);font-weight:600;margin:10px 0 2px">📦 其他道具</div>';
  const tokenRows=ABYSS_SHOP.filter(x=>x.id.startsWith('t')).map(item=>{
    const ct=item.costType||'shards';const have=ct==='shards'?G.abyss.shards:G.sp;const canAfford=have>=item.cost;
    const costLabel=ct==='shards'?'🔮 '+item.cost+' 碎片':'💫 '+item.cost.toLocaleString()+' 魂力';
    return`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">
      <div style="font-size:26px">${item.i}</div>
      <div style="flex:1"><div style="font-size:12px;font-weight:600;color:var(--gl)">${item.n}</div><div style="font-size:10px;color:${ct==='sp'?'var(--hc)':'var(--gold)'}">${costLabel}</div></div>
      <div class="m-btn ok" style="padding:5px 12px;font-size:10px;flex-shrink:0;${canAfford?'cursor:pointer':'opacity:.35;pointer-events:none'}" onclick="buyAbyssItem('${item.id}')">兑换</div>
    </div>`;
  }).join('');
  const otherRows=ABYSS_SHOP.filter(x=>x.id.startsWith('s')).map(item=>{
    const ct=item.costType||'shards';const have=ct==='shards'?G.abyss.shards:G.sp;const canAfford=have>=item.cost;
    const costLabel=ct==='shards'?'🔮 '+item.cost+' 碎片':'💫 '+item.cost.toLocaleString()+' 魂力';
    return`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">
      <div style="font-size:22px">${item.i}</div>
      <div style="flex:1"><div style="font-size:12px;font-weight:600;color:var(--txt)">${item.n}</div><div style="font-size:10px;color:var(--gold)">${costLabel}</div></div>
      <div class="m-btn ok" style="padding:5px 12px;font-size:10px;flex-shrink:0;${canAfford?'cursor:pointer':'opacity:.35;pointer-events:none'}" onclick="buyAbyssItem('${item.id}')">兑换</div>
    </div>`;
  }).join('');
  openModal(`<div class="m-title">🛒 世界兑换商店</div>
    <div class="m-sub">碎片: <span style="color:var(--gl);font-weight:700">${G.abyss.shards}</span> &nbsp;·&nbsp; 魂力: <span style="color:var(--gl);font-weight:700">${G.sp.toLocaleString()}</span></div>
    <div style="margin-top:8px">${tokenSection}${tokenRows}${otherSection}${otherRows}</div>`);
}
function buyAbyssItem(id){
  initAbyssState();
  const item=ABYSS_SHOP.find(x=>x.id===id);if(!item)return;
  const ct=item.costType||'shards';
  if(ct==='shards'){
    if(G.abyss.shards<item.cost){notify('碎片不足！需要'+item.cost+'碎片','normal');return;}
    G.abyss.shards-=item.cost;
    $set('ab-shards','textContent',G.abyss.shards);
  } else if(ct==='sp'){
    if(G.sp<item.cost){notify('魂力不足！需要'+item.cost+'魂力','normal');return;}
    G.sp-=item.cost;updateHUD();
  }
  item.fn();
  notify('✅ 兑换成功：'+item.n,'epic');
  saveG();afterAction(['bag']);
  openAbyssShop();
}

// ══════════════════════════════════════════════════
//  GM MODE
// ══════════════════════════════════════════════════
let gmLockState='locked'; // locked | auth | open
const GM_PASSWORD='dlgm2024';
let gmPressTimer=null;

function gmLongPressStart(){
  gmPressTimer=setTimeout(()=>{
    if(gmLockState==='locked'){
      const pw=prompt('请输入GM密码：');
      if(pw===GM_PASSWORD){gmLockState='open';openGM();}
      else if(pw!==null)notify('密码错误','normal');
    } else {
      openGM();
    }
  },3000);
}
function gmLongPressEnd(){clearTimeout(gmPressTimer);}
function openGM(){document.getElementById('gm-panel').classList.add('show');}
function closeGM(){document.getElementById('gm-panel').classList.remove('show');saveG();updateHUD();renderSoulPage();}

function gmAddSP(){const v=parseInt(document.getElementById('gm-sp-val').value)||10000;G.sp+=v;updateHUD();notify('+'+v+' 魂力（GM）','normal');}
function gmSetSP(){const v=parseInt(document.getElementById('gm-sp-val').value)||10000;G.sp=v;updateHUD();notify('魂力设为'+v,'normal');}
function gmSP(v){G.sp=v;updateHUD();notify('魂力设为'+v,'normal');}
function gmAddExp(v){addExp(v);notify('+'+v+' 经验（GM）','normal');}
function gmSetLevel(){
  const lv=parseInt(document.getElementById('gm-lv-val').value)||50;
  G.level=Math.max(1,Math.min(200,lv));G.exp=0;
  updateHUD();updateExpBar();renderSoulPage();
  notify('等级设为 Lv.'+G.level,'normal');
}
function gmAddPower(){const v=parseInt(document.getElementById('gm-pw-val').value)||100000;G.extraPower+=v;updateHUD();notify('+'+v+' 战力（GM）','normal');}
function gmTickets(pool,n,ten=false){addTicketToBag(pool,n,ten);saveG();notify(`${poolTicketName(pool)}${ten?'十连':''}×${n}已发放`,'epic');}
function gmDivineSoul(){
  if(!G.soul)return notify('请先觉醒武魂','normal');
  G.soul.divine=true;G.soul.quality='apex';
  G.soul.attrs=['神级','超越','混沌','极致'];
  notify('武魂已升为神级','divine');spawnBurst('#ffd700',80);renderSoulPage();
}
function gmChuSoul(){
  G.soul={id:Date.now(),name:'初',icon:'∞',quality:'triple',desc:'一切武魂的起源。',
    attrs:['宇宙','起源','终结'],initPow:100,rings:[],
    skills:[{name:'宇宙归一',desc:'超越一切已知边界。',params:['全属性×∞'],ring:0}],
    secondAwakened:false,divine:true,isChu:true};
  G.awakenDone=true;G.extraPower=10000000;
  notify('武魂「初」已获得','cosmic');spawnBurst('#00ffff',100);renderSoulPage();
}
function gmMaxRings(){
  if(!G.soul)return notify('请先觉醒武魂','normal');
  const targets=['百年','千年','万年','十万年','百万年','不可估量','神赐','宇宙之核','百年','千年'];
  G.soul.rings=[];G.soul.skills=(G.soul.skills||[]).slice(0,2);
  targets.forEach((tn,i)=>{
    const tier=RT.find(t=>t.n===tn)||RT[0];
    const sk=pick(tier.sk);
    G.soul.rings.push({id:Date.now()+i,n:tier.n,y:tier.y,c:tier.c,sk,pw:tier.pw,tier:tier.n});
    G.soul.skills.push({name:sk,desc:'GM赋予',params:['GM'],ring:i+1});
  });
  G.level=Math.max(G.level,100);
  notify('已装配10个魂环','legend');updateHUD();renderSoulPage();updateGodPath();
}
function gmAddRings(name,count){
  const tier=RT.find(t=>t.n===name)||RT[5];
  for(let i=0;i<count;i++){
    const ro={id:Date.now()+i,n:tier.n,y:tier.y,c:tier.c,sk:pick(tier.sk),pw:tier.pw,tier:tier.n};
    G.bag.push({type:'ring',data:ro,count:1,id:Date.now()+i+100});
  }
  notify(name+'×'+count+'已加入背包','epic');
}
function gmAddGodBone(){
  const godBones=[].concat(...Object.values(BONE_POOL).map(p=>p.filter(b=>b.god)));
  godBones.forEach(gb=>{G.bag.push({type:'bone',data:{...gb,pw:1000000,id:Date.now()+Math.random()},count:1,id:Date.now()+Math.random()});});
  notify('全部神赐魂骨已加入背包','cosmic');spawnBurst('#ffd700',60);
}
function gmEquipAllBones(){
  if(!G.soul)return;
  BONE_SLOTS.forEach(bs=>{
    const pool=BONE_POOL[slotBoneType(bs.s)]||BONE_POOL.head;
    const gb=pool.find(b=>b.god)||pool[pool.length-1];
    G.equippedBones[bs.s]={...gb,pw:1000000,id:Date.now()+Math.random()};
  });
  notify('全部部位已装备神赐魂骨','divine');updateHUD();renderSoulPage();
}
function gmAllArts(){
  ARTS.forEach(a=>{if(!G.bag.find(i=>i.type==='artifact'&&i.data.id===a.id))G.bag.push({type:'artifact',data:a,count:1,id:Date.now()+Math.random()});});
  notify('全部神器已加入背包','legend');
}
function gmExtremeArt(){
  const ea=ARTS.filter(a=>a.extreme);
  ea.forEach(a=>G.bag.push({type:'artifact',data:a,count:1,id:Date.now()+Math.random()}));
  notify('极致神器×'+ea.length+'已加入背包','cosmic');
}
function gmClearGodPath(){
  G.godTrials=(G.godTrials||JSON.parse(JSON.stringify(GOD_TRIALS))).map(t=>({...t,cleared:true}));
  notify('成神之路全部通关','divine');spawnBurst('#fca5a5',80);updateGodPath();renderSoulPage();
}
function gmCompleteAllTasks(){
  G.tasks.forEach(t=>{t.prog=t.g;});
  setTaskDot(true);renderTasks();
  notify('所有任务已完成，可领取奖励','epic');
}
function gmSeasonalBonus(){
  for(let i=0;i<5;i++)addTicketToBag('apex',1);
  notify('顶级星运券×5（踏春奖励）','divine');
}
function gmAllTitles(){
  Object.values(TITLES).forEach(pool=>pool.forEach(t=>{if(!G.titles.find(x=>x.n===t.n))G.titles.push(t);}));
  notify('全部称号已解锁','divine');spawnBurst('#ffd700',50);
}
function gmEquipBestTitle(){
  const best=G.titles.sort((a,b)=>(b.pw||0)-(a.pw||0))[0];
  if(best){G.equippedTitle=best;notify('已装备最强称号：'+best.n,'legend');renderSoulPage();}
}
function gmClearAllAbyss(){
  initAbyssState();
  ABYSS_LAYERS.forEach(l=>{G.abyss.progress[l.id]=l.stages.map(s=>s.id);l.stages.forEach(s=>{G.abyss.firstClear[s.id]=true;});});
  G.abyss.shards+=2000;notify('全副本通关·+2000碎片','divine');spawnBurst('#c084fc',80);
}
// ══════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════

// ══════════════════════════════════════════════════
//  武魂图鉴系统 (独立存档: dlv3-grimoire)
// ══════════════════════════════════════════════════
// Quality meta for grimoire
const GQ={
  common: {n:'普通',  c:'#9ca3af',r:156,g:163,b:175,glow:'rgba(156,163,175,.25)'},
  rare:   {n:'稀有',  c:'#3b82f6',r:59, g:130,b:246,glow:'rgba(59,130,246,.35)'},
  epic:   {n:'史诗',  c:'#8b5cf6',r:139,g:92, b:246,glow:'rgba(139,92,246,.4)'},
  legend: {n:'传说',  c:'#f59e0b',r:245,g:158,b:11, glow:'rgba(245,158,11,.4)'},
  apex:   {n:'顶级',  c:'#ef4444',r:239,g:68, b:68, glow:'rgba(239,68,68,.45)'},
  hc:     {n:'普通隐藏',c:'#10b981',r:16, g:185,b:129,glow:'rgba(16,185,129,.4)'},
  ha:     {n:'顶级隐藏',c:'#ec4899',r:236,g:72, b:153,glow:'rgba(236,72,153,.45)'},
  twin:   {n:'双生武魂',c:'#f0abfc',r:240,g:171,b:252,glow:'rgba(240,171,252,.45)'},
  triple: {n:'三生武魂',c:'#e2e8f0',r:226,g:232,b:240,glow:'rgba(226,232,240,.4)'},
};
// Flatten SD into array for grimoire
function getAllSouls(){
  const arr=[];
  Object.entries(SD).forEach(([q,souls])=>{
    souls.forEach(s=>arr.push({...s,q}));
  });
  return arr;
}

// Grimoire state — separate localStorage key, persists across resets
let GRIMOIRE={discovered:{}};  // {soulName: {firstSeen:timestamp, quality}}
function loadGrimoire(){
  try{const s=localStorage.getItem('dlv3-grimoire');if(s)GRIMOIRE=JSON.parse(s);}
  catch(e){GRIMOIRE={discovered:{}};}
}
function saveGrimoire(){
  try{localStorage.setItem('dlv3-grimoire',JSON.stringify(GRIMOIRE));}
  catch(e){}
}
function grimoireDiscover(soulName,quality){
  if(!GRIMOIRE.discovered[soulName]){
    GRIMOIRE.discovered[soulName]={firstSeen:Date.now(),quality};
    saveGrimoire();
    // Check full grimoire completion
    setTimeout(()=>checkGrimoireComplete(),300);
  }
}

// Call on awaken and on second awaken quality upgrade
loadGrimoire();
restoreGrimoirePerks();

// ── Sidebar state ──
let _gsRaf=null,_gsFilter='all',_gsSearch='';

function openGrimoire(){
  // Record current soul in grimoire
  if(G.soul)grimoireDiscover(G.soul.name,G.soul.quality);
  document.getElementById('grimoire-sidebar').classList.add('open');
  gsRenderGrid();
  setTimeout(gsInitGeo,60);
}
function closeGrimoire(){
  document.getElementById('grimoire-sidebar').classList.remove('open');
  gsCloseDetail();
  if(_gsRaf){cancelAnimationFrame(_gsRaf);_gsRaf=null;}
}
// Swipe left to close
(function(){
  let tx=0;
  const panel=document.querySelector('.gs-panel');
  if(!panel)return;
  panel.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
  panel.addEventListener('touchend',e=>{
    if(e.changedTouches[0].clientX-tx < -60)closeGrimoire();
  },{passive:true});
})();

// ── Left unified sidebar ──
function updateSidebar(){
  const s=G.soul;
  const hasSoul=!!s;
  // Soul icon & name
  const lsIco=$('ls-soul-ico');if(lsIco){const glow=lsIco.querySelector('.ls-soul-glow');lsIco.innerHTML=(glow?glow.outerHTML:'')+(hasSoul?getSoulIcon(s.name,s.quality,{sizeClass:'size-medium'}):'<span style="font-size:32px">🌀</span>');lsIco.style.display='flex';lsIco.style.alignItems='center';lsIco.style.justifyContent='center';}
  $set('ls-soul-name','textContent',hasSoul?s.name:'尚未觉醒');
  // Rank pills
  const rankEl=$('ls-soul-rank');
  if(rankEl)rankEl.textContent=hasSoul?(getCurrentRealm(G.level).n+'·Lv.'+G.level):'魂士·1级';
  const pills=$('ls-soul-pills');
  if(pills){
    if(hasSoul){
      const q=QC[s.quality]||QC.common;
      pills.innerHTML=`<div class="ls-pill" style="background:${q.bg};border-color:${q.bd};color:${q.c}">${q.n}</div>${s.divine?'<div class="ls-pill" style="background:rgba(255,215,0,.08);border-color:rgba(255,215,0,.25);color:#fbbf24">神级</div>':''}${s.secondAwakened?'<div class="ls-pill" style="background:rgba(139,92,246,.08);border-color:rgba(139,92,246,.25);color:#c4b5fd">二次觉醒</div>':''}`;
    }else{
      pills.innerHTML='<div class="ls-pill">武魂觉醒前</div>';
    }
  }
  // Stats
  $set('ls-stat-pow','textContent',calcPower().toLocaleString());
  $set('ls-stat-rings','textContent',(hasSoul?(s.rings||[]).length:0)+'/10');
  $set('ls-stat-honor','textContent',G.honorPoints||0);
  $set('ls-stat-awk','textContent','Lv.'+(G.awakenLevel||0));
  // Cards
  $set('ls-grim-cnt','textContent',Object.keys(GRIMOIRE.discovered||{}).length);
  $set('ls-awk-lv','textContent',G.awakenLevel||0);
  const talentEl=$('ls-talent-desc');
  if(talentEl){
    if(G.level>=91){
      talentEl.textContent=G.talent?(TALENTS.find(t=>t.id===G.talent)?.n||'已解锁'):'未选择';
    }else{
      talentEl.textContent='Lv.91解锁';
    }
  }
  // Check-in
  renderCheckInUI();
  // Header color
  const card=$('ls-soul-card');
  if(card)card.style.setProperty('--ls-col',hasSoul?(QC[s.quality]?.c||'#c9a227'):'#c9a227');
}
function toggleSidebar(){
  const sb=document.getElementById('left-sidebar');
  const btn=document.getElementById('menu-btn');
  if(!sb)return;
  const isOpen=sb.classList.contains('open');
  if(isOpen){
    sb.classList.remove('open');
    if(btn)btn.classList.remove('open');
  }else{
    updateSidebar();
    sb.classList.add('open');
    if(btn)btn.classList.add('open');
  }
}
function closeSidebar(){
  const sb=document.getElementById('left-sidebar');
  const btn=document.getElementById('menu-btn');
  if(sb)sb.classList.remove('open');
  if(btn)btn.classList.remove('open');
}
function openSidebar(){
  const sb=document.getElementById('left-sidebar');
  const panel=document.getElementById('ls-panel');
  const btn=document.getElementById('menu-btn');
  if(sb)sb.classList.add('open');
  if(panel)panel.style.display='';
  if(btn)btn.classList.add('open');
}
// Swipe left on panel to close left sidebar
(function(){
  let tx=0;
  const panel=document.getElementById('ls-panel');
  if(!panel)return;
  panel.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
  panel.addEventListener('touchend',e=>{
    if(e.changedTouches[0].clientX-tx < -60)closeSidebar();
  },{passive:true});
})();




function gsFilter(q,el){
  _gsFilter=q;
  document.querySelectorAll('.gf').forEach(f=>f.classList.remove('active'));
  el.classList.add('active');
  gsRenderGrid();
}
function gsSearch(v){_gsSearch=v.trim().toLowerCase();gsRenderGrid();}

// ── 全图鉴完成奖励（单一触发，永久保留）──
function checkGrimoireComplete(){
  if(GRIMOIRE.completionClaimed)return;
  const allSouls=getAllSouls();
  const found=allSouls.filter(s=>GRIMOIRE.discovered[s.n]).length;
  if(found<allSouls.length)return;
  // All 101 collected!
  GRIMOIRE.completionClaimed=true;
  saveGrimoire();
  // Rewards
  addTicketToBag('apex',20,true);                       // 顶级十连券×20
  G.extraPower+=200000;                                  // 战力+200,000
  addExp(500000);                                        // 经验+500,000
  // Exclusive title
  const t={n:'武魂传承者',c:'#ffd700',
    d:'收集斗罗大陆全部101种武魂，永载史册的传承者。',
    pw:5000,bonus:'全属性+50%,攻击无视防御10%'};
  if(!G.titles.find(x=>x.n===t.n))G.titles.push(t);
  if(!GRIMOIRE.titles)GRIMOIRE.titles=[];
  GRIMOIRE.titles.push('武魂传承者');
  // Permanent power multiplier stored in grimoire
  GRIMOIRE.powerMultiplier=1.1;
  saveGrimoire();updateHUD();saveG();
  setTimeout(()=>showGrimoireComplete(),400);
}

// Restore permanent title and multiplier after reset
function restoreGrimoirePerks(){
  if(!GRIMOIRE.completionClaimed)return;
  const name='武魂传承者';
  if(!G.titles.find(t=>t.n===name))
    G.titles.push({n:name,c:'#ffd700',d:'收集斗罗大陆全部101种武魂，永载史册的传承者。',pw:5000,bonus:'全属性+50%,攻击无视防御10%'});
}

function showGrimoireComplete(){
  let ov=document.getElementById('gs-complete-ov');if(ov)return;
  ov=document.createElement('div');ov.id='gs-complete-ov';
  ov.style.cssText='position:fixed;inset:0;z-index:600;background:rgba(0,0,0,.96);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;cursor:pointer;overflow:hidden';
  ov.innerHTML=`
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 38%,rgba(255,215,0,.14),transparent 62%);pointer-events:none"></div>
    <div style="font-size:64px;filter:drop-shadow(0 0 22px #ffd700);animation:solIconFloat 2.5s ease infinite;margin-bottom:14px;position:relative;z-index:1">📖</div>
    <div style="font-size:10px;color:rgba(255,215,0,.55);letter-spacing:4px;margin-bottom:7px;z-index:1">SOUL GRIMOIRE · COMPLETE</div>
    <div style="font-family:'Ma Shan Zheng',serif;font-size:26px;color:#ffd700;letter-spacing:5px;text-shadow:0 0 22px rgba(255,215,0,.7);margin-bottom:5px;z-index:1">武魂传承者</div>
    <div style="font-size:11px;color:rgba(255,255,255,.35);margin-bottom:22px;letter-spacing:1px;z-index:1">斗罗大陆全部101种武魂，已永载图鉴</div>
    <div style="display:flex;flex-direction:column;gap:7px;width:100%;max-width:290px;margin-bottom:26px;z-index:1">
      ${[['🏆','顶级十连星运券 ×20'],['⚔️','战力 +200,000'],['💫','经验 +500,000'],
         ['👑','专属称号「武魂传承者」'],['✨','永久战力 ×1.1 加成']].map(([ico,txt])=>
        `<div style="display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:10px;background:rgba(255,215,0,.07);border:1px solid rgba(255,215,0,.22);font-size:11px;color:#fef9c3">
          <span style="font-size:16px">${ico}</span>${txt}
        </div>`).join('')}
    </div>
    <div style="font-size:11px;color:rgba(255,255,255,.28);animation:blk 1.5s infinite;z-index:1">点击任意处关闭</div>`;
  ov.onclick=()=>ov.remove();
  document.body.appendChild(ov);
  spawnBurst('#ffd700',250);
  setTimeout(()=>spawnBurst('#00ffff',120),300);
  notify('📖 武魂传承者！全101种武魂图鉴完成！奖励已发放！','cosmic');
}

function gsRenderGrid(){
  const SPECIAL=['hc','ha','twin','triple'];
  let list=getAllSouls();
  if(_gsFilter==='special')list=list.filter(s=>SPECIAL.includes(s.q));
  else if(_gsFilter!=='all')list=list.filter(s=>s.q===_gsFilter);
  if(_gsSearch)list=list.filter(s=>
    s.n.toLowerCase().includes(_gsSearch)||
    (s.a||[]).some(a=>a.toLowerCase().includes(_gsSearch))
  );
  // Sort: found first, then by quality tier
  const TIER={common:0,rare:1,epic:2,legend:3,apex:4,hc:5,ha:6,twin:7,triple:8};
  const found=list.filter(s=>GRIMOIRE.discovered[s.n]);
  const unfound=list.filter(s=>!GRIMOIRE.discovered[s.n]);
  found.sort((a,b)=>TIER[b.q]-TIER[a.q]);
  const sorted=[...found,...unfound];

  const total=Object.keys(GRIMOIRE.discovered).length;
  const allTotal=getAllSouls().length;
  $set('gs-found','textContent',total);
  $set('gs-pct','textContent',Math.round(total/allTotal*100)+'%');

  const grid=$('gs-grid');if(!grid)return;
  grid.innerHTML=sorted.map((s,i)=>{
    const qc=GQ[s.q]||GQ.common;
    const isFound=!!GRIMOIRE.discovered[s.n];
    const isCurrent=G.soul&&G.soul.name===s.n;
    const delay=(i%15)*0.1;
    return`<div class="gc ${isFound?'found':'unfound'}"
      style="${isFound?`--qr:${qc.r};--qg:${qc.g};--qb:${qc.b};--qbdr:${qc.c}55;--sd:${5+i%6}s;--dl:${delay}s`:''}"
      onclick="${isFound?`gsShowDetail('${encodeURIComponent(s.n)}')`:''}"
    >
      <div class="gc-ico" style="display:flex;align-items:center;justify-content:center;height:40px;">${isFound?getSoulIcon(s.n,s.q,{sizeClass:'size-small',animated:false}):'<span style="font-size:28px;">❓</span>'}</div>
      <div class="gc-name">${isFound?s.n:'???'}</div>
      <div class="gc-q" style="${isFound?`color:${qc.c}`:''}">
        ${isFound?qc.n:'未知'}
      </div>
      ${isCurrent?`<div class="gc-owned" style="background:${qc.c};box-shadow:0 0 5px ${qc.c}">★</div>`:''}
    </div>`;
  }).join('');
}

function gsShowDetail(encodedName){
  const name=decodeURIComponent(encodedName);
  const s=getAllSouls().find(x=>x.n===name);if(!s)return;
  const qc=GQ[s.q]||GQ.common;
  const isCurrent=G.soul&&G.soul.name===s.n;
  const rec=GRIMOIRE.discovered[s.n];
  const firstDate=rec?new Date(rec.firstSeen).toLocaleDateString('zh-CN'):'';
  $set('gs-d-content','innerHTML',`
    <div class="gs-d-top">
      <div class="gs-d-ico-wrap">
        <span class="gs-d-ico" style="display:flex;align-items:center;justify-content:center;">${getSoulIcon(s.n,s.q,{sizeClass:''})}</span>
        <div class="gs-d-glow" style="--qglow:${qc.glow}"></div>
      </div>
      <div class="gs-d-info">
        <div class="gs-d-name" style="color:${qc.c};text-shadow:0 0 14px ${qc.glow}">${s.n}</div>
        <div class="gs-d-qtag" style="color:${qc.c};border-color:${qc.c}50;background:rgba(${qc.r},${qc.g},${qc.b},.1)">
          <div class="gs-d-qdot" style="background:${qc.c};box-shadow:0 0 5px ${qc.c}"></div>
          ${qc.n}品质
        </div>
        <div class="gs-d-desc">${s.d}</div>
      </div>
    </div>
    <div class="gs-d-attrs">${(s.a||[]).map(a=>`<div class="gs-d-attr">${a}</div>`).join('')}</div>
    <div class="gs-d-row">
      <span class="gs-d-row-l">初始魂力等级</span>
      <span class="gs-d-row-v" style="color:${qc.c}">${s.p}</span>
    </div>
    ${firstDate?`<div class="gs-d-row">
      <span class="gs-d-row-l">首次觉醒</span>
      <span class="gs-d-row-v" style="font-size:11px;color:var(--dim)">${firstDate}</span>
    </div>`:''}
    <div class="gs-d-status ${isCurrent?'current':'owned'}">
      ${isCurrent?'★ 当前武魂 · 正在修炼':'✅ 已觉醒 · 永久存档于图鉴'}
    </div>`);
  document.getElementById('gs-detail').classList.add('show');
}
function gsCloseDetail(){
  const d=$('gs-detail');if(d)d.classList.remove('show');
}
// Tap handle to close detail
document.addEventListener('DOMContentLoaded',()=>{
  const det=$('gs-detail');
  if(det){
    let ty=0;
    det.addEventListener('touchstart',e=>ty=e.touches[0].clientY,{passive:true});
    det.addEventListener('touchend',e=>{if(e.changedTouches[0].clientY-ty>48)gsCloseDetail();},{passive:true});
  }
});

// Grimoire header geo canvas
function gsInitGeo(){
  const cvs=$('gs-hd-cvs');if(!cvs||_gsRaf)return;
  const hd=cvs.closest('.gs-hd');if(!hd)return;
  const rect=hd.getBoundingClientRect();
  cvs.width=rect.width||340;cvs.height=rect.height||145;
  const ctx=cvs.getContext('2d');
  const rings=[
    {rx:88,ry:63,spd:.0018,dir:1, op:.14},
    {rx:132,ry:95,spd:.0011,dir:-1,op:.09,dash:true},
    {rx:178,ry:128,spd:.0006,dir:1, op:.06,dash:true},
  ];
  const ang=rings.map((_,i)=>i*Math.PI*.5);
  function draw(){
    ctx.clearRect(0,0,cvs.width,cvs.height);
    const cx=cvs.width*.8,cy=cvs.height*.5;
    const gr=ctx.createRadialGradient(cx,cy,0,cx,cy,cvs.width*.55);
    gr.addColorStop(0,'rgba(139,92,246,.13)');gr.addColorStop(1,'transparent');
    ctx.fillStyle=gr;ctx.fillRect(0,0,cvs.width,cvs.height);
    rings.forEach((r,ri)=>{
      ang[ri]+=r.spd*r.dir;
      ctx.save();ctx.translate(cx,cy);ctx.rotate(ang[ri]);
      ctx.setLineDash(r.dash?[4,7]:[]);
      ctx.beginPath();ctx.ellipse(0,0,r.rx,r.ry,0,0,Math.PI*2);
      ctx.strokeStyle=`rgba(139,92,246,${r.op})`;ctx.lineWidth=1;ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();ctx.arc(r.rx,0,2,0,Math.PI*2);
      ctx.fillStyle=`rgba(139,92,246,${r.op*6})`;
      ctx.shadowBlur=7;ctx.shadowColor='rgba(139,92,246,.9)';ctx.fill();
      ctx.shadowBlur=0;ctx.restore();
    });
    _gsRaf=requestAnimationFrame(draw);
  }
  draw();
}

// Achievement header geo canvas
function achInitGeo(){
  const cvs=$('ach-hd-cvs');if(!cvs||_achRaf)return;
  const hd=cvs.closest('.ach-hd');if(!hd)return;
  const rect=hd.getBoundingClientRect();
  cvs.width=rect.width||340;cvs.height=rect.height||160;
  const ctx=cvs.getContext('2d');
  const rings=[
    {rx:88,ry:63,spd:.0018,dir:1, op:.14},
    {rx:132,ry:95,spd:.0011,dir:-1,op:.09,dash:true},
    {rx:178,ry:128,spd:.0006,dir:1, op:.06,dash:true},
  ];
  const ang=rings.map((_,i)=>i*Math.PI*.5);
  function draw(){
    ctx.clearRect(0,0,cvs.width,cvs.height);
    const cx=cvs.width*.8,cy=cvs.height*.5;
    const gr=ctx.createRadialGradient(cx,cy,0,cx,cy,cvs.width*.55);
    gr.addColorStop(0,'rgba(201,162,39,.13)');gr.addColorStop(1,'transparent');
    ctx.fillStyle=gr;ctx.fillRect(0,0,cvs.width,cvs.height);
    rings.forEach((r,ri)=>{
      ang[ri]+=r.spd*r.dir;
      ctx.save();ctx.translate(cx,cy);ctx.rotate(ang[ri]);
      ctx.setLineDash(r.dash?[4,7]:[]);
      ctx.beginPath();ctx.ellipse(0,0,r.rx,r.ry,0,0,Math.PI*2);
      ctx.strokeStyle=`rgba(201,162,39,${r.op})`;ctx.lineWidth=1;ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();ctx.arc(r.rx,0,2,0,Math.PI*2);
      ctx.fillStyle=`rgba(201,162,39,${r.op*6})`;
      ctx.shadowBlur=7;ctx.shadowColor='rgba(201,162,39,.9)';ctx.fill();
      ctx.shadowBlur=0;ctx.restore();
    });
    _achRaf=requestAnimationFrame(draw);
  }
  draw();
}

// ── Cultivate Widget Geo Canvas ──
let _cwGeoRaf=null;
function stopCwGeo(){if(_cwGeoRaf){cancelAnimationFrame(_cwGeoRaf);_cwGeoRaf=null;}}
function initCwGeo(){
  // 修炼几何动画已禁用
  return;
}

// 安全地隐藏觉醒屏幕（如果已觉醒）
try {
  if (G.awakenDone) {
    const saEl = document.getElementById('SA');
    if (saEl) saEl.style.display = 'none';
  }
} catch(e) {
  console.error('初始化觉醒页面状态失败:', e);
}
// v9: All state migration handled by migrateState() called at load time.
// Legacy compat — belt-and-suspenders for fields that pre-date migration
if(!G.godTrials)G.godTrials=JSON.parse(JSON.stringify(GOD_TRIALS));
if(!G.equippedBones)G.equippedBones={};
if(!G.refreshCount)G.refreshCount=0;
if(!G.lotTopCount)G.lotTopCount=0;
if(!G.powerMilestones)G.powerMilestones=[];
if(!G.specialPathProgress)G.specialPathProgress={};
if(!G.seasonal)G.seasonal={completions:{s1:0,s2:0,s3:0,s4:0,s5:0},s2count:0,s4count:0,s5milestone:0};
if(!G.abyss)G.abyss={tokens:10,maxTokens:10,lastTokenTime:Date.now(),shards:0,progress:{},curLayer:1,firstClear:{},wins:0,streak:0,totalBattles:0};
if(!G.godChoice)G.godChoice=null;
if(!G.godType)G.godType=null;
if(!G.godExamProgress)G.godExamProgress={};
if(G.equippedTitle===undefined)G.equippedTitle=null;
if(G.taskDotPending===undefined)G.taskDotPending=false;
if(G.easterEggSeen===undefined)G.easterEggSeen=false;
if(G.newbieGiftClaimed===undefined)G.newbieGiftClaimed=false;
// v9 fields (also done in migrateState, kept as safety net)
if(!G.unlockedSystems)G.unlockedSystems={bone:false,fusion:false,specialPathPreview:false};
if(!G.unlockNotified)G.unlockNotified={bone:false,fusion:false,specialPathPreview:false};
if(!G.godTrialWill)G.godTrialWill={};
if(!G.soulFragments)G.soulFragments={};
if(!G.soulResonance)G.soulResonance={level:0,totalFragments:0};
if(!G.soulEvolutions)G.soulEvolutions={};
if(!G.activity)G.activity={id:'springFestival',name:'踏春欧皇',active:true,startTime:Date.now(),duration:14*24*3600*1000,currency:0,shop:[],shopClaimed:{},tasks:{}};
// Auto-unlock for players who already passed the level thresholds before v9
checkContentUnlocks();

updateHUD();updateExpBar();
initBagFabDrag();
mergeTaskModulesIntoHunt();
if(!G.tasks.length)genTasks();
renderSoulPage();renderLotPage();
updateActivityHUD();
setTimeout(()=>{
  updateCultUI();
  updateGodPath();
  if(G.tasks.some(t=>t.prog>=t.g&&!t.claimed))setTaskDot(true);
  checkPowerMilestones();
  if(G.awakenDone&&!G.newbieGiftClaimed)checkNewbieGift();
  // Abyss dock lock state
  const niAbyss=$('ni-abyss');
  if(niAbyss){
    if(G.level<30){niAbyss.style.opacity='.4';$set('abyss-lbl','textContent','异界');}
    else{niAbyss.style.opacity='1';}
  }
  // V8 init
  v8Init();
  renderCalendar();
},100);

// ══════════════════════════════════════════════════════════
//  V8 COMPLETE SYSTEMS
// ══════════════════════════════════════════════════════════

// REALMS moved to top of script
// (const moved up)// (const moved up)
function openAwakenLevel(){
  if(!G.soul){notify('请先觉醒武魂','normal');return;}
  const lv=G.awakenLevel||0;
  const qc=QC[G.soul.quality]||QC.common;
  const frags=Object.values(G.soulFragments||{}).reduce((a,b)=>a+b,0);
  const nextCost=lv<10?AWK_FRAG_COSTS[lv+1]:null;
  const canUp=nextCost&&frags>=nextCost;
  const isMax=lv>=10;
  // 觉醒主色调使用紫色系
  const awkG='#a78bfa';

  // Stars arc with current glow
  const starsH=Array(10).fill(0).map((_,i)=>{
    let cls='awk-star'+(i<lv?' lit':'')+(i===lv-1?' current':'');
    // Stagger animation delay
    return `<div class="${cls}" style="animation-delay:${i*0.12}s"></div>`;
  }).join('');

  // ∞ emblem for max level
  const infH=isMax?`<div class="awk-infinity">∞</div>`:'';
  const heroH=`<div class="awk-hero" style="--soul-col:${awkG};--soul-r:167;--soul-g:139;--soul-b:250">
    <div class="awk-lv-badge"><div class="awk-dot"></div>觉醒等级</div>
    ${isMax?`<div class="awk-max-badge">✦ 极限形态 · 封神之境 ✦</div>`:''}
    ${isMax?infH:`<div class="awk-level-number">Lv.${lv}/10</div>`}
    <div class="awk-sub" style="color:var(--dim)">${isMax?'已达觉醒之巅':'觉醒 Lv.'+lv+'/10'}</div>
    <div class="awk-power">+${(AWK_POWER_BONUS[lv]||0).toLocaleString()} 战力</div>
    <div class="awk-star-arc">${starsH}</div>
  </div>`;

  // Fragment bar
  const fragH=`<div class="awk-frag-bar" style="--soul-col:${awkG}">
    <span class="awk-frag-n">${frags}</span>
    <span class="awk-frag-l">通用碎片</span>
    ${nextCost?`<span class="awk-frag-next">· 升级需 <span>${nextCost}</span></span>`:`<span class="awk-frag-next">· 巅峰已至</span>`}
  </div>`;

  // Level list
  const listH=Array(10).fill(0).map((_,i)=>{
    const l=i+1;
    const isActive=i===lv;
    const isDone=i<lv;
    return `<div class="awk-list-item${isActive?' active':''}${isDone?' done':''}" style="${isActive?`--soul-r:167;--soul-g:139;--soul-b:250`:''}">
      <span class="awk-li-lv" style="color:${isActive?awkG:isDone?'rgba(255,255,255,.25)':'rgba(255,255,255,.6)'}">
        ${isDone?'✅ ':isActive?'✦ ':'· '}Lv.${l}
      </span>
      <span class="awk-li-fx">${AWK_FX[l]||''}</span>
      <span class="awk-li-pw" style="color:${isActive?awkG:'var(--dim)'}">+${AWK_POWER_BONUS[l].toLocaleString()}</span>
    </div>`;
  }).join('');

  openModal(`<div class="m-title" style="color:${awkG};display:flex;align-items:center;gap:8px;">
    <span style="display:flex;align-items:center;">${getSoulIcon(G.soul.name,G.soul.quality,{sizeClass:'size-small'})}</span>
    <span>${G.soul.name} · 觉醒</span>
  </div>
  ${heroH}
  ${fragH}
  <div class="awk-list">${listH}</div>
  ${canUp?`<div class="awk-upgrade-btn" onclick="doAwakenUp()" style="--soul-col:${awkG}">✦ 突破觉醒 Lv.${lv+1} (${nextCost}碎片)</div>`:isMax?'':''}
  `);
}
function doAwakenUp(){
  if(!G.soul)return;
  const lv=G.awakenLevel||0;if(lv>=10){notify('已满级','normal');return;}
  const cost=AWK_FRAG_COSTS[lv+1];
  if(Object.values(G.soulFragments||{}).reduce((a,b)=>a+b,0)<cost){notify('碎片不足','normal');return;}
  let remain=cost;for(const k of Object.keys(G.soulFragments||{})){if(remain<=0)break;const v=G.soulFragments[k]||0;const use=Math.min(v,remain);G.soulFragments[k]=v-use;remain-=use;}
  G.awakenLevel=(lv+1);
  const qc=QC[G.soul.quality]||QC.common;
  notify(`✦ 武魂觉醒 Lv.${G.awakenLevel}！${AWK_FX[G.awakenLevel]}`,'divine');
  flashScreen(qc.c,350);
  screenShake(450);
  spawnBurst(qc.c,100);
  setTimeout(()=>spawnBurst('#ffffff',60),150);
  setTimeout(()=>spawnRingBurst(qc.c,40,2),300);
  updateHUD();saveG();renderSoulPage();$remCls('modal','show');
  if(G.awakenLevel>=10)checkAchievement('awaken10');
}

// (moved to top)
let _achFilter='all',_achRaf=null;
function openAchievements(){
  const sb=$('ach-sidebar');if(!sb)return;
  sb.classList.add('open');
  checkAchievements();renderAchievements();
  // swipe close
  const panel=$('ach-panel');
  if(panel&&!panel._swipe){
    panel._swipe=true;
    let tx=0;
    panel.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;},{passive:true});
    panel.addEventListener('touchend',e=>{if(e.changedTouches[0].clientX-tx < -60)closeAchievements();},{passive:true});
  }
}
function closeAchievements(){const sb=$('ach-sidebar');if(sb)sb.classList.remove('open');}
function achFilter(f,el){
  _achFilter=f;
  document.querySelectorAll('.ach-tab').forEach(t=>t.classList.remove('active'));
  if(el)el.classList.add('active');
  renderAchievements();
}
function renderAchievements(){
  const list=$('ach-list');if(!list)return;
  const items=_achFilter==='all'?ACH_DEF:ACH_DEF.filter(a=>a.cat===_achFilter);
  const unlocked=ACH_DEF.filter(a=>G.achievements?.[a.id]);
  const total=unlocked.reduce((s,a)=>s+a.pts,0);
  $set('ach-unlocked-cnt','textContent',unlocked.length);
  $set('ach-total-cnt','textContent',ACH_DEF.length);
  $set('ach-honor-disp','textContent',total);
  list.innerHTML=items.map(a=>{
    const done=!!(G.achievements?.[a.id]);
    const ts=done?new Date(G.achievements[a.id].ts).toLocaleDateString('zh-CN'):'';
    return`<div class="ach-card ${done?'unlocked':'locked'}" style="--ac:${a.col}">
      <div class="ach-ico-wrap">${a.ico}</div>
      <div class="ach-body">
        <div class="ach-name">${done?a.n:'???'}</div>
        <div class="ach-desc">${done?a.desc:'完成特定条件解锁'}</div>
        ${done?`<div class="ach-date">解锁: ${ts}</div>`:''}
      </div>
      <div class="ach-pts">
        <div class="ach-pts-v" style="color:${done?a.col:'var(--dim)'}">${a.pts}</div>
        <div class="ach-pts-l">荣耀</div>
      </div>
    </div>`;
  }).join('');
}
function checkAchievement(idHint){
  if(!G.achievements)G.achievements={};
  ACH_DEF.forEach(a=>{
    if(!G.achievements[a.id]){
      let passed=false;
      try{passed=a.check();}catch(e){}
      if(passed){
        G.achievements[a.id]={ts:Date.now()};
        G.honorPoints=(G.honorPoints||0)+a.pts;
        $set('hud-honor','textContent',G.honorPoints);
        notify(`🏆 成就解锁：${a.n}！荣耀+${a.pts}`,'legend');
        spawnBurst(a.col||'#ffd700',55);
        saveG();
      }
    }
  });
}
function checkAchievements(){checkAchievement();}

// (moved to top)
function getTidalState(poolIdx){
  const pulls=(G.tidalPulls||[0,0,0])[poolIdx]||0;
  let state=TIDAL_STATES[0];
  for(const s of TIDAL_STATES){if(pulls>=s.threshold)state=s;else break;}
  return{state,pulls};
}
function updateTidalUI(poolIdx){
  const {state,pulls}=getTidalState(poolIdx);
  const fillEl=$('tidal-bar-fill'),lblEl=$('tidal-state-lbl'),nextEl=$('tidal-next-lbl'),cntEl=$('tidal-pull-cnt');
  if(!fillEl)return;
  const pct=Math.min(100,(pulls/TIDAL_MAX)*100);
  fillEl.style.background=state.fill;
  fillEl.style.width=pct+'%';
  if(lblEl){lblEl.textContent=state.n;lblEl.style.color=state.col;}
  const stIdx=TIDAL_STATES.indexOf(state);
  const next=TIDAL_STATES[stIdx+1];
  if(nextEl)nextEl.textContent=next?`${state.n}→${next.n} ${next.threshold}点`:'已达巅峰！';
  if(cntEl)cntEl.textContent=pulls+'点';
  // Auto reset if past TIDAL_MAX
  if(pulls>=TIDAL_MAX){
    if(!G.tidalPulls)G.tidalPulls=[0,0,0];
    G.tidalPulls[poolIdx]=0;
    notify('🍀 巅峰触发！本次必获顶级奖励！','cosmic');
    spawnBurst('#00ffff',80);
  }
}

// (moved to top)
function isTodayCheckedIn(){
  const now=Date.now(),dayMs=86400000;
  const last=G.calendarLastLogin||0;
  return Math.floor(now/dayMs)===Math.floor(last/dayMs);
}
function checkCalendarLogin(){
  // Only track streak on page load, rewards are claimed via sidebar check-in button
  // If user already checked in today, do nothing
  const now=Date.now(),dayMs=86400000;
  const last=G.calendarLastLogin||0;
  const daysSince=Math.floor((now-last)/dayMs);
  if(daysSince===0)return; // already checked in today
  // Don't auto-claim — user must click the sidebar button to claim
  // Just refresh the UI so the button shows correctly
  renderCalendar();
  updateSidebar();
}
function renderCalendar(){
  const row=document.getElementById('cal-days-row');if(!row)return;
  const streak=G.calendarStreak||0;
  const dayInCycle=streak===0?0:(streak-1)%7;
  const sn=document.getElementById('cal-streak-n');if(sn)sn.textContent=streak;
  row.innerHTML=CAL_REWARDS.map((r,i)=>{
    const done=i<dayInCycle;
    const today=i===dayInCycle&&streak>0;
    const isBonus=i===6;
    let cls='cal-day'+(isBonus?' bonus':today?' today':done?' done':'');
    return`<div class="${cls}">
      <div class="cal-day-n">第${i+1}天</div>
      <div class="cal-day-ico">${done?'✅':r.ico}</div>
      <div class="cal-day-lbl">${r.lbl.slice(0,4)}</div>
    </div>`;
  }).join('');
}

// ──── Daily Check-In (sidebar inline) ────
function renderCheckInUI(){
  const daysEl=$('ls-ci-days');
  const btnWrap=$('ls-ci-btn-wrap');
  const streakEl=$('ls-ci-streak');
  if(!daysEl||!btnWrap)return;
  const streak=G.calendarStreak||0;
  const checkedIn=isTodayCheckedIn();
  const dayInCycle=streak===0?0:(streak-1)%7;
  if(streakEl)streakEl.textContent='🔥 连续'+streak+'天';
  daysEl.innerHTML=CAL_REWARDS.map((r,i)=>{
    const done=i<dayInCycle||(i===dayInCycle&&checkedIn);
    const isToday=i===dayInCycle;
    const isBonus=i===6;
    let cls='ls-ci-day'+(isBonus?' bonus':isToday&&!checkedIn?' today':done?' done':'');
    return`<div class="${cls}">
      <div class="ls-ci-day-ico">${done?'✅':r.ico}</div>
      <div class="ls-ci-day-n">${isBonus?'🎁':'D'+(i+1)}</div>
    </div>`;
  }).join('');
  btnWrap.innerHTML=checkedIn
    ?'<div class="ls-ci-btn checked">✅ 今日已签到</div>'
    :'<div class="ls-ci-btn" id="ls-ci-claim-btn" onclick="claimDailyReward()">签到领取</div>';
}
function claimDailyReward(){
  if(isTodayCheckedIn())return;
  // Immediately disable button to prevent double-click
  const btn=$('ls-ci-claim-btn');
  if(btn){btn.onclick=null;btn.textContent='签到中...';btn.style.opacity='.5';btn.style.pointerEvents='none';}
  const now=Date.now(),dayMs=86400000;
  const last=G.calendarLastLogin||0;
  const daysSince=Math.floor((now-last)/dayMs);
  // Update streak & timestamp FIRST to prevent double-claim
  if(daysSince>1){G.calendarStreak=1;G.calendarLastLogin=now;}
  else if(daysSince===1){G.calendarStreak=(G.calendarStreak||0)+1;G.calendarLastLogin=now;}
  else{G.calendarLastLogin=now;} // same day edge case safety
  saveG(); // persist immediately before granting reward
  // Now grant reward
  const dayInCycle=(G.calendarStreak-1)%7;
  const rew=CAL_REWARDS[dayInCycle];
  if(rew){
    rew.fn();
    notify(`📅 签到成功！第${dayInCycle+1}天：${rew.lbl}`,'divine');
    spawnBurst('#ffd700',60);
  }
  if(G.calendarStreak>=7)checkAchievement('calendar7');
  renderCalendar();
  updateSidebar();
}

// ──── Sidebar Tasks (inline) ────
function toggleSection(listId,foldId){
  const list=$(listId);
  const fold=$(foldId);
  if(!list||!fold)return;
  const collapsed=list.classList.toggle('collapsed');
  fold.classList.toggle('collapsed',collapsed);
}
function resetDailyTasksIfStale(){
  const dayMs=86400000;
  const lastDay=Math.floor((G.taskRT||0)/dayMs);
  const today=Math.floor(Date.now()/dayMs);
  if(today>lastDay){
    // New day: regenerate daily tasks, clear hidden tasks
    genTasks();
    G.hiddenTasks=[];
    saveG();
  }
}
function renderSidebarTasks(){
  resetDailyTasksIfStale();
  if(!G.tasks.length)genTasks();
  const dailyEl=$('ls-daily-tasks');
  const hiddenEl=$('ls-hidden-tasks');
  const hintEl=$('ls-hidden-hint');
  if(!dailyEl)return;
  // Daily tasks
  dailyEl.innerHTML=G.tasks.map(t=>{
    const pct=Math.min(100,(t.prog/t.g)*100);
    const done=t.prog>=t.g;
    const cls='ls-stask'+(t.claimed?' claimed':done?' claimable':'');
    const btnCls=done?(t.claimed?'done':'do'):'wait';
    const btnTxt=t.claimed?'已领':done?'领取':'进行中';
    return`<div class="${cls}">
      <div class="ls-stask-ico">${t.i}</div>
      <div class="ls-stask-body">
        <div class="ls-stask-name">${t.n}</div>
        <div class="ls-stask-prog">${Math.min(t.prog,t.g)}/${t.g}</div>
        <div class="ls-stask-pb"><div class="ls-stask-pf" style="width:${pct}%"></div></div>
      </div>
      <div class="ls-stask-btn ${btnCls}" ${done&&!t.claimed?`onclick="claimSidebarTask('${t.id}')"`:''}>${btnTxt}</div>
    </div>`;
  }).join('');
  // Hidden tasks
  const ht=G.hiddenTasks||[];
  if(hiddenEl){
    if(!ht.length){
      hiddenEl.innerHTML='<div style="font-size:9px;color:var(--dim);text-align:center;padding:6px 0;opacity:.6">🔮 完成日常任务有概率触发…</div>';
    }else{
      hiddenEl.innerHTML=ht.map(t=>{
        const pct=Math.min(100,(t.prog/t.g)*100);
        const done=t.prog>=t.g;
        const cls='ls-stask hidden-task'+(t.claimed?' claimed':done?' claimable':'');
        const btnCls=done?(t.claimed?'done':'do'):'wait';
        const btnTxt=t.claimed?'已领':done?'领取':'??';
        return`<div class="${cls}">
          <div class="ls-stask-ico">${t.i}</div>
          <div class="ls-stask-body">
            <div class="ls-stask-name">${t.n}</div>
            <div class="ls-stask-prog">${Math.min(t.prog,t.g)}/${t.g}</div>
            <div class="ls-stask-pb"><div class="ls-stask-pf" style="width:${pct}%"></div></div>
          </div>
          <div class="ls-stask-btn ${btnCls}" ${done&&!t.claimed?`onclick="claimSidebarHiddenTask('${t.id}')"`:''}>${btnTxt}</div>
        </div>`;
      }).join('');
    }
  }
  if(hintEl)hintEl.textContent=ht.length?ht.length+'个进行中':'';
  // Red dots for claimable tasks
  const dailyDot=$('ls-daily-dot');
  const hiddenDot=$('ls-hidden-dot');
  const hasClaimableDaily=G.tasks.some(t=>t.prog>=t.g&&!t.claimed);
  const hasClaimableHidden=ht.some(t=>t.prog>=t.g&&!t.claimed);
  if(dailyDot)dailyDot.classList.toggle('show',hasClaimableDaily);
  if(hiddenDot)hiddenDot.classList.toggle('show',hasClaimableHidden);
}
function claimSidebarTask(id){
  const t=G.tasks.find(x=>x.id==id);
  if(!t||t.claimed||t.prog<t.g)return;
  t.claimed=true;addSP(t.r,`任务:${t.n}`);addExp(t.r/8);
  grantActivityDew('task');
  if(t.ticket==='apex'&&G.soul)addSoulFragment(G.soul.quality,1);
  else if(t.ticket==='advanced'&&G.soul)addSoulFragment('common',1);
  if(t.ticket&&t.ticketN){
    addTicketToBag(t.ticket,t.ticketN);
    const tn=poolTicketName(t.ticket);
    notify(`✅ ${t.n}！+${t.r}魂力+${tn}×${t.ticketN}`,'epic');
  }else{
    notify(`✅ ${t.n}完成！+${t.r}魂力`,'epic');
  }
  saveG();renderTasks();renderModalTasks();
  // Chance to unlock hidden task on daily completion
  tryUnlockHiddenTask();
}
function claimSidebarHiddenTask(id){
  const ht=G.hiddenTasks||[];
  const t=ht.find(x=>x.id==id);
  if(!t||t.claimed||t.prog<t.g)return;
  t.claimed=true;addSP(t.r,`隐藏:${t.n}`);addExp(t.r/5);
  if(t.ticket&&t.ticketN)addTicketToBag(t.ticket,t.ticketN);
  const tn=t.ticket?poolTicketName(t.ticket):'';
  notify(`🔮 隐藏任务！${t.n}！+${t.r}魂力${tn?'+'+tn+'×'+t.ticketN:''}`,'divine');
  spawnBurst('#a855f7',50);
  saveG();renderTasks();renderModalTasks();
}
function claimModalHiddenTask(id){
  const ht=G.hiddenTasks||[];
  const t=ht.find(x=>x.id==id);
  if(!t||t.claimed||t.prog<t.g)return;
  t.claimed=true;addSP(t.r,`隐藏:${t.n}`);addExp(t.r/5);
  if(t.ticket&&t.ticketN)addTicketToBag(t.ticket,t.ticketN);
  const tn=t.ticket?poolTicketName(t.ticket):'';
  notify(`🔮 隐藏任务！${t.n}！+${t.r}魂力${tn?'+'+tn+'×'+t.ticketN:''}`,'divine');
  spawnBurst('#a855f7',50);
  saveG();renderTasks();renderModalTasks();
}
function tryUnlockHiddenTask(){
  const ht=G.hiddenTasks||[];
  // Already have enough hidden tasks
  if(ht.filter(t=>!t.claimed).length>=2)return;
  // 25% chance per daily task completion
  if(Math.random()>0.25)return;
  // Pick from template not already active
  const activeIds=new Set(ht.map(t=>t.n));
  const avail=HIDDEN_TASK_TPL.filter(t=>!activeIds.has(t.n));
  if(!avail.length)return;
  const pick=avail[ri(0,avail.length-1)];
  const newTask={...pick,prog:0,claimed:false,id:Date.now()+Math.random()};
  if(!G.hiddenTasks)G.hiddenTasks=[];
  G.hiddenTasks.push(newTask);
  notify(`🔮 触发隐藏任务：${pick.n}`,'divine');
  spawnBurst('#a855f7',40);
  saveG();renderTasks();renderModalTasks();
}
function progressHiddenTask(type,amount){
  const ht=G.hiddenTasks||[];
  let changed=false;
  ht.forEach(t=>{
    if(t.claimed||t.t!==type)return;
    t.prog=Math.min(t.g,(t.prog||0)+(amount||1));
    changed=true;
  });
  if(changed){saveG();renderTasks();renderModalTasks();}
}
function renderArenaPage(){
  const pw=calcPower();
  const honor=G.arenaHonor||0;
  // Match 3 opponents
  const pool=ARENA_ENEMIES.filter(e=>{const r=pw/(e.pw||1);return r>=0.15&&r<=6;});
  const opponents=(pool.length?pool:[ARENA_ENEMIES.reduce((p,c)=>Math.abs(c.pw-pw)<Math.abs(p.pw-pw)?c:p)])
    .sort(()=>Math.random()-.5).slice(0,3);
  const nextMs=ARENA_MILESTONES.find(m=>m.honor>honor);
  const matchesH=opponents.map(e=>{
    const qc=QC[e.q]||QC.common;
    const wr=Math.min(95,Math.max(5,Math.round(pw/(pw+e.pw)*100)));
    const eHonor=Math.ceil(e.pw/1000);
    return`<div class="arena-match-card" onclick="startArenaMatch('${e.n}')">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="text-align:center;flex:1">
          <div style="display:flex;align-items:center;justify-content:center;">${G.soul?getSoulIcon(G.soul.name,G.soul.quality,{sizeClass:'size-small'}):'<span style="font-size:26px">⚡</span>'}</div>
          <div style="font-size:10px;font-weight:700;color:var(--gl);margin-top:2px">${G.soul?.name||'魂师'}</div>
          <div style="font-size:9px;color:var(--dim)">${pw.toLocaleString()}</div>
        </div>
        <div style="font-family:'Ma Shan Zheng',serif;font-size:20px;color:rgba(239,68,68,.5);padding:0 12px">VS</div>
        <div style="text-align:center;flex:1">
          <div style="font-size:26px">${e.ico}</div>
          <div style="font-size:10px;font-weight:700;color:${qc.c};margin-top:2px">${e.n}</div>
          <div style="font-size:9px;color:var(--dim)">${e.pw.toLocaleString()}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:9px;color:var(--dim)">${e.desc}</div>
        <div style="display:flex;gap:5px;align-items:center">
          <span style="font-size:9px;color:${wr>=60?'var(--hc)':wr>=40?'var(--gold)':'var(--apex)'}">胜率≈${wr}%</span>
          <span style="font-size:9px;padding:1px 7px;border-radius:4px;background:rgba(201,162,39,.1);border:1px solid var(--bdrB);color:var(--gl)">🏆+${eHonor}</span>
        </div>
      </div>
    </div>`;
  }).join('');
  const milestonesH=ARENA_MILESTONES.map(m=>{
    const claimed=!!(G.achievements?.['arena_ms_'+m.honor]);
    const reached=honor>=m.honor;
    return`<div style="display:flex;align-items:center;gap:9px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04)">
      <div style="width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;background:${reached?'rgba(201,162,39,.1)':'rgba(255,255,255,.03)'};border:1px solid ${reached?'var(--bdrB)':'var(--bdr)'}">
        ${claimed?'✅':reached?'🎁':'🔒'}
      </div>
      <div style="flex:1"><div style="font-size:11px;font-weight:700;color:${reached?'var(--txt)':'var(--dim)'}">${m.n}</div>
        <div style="font-size:9px;color:var(--dim)">荣耀 ${m.honor} · 奖励${m.ten?'十连':m.count+'张'}券</div></div>
      ${reached&&!claimed?`<div class="m-btn ok" style="padding:4px 10px;font-size:10px" onclick="claimArenaMilestone(${m.honor})">领取</div>`:''}
    </div>`;
  }).join('');
  return`<div>
    <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,215,0,.05);border:1px solid rgba(255,215,0,.18);border-radius:12px;margin-bottom:12px">
      <div style="font-size:22px">🏆</div>
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:11px;font-weight:700;color:#fde68a">竞技荣耀</span>
          <span style="font-size:11px;font-weight:700;color:var(--gl)">${honor}</span>
        </div>
        ${nextMs?`<div style="height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden">
          <div style="height:100%;width:${Math.min(100,honor/nextMs.honor*100)}%;background:linear-gradient(90deg,#b45309,#fde68a);border-radius:2px;transition:width .5s"></div>
        </div>
        <div style="font-size:8px;color:var(--dim);margin-top:3px">下一里程碑 ${nextMs.honor} 荣耀 (${nextMs.n})</div>`:'<div style="font-size:9px;color:#fde68a">已达最高里程碑！</div>'}
      </div>
      <div style="text-align:right;font-size:10px;color:var(--dim)">${G.arenaWins||0}胜 ${G.arenaLosses||0}败</div>
    </div>
    <div class="sh" style="margin-bottom:8px"><div class="st">⚔️ 今日对手</div><span style="font-size:9px;color:var(--dim)">每场消耗1令牌</span></div>
    ${matchesH}
    <div class="sh" style="margin:12px 0 8px"><div class="st">🎁 荣耀里程碑</div></div>
    ${milestonesH}
  </div>`;
}
function startArenaMatch(enemyName){
  initAbyssState();tickAbyssTokens();
  if(G.abyss.tokens<1){notify('异界令牌不足！','normal');return;}
  if(!G.awakenDone||!G.soul){notify('请先觉醒武魂','normal');return;}
  const e=ARENA_ENEMIES.find(x=>x.n===enemyName)||ARENA_ENEMIES[0];
  G.abyss.tokens--;$set('ab-tokens','textContent',G.abyss.tokens);saveG();
  // Build combat
  const player=buildPlayerStats();
  player.hp=player.maxHp;
  // Apply talent bonuses
  const tb=G.talent==='defense'?{hpMul:2}:G.talent==='power'?{atkMul:1.3}:G.talent==='speed'?{spdMul:1.5}:{};
  if(tb.atkMul)player.atk=Math.floor(player.atk*tb.atkMul);
  if(tb.hpMul){player.maxHp=Math.floor(player.maxHp*tb.hpMul);player.hp=player.maxHp;}
  const enemyObj={n:e.n,i:e.ico,maxHp:e.hp,hp:e.hp,atk:e.atk,spd:12,statuses:{},
    skills:[{n:'竞技连击',d:'',dmg:Math.floor(e.atk*1.7),cd:3,curCd:0,icon:'⚡'}]};
  combatState={player,enemy:enemyObj,round:1,maxRounds:8,
    stage:{n:e.n,type:'elite',cost:0,enemy:enemyObj},
    layer:{n:'异域战场',col:'#ef4444'},
    turnOrder:[],log:[],phase:0,ended:false,speed:'normal',
    isArena:true,arenaEnemy:e};
  combatLog=[];showCombatUI();
}
function handleArenaResult(won){
  if(!combatState)return;
  const e=combatState.arenaEnemy||{pw:1000};
  if(won){
    const honor=Math.max(1,Math.ceil(e.pw/1000));
    G.arenaHonor=(G.arenaHonor||0)+honor;
    G.arenaWins=(G.arenaWins||0)+1;
    addLog('\n> 🏆 异域战场胜利！荣耀+'+honor+' · 当前: '+G.arenaHonor,'#22c55e');
    // Check milestone notifications
    ARENA_MILESTONES.forEach(m=>{
      if(G.arenaHonor>=m.honor&&!G.achievements?.['arena_ms_'+m.honor])
        setTimeout(()=>notify('🎁 竞技里程碑：'+m.n+'！荣耀'+m.honor+'，前往异域战场领取奖励！','legend'),400);
    });
    if((G.arenaWins||0)>=10)checkAchievement('arena10');
  } else {
    G.arenaLosses=(G.arenaLosses||0)+1;
    G.arenaHonor=(G.arenaHonor||0)+5;
    addLog('\n> 💔 异域战场落败… 荣耀+5 · 经验+300','#f87171');
    addExp(300);
  }
  saveG();
}
function claimArenaMilestone(honor){
  const m=ARENA_MILESTONES.find(x=>x.honor===honor);if(!m)return;
  if(!G.achievements)G.achievements={};
  const key='arena_ms_'+honor;
  if(G.achievements[key]){notify('已领取','normal');return;}
  if((G.arenaHonor||0)<honor){notify('荣耀不足','normal');return;}
  G.achievements[key]={ts:Date.now()};
  addTicketToBag(m.pool,m.count,m.ten||false);
  notify(`🎁 ${m.n}！券×${m.count}${m.ten?'(十连)':''}已发放`,'divine');
  spawnBurst('#ffd700',60);saveG();renderAbyssPage();
}

// ──── COMBAT V8: Flash + wrapper functions ────
function combatFlash(col){
  const f=$('combat-flash');if(!f)return;
  f.style.background=col;
  f.classList.remove('flash');
  void f.offsetWidth; // reflow
  f.classList.add('flash');
  setTimeout(()=>f.classList.remove('flash'),400);
}
function combatAttack(){combatFlash('rgba(201,162,39,.28)');doAttack();}
function combatSkill(idx){combatFlash('rgba(124,58,237,.32)');useSkill(idx);}

// ──── V8 INIT ────
function v8Init(){
  // Field safety
  if(!G.talent&&G.talent!==null)G.talent=null;
  if(!G.awakenLevel)G.awakenLevel=0;
  if(!G.honorPoints)G.honorPoints=0;
  if(!G.realmBonusClaimed)G.realmBonusClaimed=[];
  if(!G.achievements)G.achievements={};
  if(!G.arenaHonor)G.arenaHonor=0;
  if(!G.arenaWins)G.arenaWins=0;
  if(!G.arenaLosses)G.arenaLosses=0;
  if(!G.calendarStreak)G.calendarStreak=0;
  if(!G.calendarLastLogin)G.calendarLastLogin=0;
  if(!G.hiddenTasks)G.hiddenTasks=[];
  if(!G.tidalPulls)G.tidalPulls=[0,0,0];
  if(!G.talentResets)G.talentResets=0;
  // Calendar login check
  checkCalendarLogin();
  // Realm badge
  updateRealmBadge();
  // Honor HUD
  $set('hud-honor','textContent',G.honorPoints||0);
  // Achievements check
  setTimeout(()=>checkAchievements(),600);
  // Tidal UI
  setTimeout(()=>updateTidalUI(curLotMode||0),300);
}

// ══════════════════════════════════════════════════
//  SHARE CARD
// ══════════════════════════════════════════════════
function openShareCard(){
  const s=G.soul;
  const hasSoul=!!s;
  const qc=hasSoul?(QC[s.quality]||QC.common):QC.common;
  const col=qc.c||'#f59e0b';
  const realm=getCurrentRealm(G.level);

  // Update DOM elements
  const card=$('share-card');
  if(card)card.style.setProperty('--sc-col',col);
  const scIco=$('sc-ico');if(scIco){scIco.innerHTML=hasSoul?getSoulIcon(s.name,s.quality,{sizeClass:'size-large'}):'<span style=\"font-size:64px\">🌀</span>';scIco.style.display='flex';scIco.style.alignItems='center';scIco.style.justifyContent='center';}
  $set('sc-name','textContent',hasSoul?s.name:'尚未觉醒');
  $set('sc-name','style.color',col);

  const qText=hasSoul?qc.n+'品质':'未觉醒';
  const tState=hasSoul?(s.divine?' · 神位传承':s.secondAwakened?' · 二次觉醒':' · 幸运值 '+((G.tidalPulls||[0,0,0])[G.lotMode||0]||0)+'点'):'';
  $set('sc-quality','textContent',qText+tState);

  $set('sc-pow','textContent',calcPower().toLocaleString());
  $set('sc-pow','style.color',col);
  $set('sc-lv','textContent','Lv.'+G.level);
  $set('sc-lv','style.color',col);
  const ringCount=hasSoul?(s.rings||[]).length:0;
  $set('sc-rings','textContent',ringCount+'环');
  $set('sc-rings','style.color',col);

  // Attributes pills
  const attrsEl=$('sc-attrs');
  if(attrsEl){
    let pills=[];
    if((G.awakenLevel||0)>0)pills.push({t:'✦ Lv.'+G.awakenLevel,c:'#c4b5fd',b:'rgba(139,92,246,.1)',bd:'rgba(139,92,246,.25)'});
    if(G.talent){const t=TALENTS.find(x=>x.id===G.talent);if(t)pills.push({t:t.icon+' '+t.name,c:t.col,b:t.bgc,bd:t.col+'55'});}
    if(s?.secondAwakened)pills.push({t:'二次觉醒',c:'#c4b5fd',b:'rgba(139,92,246,.08)',bd:'rgba(139,92,246,.2)'});
    if(s?.divine)pills.push({t:'神级',c:'#fbbf24',b:'rgba(255,215,0,.08)',bd:'rgba(255,215,0,.2)'});
    const eq_t=G.equippedTitle?TITLES.find(t=>t.id===G.equippedTitle):null;
    if(eq_t)pills.push({t:'★ '+eq_t.n,c:eq_t.c||col,b:'rgba(255,215,0,.06)',bd:'rgba(255,215,0,.15)'});
    attrsEl.innerHTML=pills.map(p=>`<div class="sc-attr" style="background:${p.b};border-color:${p.bd};color:${p.c}">${p.t}</div>`).join('');
  }

  $set('sc-realm','textContent',realm.n+'·'+realm.sub);

  // Draw background canvas
  drawShareBg(col);

  // Show modal
  $addCls('share-modal','show');
}
function closeShareModal(){$remCls('share-modal','show');}
function drawShareBg(col){
  const cvs=$('sc-bg-cvs');
  if(!cvs)return;
  const rect=cvs.parentElement.getBoundingClientRect();
  const w=Math.round(rect.width),h=Math.round(rect.height);
  cvs.width=w;cvs.height=h;
  const ctx=cvs.getContext('2d');
  // Dark gradient bg
  const g=ctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0,'#050810');g.addColorStop(.5,'#0d1630');g.addColorStop(1,'#050810');
  ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  // Radial glow behind icon
  const rg=ctx.createRadialGradient(w/2,h*.32,10,w/2,h*.32,100);
  rg.addColorStop(0,col+'30');rg.addColorStop(1,'transparent');
  ctx.fillStyle=rg;ctx.fillRect(0,0,w,h);
  // Subtle stars
  ctx.fillStyle='rgba(255,255,255,.15)';
  for(let i=0;i<40;i++){
    const x=Math.random()*w,y=Math.random()*h,r=Math.random()*1.2;
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  }
  // Top/bottom lines
  ctx.strokeStyle=col+'25';
  ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(30,30);ctx.lineTo(w-30,30);ctx.stroke();
  ctx.beginPath();ctx.moveTo(30,h-30);ctx.lineTo(w-30,h-30);ctx.stroke();
}
function shareDownload(){
  const card=$('share-card');
  if(!card)return;
  // Use html-to-canvas approach via native canvas capture
  try{
    const cvs=document.createElement('canvas');
    const rect=card.getBoundingClientRect();
    const scale=2;
    cvs.width=Math.round(rect.width*scale);
    cvs.height=Math.round(rect.height*scale);
    const ctx=cvs.getContext('2d');
    ctx.scale(scale,scale);
    // Background
    const g=ctx.createLinearGradient(0,0,0,rect.height);
    g.addColorStop(0,'#050810');g.addColorStop(.5,'#0d1630');g.addColorStop(1,'#050810');
    ctx.fillStyle=g;ctx.fillRect(0,0,rect.width,rect.height);
    // Glow
    const col=card.style.getPropertyValue('--sc-col')||'#f59e0b';
    const rg=ctx.createRadialGradient(rect.width/2,rect.height*.32,10,rect.width/2,rect.height*.32,100);
    rg.addColorStop(0,col+'35');rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg;ctx.fillRect(0,0,rect.width,rect.height);
    // Stars
    ctx.fillStyle='rgba(255,255,255,.12)';
    for(let i=0;i<50;i++){const x=Math.random()*rect.width,y=Math.random()*rect.height,r=Math.random()*1.2;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
    // Text drawing helper
    function drawText(t,x,y,opts={}){
      ctx.font=opts.font||'11px sans-serif';
      ctx.fillStyle=opts.color||'#fff';
      ctx.textAlign=opts.align||'center';
      ctx.textBaseline=opts.baseline||'middle';
      if(opts.shadow){ctx.shadowColor=opts.shadow;ctx.shadowBlur=opts.blur||10;}
      ctx.fillText(t,x,y);ctx.shadowBlur=0;
    }
    // Title
    drawText('武魂模拟器 · SOUL AWAKENED',rect.width/2,28,{font:'bold 9px sans-serif',color:'rgba(201,162,39,.5)',align:'center'});
    // Icon (smaller, shifted up)
    const ico=$('sc-ico')?.textContent||'⚡';
    drawText(ico,rect.width/2,rect.height*.27,{font:'68px serif',color:col,align:'center',shadow:col+'50',blur:24});
    // Name (moved down for more gap)
    const name=$('sc-name')?.textContent||'武魂';
    drawText(name,rect.width/2,rect.height*.45,{font:'32px "Ma Shan Zheng",serif',color:col,align:'center',shadow:col+'50',blur:20});
    // Quality
    const q=$('sc-quality')?.textContent||'';
    drawText(q,rect.width/2,rect.height*.53,{font:'11px sans-serif',color:'rgba(255,255,255,.5)',align:'center'});
    // Line
    ctx.strokeStyle=col+'40';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(rect.width/2-80,rect.height*.57);ctx.lineTo(rect.width/2+80,rect.height*.57);ctx.stroke();
    // Stats
    const stats=[
      {v:$('sc-pow')?.textContent||'0',l:'总战力'},
      {v:$('sc-lv')?.textContent||'Lv.1',l:'等级'},
      {v:$('sc-rings')?.textContent||'0环',l:'魂环'}
    ];
    const sx=rect.width/2-(stats.length-1)*40;
    stats.forEach((st,i)=>{
      drawText(st.v,sx+i*80,rect.height*.63,{font:'bold 20px sans-serif',color:col,align:'center'});
      drawText(st.l,sx+i*80,rect.height*.63+22,{font:'8px sans-serif',color:'rgba(255,255,255,.35)',align:'center'});
    });
    // Attrs
    const attrs=Array.from(card.querySelectorAll('.sc-attr')).map(a=>({t:a.textContent,c:getComputedStyle(a).color}));
    if(attrs.length){
      let ax=rect.width/2-((attrs.length*70-10)/2),ay=rect.height*.76;
      attrs.forEach(a=>{
        ctx.fillStyle='rgba(255,255,255,.06)';ctx.strokeStyle='rgba(255,255,255,.1)';
        ctx.beginPath();roundRect(ctx,ax-2,ay-8,ctx.measureText(a.t).width+18,18,9);ctx.fill();ctx.stroke();
        drawText(a.t,ax+ctx.measureText(a.t).width/2+7,ay,{font:'9px sans-serif',color:a.c||'rgba(255,255,255,.45)',align:'center'});
        ax+=ctx.measureText(a.t).width+24;
      });
    }
    // Realm
    const realm=$('sc-realm')?.textContent||'';
    drawText(realm,rect.width/2,rect.height*.87,{font:'10px sans-serif',color:'rgba(255,255,255,.35)',align:'center'});
    // Watermark
    drawText('武魂模拟器 · 武魂传承',rect.width-14,rect.height-14,{font:'8px sans-serif',color:'rgba(255,255,255,.15)',align:'right'});

    // Download
    const link=document.createElement('a');
    link.download='武魂模拟器-'+($('sc-name')?.textContent||'武魂')+'.png';
    link.href=cvs.toDataURL('image/png');
    link.click();
    notify('📸 分享卡牌已保存','normal');
  }catch(e){console.error(e);notify('保存失败，请重试','normal');}
}
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
}
function shareLink(){
  const s=G.soul;
  const text=s
    ?`【武魂模拟器】我觉醒了「${s.name}」${QC[s.quality]?.n||''}武魂！\n境界：${getCurrentRealm(G.level).n} · Lv.${G.level}\n战力：${calcPower().toLocaleString()}\n魂环：${(s.rings||[]).length}环\n快来一起觉醒属于你的武魂吧！`
    :'【武魂模拟器】觉醒属于你的专属武魂，踏上斗罗大陆修炼之旅！';
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>notify('🔗 分享文案已复制到剪贴板','normal')).catch(()=>fallbackCopy(text));
  }else{fallbackCopy(text);}
}
function fallbackCopy(text){
  const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();
  try{document.execCommand('copy');notify('🔗 分享文案已复制到剪贴板','normal');}
  catch(e){notify('复制失败，请手动复制','normal');}
  document.body.removeChild(ta);
}


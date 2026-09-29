(function(){
const I = {
  mega:'<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  pen:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  split:'<path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.2-2.9L3 3"/><path d="m15 9 6-6"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  q:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  id:'<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 10h4M14 14h4"/>',
  phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  heart:'<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  award:'<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
  brief:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  folder:'<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
  tagi:'<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  table:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
  check:'<path d="m5 12 5 5L20 7"/>', x:'<path d="M18 6 6 18M6 6l12 12"/>',
  chev:'<path d="m6 9 6 6 6-6"/>', up:'<path d="m18 15-6-6-6 6"/>', right:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  bot:'<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01"/>',
  open:'<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
  flag:'<path d="M4 22V4a1 1 0 0 1 1-1h11l-2 4 2 4H5"/>',
  msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
};
const svg = (n,st='') => `<svg class="i" viewBox="0 0 24 24" ${st?`style="${st}"`:''} aria-hidden="true">${I[n]}</svg>`;
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');

/* Stations. el:4 = counted in the Element 4 non-compensatory gate. PC tags follow the workbook ranges; confirm the split with the content expert. */
const ST = {
  A:{name:'Confidence', icon:'mega', c:'var(--violet)', t:'var(--violet-t)', el:4, pc:'PC 4.1 to 4.5', rev:'Confident is not correct', revTxt:'A smooth, sure-sounding answer tells you nothing about whether it is true. Treat every detail as unconfirmed until you check it.'},
  B:{name:'Mark', icon:'pen', c:'var(--royal)', t:'var(--royal-t)', el:4, pc:'PC 4.1 to 4.5', rev:'Mark every fact', revTxt:'Before sending, mark every fact, figure, date, name and source in the AI output. Opinions and general wishes do not need a source.'},
  C:{name:'Separate', icon:'split', c:'var(--teal)', t:'var(--teal-t)', el:4, pc:'PC 4.1 to 4.5', rev:'Separate what you can prove', revTxt:'Supported means your source confirms it. Unsupported means you have nothing to confirm it yet. Contradicted means your source says something different.'},
  D:{name:'Verify and correct', icon:'shield', c:'var(--sky)', t:'var(--sky-t)', el:5, pc:'PC 5.1 to 5.4', rev:'Verify and correct', revTxt:'Check each marked item against the original: the notice, register, manual or the person responsible. Fix wrong details from that source, not from the AI.'},
  E:{name:'Qualify or remove', icon:'q', c:'var(--rose)', t:'var(--rose-t)', el:5, pc:'PC 5.1 to 5.4', rev:'Qualify or remove', revTxt:'If you cannot confirm a detail in time, say clearly that it is unconfirmed, or take it out. For safety, money and official dates, confirm or remove.'}
};
const ORDER = ['A','B','C','D','E'];

const ITEMS = [
/* ---------- A: Confidence ---------- */
{id:'Q01',st:'A',diff:'Easy',recall:true,type:'mcq',ctx:'General',
 stem:'An AI reply sounds very sure of itself and gives exact numbers. What does that tell you about whether it is correct?',
 opts:[
  {t:'It is probably correct, because AI tools learn from a huge amount of data.',why:'Learning from a lot of data does not mean every detail fits your situation. The tool can still produce wrong figures.'},
  {t:'Nothing on its own. Confident wording is not evidence.',ok:true},
  {t:'It is correct if the reply also gives a reason.',why:'A reason can be made up just as easily as a number. You still need a real source.'},
  {t:'It is correct if it matches what you already expected.',why:'Matching your guess feels reassuring, but your guess is not a source either.'}],
 expl:'How sure a reply sounds and whether it is true are two separate things. Only a reliable source can confirm a detail.'},
{id:'Q02',st:'A',diff:'Medium',type:'mcq',ctx:'College campus',
 doc:{title:'Campus notice, AI draft',lines:['Annual Sports Meet 2026. The event will be held on 14 February in the Main Auditorium, as approved by the Principal. All class groups must register by 7 February.']},
 stem:'Anjali, a first-year student volunteer, asked an AI tool to draft this notice. It reads well. What should she do before posting it?',
 opts:[
  {t:'Post it. The language is formal and clear.',why:'Good language does not confirm the date, venue, approval or deadline. A wrong date on a notice can mislead the whole campus.'},
  {t:'Check the dates, the venue and the approval against the actual approval letter or with the event coordinator.',ok:true},
  {t:'Ask the AI "Are you sure?" and post it if it says yes.',why:'The same tool will often just repeat itself confidently. Asking it again is not a check.'},
  {t:'Add "Made with AI" at the bottom and post it.',why:'A label does not fix wrong details. Readers will still act on the dates.'}],
 expl:'Every date, place and approval in a notice needs confirming from the real source before it goes up.'},
{id:'Q03',st:'A',diff:'Hard',type:'mcq',ctx:'ITI class',
 doc:{title:'Attendance summary, AI draft',lines:['Batch B had 92% attendance in March.']},
 stem:'You open the attendance record book. The March summary has not been filled in yet. How should you describe this AI claim?',
 opts:[
  {t:'False. The AI has made an error.',why:'You have not found anything that says it is wrong. You simply cannot confirm it. That is different from proving it false.'},
  {t:'Unsupported. You cannot confirm it yet, so you should not use it as it stands.',ok:true},
  {t:'True. An AI tool would not invent a specific number like 92%.',why:'AI tools can and do produce specific-looking numbers with nothing behind them.'},
  {t:'Supported, because the record book does not disagree with it.',why:'Silence is not support. A source has to actually confirm the figure.'}],
 expl:'Unsupported means you have no proof either way. Proven false means a source says something different. Both are unsafe to send as they are.'},

/* ---------- B: Mark ---------- */
{id:'Q04',st:'B',diff:'Medium',type:'mark',ctx:'ITI industrial visit',
 docTitle:'Industrial visit note, AI draft',
 stem:'Tap every part of this AI draft that you must check before it goes into the record book. Tap again to unmark.',
 chunks:[['On 12 September,',1],['trainees of the Fitter trade',0],['visited',0],['Navjyoti Tools Pvt. Ltd.',1],['with',0],['28 trainees in the group.',1],['The plant supervisor,',0],['Mr. Suresh Deshmukh,',1],['explained the CNC section.',0],['The plant makes',0],['4,000 gear parts a day.',1],['It was a good learning day for everyone.',0]],
 expl:'The date, the company name, the number of trainees, the supervisor\'s name and the production figure are all facts, figures, dates or names. Each one could be wrong. "A good learning day" is an opinion, not a fact to verify.'},
{id:'Q05',st:'B',diff:'Hard',type:'mark',ctx:'College project',
 docTitle:'Project brief, AI draft',
 stem:'Tap every part that needs checking before Farhan\'s team submits this brief.',
 chunks:[['According to a 2023 national education report,',1],['64% of students',1],['prefer online classes.',0],['Our survey of',0],['120 students',1],['will run from',0],['5 to 12 August.',1],['Team lead:',0],['Farhan Qureshi.',1],['We hope to learn more about how students like to study.',0]],
 expl:'A vague source ("a national education report") is a warning sign and must be traced. The 64%, the sample size, the dates and the name all need checking. The last line is a general aim, not a claim.'},
{id:'Q06',st:'B',diff:'Easy',recall:true,type:'mcq',ctx:'General',
 stem:'Which parts of an AI output must you mark before you send it?',
 opts:[
  {t:'Only the numbers.',why:'Numbers matter, but dates, names and sources can be just as wrong.'},
  {t:'Every fact, figure, date, name and source.',ok:true},
  {t:'Only the lines that look wrong to you.',why:'Errors often look perfectly normal. That is why every detail gets marked, not just the odd-looking ones.'},
  {t:'Only the first paragraph, because that is what people read.',why:'People act on details anywhere in the text, including the last line.'}],
 expl:'Mark all five: facts, figures, dates, names and sources.'},
{id:'Q07',st:'B',diff:'Medium',type:'mcq',ctx:'ITI workshop',
 doc:{title:'Tool inventory summary, AI draft',lines:['Torque wrenches: 18. Vernier callipers: 12. Bench vices: 9. Last stock check: 3 August.']},
 stem:'Meena typed the stores register into an AI tool and asked for this summary. She is short on time. Which lines should she check against the register?',
 opts:[
  {t:'Only the first line, as a spot check.',why:'One correct line says nothing about the others. The tool can miscount any item.'},
  {t:'Every count, every item name and the date.',ok:true},
  {t:'Only the items she remembers ordering recently.',why:'Memory is not a check. Older items can be miscounted too.'},
  {t:'None. She gave the tool the data herself, so it must be right.',why:'AI tools can drop, merge or change numbers even when the input was correct.'}],
 expl:'Even when you supply the data, the AI can copy it wrongly. Check each figure, name and date against the register.'},

/* ---------- C: Separate ---------- */
{id:'Q08',st:'C',diff:'Hard',type:'sort',ctx:'College event',
 labels:['Supported','Unsupported','Contradicted'],
 evidence:'Registration sheet: 212 registrations. Event date: 3 March (one day only). Winners\' board photo: Team Circuit, first prize.',
 docTitle:'Tech Fest report, AI draft (fictional)',
 stem:'Use the drop-down to label each line of the AI draft, based only on the evidence you have.',
 rows:[
  {t:'212 students registered for the fest.',a:'Supported',why:'The registration sheet shows 212.'},
  {t:'Team Circuit won first prize.',a:'Supported',why:'The winners\' board confirms it.'},
  {t:'The chief guest praised the robotics stall.',a:'Unsupported',why:'Nothing you have mentions the chief guest.'},
  {t:'The fest was held over two days.',a:'Contradicted',why:'The sheet says one day only, 3 March.'},
  {t:'Total footfall crossed 500.',a:'Unsupported',why:'Registrations are not footfall. You have no figure for attendance.'}],
 expl:'Keep what your evidence confirms, and treat the rest as unsupported or contradicted.'},
{id:'Q09',st:'C',diff:'Medium',type:'mcq',ctx:'General',
 stem:'Why separate the supported parts of an AI draft from the unsupported parts, instead of simply deleting the whole draft?',
 opts:[
  {t:'Because deleting the whole draft is always the safer choice.',why:'Deleting everything throws away work you have already confirmed. Separating keeps what is useful.'},
  {t:'So you keep what you have confirmed and deal only with the parts you cannot back up.',ok:true},
  {t:'Because unsupported parts are usually correct anyway.',why:'Unsupported means unknown. You cannot assume it is correct.'},
  {t:'Because the facilitator only reads the supported parts.',why:'Readers see the whole text. Every part has to be dealt with.'}],
 expl:'Separating lets you use the checked parts with confidence and fix, qualify or remove only what is left.'},
{id:'Q10',st:'C',diff:'Medium',type:'sort',ctx:'ITI workshop notice',
 labels:['Supported','Unsupported','Contradicted'],
 evidence:'Facilitator\'s message: Fitting practical shifted to Monday, 2 PM, Workshop 1. Bring your record book.',
 docTitle:'Workshop notice, AI draft (fictional)',
 stem:'Label each line of the AI draft using the facilitator\'s message.',
 rows:[
  {t:'The practical is on Monday.',a:'Supported',why:'The message says Monday.'},
  {t:'It starts at 2 PM.',a:'Supported',why:'The message says 2 PM.'},
  {t:'It will be held in Workshop 4.',a:'Contradicted',why:'The message says Workshop 1.'},
  {t:'Tools will be issued at the gate.',a:'Unsupported',why:'The message says nothing about issuing tools.'},
  {t:'Bring your record book.',a:'Supported',why:'The message says this.'}],
 expl:'Compare each line to the source, one by one. Helpful-sounding extras that the source never mentioned are unsupported.'},
{id:'Q11',st:'C',diff:'Hard',type:'mcq',ctx:'College survey',
 doc:{title:'Survey summary, AI draft',lines:['Most students (about 70%) want the library open till 9 PM.']},
 stem:'Your own survey sheet shows that 41 out of 90 students said yes to a 9 PM closing time. How should you treat the AI\'s line?',
 opts:[
  {t:'Supported, because "most" is a flexible word.',why:'41 out of 90 is under half. "Most" does not fit.'},
  {t:'Unsupported, because you need more data first.',why:'You already have data, and it disagrees with the claim.'},
  {t:'Contradicted. Your data shows about 46%, which is not most.',ok:true},
  {t:'Fine to use if you delete the "about 70%" part.',why:'"Most students" would still be wrong, since fewer than half said yes.'}],
 expl:'When your own source gives a different answer, the claim is contradicted and must be corrected, not just trimmed.'},

/* ---------- D: Verify and correct ---------- */
{id:'Q12',st:'D',diff:'Medium',type:'order',ctx:'General',
 stem:'Arrange these steps in the order you should follow before using an AI output. Use the arrows to move them.',
 steps:['Mark every fact, figure, date, name and source','Check each marked item against a reliable source','Separate what is supported from what is not','Correct it, qualify it, or remove it','Read the final version once more before sending'],
 expl:'Mark first so nothing is missed, then check, then separate, then fix, and finally read it through once more.'},
{id:'Q13',st:'D',diff:'Easy',type:'mcq',ctx:'ITI class',
 stem:'Rahul wants to confirm the date of an internal test that an AI draft mentions. Which source should he use?',
 opts:[
  {t:'Ask the same AI tool again with a clearer prompt.',why:'The tool has no access to your institute\'s timetable. A better prompt does not give it that.'},
  {t:'The official test notice from the institute, or the facilitator.',ok:true},
  {t:'A message forwarded in the class group.',why:'Forwards can be old or changed. Go to the original notice.'},
  {t:'A different AI tool.',why:'A second AI has the same problem as the first. It is not a source.'}],
 expl:'Go back to the original: the official notice or the person responsible.'},
{id:'Q14',st:'D',diff:'Easy',recall:true,type:'mcq',ctx:'General',
 stem:'You find a wrong figure in an AI draft. What is the right way to fix it?',
 opts:[
  {t:'Replace it with the figure from a reliable source.',ok:true},
  {t:'Ask the AI to guess again.',why:'A new guess is still a guess.'},
  {t:'Round it off so it looks less exact.',why:'A rounded wrong figure is still wrong.'},
  {t:'Leave it in, since one number will not matter much.',why:'People make decisions from figures. One wrong number can cause real problems.'}],
 expl:'Correct from a reliable source, never from another guess.'},
{id:'Q15',st:'D',diff:'Medium',type:'mcq',ctx:'College office',
 doc:{title:'Attendance summary, AI draft',lines:['Rohan Mehta: present 18 of 20 days.','Sana Iqbal: present 20 of 20 days.','Arjun Nair: present 15 of 20 days.']},
 stem:'Priya checks the register. It shows Rohan was present 16 of 20 days, not 18. What is the best next step?',
 opts:[
  {t:'Change Rohan\'s line to 16 of 20 and check every other name against the register too.',ok:true},
  {t:'Change Rohan\'s line to 16 of 20 and send it. The error is fixed.',why:'One error is a warning that others may exist. The remaining lines still need checking.'},
  {t:'Ask the AI to find and fix its own mistakes.',why:'The tool made the error in the first place. The register is the source.'},
  {t:'Delete Rohan\'s line so the summary has no wrong data.',why:'Removing a correctable line leaves the record incomplete. The register gives the right number.'}],
 expl:'Fix the error from the source, then check the rest. Finding one mistake is a signal to look harder.'},
{id:'Q16',st:'D',diff:'Hard',type:'mcq',ctx:'ITI workshop',
 doc:{title:'AI reply',lines:['This drill machine runs on 230 V, 50 Hz single-phase supply.']},
 stem:'Joseph asked an AI tool about the rated voltage of a drill machine in his workshop before connecting it. How should he verify this?',
 opts:[
  {t:'Read the rating plate on the machine or its manual.',ok:true},
  {t:'Trust it, since 230 V is standard in India.',why:'Common is not the same as correct for this machine. Some workshop machines need a different supply. A wrong connection is a safety risk.'},
  {t:'Search online and use the first result.',why:'The first result may be for a different model. The machine\'s own plate is the source.'},
  {t:'Connect it and ask the instructor afterwards if something seems off.',why:'Safety details must be confirmed before use, not after.'}],
 expl:'For equipment, the rating plate or the manual is the reliable source. With safety, check before you act.'},

/* ---------- E: Qualify or remove ---------- */
{id:'Q17',st:'E',diff:'Medium',type:'mcq',ctx:'College project',
 doc:{title:'Project brief, AI draft',lines:['Rooftop solar panels pay back their full cost within 3 years.']},
 stem:'You cannot find a reliable source for this line before the deadline, and it is not central to your project. What is the best choice?',
 opts:[
  {t:'Keep it. It sounds reasonable.',why:'Sounding reasonable is not proof. Unchecked figures in a submission can mislead your reader.'},
  {t:'Remove it, or clearly mark it as not yet confirmed.',ok:true},
  {t:'Change "3 years" to "5 years" to be on the safe side.',why:'That swaps one unchecked number for another.'},
  {t:'Add "according to experts" before it.',why:'That invents a source. It makes the claim look checked when it is not.'}],
 expl:'If you cannot confirm it in time, qualify it honestly or remove it.'},
{id:'Q18',st:'E',diff:'Medium',type:'mcq',ctx:'ITI workshop',
 stem:'Which of these is a proper way to qualify a figure you have not been able to confirm yet?',
 opts:[
  {t:'"Studies prove that stock is 18 units."',why:'This claims proof you do not have.'},
  {t:'"Stock: 18 units (not yet checked against the stores register; will update after checking)."',ok:true},
  {t:'"Stock: approximately 18 units."',why:'"Approximately" hides the problem. The reader still assumes it was checked.'},
  {t:'"Stock: 18 units, as everyone knows."',why:'This adds false confidence instead of honesty.'}],
 expl:'A good qualification says plainly what is unconfirmed and what you will do about it.'},
{id:'Q19',st:'E',diff:'Hard',type:'mcq',ctx:'ITI safety notice',
 doc:{title:'Workshop safety notice, AI draft',lines:['In case of fire, use the extinguisher located near Gate 2.']},
 stem:'Gurpreet is not sure where the extinguisher actually is. The notice goes up today. What should he do?',
 opts:[
  {t:'Write "near Gate 2 (to be confirmed)" and put it up.',why:'In an emergency, nobody has time to confirm. A wrong location on a safety notice can put people at risk.'},
  {t:'Check the location himself or confirm with the workshop in-charge before posting. If he cannot, leave that line out.',ok:true},
  {t:'Keep it as it is, since extinguishers are usually near gates.',why:'"Usually" is a guess. Safety information must be exact.'},
  {t:'Remove every safety instruction from the notice.',why:'That removes useful information that may already be correct. Only the unconfirmed line is the problem.'}],
 expl:'For safety details, qualifying is not enough. Confirm it, or remove it.'},
{id:'Q20',st:'E',diff:'Hard',type:'sort',ctx:'College fee notice',
 labels:['Keep','Correct','Qualify','Remove'],
 evidence:'Official fee notice: last date 30 June; late fee ₹500. Accounts office said online payment is "likely next week, not confirmed". Nothing about extensions.',
 docTitle:'Fee reminder, AI draft (fictional)',
 stem:'Choose the right action for each line of this AI draft.',
 rows:[
  {t:'Last date for fee submission: 30 June.',a:'Keep',why:'The official notice confirms it.'},
  {t:'Late fee: ₹200.',a:'Correct',why:'The notice says ₹500. Fix it from the source.'},
  {t:'Online payment will open next week.',a:'Qualify',why:'The office said it is likely but not confirmed. Say that clearly.'},
  {t:'The office may extend the last date if needed.',a:'Remove',why:'There is no source at all for this, and it could make students miss the deadline.'}],
 expl:'Keep what is confirmed, correct what is wrong, qualify what is uncertain, and remove what has no basis.'}
];

/* ---------- Refresher content ---------- */
const MOVES = [
 {st:'B',title:'Mark',txt:'Go through the AI output and mark every fact, figure, date, name and source.',ex:'"Seminar on <u>14 March</u> in <u>Hall B</u>, confirmed by <u>the HOD</u>." Three things to check.'},
 {st:'C',title:'Separate',txt:'Split what you marked into what your source confirms and what it does not.',ex:'The notice confirms 14 March. It says nothing about Hall B. Hall B goes in the unsupported pile.'},
 {st:'D',title:'Verify and correct',txt:'Check each marked item against the original source. Fix anything wrong using that source.',ex:'The HOD\'s email says Seminar Room 2, not Hall B. Change it.'},
 {st:'E',title:'Qualify or remove',txt:'If you cannot confirm something in time, say so clearly or take it out.',ex:'"Refreshments will be served" has no source. Remove it, or write "refreshments not yet confirmed".'}
];
const NOS = [['lock','Passwords'],['id','Aadhaar or ID numbers'],['phone','Phone numbers'],['home','Home addresses'],['heart','Health information'],['award','Marks and results'],['brief','Employer secrets'],['folder','Institute records']];
const SRCS = [
 ['file','Original notice or letter','The document the information first came from.','var(--royal)','var(--royal-t)'],
 ['book','Register or record book','Attendance, stores and practical records.','var(--teal)','var(--teal-t)'],
 ['tagi','Rating plate or manual','For any machine, tool or equipment.','var(--sky)','var(--sky-t)'],
 ['user','The person responsible','Your facilitator, coordinator or in-charge.','var(--violet)','var(--violet-t)'],
 ['table','Your own data sheet','Survey forms, marks lists you are allowed to use, logs.','var(--rose)','var(--rose-t)'],
 ['globe','Your institute\'s official website','Official announcements, not forwards or screenshots.','var(--gold-ink)','var(--gold-t)']
];

/* ---------- state ---------- */
let attempt = 1;
try{ attempt = (parseInt(localStorage.getItem('eval01-attempt'))||0)+1; }catch(e){}
let seq=[], idx=0, resp={}, cur=null, screen=0, quizStarted=false;
const PAGES=['Welcome','Refresher','Stay safe','Real-life check','Ready','Check','Result'];

const $ = s=>document.querySelector(s);
const shuffle = a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const weight = it => it.recall?1:2;

/* ---------- nav ---------- */
function renderSteps(){
  const n=$('#steps'); n.innerHTML='';
  PAGES.forEach((p,i)=>{
    const b=document.createElement('button'); b.className='step'+(i===screen?' on':'')+(i<screen?' done':'');
    const locked = (i===5 && !quizStarted) || (i===6 && !Object.keys(resp).length) || (quizStarted && screen===5 && i!==5);
    if(locked) b.disabled=true;
    b.innerHTML=`<b>${i<screen?svg('check','width:14px;height:14px;stroke-width:2.5'):i+1}</b>${p}`;
    b.onclick=()=>go(i); if(i===screen) b.setAttribute('aria-current','step');
    n.appendChild(b);
  });
}
function go(i){
  screen=i;
  document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('show',+s.dataset.s===i));
  renderSteps(); window.scrollTo({top:0,behavior:'smooth'});
  if(i===4) $('#attemptNo').textContent=attempt;
}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(+b.dataset.go)));

/* ---------- static pages ---------- */
$('#moves').innerHTML = MOVES.map((m,i)=>{const s=ST[m.st];return `<button class="move" aria-expanded="false" style="color:inherit">
  <span class="num" style="color:${s.c}">${i+1}</span>
  <span class="head"><span class="ico-chip" style="background:${s.t};color:${s.c}">${svg(s.icon)}</span><h3 style="margin:0">${m.title}</h3></span>
  <span style="display:block;color:var(--ink-2)">${m.txt}</span>
  <span class="more"><span class="ex" style="display:block;color:var(--ink);background:${s.t};border-color:${s.c}">${m.ex}</span></span>
  <span class="tap">${svg('chev')}See example</span></button>`}).join('');
document.querySelectorAll('.move').forEach(b=>b.onclick=()=>b.setAttribute('aria-expanded',b.getAttribute('aria-expanded')==='true'?'false':'true'));
$('#caution').innerHTML = NOS.map(n=>`<div class="no-tile"><div class="ic">${svg(n[0])}</div><span>${n[1]}</span></div>`).join('');
$('#sources').innerHTML = SRCS.map(s=>`<div class="card src"><span class="ico-chip" style="background:${s[4]};color:${s[3]}">${svg(s[0])}</span><div><b>${s[1]}</b><p>${s[2]}</p></div></div>`).join('');

const DEMO = {
 draft:{text:'Welding practical for Batch A is on <span class="fix wrong">Friday, 16 October at 9 AM</span> in <span class="fix wrong">Workshop 3</span>. <span class="fix wrong">Face shields and gloves will be provided by the institute.</span> <span class="fix wrong">As per the new rules, trainees below 80% attendance will not be allowed to appear.</span>',
  notes:[['flag','var(--rose)','var(--rose-t)','Looks ready to send. It is clear, polite and confident.'],['mega','var(--violet)','var(--violet-t)','But four details do not match the source, or have no source at all. Switch to "After checking".']]},
 checked:{text:'Welding practical for Batch A is on <span class="fix ok">Thursday, 15 October at 10 AM</span> in <span class="fix ok">Workshop 2</span>. <span class="fix ok">Please bring your own safety gloves.</span> <span class="fix cut">As per the new rules, trainees below 80% attendance will not be allowed to appear.</span>',
  notes:[['shield','var(--teal)','var(--teal-t)','<b>Corrected</b> the day, date, time and workshop from the facilitator\'s message.'],['pen','var(--royal)','var(--royal-t)','<b>Corrected</b> "gloves will be provided" to "bring your own", as the message says.'],['scissors','var(--rose)','var(--rose-t)','<b>Removed</b> the attendance rule. No rule was named and the message did not mention it. Kavya can ask the facilitator if it matters.']]}
};
function showDemo(v){
  document.querySelectorAll('.seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));
  $('#demoText').innerHTML=DEMO[v].text;
  $('#demoNotes').innerHTML=DEMO[v].notes.map(n=>`<div class="card note"><span class="ico-chip" style="background:${n[2]};color:${n[1]}">${svg(n[0])}</span><div>${n[3]}</div></div>`).join('');
}
document.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>showDemo(b.dataset.v));
showDemo('draft');

/* ---------- quiz ---------- */
function buildSeq(){
  seq=[]; ORDER.forEach(k=>{ seq=seq.concat(shuffle(ITEMS.filter(x=>x.st===k))); });
  seq=seq.map(it=>{const c=Object.assign({},it);
    if(c.opts) c.opts=shuffle(c.opts);
    if(c.rows) c.rows=shuffle(c.rows);
    if(c.steps){ let s; do{ s=shuffle(c.steps.map((t,i)=>({t,i}))); }while(s.every((x,i)=>x.i===i)); c.start=s; }
    return c;});
}
function startQuiz(){ buildSeq(); idx=0; resp={}; quizStarted=true; go(5); renderQ(); }
$('#startBtn').onclick=startQuiz;
$('#retryBtn').onclick=()=>{ attempt++; startQuiz(); };

function renderRail(){
  let h='';
  ORDER.forEach(k=>{const s=ST[k];
    h+=`<div class="stn"><div class="stn-label" style="color:${s.c}"><span class="ico-chip" style="background:${s.t};color:${s.c}">${svg(s.icon)}</span>${s.name}</div><div class="track">`;
    seq.forEach((it,i)=>{ if(it.st!==k) return; const r=resp[it.id];
      h+=`<span class="pip ${i===idx&&!r?'cur':''} ${r?(r.ok?'ok':'no'):''}"></span>`; });
    h+='</div></div>';
  });
  $('#rail').innerHTML=h;
}

function renderQ(){
  cur = seq[idx]; const it=cur, s=ST[it.st];
  renderRail();
  let body='';
  if(it.doc){ body+=`<div class="slip"><div class="slip-head">${svg('bot','color:var(--ink-2)')}<strong style="font-size:.95rem">${it.doc.title}</strong><span class="tag t-fic">Fictional example</span></div>${it.doc.lines.map(l=>`<p style="margin:4px 0">${esc(l)}</p>`).join('')}</div>`; }
  if(it.evidence){ body+=`<div class="evidence" style="margin-top:4px"><b>${svg('file')}What you have (the source)</b>${esc(it.evidence)}</div>`; }
  body+=`<div class="q-stem" id="qstem">${esc(it.stem)}</div>`;

  if(it.type==='mcq'){
    body+=`<div class="opts" role="radiogroup" aria-labelledby="qstem">${it.opts.map((o,i)=>`<button class="opt" role="radio" aria-checked="false" data-i="${i}"><span class="let">${'ABCD'[i]}</span><span>${esc(o.t)}</span></button>`).join('')}</div>`;
  } else if(it.type==='mark'){
    body+=`<div class="slip"><div class="slip-head">${svg('bot','color:var(--ink-2)')}<strong style="font-size:.95rem">${it.docTitle}</strong><span class="tag t-fic">Fictional example</span></div><div>${it.chunks.map((c,i)=>`<button class="chunk" aria-pressed="false" data-i="${i}">${esc(c[0])}</button>`).join(' ')}</div></div>
    <div class="markbar">${svg('pen')}<span id="mcount">Nothing marked yet</span></div>`;
  } else if(it.type==='sort'){
    body+=`<div style="font-size:.9rem;color:var(--ink-2);margin:-4px 0 10px;display:flex;align-items:center;gap:8px">${svg('bot','width:18px;height:18px')}${it.docTitle}</div><div class="rows">${it.rows.map((r,i)=>`<div class="row" data-i="${i}"><span>${esc(r.t)}</span><label class="sel"><span class="sr">Label for: ${esc(r.t)}</span><select data-i="${i}"><option value="">Choose</option>${it.labels.map(l=>`<option>${l}</option>`).join('')}</select>${svg('chev')}</label><div class="rfb"></div></div>`).join('')}</div>`;
  } else if(it.type==='order'){
    body+=`<div class="olist" id="olist"></div>`;
  }

  $('#qcard').innerHTML = `<div class="q-meta">
      <span class="q-count">Question ${idx+1} of ${seq.length}</span>
      <span class="tag" style="background:${s.t};color:${s.c}">${svg(s.icon)}${s.name}</span>
      <span class="tag t-ctx">${svg('flag')}${it.ctx}</span>
      <span class="tag t-diff">${it.diff}</span>
      <span class="tag t-w">${weight(it)} mark${weight(it)>1?'s':''}</span>
    </div>${body}
    <div class="fb" id="fb" aria-live="polite"></div>
    <div class="actions" style="margin-top:18px">
      <span class="spacer"></span>
      <button class="btn btn-primary" id="checkBtn" disabled>Check answer</button>
    </div>`;

  const chk=$('#checkBtn');
  if(it.type==='mcq'){
    document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{document.querySelectorAll('.opt').forEach(x=>x.setAttribute('aria-checked','false'));b.setAttribute('aria-checked','true');chk.disabled=false;});
  } else if(it.type==='mark'){
    document.querySelectorAll('.chunk').forEach(b=>b.onclick=()=>{b.classList.toggle('marked');b.setAttribute('aria-pressed',b.classList.contains('marked'));
      const n=document.querySelectorAll('.chunk.marked').length; $('#mcount').textContent=n?`${n} part${n>1?'s':''} marked`:'Nothing marked yet'; chk.disabled=!n;});
  } else if(it.type==='sort'){
    document.querySelectorAll('.row select').forEach(sel=>sel.onchange=()=>{chk.disabled=[...document.querySelectorAll('.row select')].some(x=>!x.value);});
  } else if(it.type==='order'){
    it.work = it.start.slice(); drawOrder(); chk.disabled=false;
  }
  chk.onclick=()=>grade();
  $('#qcard').scrollIntoView({block:'nearest'});
}

function drawOrder(lock,res){
  const it=cur;
  $('#olist').innerHTML = it.work.map((x,i)=>`<div class="oitem ${res?(x.i===i?'good':'bad'):''}"><span class="n">${i+1}</span><span class="txt">${esc(x.t)}</span>${lock?'':`<span class="mv"><button aria-label="Move up" data-u="${i}" ${i===0?'disabled':''}>${svg('up')}</button><button aria-label="Move down" data-d="${i}" ${i===it.work.length-1?'disabled':''}>${svg('chev')}</button></span>`}</div>`).join('');
  if(!lock){
    document.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{const i=+b.dataset.u;[it.work[i-1],it.work[i]]=[it.work[i],it.work[i-1]];drawOrder();});
    document.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const i=+b.dataset.d;[it.work[i+1],it.work[i]]=[it.work[i],it.work[i+1]];drawOrder();});
  }
}

function grade(){
  const it=cur, s=ST[it.st]; let ok=false, pickWhy='', given='';
  if(it.type==='mcq'){
    const sel=document.querySelector('.opt[aria-checked="true"]'), i=+sel.dataset.i, o=it.opts[i];
    ok=!!o.ok; given=o.t;
    document.querySelectorAll('.opt').forEach((b,j)=>{b.disabled=true; if(it.opts[j].ok) b.classList.add('right');});
    if(!ok){ sel.classList.add('wrongpick'); pickWhy=o.why; }
  } else if(it.type==='mark'){
    let miss=0, extra=0;
    document.querySelectorAll('.chunk').forEach((b,i)=>{b.disabled=true; const t=it.chunks[i][1], m=b.classList.contains('marked');
      b.classList.remove('marked');
      if(t&&m) b.classList.add('hit'); else if(t&&!m){b.classList.add('miss');miss++;} else if(!t&&m){b.classList.add('extra');extra++;}});
    ok=!miss&&!extra;
    given = ok?'All parts marked correctly':`${miss} missed, ${extra} marked that did not need it`;
    if(!ok) pickWhy = `${miss?`You missed ${miss} part${miss>1?'s':''} (shown with a dashed outline). `:''}${extra?`You marked ${extra} part${extra>1?'s':''} that ${extra>1?'are':'is'} not a fact, figure, date, name or source (shown crossed out).`:''}`;
  } else if(it.type==='sort'){
    let wrong=0;
    document.querySelectorAll('.row').forEach((r,i)=>{const sel=r.querySelector('select'), row=it.rows[i], good=sel.value===row.a; sel.disabled=true;
      r.classList.add(good?'good':'bad'); if(!good) wrong++;
      r.querySelector('.rfb').innerHTML = good?`${svg('check','color:var(--teal)')}<span>${esc(row.why)}</span>`:`${svg('x','color:var(--rose)')}<span>Correct label: <b>${row.a}</b>. ${esc(row.why)}</span>`;});
    ok=!wrong; given = ok?'All lines labelled correctly':`${wrong} line${wrong>1?'s':''} labelled incorrectly`;
    if(!ok) pickWhy='Each line now shows the correct label and the reason.';
  } else if(it.type==='order'){
    ok = it.work.every((x,i)=>x.i===i); given = it.work.map(x=>x.t).join(' / ');
    drawOrder(true,true);
    if(!ok) pickWhy='The correct order is: '+it.steps.map((t,i)=>`${i+1}. ${t}`).join('  ');
  }
  resp[it.id]={ok,given,st:it.st,w:weight(it),stem:it.stem,expl:it.expl,pos:idx+1};
  const fb=$('#fb');
  fb.className='fb show '+(ok?'ok':'no');
  fb.innerHTML = ok
    ? `<div class="fh">${svg('check')}Correct</div><p>${esc(it.expl)}</p>`
    : `<div class="fh">${svg('x')}Not quite</div>${pickWhy?`<p class="pick">${esc(pickWhy)}</p>`:''}<p>${esc(it.expl)}</p>
       <details><summary>${svg('open')}Revisit in Section 1.3: ${s.rev}</summary><div>${s.revTxt}</div></details>`;
  renderRail();
  const chk=$('#checkBtn'); const last=idx===seq.length-1;
  chk.disabled=false; chk.innerHTML = last?`See my result ${svg('right')}`:`Next question ${svg('right')}`;
  chk.onclick=()=>{ if(last) finish(); else { idx++; renderQ(); } };
  chk.focus({preventScroll:true});
}

function finish(){
  try{ localStorage.setItem('eval01-attempt', String(attempt)); }catch(e){}
  const all=Object.values(resp);
  const tot=all.reduce((a,r)=>a+r.w,0), got=all.reduce((a,r)=>a+(r.ok?r.w:0),0);
  const pct=Math.round(got/tot*100);
  const e4=all.filter(r=>ST[r.st].el===4), e4t=e4.reduce((a,r)=>a+r.w,0), e4g=e4.reduce((a,r)=>a+(r.ok?r.w:0),0);
  const e4p=Math.round(e4g/e4t*100);
  const pass = pct>=70 && e4p>=70;
  quizStarted=false; go(6);

  const C=2*Math.PI*80, col = pass?'var(--gold)':'var(--royal)';
  $('#ringCard').innerHTML = `<div class="ring"><svg viewBox="0 0 190 190"><circle cx="95" cy="95" r="80" fill="none" stroke="var(--line)" stroke-width="14"/><circle id="arc" cx="95" cy="95" r="80" fill="none" stroke="${col}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" style="transition:stroke-dashoffset 1.1s ease"/></svg><div class="v"><strong>${pct}%</strong><span>${got} of ${tot} marks</span></div></div>
   ${pass?`<span class="stamp">${svg('shield')}Checked and passed</span>`:`<span class="stamp fail">${svg('open')}Not yet. Try again.</span>`}
   <p style="margin-top:14px;color:var(--ink-2);font-size:.95rem">${pass?'You showed the checking habit clearly. Use it every time you work with an AI tool.':'Look at the stations below to see where to focus, then try again. You will get a new order of questions.'}</p>`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{const a=$('#arc'); if(a) a.style.strokeDashoffset=C*(1-pct/100);}));

  const g=(ok,title,val,sub)=>`<div class="card gate"><span class="ico-chip" style="background:${ok?'var(--teal-t)':'var(--rose-t)'};color:${ok?'var(--teal)':'var(--rose)'}">${svg(ok?'check':'x')}</span><div><b>${title}: ${val}%</b><small>${sub}</small></div></div>`;
  $('#gates').innerHTML = g(pct>=70,'Overall',pct,'Needs 70% or more') + g(e4p>=70,'First three stations',e4p,'Also needs 70%, on its own');

  $('#bars').innerHTML = '<h3>By station</h3>'+ORDER.map(k=>{const s=ST[k], rs=all.filter(r=>r.st===k), t=rs.reduce((a,r)=>a+r.w,0), gg=rs.reduce((a,r)=>a+(r.ok?r.w:0),0), p=Math.round(gg/t*100);
    return `<div class="b"><div class="bl"><span style="display:flex;gap:8px;align-items:center">${svg(s.icon,`color:${s.c};width:18px;height:18px`)}${s.name}</span><span class="mono">${rs.filter(r=>r.ok).length}/${rs.length}</span></div><div class="track2"><i style="width:0;background:${s.c}" data-w="${p}"></i></div></div>`;}).join('');
  setTimeout(()=>document.querySelectorAll('.track2 i').forEach(i=>i.style.width=i.dataset.w+'%'),120);

  $('#review').innerHTML = all.sort((a,b)=>a.pos-b.pos).map(r=>{const s=ST[r.st];return `<details><summary><span class="dotres" style="background:${r.ok?'var(--teal)':'var(--rose)'}">${svg(r.ok?'check':'x')}</span><span><b>Question ${r.pos}</b>, ${s.name}</span>${svg('chev','').replace('class="i"','class="i chev"')}</summary><div class="body"><p style="color:var(--ink)">${esc(r.stem)}</p><p><b>Your answer:</b> ${esc(r.given)}</p><p style="margin:0"><b>Why:</b> ${esc(r.expl)}</p></div></details>`;}).join('');
}

go(0);
})();

/* ==========================================================================
   Swift AI Academy — slide engine
   Shared by every activity (build.sh puts it at the top of each script.js).
   - Shows one slide at a time; the page itself never scrolls.
   - Scales each slide (through the root font size) until it fits the screen.
   - Owns the footer: progress dashes, Back, and the one amber primary button.
   Activity code talks to it through the global `Deck` object.
   ========================================================================== */
(function (window, document) {
  'use strict';

  var ICONS = {
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    'arrow-down': '<path d="M12 5v14M6 13l6 6 6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/>',
    warn: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    open: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    stop: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01"/>',
    mega: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    split: '<path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.2-2.9L3 3"/><path d="m15 9 6-6"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    id: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 10h4M14 14h4"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
    folder: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    tagi: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    flag: '<path d="M4 22V4a1 1 0 0 1 1-1h11l-2 4 2 4H5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    'check-sq': '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    sort: '<path d="M3 6h18M6 12h12M10 18h4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    flask: '<path d="M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3.3L14 9V3"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>'
  };

  function ic(name) {
    return '<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24">' + (ICONS[name] || '') + '</svg></span>';
  }

  // Turn every <span data-i="name"></span> into an inline icon.
  function hydrate(root) {
    var els = (root || document).querySelectorAll('[data-i]:not([data-ready])');
    for (var k = 0; k < els.length; k++) {
      var el = els[k];
      el.classList.add('ic');
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('data-ready', '');
      el.innerHTML = '<svg viewBox="0 0 24 24">' + (ICONS[el.getAttribute('data-i')] || '') + '</svg>';
    }
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function debounce(fn, ms) {
    var t;
    return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  }

  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
      document.body.appendChild(t);
    }
    t.innerHTML = ic('check') + '<span>' + esc(msg) + '</span>';
    t.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  // Copy text, with a fallback for browsers without the Clipboard API.
  function copyText(text, done) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* clipboard unavailable */ }
      document.body.removeChild(ta);
      if (done) done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { if (done) done(); }, fallback);
    } else {
      fallback();
    }
  }

  // Nothing is saved or sent anywhere, so learners keep their work as a file.
  function download(filename, text) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  var Deck = {
    slides: [],
    index: -1,
    hooks: {},

    init: function (hooks) {
      var self = this;
      this.hooks = hooks || {};
      this.app = document.querySelector('.app');
      this.slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
      this.primaryBtn = document.getElementById('primary');
      this.backBtn = document.getElementById('back');
      this.progress = document.getElementById('progress');
      this.lastWidth = window.innerWidth;
      this.slides.forEach(function (s) { s.setAttribute('aria-hidden', 'true'); });
      hydrate(document);

      this.primaryBtn.addEventListener('click', function () { self.primary(); });
      this.backBtn.addEventListener('click', function () { self.back(); });
      document.addEventListener('click', function (e) {
        var t = e.target.closest ? e.target.closest('[data-go]') : null;
        if (t) self.go(t.getAttribute('data-go'));
      });
      window.addEventListener('resize', debounce(function () { self.onResize(); }, 120));
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { self.fit(); });
      }
      this.go(0, true);
    },

    find: function (target) {
      if (typeof target === 'number') return target;
      for (var k = 0; k < this.slides.length; k++) {
        if (this.slides[k].id === target) return k;
      }
      return -1;
    },

    current: function () { return this.slides[this.index]; },

    hook: function () {
      var s = this.current();
      return s ? this.hooks[s.id] : null;
    },

    go: function (target, first) {
      var i = this.find(target);
      if (i < 0 || i >= this.slides.length) return;
      var prev = this.current();
      var prevHook = this.hook();
      if (prev && prevHook && prevHook.leave) prevHook.leave(this, prev);
      if (prev) {
        prev.classList.remove('show');
        prev.setAttribute('aria-hidden', 'true');
      }

      this.index = i;
      var s = this.current();
      this.setPrimary(s.getAttribute('data-next') || 'Continue', {
        hidden: s.getAttribute('data-primary') === 'off',
        icon: s.getAttribute('data-icon') || 'arrow-right'
      });
      this.setBack(i > 0 && s.getAttribute('data-back') !== 'off');
      this.drawDashes();

      var h = this.hook();
      if (h && h.enter) h.enter(this, s);
      hydrate(s);
      this.fit();
      s.classList.add('show');
      s.removeAttribute('aria-hidden');

      if (!first) {
        var head = s.querySelector('h1, h2');
        if (head) {
          head.setAttribute('tabindex', '-1');
          try { head.focus({ preventScroll: true }); } catch (e) { head.focus(); }
        }
      }
    },

    next: function () { this.go(this.index + 1); },

    back: function () {
      var h = this.hook();
      if (h && h.back && h.back(this) === false) return;
      var to = this.current().getAttribute('data-back-to');
      this.go(to ? this.find(to) : this.index - 1);
    },

    primary: function () {
      if (this.primaryBtn.disabled || this.primaryBtn.hidden) return;
      var h = this.hook();
      if (h && h.primary && h.primary(this) === false) return;
      this.next();
    },

    setPrimary: function (label, opts) {
      opts = opts || {};
      var b = this.primaryBtn;
      var iconName = opts.icon === undefined ? 'arrow-right' : opts.icon;
      b.hidden = !!opts.hidden;
      b.disabled = !!opts.disabled;
      b.innerHTML = '<span>' + esc(label) + '</span>' + (iconName ? ic(iconName) : '');
    },

    enablePrimary: function (on) { this.primaryBtn.disabled = !on; },

    setBack: function (show) { this.backBtn.hidden = !show; },

    drawDashes: function () {
      var html = '<div class="dashes" aria-hidden="true">';
      for (var k = 0; k < this.slides.length; k++) {
        html += '<i class="' + (k < this.index ? 'done' : (k === this.index ? 'cur' : '')) + '"></i>';
      }
      html += '</div><span class="count">' + (this.index + 1) + ' / ' + this.slides.length + '</span>';
      this.progress.innerHTML = html;
      this.progress.setAttribute('aria-label', 'Screen ' + (this.index + 1) + ' of ' + this.slides.length);
    },

    // Replace the dashes with custom progress (used by the quiz screens).
    setProgress: function (html, label) {
      this.progress.innerHTML = html;
      if (label) this.progress.setAttribute('aria-label', label);
    },

    overflows: function (card) {
      return card.scrollHeight > card.clientHeight + 1 ||
        card.scrollWidth > card.clientWidth + 1 ||
        this.app.scrollHeight > this.app.clientHeight + 1;
    },

    // Shrink the whole frame a little at a time until the slide fits.
    // Only on very small screens does the card itself get a scrollbar.
    fit: function () {
      var s = this.current();
      if (!s) return;
      var card = s.querySelector('.card') || s.firstElementChild;
      if (!card) return;
      var root = document.documentElement;
      var w = window.innerWidth;
      var h = window.innerHeight;
      var size = w <= 760 ? 15 : Math.max(13, Math.min(17, h / 50));
      var guard = 0;
      card.classList.remove('scroll');
      root.style.fontSize = size + 'px';
      while (this.overflows(card) && size > 12 && guard++ < 30) {
        size -= 0.5;
        root.style.fontSize = size + 'px';
      }
      if (this.overflows(card)) card.classList.add('scroll');
    },

    onResize: function () {
      var a = document.activeElement;
      var typing = a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName);
      // A phone keyboard opening changes only the height: do not rescale mid-typing.
      if (typing && window.innerWidth === this.lastWidth) return;
      this.lastWidth = window.innerWidth;
      this.fit();
    }
  };

  window.Deck = Deck;
  window.SAA = {
    ic: ic,
    esc: esc,
    hydrate: hydrate,
    shuffle: shuffle,
    toast: toast,
    copyText: copyText,
    download: download
  };
})(window, document);
/* ==========================================================================
   Section Check: Check Before You Use (AAI-E-MC1-S03-EVAL01)
   A short refresher, then 20 questions in five stations.
   - Decision questions are worth 2 marks, recall questions 1 mark.
   - Pass = 70% overall AND 70% in the first three stations (the Element 4
     group), which a high score later cannot make up for.
   - Unlimited tries; each try reshuffles questions, options and rows.
   Nothing is saved or sent anywhere, apart from the attempt number, which
   is kept in this browser only.
   ========================================================================== */
(function () {
  'use strict';
  var ic = SAA.ic, esc = SAA.esc;
  function $(id) { return document.getElementById(id); }

  /* Stations. gate: counted in the Element 4 group that must reach 70% on its own.
     PC tags follow the workbook ranges; confirm the split with the content expert. */
  var ST = {
    A: { name: 'Confidence', icon: 'mega', gate: true, pc: 'PC 4.1 to 4.5', rev: 'Sounding sure is not being right',
      revTxt: 'A smooth, sure answer tells you nothing about whether it is true. Treat every detail as unconfirmed until you check it.' },
    B: { name: 'Mark', icon: 'pen', gate: true, pc: 'PC 4.1 to 4.5', rev: 'Mark every fact',
      revTxt: 'Before sending, mark every fact, number, date, name and source in the AI answer. Opinions and general wishes do not need a source.' },
    C: { name: 'Separate', icon: 'split', gate: true, pc: 'PC 4.1 to 4.5', rev: 'Separate what you can prove',
      revTxt: 'Supported means your source confirms it. Unsupported means you have nothing to confirm it yet. Contradicted means your source says something different.' },
    D: { name: 'Verify and correct', icon: 'shield', gate: false, pc: 'PC 5.1 to 5.4', rev: 'Verify and correct',
      revTxt: 'Check each marked item against the original: the notice, register, manual or the person responsible. Fix wrong details from that source, not from the AI.' },
    E: { name: 'Qualify or remove', icon: 'question', gate: false, pc: 'PC 5.1 to 5.4', rev: 'Qualify or remove',
      revTxt: 'If you cannot confirm a detail in time, say clearly that it is not confirmed, or take it out. For safety, money and official dates: confirm it or remove it.' }
  };
  var ORDER = ['A', 'B', 'C', 'D', 'E'];

  var ITEMS = [
    /* ---------- A: Confidence ---------- */
    { id: 'Q01', st: 'A', recall: true, type: 'mcq', ctx: 'General',
      stem: 'An AI reply sounds very sure of itself and gives exact numbers. What does that tell you about whether it is correct?',
      opts: [
        { t: 'It is probably correct, because AI learns from a lot of data.', why: 'Learning from a lot of data does not make every detail right for your situation. The tool can still get numbers wrong.' },
        { t: 'Nothing on its own. Sounding sure is not proof.', ok: true },
        { t: 'It is correct if the reply also gives a reason.', why: 'A reason can be made up just as easily as a number. You still need a real source.' },
        { t: 'It is correct if it matches what you expected.', why: 'Matching your guess feels good, but your guess is not a source either.' }],
      expl: 'How sure a reply sounds and whether it is true are two different things. Only a reliable source can confirm a detail.' },
    { id: 'Q02', st: 'A', type: 'mcq', ctx: 'College campus',
      doc: { title: 'Campus notice, AI draft', lines: ['Annual Sports Meet 2026. The event will be held on 14 February in the Main Auditorium, as approved by the Principal. All class groups must register by 7 February.'] },
      stem: 'Anjali, a first-year volunteer, asked an AI tool to draft this notice. It reads well. What should she do before posting it?',
      opts: [
        { t: 'Post it. The language is formal and clear.', why: 'Good language does not prove the date, place, approval or deadline. A wrong date can mislead the whole campus.' },
        { t: 'Check the dates, the place and the approval against the approval letter, or with the event coordinator.', ok: true },
        { t: 'Ask the AI “Are you sure?” and post it if it says yes.', why: 'The same tool will often just repeat itself. Asking it again is not a check.' },
        { t: 'Add “Made with AI” at the bottom and post it.', why: 'A label does not fix wrong details. Readers will still act on the dates.' }],
      expl: 'Every date, place and approval in a notice must be confirmed from the real source before it goes up.' },
    { id: 'Q03', st: 'A', type: 'mcq', ctx: 'ITI class',
      doc: { title: 'Attendance summary, AI draft', lines: ['Batch B had 92% attendance in March.'] },
      stem: 'You open the attendance record book. The March summary is not filled in yet. How should you describe this AI claim?',
      opts: [
        { t: 'False. The AI made a mistake.', why: 'You have found nothing that says it is wrong. You just cannot confirm it. That is not the same as proving it false.' },
        { t: 'Unsupported. You cannot confirm it yet, so do not use it as it is.', ok: true },
        { t: 'True. An AI would not make up an exact number like 92%.', why: 'AI tools can and do produce exact-looking numbers with nothing behind them.' },
        { t: 'Supported, because the record book does not disagree.', why: 'Silence is not support. A source has to actually confirm the number.' }],
      expl: 'Unsupported means you have no proof either way. Contradicted means a source says something different. Neither is safe to send as it is.' },

    /* ---------- B: Mark ---------- */
    { id: 'Q04', st: 'B', type: 'mark', ctx: 'ITI industrial visit',
      docTitle: 'Industrial visit note, AI draft',
      stem: 'Tap every part of this AI draft that you must check before it goes into the record book. Tap again to unmark.',
      chunks: [['On 12 September,', 1], ['trainees of the Fitter trade', 0], ['visited', 0], ['Navjyoti Tools Pvt. Ltd.', 1], ['with', 0], ['28 trainees in the group.', 1], ['The plant supervisor,', 0], ['Mr. Suresh Deshmukh,', 1], ['explained the CNC section.', 0], ['The plant makes', 0], ['4,000 gear parts a day.', 1], ['It was a good learning day for everyone.', 0]],
      expl: 'The date, the company name, the number of trainees, the supervisor’s name and the production number are all facts, numbers, dates or names. Any of them could be wrong. “A good learning day” is an opinion, so it does not need checking.' },
    { id: 'Q05', st: 'B', type: 'mark', ctx: 'College project',
      docTitle: 'Project brief, AI draft',
      stem: 'Tap every part that needs checking before Farhan’s team hands in this brief.',
      chunks: [['According to a 2023 national education report,', 1], ['64% of students', 1], ['prefer online classes.', 0], ['Our survey of', 0], ['120 students', 1], ['will run from', 0], ['5 to 12 August.', 1], ['Team lead:', 0], ['Farhan Qureshi.', 1], ['We hope to learn more about how students like to study.', 0]],
      expl: 'A vague source (“a national education report”) is a warning sign and must be traced. The 64%, the number of students, the dates and the name all need checking. The last line is a general aim, not a claim.' },
    { id: 'Q06', st: 'B', recall: true, type: 'mcq', ctx: 'General',
      stem: 'Which parts of an AI answer must you mark before you send it?',
      opts: [
        { t: 'Only the numbers.', why: 'Numbers matter, but dates, names and sources can be wrong too.' },
        { t: 'Every fact, number, date, name and source.', ok: true },
        { t: 'Only the lines that look wrong to you.', why: 'Mistakes often look normal. That is why you mark every detail, not just the odd ones.' },
        { t: 'Only the first paragraph, because that is what people read.', why: 'People act on details anywhere in the text, even the last line.' }],
      expl: 'Mark all five: facts, numbers, dates, names and sources.' },
    { id: 'Q07', st: 'B', type: 'mcq', ctx: 'ITI workshop',
      doc: { title: 'Tool list summary, AI draft', lines: ['Torque wrenches: 18', 'Vernier callipers: 12', 'Bench vices: 9', 'Last stock check: 3 August'] },
      stem: 'Meena typed the stores register into an AI tool and asked for this summary. She is short on time. Which lines should she check against the register?',
      opts: [
        { t: 'Only the first line, as a spot check.', why: 'One correct line says nothing about the others. The tool can miscount any item.' },
        { t: 'Every count, every item name and the date.', ok: true },
        { t: 'Only the items she remembers ordering recently.', why: 'Memory is not a check. Older items can be miscounted too.' },
        { t: 'None. She gave the tool the data, so it must be right.', why: 'AI tools can drop, mix up or change numbers, even when your data was correct.' }],
      expl: 'Even when you give it the data, AI can copy it wrongly. Check each number, name and date against the register.' },

    /* ---------- C: Separate ---------- */
    { id: 'Q08', st: 'C', type: 'sort', ctx: 'College event',
      labels: ['Supported', 'Unsupported', 'Contradicted'],
      evidence: 'Registration sheet: 212 registrations. Event date: 3 March (one day only). Winners’ board photo: Team Circuit, first prize.',
      docTitle: 'Tech Fest report, AI draft',
      stem: 'Label each line of the AI draft. Use only the evidence you have.',
      rows: [
        { t: '212 students registered for the fest.', a: 'Supported', why: 'The registration sheet shows 212.' },
        { t: 'Team Circuit won first prize.', a: 'Supported', why: 'The winners’ board confirms it.' },
        { t: 'The chief guest praised the robotics stall.', a: 'Unsupported', why: 'Nothing you have mentions the chief guest.' },
        { t: 'The fest was held over two days.', a: 'Contradicted', why: 'The sheet says one day only: 3 March.' },
        { t: 'More than 500 people attended.', a: 'Unsupported', why: 'Registrations are not attendance. You have no number for attendance.' }],
      expl: 'Keep what your evidence confirms. Treat the rest as unsupported or contradicted.' },
    { id: 'Q09', st: 'C', type: 'mcq', ctx: 'General',
      stem: 'Why separate an AI draft into supported and unsupported parts, instead of just deleting the whole draft?',
      opts: [
        { t: 'Because deleting the whole draft is always safer.', why: 'Deleting everything throws away work you have already checked. Separating keeps what is useful.' },
        { t: 'So you keep what you have confirmed, and deal only with the parts you cannot back up.', ok: true },
        { t: 'Because unsupported parts are usually correct anyway.', why: 'Unsupported means unknown. You cannot assume it is correct.' },
        { t: 'Because the facilitator only reads the supported parts.', why: 'Readers see the whole text. Every part has to be dealt with.' }],
      expl: 'Separating lets you use the checked parts with confidence, and fix, qualify or remove only what is left.' },
    { id: 'Q10', st: 'C', type: 'sort', ctx: 'ITI workshop notice',
      labels: ['Supported', 'Unsupported', 'Contradicted'],
      evidence: 'Facilitator’s message: Fitting practical moved to Monday, 2 PM, Workshop 1. Bring your record book.',
      docTitle: 'Workshop notice, AI draft',
      stem: 'Label each line of the AI draft using the facilitator’s message.',
      rows: [
        { t: 'The practical is on Monday.', a: 'Supported', why: 'The message says Monday.' },
        { t: 'It starts at 2 PM.', a: 'Supported', why: 'The message says 2 PM.' },
        { t: 'It will be held in Workshop 4.', a: 'Contradicted', why: 'The message says Workshop 1.' },
        { t: 'Tools will be given out at the gate.', a: 'Unsupported', why: 'The message says nothing about tools.' },
        { t: 'Bring your record book.', a: 'Supported', why: 'The message says this.' }],
      expl: 'Compare each line with the source, one by one. Helpful-sounding extras that the source never mentioned are unsupported.' },
    { id: 'Q11', st: 'C', type: 'mcq', ctx: 'College survey',
      doc: { title: 'Survey summary, AI draft', lines: ['Most students (about 70%) want the library open till 9 PM.'] },
      stem: 'Your own survey sheet shows that 41 out of 90 students said yes to a 9 PM closing time. How should you treat the AI’s line?',
      opts: [
        { t: 'Supported, because “most” is a loose word.', why: '41 out of 90 is less than half. “Most” does not fit.' },
        { t: 'Unsupported, because you need more data first.', why: 'You already have data, and it disagrees with the claim.' },
        { t: 'Contradicted. Your data shows about 46%, which is not most.', ok: true },
        { t: 'Fine to use if you delete the “about 70%” part.', why: '“Most students” would still be wrong, because fewer than half said yes.' }],
      expl: 'When your own source gives a different answer, the claim is contradicted. It must be corrected, not just trimmed.' },

    /* ---------- D: Verify and correct ---------- */
    { id: 'Q12', st: 'D', type: 'order', ctx: 'General',
      stem: 'Put these steps in the order you should follow before using an AI answer. Use the arrows to move them.',
      steps: ['Mark every fact, number, date, name and source', 'Check each marked item against a reliable source', 'Separate what is supported from what is not', 'Correct it, qualify it, or remove it', 'Read the final version once more before sending'],
      expl: 'Mark first so nothing is missed. Then check, then separate, then fix. Finally, read it once more.' },
    { id: 'Q13', st: 'D', type: 'mcq', ctx: 'ITI class',
      stem: 'Rahul wants to confirm the date of an internal test that an AI draft mentions. Which source should he use?',
      opts: [
        { t: 'The same AI tool, with a clearer prompt.', why: 'The tool cannot see your institute’s timetable. A better prompt does not change that.' },
        { t: 'The official test notice from the institute, or the facilitator.', ok: true },
        { t: 'A message forwarded in the class group.', why: 'Forwards can be old or changed. Go to the original notice.' },
        { t: 'A different AI tool.', why: 'A second AI has the same problem as the first. It is not a source.' }],
      expl: 'Go back to the original: the official notice, or the person responsible.' },
    { id: 'Q14', st: 'D', recall: true, type: 'mcq', ctx: 'General',
      stem: 'You find a wrong number in an AI draft. What is the right way to fix it?',
      opts: [
        { t: 'Replace it with the number from a reliable source.', ok: true },
        { t: 'Ask the AI to guess again.', why: 'A new guess is still a guess.' },
        { t: 'Round it off so it looks less exact.', why: 'A rounded wrong number is still wrong.' },
        { t: 'Leave it. One number will not matter much.', why: 'People make decisions from numbers. One wrong number can cause real problems.' }],
      expl: 'Correct it from a reliable source, never from another guess.' },
    { id: 'Q15', st: 'D', type: 'mcq', ctx: 'College office',
      doc: { title: 'Attendance summary, AI draft', lines: ['Rohan Mehta: present 18 of 20 days.', 'Sana Iqbal: present 20 of 20 days.', 'Arjun Nair: present 15 of 20 days.'] },
      stem: 'Priya checks the register. It shows Rohan was present 16 of 20 days, not 18. What is the best next step?',
      opts: [
        { t: 'Change Rohan’s line to 16 of 20, and check every other name against the register too.', ok: true },
        { t: 'Change Rohan’s line to 16 of 20 and send it. The mistake is fixed.', why: 'One mistake is a warning that there may be others. The other lines still need checking.' },
        { t: 'Ask the AI to find and fix its own mistakes.', why: 'The tool made the mistake. The register is the source.' },
        { t: 'Delete Rohan’s line so the summary has no wrong data.', why: 'Removing a line you can fix leaves the record incomplete. The register has the right number.' }],
      expl: 'Fix the mistake from the source, then check the rest. Finding one mistake is a signal to look harder.' },
    { id: 'Q16', st: 'D', type: 'mcq', ctx: 'ITI workshop',
      doc: { title: 'AI reply', lines: ['This drill machine runs on 230 V, 50 Hz single-phase supply.'] },
      stem: 'Before connecting a drill machine in his workshop, Joseph asked an AI tool for its voltage. How should he check this?',
      opts: [
        { t: 'Read the rating plate on the machine, or its manual.', ok: true },
        { t: 'Trust it, since 230 V is standard in India.', why: 'Common is not the same as correct for this machine. Some machines need a different supply. A wrong connection is a safety risk.' },
        { t: 'Search online and use the first result.', why: 'The first result may be for a different model. The machine’s own plate is the source.' },
        { t: 'Connect it, and ask the instructor later if something seems wrong.', why: 'Safety details must be confirmed before use, not after.' }],
      expl: 'For equipment, the rating plate or the manual is the reliable source. With safety, check before you act.' },

    /* ---------- E: Qualify or remove ---------- */
    { id: 'Q17', st: 'E', type: 'mcq', ctx: 'College project',
      doc: { title: 'Project brief, AI draft', lines: ['Rooftop solar panels pay back their full cost within 3 years.'] },
      stem: 'You cannot find a reliable source for this line before the deadline. It is not central to your project. What is the best choice?',
      opts: [
        { t: 'Keep it. It sounds reasonable.', why: 'Sounding reasonable is not proof. Unchecked numbers in your work can mislead readers.' },
        { t: 'Remove it, or clearly mark it as not yet confirmed.', ok: true },
        { t: 'Change “3 years” to “5 years” to be safe.', why: 'That swaps one unchecked number for another.' },
        { t: 'Add “according to experts” before it.', why: 'That invents a source. It makes the claim look checked when it is not.' }],
      expl: 'If you cannot confirm it in time, say so honestly, or remove it.' },
    { id: 'Q18', st: 'E', type: 'mcq', ctx: 'ITI workshop',
      stem: 'Which is a proper way to qualify a number you have not been able to confirm yet?',
      opts: [
        { t: '“Studies prove that stock is 18 units.”', why: 'This claims proof you do not have.' },
        { t: '“Stock: 18 units (not yet checked against the stores register; will update after checking).”', ok: true },
        { t: '“Stock: about 18 units.”', why: '“About” hides the problem. The reader still thinks it was checked.' },
        { t: '“Stock: 18 units, as everyone knows.”', why: 'This adds false confidence instead of honesty.' }],
      expl: 'A good qualification says clearly what is not confirmed, and what you will do about it.' },
    { id: 'Q19', st: 'E', type: 'mcq', ctx: 'ITI safety notice',
      doc: { title: 'Workshop safety notice, AI draft', lines: ['In case of fire, use the extinguisher near Gate 2.'] },
      stem: 'Gurpreet is not sure where the extinguisher really is. The notice goes up today. What should he do?',
      opts: [
        { t: 'Write “near Gate 2 (to be confirmed)” and put it up.', why: 'In an emergency, nobody has time to confirm. A wrong location on a safety notice can put people at risk.' },
        { t: 'Check the location himself, or with the workshop in-charge, before posting. If he cannot, leave that line out.', ok: true },
        { t: 'Keep it, since extinguishers are usually near gates.', why: '“Usually” is a guess. Safety information must be exact.' },
        { t: 'Remove every safety instruction from the notice.', why: 'That removes useful information that may be correct. Only the unconfirmed line is the problem.' }],
      expl: 'For safety details, qualifying is not enough. Confirm it, or remove it.' },
    { id: 'Q20', st: 'E', type: 'sort', ctx: 'College fee notice',
      labels: ['Keep', 'Correct', 'Qualify', 'Remove'],
      evidence: 'Official fee notice: last date 30 June; late fee ₹500. The accounts office said online payment is “likely next week, not confirmed”. Nothing about extensions.',
      docTitle: 'Fee reminder, AI draft',
      stem: 'Choose the right action for each line of this AI draft.',
      rows: [
        { t: 'Last date for fee submission: 30 June.', a: 'Keep', why: 'The official notice confirms it.' },
        { t: 'Late fee: ₹200.', a: 'Correct', why: 'The notice says ₹500. Fix it from the source.' },
        { t: 'Online payment will open next week.', a: 'Qualify', why: 'The office said it is likely, but not confirmed. Say that clearly.' },
        { t: 'The office may extend the last date if needed.', a: 'Remove', why: 'There is no source for this, and it could make students miss the deadline.' }],
      expl: 'Keep what is confirmed. Correct what is wrong. Qualify what is uncertain. Remove what has no basis.' }
  ];

  /* ---------- refresher and safety content ---------- */
  var MOVES = [
    { st: 'B', title: 'Mark', txt: 'Go through the AI answer and mark every fact, number, date, name and source.',
      ex: '“Seminar on <u>14 March</u> in <u>Hall B</u>, confirmed by <u>the HOD</u>.” That is three things to check.' },
    { st: 'C', title: 'Separate', txt: 'Sort what you marked into what your source confirms, and what it does not.',
      ex: 'The notice confirms 14 March. It says nothing about Hall B, so Hall B is unsupported.' },
    { st: 'D', title: 'Verify and correct', txt: 'Check each marked item against the original source. Fix anything wrong using that source.',
      ex: 'The HOD’s email says Seminar Room 2, not Hall B. Change it.' },
    { st: 'E', title: 'Qualify or remove', txt: 'If you cannot confirm something in time, say so clearly, or take it out.',
      ex: '“Refreshments will be served” has no source. Remove it, or write “refreshments not yet confirmed”.' }
  ];
  var NOS = [['lock', 'Passwords'], ['id', 'Aadhaar or ID numbers'], ['phone', 'Phone numbers'], ['home', 'Home addresses'],
    ['heart', 'Health information'], ['award', 'Marks and results'], ['brief', 'Employer secrets'], ['folder', 'Institute records']];
  var SRCS = [
    ['file', 'The original notice or letter', 'Where the information first came from.'],
    ['book', 'The register or record book', 'Attendance, stores and practical records.'],
    ['tagi', 'The rating plate or manual', 'For any machine, tool or equipment.'],
    ['user', 'The person responsible', 'Your facilitator, coordinator or in-charge.'],
    ['table', 'Your own data sheet', 'Survey forms and logs you are allowed to use.'],
    ['globe', 'Your institute’s website', 'Official news, not forwards or screenshots.']
  ];
  var DEMO = {
    draft: {
      text: 'Welding practical for Batch A is on <span class="m-wrong">Friday, 16 October at 9 AM</span> in <span class="m-wrong">Workshop 3</span>. <span class="m-wrong">Face shields and gloves will be provided by the institute.</span> <span class="m-wrong">As per the new rules, trainees below 80% attendance will not be allowed to appear.</span>',
      notes: [
        ['bad', 'flag', 'It looks ready to send. It is clear, polite and sure of itself.'],
        ['info', 'alert', 'But four details do not match the source, or have no source at all. Tap <strong>After checking</strong> to see Kavya’s fixes.']
      ]
    },
    checked: {
      text: 'Welding practical for Batch A is on <span class="m-ok">Thursday, 15 October at 10 AM</span> in <span class="m-ok">Workshop 2</span>. <span class="m-ok">Please bring your own safety gloves.</span> <span class="m-cut">As per the new rules, trainees below 80% attendance will not be allowed to appear.</span>',
      notes: [
        ['ok', 'shield', '<strong>Corrected</strong> the day, date, time and workshop, using the facilitator’s message.'],
        ['ok', 'pen', '<strong>Corrected</strong> “gloves will be provided” to “bring your own”, as the message says.'],
        ['info', 'scissors', '<strong>Removed</strong> the attendance rule. No rule was named, and the message did not mention it. Kavya can ask the facilitator if it matters.']
      ]
    }
  };

  /* ---------- static slides ---------- */
  var tabs = $('routine-tabs');
  tabs.innerHTML = MOVES.map(function (m, i) {
    return '<button type="button" aria-pressed="' + (i === 0) + '" data-step="' + i + '"><span class="step-n">' + (i + 1) + '</span>' + esc(m.title.split(' ')[0]) + '</button>';
  }).join('');
  function showStep(i) {
    var m = MOVES[i], s = ST[m.st];
    tabs.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-step') === i)); });
    $('routine-panel').innerHTML =
      '<div class="row"><span class="dot-ic lg">' + ic(s.icon) + '</span><div class="head"><span class="kicker">Step ' + (i + 1) + ' of 4</span><h3 class="step-title">' + esc(m.title) + '</h3></div></div>' +
      '<p class="body">' + esc(m.txt) + '</p>' +
      '<div class="doc"><div class="doc-head">' + ic('eye') + 'Example</div>' + m.ex + '</div>';
    Deck.fit();
  }
  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('[data-step]');
    if (b) showStep(parseInt(b.getAttribute('data-step'), 10));
  });

  $('never-grid').innerHTML = NOS.map(function (n) {
    return '<div class="tile center"><span class="dot-ic bad">' + ic(n[0]) + '</span><h3>' + esc(n[1]) + '</h3></div>';
  }).join('');
  $('source-grid').innerHTML = SRCS.map(function (s) {
    return '<div class="tile"><span class="dot-ic">' + ic(s[0]) + '</span><h3>' + esc(s[1]) + '</h3><p>' + esc(s[2]) + '</p></div>';
  }).join('');
  $('route-rail').innerHTML = ORDER.map(function (k, i) {
    var n = ITEMS.filter(function (it) { return it.st === k; }).length;
    return '<li><span class="dot-ic">' + ic(ST[k].icon) + '</span><span class="route-name">' + (i + 1) + '. ' + esc(ST[k].name) + '</span><span class="route-sub">' + n + ' questions</span></li>';
  }).join('');

  function showDemo(v) {
    $('demo-tabs').querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-v') === v)); });
    $('demo-text').innerHTML = DEMO[v].text;
    $('demo-notes').innerHTML = DEMO[v].notes.map(function (n) {
      return '<div class="callout ' + n[0] + '">' + ic(n[1]) + '<span>' + n[2] + '</span></div>';
    }).join('');
    Deck.fit();
  }
  $('demo-tabs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-v]');
    if (b) showDemo(b.getAttribute('data-v'));
  });

  /* ---------- the check ---------- */
  var attempt = 1;
  try { attempt = (parseInt(localStorage.getItem('eval01-attempt'), 10) || 0) + 1; } catch (e) { /* storage blocked */ }
  var seq = [], idx = 0, resp = {}, cur = null, graded = false;
  var qcard = $('qcard');
  function weight(it) { return it.recall ? 1 : 2; }

  // Stations stay in order; questions, options and rows are shuffled inside them.
  function buildSeq() {
    seq = [];
    ORDER.forEach(function (k) {
      seq = seq.concat(SAA.shuffle(ITEMS.filter(function (x) { return x.st === k; })));
    });
    seq = seq.map(function (it) {
      var c = Object.assign({}, it);
      if (c.opts) c.opts = SAA.shuffle(c.opts);
      if (c.rows) c.rows = SAA.shuffle(c.rows);
      if (c.steps) {
        var s;
        do { s = SAA.shuffle(c.steps.map(function (t, i) { return { t: t, i: i }; })); }
        while (s.every(function (x, i) { return x.i === i; }));
        c.work = s;
      }
      return c;
    });
  }

  function startQuiz() {
    buildSeq();
    idx = 0;
    resp = {};
    Deck.go('quiz');
  }

  function drawProgress() {
    var pct = Math.round(idx / seq.length * 100);
    Deck.setProgress(
      '<div class="qprog"><div class="bar"><i style="width:' + pct + '%"></i></div>' +
      '<span>Question ' + (idx + 1) + ' of ' + seq.length + '</span></div>',
      'Question ' + (idx + 1) + ' of ' + seq.length);
  }

  var HINTS = {
    mcq: 'Choose the best answer, then press <strong>Check answer</strong>. You will see why here.',
    mark: 'Tap each part that needs checking, then press <strong>Check answer</strong>.',
    sort: 'Choose a label for every line, then press <strong>Check answer</strong>.',
    order: 'Use the arrows to put the steps in order, then press <strong>Check answer</strong>.'
  };

  function docBox(title, inner) {
    return '<div class="doc"><div class="doc-head">' + ic('bot') + esc(title) + '<span class="tag">Made-up example</span></div>' + inner + '</div>';
  }

  function renderQ() {
    cur = seq[idx];
    graded = false;
    var it = cur, s = ST[it.st], w = weight(it);
    var body = '';
    if (it.doc) body += docBox(it.doc.title, it.doc.lines.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join(''));
    if (it.evidence) body += '<div class="doc source"><div class="doc-head">' + ic('file') + 'What you have (the source)</div>' + esc(it.evidence) + '</div>';
    body += '<h2 class="q-stem" id="qstem" tabindex="-1">' + esc(it.stem) + '</h2>';

    if (it.type === 'mcq') {
      body += '<div class="opts" role="radiogroup" aria-labelledby="qstem">' + it.opts.map(function (o, i) {
        return '<button type="button" class="opt" role="radio" aria-checked="false" data-opt="' + i + '"><span class="radio"></span><span>' + esc(o.t) + '</span></button>';
      }).join('') + '</div>';
    } else if (it.type === 'mark') {
      body += docBox(it.docTitle, '<div class="chunks">' + it.chunks.map(function (c, i) {
        return '<button type="button" class="chunk" aria-pressed="false" data-chunk="' + i + '">' + esc(c[0]) + '</button>';
      }).join(' ') + '</div>');
      body += '<div class="markbar">' + ic('pen') + '<span id="mcount">Nothing marked yet</span></div>';
    } else if (it.type === 'sort') {
      body += '<div class="doc-head">' + ic('bot') + esc(it.docTitle) + '</div>';
      body += '<div class="srows">' + it.rows.map(function (r, i) {
        return '<div class="srow" data-row="' + i + '"><span class="srow-text">' + esc(r.t) + '</span>' +
          '<label class="select"><span class="sr-only">Label for: ' + esc(r.t) + '</span><select data-sel="' + i + '"><option value="">Choose</option>' +
          it.labels.map(function (l) { return '<option>' + esc(l) + '</option>'; }).join('') + '</select>' + ic('down') + '</label>' +
          '<div class="srow-fb"></div></div>';
      }).join('') + '</div>';
    } else if (it.type === 'order') {
      body += '<ol class="olist" id="olist"></ol>';
    }

    qcard.innerHTML =
      '<div class="q-meta"><span class="q-kicker">' + ic(s.icon) + ' ' + esc(s.name) + '</span>' +
      '<span class="tag">' + esc(it.ctx) + '</span><span class="tag">' + w + ' mark' + (w > 1 ? 's' : '') + '</span></div>' +
      '<div class="quiz-grid"><div class="quiz-main">' + body + '</div>' +
      '<div class="quiz-side" id="side"><div class="hint">' + ic('info') + '<span>' + HINTS[it.type] + '</span></div></div></div>';

    Deck.setPrimary('Check answer', { disabled: it.type !== 'order', icon: 'check' });
    if (it.type === 'order') drawOrder(false, false);
    drawProgress();
    Deck.fit();
    var stem = $('qstem');
    try { stem.focus({ preventScroll: true }); } catch (e) { stem.focus(); }
  }

  // All answer interactions, delegated from the question card.
  qcard.addEventListener('click', function (e) {
    if (graded || !cur) return;
    var t;
    if ((t = e.target.closest('.opt'))) {
      qcard.querySelectorAll('.opt').forEach(function (x) { x.setAttribute('aria-checked', String(x === t)); });
      Deck.enablePrimary(true);
    } else if ((t = e.target.closest('.chunk'))) {
      var on = t.getAttribute('aria-pressed') !== 'true';
      t.setAttribute('aria-pressed', String(on));
      var n = qcard.querySelectorAll('.chunk[aria-pressed="true"]').length;
      $('mcount').textContent = n ? n + ' part' + (n > 1 ? 's' : '') + ' marked' : 'Nothing marked yet';
      Deck.enablePrimary(n > 0);
    } else if ((t = e.target.closest('[data-up],[data-down]'))) {
      var up = t.hasAttribute('data-up');
      var i = parseInt(t.getAttribute(up ? 'data-up' : 'data-down'), 10);
      var j = up ? i - 1 : i + 1;
      var tmp = cur.work[i]; cur.work[i] = cur.work[j]; cur.work[j] = tmp;
      drawOrder(false, false);
      // Keep keyboard focus on the item that moved.
      var next = qcard.querySelector('[data-' + (up ? 'up' : 'down') + '="' + j + '"]:not(:disabled)') ||
        qcard.querySelector('[data-' + (up ? 'down' : 'up') + '="' + j + '"]');
      if (next) next.focus();
    }
  });
  qcard.addEventListener('change', function (e) {
    if (!e.target.matches('select') || graded) return;
    var all = qcard.querySelectorAll('.srow select');
    Deck.enablePrimary(Array.prototype.every.call(all, function (x) { return !!x.value; }));
  });

  function drawOrder(lock, result) {
    $('olist').innerHTML = cur.work.map(function (x, i) {
      var state = result ? (x.i === i ? ' good' : ' bad') : '';
      return '<li class="oitem' + state + '"><span class="dot-ic sm">' + (i + 1) + '</span><span class="otext">' + esc(x.t) + '</span>' +
        (lock ? (result ? ic(x.i === i ? 'check' : 'x') : '') :
          '<span class="omove">' +
          '<button type="button" class="icon-btn" data-up="' + i + '" aria-label="Move up: ' + esc(x.t) + '"' + (i === 0 ? ' disabled' : '') + '>' + ic('up') + '</button>' +
          '<button type="button" class="icon-btn" data-down="' + i + '" aria-label="Move down: ' + esc(x.t) + '"' + (i === cur.work.length - 1 ? ' disabled' : '') + '>' + ic('down') + '</button>' +
          '</span>') + '</li>';
    }).join('');
  }

  function grade() {
    var it = cur, s = ST[it.st], ok = false, pickWhy = '', given = '';
    graded = true;
    if (it.type === 'mcq') {
      var sel = qcard.querySelector('.opt[aria-checked="true"]');
      var o = it.opts[parseInt(sel.getAttribute('data-opt'), 10)];
      ok = !!o.ok;
      given = o.t;
      qcard.querySelectorAll('.opt').forEach(function (b, j) {
        b.disabled = true;
        b.setAttribute('aria-checked', 'false');
        var radio = b.querySelector('.radio');
        if (it.opts[j].ok) { b.classList.add('right'); radio.innerHTML = ic('check'); }
        else if (b === sel) { b.classList.add('wrong'); radio.innerHTML = ic('x'); }
        else b.classList.add('muted');
      });
      if (!ok) pickWhy = o.why;
    } else if (it.type === 'mark') {
      var miss = 0, extra = 0;
      qcard.querySelectorAll('.chunk').forEach(function (b, i) {
        var need = it.chunks[i][1], marked = b.getAttribute('aria-pressed') === 'true';
        b.disabled = true;
        if (need && marked) b.classList.add('hit');
        else if (need && !marked) { b.classList.add('miss'); miss++; }
        else if (!need && marked) { b.classList.add('extra'); extra++; }
      });
      ok = !miss && !extra;
      given = ok ? 'All parts marked correctly' : miss + ' missed, ' + extra + ' marked that did not need it';
      if (!ok) {
        pickWhy = (miss ? 'You missed ' + miss + ' part' + (miss > 1 ? 's' : '') + ' (dashed outline). ' : '') +
          (extra ? 'You marked ' + extra + ' part' + (extra > 1 ? 's' : '') + ' that ' + (extra > 1 ? 'are' : 'is') + ' not a fact, number, date, name or source (crossed out).' : '');
      }
      $('mcount').textContent = ok ? 'All parts marked correctly' : 'Green = right. Dashed = missed. Crossed out = not needed.';
    } else if (it.type === 'sort') {
      var wrong = 0;
      qcard.querySelectorAll('.srow').forEach(function (r, i) {
        var selEl = r.querySelector('select'), row = it.rows[i], good = selEl.value === row.a;
        selEl.disabled = true;
        r.classList.add(good ? 'good' : 'bad');
        if (!good) wrong++;
        r.querySelector('.srow-fb').innerHTML = good
          ? ic('check') + '<span>' + esc(row.why) + '</span>'
          : ic('x') + '<span>Answer: <strong>' + esc(row.a) + '</strong>. ' + esc(row.why) + '</span>';
      });
      ok = !wrong;
      given = ok ? 'All lines labelled correctly' : wrong + ' line' + (wrong > 1 ? 's' : '') + ' labelled incorrectly';
      if (!ok) pickWhy = 'Each line now shows the right label and the reason.';
    } else if (it.type === 'order') {
      ok = cur.work.every(function (x, i) { return x.i === i; });
      given = cur.work.map(function (x) { return x.t; }).join(' / ');
      drawOrder(true, true);
      if (!ok) pickWhy = 'The right order is: ' + it.steps.map(function (t, i) { return (i + 1) + '. ' + t; }).join('  ');
    }

    resp[it.id] = { ok: ok, given: given, st: it.st, w: weight(it), stem: it.stem, expl: it.expl, pos: idx + 1 };
    $('side').innerHTML = ok
      ? '<div class="fb ok" role="status">' + ic('check') + '<div class="fb-body"><span class="fb-title">Correct</span><span>' + esc(it.expl) + '</span></div></div>'
      : '<div class="fb no" role="status">' + ic('alert') + '<div class="fb-body"><span class="fb-title">Not quite</span>' +
        (pickWhy ? '<span>' + esc(pickWhy) + '</span>' : '') + '<span>' + esc(it.expl) + '</span>' +
        '<details class="revisit"><summary>' + ic('open') + 'Revisit: ' + esc(s.rev) + '</summary><p>' + esc(s.revTxt) + '</p></details></div></div>';
    var rev = qcard.querySelector('.revisit');
    if (rev) rev.addEventListener('toggle', function () { Deck.fit(); });
    Deck.setPrimary(idx === seq.length - 1 ? 'See my result' : 'Next question');
    Deck.fit();
  }

  /* ---------- results ---------- */
  function totals() {
    var all = Object.keys(resp).map(function (k) { return resp[k]; });
    function sum(list, onlyRight) {
      return list.reduce(function (a, r) { return a + (onlyRight && !r.ok ? 0 : r.w); }, 0);
    }
    var tot = sum(all), got = sum(all, true);
    var gateList = all.filter(function (r) { return ST[r.st].gate; });
    var gTot = sum(gateList), gGot = sum(gateList, true);
    var pct = tot ? Math.round(got / tot * 100) : 0;
    var gatePct = gTot ? Math.round(gGot / gTot * 100) : 0;
    return { all: all, tot: tot, got: got, pct: pct, gatePct: gatePct, pass: pct >= 70 && gatePct >= 70 };
  }

  function drawResult() {
    try { localStorage.setItem('eval01-attempt', String(attempt)); } catch (e) { /* storage blocked */ }
    var r = totals();
    var C = 2 * Math.PI * 80;
    $('ring').innerHTML =
      '<svg viewBox="0 0 190 190" aria-hidden="true"><circle class="track" cx="95" cy="95" r="80"/>' +
      '<circle class="arc" id="arc" cx="95" cy="95" r="80" stroke="' + (r.pass ? 'var(--ok)' : 'var(--blue)') + '" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '"/></svg>' +
      '<div class="v"><strong>' + r.pct + '%</strong><span>' + r.got + ' of ' + r.tot + ' marks</span></div>';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var arc = $('arc');
        if (arc) arc.style.strokeDashoffset = C * (1 - r.pct / 100);
      });
    });
    $('res-title').textContent = r.pass ? 'Checked and passed' : 'Not yet';
    var status = $('res-status');
    status.className = 'status' + (r.pass ? ' ok' : '');
    status.textContent = 'Attempt ' + attempt + ' · ' + r.got + ' of ' + r.tot + ' marks';
    $('res-msg').textContent = r.pass
      ? 'You showed the checking habit clearly. Use it every time you work with an AI tool.'
      : 'See which stations need more practice, then try again. The questions will come in a new order.';
    function gate(ok, title, val, sub) {
      return '<div class="tile row-tile"><span class="dot-ic ' + (ok ? 'ok' : 'bad') + '">' + ic(ok ? 'check' : 'x') + '</span>' +
        '<div><h3>' + title + ': ' + val + '%</h3><p>' + sub + '</p></div></div>';
    }
    $('gates').innerHTML = gate(r.pct >= 70, 'Overall', r.pct, 'Needs 70% or more') +
      gate(r.gatePct >= 70, 'First three stations', r.gatePct, 'Also needs 70%, on its own');
  }

  function drawStations() {
    var r = totals();
    $('bars').innerHTML = ORDER.map(function (k) {
      var rs = r.all.filter(function (x) { return x.st === k; });
      var t = rs.reduce(function (a, x) { return a + x.w; }, 0);
      var g = rs.reduce(function (a, x) { return a + (x.ok ? x.w : 0); }, 0);
      var p = t ? Math.round(g / t * 100) : 0;
      return '<div class="bar-row"><div class="bar-top"><span>' + ic(ST[k].icon) + esc(ST[k].name) + (ST[k].gate ? ' <span class="tag">Must pass</span>' : '') + '</span>' +
        '<em>' + rs.filter(function (x) { return x.ok; }).length + ' of ' + rs.length + ' right · ' + p + '%</em></div>' +
        '<div class="track2"><i class="' + (p >= 70 ? 'ok' : 'no') + '" data-w="' + p + '"></i></div></div>';
    }).join('');
    setTimeout(function () {
      document.querySelectorAll('#bars .track2 i').forEach(function (i) { i.style.width = i.getAttribute('data-w') + '%'; });
    }, 80);
  }

  function drawReview() {
    var r = totals();
    if (!r.all.length) return;
    var list = r.all.sort(function (a, b) { return a.pos - b.pos; });
    $('qgrid').innerHTML = list.map(function (x) {
      return '<button type="button" class="qdot ' + (x.ok ? 'ok' : 'no') + '" aria-pressed="false" data-q="' + x.pos + '" aria-label="Question ' + x.pos + ', ' + (x.ok ? 'correct' : 'not quite') + '">' + x.pos + '</button>';
    }).join('');
    var firstWrong = list.filter(function (x) { return !x.ok; })[0] || list[0];
    showDetail(firstWrong.pos);
  }

  function showDetail(pos) {
    var x = totals().all.filter(function (r) { return r.pos === pos; })[0];
    if (!x) return;
    document.querySelectorAll('#qgrid .qdot').forEach(function (d) {
      d.setAttribute('aria-pressed', String(parseInt(d.getAttribute('data-q'), 10) === pos));
    });
    $('detail').innerHTML =
      '<div class="row"><span class="tag ' + (x.ok ? 'ok' : 'bad') + '">Question ' + x.pos + '</span><span class="tag">' + esc(ST[x.st].name) + '</span></div>' +
      '<p class="d-stem">' + esc(x.stem) + '</p>' +
      '<div class="d-line ' + (x.ok ? 'ok' : 'no') + '">' + ic(x.ok ? 'check' : 'x') + '<span>Your answer: ' + esc(x.given) + '</span></div>' +
      '<p class="d-why">' + esc(x.expl) + '</p>';
    Deck.fit();
  }
  $('qgrid').addEventListener('click', function (e) {
    var d = e.target.closest('[data-q]');
    if (d) showDetail(parseInt(d.getAttribute('data-q'), 10));
  });

  $('retry-now').addEventListener('click', function () { attempt++; startQuiz(); });

  $('save').addEventListener('click', function () {
    var r = totals();
    var lines = [
      'Section Check: Check Before You Use (AAI-E-MC1-S03-EVAL01)',
      'Swift AI Academy',
      '',
      'Attempt: ' + attempt,
      'Score: ' + r.pct + '% (' + r.got + ' of ' + r.tot + ' marks)',
      'First three stations: ' + r.gatePct + '%',
      'Result: ' + (r.pass ? 'Checked and passed' : 'Not yet. Try again.'),
      ''
    ];
    r.all.sort(function (a, b) { return a.pos - b.pos; }).forEach(function (x) {
      lines.push(x.pos + '. [' + ST[x.st].name + '] ' + x.stem);
      lines.push('   Your answer: ' + x.given + (x.ok ? ' (correct)' : ' (not quite)'));
      lines.push('');
    });
    SAA.download('section-check-check-before-you-use-results.txt', lines.join('\n'));
    SAA.toast('Your results are downloaded');
  });

  Deck.init({
    routine: { enter: function () { showStep(0); } },
    demo: { enter: function () { showDemo('draft'); } },
    route: {
      enter: function () { $('attempt-no').textContent = attempt; },
      primary: function () { startQuiz(); return false; }
    },
    quiz: {
      enter: function () { if (!seq.length) buildSeq(); renderQ(); },
      primary: function () {
        if (!graded) { grade(); return false; }
        if (idx < seq.length - 1) { idx++; renderQ(); return false; }
        // last question: fall through to the result slide
      }
    },
    result: { enter: drawResult },
    stations: { enter: drawStations },
    review: {
      enter: drawReview,
      primary: function () { attempt++; startQuiz(); return false; }
    }
  });
})();

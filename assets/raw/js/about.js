<script type="text/javascript">
  <!--
  var nwcbe;

  function rnwcb() {
    var where;
    if (nwcbe.checked)
      where = "_blank";
    else
      where = "_self";
    var jump_prefix = location.href.substring(0, location.href.length - location.hash.length) + '#';
    for (var i = 0; i <= (document.links.length - 1); i++) {
      var href = document.links[i].href;
      if ((href.indexOf("javascript:") != 0) && (href.indexOf(jump_prefix) != 0) && (!(/^https?:\/\/([a-z]+\.)?techmeme\.com\//.test(href)) || /^https?:\/\/([a-z]+\.)?techmeme\.com\/goto/.test(href))) {
        document.links[i].target = where;
      }
    }
  }
  var ckd;

  function set_ckd() {
    var dd = document.domain;
    if (dd) {
      var da = dd.split('.');
      var rd = da[da.length - 2] + '.' + da[da.length - 1];
      ckd = '; domain=.' + rd;
    }
  }

  function createCookie(name, value) {
    document.cookie = name + "=" + value + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/" + ckd;
  }

  function eraseCookie(name) {
    document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/" + ckd;
  }

  function svprefs() {
    var cookie_val = '';
    if (nwcbe.checked) {
      cookie_val += 'new_window';
    }
    if (cookie_val == '') {
      eraseCookie('myprefs');
    } else {
      createCookie('myprefs', cookie_val);
    }
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function rdprefs() {
    var cookie_val = readCookie('myprefs');
    nwcbe.checked = false;
    if (cookie_val) {
      var va = cookie_val.split('+');
      for (var i = 0; i < va.length; i++) {
        var val = va[i];
        if (val == 'new_window') {
          nwcbe.checked = true;
        }
      }
    }
  }

  function xnwcb() {
    rnwcb();
    svprefs();
  }

  function getBgColor(e) {
    if (e.currentStyle)
      return e.currentStyle.backgroundColor;
    if (window.getComputedStyle) {
      var eStyle = window.getComputedStyle(e, '');
      if (eStyle)
        return eStyle.getPropertyValue('background-color');
    }
    return '#ffffff';
  }

  function hacky_grayscale(c) {
    if (c.substr(0, 4) === 'rgb(') {
      return c.substr(4).split(',', 1)[0];
    } else if (c.substr(0, 1) === '#') {
      return parseInt(c.substr(1, 2), 16);
    }
    return 255;
  }
  var h_t;
  var h_e;
  var hoc;
  var hog;
  var hor;

  function h(id, phase) {
    if (id) {
      unh();
      h_e = document.getElementById(id);
      hoc = getBgColor(h_e);
      hog = hacky_grayscale(hoc);
      hor = 'rgb(' + hog + ',' + hog + ',';
      h(0, 1);
    } else if (phase < 6) {
      h_e.style.backgroundColor = hor + (hog - phase * 16) + ')';
      h_t = setTimeout('h(0,' + (phase + 1) + ')', 100);
    } else if (phase < 12) {
      h_e.style.backgroundColor = hor + (hog - 6 * 16 + (phase - 6) * 16) + ')';
      var tms = 100;
      if (phase == 6) {
        tms = 1000;
      }
      h_t = setTimeout('h(0,' + (phase + 1) + ')', tms);
    } else if (phase == 12) {
      h_e.style.backgroundColor = hoc;
      h_t = null;
    }
  }

  function unh(id, phase) {
    if (h_t != null) {
      clearTimeout(h_t);
      h_e.style.backgroundColor = hoc;
    }
  }

  function sd(id, d) {
    var e = document.getElementById(id);
    e.style.display = d;
  }

  function td(id) {
    var e = document.getElementById(id);
    if (e.style.display == 'none') {
      e.style.display = 'block';
    } else {
      e.style.display = 'none';
    }
  }

  function xdates(ko, nh) {
    var tde = document.getElementById('thisdate');
    var dbe = document.getElementById('dateform');
    if (ko || (dbe.style.display == 'none')) {
      if (!nh) {
        h('datebox');
      }
      tde.style.display = 'none';
      dbe.style.display = 'block';
    } else {
      unh();
      tde.style.display = 'block';
      dbe.style.display = 'none';
    }
  }

  function iPadiPhone() {
    return navigator.userAgent.match(/iPad|iPhone/i);
  }

  function replaceShareHandlers() {
    function handler(cn, p, ii) {
      return function(e) {
        if (!e) var e = window.event;
        overitem(cn, p, ii, e);
      };
    }
    var elements = document.getElementsByClassName('itc1');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].getElementsByClassName('rsp').length == 0) { // we're not in a sponsor post
        id = elements[i].getElementsByClassName('item')[0].getAttribute('ID').split('i');
        elements[i].onmouseover = handler(id[0], true, id[1]);
        elements[i].onmouseout = handler(id[0], false, id[1]);
      }
    }
  }

  function overitem(cn, p, ii, e) {
    if (e && (e.target.tagName == "A") && iPadiPhone())
      return;
    var dxe = document.getElementById(cn + 'dx' + ii);
    if (dxe) {
      if (p) {
        var de = document.getElementById(cn + 'd' + ii);
        dxe.style.height = de.offsetHeight + 'px';
        dxe.style.display = 'block';
      } else {
        dxe.style.display = 'none';
      }
    }
    var scniii = 's' + cn + 'i' + ii;
    if (p) {
      shareOn(scniii);
    } else {
      shareOff(scniii);
    }
  }

  function tgd(cnum, p, inum) {
    var setd, setp;
    if (p) {
      setp = 'block';
      setd = 'none';
    } else {
      setp = 'none';
      setd = 'block';
    }
    var i, ei;
    if (inum) {
      i = inum;
      ei = inum;
    } else {
      i = 1;
      ei = -1;
      document.getElementById(cnum + 'dxr').style.display = setd;
      document.getElementById(cnum + 'pxr').style.display = setp;
    }
    while (true) {
      var ie = document.getElementById(cnum + 'i' + i);
      if (ie == null) {
        break;
      }
      var pe = document.getElementById(cnum + 'p' + i);
      if (pe) {
        var de = document.getElementById(cnum + 'd' + i);
        pe.style.display = setp;
        de.style.display = setd;
        if (p) {
          document.getElementById(cnum + 'px' + i).style.height = pe.offsetHeight + 'px';
        } else {
          if (inum) {
            document.getElementById(cnum + 'dx' + i).style.height = de.offsetHeight + 'px';
          } else {
            document.getElementById(cnum + 'dx' + i).style.display = 'none';
          }
        }
      }
      if (i == ei) {
        break;
      }
      i++;
    }
    if (!p && !inum) {
      document.getElementById(cnum + 'i' + 1).scrollIntoView();
    }
  }
  var pgrdad = '(none)';
  var m2_ead = '161127/h1725';
  var curr_yy = 16;
  var min_mod = 5;
  var lb_ead = '161127';

  var m1_sad_d = 'September 12, 2005';
  var m1_sad = '050912/h0000';
  var m2_sad = m1_sad;
  var arrt = 'http://www.techmeme.com/';

  function godate(d) {
    d = d.replace(/a\.?m/i, ' am');
    d = d.replace(/p\.?m/i, ' pm');
    var pa = new Array(/^jan/i, /^feb/i, /^mar/i, /^apr/i, /^may/i, /^jun/i, /^jul/i, /^aug/i, /^sep/i, /^oct/i, /^nov/i, /^dec/i);
    var fa = d.split(/[^a-zA-Z0-9]+/g);
    for (var i = 0; i < 12; i++) {
      if (fa[0].match(pa[i])) {
        var ip1 = i + 1;
        fa[0] = ip1 + '';
      }
    }
    var em = 'Sorry, no archives exist prior to ' + m1_sad_d;
    var tpyy;
    if (fa.length == 2) {
      fa[2] = curr_yy + '';
      tpyy = ((100 + curr_yy - 1) + '').substring(1, 3);
    }
    if (fa[2] > 1900) {
      if (fa[2] < 2001) {
        alert(em);
        return;
      }
      fa[2] = fa[2].substring(2, 4);
    } else if (fa[2] > 80) {
      alert(em);
      return;
    }
    var h, m;
    if (fa[3] == '0' || fa[3] == '00' || (fa[0] >= 1 && fa[3] <= 23)) {
      h = parseInt(fa[3], 10);
      m = parseInt(fa[4], 10);
      if (!m) {
        m = 0;
      }
    } else {
      h = 20;
      m = 0;
    }
    m = m - m % min_mod;
    if ((fa[4] == 'pm' || fa[5] == 'pm') && h < 12) {
      h += 12;
    } else if ((fa[4] == 'am' || fa[5] == 'am') && h == 12) {
      h = 0;
    }
    fa[3] = h + '';
    fa[4] = m + '';
    if (
      (fa[0] >= 1 && fa[0] <= 12) &&
      (fa[1] >= 1 && fa[1] <= 31) &&
      (fa[2] >= 1 && fa[2] <= curr_yy) &&
      (fa[4] >= 0 && fa[4] <= 59)
    ) {
      for (var i = 0; i < fa.length; i++) {
        var f = fa[i];
        if (f.length < 2) {
          fa[i] = '0' + f;
        }
      }
      var m2_ad = fa[2] + fa[0] + fa[1] + '/h' + fa[3] + fa[4];
      var m1_ad;
      if ((m2_ad > m2_ead) && tpyy) {
        m2_ad = tpyy + m2_ad.substr(2, m2_ad.length);
        m1_ad = tpyy;
      } else {
        m1_ad = fa[2];
      }
      m1_ad = m1_ad + '/' + fa[0] + '/' + fa[1] + '/';
      if (m2_ad > m2_ead) {
        alert("Sorry, no page exists yet for that date");
      } else if (m2_ad < m1_sad) {
        alert(em);
      } else if (m2_ad < m2_sad) {
        location = arrt + m1_ad;
      } else {
        location = arrt + m2_ad;
      }
    } else {
      alert('Please use this format:  ' + pgrdad);
    }
  }
  var arrt = 'http://www.techmeme.com/';
  var nowrd = '(none)';
  var lb_sad_d = 'September 30, 2007';
  var lb_sad = '070930';

  function lbgodate(d) {
    d = d.replace(/a\.?m/i, ' am');
    d = d.replace(/p\.?m/i, ' pm');
    var pa = new Array(/^jan/i, /^feb/i, /^mar/i, /^apr/i, /^may/i, /^jun/i, /^jul/i, /^aug/i, /^sep/i, /^oct/i, /^nov/i, /^dec/i);
    var fa = d.split(/[^a-zA-Z0-9]+/g);
    for (var i = 0; i < 12; i++) {
      if (fa[0].match(pa[i])) {
        var ip1 = i + 1;
        fa[0] = ip1 + '';
      }
    }
    var em = 'Sorry, no leaderboards exist prior to ' + lb_sad_d;
    var tpyy;
    if (fa.length == 2) {
      fa[2] = curr_yy + '';
      tpyy = ((100 + curr_yy - 1) + '').substring(1, 3);
    }
    if (fa[2] > 1900) {
      if (fa[2] < 2001) {
        alert(em);
        return;
      }
      fa[2] = fa[2].substring(2, 4);
    } else if (fa[2] > 80) {
      alert(em);
      return;
    }
    if ((fa[0] >= 1 && fa[0] <= 12) &&
      (fa[1] >= 1 && fa[1] <= 31) &&
      (fa[2] >= 1 && fa[2] <= curr_yy)
    ) {
      for (var i = 0; i < fa.length; i++) {
        var f = fa[i];
        if (f.length < 2) {
          fa[i] = '0' + f;
        }
      }
      var lb_ad = fa[2] + fa[0] + fa[1];
      if ((lb_ad > lb_ead) && tpyy) {
        lb_ad = tpyy + lb_ad.substr(2, lb_ad.length);
      }
      if (lb_ad > lb_ead) {
        alert("Sorry, no leaderboards exist yet for that date");
      } else if (lb_ad < lb_sad) {
        alert(em);
      } else {
        location = arrt + lb_ad + '/lb';
      }
    } else {
      alert('Please use this format:  ' + nowrd);
    }
  }

  function tlbrows(id) {
    var bhe = document.getElementById(id + '_hide_button');
    var bse = document.getElementById(id + '_show_button');
    var set_rows;
    if (bhe.style.display == 'none') {
      set_rows = '';
      bse.style.display = 'none';
    } else {
      set_rows = 'none';
      bse.style.display = '';
    }
    bhe.style.display = set_rows;
    var t = document.getElementById(id);
    var oRows = t.getElementsByTagName('tr');
    var iRowCount = oRows.length;
    var i;
    for (i = 11; i < iRowCount; i++) {
      t.rows[i].style.display = set_rows;
    }
    if (set_rows == 'none') {
      document.getElementById('a' + id).scrollIntoView();
    }
  }

  function hhash() {
    var a = location.hash;
    if (a) {
      var i;
      if (a.substring(1, 2) === 'a') {
        i = a.substring(2, a.length);
      } else {
        i = a.substring(1);
      }
      var je = document.getElementById(i);
      if (je) {
        je.scrollIntoView();
        h(i);
      }
    }
  }
  var TdTD = 400;
  var TnTB = 700;
  var TwTSE = 200;
  var TnOE = 3;
  var TwTBE = 0;
  var TwTCD = 150;
  var TsTS = '/do/lc';
  var TeTD = Number.MAX_VALUE;
  var TgETD = false;
  var TdE = new Array();
  var TE = function() {
    this.Tx = false;
    this.Ts = 0;
    this.Td = 0;
    this.toString = function() {
      return this.Ts + " " + this.Td;
    }
  }
  TE.Tc = function(a, b) {
    return a.Td - b.Td
  }
  var TcE_ = null;

  function TgXMLHR() {
    var Tx = false;
    if (window.XMLHttpRequest) {
      Tx = new XMLHttpRequest();
    } else {
      try {
        Tx = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (ev) {
        try {
          Tx = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (ev) {
          Tx = false;
        }
      }
    }
    return Tx;
  }

  function TeD() {
    TcE_ = new TE();
    TcE_.Tx = TgXMLHR();
    if (TcE_.Tx) {
      TcE_.Tx.open('POST', TsTS + '?tm=true', true);
      TcE_.Tx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      TcE_.Tx.onreadystatechange = TeC;
      TcE_.Ts = new Date().getTime();
      TcE_.Tx.send(null);
    }
  }

  function TeC() {
    if (TcE_.Tx.readyState == 4 && TcE_.Tx.status == 200) {
      TcE_.Td = new Date().getTime() - TcE_.Ts;
      TdE.push(TcE_);
      if (TdE.length < TnOE)
        setTimeout("TeD()", TwTBE);
      else
        TcED();
    }
  }

  function TcED() {
    TdE.sort(TE.Tc);
    TeTD = TdE[Math.floor(TnOE / 2)].Td + TwTCD;
    TgETD = true;
  }

  function Tt(link) {
    if (isSafari() && TgETD && TeTD <= TdTD) {
      var TtD = TeTD;
      var Tx = TgXMLHR();
      if (Tx) {
        Tx.open('POST', TsTS + '?tm=false&href=' + encodeURIComponent(link.href) + '&data=' + TtD_(TtD), false);
        Tx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Tx.send(null);
      }
    } else if (!(TgETD && (TeTD >= TnTB))) {
      var TtD;
      if (!TgETD || (TgETD && (TeTD > TdTD)))
        TtD = TdTD;
      else
        TtD = TeTD;
      var Tx = TgXMLHR();
      if (Tx) {
        Tx.open('POST', TsTS + '?tm=false&href=' + encodeURIComponent(link.href) + '&data=' + TtD_(TtD), true);
        Tx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Tx.send(null);
        var TcT = new Date();
        TeT = TcT.getTime() + TtD;
        while (TcT.getTime() < TeT)
          TcT = new Date();
        if (Tx.readyState != 4)
          Tx.abort();
      }
    }
  }

  function isSafari() {
    return ((navigator.appCodeName + navigator.appName + navigator.appVersion).search(/safari/i) != -1);
  }

  function TtD_(TtD) {
    var data =
      pgrdad + " " +
      TdTD + " " +
      TnTB + " " +
      TwTSE + " " +
      TnOE + " " +
      TwTBE + " " +
      TwTCD + " " +
      TeTD + " " +
      TgETD + " " +
      "(" + TdE + ") " +
      isSafari() + " " +
      TtD;
    return data;
  }

  function TiLTT() {
    var jump_prefix = location.href.substring(0, location.href.length - location.hash.length) + '#';
    for (var i = 0; i <= (document.links.length - 1); i++) {
      var href = document.links[i].href;
      if ((href.indexOf("javascript:") != 0) && (href.indexOf(jump_prefix) != 0))
        document.links[i].onclick = function() {
          Tt(this)
        };
    }
  }

  function shareOff(itemId) {
    document.getElementById(itemId).style.display = 'none';
  }

  function shareOn(itemId) {
    var shareLine = document.getElementById(itemId);
    if (!shareLine.getAttribute('init')) {
      shareLine.innerHTML = getShareLineHtml(shareLine);
      shareLine.setAttribute('init', 'true');
    }
    shareLine.style.display = 'block';
  }

  function getShareLineHtml(shareLine) {
    var permalink = pmlToPermalink(shareLine.getAttribute('pml'));
    var tweetId = shareLine.getAttribute('twid');
    return getPmlHtml(permalink) + getLikeHtml(permalink) + getRtHtml(tweetId);
  }

  function pmlToPermalink(pml) {
    var pmlParts = pml.split('p');
    return 'http://www.techmeme.com/' + pmlParts[0] + '/p' + pmlParts[1] + '#a' + pml;
  }

  function getPmlHtml(permalink) {
    var target = nwcbe.checked ? '_blank' : '_self';
    return '<span class="shrpml" title="Permalink">' +
      '<a href="' + permalink + '" target="' + target + '"><span class="shrpmlimg">&nbsp;</span></a>' +
      '</span>';
  }

  function getLikeHtml(permalink) {
    return '<span class="shrfb">' +
      '<iframe src="//www.facebook.com/plugins/like.php?href=' + encodeURIComponent(permalink) + '&amp;send=false&amp;layout=button_count&amp;width=48&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=22&amp;appId=105601372888971&amp;locale=en_US" scrolling="no" frameborder="0" class="shrfbifr" allowTransparency="true"></iframe>' +
      '</span>';
  }

  function getRtHtml(tweetId) {
    if (!tweetId || tweetId == '')
      return '';
    else
      return '<span title="Retweet" class="shrrt">' +
        '<a href="https://twitter.com/intent/retweet?tweet_id=' + tweetId + '&related=mediagazer"><span class="shrrtimg">&nbsp;</span></a>' +
        '</span>';
  }
  var NTptpssd = 40 * 1000;
  var NTpsl = 3 * 60 * 1000 + 30 * 1000;
  var NTppds = 30 * 1000;
  var NTrtdpsa = 15 * 60 * 1000;
  var NTpssr = 20 * 1000;
  var NTvn = document.title;

  function NTgxhro() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  var NTlft;
  var NTnpc = 0;
  var NTnpcial = false;
  var NTnpcs = false;
  var NTpsst;
  var NTdps = false;
  var NTnpcr = NTgxhro();
  var NTnpcrt;
  var NTnpcrti = 10 * 1000;

  function NTsnpcps() {
    NTpsst = (new Date()).getTime();
    NTfnpc();
  }

  function NTfnpc() {
    NTnpcr.open("GET", "/feedsmanager/ps?t=" + baseFeedTime, true);
    NTnpcr.onreadystatechange = NThnpcrsc;
    NTnpcr.send(null);
    NTnpcrt = setTimeout(NTnpcrt_, NTnpcrti);
  }

  function NThnpcrsc() {
    if (NTnpcr.readyState == 4) {
      clearTimeout(NTnpcrt);
      if (NTnpcr.status == 200) {
        try {
          var NTr = eval("(" + NTnpcr.responseText + ")");
          if (!NTr.error && NTr.time > NTlft) {
            NTlft = NTr.time;
            if (NTr.at_least) {
              if (NTr.count == 0 && NTnpc == 0) {
                NTdps = false;
                NTsnnpcf(true);
              } else {
                NTnpc = NTr.count > NTnpc ? NTr.count : NTnpc;
                NTnpcial = true;
                NTunpc();
                return;
              }
            } else {
              NTnpc = NTr.count;
              NTunpc();
              NTdps = false;
              NTsnnpcf(true);
            }
          } else {
            NTsnnpcf(false);
          }
        } catch (e) {
          NTsnnpcf(false);
        }
      } else {
        NTsnnpcf(false);
      }
    }
  }

  function NTsnnpcf(NTfnps) {
    var now = new Date();
    if (now.getTime() - NTlft > NTrtdpsa && !NTdps)
      NTdps = true;
    if (NTfnps ||
      NTdps ||
      (now.getTime() + NTppds - NTpsst) > NTpsl)
      setTimeout(NTsnpcps, NTnpssi());
    else
      setTimeout(NTfnpc, NTppds);
  }

  function NTnpssi() {
    var now = new Date();
    var NTnpt = (now.getMinutes() % 5) * 60000 + now.getSeconds() * 1000 + now.getMilliseconds();
    var rand = Math.floor(Math.random() * NTpssr);
    var NTtl = (NTnpt < NTptpssd ? NTptpssd : 300000 + NTptpssd) - NTnpt + rand;
    return NTtl;
  }

  function NTunpc() {
    document.getElementById('newpostscounter').innerHTML =
      NTnpc + (NTnpcial ? '+' : '') + ' new item' + (NTnpc > 1 || NTnpcial ? 's' : '');
    if (!NTnpcs && NTnpc > 0) {
      var col = document.getElementById('countercol');
      var ticker = document.getElementById('newpostscounter');
      var holder = document.getElementById('countercolspaceholder');
      var spacer = document.getElementById('counterspacer');
      if (navigator.appName == 'Microsoft Internet Explorer')
        ticker.style.display = 'block';
      else {
        col.style.position = 'absolute';
        ticker.style.display = 'block';
        holder.style.display = 'block';
        if (spacer)
          spacer.style.display = 'block';
        holder.style.height = (col.offsetHeight - ticker.offsetHeight - ticker.offsetTop) + 'px';

        function NTfcd() {
          holder.style.display = 'none';
          col.className = 'notransitions';
          col.style.top = '0';
          col.style.position = 'relative';
        }
        col.addEventListener('transitionend', NTfcd, false);
        col.addEventListener('oTransitionEnd', NTfcd, false);
        col.addEventListener('webkitTransitionEnd', NTfcd, false);
        setTimeout(function() {
          holder.className = 'spaceholdertransitions';
          col.className = 'countercoltransitions';
          col.style.top = (ticker.offsetHeight + ticker.offsetTop + (spacer ? spacer.offsetHeight : 0)) + 'px';
          holder.style.height = (col.offsetHeight + (spacer ? spacer.offsetHeight : 0)) + 'px';
        }, 1000);
      }
      NTnpcs = true;
    }
    if (NTnpc > 0)
      document.title = '(' + NTnpc + (NTnpcial ? '+' : '') + ') ' + NTvn;
  }

  function NTnpcrt_() {
    if (NTnpcr.readyState != 0) {
      NTnpcr.onreadystatechange = null;
      NTnpcr.abort();
      NTsnnpcf(false);
    }
  }

  function NTinpcp() {
    NTlft = baseFeedTime;
    var now = new Date();
    if (now.getTime() - NTlft > NTrtdpsa)
      NTdps = true;
    var NTnpt = (now.getMinutes() % 5) * 60000 + now.getSeconds() * 1000 + now.getMilliseconds();
    var NTbfd = new Date(baseFeedTime);
    var NTnp;
    if (now.getTime() - NTnpt == baseFeedTime - NTbfd.getSeconds() * 1000 - NTbfd.getMilliseconds()) {
      NTnp = 300000 + NTptpssd - NTnpt + Math.floor(Math.random() * NTpssr);
      setTimeout(NTsnpcps, NTnp);
    } else if (NTnpt < NTptpssd || NTnpt > NTptpssd + NTpsl) {
      NTnp = NTnpssi();
      setTimeout(NTsnpcps, NTnp);
    } else {
      NTpsst = now.getTime() - NTnpt + NTptpssd;
      NTnp = Math.floor(Math.random() * NTpssr);
      setTimeout(NTfnpc, NTnp);
    }
  }

  function NTiD3fpor() {
    //var pattern = /https?:\/\/(www\.)?localhost/i;
    var pattern = /https?:\/\/(www\.)?techmeme\.com($|\/$|\/#|\/river)/i;
    return pattern.test(location.href);
  }

  function NTiD3t() {
    if (NTiD3fpor())
      NTit();
  }

  function NTit() {
    setTimeout(function() {
      NTinpcp();
    }, 0);
  }

  function cmplu() {
    var a = location.hash;
    if (!a) {
      var lh = location.href;
      lh = lh.replace(/\?.*$/, '');
      if (lh.search(/\/[0-9][0-9][0-9][0-9][0-9][0-9]\/p[0-9]*$/) != -1) {
        var pa = lh.split('/');
        var di = pa.length - 2;
        var na = lh + '#a' + pa[di] + pa[di + 1];
        window.location.replace(na);
      }
    }
  }

  function init_all() {
    cmplu();
    nwcbe = document.getElementById('nwcb');
    set_ckd();
    rdprefs();
    rnwcb();
    hhash();
    TiLTT();
    setTimeout("TeD()", TwTSE);
    NTiD3t();
  }
  // -->
</script>

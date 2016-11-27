<script type="text/javascript">
  <!--
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

  function hhash() {
    var a = location.hash;
    if (a) {
      var i = a.substring(1);
      var je = document.getElementById(i);
      if (je) {
        je.scrollIntoView();
        h(i);
      }
    }
  }
  // -->
</script>

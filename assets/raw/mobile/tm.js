<script type="text/javascript">
  function init() {
    if (navigator.userAgent.indexOf('iPhone') != -1)
      setTimeout(hideURLbar, 0);
    setTimeout(preloadImages, 0);

    window.addEventListener("orientationchange", function() {
      viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute('content', 'width=' + window.innerWidth + ', initial-scale=1.0, maximum-scale=1.0, user-scalable=0, height=device-height');
    }, false);
  }

  function hideURLbar() {
    window.scrollTo(0, 0);
  }

  function preloadImages() {
    var a = document.createElement("div");
    a.id = "preloader";
    document.body.appendChild(a);
  }

  // tab selection

  var activeTabSelectorId = 'top_items_selector';
  var activeTabId = 'top_items';

  function selectTab(selector, tabId) {

    document.getElementById(activeTabSelectorId).className = 'tab_selector';
    selector.className = 'active_tab_selector';
    activeTabSelectorId = selector.id;

    document.getElementById(activeTabId).style.display = 'none';
    document.getElementById(tabId).style.display = 'block';
    activeTabId = tabId;

    setCookie('active_tab_selector_id', activeTabSelectorId, 7);
    setCookie('active_tab_id', activeTabId, 7);
  }

  function setCookie(c_name, value, expireDays) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + expireDays);
    document.cookie = c_name + "=" + escape(value) + ((expireDays == null) ? "" : ";expires=" + expireDate.toGMTString());
  }

  // slide

  var holdBetweenSlideSteps = 0;
  var pctToSlideWithinStep = 20;

  var mainPageScrollPosition = 0;

  function getScrollPosition() {
    if (typeof(window.pageYOffset) == 'number')
      return window.pageYOffset; // Netscape compliant    
    else if (document.body && document.body.scrollTop)
      return document.body.scrollTop; // DOM compliant
    else if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop; // IE6 standards compliant mode
    else
      return 0;
  }

  // pml

  var startOnItem = false;
  var startItemId = '';
  var firstSlideBackFromStartItem = true;
  var highlightStartItem = false;

  function setScrollPositionOnFirstSlideFromStartItem(fromId, toId) {
    if (!startOnItem || !firstSlideBackFromStartItem || !fromId === startItemId || !toId === 'main_page')
      return;

    var startItemTop = document.getElementById('mi' + startItemId).getBoundingClientRect().top;
    mainPageScrollPosition = startItemTop > window.innerHeight * 0.75 ? startItemTop : 0;
    firstSlideBackFromStartItem = false;
    highlightStartItem = true;
  }

  function highlightStartItemOnFirstSlideBack() {
    if (highlightStartItem) {
      var startItem = document.getElementById('mi' + startItemId);
      startItem.className = 'pml_highlight_start';
      setTimeout(function() {
        startItem.className = 'pml_highlight_end';
      }, 0);
      highlightStartItem = false;
    }
  }

  function normalSlide(fromId, toId, forward) {

    var from = document.getElementById(fromId);
    var to = document.getElementById(toId);

    to.style.left = (forward ? "" : "-") + "100%";

    to.style.display = 'block';

    if (fromId == 'main_page')
      mainPageScrollPosition = getScrollPosition();
    scrollTo(0, 0);

    var percent = 100;
    slideStep();

    function slideStep() {
      if (percent <= pctToSlideWithinStep)
        percent = 0;
      else
        percent -= pctToSlideWithinStep;

      from.style.left = (forward ? 1 : -1) * (percent - 100) + "%";
      to.style.left = (forward ? 1 : -1) * percent + "%";

      if (percent == 0) {
        from.style.display = 'none';
        if (toId == 'main_page') {
          setScrollPositionOnFirstSlideFromStartItem(fromId, toId); // pml
          scrollTo(0, mainPageScrollPosition);
          highlightStartItemOnFirstSlideBack(); // pml
        }
      } else
        setTimeout(slideStep, holdBetweenSlideSteps);
    }
  }

  function translateSlide(fromId, toId, forward, hiding) {

    var from = document.getElementById(fromId);
    var to = document.getElementById(toId);

    // definitions

    function toggleHfsElementsInPage(pageId, hide) {
      var elements = document.getElementsByName('hfs' + (pageId == 'main_page' ? activeTabId : pageId));
      for (var i = 0; i < elements.length; i++)
        elements[i].style.display = (hide ? 'none' : 'block');
    }

    function shiftTo() {
      to.style.webkitTransitionDuration = '0ms'; // Turn off transitions
      to.style.webkitTransform = 'translateX(' + (forward ? '' : '-') + '100%)';
      to.style.display = 'block';
      to.style.webkitTransitionDuration = ''; // Turn transitions back on
    }

    function translate() {
      from.style.webkitTransform = 'translateX(' + (forward ? '-' : '') + '100%)';
      to.style.webkitTransform = 'translateX(0%)';
    }

    function postFromTranslate() {
      from.style.display = 'none';
      if (hiding)
        toggleHfsElementsInPage(fromId, false);

      from.removeEventListener('webkitTransitionEnd', postFromTranslate, false);
    }

    function postToTranslate() {
      if (hiding)
        toggleHfsElementsInPage(toId, false);
      if (toId == 'main_page')
        setTimeout(function() {
          setScrollPositionOnFirstSlideFromStartItem(fromId, toId); // pml
          scrollTo(0, mainPageScrollPosition);
          highlightStartItemOnFirstSlideBack(); // pml
        }, 300);
      to.removeEventListener('webkitTransitionEnd', postToTranslate, false);
    }

    // actions

    if (hiding) {
      toggleHfsElementsInPage(fromId, true);
      toggleHfsElementsInPage(toId, true);
    }

    if (fromId == 'main_page')
      mainPageScrollPosition = getScrollPosition();
    scrollTo(0, 0);

    shiftTo();

    from.addEventListener('webkitTransitionEnd', postFromTranslate, false);
    to.addEventListener('webkitTransitionEnd', postToTranslate, false);

    setTimeout(translate, (hiding ? 400 : 0));
  }

  function haveWebkit() {
    return /webkit/i.test(navigator.userAgent); // pml
  }

  function haveShortDisplay() {
    return window.innerHeight < 600;
  }

  function slide(fromId, toId, forward) {
    if (haveWebkit())
      translateSlide(fromId, toId, forward, haveShortDisplay());
    else
      normalSlide(fromId, toId, forward);
  }

  function getXmlHttpRequestObject() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  }


  // fetch page (generic)

  var pageHistory = ['main_page']; // pml

  var pageRequest = getXmlHttpRequestObject();

  var pageRequestTimer;
  var pageRequestTimeoutInterval = 10000;

  function openPage(pageId, fetchParameters, clickedElement, baseCssClass, loadingCssClass, images) {

    var page = document.getElementById(pageId);

    if (page != null) {
      slide(pageHistory[pageHistory.length - 1], pageId, true);
      pageHistory.push(pageId);
    } else {

      prefetchImages(images);

      clickedElement.className = loadingCssClass;

      // fetch data
      if (pageRequest.readyState == 4 || pageRequest.readyState == 0) {
        pageRequest.open("GET", fetchParameters, true);

        pageRequest.onreadystatechange = function() {
          handlePageRequestStateChange(pageId, clickedElement, baseCssClass);
        };

        pageRequest.send(null);

        pageRequestTimer = setTimeout(function() {
          pageRequestTimeout(clickedElement, baseCssClass);
        }, pageRequestTimeoutInterval);

      }
    }
  }

  function prefetchImages(images) {
    if (images && images.length > 0) {
      image = new Image();
      for (var i = 0; i < images.length; i++)
        image.src = images[i];
    }
  }

  function handlePageRequestStateChange(pageId, clickedElement, baseCssClass) {
    if (pageRequest.readyState == 4) {
      clearTimeout(pageRequestTimer);
      if (pageRequest.status == 200) {

        var page = document.createElement('div');
        page.setAttribute('id', pageId);
        page.innerHTML = pageRequest.responseText;
        document.body.appendChild(page);

        clickedElement.className = baseCssClass;

        slide(pageHistory[pageHistory.length - 1], pageId, true);
        pageHistory.push(pageId);

      } else {
        alert("Couldn't retrieve the requested page; please try reloading");
        clickedElement.className = baseCssClass;
      }
    }
  }

  function pageRequestTimeout(clickedElement, baseCssClass) {
    if (pageRequest.readyState != 0) {
      pageRequest.abort();

      alert("Couldn't retrieve the requested page due to poor connectivity");
      clickedElement.className = baseCssClass;
    }
  }


  // back from page

  function backFromPage(clickedElement) {
    clickedElement.className = 'action_selector';
    slide(pageHistory[pageHistory.length - 1], pageHistory[pageHistory.length - 2], false);
    pageHistory.pop();
  }

  // fetch item page

  function openItemPage(itemId, clickedElement, images) {
    openPage(itemId,
      'item.jsp?feed=1480286115000&id=' + itemId,
      clickedElement,
      'nav_to_more',
      'nav_to_more_selected',
      images);
  }


  // load tab

  var tabRequest = getXmlHttpRequestObject();

  var tabRequestTimer;
  var tabRequestTimeoutInterval = 10000;

  function loadTab(selector, tabId, servlet, extraParams) {
    if (document.getElementById(tabId) != null)
      selectTab(selector, tabId);
    else {
      // change background to 'loading', remove text

      document.getElementById(activeTabSelectorId).className = 'tab_selector';
      var selectorText = selector.innerHTML;
      selector.innerHTML = '';
      selector.className = 'active_tab_selector tab_loading';

      // fetch data
      if (tabRequest.readyState == 4 || tabRequest.readyState == 0) {
        tabRequest.open("GET", servlet + '?feed=1480286115000' + (extraParams ? '&' + extraParams : ''));

        tabRequest.onreadystatechange = function() {
          handleTabRequestStateChange(selector, tabId, selectorText);
        };

        tabRequest.send(null);

        tabRequestTimer = setTimeout(function() {
            tabRequestTimeout(selector, selectorText);
          },
          tabRequestTimeoutInterval);
      }
    }
  }

  function handleTabRequestStateChange(selector, tabId, selectorText) {
    if (tabRequest.readyState == 4) {
      clearTimeout(tabRequestTimer);
      if (tabRequest.status == 200) {

        if (tabRequest.responseText.indexOf("<title>Login</title>") != -1) {
          alert("Server requires re-authentication; please reload");
          revertToOldTab(selector, selectorText);
        } else {

          var tab = document.createElement('ul');
          tab.setAttribute('id', tabId);
          tab.style.display = 'none';
          tab.innerHTML = tabRequest.responseText;
          document.getElementById('main_page').appendChild(tab);

          selector.className = 'active_tab_selector';
          selector.innerHTML = selectorText;

          selectTab(selector, tabId);
        }
      } else {
        alert("couldn't retrieve the requested tab; please try reloading");
        revertToOldTab(selector, selectorText);
      }
    }
  }

  function tabRequestTimeout(selector, selectorText) {
    if (tabRequest.readyState != 0) {
      tabRequest.abort();

      alert("Couldn't retrieve the requested tab due to poor connectivity");
      revertToOldTab(selector, selectorText);
    }
  }

  function revertToOldTab(selector, selectorText) {
    selector.className = 'tab_selector';
    selector.innerHTML = selectorText;
    document.getElementById(activeTabSelectorId).className = 'active_tab_selector';
  }

  // share

  function setHrefForFBSharingItem(element, url) {
    element.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
  }

  function setHrefForRetweetingItem(element, tweetId) {
    element.href = 'http://twitter.com/intent/retweet?tweet_id=' + encodeURIComponent(tweetId);
  }

  function setHrefForEmailingItem(element, subject, author, pubName, excerptTitleLong, excerptRestLong, permalink, url) {
    element.href = 'mailto:?subject=' + encodeURIComponent(subject + (permalink != 'null' ? ' (via Techmeme)' : '')) + '&body=' + encodeURIComponent(
      (permalink != 'null' ? 'The following story appeared on Techmeme:\n\n' : '') +
      (author != '' ? author + ' / ' : '') + pubName + ':\n' +
      excerptTitleLong + excerptRestLong + '\n\n' +
      'Read more' + (permalink != 'null' ? ':\n- at Techmeme: ' + permalink + '\n- or at the source: ' + url : ' at ' + url));
  }

  function FBLoginAndLike(itemId, url) {
    var status = document.getElementById('like' + itemId + 'status');
    if (FBSDKLoaded) {
      status.className = "button facebookinprogress";
      if (connectedToFB) {
        FBLike(itemId, url);
      } else {
        FB.login(function(response) { // changes to connectedToFB will be made by handler for auth.authResponseChange
          if (response.authResponse) {
            FBLike(itemId, url);
          } else {
            status.className = "button facebook";
            alert("'Like' cancelled, because Facebook login did not complete!");
          }
        }, {
          scope: 'publish_actions'
        });
      }
    } else {
      alert("'Like' cancelled, because couldn't communicate well with Facebook");
    }
  }

  function FBLike(itemId, url) {
    var status = document.getElementById('like' + itemId + 'status');
    FB.api(
      'me/og.likes',
      'post', {
        object: url
      },
      function(response) {
        if (response.id != null || (response.error != null && response.error.code == 3501)) { // success, or item is already liked
          status.className = "button facebookcheck";
        } else {
          status.className = "button facebook";
          alert("Couldn't 'like' the item on Facebook; please try again!" + response.error.type + response.error.message + response.error.code + response.error.error_subcode);
          FB.getLoginStatus(function(response) {}, true); // changes to connectedToFB will be made by handler for auth.authResponseChange
        }
      }
    );
  }
</script>

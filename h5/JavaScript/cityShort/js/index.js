/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
var scroll = null
window.onload = function() {
  const cityWrapper = document.getElementById('cityWrapper')
  scroll = BetterScroll.createBScroll(cityWrapper, {})
  scroll.scrollTo(0, 0)

  bindEvent()

  loadCites()
  myReadFile()
}

function bindEvent() {
  var shortcut = document.querySelector('.letter-select-tips')
  var touch = {}
  var firstTouch
  shortcut.addEventListener('touchstart', function(e) {
    console.log('touchmove', {
      'target': e.target,
      'innerHtml': e.target.innerHTML
    })
  })
  shortcut.addEventListener('touchmove', function(e) {
    console.log('touchstart', {
      'target': e.target,
      'innerHtml': e.target.innerHTML
    })
    e.preventDefault()
    e.stopPropagation()
  })

  function scrollTo(anchor) {
    var maxScrollY = cityWrapper.clientHeight - cityScroller.clientHeight
    var y = Math.min(0, Math.max(maxScrollY, anchorMap[anchor]))
    if (typeof y !== 'undefined') {
      scroll.scrollTo(0, y)
    }
  }
}

function loadCites() {
  // (cityList || {}).forEach()
  // for (const key in cityList) {
  //   console.log('value', cityList[key])
  // }
}

function myReadFile() {
  const reader = new FileReader()
  // reader.readAsText('js/city.js')
  // reader.onload = () => {
  //   console.log('reader', reader.result)
  // }
  // 'js/city.js'
  // console.log('reader', reader)
  var fso = new ActiveXObject('Scripting.FileSystemObject')
  var f = fso.opentextfile('D:\myProject\myelementui\h5\JavaScript\cityShort\js\city.txt', 1, false)
  console.log(f)
  let all = ''
  while (!f.AtEndOfStream) {
    all += f.Readline() + '\n'
  }
  f.close()
  console.log(all)
}

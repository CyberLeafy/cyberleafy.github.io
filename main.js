// ruler tick marks
document.querySelectorAll('.ruler').forEach(function(ruler) {
  var h = window.innerHeight;
  var count = Math.floor(h / 96);
  for (var i = 0; i <= count; i++) {
    var s = document.createElement('span');
    s.textContent = String(i * 100).padStart(4, '0');
    s.style.top = (i * 96) + 'px';
    ruler.appendChild(s);
  }
});

// live cursor coordinate readout
var coord = document.getElementById('coord');
window.addEventListener('mousemove', function(e) {
  var x = String(e.clientX).padStart(4, '0');
  var y = String(e.clientY).padStart(4, '0');
  coord.textContent = 'X ' + x + '   Y ' + y;
});

let preHWHTML = document.querySelector(".preHWHTML")
let preHWJS = document.querySelector(".preHWJS")
preHWHTML.innerText = `<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/gh/borecjeborec1/kotasjs/cdn/kotasjs.min.js"></script>
    <script src="script.js"></script>
  </head>

  <body>
  </body>
</html>
`
preHWJS.innerText = `const kotas = new KotasJS()   
kotas.on("swipe_left",(e)=>{
  alert("Hello world!")
})`
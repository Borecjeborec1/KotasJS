let mouseGestures = new KotasJS()
mouseGestures.on("*", (e) => {
  alert(e.event)
  console.log(e)
})

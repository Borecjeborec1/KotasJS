# KotasJS

The only Javascript mouse gestures library!

*First of its kind.*

# Install

##### Via Npm

```shell
npm i kotasjs
```

##### Via CDN

```html
<script src="Link will go there"></script>
```

# Usage

```javascript
const kotas = new KotasJS()

// Listen to all mouse gestures
kotas.on("*", (e) => {
 alert(e.event)
})

// Listen to Swipe Down event
kotas.on("swipe_down", (e) => {
 alert(e.event)
})

// Listen to Swipe Up event
kotas.on("swipe_up", (e) => {
 alert(e.event)
})

// Listen to Swipe Left event
kotas.on("swipe_left", (e) => {
 alert(e.event)
})

// Listen to Swipe Right event
kotas.on("swipe_right", (e) => {
 alert(e.event)
})

```
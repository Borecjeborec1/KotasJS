/**
 * KotasJS is a library for handling mouse gestures.
 * @author borecjeborec1
 * @version 1.0.0
 * @license MIT
 * @see <a href="https://github.com/borecjeborec1/KotasJS">GitHub</a>
 * 
*/

class KotasJS {
  constructor(params = {}) {
    params = {
      threshold: params.threshold || 50,
      linelength: params.linelength || 150,
    }

    /**
     * @property {number} THRESHOLD Treshold for swipe detection
     * @default 50
     * @type {number}
     * @example
     * let kotas = new KotasJS({threshold:100})
     * 
    */
    this.THRESHOLD = params.threshold;
    /**
      * @property {number} LINE_LENGTH Line length for swipe detection
      * @default 150
      * @type {number}
      * @example
      * let kotas = new KotasJS({linelength:200})
      * 
    */
    this.LINE_LENGTH = params.linelength;
  }
  /**
      * 
      * @typedef  {Object} ReturnObject
      * @property {number} id - Event id (0)
      * @property {string} event - Event name (swipe_down)
      * @property {string} eventshort - Event short name (down)
      * @property {number} startX - Start X coordinate
      * @property {number} startY - Start Y coordinate
      * @property {number} endX - End X coordinate
      * @property {number} endY - End Y coordinate
      * @memberof KotasJS
      * 
    */

  #fc
  /**
   * @property {array} swipeRightArray Array of points for swipeRight detection
   * @memberof KotasJS
   * @private
  */
  #swipeRightArray = []
  /**
   * @property {array} swipeLeftArray Array of points for swipeLeft detection
   * @memberof KotasJS
   * @private
  */
  #swipeLeftArray = []
  /**
   * @property {array} swipeUpArray Array of points for swipeUp detection
   * @memberof KotasJS
   * @private
  */
  #swipeUpArray = []
  /**
   * @property {array} swipeDownArray Array of points for swipeDown detection
   * @memberof KotasJS
   * @private
  */
  #swipeDownArray = []

  #mult = []

  /**
   * 
   * <p>Currently there are only 4 events right now: <b>swipe_down</b>, <b>swipe_up</b>, <b>swipe_left</b>, <b>swipe_right</b></p>
   * <p>Aliases: <b>swipe_down</b>><b>down</b>><b>0</b>, <b>swipe_up</b>><b>up</b>><b>1</b>, <b>swipe_left</b>><b>left</b>><b>2</b>, <b>swipe_right</b>><b>right</b>><b>3</b></p>
   * @param {number|string} event Event name
   * @param {function} callback Callback function
   * @returns {ReturnObject} [ReturnObject](#ReturnObject)
   * @memberof KotasJS
   * @example
   * // Listen to all mouse gestures
   * kotas.on("*", (e) => {
   *  alert(e.event)
   * })
   * 
   * @example
   * // Listen to Swipe Down event
   * kotas.on("swipe_down", (e) => {
   *  alert(e.event)
   * })
   * 
   * @example
   * // Listen to Swipe Up event
   * kotas.on("swipe_up", (e) => {
   *  alert(e.event)
   * })
   * 
   * @example
   * // Listen to Swipe Left event
   * kotas.on("swipe_left", (e) => {
   *  alert(e.event)
   * })
   * 
   * @example
   * // Listen to Swipe Right event
   * kotas.on("swipe_right", (e) => {
   *  alert(e.event)
   * })
   * 
  */
  on(event, callback) {
    switch (event) {
      case '0':
      case 'down':
      case 'swipe_down':
        this.#fc = this.#swipeDown
        break
      case '1':
      case 'up':
      case 'swipe_up':
        this.#fc = this.#swipeUp
        break
      case '2':
      case 'right':
      case 'swipe_right':
        this.#fc = this.#swipeRight
        break
      case '3':
      case 'left':
      case 'swipe_left':
        this.#fc = this.#swipeLeft
        break
      case "*":
      case "all":
        this.#fc = this.#all
    }
    document.addEventListener("mousemove", (e) => this.#fc(e, callback))
  }

  /**
   * 
   * @param {object} e object with x and y properties returned by mousemove event
   * @param {function} cb  Callback function
   * @memberof KotasJS
   * @private
   * @returns {ReturnObject} ReturnObject
   * 
  */
  #swipeDown(e, cb) {
    if (this.#swipeDownArray.length <= 0) this.#swipeDownArray.push({ x: e.x, y: e.y })
    if (e.x > this.#swipeDownArray[0].x - this.THRESHOLD && e.x < this.#swipeDownArray[0].x + this.THRESHOLD && e.y > this.#swipeDownArray[this.#swipeDownArray.length - 1].y) {
      this.#swipeDownArray.push({ x: e.x, y: e.y })
    } else {
      this.#swipeDownArray = [{ x: e.x, y: e.y }]
    }
    if (this.#swipeDownArray.length > this.LINE_LENGTH) {
      cb({ id: 0, eventshort: "down", event: "swipe_down", startX: this.#swipeDownArray[0].x, startY: this.#swipeDownArray[0].y, endX: this.#swipeDownArray[this.#swipeDownArray.length - 1].x, endY: this.#swipeDownArray[this.#swipeDownArray.length - 1].y })
      this.#swipeDownArray = [{ x: e.x, y: e.y }]
      this.#mult = ["down"]
    }
  }

  /**
  * 
  * @param {object} e object with x and y properties returned by mousemove event
  * @param {function} cb  Callback function
  * @memberof KotasJS
  * @private
  * @returns {ReturnObject} ReturnObject
  * 
 */
  #swipeUp(e, cb) {
    if (this.#swipeUpArray.length <= 0) this.#swipeUpArray.push({ x: e.x, y: e.y })
    if (e.x > this.#swipeUpArray[0].x - this.THRESHOLD && e.x < this.#swipeUpArray[0].x + this.THRESHOLD && e.y < this.#swipeUpArray[this.#swipeUpArray.length - 1].y) {
      this.#swipeUpArray.push({ x: e.x, y: e.y })
    } else {
      this.#swipeUpArray = [{ x: e.x, y: e.y }]
    }
    if (this.#swipeUpArray.length > this.LINE_LENGTH) {
      cb({ id: 1, eventshort: "up", event: "swipe_up", startX: this.#swipeUpArray[0].x, startY: this.#swipeUpArray[0].y, endX: this.#swipeUpArray[this.#swipeUpArray.length - 1].x, endY: this.#swipeUpArray[this.#swipeUpArray.length - 1].y })
      this.#swipeUpArray = [{ x: e.x, y: e.y }]
    }
  }

  /**
   * 
   * @property {function} swipeRight Callback function for swipeRight detection
   * @param {object} e object with x and y properties returned by mousemove event
   * @param {function} cb  Callback function
   * @memberof KotasJS
   * @private
   * @returns {@link ReturnObject}
   * 
  */
  #swipeRight(e, cb) {
    if (this.#swipeRightArray.length <= 0) this.#swipeRightArray.push({ x: e.x, y: e.y })
    if (e.y > this.#swipeRightArray[0].y - this.THRESHOLD && e.y < this.#swipeRightArray[0].y + this.THRESHOLD && e.x > this.#swipeRightArray[this.#swipeRightArray.length - 1].x) {
      this.#swipeRightArray.push({ x: e.x, y: e.y })
    } else {
      this.#swipeRightArray = [{ x: e.x, y: e.y }]
    }
    if (this.#swipeRightArray.length > this.LINE_LENGTH) {
      cb({ id: 2, eventshort: "right", event: "swipe_right", startX: this.#swipeRightArray[0].x, startY: this.#swipeRightArray[0].y, endX: this.#swipeRightArray[this.#swipeRightArray.length - 1].x, endY: this.#swipeRightArray[this.#swipeRightArray.length - 1].y })
      this.#swipeRightArray = [{ x: e.x, y: e.y }]
    }
  }

  /**
   * 
   * @property {function} swipeLeft Callback function for swipeLeft detection
   * @param {object} e object with x and y properties returned by mousemove event
   * @param {function} cb  Callback function
   * @memberof KotasJS
   * @private
   * @returns {@link ReturnObject}
  */
  #swipeLeft(e, cb) {
    if (this.#swipeLeftArray.length <= 0) this.#swipeLeftArray.push({ x: e.x, y: e.y })
    if (e.y > this.#swipeLeftArray[0].y - this.THRESHOLD && e.y < this.#swipeLeftArray[0].y + this.THRESHOLD && e.x < this.#swipeLeftArray[this.#swipeLeftArray.length - 1].x) {
      this.#swipeLeftArray.push({ x: e.x, y: e.y })
    } else {
      this.#swipeLeftArray = [{ x: e.x, y: e.y }]
    }
    if (this.#swipeLeftArray.length > this.LINE_LENGTH) {
      cb({ id: 3, eventshort: "left", event: "swipe_left", startX: this.#swipeLeftArray[0].x, startY: this.#swipeLeftArray[0].y, endX: this.#swipeLeftArray[this.#swipeLeftArray.length - 1].x, endY: this.#swipeLeftArray[this.#swipeLeftArray.length - 1].y })
      this.#swipeLeftArray = [{ x: e.x, y: e.y }]
    }
  }
  #downRight(e, cb) {
  }
  /**
   *  
   * @property {function} all Callback function for all detection
   * @param {object} e object with x and y properties returned by mousemove event
   * @param {function} cb  Callback function
   * @memberof KotasJS
   * @private
   * @returns {@link ReturnObject}
   * 
  */
  #all(e, cb) {
    this.#swipeDown(e, cb)
    this.#swipeUp(e, cb)
    this.#swipeLeft(e, cb)
    this.#swipeRight(e, cb)
  }
}
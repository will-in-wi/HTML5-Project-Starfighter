/**
 * @name Events
 * @description creates a new Events object.  Currently used within {@link APMPlayer}, internal and external version + {@link Playlist}
 * @constructor
 */
class Events {
  constructor() {
    /**
     * @name handlers
     * @description array of event handler objects in form of { 'handler_name', function() {} }.
     * @type Array.<Object>
     * @fieldOf Events
     */
    this.handlers = [];
  }

  /**
   * @name trigger
   * @description fires all events handlers that match 'name' and passes eventArgs to each handler.
   * @param {string} name name of event to fire
   * @param {Object} eventArgs object literal to pass to all function handlers. Additional arguments will also be passed.
   *
   * @example APMPlayer.events.trigger(player.events.type.MEDIA_READY, { 'identifier' : this.ID });
   *
   * @methodOf Events
   */
  trigger(name, eventArgs) {
    var i;
    for (i = 0; i < this.handlers.length; i += 1) {
      if (this.handlers[i].eventName === name) {
        var args = Array.prototype.slice.call(arguments, 1);
        this.handlers[i].eventHandler.apply(this, args);
      }
    }
  }

  /**
   * @name addListener
   * @description adds an event listener
   * @param {string} name the name of the event to listen for
   * @param {Object} handler function to fire when event is called.
   *
   * @example APMPlayer.events.addListener(APMPlayer.events.type.PLAYER_READY, function() {});
   * @methodOf Events
   */
  addListener(name, handler) {
    if (typeof (name) !== 'string' || typeof (handler) !== 'function') {
      Debug.log("Invalid parameters when creating listener with the following arguments: 'Name': " + name + ", 'Handler': " + handler, Debug.type.error);
    }
    Debug.log('Registered listener for ' + name);
    this.handlers.push({ "eventName" : name, "eventHandler" : handler });
  }

  /**
   * @name removeListeners
   * @description clears out all listeners in this events objec
   *
   * @example APMPlayer.events.removeListeners();
   * @methodOf Events
   */
  removeListeners() {
    this.handlers = [];
  }
}

export default Events;

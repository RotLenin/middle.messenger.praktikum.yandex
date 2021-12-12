/** EventBus
 *  Шина действий
 */
import Iobject from "../../types/interface/Iobject";

class EventBus {
  public listeners : Iobject;

  /**
   *
   */
  constructor() {
    this.listeners = {};
  }

  /** on
   * @param {string} event
   * @param {function} callback
   */
  on(event : string, callback: any) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  /** off
   * @param {string} event
   * @param {function} callback
   */
  off(event : string, callback : any) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
        (listener: any) => listener !== callback
    );
  }

  /**
   * @param {string} event
   * @param {array} args
   */
  emit(event : string, ...args : any) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function(listener : any) {
      listener(...args);
    });
  }
}

export default EventBus;

/** EventBus
 *  Шина действий
 */
import '../../types/type/Callback';

class EventBus {
  public listeners : Record<string, any>;

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
  on(event : string, callback: CallbackFunctionVariadicAnyReturn) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  /** off
   * @param {string} event
   * @param {function} callback
   */
  off(event : string, callback : CallbackFunctionVariadicAnyReturn) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
        (listener: any) => {
          return listener !== callback
        }
    );
  }

  /**
   * @param {string} event
   * @param {array} args
   */
  emit(event : string, ...args : any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function(listener : CallbackFunctionVariadicAnyReturn) {
      listener(...args);
    });
  }
}

export default EventBus;

/** DefaultSocket
 *  @description Родительский класс для сокетов
 */
export default class DefaultSocket {
  public _socket : WebSocket | null = null
  public SOCKET_URL = 'wss:/ya-praktikum.tech/ws'
  public WAIT_OPEN_TIMEOUT = 5;

  /** constructor
   *
   */
  constructor() {
    this.waitSocketConnection = this.waitSocketConnection.bind(this);
  }

  /** waitSocketConnection
   * @description выполняет callback после подключения к сокету
   * @param {function} callback
   * @return {boolean}
   */
  public waitSocketConnection(callback : () => void) {
    if (this._socket === null) {
      throw new Error('undefined socket')
    }

    const socket = this._socket;
    const fn = this.waitSocketConnection;

    return setTimeout(() => {
      if (socket.readyState === 1) {
        callback()
        return true;
      } else if (socket.readyState === 0) {
        fn(callback);
      } else {
        return false;
      }
    }, this.WAIT_OPEN_TIMEOUT);
  }

  /** checkSocket
   *  @description Проверяет наличие и статус сокета
   *  @throws {Error}
   *  @return {boolean}
   */
  public checkSocket() {
    if (this._socket === null) {
      throw new Error('undefined socket')
    }

    return this._socket.readyState === 0 || this._socket.readyState !== 1
  }
}

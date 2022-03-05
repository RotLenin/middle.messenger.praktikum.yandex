/** nodeListforEach
 * Метод Array.forEach для NodeList
 * @param {NodeList} list
 * @param {function} fn
 * @constructor
 */
export function nodeListforEach(list : NodeList, fn : (item : Node) => void) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    fn(item);
  }
}

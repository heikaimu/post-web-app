/**
 * 节流
 * params: {
 *  func: 原执行函数
 *  delay: 时间间隔
 * }
 */
export default (func, delay) => {
  let timer = 0;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = 0;
    }, delay);
    func.apply(this, args);
  }
}

/**
 * 防抖
 * params: {
 *  func: 原执行函数
 *  delay: 延迟时间
 * }
 */
export default (func, delay) => {
  let timer = 0;
  return (...args) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = 0;
      func.apply(this, args);
    }, delay);
  }
}


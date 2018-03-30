// 根据添加的时间错获取年龄
export const getAge = (timeStamp) => {
  const birth = parseInt(timeStamp);
  // birth = Date.parse(birth.replace('/-/g', "/"))
  const year = 1000 * 60 * 60 * 24 * 365;
  const month = 1000 * 60 * 60 * 24 * 30;
  const week = 1000 * 60 * 60 * 24 * 7;
  const day = 1000 * 60 * 60 * 24 * 1;
  const now = new Date();
  const birthday = new Date(birth);
  if (now - birthday < 0) return '';
  const age = parseInt((now - birthday) / year);
  if (age !== 0) {
    return age + '年';
  } else if (Math.ceil((now - birthday) / month) > 1) {
    return Math.ceil((now - birthday) / month) + '个月';
  } else if (Math.ceil((now - birthday) / week) > 1) {
    return Math.ceil((now - birthday) / week) + '周';
  } else {
    return Math.ceil((now - birthday) / day) + '天';
  }
}

// 根据添加的时间错获取过去的时间
export const getPastTime = (timeStamp) => {
  const startTime = new Date(parseInt(timeStamp));
  const stampDiscrepancy = Math.ceil(new Date() - startTime);

  const dayStamp = 1000 * 60 * 60 * 24 * 1;
  const hourStamp = 1000 * 60 * 60;
  const minStamp = 1000 * 60;

  if (stampDiscrepancy < dayStamp) {
    const hour = Math.ceil(stampDiscrepancy / hourStamp);
    if (hour > 1) {
      return `${hour}小时前`;
    } else {
      const min = Math.ceil(stampDiscrepancy / minStamp);
      if (min > 1) {
        return `${min}分钟前`;
      } else {
        return '刚才';
      }
    }
  } else {
    const year = startTime.getFullYear();
    const month = startTime.getMonth();
    const day = startTime.getDate();
    return `${year}-${month}-${day}`;
  }

}

export const jsonParse = (json) => {
  return JSON.parse(json);
}

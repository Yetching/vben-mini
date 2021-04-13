//判断是否为 十六进制颜色值
export function isHexColor(color) {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/;
  return reg.test(color);
}

export function rgbToHex(r, g, b) {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
}

export function hexToRGB(hex) {
  let sHex = hex.toLowerCase();
  if (isHexColor(hex)) {
    if (sHex.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1));
      }
      sHex = sColorNew;
    }
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sHex.slice(i, i + 2)));
    }
    return 'RGB(' + sColorChange.join(',') + ')';
  }
  return sHex;
}

export function colorIsDark(color) {
  if (!isHexColor(color)) return;

  const [r, g, b] = hexToRGB(color)
    .replace(/(?:\(|\)|rgb|RGB)*/g, '')
    .split(',')
    .map((item) => Number(item));
  return r * 0.299 + g * 0.578 + b * 0.114 < 192; //彩色图 到灰度图权重比对
}

export function darken(color, amount) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
    color.substring(2, 4),
    amount
  )}${subtractLight(color.substring(4, 6), amount)}`;
}

export function lighten(color, amount) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`;
}

function addLight(color, amount) {
  const cc = parseInt(color, 16) + amount;
  const c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

function subtractLight(color, amount) {
  const cc = parseInt(color, 16) - amount;
  const c = cc < 0 ? 0 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

//计算RGB颜色的亮度值
function luminanace(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

//计算两种颜色的对比度
function contrast(rgb1, rgb2) {
  return (
    (luminanace(~~rgb1[0], ~~rgb1[1], ~~rgb1[2]) + 0.05) /
    (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05)
  );
}

//根据与背景色的对比度计算得出选择黑色还是白色的文本颜色
export function calculateBestTextColor(hexColor) {
  const rgbColor = hexToRGB(hexColor.substring(1));
  const contrastWithBlack = contrast(rgbColor.split(','), [0, 0, 0]);
  return contrastWithBlack >= 12 ? '#000000' : '#FFFFFF';
}

// base64转码
export const convertBase64UrlToBlob = (urlData) => {
  if (urlData) {
    const bytes = window.atob(urlData.split(',')[1]);
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {name: 'avatar.png', type: 'image/jpeg'});
  } else {
    return '';
  }
}

export function validateUrl(url) {
    // Cria uma expressão regular para validar a URL
    var urlRegExp = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i);
    
    // Testa se a URL é válida
    return urlRegExp.test(url);
  }
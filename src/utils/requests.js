
export const $get = (url, header) => {
                   const headers = new Headers();
                   for (let [key, value] of Object.entries(header)) {
                    headers.append(key, value);
                  }                   
                   const init = {
                     method: 'GET',
                     headers
                   }
                   return fetch(url, init)
                   .then((response) => {
                    return response.text();
                   })
                   .then((text) => {
                    return text
                   })
                   .catch((e) => {
                     console.log(e);
                   });
}

export const  $post = (url, header, body) => {

}




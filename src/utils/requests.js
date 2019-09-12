export const $get = async (url, header) => {
                   const headers = new Headers();
                   for (let [key, value] of Object.entries(header)) {
                    headers.append(key, value);
                  }                   
                   const init = {
                     method: 'GET',
                     headers
                   }
                   try {
    const response = await fetch(url, init);
    const text = await response.text();
    return text;
  }
  catch (e) {
    console.log(e);
  }
}

export const $post = async (url, header, body) => {
                    const headers = new Headers();
                    for (let [key, value] of Object.entries(header)) {
                      headers.append(key, value);
                    }
                    const init = {
                      method: 'POST',
                      headers,
                      body: JSON.stringify(body)
                    }
                    try {
    const response = await fetch(url, init);
    return response;
  }
  catch (e) {
    console.log(e);
  }
}

export const $delete = async (url, header) => {
  const headers = new Headers();
  for (let [key, value] of Object.entries(header)) {
    headers.append(key, value);
  }
  const init = {
    method: 'DELETE',
    headers
  }
  try {
const response = await fetch(url, init);
return response;
}
catch (e) {
console.log(e);
}
}

export const $put = async (url, header, body) => {
  const headers = new Headers();
  for (let [key, value] of Object.entries(header)) {
    headers.append(key, value);
  }
  const init = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  }
  try {
const response = await fetch(url, init);
return response;
}
catch (e) {
console.log(e);
}
}
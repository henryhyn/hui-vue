const Hex = {};

Hex.toQuery = (object) => Object.keys(object)
  .filter(key => Hex.validAny(object[key]))
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
  .join('&');

Hex.get = (url, params, cb) => {
  if (cb === undefined) {
    cb = params;
    params = undefined;
  }

  if (params !== undefined) {
    url = url + '?' + Hex.toQuery(params);
  }

  fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(cb);
    }
  });
};

Hex.post = (url, params, cb) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(cb);
    }
  });
};

Hex.put = (url, params, cb) => {
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(cb);
    }
  });
};

Hex.delete = (url, cb) => {
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(cb);
    }
  });
};

Hex.validAny = any => any !== null && any !== undefined;
Hex.validString = str => Hex.validAny(str) && str && str.toLowerCase() !== 'null' && str.toLowerCase() !== 'undefined' && str.trim().length > 0;
Hex.validNumber = num => Hex.validAny(num);
Hex.validId = num => Hex.validAny(num) && num > 0;

Hex.toString = (idx, lst) => lst[idx];

Hex.empty = () => {
};

export default Hex;

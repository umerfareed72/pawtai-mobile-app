import {Constants} from '../Theme';

const axios = require('axios');

export const Signup = (body, myCallback) => {
  const api = `${Constants.ApiPrefix}/auth/signup`;
  axios
    .post(api, body)
    .then(response => {
      myCallback({sucess: response});
    })
    .catch(error => {
      if (error.response) {
        myCallback({error: error.response.data.message});
      } else {
        myCallback({error: error});
      }
    });
};

export const LoginApi = (body, myCallback) => {
  const api = `${Constants.ApiPrefix}/auth/login`;
  axios
    .post(api, body)
    .then(response => {
      myCallback({sucess: response});
    })
    .catch(error => {
      if (error.response) {
        myCallback({error: error.response.data.message});
      } else {
        myCallback({error: error});
      }
    });
};

export const LoginApiNew = (body, myCallback, token) => {
  const api = `${Constants.ApiPrefix}/auth/signup`;
  axios
    .post(api, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      myCallback({sucess: response});
    })
    .catch(error => {
      if (error.response) {
        myCallback({error: error.response.data.message});
      } else {
        myCallback({error: error});
      }
    });
};

export const AddPotai = (body, myCallback, token) => {
  console.log('AddPotai APi');
  const api = `${Constants.ApiPrefix}/pawtai/add`;
  axios({
    url: api,
    method: 'POST',
    data: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      myCallback({sucess: response});
    })
    .catch(error => {
      if (error.response) {
        myCallback({error: error.response.data.message});
      } else {
        myCallback({error: error});
      }
    });
};

export const FindPawtai = (petCode, myCallback, token) => {
  const api = `${Constants.ApiPrefix}/pawtai/find/${petCode}`;
  axios
    .get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      myCallback({sucess: response});
    })
    .catch(error => {
      if (error.response) {
        myCallback({error: error.response.data.message});
      } else {
        myCallback({error: error});
      }
    });
};

export const JoinPawtai = (body, myCallback, token) => {
  const api = `${Constants.ApiPrefix}/pawtai/join`;
  axios({
    url: api,
    method: 'POST',
    data: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      myCallback({sucess: response});
    })
    .catch(error => {
      if (error.response) {
        myCallback({error: error.response.data.message});
      } else {
        myCallback({error: error});
      }
    });
};

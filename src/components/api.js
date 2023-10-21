// api.js

import axios from 'axios';

const url = 'https://be.moovci.mobiblanc.tech';
const user = 'mobiblanc';
const pas = 'MobiBlanc@2022';

export async function get_otp(numero) {
  try {
    const response = await axios.post(`${url}/api/auth/sendCode`, {
      msisdn: numero,
    }, {
      auth: {
        username: user,
        password: pas,
      },
    });

    if (response.data.message === 'code sended') {
      return 'ok';
    } else {
      return 'error';
    }
  } catch (error) {
    console.error('Erreur lors de la requête POST :', error);
    throw error;
  }
}
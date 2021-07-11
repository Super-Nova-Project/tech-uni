async function validteEmail(email) {
  let success = false;
  const mailBoxLayerAPI = ` http://apilayer.net/api/check?access_key=2da14f88d53e3eb1dfb279b9593bde17&email=${email}&smtp=1&format=1`;
  await fetch(mailBoxLayerAPI, {
    method: 'get',
    mode: 'cors',
  })
    .then(data => data.json())
    .then(data => {
      console.log({ data })
      success = data.smtp_check? data.smtp_check: false;
    })
    .catch(console.error);
  // console.log({ success })
  return success;

}

export default validteEmail

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
  btoa: (input)  => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || (map = '=', i % 1);
    output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3/4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      
      block = block << 8 | charCode;
    }
    
    return output;
  },

  atob: (input) => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};

const sendSmsVerification = async (phoneNumber) => {
 try {
   const data = {
     "To":phoneNumber,
     "Channel":'sms',
   };
   var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
   const response = await fetch('https://verify.twilio.com/v2/Services/VA9/Verifications', {
     method: "POST",
     headers: {
      'Authorization': 'Basic '+Base64.btoa('AC9:5fc'), 
       "Content-Type": "application/x-www-form-urlencoded",
     },
     body: formBody,
   });
   if(response.status===201)
   {
      return(true);
   }
   else
   {
    return(false);
   }
 } catch (error) {
   return false;
 }
};

const checkVerification = async (phoneNumber, code, token) => {
  const res=await fetch("https://pay-track-backend.vercel.app/authenticate/phone", 
  {
    method: "POST",
    mode:'cors',
    body: JSON.stringify({token: token, phone:phoneNumber, code:code}),
    headers: {
      "Content-Type": "application/json"
    }
  })
      if(res.status===200)
      {
        const val=await res.json()
        return((val.phoneStatus!==1&&val.phoneStatus!==2)?0:val.phoneStatus);
      }
      else
      {
        return(2);
      }
}

module.exports = {
 sendSmsVerification,
 checkVerification,
};
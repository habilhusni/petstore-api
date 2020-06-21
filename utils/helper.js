const ValidateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

const generateUniqueString = (type) => {
  var ts = String(new Date().getTime()),
    i = 0,
    out = "";

  for (i = 0; i < ts.length; i += 2) {
    out += Number(ts.substr(i, 2)).toString(36);
  }

  return type + out;
};

module.exports = { ValidateEmail, generateUniqueString };

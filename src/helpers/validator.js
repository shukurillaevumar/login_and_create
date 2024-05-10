const getObjectWith3Lang = (obj) => {
  //en ru uz
  let isCorrectObject = false;

  if ("en" in obj && "ru" in obj && "uz" in obj) {
    isCorrectObject = true;
  }
  return isCorrectObject;
};

module.exports = {
  getObjectWith3Lang,
};

const { isNil } = require("lodash");

const bodyAreaValidation = (body_area) => {
    if (isNil(body_area) || body_area === "") {
      return "The body area must be filled in";
    }
    if (typeof body_area !== "string") {
      return "The body area must be a string";
    }
    if (body_area.length < 8 || body_area.length > 200) {
      return "The body area must contain between 8 and 200 characters";
    }
    return null;
};

const sizeValidation = (size) => {
    if (isNil(size) || size === "") {
      return "The body area must be filled in";
    }
    if (typeof size !== "string") {
      return "The body area must be a string";
    }
    if (size.length < 8 || size.length > 200) {
      return "The body area must contain between 8 and 200 characters";
    }
    return null;
};

const bodyPictureValidation = (body_picture) => {
    if (isNil(body_picture) || body_picture === "") {
      return "The picture of the area of your body where you want your tattoo must be filled in";
    }
    if (typeof body_picture !== "string") {
      return "The url of the body picture area must be a string";
    }
    if (body_picture.length < 10 || body_picture.length > 255) {
      return "The url of the body picture must contain between 10 and 255 characters";
    }
    return null;
};

const tattooOwnerValidation = (tattoo_owner) => {
    if (isNil(tattoo_owner) || tattoo_owner === "") {
      return "Please indicate if you are already tattooed";
    }
    if (typeof tattoo_owner == "boolean") {
      return null;
    }
};

const tattooPictureValidation = (tattoo_picture) => {
    if (isNil(tattoo_picture) || tattoo_picture === "") {
      return "The picture of the area of your body where you're already tattooed must be filled in";
    }
    if (typeof tattoo_picture !== "string") {
      return "The url of the body picture area must be a string";
    }
    if (tattoo_picture.length < 10 || tattoo_picture.length > 255) {
      return "The url of the body picture must contain between 10 and 255 characters";
    }
    return null;
};

const descriptionTxtValidation = (descriptionTxt) => {
    if (isNil(descriptionTxt) || descriptionTxt === "") {
      return `Le nom d'utilisateur du compte ${socialNetworkName} doit être renseignée`;
    }
    if (typeof socialNetworkData !== "string") {
      return `L'url de la photo de profil doit être une chaîne de caractères`;
    }
    if (socialNetworkData.length < 10 || socialNetworkData.length > 2083) {
      return `L'url de la photo de profil doit contenir entre 10 et 255 caractères`;
    }
    return null;
  };

  const descriptionNikosTttValidation = (nikos_ttt_picture) => {
    if (isNil(nikos_ttt_picture) || nikos_ttt_picture === "") {
      return "Please also attach some tattoos of Nikos (only!) that inspire you";
    }
    if (typeof nikos_ttt_picture !== "string") {
      return "The url of Nikos's inspiration tattoos must be a string.";
    }
    if (nikos_ttt_picture.length < 10 || nikos_ttt_picture.length > 255) {
      return "The url of Nikos's inspiration tattoos must contain between 10 and 255 characters";
    }
    return null;
};

const activityValidation = (activity) => {
  if (isNil(activity) || activity === "") {
    return "The activity, job or passion must be filled in";
  }
  if (typeof activity !== "string") {
    return "The activity, job or passion must be a string";
  }
  if (activity.length < 8 || activity.length > 200) {
    return "The activity, job or passion must contain between 8 and 200 characters";
  }
  return null;
};

const cityValidation = (city) => {
  if (isNil(city) || city === "") {
    return "The city must be filled in";
  }
  if (typeof city !== "string") {
    return "The city must be a string";
  }
  if (city.length < 8 || city.length > 200) {
    return "The city must contain between 8 and 200 characters";
  }
  return null;
};

const countryValidation = (country) => {
  if (isNil(country) || country === "") {
    return "The country must be filled in";
  }
  if (typeof country !== "string") {
    return "The country must be a string";
  }
  if (country.length < 8 || country.length > 200) {
    return "The country must contain between 8 and 200 characters";
  }
  return null;
};

const drawingSessionValidation = (drawing_session) => {
  if (isNil(drawing_session) || drawing_session === "") {
    return "Please indicate if you want a drawing session before your tattoo session";
  }
  if (typeof drawing_session === "boolean") {
    return null;
  }
  
};

const tattooSessionValidation = (tattoo_session) => {
  if (isNil(tattoo_session) || tattoo_session === "") {
    return "Please indicate if you prefer a tattoo session first";
  }
  if (typeof tattoo_session === "boolean") {
    return null;
  }

};


module.exports = (data) => {
  /* eslint-disable camelcase */
  const {
    body_area,
    size,
    body_picture,
    tattoo_owner,
    tattoo_picture,
    descriptionTxt,
    nikos_ttt_picture,
    activity,
    city,
    country,
    drawing_session,
    tattoo_session
  } = data;
  /* eslint-enable camelcase */
  const errors = [];

  const bodyAreaError = bodyAreaValidation(body_area);
  if (bodyAreaError) errors.push({ field: "body_area", message: bodyAreaError });

  const sizeError = sizeValidation(size);
  if (sizeError) errors.push({ field: "size", message: sizeError });

  const bodyPictureError = bodyPictureValidation(body_picture);
  if (bodyPictureError) errors.push({ field: "body_picture", message: bodyPictureError });

  const tattooOwnerError = tattooOwnerValidation(tattoo_owner);
  if (tattooOwnerError) errors.push({ field: "tattoo_owner", message: tattooOwnerError });

  const tattooPictureError = tattooPictureValidation(tattoo_picture);
  if (tattooPictureError) errors.push({ field: "tattoo_picture", message: tattooPictureError });

  const descriptionTxtError = descriptionTxtValidation(descriptionTxt);
  if (descriptionTxtError) errors.push({ field: "descriptionTxt", message: descriptionTxtError });

  const descriptionNikosTttError = descriptionNikosTttValidation(nikos_ttt_picture);
  if (descriptionNikosTttError) errors.push({ field: "nikos_ttt_picture", message: descriptionNikosTttError });

  const activityError = activityValidation(activity);
  if (activityError) errors.push({ field: "activity", message: activityError });

  const cityError = cityValidation(city);
  if (cityError) errors.push({ field: "city", message: cityError });

  const countryError = countryValidation(country);
  if (countryError) errors.push({ field: "country", message: countryError });

  const drawingSessionError = drawingSessionValidation(drawing_session);
  if (drawingSessionError) errors.push({ field: "drawing_session", message: drawingSessionError });

  const tattooSessionError = tattooSessionValidation(tattoo_session);
  if (tattooSessionError) errors.push({ field: "tattoo_session", message: tattooSessionError });


  return errors.length > 0 ? errors : null;
};

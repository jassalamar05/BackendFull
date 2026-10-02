const axios = require("axios");

const User = require("../Model/ClientModel");

// const getGoogleTokens = async (code) => {
//   const response = await axios.post(
//     "https://oauth2.googleapis.com/token",
//     {
//       code,

//       client_id: process.env.GOOGLE_CLIENT_ID,

//       client_secret: process.env.GOOGLE_CLIENT_SECRET,

//       redirect_uri: process.env.GOOGLE_CALLBACK_URL,

//       grant_type: "authorization_code",
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data;
// };

const getGoogleTokens = async (code) => {
  console.log("CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
  console.log("SECRET EXISTS:", !!process.env.GOOGLE_CLIENT_SECRET);
  console.log("SECRET LENGTH:", process.env.GOOGLE_CLIENT_SECRET?.length);

  const response = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    grant_type: "authorization_code",
  });

  return response.data;
};

const getGoogleUser = async (accessToken) => {
  const response = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

const findOrCreateUser = async (googleUser) => {
  const { id, name, email, picture } = googleUser;

  let user = await User.findOne({
    googleId: id,
  });

  if (!user) {
    user = await User.findOne({
      email: email,
    });
  }

  if (!user) {
    user = await User.create({
      googleId: id,
      name: name,
      email: email,
      profileImage: picture,
    });
  } else {
    user.googleId = id;
    user.name = name;
    user.profileImage = picture;

    await user.save();
  }

  return user;
};

module.exports = {
  getGoogleTokens,
  getGoogleUser,
  findOrCreateUser,
};

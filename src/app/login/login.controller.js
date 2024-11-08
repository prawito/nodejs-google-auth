import * as dotenv from "dotenv";
import { google } from "googleapis";
import * as usersRepository from "../users/users.repository.js";
import jwt from "jsonwebtoken";
dotenv.config();

const { OAuth2 } = google.auth;

const client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

const authUrl = client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

export const googleLogin = async (req, res) => {
  res.redirect(authUrl);
};

export const googleCallback = async (req, res) => {
  const { code } = req.query;
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);
  const oauth2 = google.oauth2({
    version: "v2",
    auth: client,
  });
  const { data } = await oauth2.userinfo.get();
  if (!data) {
    const error = {
      code: 404,
      message: "Not Found",
      data: "User not found",
    };
    res.json(error);
  }
  const user = await usersRepository.getUserByEmail(data.email);
  if (!user) {
    const error = {
      code: 404,
      message: "Not Found",
      data: "User not found",
    };
    res.json(error);
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const result = {
    code: 200,
    message: "Success",
    data: user,
    dataFromGoogle: data,
    token,
  };
  res.json(result);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.verifyEmail = verifyEmail;
exports.login = login;
exports.refresh = refresh;
exports.logout = logout;
const auth_service_1 = require("../services/auth.service");
const user_repository_1 = require("../repositories/user.repository");
const token_repository_1 = require("../repositories/token.repository");
const auth_validator_1 = require("../validators/auth.validator");
const service = new auth_service_1.AuthService(new user_repository_1.UserRepository(), new token_repository_1.TokenRepository());
async function signup(req, res) {
    const body = auth_validator_1.signupSchema.parse(req.body);
    const result = await service.signup(body);
    res.status(201).json(result);
}
async function verifyEmail(req, res) {
    const body = auth_validator_1.verifyEmailSchema.parse(req.body);
    const result = await service.verifyEmail(body.token);
    res.json(result);
}
async function login(req, res) {
    const body = auth_validator_1.loginSchema.parse(req.body);
    const result = await service.login(body.email, body.password);
    res.json(result);
}
async function refresh(req, res) {
    const body = auth_validator_1.refreshSchema.parse(req.body);
    const result = await service.refresh(body.refreshToken);
    res.json(result);
}
async function logout(req, res) {
    const body = auth_validator_1.logoutSchema.parse(req.body);
    const result = await service.logout(body.refreshToken);
    res.json(result);
}

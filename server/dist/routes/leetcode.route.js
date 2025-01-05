"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queries_1 = require("../queries");
const leetcodeRoutes = express_1.default.Router();
leetcodeRoutes.get('/userSessionProgress/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchFromGraphql(queries_1.USER_SESSION_PROGRESS, 'userSessionProgress', req, res);
}));
leetcodeRoutes.get('/skillStats/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchFromGraphql(queries_1.SKILL_STATS, 'skillStats', req, res);
}));
leetcodeRoutes.get('/userPublicProfile/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchFromGraphql(queries_1.USER_PUBLIC_PROFILE, 'userPublicProfile', req, res);
}));
leetcodeRoutes.get('/recentAcSubmissions/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchFromGraphql(queries_1.RECENT_SUBMISSIONS, 'recentAcSubmissions', req, res);
}));
leetcodeRoutes.get('/userProfileCalendar/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchFromGraphql(queries_1.USER_PROFILE_CALENDAR, 'userProfileCalendar', req, res);
}));
const fetchFromGraphql = (query, operationName, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiUrl = 'https://leetcode.com/graphql';
    const payload = {
        operationName,
        query,
        variables: Object.assign({ username: req.params['username'] }, req.query),
    };
    try {
        const response = yield fetch(apiUrl, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) {
            console.error(response.status, response.statusText);
            res.status(response.status).json({ error: 'Failed to fetch from LeetCode API' });
            return;
        }
        const data = yield response.json();
        if (operationName === 'recentAcSubmissions') {
            data.data ? res.status(200).json(data.data.recentAcSubmissionList) : res.status(404).json({ error: 'Could not retrieve recent submission list' });
            return;
        }
        const { matchedUser } = data.data;
        if (!matchedUser) {
            console.warn('User not found in graphQL request');
            res.status(404).json({ error: 'User not found!' });
            return;
        }
        res.status(200).json(matchedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.default = leetcodeRoutes;

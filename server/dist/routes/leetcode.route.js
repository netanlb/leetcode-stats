"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queries_1 = require("../queries");
const leetcodeRoutes = express_1.default.Router();
leetcodeRoutes.get('/userSessionProgress/:username', async (req, res) => {
    await fetchFromGraphql(queries_1.USER_SESSION_PROGRESS, 'userSessionProgress', req, res);
});
leetcodeRoutes.get('/skillStats/:username', async (req, res) => {
    await fetchFromGraphql(queries_1.SKILL_STATS, 'skillStats', req, res);
});
leetcodeRoutes.get('/userPublicProfile/:username', async (req, res) => {
    await fetchFromGraphql(queries_1.USER_PUBLIC_PROFILE, 'userPublicProfile', req, res);
});
leetcodeRoutes.get('/recentAcSubmissions/:username', async (req, res) => {
    await fetchFromGraphql(queries_1.RECENT_SUBMISSIONS, 'recentAcSubmissions', req, res);
});
leetcodeRoutes.get('/userProfileCalendar/:username', async (req, res) => {
    await fetchFromGraphql(queries_1.USER_PROFILE_CALENDAR, 'userProfileCalendar', req, res);
});
const fetchFromGraphql = async (query, operationName, req, res) => {
    const apiUrl = 'https://leetcode.com/graphql';
    const payload = {
        operationName,
        query,
        variables: { username: req.params['username'], ...req.query },
    };
    try {
        const response = await fetch(apiUrl, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) {
            console.error(response.status, response.statusText);
            res.status(response.status).json({ error: 'Failed to fetch from LeetCode API' });
            return;
        }
        const data = await response.json();
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
};
exports.default = leetcodeRoutes;

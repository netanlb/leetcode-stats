import express from 'express';
import { RECENT_SUBMISSIONS, SKILL_STATS, USER_PROFILE_CALENDAR, USER_PUBLIC_PROFILE, USER_SESSION_PROGRESS } from '../queries';

const leetcodeRoutes = express.Router();

leetcodeRoutes.get('/userSessionProgress/:username', async (req, res) => {
  await fetchFromGraphql(USER_SESSION_PROGRESS, 'userSessionProgress', req, res);
})

leetcodeRoutes.get('/skillStats/:username', async (req, res) => {
  await fetchFromGraphql(SKILL_STATS, 'skillStats', req, res);
})

leetcodeRoutes.get('/userPublicProfile/:username', async (req, res) => {
  await fetchFromGraphql(USER_PUBLIC_PROFILE, 'userPublicProfile', req, res);
});

leetcodeRoutes.get('/recentAcSubmissions/:username', async (req, res) => {
  await fetchFromGraphql(RECENT_SUBMISSIONS, 'recentAcSubmissions', req, res);
})

leetcodeRoutes.get('/userProfileCalendar/:username', async (req, res) => {
  await fetchFromGraphql(USER_PROFILE_CALENDAR, 'userProfileCalendar', req, res);
})

const fetchFromGraphql = async (query: string, operationName: string, req: express.Request, res: express.Response) => {
  const apiUrl = 'https://leetcode.com/graphql';
  const payload = {
    operationName,
    query,
    variables: { username: req.params['username'], ...req.query },
  }

  try {
    const response = await fetch(apiUrl, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })

    if (!response.ok) {
      console.error(response.status, response.statusText);
      res.status(response.status).json({ error: 'Failed to fetch from LeetCode API' });
      return;
    }


    const data = await response.json();

    if (operationName === 'recentAcSubmissions') {
      data.data ? res.status(200).json(data.data.recentAcSubmissionList) : res.status(404).json({ error: 'Could not retrieve recent submission list' })
      return;
    }

    const { matchedUser } = data.data;

    if (!matchedUser) {
      console.warn('User not found in graphQL request');
      res.status(404).json({ error: 'User not found!' });
      return;
    }

    res.status(200).json(matchedUser);

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }

}

export default leetcodeRoutes;

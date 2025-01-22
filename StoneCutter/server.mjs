import express from 'express';
import { Octokit } from '@octokit/rest';
import cors from 'cors'; 

// Initialize the Express app
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow only specific HTTP methods
  credentials: true, // Allow cookies and credentials
}));

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * Push content to a Git repository.
 */
app.post('/push-to-git', async (req, res) => {
  const { repoUrl, branch, commitMessage, content, token } = req.body;
  const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');

  try {
    // Authenticate with the GitHub token
    const octokit = new Octokit({ auth: token });

    // Fetch the current content of blog.md
    const fileResponse = await octokit.repos.getContent({
      owner,
      repo,
      path: 'blog.md',
      ref: branch,
    });

    // Update the file content
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'blog.md',
      message: commitMessage,
      content: Buffer.from(content).toString('base64'),
      sha: fileResponse.data.sha,
      branch,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to push file content:', error);
    res.status(500).json({ error: 'Failed to push file content' });
  }
});

/**
 * Fetch the content of a file from a Git repository.
 */
app.post('/fetch-file', async (req, res) => {
  const { repoUrl, branch, token } = req.body;
  const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');

  try {
    // Authenticate with the GitHub token
    const octokit = new Octokit({ auth: token });

    // Fetch the content of blog.md
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: 'blog.md',
      ref: branch,
    });

    // Decode the content from base64
    const fileContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
    res.json({ content: fileContent });
  } catch (error) {
    console.error('Failed to fetch file content:', error);
    res.status(500).json({ error: 'Failed to fetch file content' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
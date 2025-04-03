export const defaultHTML = `<!DOCTYPE html>
<html>
  <head>
    <title>My app</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8">
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        height: 100dvh;
        font-family: "Arial", sans-serif;
        text-align: center;
        background: #fafafa;
      }
      .arrow {
        position: absolute;
        bottom: 32px;
        left: 0px;
        width: 100px;
        transform: rotate(30deg);
        animation: float 3s ease-in-out infinite;
      }
      h1 {
        font-size: 50px;
        background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      h1 span {
        color: #acacac;
        font-size: 32px;
      }
      @keyframes float {
        0% { transform: rotate(30deg) translateY(0px); }
        50% { transform: rotate(30deg) translateY(-10px); }
        100% { transform: rotate(30deg) translateY(0px); }
      }
    </style>
  </head>
  <body>
    <h1>
      <span>I'm ready to work,</span><br />
      Ask me anything.
    </h1>
    <img src="https://enzostvs-deepsite.hf.space/arrow.svg" class="arrow" />
  </body>
</html>`;

export const editorOptions = {
  fontSize: 14,
  minimap: { enabled: true },
  fontFamily: "'Source Code Pro', monospace",
  fontLigatures: true,
  formatOnPaste: true,
  formatOnType: true,
  tabSize: 2,
  wordWrap: 'on',
  theme: 'vs-dark',
  automaticLayout: true,
};

export const editorThemes = {
  dark: 'vs-dark',
  light: 'vs-light',
  hc: 'hc-black'
};

export const editorLanguages = [
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' }
];

export const deployOptions = [
  {
    name: 'Vercel',
    icon: '/vercel.svg',
    url: 'https://vercel.com/new'
  },
  {
    name: 'Netlify', 
    icon: '/netlify.svg',
    url: 'https://app.netlify.com/start'
  },
  {
    name: 'GitHub Pages',
    icon: '/github.svg', 
    url: 'https://github.com/new'
  }
];

export const deploymentConfig = {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    redirectUri: process.env.CALLBACK_URL,
    scope: 'repo user',
  },
  vercel: {
    deployHook: 'https://api.vercel.com/v1/integrations/deploy/',
    teamId: process.env.VERCEL_TEAM_ID,
  },
  netlify: {
    apiEndpoint: 'https://api.netlify.com/api/v1',
    siteId: process.env.NETLIFY_SITE_ID,
  },
  features: {
    autoSave: true,
    livePreview: true,
    formatOnSave: true,
    gitIntegration: true
  },
  deployment: {
    automaticDeploy: false,
    branch: 'main',
    buildCommand: 'npm run build'
  }
};

export const deployProviders = [
  {
    id: 'vercel',
    name: 'Vercel',
    icon: '/vercel.svg',
    description: 'Deploy to Vercel for the fastest static hosting',
  },
  {
    id: 'netlify',
    name: 'Netlify',
    icon: '/netlify.svg', 
    description: 'Deploy to Netlify with continuous deployment',
  },
  {
    id: 'github',
    name: 'GitHub Pages',
    icon: '/github.svg',
    description: 'Host directly from your GitHub repository',
  }
];

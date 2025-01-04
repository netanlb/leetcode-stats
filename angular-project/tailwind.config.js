/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        bgDark: 'var(--bg-dark)',
        fgDark: 'var(--fg-dark)',
        textDark: 'var(--text-dark)',
        textMutedDark: 'var(--text-muted-dark)',
        bgLight: 'var(--bg-light)',
        fgLight: 'var(--fg-light)',
        textLight: 'var(--text-light)',
        textMutedLight: 'var(--text-muted-light)'
      },
      fontFamily: { jetBrains: 'JetBrains Mono' }
    },
  },
  plugins: [],
}

// --primary: #0079fe;
//
// --bg-dark: #141c2f;
// --fg-dark: #1f2a48;
// --text-normal: #ffffff;
// --text-muted: #8f93a4;
//
// --bg-light: #f6f8fa;
// --fg-light: #ffffff;
// --text-normal: #24292e;
// --text-muted: #737a82;

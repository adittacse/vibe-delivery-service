module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // custom brand color if needed in styles
        'brand-teal': '#0fb5ae'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        vibe: {
          primary: '#0ea5a4',
          secondary: '#7c3aed',
          accent: '#f59e0b',
          neutral: '#111827',
          'base-100': '#f8fafc',
          info: '#0284c7',
          success: '#16a34a',
          warning: '#f97316',
          error: '#ef4444'
        }
      },
      {
        'vibe-dark': {
          primary: '#06b6d4',
          secondary: '#a78bfa',
          accent: '#fbbf24',
          neutral: '#0f172a',
          'base-100': '#0b1220',
          info: '#0891b2',
          success: '#22c55e',
          warning: '#fb923c',
          error: '#ef4444'
        }
      }
    ]
  }
}

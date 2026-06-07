import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Supercell API',
  description: 'TypeScript client for Clash of Clans, Clash Royale & Brawl Stars APIs',
  base: '/supercell-api/',
  lang: 'en-US',
  lastUpdated: true,

  themeConfig: {
    logo: '⚡',
    nav: [
      { text: 'Website', link: 'https://darkpix.ru' },
      { text: 'GitHub', link: 'https://github.com/DARKPIX404/supercell-api' },
      { text: 'Discord', link: 'https://discord.gg/dYkUJQaU6y' },
      { text: 'npm', link: 'https://www.npmjs.com/package/@vladnet14/supercell-api' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Interceptors', link: '/interceptors' },
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Clash of Clans', link: '/api/clash-of-clans' },
          { text: 'Clash Royale', link: '/api/clash-royale' },
          { text: 'Brawl Stars', link: '/api/brawl-stars' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DARKPIX404/supercell-api' },
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: '© 2025 DARKPIX404',
    },
    search: {
      provider: 'local'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})

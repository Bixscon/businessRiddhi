import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ], theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        degular: ["var(--font-degular)"],
        geist: ["var(--font-geist)"],
        geistMono: ["var(--font-geistMono)"],
        gothic: ["var(--font-gothic)"]
      },
      fontSize: {
        display1: '9rem',
        display2: '6rem',
        display3: '4rem',
        heading1: '3.5rem',
        heading2: '3rem',
        heading3: '2.5rem',
        heading4: '2rem',
        hero: '1.75rem',
        feature: '1.5rem',
        highlight: '1.125rem',
        content: '1rem',
        caption: '0.875rem',
        footnote: '0.75rem',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        linkBlue: '#005CC0',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          '100': '#F8DEE6',
          '200': '#F1BDCE',
          '300': '#EA9CB5',
          '400': '#E27C9D',
          '500': '#DB5B84',
          '600': '#D43A6C',
          '700': '#A1234C',
          '800': '#851D3F',
          '900': '#691731',
          '1000': '#4D1124',
          DEFAULT: '#D43A63',
          landing: '#E70763',
          'landing-light': '#EA1B70',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          '100': '#F8DEE6',
          '200': '#F8DEE6',
          '300': '#EA9CB5',
          '400': '#E27C9D',
          '500': '#DB5B84',
          '600': '#D43A6C',
          '700': '#A1234C',
          '800': '#851D3F',
          '900': '#691731',
          '1000': '#4D1124',
          DEFAULT: '#F8DEE6',
          landing: '#F31D75',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        neutrals: {
          '100': '#F3F3F3',
          '200': '#D3D3D3',
          '300': '#BFBFBF',
          '400': '#ACACAC',
          '500': '#989898',
          '600': '#858585',
          '700': '#717171',
          '800': '#5E5E5E',
          '900': '#4a4a4a',
          '1000': '#373737',
        },
        success: {
          '100': '#AAF2BC',
          '200': '#54E478',
          '300': '#148330',
          landing: '#BFFF72',
        },
        warning: {
          '100': '#F9E8C9',
          '200': '#F3D094',
          '300': '#CE8C17',
        },
        error: {
          '100': '#F5BCBC',
          '200': '#EC7979',
          '300': '#AB1919',
        },
        'base-white': '#FAFAFA',
        'base-black': '#232323',
        'base-success': '#1DB944',
        'base-warning': '#EDB95E',
        'base-error': '#B00020',
        'base-primary': '#D43A63',
        'base-secondary': '#F8DEE6',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      }, extendedKeyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      extendedAnimation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;

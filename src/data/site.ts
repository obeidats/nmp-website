/**
 * Language-independent company facts. Anything that must be identical in
 * English and Arabic (numbers, contact details, registration) lives here.
 * Translatable copy lives in src/i18n/en.ts and src/i18n/ar.ts.
 */

export type PortfolioId = 'civil' | 'electrical' | 'telecom' | 'utilities' | 'water';

/**
 * The five infrastructure & construction disciplines. The order here is the order of
 * `services.infrastructure.categories`, `projects.explorer.disciplines` and
 * `home.capabilities.items` in the content files, and it is also the tab order.
 */
export const projectIds = ['roads', 'water', 'networks', 'electrical', 'buildings'] as const;
export type ProjectId = (typeof projectIds)[number];

export interface PortfolioRow {
  id: PortfolioId;
  projects: number;
  completed: number;
  ongoing: number;
  /** Total value in Omani rial */
  valueOMR: number;
}

const portfolioRows: PortfolioRow[] = [
  { id: 'civil', projects: 3, completed: 1, ongoing: 2, valueOMR: 2_026_097 },
  { id: 'electrical', projects: 11, completed: 7, ongoing: 4, valueOMR: 4_572_365 },
  { id: 'telecom', projects: 5, completed: 1, ongoing: 4, valueOMR: 2_135_000 },
  { id: 'utilities', projects: 3, completed: 1, ongoing: 2, valueOMR: 2_027_505 },
  { id: 'water', projects: 1, completed: 1, ongoing: 0, valueOMR: 510_257 },
];

const sum = (key: 'projects' | 'completed' | 'ongoing' | 'valueOMR') =>
  portfolioRows.reduce((total, row) => total + row[key], 0);

export const site = {
  url: 'https://nmproject-oman.com',
  domain: 'nmproject-oman.com',
  email: 'info@nmproject-oman.com',
  /** E.164 – used for tel: links and structured data */
  phone: '+96897280155',
  /** Human-readable, always rendered left-to-right */
  phoneDisplay: '+968 9728 0155',
  /** WhatsApp number (digits only, as required by wa.me) – same as the main phone */
  whatsapp: '96897280155',
  commercialRegistration: '1214998',
  established: 2015,
  poBox: '767',
  postalCode: '123',
  portfolio: {
    rows: portfolioRows,
    totals: {
      projects: sum('projects'),
      completed: sum('completed'),
      ongoing: sum('ongoing'),
      valueOMR: sum('valueOMR'),
    },
  },
  /** Contact form delivery – configured through environment variables (see .env.example) */
  form: {
    endpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
    accessKey: import.meta.env.PUBLIC_FORM_ACCESS_KEY ?? '',
  },
} as const;

/** 11,271,224 -> "11.27M" */
export const compactMillions = (value: number) => `${(value / 1_000_000).toFixed(2)}M`;

export const formatNumber = (value: number) => value.toLocaleString('en-US');

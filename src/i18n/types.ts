import type { IconName } from '../components/icons';
import type { PortfolioId } from '../data/site';

/** A titled entry, optionally with an icon and a description. */
export interface Item {
  icon?: IconName;
  title: string;
  text?: string;
}

export interface SectionIntro {
  kicker?: string;
  title: string;
  text?: string;
}

/**
 * Every visible string on the site. `en.ts` and `ar.ts` must both satisfy this
 * interface, so a missing translation is a compile error rather than a blank.
 */
export interface Content {
  meta: {
    siteName: string;
    shortName: string;
    tagline: string;
    description: string;
    /** Used in the browser tab: "<page> | <titleSuffix>" */
    titleSuffix: string;
  };
  nav: { home: string; services: string; projects: string; about: string; contact: string };
  ui: {
    exploreProjects: string;
    viewProjectDetails: string;
    comingSoon: string;
    lightbox: { open: string; close: string; prev: string; next: string };
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    /** Label of the link that switches to the *other* language */
    switchLanguageLabel: string;
    switchLanguageAria: string;
    exploreServices: string;
    contactUs: string;
    learnMore: string;
    aboutUs: string;
    quickLinks: string;
    rights: string;
    crLabel: string;
    establishedLabel: string;
    phoneLabel: string;
    emailLabel: string;
    locationLabel: string;
    whatsappLabel: string;
    chatOnWhatsapp: string;
    whatsappFloating: string;
    address: string;
    poBoxLine: string;
    footerBlurb: string;
  };
  home: {
    seoTitle: string;
    hero: {
      eyebrow: string;
      titleLead: string;
      titleAccent: string;
      text: string;
      subtitle: string;
      tagline: string;
    };
    stats: {
      established: string;
      projects: string;
      ongoing: string;
      value: string;
      /** Appended to the animated 11.27 figure, e.g. "M" or " مليون" */
      millionSuffix: string;
    };
    intro: SectionIntro & { highlight: string };
    /** The three service pillars shown next to the intro */
    services: { items: Item[] };
    /** Five entries, in `projectIds` order; each links to its discipline on the Projects page */
    capabilities: SectionIntro & { items: Item[] };
    /** Photo band that leads into the Projects page */
    projectsBand: SectionIntro;
    approach: { title: string; steps: Item[] };
    region: SectionIntro & { tagline: string; items: Item[] };
    cta: { title: string; text: string };
  };
  services: {
    seoTitle: string;
    header: { title: string; text: string };
    pillars: (Item & { points: string[] })[];
    deliveryModel: SectionIntro & { direct: Item; coordinated: Item };
    /** Five categories, in `projectIds` order */
    infrastructure: SectionIntro & { categories: (Item & { tab: string; items: string[] })[] };
    strengths: SectionIntro & { items: Item[] };
    lifecycle: SectionIntro & { steps: string[] };
    sectors: SectionIntro & { items: Item[] };
    regional: SectionIntro & { items: Item[] };
  };
  projects: {
    seoTitle: string;
    header: { title: string; text: string };
    portfolio: SectionIntro & {
      stats: { projects: string; completed: string; ongoing: string; value: string };
      filters: { all: string; completed: string; ongoing: string };
      valueLabel: string;
      note: string;
    };
    explorer: SectionIntro & {
      tabsLabel: string;
      galleryTitle: string;
      galleryNote: string;
      scopeTitle: string;
      methodTitle: string;
      qualityTitle: string;
      discuss: string;
      /**
       * Five entries in `projectIds` order. Title, icon and scope list come from the matching
       * entry in `services.infrastructure.categories`; `gallery` captions match `gallery[id]`.
       */
      disciplines: {
        summary: string;
        detail: string;
        method: Item[];
        quality: string[];
        gallery: string[];
      }[];
    };
    framework: SectionIntro & { stages: (Item & { points: string[] })[] };
    assurance: SectionIntro & { items: Item[]; link: string };
  };
  about: {
    seoTitle: string;
    header: { title: string; text: string };
    anchors: {
      overview: string;
      vision: string;
      values: string;
      team: string;
      portfolio: string;
      safety: string;
    };
    team: SectionIntro & { badge: string; note: string };
    overview: SectionIntro & {
      facts: {
        fullName: string;
        shortName: string;
        emailAddress: string;
        registration: string;
        established: string;
        location: string;
        poBox: string;
      };
    };
    vision: SectionIntro & { badges: string[] };
    mission: SectionIntro & { pillars: string[] };
    values: SectionIntro & { items: Item[] };
    strength: { title: string; items: Item[] };
    portfolio: SectionIntro & {
      headers: {
        sector: string;
        projects: string;
        completed: string;
        ongoing: string;
        value: string;
        total: string;
      };
      sectors: Record<PortfolioId, string>;
      note: string;
    };
    ohs: SectionIntro & {
      points: string[];
      closing: string;
      pillars: Item[];
    };
    partnerships: SectionIntro & { items: Item[] };
  };
  contact: {
    seoTitle: string;
    header: { title: string; text: string };
    detailsTitle: string;
    whatsapp: { title: string; text: string; prefill: string };
    form: {
      title: string;
      name: string;
      company: string;
      email: string;
      phone: string;
      topic: string;
      topicOptions: string[];
      message: string;
      optional: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      mailtoNote: string;
      mailSubject: string;
    };
  };
}

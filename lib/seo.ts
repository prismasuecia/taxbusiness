import {hrefFor, locales, type Locale, type PageKey} from './navigation';

export const siteUrl = 'https://taxbusiness.se';

export const pageSeo: Record<Locale, Record<PageKey, {title: string; description: string; keywords: string[]}>> = {
  sv: {
    home: {
      title: 'Tax Business Stockholm AB | Redovisningsbyrå i Solna på svenska och spanska',
      description:
        'Redovisningsbyrå i Solna för små och medelstora företag. Hjälp med bokföring, moms, deklaration, bokslut, årsredovisning, löner och Skatteverket på svenska och spanska.',
      keywords: [
        'redovisningsbyrå Solna',
        'redovisningsbyrå Stockholm',
        'bokföring på spanska',
        'redovisning på spanska',
        'bokföring och moms',
        'hjälp med Skatteverket'
      ]
    },
    services: {
      title: 'Bokföring, moms och deklaration i Solna | Tax Business Stockholm AB',
      description:
        'Tjänster för företagare: löpande bokföring, momsredovisning, deklaration, bokslut, årsredovisning, löner, fakturering och kontakt med Skatteverket.',
      keywords: ['bokföring Solna', 'momsredovisning Stockholm', 'deklaration företag', 'bokslut årsredovisning', 'lönehantering företag']
    },
    startCompany: {
      title: 'Starta företag i Sverige på svenska och spanska | Tax Business Stockholm AB',
      description:
        'Hjälp att starta företag i Sverige med företagsform, registrering, F-skatt, moms, fakturering, bokföring och kontakt med Skatteverket.',
      keywords: ['starta företag i Sverige', 'starta företag Stockholm', 'F-skatt moms', 'registrera företag', 'starta aktiebolag enskild firma']
    },
    about: {
      title: 'Om Tax Business Stockholm AB | Redovisningsbyrå i Solna',
      description:
        'Tax Business Stockholm AB är en personlig redovisningsbyrå i Solna som hjälper företagare med bokföring, moms, deklarationer och administration.',
      keywords: ['Tax Business Stockholm AB', 'Ana Maria Alvarez', 'redovisningsekonom Solna', 'redovisningsbyrå Solna']
    },
    contact: {
      title: 'Kontakta Tax Business Stockholm AB | Redovisningsbyrå Solna',
      description:
        'Kontakta Tax Business Stockholm AB för frågor om bokföring, moms, deklaration, företagsstart, löner, bokslut eller brev från Skatteverket.',
      keywords: ['kontakta redovisningsbyrå Solna', 'bokföring hjälp Stockholm', 'redovisningsbyrå spanska Stockholm']
    },
    privacy: {
      title: 'Integritet | Tax Business Stockholm AB',
      description: 'Så hanterar Tax Business Stockholm AB kontaktuppgifter som skickas via webbplatsens formulär.',
      keywords: ['integritet Tax Business Stockholm AB']
    },
    portal: {
      title: 'Kundinlogg | Tax Business Stockholm AB',
      description: 'Kundportal för uppladdning av bokföringsunderlag, kvitton och dokument till Tax Business Stockholm AB.',
      keywords: ['kundportal Tax Business Stockholm AB', 'ladda upp kvitton', 'bokföringsunderlag']
    }
  },
  es: {
    home: {
      title: 'Tax Business Stockholm AB | Contabilidad en Suecia en español y sueco',
      description:
        'Oficina contable en Solna para empresas en Suecia. Ayuda con contabilidad, IVA, declaraciones, cierre anual, nóminas y Skatteverket en español, sueco e inglés.',
      keywords: ['contabilidad en Suecia', 'contabilidad en español Suecia', 'contable en Estocolmo', 'IVA Suecia', 'Skatteverket español']
    },
    services: {
      title: 'Servicios contables en Suecia | Tax Business Stockholm AB',
      description:
        'Servicios de contabilidad, IVA, declaraciones, cierre anual, nóminas, facturación y contacto con Skatteverket para empresas en Suecia.',
      keywords: ['servicios contables Suecia', 'declaraciones Suecia', 'IVA Suecia', 'nóminas Suecia']
    },
    startCompany: {
      title: 'Crear empresa en Suecia | Ayuda en español y sueco',
      description: 'Ayuda para crear empresa en Suecia: registro, F-skatt, IVA, facturación, contabilidad y contacto con Skatteverket.',
      keywords: ['crear empresa en Suecia', 'abrir empresa Suecia', 'F-skatt IVA', 'empresa en Suecia español']
    },
    about: {
      title: 'Sobre Tax Business Stockholm AB | Oficina contable en Solna',
      description: 'Tax Business Stockholm AB ayuda a pequeñas y medianas empresas en Solna y Estocolmo con contabilidad y administración.',
      keywords: ['Tax Business Stockholm AB', 'Ana Maria Alvarez', 'oficina contable Solna']
    },
    contact: {
      title: 'Contacto | Tax Business Stockholm AB',
      description: 'Contacte con Tax Business Stockholm AB para consultas sobre contabilidad, IVA, declaraciones, nóminas o Skatteverket.',
      keywords: ['contacto contabilidad Suecia', 'contable español Estocolmo']
    },
    privacy: {
      title: 'Privacidad | Tax Business Stockholm AB',
      description: 'Información sobre cómo Tax Business Stockholm AB usa los datos enviados a través del formulario de contacto.',
      keywords: ['privacidad Tax Business Stockholm AB']
    },
    portal: {
      title: 'Acceso clientes | Tax Business Stockholm AB',
      description: 'Portal de clientes para subir documentos contables, recibos y archivos a Tax Business Stockholm AB.',
      keywords: ['portal clientes Tax Business Stockholm AB', 'subir recibos', 'documentos contables']
    }
  },
  en: {
    home: {
      title: 'Tax Business Stockholm AB | Accounting services in Sweden',
      description:
        'Accounting office in Solna helping small and medium-sized businesses with bookkeeping, VAT, tax returns, annual accounts, payroll and Skatteverket communication.',
      keywords: ['accounting services Sweden', 'accountant Solna', 'bookkeeping Stockholm', 'VAT Sweden', 'Skatteverket help']
    },
    services: {
      title: 'Bookkeeping, VAT and tax returns in Sweden | Tax Business Stockholm AB',
      description:
        'Bookkeeping, VAT reporting, annual accounts, annual reports, tax returns, payroll, invoicing and Skatteverket support for businesses in Sweden.',
      keywords: ['bookkeeping Sweden', 'VAT reporting Sweden', 'tax returns Sweden', 'annual accounts Sweden']
    },
    startCompany: {
      title: 'Start a company in Sweden | Tax Business Stockholm AB',
      description: 'Support with company registration in Sweden, F-tax, VAT, invoicing, bookkeeping routines and communication with Skatteverket.',
      keywords: ['start a company in Sweden', 'company registration Sweden', 'F-tax VAT', 'business support Sweden']
    },
    about: {
      title: 'About Tax Business Stockholm AB | Accounting office in Solna',
      description: 'Tax Business Stockholm AB is an accounting office in Solna helping businesses with bookkeeping, VAT, tax returns and administration.',
      keywords: ['Tax Business Stockholm AB', 'Ana Maria Alvarez', 'accounting office Solna']
    },
    contact: {
      title: 'Contact Tax Business Stockholm AB | Accounting office Solna',
      description: 'Contact Tax Business Stockholm AB about bookkeeping, VAT, tax returns, company registration, payroll or Skatteverket questions.',
      keywords: ['contact accountant Solna', 'bookkeeping help Sweden', 'accounting Spanish Sweden']
    },
    privacy: {
      title: 'Privacy | Tax Business Stockholm AB',
      description: 'How Tax Business Stockholm AB handles contact details submitted through the website form.',
      keywords: ['privacy Tax Business Stockholm AB']
    },
    portal: {
      title: 'Client login | Tax Business Stockholm AB',
      description: 'Client portal for uploading accounting documents, receipts and files to Tax Business Stockholm AB.',
      keywords: ['Tax Business Stockholm AB client portal', 'upload receipts', 'accounting documents']
    }
  }
};

export function absoluteUrl(path: string) {
  return new URL(path.endsWith('/') ? path : `${path}/`, siteUrl).toString();
}

export function languageAlternates(page: PageKey) {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(hrefFor(locale, page))])),
    'x-default': absoluteUrl(hrefFor('sv', page))
  };
}

export function businessJsonLd(locale: Locale) {
  const data = pageSeo[locale].home;

  return {
    '@context': 'https://schema.org',
    '@type': ['AccountingService', 'LocalBusiness'],
    '@id': `${siteUrl}/#business`,
    name: 'Tax Business Stockholm AB',
    legalName: 'Tax Business Stockholm AB',
    url: siteUrl,
    logo: `${siteUrl}/brand/tax-business-mark.jpg`,
    image: `${siteUrl}/images/ana-maria-alvarez.jpg`,
    email: 'info@taxbusiness.se',
    identifier: {
      '@type': 'PropertyValue',
      name: 'Organisationsnummer',
      value: '559252-6726'
    },
    founder: {
      '@type': 'Person',
      name: 'Ana Maria Alvarez',
      jobTitle: locale === 'es' ? 'Economista contable' : locale === 'en' ? 'Accounting economist' : 'Redovisningsekonom'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Solna',
      addressRegion: 'Stockholm',
      addressCountry: 'SE'
    },
    areaServed: [
      {'@type': 'City', name: 'Solna'},
      {'@type': 'City', name: 'Stockholm'},
      {'@type': 'Country', name: 'Sweden'}
    ],
    knowsLanguage: ['sv', 'es', 'en'],
    description: data.description,
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'es' ? 'Servicios contables' : locale === 'en' ? 'Accounting services' : 'Redovisningstjänster',
      itemListElement: [
        'Bokföring och moms',
        'Deklaration och bokslut',
        'Årsredovisning',
        'Löner',
        'Företagsstart',
        'Kontakt med Skatteverket'
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name
        }
      }))
    }
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Tax Business Stockholm AB',
    url: siteUrl,
    inLanguage: locale,
    publisher: {'@id': `${siteUrl}/#business`}
  };
}

export function breadcrumbJsonLd(locale: Locale, page: PageKey, label: string) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: locale === 'es' ? 'Inicio' : locale === 'en' ? 'Home' : 'Hem',
      item: absoluteUrl(hrefFor(locale, 'home'))
    }
  ];

  if (page !== 'home') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: label,
      item: absoluteUrl(hrefFor(locale, page))
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

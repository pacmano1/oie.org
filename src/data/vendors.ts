export interface Vendor {
  name: string;
  url: string;
  logo: string;
  tagline: string;
  description: string;
  regions: string;
  languages: string;
}

export const vendors: Vendor[] = [
  {
    name: 'BrightCodeCompany',
    url: 'https://brightcodecompany.com/',
    logo: '/images/vendors/brightcode.png',
    tagline:
      "Plugin development and custom integrations with deep expertise in OIE's internals.",
    description:
      "BrightCodeCompany excels in Mirth Connect/OIE plugin development, offering specialized solutions for custom integrations. Our expertise in Open Integration Engine's internals ensures a seamless and efficient integration process, making us your reliable partner for tailored and high-quality solutions.",
    regions: 'HQ in Estonia, operates globally',
    languages: 'English, Estonian',
  },
  {
    name: 'Technicise',
    url: 'https://technicise.com/',
    logo: '/images/vendors/technicise.png',
    tagline:
      'Healthcare technology specialists in interoperability standards, EHR/EMR integration, and cloud-based enterprise software.',
    description:
      'Technicise Software & Technologies Pvt Ltd is a Healthcare Technology company specialized in Healthcare Platform development, Healthcare Data Interoperability standards implementation, EHR & EMR integration along with cloud-based enterprise software development & integration.',
    regions: 'HQ in India, offices in Germany and USA. Operates globally',
    languages: 'English, German, French, Hindi, Bengali',
  },
  {
    name: 'Diridium Technologies',
    url: 'https://diridium.com',
    logo: '/images/vendors/diridium.png',
    tagline:
      'Implementation and support for Mirth Connect, OIE, and BridgeLink on AWS, Azure, or on-premises.',
    description:
      'Diridium Technologies provides support and implementation of Mirth Connect, Open Integration Engine and BridgeLink. We specialize in using your infrastructure whether that be AWS, Azure or on-premises.',
    regions: 'HQ in USA. Global subject to language constraints',
    languages: 'English',
  },
  {
    name: 'NovaMap Health',
    url: 'https://www.novamap.health/',
    logo: '/images/sponsors/novamap.svg',
    tagline:
      'Tackling the hardest healthcare interoperability challenges with reusable, standards-based components.',
    description:
      "NovaMap Health's mission is to simplify healthcare integration. Our tools tackle some of the most complex integration challenges. Poor integration of healthcare IT systems blights lives through poorer health outcomes. The best way forward to improve healthcare integration rests with reusable, standards-based components.",
    regions: 'HQ in England, operates globally',
    languages: 'English',
  },
  {
    name: 'Meditecs',
    url: 'https://www.meditecs.com/',
    logo: '/images/vendors/meditecs.webp',
    tagline:
      'Spain-based interoperability leader processing 100M+ patient records monthly. Makers of Meditecs Smart Connect, an OIE-compatible integration engine.',
    description:
      "Meditecs, a Spain-based leader in healthcare interoperability solutions since 2009, processes over 100 million patient records per month and provides services to leading healthcare institutions and technology providers across Europe, the UK, the US, and Asia. Flagship products include Meditecs Smart Connect (advanced integration engine 100% compatible with Mirth Connect/OIE), DICOMPath, and ASTM Extension. Organizations like Abbott, NHS, and Quirón trust Meditecs to integrate medical technologies securely, efficiently, and in compliance with HL7, FHIR, and DICOM. ISO and ENS (High Level) certified.",
    regions: 'HQ in Spain, operates globally',
    languages: 'English, Spanish',
  },
  {
    name: 'David Labs',
    url: 'https://www.davidlabs.ca/',
    logo: '/images/vendors/davidlabs.png',
    tagline:
      'Canadian consultancy with an extensive pool of Mirth/BridgeLink/OIE consultants and trainers. Free initial consultation.',
    description:
      'David Labs is a Delaware LLC headquartered in Canada with an extensive pool of Mirth Connect, BridgeLink, and OIE consultants and trainers available at lower cost. Our consulting vertical offers a free initial consultation call. We also operate a products vertical delivered in parallel.',
    regions: 'HQ in Canada, operates in North America, India, and Dubai',
    languages: 'English',
  },
  {
    name: 'Taction Software',
    url: 'https://www.tactionsoft.com/',
    logo: '/images/vendors/taction.webp',
    tagline:
      '20+ years of healthcare IT expertise delivering HIPAA-compliant integrations across HL7, FHIR, and XDS.',
    description:
      'Taction Software brings 20+ years of healthcare IT expertise to Open Integration Engine and Mirth Connect projects. We specialize in custom interface development, EHR/EMR integrations, secure data exchange, and HIPAA-compliant workflows. Deep understanding of HL7, FHIR, and XDS ensures reliable, audit-ready integration solutions for hospitals, clinics, and healthtech startups. From legacy engine migration to plugin development and long-term managed support, Taction is your trusted partner for scalable and future-proof integration projects.',
    regions: 'HQ in USA, clients across North America, Europe, and Asia',
    languages: 'English',
  },
  {
    name: 'Converge Health',
    url: 'http://www.convergehealth.com.au/',
    logo: '/images/vendors/converge.png',
    tagline:
      'Australian specialist in digital health and integration engine services across Mirth Connect, OIE, Rhapsody, and IRIS for Health.',
    description:
      'Converge Health delivers specialised digital health and integration engine services, with proven experience in platforms such as Mirth Connect, Open Integration Engine, Rhapsody, and InterSystems IRIS for Health. Headquartered in Australia, we serve clients across Asia-Pacific, Europe, the Middle East, and the United Kingdom. As a trusted partner for seamless interoperability, engine migration, and interface development, we help healthcare organisations connect systems, streamline workflows, and enhance patient outcomes.',
    regions: 'HQ in Australia, operates across APAC, Europe, Middle East, UK',
    languages: 'English, Filipino, Hindi',
  },
];

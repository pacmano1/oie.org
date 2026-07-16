export interface Plugin {
  name: string;
  screenshot: string;
  description: string;
  repo: string;
  imgPosition?: string;
}

export const plugins: Plugin[] = [
  {
    name: 'TLS Manager',
    screenshot: '/images/plugins/tls-manager.webp',
    description: 'Browser-based and in-Administrator certificate management for OIE. Inspect the Java trust store, add trusted certificates, and manage local key pairs, with search, validity dates, and fingerprints.',
    repo: 'https://github.com/NovaMap-Health/tls-manager-plugin',
    imgPosition: 'top left',
  },
  {
    name: 'Cache Manager',
    screenshot: '/images/plugins/cache-manager.png',
    description: 'In-memory key-value lookups against external databases, with lazy loading, HikariCP pooling, and a dedicated admin UI and inspector.',
    repo: 'https://github.com/diridium-com/oie-cache-manager',
  },
  {
    name: 'Channel & Code Template History',
    screenshot: '/images/plugins/channel-history.jpg',
    description: 'Built-in version history for channels and code templates. Side-by-side diff viewer with word-level highlighting, right-click revert, and database-backed storage.',
    repo: 'https://github.com/diridium-com/simple-channel-history',
  },
  {
    name: 'Source Code Search',
    screenshot: '/images/plugins/source-code-search.png',
    description: 'Grep across channel scripts, code templates, global scripts, and message templates, with regex, scoping, highlighted matches, and JSON/CSV export.',
    repo: 'https://github.com/diridium-com/oie-source-code-search',
  },
  {
    name: 'Role Based Access Control',
    screenshot: '/images/plugins/rbac.png',
    description: 'Dynamic roles with per-permission grants and channel-level restrictions, replacing the engine\'s default always-allow authorization controller. Works in both the desktop Administrator and the OIE Web Administrator, with denied operations always enforced server-side.',
    repo: 'https://github.com/diridium-com/role-based-access-control',
  },
  {
    name: 'AWS SQS Source Connector',
    screenshot: '/images/plugins/sqs-source.png',
    description: 'Native AWS SQS queue polling as a source connector. Long polling with configurable wait, max messages, and visibility timeout; Default, Static, and STS authentication; SQS and FIFO metadata in the source map; and S3 event-notification handling.',
    repo: 'https://github.com/gibson9583/sqs-source-connector',
    imgPosition: 'top left',
  },
];

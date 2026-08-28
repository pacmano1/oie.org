export interface Plugin {
  name: string;
  screenshot: string;
  description: string;
  repo: string;
  imgPosition?: string;
  /** Which administrators the plugin's interface runs in. Omitted for plugins that have no UI. */
  ui?: string;
  /** Optional page on this site, for plugins that have one. */
  page?: string;
}

export const plugins: Plugin[] = [
  {
    name: 'Web Support',
    screenshot: '/images/webadmin/01-dashboard-light.png',
    description:
      'Installs the OIE web administrator into the engine\'s own web server, along with the APIs it uses for message serialization, JavaScript validation, and serving other plugins\' web interfaces. Administer OIE from any browser.',
    repo: 'https://github.com/gibson9583/oie-web-support-plugin',
    page: '/web-administrator/',
  },
  {
    name: 'Role Based Access Control',
    screenshot: '/images/plugins/rbac.png',
    description: 'Dynamic roles with per-permission grants and channel-level restrictions, replacing the engine\'s default always-allow authorization controller. Works in both the desktop Administrator and the OIE Web Administrator, with denied operations always enforced server-side.',
    repo: 'https://github.com/diridium-com/role-based-access-control',
    ui: 'Runs in both the Swing and web administrators, from one install',
  },
  {
    name: 'OIE Sentinel',
    screenshot: '/images/plugins/sentinel.png',
    description:
      'Monitoring and alerting for channel activity. Inactivity, low volume, anomaly, connection status, error rate, queue depth, and channel state monitors, scoped to a channel, group, or tag. Email, channel, SNS, and webhook delivery, with severity levels, storm control, escalation chains, and acknowledgement.',
    repo: 'https://github.com/gibson9583/oie-sentinel',
  },
  {
    name: 'Channel & Code Template History',
    screenshot: '/images/plugins/channel-history.jpg',
    description: 'Built-in version history for channels and code templates. Side-by-side diff viewer with word-level highlighting, right-click revert, and database-backed storage.',
    repo: 'https://github.com/diridium-com/simple-channel-history',
    ui: 'Runs in both the Swing and web administrators, from one install',
  },
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
    ui: 'Runs in both the Swing and web administrators, from one install',
  },
  {
    name: 'Source Code Search',
    screenshot: '/images/plugins/source-code-search.png',
    description: 'Grep across channel scripts, code templates, global scripts, and message templates, with regex, scoping, highlighted matches, and JSON/CSV export.',
    repo: 'https://github.com/diridium-com/oie-source-code-search',
    ui: 'Runs in both the Swing and web administrators, from one install',
  },
  {
    name: 'Thread Viewer',
    screenshot: '/images/plugins/thread-viewer.png',
    description:
      'Live JVM thread monitoring on the dashboard. Thread state, CPU time, and blocked and waited counts, with threads correlated back to the channel and connector running them. Deadlock detection, filtering by channel, category, or state, and jstack-compatible thread dump export.',
    repo: 'https://github.com/gibson9583/engine-thread-viewer',
    ui: 'Runs in both the Swing and web administrators, from one install',
  },
  {
    name: 'AWS SQS Source Connector',
    screenshot: '/images/plugins/sqs-source.png',
    description: 'Native AWS SQS queue polling as a source connector. Long polling with configurable wait, max messages, and visibility timeout; Default, Static, and STS authentication; SQS and FIFO metadata in the source map; and S3 event-notification handling.',
    repo: 'https://github.com/gibson9583/sqs-source-connector',
    ui: 'Runs in both the Swing and web administrators, from one install',
    imgPosition: 'top left',
  },
];

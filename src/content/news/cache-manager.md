---
title: "Cache Manager Released"
date: 2026-02-26
excerpt: "Announcing: OIE Cache Manager Plugin - Now Available from Diridium Technologieshttps://diridium.com"
---

Announcing: OIE Cache Manager Plugin - Now Available from [Diridium Technologies](https://diridium.com)

We’re excited to announce the release of **[OIE Cache Manager](https://github.com/diridium-com/oie-cache-manager)**, an open-source plugin for Open Integration Engine (OIE) that delivers fast, in-memory key-value lookups against external databases.

![Cache Manager admin UI](/images/news/cache-manager-ui.png)

![Cache Inspector](/images/news/cache-manager-inspector.png)

**What it does:** Cache Manager uses Google Guava’s LoadingCache and HikariCP connection pooling to let your channels look up data from external databases at memory speed. The first call for a given key queries the database; every subsequent call returns instantly from cache.

**Key Features:**

- **Lazy per-key loading** with automatic eviction based on configurable max size and TTL
- **HikariCP connection pooling** to prevent connection storms under load
- **Admin UI** for creating, editing, duplicating, and managing cache definitions directly in OIE Administrator
- **Cache Inspector** for monitoring hit rates, memory usage, entry counts, and browsing cached data
- **Full REST API** with OpenAPI annotations
- **Password encryption** for database credentials at rest using OIE’s built-in encryptor
- **Event logging** integrated with OIE’s event system

**Usage is simple** - define a cache in the admin UI, then call it from any channel with a single line: `$g('zip2').lookup(zip)`

Licensed under the Mozilla Public License 2.0. Full documentation, including getting started guides, REST API reference, and security considerations, is available on the project wiki.

Download it now: [github.com/diridium-com/oie-cache-manager](https://github.com/diridium-com/oie-cache-manager)

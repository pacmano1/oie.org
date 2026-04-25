---
title: "Channel and Code Template History Plugin Released"
date: 2026-02-03
excerpt: "We’re pleased to announce an open-source plugin for Open Integration Engine that brings built-in version history tracking for your Channels and Code Templates, no external Git server required.…"
---

We’re pleased to announce an open-source plugin for Open Integration Engine that brings built-in version history tracking for your Channels and Code Templates, no external Git server required. Courtesy of [Diridium Technologies Inc.](https://diridium.com)

![Channel History diff viewer](/images/plugins/channel-history.jpg)

**What it does:** Every time you save a channel or code template, this plugin automatically captures a version snapshot stored directly in your OIE database. You can compare any two versions, revert to a previous state, and even recover deleted items.

**Key Features:**

- **Automatic version tracking** on every channel and code template save
- **Decomposed component diff view** – drill into individual scripts, connectors, filter/transformer steps, and plugin properties via a navigable tree
- **Side-by-side diff viewer** with word-level inline highlighting and color-coded change indicators (added, removed, modified, unchanged)
- **Revert** to any previous version with a right-click
- **Prune** older versions to manage storage
- **Deleted items tracking** – automatically saves a final XML snapshot when channels or code templates are removed
- **Database-backed storage** – history travels with your database backups, no separate version control infrastructure needed

**Supported Databases:** PostgreSQL, MySQL, Oracle, SQL Server, and Derby

**Requirements:** OIE 4.5.2+ and Java 17+

Link: <https://github.com/diridium-com/simple-channel-history>

Based on the original git-ext plugin by Kiran Ayyagari, licensed under the Mozilla Public License 2.0.

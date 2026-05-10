---
title: "OIE 4.6.0-rc1 Available for Testing"
date: 2026-05-10
excerpt: "The 4.6.0 release candidate is out. We're inviting the community to download it, exercise it against real workloads, and help shake out anything that needs fixing before the GA release."
---

The 4.6.0 release candidate is now available. We expect to keep the RC out for a short window so the community can review, test, and validate it. Critical regressions found during this period will be fixed before the GA cut.

[Download v4.6.0-rc1 from GitHub](https://github.com/OpenIntegrationEngine/engine/releases/tag/v4.6.0-rc1)

## Welcome to our new contributors

A sincere thank you to the people who landed their first contribution in this release. Open source works because people show up and do the work.

**Engine first-time contributors:**

- [@NicoPiel](https://github.com/OpenIntegrationEngine/engine/pull/208)
- [@mhokanson](https://github.com/OpenIntegrationEngine/engine/pull/178)
- [@VillePekka](https://github.com/OpenIntegrationEngine/engine/pull/242)
- [@kryskool](https://github.com/OpenIntegrationEngine/engine/pull/259)
- [@tibisabau](https://github.com/OpenIntegrationEngine/engine/pull/255)
- [@dowel015](https://github.com/OpenIntegrationEngine/engine/pull/28)

**Docs first-time contributors:**

- [@edthri](https://github.com/OpenIntegrationEngine/docs-website/commit/f0f87888c6d627e66bfd539e5c15364e3bd7900e)
- [@kryskool](https://github.com/OpenIntegrationEngine/docs-website/commit/3bb14ce77a83d912d4be30262cdb73a656ce368b)

## Breaking changes to know before you upgrade

- **Java 17 is now the minimum.** Older JVMs are no longer supported.
- **Xerces and xml-apis are removed.** Custom code that imports `org.apache.xerces.*` directly needs to migrate to `javax.xml.parsers.*` and `org.xml.sax.*`.
- **Logins are case-insensitive by default.** Existing accounts with case-sensitive usernames continue to work via a compatibility path.

## New features

- **`serverName` variable in alert templates**, useful for multi-instance deployments.
- **Environment variable substitution** in CLI config files.
- **JavaScript pretty-printer** for formatting JS directly in the editor.
- **Toggle Comment** action in the editor's right-click menu.

## Notable fixes

- Migration failure when upgrading to 4.5.2 is resolved.
- `JXTreeTable.getEditingRow` bug fixed, which addresses a class of macOS client errors.
- Clipboard error on Linux when an image was on the clipboard is fixed.
- Potential data loss when saving plugin properties is fixed.

The full release notes, including dependency upgrades (log4j, PostgreSQL JDBC, jSch, commons-lang3, commons-text), performance improvements, and CI changes, are on GitHub: [v4.6.0-rc1 release notes](https://github.com/OpenIntegrationEngine/engine/releases/tag/v4.6.0-rc1).

## How to help

If you can install the RC in a non-production environment and exercise your real channels and integrations, that's the most valuable thing you can do right now. File issues for anything that looks like a regression, and feedback on the release notes themselves is welcome. Questions and clarifications raised during the RC window will be folded into the GA notes.

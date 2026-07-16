---
title: "Role Based Access Control Plugin Released"
date: 2026-07-16
excerpt: "An open-source RBAC plugin for Open Integration Engine 4.6.0. Define your own roles with per-permission grants and channel-level restrictions, replacing the engine's default always-allow authorization controller."
---

A Role Based Access Control (RBAC) plugin for Open Integration Engine 4.6.0 is now available. It replaces the engine's default always-allow authorization controller with dynamic roles, per-permission grants, and channel-level restrictions. Courtesy of [Diridium Technologies Inc.](https://diridium.com)

![Role Based Access Control settings tab in the OIE Administrator](/images/plugins/rbac.png)

**What it does:** Define roles with exactly the permissions they need, assign them to users, and restrict which channels each role can touch. Denied operations always fail server-side, so enforcement does not depend on what the UI happens to hide.

**Key features:**

- **Dynamic roles** with per-permission grants, managed from a dedicated settings tab
- **Channel-level restrictions** to limit which channels a role can see and operate on
- **Works in both UIs** – the same zip ships role management and task gating for the desktop (Swing) Administrator and the [OIE Web Administrator](https://github.com/diridium-com/role-based-access-control/wiki/Web-Administrator), with matching behavior in each
- **Server-side enforcement** – denied operations fail at the server regardless of client
- **Simple setup** – installs through the Extensions view; on first startup it creates its four `rbac_*` tables and seeds an admin role assigned to the initial admin user

On servers where the Web Administrator is not used, the web module is inert.

**Requirements:** OIE 4.6.0

Full documentation is in the [wiki](https://github.com/diridium-com/role-based-access-control/wiki).

Link: <https://github.com/diridium-com/role-based-access-control>

Licensed under the Mozilla Public License 2.0.

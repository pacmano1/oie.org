---
title: "OIE Web Administrator Available"
date: 2026-08-27
excerpt: "A browser-based administrator for Open Integration Engine, installed as a standard extension. Full channel editing, the message browser and message tree, and plugin interfaces served by the engine itself."
---

Open Integration Engine can now be administered from a browser. The web administrator installs as a standard extension, needs no changes to the engine, and works read/write against the same REST API the desktop Administrator uses. Courtesy of [Chris Gibson](https://github.com/gibson9583).

![The OIE web administrator dashboard](/images/webadmin/01-dashboard-light.png)

**What it does:** This is not a read-only viewer. Configure sources and destinations, write transformers and filters, deploy channels, and browse, reprocess, and resend messages, all from the browser. The desktop Administrator keeps working against the same engine, so nothing has to be switched over at once.

**Key features:**

- **Full channel editing and deployment** – the channel editor, transformers, filters, and deploy, not a status dashboard
- **Message browser with the message tree** – serialization runs through the engine's own data type serializers, so the tree matches the runtime `msg` and `tmp` byte for byte
- **JavaScript validated by the engine** – scripts compile through the engine's own Rhino, so validation matches what happens at runtime
- **Plugin interfaces served by the engine** – an installed extension that ships a web UI is detected and served automatically, the community plugin store included. Plugins follow the engine they are installed on
- **Bundled editor** – the Monaco script editor is served locally, so it works on air-gapped servers, with a plain-editor fallback

**How to install:** Install the Web Support extension through the Extensions view in the desktop Administrator, then restart the engine. It deploys the administrator into the engine's embedded Jetty, served at `https://<host>:8443/oie-webadmin/`. Node.js and Docker deployments are available as well if you would rather run the administrator separately from the engine.

**Requirements:** OIE 4.6.0

More detail and screenshots are on the [web administrator page](/web-administrator/).

Link: <https://github.com/gibson9583/oie-web-support-plugin>

Licensed under the Mozilla Public License 2.0.

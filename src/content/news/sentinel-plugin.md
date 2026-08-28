---
title: "OIE Sentinel Released"
date: 2026-08-16
excerpt: "Monitoring and alerting for channel activity in Open Integration Engine. Seven monitor types, scoped to a channel, group, or tag, with email, channel, SNS, and webhook delivery, storm control, and escalation chains."
---

OIE Sentinel is now available for Open Integration Engine 4.6.0. It watches channel activity and raises problems when something stops behaving, with alert delivery, escalation, and acknowledgement built in. Courtesy of [Chris Gibson](https://github.com/gibson9583).

![OIE Sentinel dashboard](/images/plugins/sentinel.png)

**What it does:** Define monitors against a channel, a channel group, a channel tag, or everything. When a monitor breaches, Sentinel opens a problem, dispatches the actions attached to it, and tracks the problem until it clears or someone resolves it. Group and tag membership resolve live, so reorganising channels does not mean revisiting monitors.

**Monitor types:**

- **Inactivity** – no messages for a set period
- **Low volume** – fewer than N messages in a window
- **Anomaly** – volume deviating from a rolling baseline
- **Connection status** – connector state matching, rolled up per connector or once per channel
- **Error rate** – errored share of received messages, with a minimum-volume guard so a single error on a quiet channel is not reported as 100%
- **Queue depth** – destination queue at or above a threshold for a sustained period
- **Channel state** – the one type evaluated against stopped channels, defaulting to the resting states a channel does not leave on its own

**Alerting:** Email, channel (VM Router), AWS SNS, and webhook delivery. Per-monitor severity from Information to Disaster, a minimum number of consecutive breaches before anything fires, storm control, escalation chains, and dependency suppression so a parent monitor's open problem silences its dependents on the same channel.

**Problems:** Server-side filtering and paging, bulk acknowledge, and a detail pane showing the captured value and the log of dispatched actions.

Sentinel runs in the [OIE Web Administrator](/web-administrator/) only. There is no Swing client and no separate web application: the interface is built against the web administrator's plugin contract and loads inside the console on the existing session.

**Requirements:** OIE 4.6.0

Link: <https://github.com/gibson9583/oie-sentinel>

Licensed under the Mozilla Public License 2.0.

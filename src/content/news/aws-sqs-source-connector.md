---
title: "AWS SQS Source Connector Released"
date: 2026-02-26
excerpt: "Announcing: OIE SQS Source Connector Plugin - AWS SQS Integration for Open Integration Engine"
---

Announcing: OIE SQS Source Connector Plugin - AWS SQS Integration for Open Integration Engine

*Released by Chris Gibson, OIE Steering Committee member*

We’re excited to share the **OIE SQS Source Connector**, a plugin that brings native AWS SQS queue polling directly into your OIE channels as a source connector.

**What it does:** The SQS Reader source connector polls AWS SQS queues on a configurable interval, receives up to 10 messages per request via long polling, and delivers each message to your channel as a `RawMessage` with full SQS metadata in the source map. Successfully processed messages are automatically deleted from the queue; failed messages remain and reappear after the visibility timeout.

**Key Features:**

- **Long polling** with configurable wait time, max messages, and visibility timeout
- **Flexible AWS authentication** supporting Default Credential Chain, Static Credentials, and STS Assume Role
- **SQS message attributes** and FIFO queue metadata available in the channel source map
- **S3 event notification support** handling both S3 native and EventBridge formats, with automatic SNS envelope unwrapping
 - **Extract Details** parses S3 event metadata into the source map
 - **Fetch Object** downloads the S3 object as the message body (text or binary) with configurable size limit and encoding
- **Replacement variable support** so all configuration fields accept OIE replacement variables (`${configMap.key}`, `${globalMap.key}`, etc.)

**Documentation:** The project wiki covers installation, configuration, source map reference, S3 event notification setup, troubleshooting, and FAQs.

Check it out: [github.com/gibson9583/sqs-source-connector](https://github.com/gibson9583/sqs-source-connector)

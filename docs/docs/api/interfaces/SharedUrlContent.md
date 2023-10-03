---
sidebar_position: 3
---

# SharedUrlContent

A `SharedUrlContent` can be returned by the [`useSharedContent`](../hooks/useSharedContent) hook whenever a webpage is shared with your app.

:::note

This will also be returned if the user shared pure text content that only consists of a valid URL.

:::

## API

A `SharedUrlContent` object contains the following properties:

- `type` ([`SharedContentType`](../enums/SharedContentType)): Always `SharedContentType.URL`.
- `url` (`string`): The text that was shared.

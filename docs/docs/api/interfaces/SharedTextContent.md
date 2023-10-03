---
sidebar_position: 2
---

# SharedTextContent

A `SharedTextContent` can be returned by the [`useSharedContent`](../hooks/useSharedContent) hook whenever pure text content is shared with your app.

## API

A `SharedTextContent` object contains the following properties:

- `type` ([`SharedContentType`](../enums/SharedContentType)): Always `SharedContentType.TEXT`.
- `text` (`string`): The text that was shared.

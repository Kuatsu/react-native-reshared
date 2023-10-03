---
sidebar_position: 1
---

# SharedContent

A `SharedContent` is returned by the [`useSharedContent`](../hooks/useSharedContent) hook whenever content is shared with your app.

## API

A `SharedContent` object can either be a [`SharedTextContent`](./SharedTextContent), a [`SharedUrlContent`](./SharedUrlContent) or a [`SharedFileContent`](./SharedFileContent). All of these implement a `type` property which you can use to check the type of the content.

- `type` ([`SharedContentType`](../enums/SharedContentType)): The type of the shared content.

All other properties depend on the type of the content. Please refer to the documentation of the specific type for more information.

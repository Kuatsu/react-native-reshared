---
sidebar_position: 4
---

# SharedFileContent

A `SharedFileContent` can be returned by the [`useSharedContent`](../hooks/useSharedContent) hook whenever file (i.e., a photo) is shared with your app.

## API

A `SharedFileContent` object contains the following properties:

- `type` ([`SharedContentType`](../enums/SharedContentType)): Always `SharedContentType.FILE`.
- `fileUri` (`string`): The URI of the file that was shared.
- `mimeType` (`string | null`): The MIME type of the file that was shared, or `null` if the MIME type could not be determined.
- `fileName` (`string`): The name of the file that was shared.

## Example

_Work in progress... Feel free to contribute!_

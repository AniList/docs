---
title: Rate Limiting
description: Rate limiting in the AniList GraphQL API.
---

# Rate Limiting

::: warning
The API is currently in a degraded state and is limited to **30 requests per minute**. 
This is a temporary measure until the API is fully restored.
:::

The AniList API has a rate limit of 90 requests per minute.

When you make a request to the AniList API, you will recieve `X-RateLimit-Limit` and `X-RateLimit-Remaining` headers in the response.

```
HTTP/1.1 200 OK
... other headers here ...
X-RateLimit-Limit: 90
X-RateLimit-Remaining: 59
```

If you exceed the rate limit, you will recieve a 1 minute timeout. Any further requests in this timeout period will also include the `Retry-After` and `X-RateLimit-Reset` headers in the response.

`Retry-After` is the number of seconds you should wait before making another request.

`X-RateLimit-Reset` contains the Unix timestamp of when you can make another request.

```
HTTP/1.1 429 Too Many Requests
... other headers here ...
Retry-After: 30
X-RateLimit-Limit: 90
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1502035959
```

Along with the `429` error code, you will recieve a GraphQL error message:

```json
{
  "data": null,
  "errors": [
    {
      "message": "Too Many Requests.",
      "status": 429
    }
  ]
}
```

## Burst Limiting

On top of the above rate limiting, we also have a burst limiter. This limiter is designed to stop you from hammering the API with too many requests in a very short period of time.

## Rate Limit Raise

::: warning
We are not currently accepting requests for increased rate limits.
:::

For applications running on a server, the current rate limit may be too restrictive to allow your application to function consistently. If this is the case, you may request a manual rate limit raise.

You can send an email to contact@anilist.co with the following information:

Title: Rate Limit Raise {Your Application Name}

* Your AniList username
* The rate limit you would like to be increased to
* A short description of your application
* Any relevant links related to your application
* Evidence that you are in need of a rate limit raise

Please keep in mind that we will be looking at your current account standing and application history before deciding to approve your request. We reserve the right to deny any request that does not meet our standards.
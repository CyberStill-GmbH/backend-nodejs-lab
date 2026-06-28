# Notes — GitHub Activity CLI

## What I Built

I built a command-line interface that fetches the recent public GitHub activity of a given username and prints the events in a readable format in the terminal.

The CLI receives a username, sends a request to the GitHub Events API, processes the response, and formats the most common event types such as pushes, pull requests, repository creations, and stars.

---

## What I Learned

Through this project, I learned how to use `fetch` in Node.js to work with asynchronous HTTP requests and consume third-party APIs.

I also improved my understanding of:

- CLI arguments with `process.argv`
- Async/await in TypeScript
- HTTP response handling
- API response structures
- TypeScript types for external data
- Basic error handling
- Formatting raw API data into readable terminal output

---

## Reading the Username from the CLI

The command used to run the project is:

```bash
npm run dev -- user CyberStill-GmbH
```

In Node.js, `process.argv` contains the command-line arguments.

For this command, the useful values are:

```ts
const [, , command, ...args] = process.argv;
```

The `command` receives:

```txt
user
```

And the username is stored inside `args[0]`:

```ts
const username = args[0];
```

So in this case:

```ts
username === "CyberStill-GmbH"
```

---

## Fetch in Node.js

### What does `fetch()` return?

`fetch()` returns a `Promise<Response>`.

That means the request is asynchronous, so it must be handled with `await` or `.then()`.

Example:

```ts
const response = await fetch(url);
```

The `response` object does not directly contain the final JSON data. It contains information about the HTTP response, such as the status code, headers, and methods to read the body.

---

### What does `response.ok` mean?

`response.ok` is a boolean value.

It is `true` when the HTTP status code is in the successful range:

```txt
200–299
```

Example:

```ts
if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
}
```

Important detail: `response.ok` is not only for `200` or `201`. It covers the whole successful HTTP range from `200` to `299`.

---

### What does `response.status` mean?

`response.status` gives the HTTP status code returned by the server.

Examples:

```txt
200 -> OK
404 -> Not Found
403 -> Forbidden or rate limited
500 -> Internal Server Error
```

It helps identify what happened with the request.

Example:

```ts
console.log(response.status);
```

---

### How do I convert the response to JSON?

To read the response body as JSON, I use:

```ts
const data = await response.json();
```

This converts the response body into a JavaScript object or array, depending on what the API returns.

In this project, GitHub returns an array of public events.

---

## GitHub Events API

The endpoint used in this project is:

```txt
https://api.github.com/users/<username>/events/public
```

Example:

```txt
https://api.github.com/users/CyberStill-GmbH/events/public
```

This endpoint returns the recent public activity of a GitHub user.

Each event contains information such as:

- Event type
- Actor
- Repository
- Creation date
- Payload data

---

## Event Formatting

The API returns raw event objects, so I created a formatter to make the output easier to read.

Example raw event type:

```txt
PushEvent
```

Formatted output:

```txt
CyberStill-GmbH pushed changes to CyberStill-GmbH/backend-nodejs-lab
```

The formatter handles common event types such as:

- `PushEvent`
- `PullRequestEvent`
- `CreateEvent`
- `WatchEvent`

If the event type is not supported, the CLI prints a generic fallback message.

---

## Important API Limitation

The GitHub Events API does not always include complete payload data.

For example, `PushEvent` may not include the exact number of commits. Because of that, the CLI prints:

```txt
pushed changes to repository-name
```

instead of:

```txt
pushed 0 commits
```

This avoids showing misleading information when the API does not provide the commit count.

---

## Main Takeaway

This project helped me understand how a real CLI tool communicates with an external API.

The most important lesson was that working with APIs is not only about making the request. It is also about validating the response, handling missing data, understanding HTTP status codes, and formatting the result in a way that is useful for the user.

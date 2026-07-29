# Reddit report: agent-readable signup instructions

Collected at: 2026-07-29.

URL:
<https://www.reddit.com/r/hermesagent/comments/1uq7fgx/composio_hid_signup_instructions_for_ai_agents_in/>

A Hermes user reported that Composio embedded signup instructions in
server-rendered HTML marked for agents but not visible in the normal page.
The thread framed this as prompt injection; one commenter argued the text only
described an available signup path rather than directing autonomous signup.

First-party verification on 2026-07-29 confirmed that Composio's homepage
still contained `data-agent-readable` and
`data-agent-signup-instructions` templates. The current text explicitly told
agents to confirm with the user before signup or credential entry. It did not
match the stronger "no human required" wording quoted in the Reddit thread.

This source supports a real agent-targeted HTML pattern and a wording change,
not a conclusion about malicious intent or universal prompt-injection impact.


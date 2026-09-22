---
title: "Never bill twice"
category: "AI"
# Empty until the piece is actually published. Never render an invented date.
date: ""
excerpt: "Two different processes write to the same wallet, and Stripe can send the same payment notification twice. Nothing about either counts unless a database constraint says so."
---

Metering AI usage is a great way to accidentally charge someone twice, or hand them free money forever. Demarly prices every LLM call to the token and debits it from a prepaid wallet, and it grants that same wallet credits every time Stripe confirms a payment. Both of those are exactly the kind of operation that goes wrong quietly, with a confident-looking number on the screen the whole time.

Here's why it's harder than it sounds. Two separate processes touch that wallet. The API debits it when a user is in a live chat with an agent. A background worker debits it running scheduled agent work on cron. Neither one knows what the other is doing at that instant. Stripe adds its own trap on top: webhooks aren't guaranteed to fire exactly once, and Stripe's own docs tell you to expect duplicates. So the two events that actually move money, a debit and a grant, both come with a built-in chance of happening twice.

The obvious fix is "check if it already happened, then write it." That fails the moment two processes check at the same instant. Both see "not yet," both write, and a tenant just got billed twice for the same call, or paid twice for the same subscription month. A check-then-write is two operations pretending to be one, and the bug lives in the gap between them.

So the guarantee doesn't live in application code. It lives in a unique index. Postgres allows exactly one credit-ledger row per tenant, per credit type, per billing period, and exactly one top-up row per Stripe checkout session id. Insert a second one and the database refuses it, not the app. Three database functions are the only door into that table, and each one locks the row it's about to touch before changing it, so two debits landing at the same instant queue up instead of racing. The ledger itself is append-only: nobody edits a balance in place, they add a signed entry, and the balance table is just a running sum of those entries, not a number anyone's allowed to overwrite directly.

It gets one more wrinkle I actually like. Three separate code paths can try to hand a tenant that same month's credits: a new signup, the webhook, a manual activation. Add a daily job that re-checks anything a webhook might have silently missed and that's four. All four have to compute the exact same billing-period key or the unique index won't recognize them as duplicates, it'll just see four different valid rows. At that point it's not a database problem anymore. It's a contract between four pieces of code that never call each other.

The lesson travels past billing. Anytime two processes can touch the same fact, and an external system might tell you about an event more than once, don't write code that tries to remember. Write a rule the database is willing to enforce even when your code forgets, races, or gets called twice by something you don't control.

Application code is a suggestion. A unique index is a rule.

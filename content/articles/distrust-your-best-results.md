---
title: "Distrust your best results"
category: "Data"
# Empty until the piece is actually published. Never render an invented date.
date: ""
excerpt: "The best output your model ever produces is the one most likely to be a data error. So I built the skepticism into the pipeline."
---

When your model hands you an amazing result, your first move should be trying to kill it.

EdgeBet, my iOS app, scores thousands of betting markets against a fair price. That fair price isn't one book's number. It's a weighted consensus across three buckets: two peer-to-peer exchange sources and the average of the recreational books, each de-vigged first. On main lines the weights are 38/38/24, exchanges over books, because exchanges carry thinner margins and usually price sharper. On player props they're 32/32/36, because exchange volume on props is lower and the exchange quote is thinner evidence.

Every so often a player prop would score above +30% expected value. Free money, right?

Probably not. Here's the prior I built the system around: an edge that large is more likely to be a broken input than a real mispricing. A thin exchange quote nobody is actually filling. A stale price. A prop where one venue listed the market weird. Not because I ran a study, and I want to be straight about that. EdgeBet has no backtest. I have no measured number for how often a 30% edge turns out to be a data artifact versus a genuine one. What I have is an asymmetry I'm confident about: if I'm wrong and it was real, a user misses one bet. If I'm wrong the other way, I sent them at a price that doesn't exist. Those two errors do not cost the same, so the system leans one way on purpose.

So the skepticism lives in the pipeline, not in my head.

When a prop scores above +30% EV, the engine recomputes the fair price with the weights flipped to make the recreational books dominant, 17/17/66 instead of 32/32/36, then keeps the **lower** of the two EVs. The model is literally programmed to disbelieve its own best output. There's a second guard upstream: any exchange source sitting more than 25 percentage points away from the recreational-book average gets dropped for that prop entirely. A source that far from everyone else isn't a genius. It's broken, or it's quoting something other than what I think it's quoting.

Neither rule proves anything. They encode a bet about which errors I'd rather make.

This pattern shows up everywhere once you see it, and the pattern is a prompt to check, not a diagnosis.

Your A/B test says the new checkout doubled conversion? Look for a tracking bug before you look for a champagne bottle. One ad channel showing insane ROAS? Check attribution first. A benchmark where your model jumped 15 points overnight? Check for test set leakage. The sales forecast that finally makes the quarter work? Ask who wanted it to.

The reason I keep landing here is the audit asymmetry. Errors that hurt you get found fast, because they hurt and somebody complains. Errors in your favor tend to survive, because nobody files a ticket about good news. That's not a law, it's just the thing I keep running into. But if it's even a little true, then over time your unaudited wins are where your worst data quietly lives.

The fix isn't being pessimistic. Pessimism is a mood and moods don't run on a schedule. Be mechanical about it instead. Rerun the outliers with conservative assumptions, take the lower number, and make the system prove its best results twice.

Outliers in your favor are guilty until proven innocent.

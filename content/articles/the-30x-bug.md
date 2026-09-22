---
title: "The 30x bug"
category: "Engineering"
# Empty until the piece is actually published. Never render an invented date.
date: ""
excerpt: "A dimensional-analysis mistake inflated a billing number by about 30x. It was caught before launch and before anyone was billed."
---

I once wrote a bug that inflated a number by about 30x. Not a crash. Not an error. Just a wrong number that looked completely fine.

Two things up front, because they change how you should read this. The bug was caught in a pre-launch audit of the money-moving code, before launch and before a single person was billed anything. And the product it lived in, Nucli8, is mine, built but not launched. So this is a near miss, not a cleanup.

Here's the setup. Nucli8 is a cloud cost optimization platform. Its pricing model is a percentage of computed savings, which means the savings formula is also the billing formula. Same number, two blast radiuses: wrong analytics and wrong invoices.

Nucli8 takes one usage snapshot per day. Each snapshot says how many normalized units of compute an account was running at that moment. An early version of the monthly savings math summed every daily snapshot for the month, then multiplied by the month's roughly 730 hours.

See it?

A snapshot is a level, not a rate. Summing 30 daily snapshots gives you unit-days, not units. Multiplying unit-days by hours counts the day axis twice. The correct move is to average the snapshots into concurrent units first, then multiply by the period's hours exactly once.

And that's where the 30 comes from. The inflation factor is just the number of days you summed over. Sum instead of average and you're already about 30x high before the hours ever enter the formula.

Nothing about the output looked wrong. It was a well-formatted dollar figure with the right symbol and a magnitude you'd believe.

This is dimensional analysis. The thing from physics class that felt like busywork. Stocks versus flows. A snapshot is not a rate, and a sum of snapshots is definitely not a rate. If I had carried the units through the formula like a physics student, the bug couldn't have been written in the first place.

The fix mattered more than the patch:

1. Write the dimensional model down explicitly. What is a unit-day, what is a concurrent unit, what converts one into the other, and where does time enter.
2. Single-source the formula. One shared function that the reporting API, the billing service, and the background workers all call. No copies to drift apart.
3. Pin it with a regression test so the bug class can't come back quietly.

That audit found ten launch-blocking defects total, and this was one of them. Another was a commitment-exchange design that AWS's API can't actually perform the way I'd modeled it. Neither one threw an error. Both would have shipped.

The lesson I took: when your billing code is your analytics code, math bugs are money bugs. And the scariest bugs aren't the ones that throw exceptions. They're the ones that return a confident, plausible, wrong number, because nothing in your stack is going to raise its hand.

Check your units. Seriously. It's a commercial skill now.

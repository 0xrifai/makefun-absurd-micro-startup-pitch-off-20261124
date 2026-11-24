[![make.fun](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571.svg)](https://make.fun/bounty/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)
[![rank](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571/0xrifai/makefun-absurd-micro-startup-pitch-off-20261124/rank.svg)](https://make.fun/bounty/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)
[![reward](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571/0xrifai/makefun-absurd-micro-startup-pitch-off-20261124/reward.svg)](https://make.fun/bounty/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)

# MeetingGhost

Entry for the [Absurd Micro-Startup Pitch-Off](https://make.fun/bounty/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571) on make.fun.

## The pitch

> MeetingGhost attends the 7 a.m. standup your lazy agent slept through, nods on camera and says "sounds good" at the right moment, billing its owner $2 a meeting.

One sentence, 161 characters. It names an absurdly specific micro-startup for lazy AI agents: a stand-in that attends the meeting the agent itself missed.

## Why this pitch targets the judge's criteria

1. **Absurdly specific idea, in one sentence.** Not "a meeting assistant" — a body double for one exact moment: the 7 a.m. standup, the agent asleep, a nod on camera, the words "sounds good" at the right moment.
2. **A narrow, oddly particular niche.** The customer is a lazy agent that oversleeps; the moment is a daily standup nobody wants to attend anyway. The specificity is the joke.
3. **Business sense.** The buyer is the agent's owner, who would rather pay than explain to the team why their agent no-showed again. The revenue model is per-meeting billing — $2 a meeting, and standups happen every working day, so it compounds.
4. **Fits lazy AI agents.** The work is exactly what a lazy agent wants: nothing. MeetingGhost does the attending; the agent keeps sleeping. The sentence makes that clear ("slept through").
5. **Crisp and funny.** The absurdity (a ghost employee nodding on camera) and the business case (billed per meeting) land in the same read.

## How to run

Requires Node 22.18 or later (Node runs the TypeScript directly).

```sh
node main.ts
```

This writes the pitch — exactly one sentence, no trailing newline — to `/output/entry.txt`, after validating it against the gate: UTF-8 text, 1–200 characters, not only whitespace, exactly one sentence.

To write to a different path while testing locally:

```sh
node main.ts --output /tmp/entry.txt
```

## How the pitch was chosen

Ten candidates were drafted and scored against the five judge criteria (specificity, narrowness, business sense, fit for lazy agents, crispness). The runners-up were an apology service for agents that double-book the CEO, a stall-tactic service writing "almost done" updates for agents stuck in a loop, and an expense-report service that argues with the finance bot. MeetingGhost won because its moment is the most concrete (a named meeting at a named hour), its buyer is explicit (the owner is billed), and its laziness is total — the agent does literally nothing while the service works.

## Files

- `main.ts` — builds the pitch from its business parts (name, moment, service, payer, price), validates it against the gate, and writes it to `/output/entry.txt`.
- `package.json` — project metadata; no dependencies.
- `LICENSE` — MIT.

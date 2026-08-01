# Domainify Test Cases


Generated 2026-08-01 14:56 against the live API.



---
## "I want to plant a food garden in Georgia"


**Gate:** status=pass, gapType=system-resolvable

> The input clearly identifies food gardening in Georgia, but doesn't specify region; since growing zones differ significantly across Georgia's regions, this is a useful first branch that general horticultural knowledge can supply.

**Topic:** Planning a Food Garden in Georgia

**Categories:** 6 — Region within Georgia | Seasonal Planting Strategy | Soil & Site Preparation | Pest, Disease & Wildlife Management | Water & Irrigation Management | Garden Purpose & Layout

**Selected:**
- Plant last frost date around late April/early May
- Collard greens 'Georgia Southern'
- UGA Extension soil test kit submission

**Genre:** action_item


**Result:**

# Planning a Food Garden in Georgia: Your Action Sequence

## 1. Submit a Soil Test Before You Touch a Shovel
Order a soil test kit from your local UGA Extension office. Do this first — everything else depends on knowing your soil's pH and nutrient levels. Collect samples from multiple spots in your planned garden bed, mix them, and submit according to the kit instructions. Wait for results before amending soil or buying fertilizer. Skipping this step means guessing blind on lime and nutrient needs.

## 2. Amend Your Soil Based on Test Results
Once results arrive, apply lime or sulfur to correct pH as recommended. Work in compost or recommended amendments at least 4-6 weeks before planting. Don't rush this — amended soil needs time to stabilize before seeds or transplants go in.

## 3. Mark Your Planting Calendar Around Late April/Early May
Identify your area's specific last frost date (check with UGA Extension for your county, since North Georgia and South Georgia differ). Treat late April/early May as your baseline for tender crops — tomatoes, peppers, squash, beans. Anything frost-sensitive waits until this date passes.

## 4. Start Cold-Hardy Crops Earlier — Don't Wait on Frost Date for Everything
Collard greens tolerate cold and even improve in flavor after light frost. Get 'Georgia Southern' collard greens into the ground in early spring (or fall for a second season) — this variety is bred for Southern heat tolerance and disease resistance, so it doesn't need to wait for your last frost date like tender vegetables do.

## 5. Sequence Your Planting by Frost Tolerance
- **First:** Cold-hardy greens (collards, kale) — plant weeks before last frost
- **Second:** Semi-hardy crops (lettuce, peas) — plant 2-3 weeks before last frost
- **Last:** Warm-season crops (tomatoes, peppers, squash, beans) — plant only after late April/early May passes

## 6. Retest Soil Every 2-3 Years
Schedule a reminder to resubmit samples to UGA Extension. Soil chemistry shifts with each growing season — don't assume your first test result holds indefinitely.



---
## "I need to write a fictional story for my 7th grade English class"


**Gate:** status=block, gapType=user-only

> Without knowing the teacher's specific assignment details (prompt, genre, theme, length, rubric), a generated taxonomy risks being irrelevant to the actual assignment requirements.

**Clarifying question:** Did your teacher give you a specific prompt, genre, theme, or rubric for this story, or are you free to choose your own topic?

**Simulated answer:** no specific prompt was given, I can choose my own topic

**Topic:** Choosing and writing a fictional short story for 7th grade English class

**Categories:** 6 — Genre Direction (pick one to anchor everything else) | Point of View & Narrative Distance | Story Structure & Plot Shape | Character Design | Setting & World Details | Assignment Fit & Revision

**Selected:**
- Coming-of-age friendship story
- First-person (character tells own story)
- Hook opening that starts mid-action

**Genre:** story


**Result:**

The assignment sheet sat on the kitchen table for three days before I touched it. "Write a short story. 3-5 pages. Due Friday." Ms. Alvarez had scrawled a smiley face next to the due date like that would make it less terrifying.

I remember staring at the blank page that first afternoon, pencil tapping against my notebook, trying to think of something — anything — that felt like mine. Dragons seemed too easy. A mystery felt like something I'd seen a hundred times on TV. Then I thought about Marcus.

We'd been best friends since second grade, but that summer before seventh grade, everything had gotten weird between us. He'd started hanging out with the guys who skateboarded behind the gas station, and I hadn't. There was this one afternoon in July — nothing dramatic happened, we just sat on his porch steps not really talking, both of us aware something was shifting but neither of us saying it out loud. That was it. That was the story I wanted to tell.

I decided it had to be me telling it — not some narrator floating above everything, but an actual voice, my character's voice, cracking jokes and getting things wrong the way real kids do. First person felt honest. It felt like handing someone a diary page instead of a photograph.

The hardest part was the beginning. I'd written three different openings that all started the same dull way: "It was a hot summer day and I was riding my bike to my friend's house." Boring. Ms. Alvarez had told us in class, tapping the whiteboard with her marker, "Start in the middle of something. Make us catch up." So I scrapped all three openings and wrote instead:

*The bike hit the curb wrong and I went flying, and for one weightless second, before the gravel found my elbow, all I could think was: Marcus isn't going to catch me this time.*

Suddenly the story had motion. It had stakes before it even explained what the stakes were. From there, the rest came easier — the flashback to how things used to be, the porch scene, the small painful realization that friendships change shape without falling apart completely.

By Thursday night, I had four and a half pages. I read it aloud to my mom in the kitchen, and when I got to the last line, she got quiet in that way that meant it had landed.

I turned it in Friday morning, slightly nervous, slightly proud. It wasn't dragons or mysteries. It was just two kids on a porch, figuring out that growing up doesn't always look like moving forward — sometimes it just looks like sitting still, together, a little longer than usual.



---
## "I want to 3D print a custom gear set"


**Gate:** status=block, gapType=user-only

> Designing a functional gear set depends on the specific mechanical application (what device/machine it fits, required gear ratio, torque/load, and dimensional constraints), which only the user knows.

**Clarifying question:** What is this gear set for (e.g. what machine or mechanism it needs to fit into), and do you have specific requirements like gear ratio, size constraints, or the material/load it needs to handle?

**Simulated answer:** 

**Topic:** Designing and 3D printing a custom gear set

**Categories:** 6 — Gear Train Type & Function | Gear Sizing & Tooth Geometry | Material Selection | Printing Process & Orientation | Shaft, Hub & Assembly Interface | Design & Fabrication Tooling

**Selected:**
- Spur gear pair (parallel shafts, simple/loud)
- Metric module system (e.g., M0.5–M3 for small printed gears)
- PLA (easy print, brittle, low heat/wear resistance)

**Genre:** essay


**Result:**

# Designing and 3D Printing a Custom Gear Set

At first glance, gear design seems like a solved problem—pick a tooth count, extrude a profile, print it. But the moment you commit to a specific gear type, sizing system, and material, you inherit a set of tradeoffs that shape everything downstream, from tooth engagement to how long the part survives its first hundred rotations.

## The Case for Spur Gears

Spur gears are the natural starting point for anyone designing and printing their own gear set, and for good reason. Their teeth run parallel to the shaft axis, which means the two gears in a mating pair sit on parallel shafts and transmit motion through a straightforward, radial engagement. There's no helical twist to account for, no bevel angle to calculate—just a clean, planar tooth profile that's about as forgiving as gear geometry gets for a first design.

This simplicity is also the source of their most notable drawback: noise. Because spur teeth engage all at once along their full face width rather than progressively sliding into contact, each meshing event produces an audible impact. At low speeds and light loads—exactly the regime most desktop-printed gear sets operate in—this is a minor cosmetic issue. But it's worth naming upfront, because it explains why spur gears, despite being the default choice for hobbyist projects, are rarely the choice in applications where quiet operation matters. For a printed prototype or a low-RPM mechanism, though, the tradeoff tilts heavily in their favor: what you lose in acoustic refinement, you gain in design simplicity and forgiving tolerances.

## Sizing With the Module System

Once the gear type is chosen, the next question is scale—and here the metric module system does most of the heavy lifting. Module (m) defines the ratio of a gear's pitch diameter to its tooth count, and it's the single parameter that determines whether two gears will mesh at all. Two gears with different tooth counts but the same module will always mate correctly; two gears with the same tooth count but different modules will not.

For 3D-printed gears at hobbyist scale, this typically means working somewhere in the M0.5 to M3 range. That range isn't arbitrary—it reflects the practical limits of desktop FDM printing. Below roughly M0.5, tooth profiles become thinner than most nozzles can reliably resolve, and involute curves start to degrade into rough approximations. Above M3, gears begin to look oversized for the kind of small mechanisms—robotics arms, geared enclosures, display models—that motivate most DIY gear projects in the first place. Choosing a module, then, isn't purely a matter of desired torque or size; it's an exercise in matching mathematical gear theory to the physical resolution ceiling of the printer doing the work.

This is also where the module system quietly does a favor for makers designing iteratively: because module standardizes tooth geometry, you can redesign a gear's tooth count to change the gear ratio without needing to redesign the whole mesh from scratch. The parameter that makes gears interchangeable in industrial catalogs makes them just as interchangeable in a slicer-and-printer workflow.

## Material Reality: Why PLA Complicates the Picture

Geometry and sizing can be dialed in with precision, but material properties introduce a different kind of constraint—one that no amount of CAD refinement fully solves. PLA is the default filament for most desktop printing, and for gear prototypes it's an easy, almost obvious choice: it prints cleanly, warps less than many alternatives, and tolerates the fine tooth detail that small-module gears demand.

The catch is that PLA's ease of printing comes bundled with mechanical limitations that matter enormously for a part designed to endure repeated impact loading. PLA is brittle—it lacks the flexural give of nylon or POM, so at the small tooth thicknesses common in M0.5–M3 gears, individual teeth are vulnerable to snapping under sudden or off-axis loads rather than deforming and recovering. It also has poor heat and wear resistance, meaning that the friction generated by repeated meshing—especially in the noisier, higher-impact contact spur gears are known for—can soften or gradually abrade tooth surfaces over time.

## Where the Choices Intersect

None of these three decisions exist in isolation, and their interactions are worth naming explicitly. The spur gear's characteristic full-contact, noisy engagement puts real impact stress on each tooth—stress that a brittle material like PLA is poorly suited to absorb over the long run. Meanwhile, the small module range that printing resolution demands produces thin, delicate teeth, which are precisely the geometry where PLA's brittleness is most likely to manifest as breakage rather than graceful wear.

That doesn't make the combination a bad choice—it makes it a bounded one. Spur gears in the M0.5–M3 range printed in PLA are well suited to prototypes, low-load demonstrations, and short-duty-cycle mechanisms where noise and gradual wear aren't design-breaking concerns. But anyone planning to iterate toward a durable, functional final product should treat this combination as a first draft: a way to validate tooth engagement, ratio, and fit before migrating the same module-based geometry to a tougher filament, or accepting the mesh noise as a permanent tradeoff of spur design. The printed PLA gear set, in other words, is less a finished mechanism than a fast, cheap way to ask the right questions before committing to a final material and geometry.



---
## "I'm selecting a retirement city in the U.S."


**Gate:** status=pass, gapType=system-resolvable

> The input doesn't specify priorities like climate, cost of living, or region, but these can be surfaced as useful branches to help structure the decision.

**Topic:** Selecting a Retirement City in the U.S.

**Categories:** 6 — Key Decision Factors | Regions & Named Metro Candidates | Housing & Community Type | Proximity to Family & Social Ties | Lifestyle & Amenities | Risk & Safety Factors

**Selected:**
- Year-round warm/humid climate (e.g., Gulf Coast style)
- Asheville, NC
- 55+ age-restricted community

**Genre:** argument


**Result:**

# Where to Retire: The Case Against Compromise

The strongest argument in retirement planning is also the most overlooked: climate is not a preference, it's a health decision. Cold weather correlates with increased cardiovascular strain, seasonal depression, and mobility risk from ice and snow. A year-round warm, humid climate—the kind found along the Gulf Coast—eliminates these hazards entirely. There's no black ice to fall on, no shoveling to strain a heart that's earned its rest, no six-month stretch of gray skies to erode mental health. For retirees whose bodies are less forgiving than they once were, this isn't comfort. It's risk management.

The counterargument is obvious and worth taking seriously: heat and humidity carry their own dangers, particularly for older adults prone to dehydration or heat exhaustion. This is true. But it's a manageable risk, mitigated by air conditioning, hydration habits, and simply avoiding midday sun—compared to the far less controllable risk of an icy sidewalk or a black-ice car accident. One danger you can engineer around with a thermostat. The other requires you to defy physics on a bad hip.

If the Gulf Coast model is the strongest climate argument, Asheville, North Carolina offers the strongest counter-model—not because it disproves the warm-weather thesis, but because it proves that climate is not the only variable that matters. Asheville's four-season mildness, mountain scenery, and thriving arts-and-wellness culture make it a compelling home for retirees who prioritize intellectual and creative stimulation over pure physical ease. This suggests the honest conclusion: climate should be a *primary* filter, not the only one. A retiree choosing between the Gulf Coast and Asheville isn't choosing right versus wrong—they're choosing which secondary factor, culture or convenience, matters most once the climate question is settled in their own favor.

Where the two considerations converge most naturally is in the case for a 55+ age-restricted community. Whether in coastal Alabama or the hills outside Asheville, these communities solve a problem climate alone cannot: the need for a social ecosystem calibrated to a specific life stage. Critics argue these communities are insular, artificially cutting retirees off from multigenerational life. That criticism lands—but it assumes multigenerational contact is something retirees are otherwise guaranteed elsewhere, which, for many transplants moving away from grown children and old neighborhoods, is not the case. A 55+ community doesn't manufacture isolation; it replaces one social network with another, deliberately structured one, complete with peers who share your pace of life, your medical concerns, and your available Tuesday afternoons.

The verdict, then, isn't a single city. It's a decision tree: choose climate first, because health outcomes are non-negotiable; choose culture second, because Asheville proves a mild four-season city can rival the Gulf Coast's ease; and choose a 55+ community last, because structure—wherever you land—makes the other two choices livable day to day.



---
## "I want to train for my first marathon"


**Gate:** status=pass, gapType=system-resolvable

> The subject (marathon training) is clear; missing specifics like timeline, current fitness level, or target race are natural branch points general training knowledge can address.

**Topic:** Training for Your First Marathon

**Categories:** 6 — Training Timeline / Race Date | Weekly Training Structure | Cross-Training & Strength | Injury Prevention & Recovery | Gear & Equipment | Nutrition & Fueling

**Selected:**
- Hal Higdon Novice 1 (20-week)
- 10% weekly mileage increase rule
- Cycling

**Genre:** summary


**Result:**

# Training for Your First Marathon

## The Plan

Hal Higdon Novice 1. Twenty weeks. Four days of running, cross-training, one rest day, long run on weekends.

Built for finishers, not times.

## Volume

Increase weekly mileage by 10%, not more.

Long runs grow every one to two weeks. Occasional cutback weeks. Prevents injury from ramping too fast.

## Cross-Training

Cycling on non-running days.

Builds aerobic capacity. Spares joints. Keeps legs moving without pounding pavement.

## Rest

One full day off per week. Non-negotiable.

Recovery is where fitness is built, not lost.



---
## "I need to give a toast at my best friend's wedding"


**Gate:** status=block, gapType=user-only

> A wedding toast's content depends entirely on personal history, tone, and relationship details only the user knows, so a generated taxonomy risks being generic or off-target.

**Clarifying question:** Can you share a bit about your relationship with the couple (or specific stories/tone you want), and whether this is for the bride, groom, or both, plus what tone you're going for (funny, heartfelt, formal, etc.)?

**Simulated answer:** it's for my best friend, I've known him 15 years, keep it warm and a little funny, about 2 minutes long

**Topic:** Best Man Toast for a 15-Year Best Friend (Warm, Lightly Funny, ~2 Minutes)

**Categories:** 7 — Overall Structural Approach | Opening Line | Core Content: The 15-Year Friendship | Introducing the Bride / The Couple | Humor Calibration | Closing & Toast Line | Delivery & Pacing (staying near 2 minutes)

**Selected:**
- Open cold on the punchline of a shared memory, then rewind to explain it
- Self-deprecating jab about your own public-speaking nerves
- The specific how-we-met moment (school, job, dorm, team)

**Genre:** definition


**Result:**

"There is still, to this day, a mugshot of both of us laughing so hard we forgot to run. That's the memory. We'll come back to it."

Good evening. For those keeping track at home, this is a best man toast. It is not a stand-up set, though I have prepared exactly one joke that will land and several that will not. It is not a eulogy, even though my hands are shaking like it might be. It is not a confession, though give me two more glasses of wine and no promises. This is a toast. A toast is a thing you survive, then everyone claps, then you sit down. I intend to follow that format closely.

Fifteen years ago, this is not two grown men in matching tuxedos. This is two eighteen-year-olds, one hallway, freshman dorms, and a fire alarm that was absolutely not a drill because Dave here had, in fact, set something on fire. I was the guy three doors down who came out to see what was happening. That's how we met. Not through mutual friends, not through some meet-cute — through arson-adjacent circumstances. Everything since has, weirdly, been calmer than that first night.

What followed is not a highlight reel — it's fifteen years, which means it includes bad apartments, worse haircuts, one road trip that should have ended a friendship and somehow founded one, and enough inside jokes that I've had to explain approximately zero of them to anyone at this wedding, because if you're close enough to Dave to be here, you already know about Ohio.

This is not the moment where I tell that story in full. Ask me at the bar. What this is: a chance to say that the guy up there getting married is the same one who came out into that hallway fifteen years ago, still reckless, still loyal, still somehow better than he thinks he is.

So — to Dave and Sarah. Not the beginning of something. The next fifteen years of something already this good.


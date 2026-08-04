const DEMO_CASES = [
  {
    "label": "Food Garden (Georgia)",
    "input": "I want to plant a food garden in Georgia",
    "genre": "action_item",
    "topic": "Planning a food garden in Georgia (USA)",
    "categories": [
      {
        "name": "Region within Georgia (determines climate & soil baseline)",
        "fixedness": 0.1,
        "subcategories": [
          {
            "name": "North Georgia Mountains (Zone 6b–7a, cooler microclimate, shorter frost-free season)",
            "axis": "region",
            "direction": "mountains",
            "elements": [
              {
                "text": "Blue Ridge/Appalachian foothills growing pockets",
                "axis": "region",
                "direction": "mountains"
              },
              {
                "text": "High-elevation cold-air-drainage sites (frost pockets to avoid)",
                "axis": "region",
                "direction": "mountains"
              },
              {
                "text": "Rocky, thin mountain topsoil requiring raised beds",
                "axis": "region",
                "direction": "mountains"
              }
            ]
          },
          {
            "name": "Piedmont (Zone 7b–8a, red clay belt, Atlanta metro & central GA)",
            "axis": "region",
            "direction": "piedmont",
            "elements": [
              {
                "text": "Heavy red clay soil needing amendment",
                "axis": "region",
                "direction": "piedmont"
              },
              {
                "text": "Rolling terrain with erosion-prone slopes",
                "axis": "region",
                "direction": "piedmont"
              },
              {
                "text": "Urban/suburban lot gardening (Atlanta metro)",
                "axis": "region",
                "direction": "piedmont"
              }
            ]
          },
          {
            "name": "Coastal Plain (Zone 8a–9a, sandy soil, longer/humid growing season)",
            "axis": "region",
            "direction": "coastal",
            "elements": [
              {
                "text": "Sandy, fast-draining soils of south GA",
                "axis": "region",
                "direction": "coastal"
              },
              {
                "text": "Coastal salt-air-tolerant plantings (near Savannah/coast)",
                "axis": "region",
                "direction": "coastal"
              },
              {
                "text": "High humidity/heat disease pressure (fungal issues)",
                "axis": "region",
                "direction": "coastal"
              }
            ]
          }
        ]
      },
      {
        "name": "Site assessment & bed setup",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Sunlight & site layout",
            "elements": [
              {
                "text": "Full-sun site (6+ hrs) for fruiting crops"
              },
              {
                "text": "Partial-shade site for leafy greens/herbs"
              },
              {
                "text": "Orienting rows north-south for even light"
              }
            ]
          },
          {
            "name": "Bed style (in-ground vs raised)",
            "elements": [
              {
                "text": "In-ground beds with clay-breaking double-dig/broadfork",
                "axis": "bed_style",
                "direction": "in_ground"
              },
              {
                "text": "Raised wooden beds (8–12in) for drainage over clay/rock",
                "axis": "bed_style",
                "direction": "raised"
              },
              {
                "text": "Hugelkultur mounds for sandy coastal soils",
                "axis": "bed_style",
                "direction": "raised"
              },
              {
                "text": "Container/grow-bag gardening for small urban lots"
              }
            ]
          },
          {
            "name": "Soil amendment strategy",
            "elements": [
              {
                "text": "Georgia clay conditioner: gypsum + compost tilling"
              },
              {
                "text": "Soil test through UGA Cooperative Extension office"
              },
              {
                "text": "Lime application to correct acidic Piedmont/mountain soils"
              },
              {
                "text": "Cover cropping (crimson clover, rye) fall/winter fallow beds"
              }
            ]
          }
        ]
      },
      {
        "name": "What & when to plant (crop calendar)",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Cool-season crops (spring/fall, tolerate frost)",
            "axis": "season",
            "direction": "cool",
            "elements": [
              {
                "text": "Collards & kale (GA staple greens, frost-sweetened)",
                "axis": "season",
                "direction": "cool"
              },
              {
                "text": "Turnips & mustard greens",
                "axis": "season",
                "direction": "cool"
              },
              {
                "text": "Sugar snap peas (early spring trellised)",
                "axis": "season",
                "direction": "cool"
              },
              {
                "text": "Vidalia-type sweet onions (fall-planted, spring harvest)",
                "axis": "season",
                "direction": "cool"
              }
            ]
          },
          {
            "name": "Warm-season crops (after last frost into summer heat)",
            "axis": "season",
            "direction": "warm",
            "elements": [
              {
                "text": "Okra (thrives in GA heat/humidity)",
                "axis": "season",
                "direction": "warm"
              },
              {
                "text": "Heat-tolerant tomato varieties (e.g., 'Heatwave', 'Arkansas Traveler')",
                "axis": "season",
                "direction": "warm"
              },
              {
                "text": "Southern peas / field peas (cowpeas)",
                "axis": "season",
                "direction": "warm"
              },
              {
                "text": "Muscadine grapes (native Southeastern perennial vine)",
                "axis": "season",
                "direction": "warm"
              }
            ]
          },
          {
            "name": "Succession & second-season planning",
            "elements": [
              {
                "text": "Spring-to-fall succession sowing every 2-3 weeks"
              },
              {
                "text": "Fall garden restart in August for winter harvest"
              },
              {
                "text": "Row-cover/low tunnel season extension into winter"
              }
            ]
          }
        ]
      },
      {
        "name": "Pest, disease & wildlife pressure (Southeast-specific)",
        "fixedness": 0.4,
        "subcategories": [
          {
            "name": "Insect pests",
            "elements": [
              {
                "text": "Squash vine borer (kills squash/zucchini stems)"
              },
              {
                "text": "Harlequin bug on brassicas"
              },
              {
                "text": "Japanese beetles on beans/grapes"
              },
              {
                "text": "Row covers/floating fabric as physical barrier"
              }
            ]
          },
          {
            "name": "Fungal & humidity-driven disease",
            "elements": [
              {
                "text": "Early blight/septoria on tomatoes"
              },
              {
                "text": "Powdery mildew on squash/cucurbits"
              },
              {
                "text": "Drip irrigation instead of overhead watering to reduce leaf wetness"
              }
            ]
          },
          {
            "name": "Wildlife pressure",
            "elements": [
              {
                "text": "Deer fencing (7ft+) for mountain/rural sites"
              },
              {
                "text": "Rabbit/vole exclusion fencing for raised beds"
              },
              {
                "text": "Bird netting for berries"
              }
            ]
          }
        ]
      },
      {
        "name": "Water & garden management systems",
        "fixedness": 0.5,
        "subcategories": [
          {
            "name": "Irrigation approach",
            "elements": [
              {
                "text": "Drip irrigation on timer for reliable summer watering"
              },
              {
                "text": "Rain barrel collection off gutters/downspouts"
              },
              {
                "text": "Soaker hoses for budget in-ground beds"
              }
            ]
          },
          {
            "name": "Mulching for heat & moisture retention",
            "elements": [
              {
                "text": "Pine straw mulch (widely available, acidifying)"
              },
              {
                "text": "Wheat straw mulch for vegetable beds"
              },
              {
                "text": "Landscape fabric under mulch for weed suppression"
              }
            ]
          }
        ]
      },
      {
        "name": "Growing method philosophy",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Organic/no-spray approach",
            "axis": "method",
            "direction": "organic",
            "elements": [
              {
                "text": "OMRI-listed organic pesticides (spinosad, neem oil)",
                "axis": "method",
                "direction": "organic"
              },
              {
                "text": "Companion planting (marigolds, basil interplanting)",
                "axis": "method",
                "direction": "organic"
              }
            ]
          },
          {
            "name": "Conventional approach",
            "axis": "method",
            "direction": "conventional",
            "elements": [
              {
                "text": "Synthetic fertilizer program (10-10-10 granular)",
                "axis": "method",
                "direction": "conventional"
              },
              {
                "text": "Targeted synthetic insecticide/fungicide spray schedule",
                "axis": "method",
                "direction": "conventional"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Region within Georgia (determines climate & soil baseline)",
      "Full-sun site (6+ hrs) for fruiting crops",
      "In-ground beds with clay-breaking double-dig/broadfork",
      "Georgia clay conditioner: gypsum + compost tilling",
      "Collards & kale (GA staple greens, frost-sweetened)",
      "Spring-to-fall succession sowing every 2-3 weeks",
      "Squash vine borer (kills squash/zucchini stems)",
      "Early blight/septoria on tomatoes",
      "Deer fencing (7ft+) for mountain/rural sites",
      "Drip irrigation on timer for reliable summer watering",
      "Pine straw mulch (widely available, acidifying)",
      "OMRI-listed organic pesticides (spinosad, neem oil)"
    ]
  },
  {
    "label": "7th Grade Story",
    "input": "I need to write a fictional story for my 7th grade English class",
    "topic": "Choosing and writing a fictional story for 7th grade English class",
    "categories": [
      {
        "name": "Genre & Story Type (pick one lane first)",
        "subcategories": [
          {
            "name": "Realistic Fiction (grounded in real-world rules)",
            "axis": "genre",
            "direction": "realistic",
            "elements": [
              {
                "text": "Coming-of-age school story"
              },
              {
                "text": "Friendship/betrayal drama"
              },
              {
                "text": "Family conflict story"
              },
              {
                "text": "Sports competition story"
              }
            ]
          },
          {
            "name": "Speculative Fiction (bends real-world rules)",
            "axis": "genre",
            "direction": "speculative",
            "elements": [
              {
                "text": "Fantasy quest with magic system"
              },
              {
                "text": "Sci-fi/dystopian future world"
              },
              {
                "text": "Ghost/horror mystery"
              },
              {
                "text": "Fairy-tale retelling with a twist"
              }
            ]
          }
        ]
      },
      {
        "name": "Plot Structure & Conflict",
        "subcategories": [
          {
            "name": "Conflict Type (the engine of the plot)",
            "elements": [
              {
                "text": "Character vs. character"
              },
              {
                "text": "Character vs. self (internal struggle)"
              },
              {
                "text": "Character vs. nature/environment"
              },
              {
                "text": "Character vs. society/rules"
              }
            ]
          },
          {
            "name": "Plot Shape (how events are ordered)",
            "axis": "timeline",
            "direction": "structure",
            "elements": [
              {
                "text": "Classic linear five-part arc (setup, rising action, climax, falling action, resolution)",
                "axis": "timeline",
                "direction": "linear"
              },
              {
                "text": "Flashback-framed structure (start near the end, then rewind)",
                "axis": "timeline",
                "direction": "nonlinear"
              },
              {
                "text": "Twist-ending structure (hidden reveal changes everything)"
              }
            ]
          }
        ]
      },
      {
        "name": "Point of View & Narrator",
        "subcategories": [
          {
            "name": "Narrative Voice (who tells it)",
            "elements": [
              {
                "text": "First-person narrator (I/me, inside one head)",
                "axis": "pov",
                "direction": "first"
              },
              {
                "text": "Third-person limited (follows one character closely)",
                "axis": "pov",
                "direction": "third-limited"
              },
              {
                "text": "Third-person omniscient (knows everything, all characters)",
                "axis": "pov",
                "direction": "third-omniscient"
              }
            ]
          },
          {
            "name": "Narrator Reliability",
            "elements": [
              {
                "text": "Reliable, trustworthy narrator"
              },
              {
                "text": "Unreliable narrator (hides or misunderstands truth)"
              }
            ]
          }
        ]
      },
      {
        "name": "Characters",
        "subcategories": [
          {
            "name": "Protagonist Design",
            "elements": [
              {
                "text": "Clear external goal (wins the game, finds the item)"
              },
              {
                "text": "Hidden internal flaw to overcome"
              },
              {
                "text": "Specific personality quirk or habit"
              }
            ]
          },
          {
            "name": "Supporting Cast Roles",
            "elements": [
              {
                "text": "Best friend/sidekick"
              },
              {
                "text": "Antagonist with understandable motive"
              },
              {
                "text": "Mentor or authority figure"
              },
              {
                "text": "Foil character (contrasts protagonist's traits)"
              }
            ]
          }
        ]
      },
      {
        "name": "Setting & World",
        "subcategories": [
          {
            "name": "Time Period",
            "axis": "era",
            "direction": "time",
            "elements": [
              {
                "text": "Present-day setting",
                "axis": "era",
                "direction": "present"
              },
              {
                "text": "Historical setting (specific decade/event)",
                "axis": "era",
                "direction": "past"
              },
              {
                "text": "Futuristic setting",
                "axis": "era",
                "direction": "future"
              }
            ]
          },
          {
            "name": "Location Type",
            "elements": [
              {
                "text": "Familiar everyday place (school, neighborhood)"
              },
              {
                "text": "Invented fantasy world with its own rules"
              },
              {
                "text": "Isolated/confined setting (island, spaceship, cabin)"
              }
            ]
          }
        ]
      },
      {
        "name": "Craft & Technique",
        "subcategories": [
          {
            "name": "Opening Hook Strategy",
            "elements": [
              {
                "text": "Start mid-action (in medias res)"
              },
              {
                "text": "Start with vivid sensory description"
              },
              {
                "text": "Start with intriguing dialogue line"
              }
            ]
          },
          {
            "name": "Dialogue & Description Balance",
            "elements": [
              {
                "text": "Dialogue-heavy scenes to reveal character"
              },
              {
                "text": "Descriptive narration to build mood/setting"
              }
            ]
          },
          {
            "name": "Theme & Message",
            "elements": [
              {
                "text": "Theme about friendship/loyalty"
              },
              {
                "text": "Theme about courage/facing fear"
              },
              {
                "text": "Theme about honesty/consequences"
              }
            ]
          }
        ]
      },
      {
        "name": "Assignment Fit & Revision",
        "subcategories": [
          {
            "name": "Meeting Class Requirements",
            "elements": [
              {
                "text": "Check required word/page count"
              },
              {
                "text": "Confirm required story elements are present (rubric checklist)"
              },
              {
                "text": "Pick title that reflects theme"
              }
            ]
          },
          {
            "name": "Revision Pass Types",
            "elements": [
              {
                "text": "Read-aloud pass for flow/dialogue realism"
              },
              {
                "text": "Peer feedback pass"
              },
              {
                "text": "Grammar/spelling proofread pass"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Coming-of-age school story",
      "Character vs. character",
      "First-person narrator (I/me, inside one head)",
      "Clear external goal (wins the game, finds the item)"
    ],
    "genre": "story"
  },
  {
    "label": "3D Print Gear Set",
    "input": "I want to 3D print a custom gear set",
    "genre": "essay",
    "topic": "Designing and 3D printing a custom gear set",
    "categories": [
      {
        "name": "Application / use case",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Functional mechanical load (transmits real torque/repeated cycling)",
            "axis": "use_case",
            "direction": "functional",
            "elements": [
              {
                "text": "Hand-crank mechanism (low speed, low torque, occasional use)",
                "axis": "use_case",
                "direction": "functional"
              },
              {
                "text": "Motor-driven gearbox (continuous rotation, motor torque)",
                "axis": "use_case",
                "direction": "functional"
              },
              {
                "text": "Load-bearing machine part (replacement for a broken metal gear)",
                "axis": "use_case",
                "direction": "functional"
              }
            ]
          },
          {
            "name": "Prototype / decorative / display (no sustained load)",
            "axis": "use_case",
            "direction": "decorative",
            "elements": [
              {
                "text": "Fit-check prototype (verifying dimensions before final material)",
                "axis": "use_case",
                "direction": "decorative"
              },
              {
                "text": "Display/educational model (kinematics demo, no torque)",
                "axis": "use_case",
                "direction": "decorative"
              },
              {
                "text": "Cosplay/prop gear (visual only)",
                "axis": "use_case",
                "direction": "decorative"
              }
            ]
          }
        ]
      },
      {
        "name": "Gear geometry & type",
        "fixedness": 0.85,
        "subcategories": [
          {
            "name": "Gear tooth form",
            "elements": [
              {
                "text": "Spur gear (straight teeth, parallel shafts)"
              },
              {
                "text": "Helical gear (angled teeth, quieter, adds axial thrust)"
              },
              {
                "text": "Bevel gear (intersecting shafts, cone-shaped teeth)"
              },
              {
                "text": "Worm gear set (high reduction, self-locking)"
              },
              {
                "text": "Planetary/epicyclic gear set (compact high ratio)"
              }
            ]
          },
          {
            "name": "Sizing parameters",
            "elements": [
              {
                "text": "Module/pitch selection (mm per tooth — must match mating gear)"
              },
              {
                "text": "Pressure angle choice (typically 20° — affects tooth strength/mesh)"
              },
              {
                "text": "Gear ratio target (input:output speed/torque)"
              },
              {
                "text": "Backlash allowance (extra clearance between meshing teeth)"
              }
            ]
          }
        ]
      },
      {
        "name": "Material selection",
        "fixedness": 0.75,
        "subcategories": [
          {
            "name": "Standard FDM filaments (desktop printer compatible)",
            "axis": "printer_class",
            "direction": "fdm",
            "elements": [
              {
                "text": "PLA (easy to print, brittle, low heat resistance — prototypes only)"
              },
              {
                "text": "Nylon (PA12) (high wear resistance, low friction, absorbs moisture)"
              },
              {
                "text": "ABS (heat resistant, prone to warping without enclosure)"
              }
            ]
          },
          {
            "name": "Reinforced / engineering filaments",
            "axis": "printer_class",
            "direction": "reinforced",
            "elements": [
              {
                "text": "Carbon-fiber-filled nylon (high stiffness, abrasive to nozzles)"
              },
              {
                "text": "Polycarbonate (PC) (very high strength/heat tolerance, hard to print)"
              }
            ]
          },
          {
            "name": "Resin (SLA/DLP) options",
            "axis": "process",
            "direction": "resin",
            "elements": [
              {
                "text": "Standard tough resin (fine detail, brittle under repeated flex)"
              },
              {
                "text": "Engineering/ABS-like resin (better impact resistance)"
              }
            ]
          }
        ]
      },
      {
        "name": "Printer process & tolerances",
        "fixedness": 0.4,
        "subcategories": [
          {
            "name": "FDM (fused deposition, layer lines, lower resolution)",
            "axis": "process",
            "direction": "fdm",
            "elements": [
              {
                "text": "0.4mm nozzle standard resolution print"
              },
              {
                "text": "Fine nozzle (0.2mm) for smaller teeth/higher accuracy"
              },
              {
                "text": "XY calibration/hole-size compensation (correcting known FDM oversize/undersize error)"
              }
            ]
          },
          {
            "name": "Resin (SLA/DLP, high resolution, brittle by default)",
            "axis": "process",
            "direction": "resin",
            "elements": [
              {
                "text": "Standard SLA print (fine tooth detail, needs post-cure)"
              },
              {
                "text": "Support orientation planning (minimizing tooth-surface support marks)"
              }
            ]
          }
        ]
      },
      {
        "name": "Design & modeling workflow",
        "fixedness": 0.65,
        "subcategories": [
          {
            "name": "CAD gear generation methods",
            "elements": [
              {
                "text": "Parametric CAD gear plugin (e.g. Fusion 360 spur gear generator)"
              },
              {
                "text": "Online involute gear generator (exports STL/DXF from ratio inputs)"
              },
              {
                "text": "Manual involute curve construction (full control, more effort)"
              }
            ]
          },
          {
            "name": "Fit & tolerance features",
            "elements": [
              {
                "text": "Bore/shaft fit design (press-fit vs. clearance fit for shaft)"
              },
              {
                "text": "Keyway or D-shaft flat (prevents shaft slippage under torque)"
              },
              {
                "text": "Set screw boss (secures gear to shaft radially)"
              }
            ]
          }
        ]
      },
      {
        "name": "Post-processing & assembly",
        "fixedness": 0.5,
        "subcategories": [
          {
            "name": "Surface/tooth finishing",
            "elements": [
              {
                "text": "Manual deburring/sanding of tooth flanks"
              },
              {
                "text": "Vapor smoothing (for ABS/nylon, softens layer lines)"
              },
              {
                "text": "Running-in break-in period (letting mating gears wear to match)"
              }
            ]
          },
          {
            "name": "Lubrication & wear management",
            "elements": [
              {
                "text": "PTFE-based dry lubricant (safe for plastic-on-plastic gears)"
              },
              {
                "text": "Silicone grease (compatible with most printed polymers)"
              },
              {
                "text": "No lubrication (acceptable for low-load display models only)"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Hand-crank mechanism (low speed, low torque, occasional use)",
      "Spur gear (straight teeth, parallel shafts)",
      "Module/pitch selection (mm per tooth — must match mating gear)",
      "PLA (easy to print, brittle, low heat resistance — prototypes only)",
      "Carbon-fiber-filled nylon (high stiffness, abrasive to nozzles)",
      "Standard tough resin (fine detail, brittle under repeated flex)",
      "0.4mm nozzle standard resolution print",
      "Standard SLA print (fine tooth detail, needs post-cure)",
      "Parametric CAD gear plugin (e.g. Fusion 360 spur gear generator)",
      "Bore/shaft fit design (press-fit vs. clearance fit for shaft)",
      "Manual deburring/sanding of tooth flanks",
      "PTFE-based dry lubricant (safe for plastic-on-plastic gears)"
    ]
  },
  {
    "label": "Retirement City",
    "input": "I'm selecting a retirement city in the U.S.",
    "genre": "argument",
    "topic": "Choosing a Retirement City in the U.S.",
    "categories": [
      {
        "name": "Primary Priority Driving the Search",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Lifestyle & Environment Priorities",
            "elements": [
              {
                "text": "Climate-first (year-round temperature/humidity comfort)",
                "axis": "priority",
                "direction": "climate"
              },
              {
                "text": "Proximity-to-family-first (within driving distance or one flight of adult kids/grandkids)",
                "axis": "priority",
                "direction": "family"
              }
            ]
          },
          {
            "name": "Financial Priorities",
            "elements": [
              {
                "text": "Cost-of-living-first (housing, groceries, services)",
                "axis": "priority",
                "direction": "cost"
              },
              {
                "text": "Tax-first (state income, estate, and property tax exposure)",
                "axis": "priority",
                "direction": "taxes"
              }
            ]
          },
          {
            "name": "Health & Safety Priorities",
            "elements": [
              {
                "text": "Healthcare-access-first (proximity to major medical centers)",
                "axis": "priority",
                "direction": "healthcare"
              }
            ]
          }
        ]
      },
      {
        "name": "State & Regional Tax Treatment",
        "fixedness": 0.3,
        "subcategories": [
          {
            "name": "Retirement Income Taxation",
            "elements": [
              {
                "text": "No state income tax states (e.g., Florida, Texas, Nevada)",
                "axis": "taxes",
                "direction": "no-income-tax"
              },
              {
                "text": "States exempting Social Security & pensions but taxing other income (e.g., Pennsylvania, Illinois)",
                "axis": "taxes",
                "direction": "partial-exempt"
              },
              {
                "text": "States fully taxing retirement income (e.g., California, Vermont)",
                "axis": "taxes",
                "direction": "full-tax"
              }
            ]
          },
          {
            "name": "Property & Estate Tax Burden",
            "elements": [
              {
                "text": "Homestead exemption states capping property tax growth (e.g., Florida's Save Our Homes)"
              },
              {
                "text": "States with estate or inheritance tax (e.g., Maryland, Oregon)"
              },
              {
                "text": "Low-property-tax states (e.g., Alabama, Hawaii nominal rate)"
              }
            ]
          }
        ]
      },
      {
        "name": "Climate & Geographic Risk Profile",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Climate Zone Preference",
            "elements": [
              {
                "text": "Sunbelt year-round warmth (Phoenix, AZ / Naples, FL)",
                "axis": "climate-zone",
                "direction": "warm"
              },
              {
                "text": "Four-season mild climate (Asheville, NC / Greenville, SC)",
                "axis": "climate-zone",
                "direction": "mild-seasonal"
              },
              {
                "text": "Cooler, low-humidity mountain/high-desert (Boise, ID / Santa Fe, NM)",
                "axis": "climate-zone",
                "direction": "cool-dry"
              }
            ]
          },
          {
            "name": "Natural Disaster Exposure (insurability & evacuation risk)",
            "elements": [
              {
                "text": "Hurricane-prone Gulf/Atlantic coast (rising homeowners insurance premiums)",
                "axis": "disaster-risk",
                "direction": "hurricane"
              },
              {
                "text": "Wildfire-prone West (WUI zones in CA, CO foothills)",
                "axis": "disaster-risk",
                "direction": "wildfire"
              },
              {
                "text": "Low-disaster-risk interior regions (Midwest, parts of Appalachia)",
                "axis": "disaster-risk",
                "direction": "low-risk"
              }
            ]
          }
        ]
      },
      {
        "name": "Healthcare Infrastructure",
        "fixedness": 0.4,
        "subcategories": [
          {
            "name": "Access to Specialized Care",
            "elements": [
              {
                "text": "Metro with Level I trauma center & academic medical center (e.g., Nashville, Denver)"
              },
              {
                "text": "Metro with strong geriatric/cardiac specialty network (e.g., Rochester MN near Mayo Clinic)"
              },
              {
                "text": "Smaller town relying on regional hub 30+ min away"
              }
            ]
          },
          {
            "name": "Medicare & Insurance Landscape",
            "elements": [
              {
                "text": "High Medicare Advantage plan density/competition county"
              },
              {
                "text": "Areas requiring Medigap supplement due to limited MA options"
              }
            ]
          }
        ]
      },
      {
        "name": "Cost of Living & Housing Structure",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Housing Tenure Strategy",
            "elements": [
              {
                "text": "Buy a single-family home outright (equity as inflation hedge)",
                "axis": "tenure",
                "direction": "buy"
              },
              {
                "text": "Rent (flexibility, no maintenance, avoids market timing)",
                "axis": "tenure",
                "direction": "rent"
              },
              {
                "text": "Age-restricted 55+ active adult community (HOA, amenities bundled)",
                "axis": "tenure",
                "direction": "age-restricted"
              }
            ]
          },
          {
            "name": "Daily Cost Structure",
            "elements": [
              {
                "text": "Low-cost mid-size metro (e.g., Huntsville AL, Chattanooga TN)"
              },
              {
                "text": "High-cost coastal metro trading cost for amenities (e.g., San Diego, CA)"
              },
              {
                "text": "College town with cultural amenities at moderate cost (e.g., Athens, GA)"
              }
            ]
          }
        ]
      },
      {
        "name": "Social Fabric & Daily Life",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Community & Social Connection Model",
            "elements": [
              {
                "text": "Purpose-built retirement community (The Villages, FL)"
              },
              {
                "text": "Multigenerational neighborhood near family",
                "axis": "priority",
                "direction": "family"
              },
              {
                "text": "University town with lifelong-learning/audit programs"
              }
            ]
          },
          {
            "name": "Mobility & Transportation Needs",
            "elements": [
              {
                "text": "Walkable urban core reducing driving dependency as skills decline"
              },
              {
                "text": "Car-dependent suburb requiring long-term driving ability"
              },
              {
                "text": "Transit/paratransit-served city with senior ride programs"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Climate-first (year-round temperature/humidity comfort)",
      "State & Regional Tax Treatment",
      "Sunbelt year-round warmth (Phoenix, AZ / Naples, FL)",
      "Hurricane-prone Gulf/Atlantic coast (rising homeowners insurance premiums)",
      "Metro with Level I trauma center & academic medical center (e.g., Nashville, Denver)",
      "High Medicare Advantage plan density/competition county",
      "Buy a single-family home outright (equity as inflation hedge)",
      "Low-cost mid-size metro (e.g., Huntsville AL, Chattanooga TN)",
      "Purpose-built retirement community (The Villages, FL)",
      "Walkable urban core reducing driving dependency as skills decline"
    ]
  },
  {
    "label": "First Marathon",
    "input": "I want to train for my first marathon",
    "genre": "summary",
    "topic": "Training for a first marathon",
    "categories": [
      {
        "name": "Current fitness/running base",
        "fixedness": 0.1,
        "subcategories": [
          {
            "name": "Beginner base (currently running 0-10 miles/week or new to running)",
            "axis": "base_level",
            "direction": "beginner",
            "elements": [
              {
                "text": "Couch-to-5K style run/walk starting point"
              },
              {
                "text": "18-20 week training plan (longer runway needed to build base safely)"
              },
              {
                "text": "Walk-run intervals for early long runs"
              }
            ]
          },
          {
            "name": "Intermediate base (already running 15-25 miles/week consistently)",
            "axis": "base_level",
            "direction": "intermediate",
            "elements": [
              {
                "text": "12-16 week training plan"
              },
              {
                "text": "Continuous long runs from week one"
              },
              {
                "text": "Add tempo runs earlier in the plan"
              }
            ]
          },
          {
            "name": "Injury/health screening before starting",
            "elements": [
              {
                "text": "Gait/biomechanics assessment at a running store"
              },
              {
                "text": "Cardiovascular clearance check with a doctor (esp. if over 40 or sedentary)"
              },
              {
                "text": "Baseline check of prior injuries (shin splints, IT band, plantar fasciitis)"
              }
            ]
          }
        ]
      },
      {
        "name": "Training plan structure",
        "fixedness": 0.8,
        "subcategories": [
          {
            "name": "Plan philosophy",
            "elements": [
              {
                "text": "Hal Higdon Novice plan (run-focused, moderate mileage)",
                "axis": "plan_style",
                "direction": "traditional_mileage"
              },
              {
                "text": "Jeff Galloway run-walk-run method",
                "axis": "plan_style",
                "direction": "run_walk"
              },
              {
                "text": "McMillan/Pfitzinger plan (higher mileage, pace-based)",
                "axis": "plan_style",
                "direction": "traditional_mileage"
              }
            ]
          },
          {
            "name": "Weekly run types",
            "elements": [
              {
                "text": "Long slow distance (LSD) run"
              },
              {
                "text": "Easy/recovery runs"
              },
              {
                "text": "Tempo run (sustained comfortably-hard pace)"
              },
              {
                "text": "Interval/speed workouts (e.g. 400m/800m repeats)"
              },
              {
                "text": "Hill repeats"
              }
            ]
          },
          {
            "name": "Long run peak strategy",
            "elements": [
              {
                "text": "Peak long run to 20 miles (traditional cap)",
                "axis": "peak_distance",
                "direction": "20mi"
              },
              {
                "text": "Peak long run to 26+ miles (Galloway-style full distance rehearsal)",
                "axis": "peak_distance",
                "direction": "full_distance"
              },
              {
                "text": "3-week taper before race day"
              }
            ]
          }
        ]
      },
      {
        "name": "Cross-training and strength",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Strength work",
            "elements": [
              {
                "text": "Lower-body strength (squats, lunges, calf raises)"
              },
              {
                "text": "Core stability work (planks, dead bugs)"
              },
              {
                "text": "Single-leg/balance drills to prevent injury"
              }
            ]
          },
          {
            "name": "Low-impact cross-training",
            "elements": [
              {
                "text": "Cycling for aerobic volume without pounding"
              },
              {
                "text": "Swimming as active recovery"
              },
              {
                "text": "Elliptical sessions on rest-from-running days"
              }
            ]
          },
          {
            "name": "Mobility and injury prevention",
            "elements": [
              {
                "text": "Dynamic warm-up routine before runs"
              },
              {
                "text": "Foam rolling/self-myofascial release"
              },
              {
                "text": "Static stretching post-run"
              }
            ]
          }
        ]
      },
      {
        "name": "Nutrition and fueling",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Daily/training nutrition",
            "elements": [
              {
                "text": "Carbohydrate-focused meal timing around long runs"
              },
              {
                "text": "Hydration and electrolyte routine on hot runs"
              }
            ]
          },
          {
            "name": "Race-day fueling strategy",
            "elements": [
              {
                "text": "Energy gels every 45 minutes (e.g. GU, Maurten)",
                "axis": "fuel_type",
                "direction": "gels"
              },
              {
                "text": "Sports drink/chews as primary fuel",
                "axis": "fuel_type",
                "direction": "drinks_chews"
              },
              {
                "text": "Practicing race-day fuel during long training runs"
              }
            ]
          },
          {
            "name": "Carb-loading in final days",
            "elements": [
              {
                "text": "3-day carb-load before race"
              },
              {
                "text": "Pre-race dinner low in fiber/fat to avoid GI issues"
              }
            ]
          }
        ]
      },
      {
        "name": "Gear and equipment",
        "fixedness": 0.5,
        "subcategories": [
          {
            "name": "Footwear",
            "elements": [
              {
                "text": "Daily trainer shoe fitted for gait"
              },
              {
                "text": "Carbon-plated racing shoe for race day (e.g. Nike Vaporfly, Alphafly)"
              },
              {
                "text": "Rotating two shoe pairs to reduce injury risk"
              }
            ]
          },
          {
            "name": "Race-day gear",
            "elements": [
              {
                "text": "Moisture-wicking apparel tested in training (no cotton)"
              },
              {
                "text": "Anti-chafe balm (e.g. Body Glide)"
              },
              {
                "text": "GPS running watch for pacing"
              },
              {
                "text": "Hydration belt/vest vs relying on aid stations"
              }
            ]
          }
        ]
      },
      {
        "name": "Race selection and goal setting",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Goal type",
            "elements": [
              {
                "text": "Finish goal (just complete the distance)",
                "axis": "goal_type",
                "direction": "finish"
              },
              {
                "text": "Time goal (target pace, e.g. sub-4:00)",
                "axis": "goal_type",
                "direction": "time"
              }
            ]
          },
          {
            "name": "Course/race characteristics",
            "elements": [
              {
                "text": "Flat, fast course (e.g. Chicago, Berlin)",
                "axis": "course_type",
                "direction": "flat"
              },
              {
                "text": "Hilly/scenic course (e.g. Big Sur, New York)",
                "axis": "course_type",
                "direction": "hilly"
              },
              {
                "text": "Local/regional race for lower-stakes first attempt"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Current fitness/running base",
      "Hal Higdon Novice plan (run-focused, moderate mileage)",
      "Long slow distance (LSD) run",
      "Peak long run to 20 miles (traditional cap)",
      "Lower-body strength (squats, lunges, calf raises)",
      "Cycling for aerobic volume without pounding",
      "Dynamic warm-up routine before runs",
      "Carbohydrate-focused meal timing around long runs",
      "Energy gels every 45 minutes (e.g. GU, Maurten)",
      "3-day carb-load before race",
      "Daily trainer shoe fitted for gait",
      "Moisture-wicking apparel tested in training (no cotton)",
      "Finish goal (just complete the distance)",
      "Flat, fast course (e.g. Chicago, Berlin)"
    ]
  },
  {
    "label": "Wedding Toast",
    "input": "I need to give a toast at my best friend's wedding",
    "topic": "Best Man Toast for a 15-Year Best Friend (Warm, Slightly Funny, ~2 Minutes)",
    "categories": [
      {
        "name": "Structural Approach (pick one overall shape)",
        "subcategories": [
          {
            "name": "Chronological Story Arc",
            "axis": "structure",
            "direction": "chronological",
            "elements": [
              {
                "text": "Open with how you met, close with today",
                "axis": "structure",
                "direction": "chronological"
              },
              {
                "text": "Single origin anecdote stretched into full arc (meet → test → today)",
                "axis": "structure",
                "direction": "chronological"
              }
            ]
          },
          {
            "name": "Theme-First Structure (one metaphor threaded throughout)",
            "axis": "structure",
            "direction": "thematic",
            "elements": [
              {
                "text": "Running joke/metaphor (e.g. 'he's always been bad at directions, but he found the right one')",
                "axis": "structure",
                "direction": "thematic"
              },
              {
                "text": "Three-word throughline repeated at start, middle, end",
                "axis": "structure",
                "direction": "thematic"
              }
            ]
          },
          {
            "name": "Toast-to-Bride Pivot Structure",
            "axis": "structure",
            "direction": "pivot",
            "elements": [
              {
                "text": "Groom-focused story that pivots to 'then he met her'",
                "axis": "structure",
                "direction": "pivot"
              }
            ]
          }
        ]
      },
      {
        "name": "Opening Line (first 10 seconds)",
        "subcategories": [
          {
            "name": "Humor-Forward Openers",
            "axis": "opener",
            "direction": "funny",
            "elements": [
              {
                "text": "Self-deprecating joke about your own toast-giving nerves",
                "axis": "opener",
                "direction": "funny"
              },
              {
                "text": "Mock-serious 'I was told to keep this short' bit",
                "axis": "opener",
                "direction": "funny"
              },
              {
                "text": "Playful roast line about the groom's reaction to being asked to marry",
                "axis": "opener",
                "direction": "funny"
              }
            ]
          },
          {
            "name": "Sincere Openers",
            "axis": "opener",
            "direction": "warm",
            "elements": [
              {
                "text": "Direct statement: 'I've known this man for 15 years'",
                "axis": "opener",
                "direction": "warm"
              },
              {
                "text": "Address the couple by name and thank them for including you",
                "axis": "opener",
                "direction": "warm"
              }
            ]
          }
        ]
      },
      {
        "name": "Core Anecdote Bank (choose one signature story)",
        "subcategories": [
          {
            "name": "Origin-of-Friendship Stories",
            "elements": [
              {
                "text": "How-we-met story with an embarrassing detail"
              },
              {
                "text": "A shared dumb hobby/inside joke from early years"
              }
            ]
          },
          {
            "name": "Character-Revealing Stories",
            "elements": [
              {
                "text": "A time he showed up for you (loyalty proof point)"
              },
              {
                "text": "A funny flaw story that humanizes him (e.g. terrible cook, chronically late)"
              }
            ]
          },
          {
            "name": "Relationship-Witness Stories",
            "elements": [
              {
                "text": "First time you saw him with his now-spouse and noticed the change"
              },
              {
                "text": "A specific moment that proved this relationship was 'it'"
              }
            ]
          }
        ]
      },
      {
        "name": "Humor Calibration (how far to push the jokes)",
        "subcategories": [
          {
            "name": "Safe, Family-Friendly Jokes",
            "axis": "humor_risk",
            "direction": "safe",
            "elements": [
              {
                "text": "Light teasing about a harmless quirk (snoring, bad dancing)",
                "axis": "humor_risk",
                "direction": "safe"
              },
              {
                "text": "Callback joke to something from earlier in the toast",
                "axis": "humor_risk",
                "direction": "safe"
              }
            ]
          },
          {
            "name": "Edgier Roast-Style Jokes",
            "axis": "humor_risk",
            "direction": "edgy",
            "elements": [
              {
                "text": "Reference to an old dating disaster or ex",
                "axis": "humor_risk",
                "direction": "edgy"
              },
              {
                "text": "Joke about how surprised people are he 'landed' his spouse",
                "axis": "humor_risk",
                "direction": "edgy"
              }
            ]
          }
        ]
      },
      {
        "name": "Emotional Core (the sincere turn)",
        "subcategories": [
          {
            "name": "Praise of the Groom",
            "elements": [
              {
                "text": "Name one specific quality (loyalty, kindness) with proof, not just adjective"
              },
              {
                "text": "Statement of pride/gratitude for his friendship"
              }
            ]
          },
          {
            "name": "Praise of the Couple",
            "elements": [
              {
                "text": "Observation of how partner changed/completed him"
              },
              {
                "text": "Welcome statement to the spouse joining the friend group/family"
              }
            ]
          }
        ]
      },
      {
        "name": "Closing & Toast Call (final 15 seconds)",
        "subcategories": [
          {
            "name": "Classic Toast Lines",
            "axis": "closer",
            "direction": "classic",
            "elements": [
              {
                "text": "'To [Groom] and [Spouse]' simple raise-glass line",
                "axis": "closer",
                "direction": "classic"
              },
              {
                "text": "Short blessing/wish for their future",
                "axis": "closer",
                "direction": "classic"
              }
            ]
          },
          {
            "name": "Personalized/Callback Closers",
            "axis": "closer",
            "direction": "personalized",
            "elements": [
              {
                "text": "Callback to the opening joke or theme for a full-circle close",
                "axis": "closer",
                "direction": "personalized"
              },
              {
                "text": "Direct address to groom ('So here's to you, brother...')",
                "axis": "closer",
                "direction": "personalized"
              }
            ]
          }
        ]
      },
      {
        "name": "Delivery & Timing Mechanics",
        "subcategories": [
          {
            "name": "Length Control (targeting ~2 minutes / ~250-300 words)",
            "elements": [
              {
                "text": "Written index card with key phrases only (not full script)"
              },
              {
                "text": "Practice with a timer 3+ times before the wedding"
              }
            ]
          },
          {
            "name": "Delivery Techniques",
            "elements": [
              {
                "text": "Pause after the joke line for laughter before continuing"
              },
              {
                "text": "Make eye contact with groom during the sincere middle section"
              },
              {
                "text": "Raise glass and cue guests to stand/raise theirs at the very end"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Open with how you met, close with today",
      "Self-deprecating joke about your own toast-giving nerves",
      "How-we-met story with an embarrassing detail",
      "Light teasing about a harmless quirk (snoring, bad dancing)"
    ],
    "genre": "definition"
  },
  {
    "label": "Kitchen Renovation",
    "input": "I want to renovate my kitchen",
    "genre": "essay",
    "topic": "Kitchen Renovation Planning",
    "categories": [
      {
        "name": "Scope of Renovation",
        "fixedness": 0.85,
        "subcategories": [
          {
            "name": "Cosmetic Refresh (surface-level swap, no plumbing/electrical moves)",
            "axis": "scope",
            "direction": "cosmetic",
            "elements": [
              {
                "text": "Cabinet reface (new doors/veneer over existing boxes)",
                "axis": "scope",
                "direction": "cosmetic"
              },
              {
                "text": "Paint cabinets and walls only",
                "axis": "scope",
                "direction": "cosmetic"
              },
              {
                "text": "Swap countertops in place",
                "axis": "scope",
                "direction": "cosmetic"
              },
              {
                "text": "Replace hardware and lighting fixtures",
                "axis": "scope",
                "direction": "cosmetic"
              }
            ]
          },
          {
            "name": "Full Layout Overhaul (moving plumbing, electrical, or walls)",
            "axis": "scope",
            "direction": "full",
            "elements": [
              {
                "text": "Relocate sink/dishwasher plumbing lines",
                "axis": "scope",
                "direction": "full"
              },
              {
                "text": "Remove load-bearing wall (requires structural beam)",
                "axis": "scope",
                "direction": "full"
              },
              {
                "text": "Reconfigure cabinet footprint/work triangle",
                "axis": "scope",
                "direction": "full"
              },
              {
                "text": "Add or move a kitchen island with new electrical/plumbing runs",
                "axis": "scope",
                "direction": "full"
              }
            ]
          }
        ]
      },
      {
        "name": "Budget & Financing",
        "fixedness": 0.3,
        "subcategories": [
          {
            "name": "Funding Source",
            "elements": [
              {
                "text": "Cash savings"
              },
              {
                "text": "Home equity line of credit (HELOC)"
              },
              {
                "text": "Personal renovation loan"
              }
            ]
          },
          {
            "name": "Cost Allocation Strategy",
            "elements": [
              {
                "text": "Splurge on cabinetry, save on countertops"
              },
              {
                "text": "Splurge on appliances, save on finishes"
              },
              {
                "text": "Reserve 10-20% contingency for hidden issues (mold, old wiring, rot)"
              }
            ]
          }
        ]
      },
      {
        "name": "Layout & Design",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Kitchen Shape/Configuration",
            "elements": [
              {
                "text": "Galley layout (two parallel runs, narrow footprint)"
              },
              {
                "text": "L-shaped layout"
              },
              {
                "text": "U-shaped layout"
              },
              {
                "text": "Island layout (requires min. 42-48in clearance)"
              }
            ]
          },
          {
            "name": "Storage Style",
            "axis": "storage",
            "direction": "closed",
            "elements": [
              {
                "text": "Full-overlay cabinet doors (concealed hinges, flush look)",
                "axis": "storage",
                "direction": "closed"
              },
              {
                "text": "Pull-out pantry cabinets",
                "axis": "storage",
                "direction": "closed"
              }
            ]
          },
          {
            "name": "Open Shelving (exposed storage, no cabinet doors)",
            "axis": "storage",
            "direction": "open",
            "elements": [
              {
                "text": "Floating open shelves",
                "axis": "storage",
                "direction": "open"
              },
              {
                "text": "Glass-front display cabinets",
                "axis": "storage",
                "direction": "open"
              }
            ]
          }
        ]
      },
      {
        "name": "Materials & Finishes",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Countertop Material",
            "elements": [
              {
                "text": "Quartz (engineered, non-porous, no sealing needed)"
              },
              {
                "text": "Granite (natural stone, needs periodic sealing)"
              },
              {
                "text": "Butcher block (wood, warm look, prone to scratches/water damage)"
              },
              {
                "text": "Concrete (custom-poured, industrial look, can crack)"
              }
            ]
          },
          {
            "name": "Backsplash",
            "elements": [
              {
                "text": "Subway tile"
              },
              {
                "text": "Slab backsplash (matching countertop material, seamless)"
              },
              {
                "text": "Zellige tile (handmade Moroccan tile, irregular glaze)"
              }
            ]
          },
          {
            "name": "Flooring",
            "elements": [
              {
                "text": "Luxury vinyl plank (LVP, waterproof, budget-friendly)"
              },
              {
                "text": "Porcelain tile"
              },
              {
                "text": "Engineered hardwood"
              }
            ]
          }
        ]
      },
      {
        "name": "Appliances & Systems",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Cooking Appliance Fuel Type",
            "axis": "fuel",
            "direction": "gas",
            "elements": [
              {
                "text": "Gas range (requires existing/new gas line)",
                "axis": "fuel",
                "direction": "gas"
              }
            ]
          },
          {
            "name": "Electric/Induction Cooking (requires 240V circuit)",
            "axis": "fuel",
            "direction": "electric",
            "elements": [
              {
                "text": "Induction cooktop (magnetic heating, needs ferrous cookware)",
                "axis": "fuel",
                "direction": "electric"
              },
              {
                "text": "Standard electric coil/glass-top range",
                "axis": "fuel",
                "direction": "electric"
              }
            ]
          },
          {
            "name": "Ventilation",
            "elements": [
              {
                "text": "Ducted range hood (vents outside)"
              },
              {
                "text": "Recirculating hood (filters and returns air to room)"
              },
              {
                "text": "Downdraft vent (retracts into island/counter)"
              }
            ]
          }
        ]
      },
      {
        "name": "Permits, Codes & Contractors",
        "fixedness": 0.15,
        "subcategories": [
          {
            "name": "Project Delivery Method",
            "axis": "labor",
            "direction": "pro",
            "elements": [
              {
                "text": "General contractor (single point of accountability, oversees subs)",
                "axis": "labor",
                "direction": "pro"
              },
              {
                "text": "Design-build firm (design and construction under one contract)",
                "axis": "labor",
                "direction": "pro"
              }
            ]
          },
          {
            "name": "DIY/Owner-Managed (self-coordinated trades)",
            "axis": "labor",
            "direction": "diy",
            "elements": [
              {
                "text": "Self-manage individual trades (plumber, electrician, tiler separately)",
                "axis": "labor",
                "direction": "diy"
              },
              {
                "text": "DIY cosmetic work, hire pros for electrical/plumbing only",
                "axis": "labor",
                "direction": "diy"
              }
            ]
          },
          {
            "name": "Permitting Requirements",
            "elements": [
              {
                "text": "Electrical permit (for new circuits/outlets)"
              },
              {
                "text": "Plumbing permit (for moved fixtures)"
              },
              {
                "text": "Structural permit (for load-bearing wall removal)"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Cabinet reface (new doors/veneer over existing boxes)",
      "Budget & Financing",
      "Galley layout (two parallel runs, narrow footprint)",
      "Full-overlay cabinet doors (concealed hinges, flush look)",
      "Quartz (engineered, non-porous, no sealing needed)",
      "Subway tile",
      "Luxury vinyl plank (LVP, waterproof, budget-friendly)",
      "Gas range (requires existing/new gas line)",
      "Ducted range hood (vents outside)",
      "Permits, Codes & Contractors"
    ]
  },
  {
    "label": "UX Career Pivot",
    "input": "I am thinking about switching careers into UX design",
    "genre": "argument",
    "topic": "Switching careers into UX design",
    "categories": [
      {
        "name": "Entry path by prior background",
        "fixedness": 0.1,
        "subcategories": [
          {
            "name": "From visual/graphic design",
            "axis": "background",
            "direction": "visual-design",
            "elements": [
              {
                "text": "Reframe portfolio pieces around problem-solving rather than aesthetics"
              },
              {
                "text": "Add user research artifacts (personas, journey maps) to existing work"
              },
              {
                "text": "Learn interaction/prototyping tools (Figma auto-layout, components)"
              }
            ]
          },
          {
            "name": "From software development",
            "axis": "background",
            "direction": "dev",
            "elements": [
              {
                "text": "Lean into UX engineering / design systems roles"
              },
              {
                "text": "Build front-end prototypes to demonstrate design thinking"
              },
              {
                "text": "Translate technical constraints experience into feasibility-aware design"
              }
            ]
          },
          {
            "name": "From marketing/business analyst roles",
            "axis": "background",
            "direction": "marketing",
            "elements": [
              {
                "text": "Leverage stakeholder-management and data-analysis skills for UX research"
              },
              {
                "text": "Reposition A/B testing and funnel analysis experience as UX metrics work"
              }
            ]
          },
          {
            "name": "No prior design/tech experience (career changer)",
            "axis": "background",
            "direction": "none",
            "elements": [
              {
                "text": "Complete a structured bootcamp (e.g., General Assembly, Springboard) for credibility signal"
              },
              {
                "text": "Build 2-3 speculative case-study projects from scratch"
              },
              {
                "text": "Find an entry adjacent role (QA, support, research assistant) to get inside a product org"
              }
            ]
          }
        ]
      },
      {
        "name": "Learning path & credentials",
        "fixedness": 0.8,
        "subcategories": [
          {
            "name": "Structured programs (paid, fixed curriculum)",
            "axis": "learning-mode",
            "direction": "structured",
            "elements": [
              {
                "text": "Immersive bootcamp (8-12 weeks full-time)"
              },
              {
                "text": "Part-time bootcamp (3-6 months, evenings/weekends)"
              },
              {
                "text": "University certificate program (e.g., extension UX cert)"
              },
              {
                "text": "Google UX Design Professional Certificate (Coursera, self-paced)"
              }
            ]
          },
          {
            "name": "Self-directed learning (unpaid/low-cost, flexible pace)",
            "axis": "learning-mode",
            "direction": "self-directed",
            "elements": [
              {
                "text": "Follow a book-based curriculum (e.g., 'The Design of Everyday Things', 'Don't Make Me Think')"
              },
              {
                "text": "Recreate case studies of existing apps ('redesign challenges')"
              },
              {
                "text": "Join design critique communities (ADPList mentorship, Designer Hangout Slack)"
              }
            ]
          }
        ]
      },
      {
        "name": "Portfolio & proof of skill",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Project sourcing strategy",
            "elements": [
              {
                "text": "Freelance for a small business or nonprofit (real client, real constraints)"
              },
              {
                "text": "Volunteer via UX-for-good platforms (Catchafire, UX Ripple)"
              },
              {
                "text": "Speculative redesign of an app with usability problems"
              },
              {
                "text": "Contribute to open-source project design"
              }
            ]
          },
          {
            "name": "Case study presentation format",
            "elements": [
              {
                "text": "Problem-process-outcome narrative deck (Notion/PDF)"
              },
              {
                "text": "Interactive Figma prototype walkthrough"
              },
              {
                "text": "Short video case-study walkthrough (Loom) for async recruiter review"
              }
            ]
          }
        ]
      },
      {
        "name": "Specialization within UX",
        "fixedness": 0.85,
        "subcategories": [
          {
            "name": "Research-heavy track",
            "axis": "specialization",
            "direction": "research",
            "elements": [
              {
                "text": "UX researcher (qualitative interviews, usability testing)"
              },
              {
                "text": "UX/design strategist (mixed research + business framing)"
              }
            ]
          },
          {
            "name": "Craft-heavy track",
            "axis": "specialization",
            "direction": "craft",
            "elements": [
              {
                "text": "Product/interaction designer (screens, flows, prototypes)"
              },
              {
                "text": "UI/visual designer (systems, typography, visual polish)"
              },
              {
                "text": "Design systems designer (component libraries, tokens)"
              }
            ]
          },
          {
            "name": "Hybrid/adjacent tracks",
            "elements": [
              {
                "text": "Product designer generalist (research + UI + some front-end)"
              },
              {
                "text": "Content/UX writer specializing in microcopy and flows"
              }
            ]
          }
        ]
      },
      {
        "name": "Job market & entry strategy",
        "fixedness": 0.5,
        "subcategories": [
          {
            "name": "Target employer type",
            "axis": "employer-type",
            "direction": "n/a",
            "elements": [
              {
                "text": "Early-stage startup (generalist scope, faster title jump)"
              },
              {
                "text": "Agency/consultancy (varied client projects, faster portfolio building)"
              },
              {
                "text": "Large tech company (structured mentorship, narrower scope)"
              }
            ]
          },
          {
            "name": "Transition tactics while employed",
            "elements": [
              {
                "text": "Internal transfer by volunteering for UX-adjacent projects at current employer"
              },
              {
                "text": "Negotiate a hybrid title (e.g., 'UX-adjacent analyst') as stepping stone"
              },
              {
                "text": "Network via local IxDA/UXPA chapter meetups"
              }
            ]
          }
        ]
      },
      {
        "name": "Financial & timeline planning",
        "fixedness": 0.2,
        "subcategories": [
          {
            "name": "Transition pacing",
            "axis": "pacing",
            "direction": "n/a",
            "elements": [
              {
                "text": "Full quit-and-retrain (fast but high financial risk)"
              },
              {
                "text": "Nights-and-weekends transition while keeping current job (slower, lower risk)"
              },
              {
                "text": "Reduced-hours/sabbatical transition (moderate risk, moderate speed)"
              }
            ]
          },
          {
            "name": "Budget for retraining",
            "elements": [
              {
                "text": "Low-cost path (<$500: books, free communities, self-taught)"
              },
              {
                "text": "Mid-cost path ($500-3000: Coursera cert, part-time bootcamp)"
              },
              {
                "text": "High-cost path ($8000-15000+: immersive bootcamp tuition)"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Entry path by prior background",
      "Immersive bootcamp (8-12 weeks full-time)",
      "Follow a book-based curriculum (e.g., 'The Design of Everyday Things', 'Don't Make Me Think')",
      "Freelance for a small business or nonprofit (real client, real constraints)",
      "Problem-process-outcome narrative deck (Notion/PDF)",
      "UX researcher (qualitative interviews, usability testing)",
      "Product/interaction designer (screens, flows, prototypes)",
      "Product designer generalist (research + UI + some front-end)",
      "Early-stage startup (generalist scope, faster title jump)",
      "Internal transfer by volunteering for UX-adjacent projects at current employer",
      "Financial & timeline planning"
    ]
  },
  {
    "label": "Coffee Cart Business",
    "input": "I want to start a small mobile coffee cart business",
    "genre": "action_item",
    "topic": "Starting a small mobile coffee cart business",
    "categories": [
      {
        "name": "Business model and location type",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Recurring fixed-pitch model (same spot daily/weekly)",
            "axis": "model",
            "direction": "fixed",
            "elements": [
              {
                "text": "Sidewalk/street vending permit spot (city-issued, location-specific license)",
                "axis": "model",
                "direction": "fixed"
              },
              {
                "text": "Corporate campus contract (recurring gig serving one employer's lot)",
                "axis": "model",
                "direction": "fixed"
              },
              {
                "text": "Farmers market stall (weekly recurring booth fee)",
                "axis": "model",
                "direction": "fixed"
              },
              {
                "text": "Gas station/retail lot partnership (rent a corner of an existing lot)"
              }
            ]
          },
          {
            "name": "Event catering model (booked one-off gigs, no fixed pitch)",
            "axis": "model",
            "direction": "mobile-event",
            "elements": [
              {
                "text": "Wedding and private party catering"
              },
              {
                "text": "Corporate meeting/conference catering"
              },
              {
                "text": "Festival and concert vending (day-rate booth fee to organizer)"
              },
              {
                "text": "Farm-to-cart pop-up at breweries or wineries"
              }
            ]
          },
          {
            "name": "Hybrid roaming model (moves between multiple spots by schedule)",
            "elements": [
              {
                "text": "Rotating weekday route (different neighborhood/office park each day)"
              },
              {
                "text": "Seasonal relocation (beach town summers, ski town winters)"
              }
            ]
          }
        ]
      },
      {
        "name": "Cart type and equipment",
        "fixedness": 0.75,
        "subcategories": [
          {
            "name": "Cart platform (the vehicle/structure itself)",
            "elements": [
              {
                "text": "Trailer-mounted cart (towed behind a vehicle, needs a hitch and tow-capable vehicle)",
                "axis": "platform",
                "direction": "trailer"
              },
              {
                "text": "Push cart / walk-behind cart (no towing, limited storage and water capacity)",
                "axis": "platform",
                "direction": "push"
              },
              {
                "text": "Converted vending truck or van (full commercial kitchen build-out)",
                "axis": "platform",
                "direction": "truck"
              },
              {
                "text": "Bicycle-powered cart (pedal or e-assist, niche for dense urban routes)",
                "axis": "platform",
                "direction": "bike"
              }
            ]
          },
          {
            "name": "Espresso and brewing equipment",
            "elements": [
              {
                "text": "Propane-fired espresso machine (no shore power needed, common for carts)",
                "axis": "power",
                "direction": "propane"
              },
              {
                "text": "Battery/generator-powered electric espresso machine",
                "axis": "power",
                "direction": "electric"
              },
              {
                "text": "Manual lever espresso machine (low power draw, requires more barista skill)"
              },
              {
                "text": "Pour-over/batch brew station (for drip coffee alongside espresso)"
              }
            ]
          },
          {
            "name": "Water and power systems",
            "elements": [
              {
                "text": "Onboard fresh/greywater tank system (self-contained, required by most health depts)"
              },
              {
                "text": "Municipal hookup dependency (relies on host site's water/power)"
              },
              {
                "text": "Solar panel + battery bank setup"
              }
            ]
          }
        ]
      },
      {
        "name": "Licensing, permits, and compliance",
        "fixedness": 0.15,
        "subcategories": [
          {
            "name": "Health department requirements",
            "elements": [
              {
                "text": "Mobile food unit permit (health-dept inspection of the cart itself)"
              },
              {
                "text": "Commissary kitchen agreement (licensed base kitchen for prep, cleaning, and overnight storage)"
              },
              {
                "text": "ServSafe or local food handler certification"
              }
            ]
          },
          {
            "name": "Local and vending-specific licenses",
            "elements": [
              {
                "text": "General business license/registration"
              },
              {
                "text": "Street vending permit (specific to right-of-way/sidewalk sales)"
              },
              {
                "text": "Fire department approval (required if using propane onboard)"
              },
              {
                "text": "Zoning variance for private-lot vending"
              }
            ]
          },
          {
            "name": "Insurance",
            "elements": [
              {
                "text": "General liability policy"
              },
              {
                "text": "Commercial auto policy (if towing/driving the cart)"
              },
              {
                "text": "Product liability coverage"
              }
            ]
          }
        ]
      },
      {
        "name": "Sourcing and menu design",
        "fixedness": 0.85,
        "subcategories": [
          {
            "name": "Coffee sourcing model",
            "elements": [
              {
                "text": "Local roaster partnership (buy pre-roasted, house-blend branding)",
                "axis": "sourcing",
                "direction": "buy-roasted"
              },
              {
                "text": "Own small-batch roasting (roast green beans yourself for differentiation)",
                "axis": "sourcing",
                "direction": "self-roast"
              },
              {
                "text": "Direct-trade single-origin beans (higher cost, story-driven marketing)"
              }
            ]
          },
          {
            "name": "Menu breadth",
            "elements": [
              {
                "text": "Espresso-only minimalist menu (fast service, small footprint)",
                "axis": "menu",
                "direction": "minimal"
              },
              {
                "text": "Full specialty menu (espresso, drip, cold brew, seasonal lattes)",
                "axis": "menu",
                "direction": "full"
              },
              {
                "text": "Add-on food pairings (pastries, breakfast items from local bakery)"
              },
              {
                "text": "Non-coffee alternatives (matcha, chai, hot chocolate) for broader appeal"
              }
            ]
          }
        ]
      },
      {
        "name": "Startup capital and financing",
        "fixedness": 0.4,
        "subcategories": [
          {
            "name": "Cart acquisition financing",
            "elements": [
              {
                "text": "Buy new custom-built cart from a manufacturer",
                "axis": "acquisition",
                "direction": "new"
              },
              {
                "text": "Buy used cart secondhand (lower cost, inspect for equipment condition)",
                "axis": "acquisition",
                "direction": "used"
              },
              {
                "text": "Equipment leasing arrangement"
              }
            ]
          },
          {
            "name": "Funding sources",
            "elements": [
              {
                "text": "SBA microloan"
              },
              {
                "text": "Personal savings/bootstrap"
              },
              {
                "text": "Equipment financing loan (secured against the cart itself)"
              }
            ]
          }
        ]
      },
      {
        "name": "Marketing and customer acquisition",
        "fixedness": 0.8,
        "subcategories": [
          {
            "name": "Brand and visibility",
            "elements": [
              {
                "text": "Cart wrap/signage design (visual branding on the cart itself)"
              },
              {
                "text": "Instagram/TikTok location-of-the-day posting"
              },
              {
                "text": "Loyalty punch-card or app program"
              }
            ]
          },
          {
            "name": "Booking and repeat business channels",
            "elements": [
              {
                "text": "Direct event-booking website with calendar"
              },
              {
                "text": "Third-party catering marketplace listing"
              },
              {
                "text": "Corporate B2B outreach for recurring office contracts"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Sidewalk/street vending permit spot (city-issued, location-specific license)",
      "Rotating weekday route (different neighborhood/office park each day)",
      "Trailer-mounted cart (towed behind a vehicle, needs a hitch and tow-capable vehicle)",
      "Propane-fired espresso machine (no shore power needed, common for carts)",
      "Onboard fresh/greywater tank system (self-contained, required by most health depts)",
      "Licensing, permits, and compliance",
      "Local roaster partnership (buy pre-roasted, house-blend branding)",
      "Espresso-only minimalist menu (fast service, small footprint)",
      "Buy new custom-built cart from a manufacturer",
      "SBA microloan",
      "Cart wrap/signage design (visual branding on the cart itself)",
      "Direct event-booking website with calendar"
    ]
  },
  {
    "label": "Japan Trip",
    "input": "I am planning a two-week trip to Japan",
    "genre": "summary",
    "topic": "Planning a Two-Week Trip to Japan",
    "categories": [
      {
        "name": "Region/Itinerary Focus",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Golden Route (Tokyo–Osaka classic corridor, first-timer friendly)",
            "axis": "itinerary_style",
            "direction": "golden_route",
            "elements": [
              {
                "text": "Tokyo → Kyoto → Osaka (linear Shinkansen route)",
                "axis": "itinerary_style",
                "direction": "golden_route"
              },
              {
                "text": "Add Hakone (day-trip onsen/Mt. Fuji viewpoint) between Tokyo and Kyoto"
              },
              {
                "text": "Add Nara (day-trip, deer park + Todaiji Buddha) from Kyoto/Osaka"
              },
              {
                "text": "Add Hiroshima/Miyajima extension (Peace Park + floating torii gate)"
              }
            ]
          },
          {
            "name": "Regional/Off-Path Focus (fewer crowds, requires more logistics)",
            "axis": "itinerary_style",
            "direction": "regional",
            "elements": [
              {
                "text": "Tohoku region (northern Honshu, rural onsen towns, less English signage)",
                "axis": "itinerary_style",
                "direction": "regional"
              },
              {
                "text": "Shikoku 88-temple pilgrimage route (partial, driving loop)",
                "axis": "itinerary_style",
                "direction": "regional"
              },
              {
                "text": "Kyushu (Fukuoka, Beppu hot springs, Kagoshima volcano)",
                "axis": "itinerary_style",
                "direction": "regional"
              },
              {
                "text": "Hokkaido (Sapporo, Niseko, seasonal snow/flower focus)",
                "axis": "itinerary_style",
                "direction": "regional"
              }
            ]
          },
          {
            "name": "Single-Base Deep Dive (one city, slow travel)",
            "axis": "itinerary_style",
            "direction": "single_base",
            "elements": [
              {
                "text": "Kyoto-based (day trips to Nara, Osaka, Uji only)",
                "axis": "itinerary_style",
                "direction": "single_base"
              },
              {
                "text": "Tokyo-based (day trips to Kamakura, Nikko, Yokohama only)",
                "axis": "itinerary_style",
                "direction": "single_base"
              }
            ]
          }
        ]
      },
      {
        "name": "Season & Timing",
        "fixedness": 0.2,
        "subcategories": [
          {
            "name": "Cherry Blossom Season (late Mar–early Apr, sakura, peak crowds/prices)",
            "axis": "season",
            "direction": "sakura",
            "elements": [
              {
                "text": "Book Kyoto hanami spots (Maruyama Park, Philosopher's Path) 6+ months ahead",
                "axis": "season",
                "direction": "sakura"
              },
              {
                "text": "Track sakura zensen (blossom forecast front) to time route north-to-south",
                "axis": "season",
                "direction": "sakura"
              }
            ]
          },
          {
            "name": "Autumn Foliage Season (mid-Nov–early Dec, koyo, second peak crowds)",
            "axis": "season",
            "direction": "autumn",
            "elements": [
              {
                "text": "Arashiyama/Kyoto temple foliage viewing",
                "axis": "season",
                "direction": "autumn"
              },
              {
                "text": "Nikko foliage (Toshogu Shrine area, day trip from Tokyo)",
                "axis": "season",
                "direction": "autumn"
              }
            ]
          },
          {
            "name": "Shoulder/Off-Season (Jun–Aug humid heat, Jan–Feb cold, lower costs)",
            "axis": "season",
            "direction": "off_peak",
            "elements": [
              {
                "text": "Summer festival focus (Gion Matsuri Kyoto, fireworks/hanabi displays)",
                "axis": "season",
                "direction": "off_peak"
              },
              {
                "text": "Winter illuminations + snow monkeys (Jigokudani, Nagano)",
                "axis": "season",
                "direction": "off_peak"
              },
              {
                "text": "Rainy season (tsuyu, mid-Jun–mid-Jul) indoor/museum-heavy planning"
              }
            ]
          }
        ]
      },
      {
        "name": "Transportation & Passes",
        "fixedness": 0.55,
        "subcategories": [
          {
            "name": "Rail Pass Strategy",
            "axis": "rail_pass",
            "direction": "jr_pass",
            "elements": [
              {
                "text": "JR Pass nationwide (7/14/21-day, unlimited JR trains incl. most Shinkansen)",
                "axis": "rail_pass",
                "direction": "jr_pass"
              },
              {
                "text": "Regional JR pass (e.g. JR Kansai Wide Pass) for shorter regional focus",
                "axis": "rail_pass",
                "direction": "regional_pass"
              },
              {
                "text": "Pay-as-you-go with IC card (Suica/Pasmo tap card, no pass) for city-heavy trips",
                "axis": "rail_pass",
                "direction": "no_pass"
              }
            ]
          },
          {
            "name": "Intercity Transport Mode",
            "elements": [
              {
                "text": "Shinkansen bullet train (fastest, most expensive without pass)"
              },
              {
                "text": "Overnight/highway bus (budget option, saves a hotel night)"
              },
              {
                "text": "Rental car (only practical for rural regions like Shikoku/Hokkaido)"
              }
            ]
          },
          {
            "name": "Airport Entry/Exit Points",
            "elements": [
              {
                "text": "Fly into Narita/Haneda, out of Kansai (Osaka) — open-jaw itinerary"
              },
              {
                "text": "Round-trip through single hub (Tokyo or Osaka only)"
              }
            ]
          }
        ]
      },
      {
        "name": "Accommodation Style",
        "fixedness": 0.75,
        "subcategories": [
          {
            "name": "Traditional Lodging",
            "elements": [
              {
                "text": "Ryokan stay with kaiseki dinner (multi-course traditional meal) + onsen"
              },
              {
                "text": "Shukubo temple lodging (Koyasan monastery stay, morning prayers)"
              }
            ]
          },
          {
            "name": "Budget/Modern Lodging",
            "elements": [
              {
                "text": "Capsule hotel (bunk-pod rooms, common in stations)"
              },
              {
                "text": "Business hotel chain (compact Western-style rooms, e.g. APA, Toyoko Inn)"
              },
              {
                "text": "Manga/internet cafe (overnight budget stay, common for late transit)"
              }
            ]
          },
          {
            "name": "Neighborhood Base Choice (per city)",
            "elements": [
              {
                "text": "Shinjuku/Shibuya base in Tokyo (nightlife, transit hub)"
              },
              {
                "text": "Asakusa base in Tokyo (traditional, closer to Senso-ji, quieter)"
              }
            ]
          }
        ]
      },
      {
        "name": "Cultural Experiences & Activities",
        "fixedness": 0.85,
        "subcategories": [
          {
            "name": "Nature & Scenic",
            "elements": [
              {
                "text": "Mt. Fuji viewing/climbing season (climbing season only Jul–Sep)"
              },
              {
                "text": "Arashiyama bamboo grove + monkey park"
              },
              {
                "text": "Fushimi Inari torii gate hike (thousands of red gates, Kyoto)"
              }
            ]
          },
          {
            "name": "Modern/Pop Culture",
            "elements": [
              {
                "text": "Akihabara anime/electronics district"
              },
              {
                "text": "teamLab digital art museum (immersive light installations)"
              },
              {
                "text": "Studio Ghibli Museum/Park (timed-entry tickets, book early)"
              }
            ]
          },
          {
            "name": "Food Experiences",
            "elements": [
              {
                "text": "Tsukiji Outer Market/Toyosu Market sushi breakfast"
              },
              {
                "text": "Depachika department store food halls (gourmet takeaway)"
              },
              {
                "text": "Izakaya crawl (pub-style small plates, evening dining)"
              }
            ]
          }
        ]
      },
      {
        "name": "Budget & Logistics Prep",
        "fixedness": 0.3,
        "subcategories": [
          {
            "name": "Money Handling",
            "elements": [
              {
                "text": "Cash-heavy budgeting (many rural shops/temples are cash-only)"
              },
              {
                "text": "7-Eleven ATM withdrawals (reliable for foreign cards)"
              }
            ]
          },
          {
            "name": "Connectivity",
            "elements": [
              {
                "text": "Pocket WiFi rental (pickup at airport)"
              },
              {
                "text": "eSIM data plan (no physical pickup needed)"
              }
            ]
          },
          {
            "name": "Luggage Logistics",
            "elements": [
              {
                "text": "Takkyubin luggage forwarding service (send bags ahead between hotels)"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Tokyo → Kyoto → Osaka (linear Shinkansen route)",
      "Season & Timing",
      "JR Pass nationwide (7/14/21-day, unlimited JR trains incl. most Shinkansen)",
      "Shinkansen bullet train (fastest, most expensive without pass)",
      "Fly into Narita/Haneda, out of Kansai (Osaka) — open-jaw itinerary",
      "Ryokan stay with kaiseki dinner (multi-course traditional meal) + onsen",
      "Capsule hotel (bunk-pod rooms, common in stations)",
      "Shinjuku/Shibuya base in Tokyo (nightlife, transit hub)",
      "Mt. Fuji viewing/climbing season (climbing season only Jul–Sep)",
      "Akihabara anime/electronics district",
      "Tsukiji Outer Market/Toyosu Market sushi breakfast",
      "Budget & Logistics Prep"
    ]
  },
  {
    "label": "New Puppy Training",
    "input": "I just adopted a puppy and need to train it",
    "genre": "story",
    "topic": "Training a newly adopted puppy",
    "categories": [
      {
        "name": "Training goal",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Housebreaking (potty training)",
            "axis": "goal",
            "direction": "housebreaking",
            "elements": [
              {
                "text": "Crate training (confinement to prevent accidents when unsupervised)"
              },
              {
                "text": "Scheduled potty breaks (fixed times tied to eating/waking/play)"
              },
              {
                "text": "Bell training (teaching puppy to signal at the door)"
              },
              {
                "text": "Umbilical cord method (leashing puppy to you indoors to catch cues)"
              }
            ]
          },
          {
            "name": "Basic obedience",
            "axis": "goal",
            "direction": "obedience",
            "elements": [
              {
                "text": "Sit"
              },
              {
                "text": "Stay (holding position until released)"
              },
              {
                "text": "Recall (\"come\" — returning reliably when called)"
              },
              {
                "text": "Loose-leash walking (walking without pulling)"
              },
              {
                "text": "Leave it / drop it (releasing or ignoring an item on cue)"
              }
            ]
          },
          {
            "name": "Socialization",
            "axis": "goal",
            "direction": "socialization",
            "elements": [
              {
                "text": "Puppy socialization class (structured exposure to other dogs)"
              },
              {
                "text": "Novel surface and sound exposure (grates, umbrellas, vacuum noise)"
              },
              {
                "text": "Handling exercises (getting comfortable with paws, ears, mouth touched)"
              },
              {
                "text": "Stranger greetings (controlled introductions to new people)"
              }
            ]
          },
          {
            "name": "Behavior issues",
            "axis": "goal",
            "direction": "behavior",
            "elements": [
              {
                "text": "Nipping/biting inhibition (redirecting mouthy play)"
              },
              {
                "text": "Jumping on people"
              },
              {
                "text": "Resource guarding (protecting food/toys from people or dogs)"
              },
              {
                "text": "Separation anxiety (distress when left alone)"
              },
              {
                "text": "Excessive barking"
              }
            ]
          }
        ]
      },
      {
        "name": "Training method / philosophy",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Reward-based methods",
            "axis": "method",
            "direction": "reward-based",
            "elements": [
              {
                "text": "Clicker training (marker-based positive reinforcement)"
              },
              {
                "text": "Lure-and-reward (using treats to guide body position)"
              },
              {
                "text": "Shaping (rewarding successive approximations toward a behavior)"
              }
            ]
          },
          {
            "name": "Balanced/traditional methods",
            "axis": "method",
            "direction": "balanced",
            "elements": [
              {
                "text": "Verbal correction ('no' or interrupter word)"
              },
              {
                "text": "Prong or e-collar use (aversive correction tools, controversial)"
              },
              {
                "text": "Leash pop correction (physical leash guidance)"
              }
            ]
          }
        ]
      },
      {
        "name": "Tools & equipment",
        "fixedness": 0.8,
        "subcategories": [
          {
            "name": "Containment & walking gear",
            "elements": [
              {
                "text": "Wire crate (open-sided, portable confinement)"
              },
              {
                "text": "Exercise pen / x-pen (larger fenced play area)"
              },
              {
                "text": "Standard flat collar with 6-ft leash"
              }
            ]
          },
          {
            "name": "Reward & marker tools",
            "elements": [
              {
                "text": "Training treat pouch"
              },
              {
                "text": "Clicker device"
              },
              {
                "text": "High-value treats (small, soft, high-motivation rewards)"
              }
            ]
          },
          {
            "name": "Enrichment tools",
            "elements": [
              {
                "text": "Puzzle feeder / snuffle mat"
              },
              {
                "text": "Kong stuffed with frozen filling"
              },
              {
                "text": "Teething-safe chew toys"
              }
            ]
          }
        ]
      },
      {
        "name": "Developmental stage & timing",
        "fixedness": 0.2,
        "subcategories": [
          {
            "name": "Critical socialization window (roughly 3–14 weeks)",
            "elements": [
              {
                "text": "Pre-vaccination controlled exposure (carrying puppy in low-risk settings before full vaccine series)"
              },
              {
                "text": "Fear period awareness (avoiding traumatic exposure around 8-11 weeks)"
              }
            ]
          },
          {
            "name": "Adolescent phase (roughly 6-18 months)",
            "elements": [
              {
                "text": "Reinforcing basics amid regression (re-teaching known cues that seem 'forgotten')"
              },
              {
                "text": "Adding distraction/duration/distance (proofing commands in harder contexts)"
              }
            ]
          }
        ]
      },
      {
        "name": "Professional support",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Group settings",
            "elements": [
              {
                "text": "Puppy kindergarten class (group class focused on basics + socialization)"
              },
              {
                "text": "Local dog park meetups"
              }
            ]
          },
          {
            "name": "One-on-one/professional help",
            "elements": [
              {
                "text": "Private certified trainer (CPDT-KA credentialed)"
              },
              {
                "text": "Board-and-train program (trainer houses and trains dog for a set period)"
              },
              {
                "text": "Veterinary behaviorist referral (for serious issues like aggression or severe anxiety)"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Crate training (confinement to prevent accidents when unsupervised)",
      "Sit",
      "Puppy socialization class (structured exposure to other dogs)",
      "Nipping/biting inhibition (redirecting mouthy play)",
      "Clicker training (marker-based positive reinforcement)",
      "Verbal correction ('no' or interrupter word)",
      "Wire crate (open-sided, portable confinement)",
      "Training treat pouch",
      "Puzzle feeder / snuffle mat",
      "Developmental stage & timing",
      "Puppy kindergarten class (group class focused on basics + socialization)",
      "Private certified trainer (CPDT-KA credentialed)"
    ]
  },
  {
    "label": "AWS Certification",
    "input": "I am studying for the AWS Solutions Architect certification",
    "genre": "definition",
    "topic": "Studying for AWS Solutions Architect Certification",
    "categories": [
      {
        "name": "Certification level (which exam you're actually targeting)",
        "fixedness": 0.3,
        "subcategories": [
          {
            "name": "Associate (SAA-C03) — entry-level, 130 min, 65 questions, no prerequisites",
            "axis": "cert_level",
            "direction": "associate",
            "elements": [
              {
                "text": "SAA-C03 exam (current version, replaced SAA-C02 in 2022)",
                "axis": "cert_level",
                "direction": "associate"
              },
              {
                "text": "Target: 1 year hands-on AWS experience recommended by AWS",
                "axis": "cert_level",
                "direction": "associate"
              }
            ]
          },
          {
            "name": "Professional (SAP-C02) — advanced, 180 min, 75 questions, Associate-level knowledge assumed",
            "axis": "cert_level",
            "direction": "professional",
            "elements": [
              {
                "text": "SAP-C02 exam (current version, replaced SAP-C01 in 2022)",
                "axis": "cert_level",
                "direction": "professional"
              },
              {
                "text": "Multi-account, org-wide migration & cost-optimization scenarios",
                "axis": "cert_level",
                "direction": "professional"
              }
            ]
          }
        ]
      },
      {
        "name": "Core domains tested (exam blueprint weightings)",
        "fixedness": 0.15,
        "subcategories": [
          {
            "name": "Domain 1: Design Resilient Architectures (~26%)",
            "elements": [
              {
                "text": "Multi-AZ / Multi-Region failover patterns"
              },
              {
                "text": "Decoupling with SQS/SNS/EventBridge"
              },
              {
                "text": "RTO/RPO-driven disaster recovery strategy (backup & restore vs pilot light vs warm standby vs multi-site)"
              }
            ]
          },
          {
            "name": "Domain 2: Design High-Performing Architectures (~24%)",
            "elements": [
              {
                "text": "Storage class selection (S3 Standard/IA/Glacier tiers)"
              },
              {
                "text": "Caching layers (ElastiCache, CloudFront)"
              },
              {
                "text": "Compute selection (EC2 vs Lambda vs Fargate vs Batch)"
              }
            ]
          },
          {
            "name": "Domain 3: Design Secure Architectures (~30%)",
            "elements": [
              {
                "text": "IAM policy design (least privilege, resource-based vs identity-based policies)"
              },
              {
                "text": "Data encryption (KMS envelope encryption, at-rest vs in-transit)"
              },
              {
                "text": "Network isolation (VPC security groups vs NACLs)"
              }
            ]
          },
          {
            "name": "Domain 4: Design Cost-Optimized Architectures (~20%)",
            "elements": [
              {
                "text": "Purchasing options (On-Demand vs Reserved vs Savings Plans vs Spot)"
              },
              {
                "text": "Right-sizing with Compute Optimizer / Trusted Advisor"
              }
            ]
          }
        ]
      },
      {
        "name": "Study materials & prep resources",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Video/course platforms",
            "elements": [
              {
                "text": "Adrian Cantrill's SAA-C03 course"
              },
              {
                "text": "Stephane Maarek's Udemy SAA-C03 course"
              },
              {
                "text": "AWS Skill Builder official digital training"
              }
            ]
          },
          {
            "name": "Practice exams & question banks",
            "elements": [
              {
                "text": "Tutorials Dojo practice tests (Jon Bonso)"
              },
              {
                "text": "AWS official practice question set"
              },
              {
                "text": "Whizlabs practice exams"
              }
            ]
          },
          {
            "name": "Reference documentation",
            "elements": [
              {
                "text": "AWS Well-Architected Framework whitepaper"
              },
              {
                "text": "AWS FAQs pages (per-service)"
              }
            ]
          }
        ]
      },
      {
        "name": "Hands-on practice approach",
        "fixedness": 0.75,
        "subcategories": [
          {
            "name": "Sandbox environment choice",
            "elements": [
              {
                "text": "Personal AWS account within Free Tier limits",
                "axis": "sandbox",
                "direction": "personal"
              },
              {
                "text": "AWS Skill Builder cloud sandbox labs (pre-provisioned, time-boxed)",
                "axis": "sandbox",
                "direction": "provided_labs"
              }
            ]
          },
          {
            "name": "Guided lab platforms",
            "elements": [
              {
                "text": "A Cloud Guru / Pluralsight hands-on labs"
              },
              {
                "text": "Qwiklabs / Skill Builder lab challenges"
              }
            ]
          },
          {
            "name": "Self-directed build projects",
            "elements": [
              {
                "text": "3-tier VPC architecture (public/private/data subnets)"
              },
              {
                "text": "Static site with S3 + CloudFront + Route 53"
              },
              {
                "text": "Serverless API with API Gateway + Lambda + DynamoDB"
              }
            ]
          }
        ]
      },
      {
        "name": "Exam logistics & scheduling",
        "fixedness": 0.1,
        "subcategories": [
          {
            "name": "Testing format",
            "elements": [
              {
                "text": "Pearson VUE testing center (in-person)",
                "axis": "exam_format",
                "direction": "in_person"
              },
              {
                "text": "Online proctored exam (via OnVUE, home setup)",
                "axis": "exam_format",
                "direction": "online"
              }
            ]
          },
          {
            "name": "Registration & fees",
            "elements": [
              {
                "text": "Associate exam fee ($150 USD)",
                "axis": "cert_level",
                "direction": "associate"
              },
              {
                "text": "Professional exam fee ($300 USD)",
                "axis": "cert_level",
                "direction": "professional"
              },
              {
                "text": "AWS Certification voucher (from re/Start or partner programs, covers retake)"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Certification level (which exam you're actually targeting)",
      "Core domains tested (exam blueprint weightings)",
      "Adrian Cantrill's SAA-C03 course",
      "Tutorials Dojo practice tests (Jon Bonso)",
      "AWS Well-Architected Framework whitepaper",
      "Personal AWS account within Free Tier limits",
      "A Cloud Guru / Pluralsight hands-on labs",
      "3-tier VPC architecture (public/private/data subnets)",
      "Exam logistics & scheduling"
    ]
  },
  {
    "label": "First Car Purchase",
    "input": "I want to buy my first car",
    "genre": "essay",
    "topic": "Buying my first car",
    "categories": [
      {
        "name": "Budget range",
        "fixedness": 0.3,
        "subcategories": [
          {
            "name": "Economy (under $15k, new or used)",
            "axis": "budget",
            "direction": "economy",
            "elements": [
              {
                "text": "Certified pre-owned (CPO) compact sedan, e.g. Honda Civic",
                "axis": "budget",
                "direction": "economy"
              },
              {
                "text": "Base-trim new subcompact, e.g. Nissan Versa",
                "axis": "budget",
                "direction": "economy"
              },
              {
                "text": "3-5 year old used hatchback with under 60k miles",
                "axis": "budget",
                "direction": "economy"
              }
            ]
          },
          {
            "name": "Mid-range ($15k-$30k)",
            "axis": "budget",
            "direction": "mid",
            "elements": [
              {
                "text": "New mainstream sedan, e.g. Toyota Camry",
                "axis": "budget",
                "direction": "mid"
              },
              {
                "text": "Lightly used compact SUV, e.g. Mazda CX-5",
                "axis": "budget",
                "direction": "mid"
              },
              {
                "text": "Certified pre-owned entry-level luxury sedan",
                "axis": "budget",
                "direction": "mid"
              }
            ]
          },
          {
            "name": "Premium ($30k+)",
            "axis": "budget",
            "direction": "premium",
            "elements": [
              {
                "text": "New luxury SUV, e.g. Audi Q5",
                "axis": "budget",
                "direction": "premium"
              },
              {
                "text": "New electric vehicle with tax credit, e.g. Tesla Model 3",
                "axis": "budget",
                "direction": "premium"
              },
              {
                "text": "Performance trim of mainstream brand, e.g. Civic Si",
                "axis": "budget",
                "direction": "premium"
              }
            ]
          }
        ]
      },
      {
        "name": "New vs used",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Buying new (factory warranty, no prior wear)",
            "axis": "condition",
            "direction": "new",
            "elements": [
              {
                "text": "Dealer-ordered build (wait 4-12 weeks for exact spec)",
                "axis": "condition",
                "direction": "new"
              },
              {
                "text": "In-stock dealer inventory (immediate but limited trims)",
                "axis": "condition",
                "direction": "new"
              },
              {
                "text": "End-of-model-year clearance unit",
                "axis": "condition",
                "direction": "new"
              }
            ]
          },
          {
            "name": "Buying used (lower price, depreciation already absorbed)",
            "axis": "condition",
            "direction": "used",
            "elements": [
              {
                "text": "Certified Pre-Owned (CPO, manufacturer-backed inspection & extended warranty)",
                "axis": "condition",
                "direction": "used"
              },
              {
                "text": "Private-party sale (cheaper but no dealer recourse)",
                "axis": "condition",
                "direction": "used"
              },
              {
                "text": "Off-lease vehicle (2-3 yrs old, low mileage)",
                "axis": "condition",
                "direction": "used"
              },
              {
                "text": "Salvage/rebuilt-title vehicle (major prior damage, discounted)",
                "axis": "condition",
                "direction": "used"
              }
            ]
          }
        ]
      },
      {
        "name": "Financing method",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Cash purchase",
            "axis": "payment",
            "direction": "cash",
            "elements": [
              {
                "text": "Pay full price outright, no loan",
                "axis": "payment",
                "direction": "cash"
              },
              {
                "text": "Negotiate cash-only discount at dealer",
                "axis": "payment",
                "direction": "cash"
              }
            ]
          },
          {
            "name": "Auto loan (financed over term)",
            "axis": "payment",
            "direction": "loan",
            "elements": [
              {
                "text": "Bank or credit union pre-approval loan",
                "axis": "payment",
                "direction": "loan"
              },
              {
                "text": "Dealer-arranged financing (may include markup)",
                "axis": "payment",
                "direction": "loan"
              },
              {
                "text": "Manufacturer promotional APR (e.g. 0-2.9% for qualified buyers)",
                "axis": "payment",
                "direction": "loan"
              }
            ]
          },
          {
            "name": "Leasing (multi-year rental, no ownership at end)",
            "axis": "payment",
            "direction": "lease",
            "elements": [
              {
                "text": "Standard 36-month lease with mileage cap",
                "axis": "payment",
                "direction": "lease"
              },
              {
                "text": "Lease with buyout option at term end",
                "axis": "payment",
                "direction": "lease"
              }
            ]
          }
        ]
      },
      {
        "name": "Vehicle type / body style",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Sedans (fuel-efficient, easy to park)",
            "elements": [
              {
                "text": "Compact sedan, e.g. Honda Civic"
              },
              {
                "text": "Midsize sedan, e.g. Toyota Camry"
              }
            ]
          },
          {
            "name": "SUVs/crossovers (higher seating, more cargo room)",
            "elements": [
              {
                "text": "Subcompact crossover, e.g. Honda HR-V"
              },
              {
                "text": "Compact SUV, e.g. Toyota RAV4"
              }
            ]
          },
          {
            "name": "Hatchbacks (compact, versatile cargo space)",
            "elements": [
              {
                "text": "Subcompact hatchback, e.g. Honda Fit"
              },
              {
                "text": "Hot hatch performance variant, e.g. VW GTI"
              }
            ]
          },
          {
            "name": "Trucks (towing/hauling capability)",
            "elements": [
              {
                "text": "Compact/midsize pickup, e.g. Toyota Tacoma"
              },
              {
                "text": "Full-size pickup, e.g. Ford F-150"
              }
            ]
          }
        ]
      },
      {
        "name": "Powertrain type",
        "fixedness": 0.85,
        "subcategories": [
          {
            "name": "Gasoline (internal combustion)",
            "axis": "powertrain",
            "direction": "gas",
            "elements": [
              {
                "text": "Standard gasoline engine",
                "axis": "powertrain",
                "direction": "gas"
              },
              {
                "text": "Turbocharged small-displacement engine",
                "axis": "powertrain",
                "direction": "gas"
              }
            ]
          },
          {
            "name": "Hybrid (gas engine + electric motor assist)",
            "axis": "powertrain",
            "direction": "hybrid",
            "elements": [
              {
                "text": "Standard hybrid, e.g. Toyota Prius",
                "axis": "powertrain",
                "direction": "hybrid"
              },
              {
                "text": "Plug-in hybrid (PHEV, short electric-only range)",
                "axis": "powertrain",
                "direction": "hybrid"
              }
            ]
          },
          {
            "name": "Fully electric (EV, battery-only, needs charging access)",
            "axis": "powertrain",
            "direction": "electric",
            "elements": [
              {
                "text": "Short-range EV under 250mi, e.g. Chevy Bolt",
                "axis": "powertrain",
                "direction": "electric"
              },
              {
                "text": "Long-range EV over 300mi, e.g. Tesla Model 3",
                "axis": "powertrain",
                "direction": "electric"
              }
            ]
          }
        ]
      },
      {
        "name": "Ownership costs & protection",
        "fixedness": 0.4,
        "subcategories": [
          {
            "name": "Insurance",
            "elements": [
              {
                "text": "Liability-only coverage (state minimum)"
              },
              {
                "text": "Full coverage (collision + comprehensive)"
              },
              {
                "text": "Add young/first-time driver to parent's policy"
              }
            ]
          },
          {
            "name": "Warranty & maintenance plans",
            "elements": [
              {
                "text": "Factory bumper-to-bumper warranty (typically 3yr/36k mi)"
              },
              {
                "text": "Extended service contract (aftermarket warranty)"
              },
              {
                "text": "Prepaid maintenance package"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Budget range",
      "Dealer-ordered build (wait 4-12 weeks for exact spec)",
      "Pay full price outright, no loan",
      "Compact sedan, e.g. Honda Civic",
      "Subcompact crossover, e.g. Honda HR-V",
      "Subcompact hatchback, e.g. Honda Fit",
      "Compact/midsize pickup, e.g. Toyota Tacoma",
      "Standard gasoline engine",
      "Liability-only coverage (state minimum)",
      "Factory bumper-to-bumper warranty (typically 3yr/36k mi)"
    ]
  }
];

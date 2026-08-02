const DEMO_CASES = [
    {
        "label":  "Food Garden (Georgia)",
        "input":  "I want to plant a food garden in Georgia",
        "topic":  "Planning a Food Garden in Georgia",
        "categories":  [
                           {
                               "name":  "Region of Georgia",
                               "subcategories":  [
                                                     {
                                                         "name":  "North Georgia Mountains (Zone 6b–7b, cooler microclimate, shorter season)",
                                                         "axis":  "region",
                                                         "direction":  "mountains",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Plan around last frost mid-to-late April"
                                                                          },
                                                                          {
                                                                              "text":  "Use raised beds to improve drainage on slopes"
                                                                          },
                                                                          {
                                                                              "text":  "Favor cold-hardy apple and berry varieties"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Piedmont (Zone 7b–8a, red clay soil, hot humid summers)",
                                                         "axis":  "region",
                                                         "direction":  "piedmont",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Amend heavy clay with compost/gypsum before planting"
                                                                          },
                                                                          {
                                                                              "text":  "Choose Atlanta-area extension planting calendar"
                                                                          },
                                                                          {
                                                                              "text":  "Grow heat-tolerant tomato varieties (e.g. \u0027Heatmaster\u0027)"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Coastal Plain (Zone 8a–9a, sandy soil, long humid season)",
                                                         "axis":  "region",
                                                         "direction":  "coastal",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Plant early spring crops in February"
                                                                          },
                                                                          {
                                                                              "text":  "Select sandy-soil-adapted root crops (sweet potato, peanut)"
                                                                          },
                                                                          {
                                                                              "text":  "Add frequent irrigation for fast-draining sandy soil"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Season \u0026 Crop Timing",
                               "subcategories":  [
                                                     {
                                                         "name":  "Cool-Season Crops (spring/fall)",
                                                         "axis":  "season",
                                                         "direction":  "cool",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Collards"
                                                                          },
                                                                          {
                                                                              "text":  "Sugar snap peas"
                                                                          },
                                                                          {
                                                                              "text":  "Broccoli \u0027Waltham 29\u0027"
                                                                          },
                                                                          {
                                                                              "text":  "Lettuce (loose-leaf varieties)"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Warm-Season Crops (summer)",
                                                         "axis":  "season",
                                                         "direction":  "warm",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Okra \u0027Clemson Spineless\u0027"
                                                                          },
                                                                          {
                                                                              "text":  "Southern peas (cowpeas)"
                                                                          },
                                                                          {
                                                                              "text":  "Tomato \u0027Cherokee Purple\u0027"
                                                                          },
                                                                          {
                                                                              "text":  "Muscadine grapes"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Succession \u0026 Fall Planting Windows",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Second planting of bush beans in late July"
                                                                          },
                                                                          {
                                                                              "text":  "Fall broccoli transplants in August"
                                                                          },
                                                                          {
                                                                              "text":  "Garlic planted in November for summer harvest"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Soil \u0026 Bed Preparation",
                               "subcategories":  [
                                                     {
                                                         "name":  "Bed Style",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "In-ground row beds",
                                                                              "axis":  "bed_style",
                                                                              "direction":  "in_ground"
                                                                          },
                                                                          {
                                                                              "text":  "Raised wooden beds",
                                                                              "axis":  "bed_style",
                                                                              "direction":  "raised"
                                                                          },
                                                                          {
                                                                              "text":  "Straw bale gardening",
                                                                              "axis":  "bed_style",
                                                                              "direction":  "raised"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Mulching Strategy",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Pine straw mulch"
                                                                          },
                                                                          {
                                                                              "text":  "Wheat straw mulch"
                                                                          },
                                                                          {
                                                                              "text":  "Shredded leaf mulch"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Pests, Disease \u0026 Wildlife Pressure",
                               "subcategories":  [

                                                 ]
                           },
                           {
                               "name":  "Garden Layout \u0026 Method",
                               "subcategories":  [

                                                 ]
                           }
                       ],
        "selections":  [
                           "Plan around last frost mid-to-late April",
                           "Collards",
                           "In-ground row beds"
                       ],
        "genre":  "action_item"
    },
    {
        "label":  "7th Grade Story",
        "input":  "I need to write a fictional story for my 7th grade English class",
        "topic":  "Choosing and writing a fictional story for 7th grade English class",
        "categories":  [
                           {
                               "name":  "Genre \u0026 Story Type (pick one lane first)",
                               "subcategories":  [
                                                     {
                                                         "name":  "Realistic Fiction (grounded in real-world rules)",
                                                         "axis":  "genre",
                                                         "direction":  "realistic",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Coming-of-age school story"
                                                                          },
                                                                          {
                                                                              "text":  "Friendship/betrayal drama"
                                                                          },
                                                                          {
                                                                              "text":  "Family conflict story"
                                                                          },
                                                                          {
                                                                              "text":  "Sports competition story"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Speculative Fiction (bends real-world rules)",
                                                         "axis":  "genre",
                                                         "direction":  "speculative",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Fantasy quest with magic system"
                                                                          },
                                                                          {
                                                                              "text":  "Sci-fi/dystopian future world"
                                                                          },
                                                                          {
                                                                              "text":  "Ghost/horror mystery"
                                                                          },
                                                                          {
                                                                              "text":  "Fairy-tale retelling with a twist"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Plot Structure \u0026 Conflict",
                               "subcategories":  [
                                                     {
                                                         "name":  "Conflict Type (the engine of the plot)",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Character vs. character"
                                                                          },
                                                                          {
                                                                              "text":  "Character vs. self (internal struggle)"
                                                                          },
                                                                          {
                                                                              "text":  "Character vs. nature/environment"
                                                                          },
                                                                          {
                                                                              "text":  "Character vs. society/rules"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Plot Shape (how events are ordered)",
                                                         "axis":  "timeline",
                                                         "direction":  "structure",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Classic linear five-part arc (setup, rising action, climax, falling action, resolution)",
                                                                              "axis":  "timeline",
                                                                              "direction":  "linear"
                                                                          },
                                                                          {
                                                                              "text":  "Flashback-framed structure (start near the end, then rewind)",
                                                                              "axis":  "timeline",
                                                                              "direction":  "nonlinear"
                                                                          },
                                                                          {
                                                                              "text":  "Twist-ending structure (hidden reveal changes everything)"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Point of View \u0026 Narrator",
                               "subcategories":  [
                                                     {
                                                         "name":  "Narrative Voice (who tells it)",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "First-person narrator (I/me, inside one head)",
                                                                              "axis":  "pov",
                                                                              "direction":  "first"
                                                                          },
                                                                          {
                                                                              "text":  "Third-person limited (follows one character closely)",
                                                                              "axis":  "pov",
                                                                              "direction":  "third-limited"
                                                                          },
                                                                          {
                                                                              "text":  "Third-person omniscient (knows everything, all characters)",
                                                                              "axis":  "pov",
                                                                              "direction":  "third-omniscient"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Narrator Reliability",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Reliable, trustworthy narrator"
                                                                          },
                                                                          {
                                                                              "text":  "Unreliable narrator (hides or misunderstands truth)"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Characters",
                               "subcategories":  [
                                                     {
                                                         "name":  "Protagonist Design",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Clear external goal (wins the game, finds the item)"
                                                                          },
                                                                          {
                                                                              "text":  "Hidden internal flaw to overcome"
                                                                          },
                                                                          {
                                                                              "text":  "Specific personality quirk or habit"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Supporting Cast Roles",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Best friend/sidekick"
                                                                          },
                                                                          {
                                                                              "text":  "Antagonist with understandable motive"
                                                                          },
                                                                          {
                                                                              "text":  "Mentor or authority figure"
                                                                          },
                                                                          {
                                                                              "text":  "Foil character (contrasts protagonist\u0027s traits)"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Setting \u0026 World",
                               "subcategories":  [
                                                     {
                                                         "name":  "Time Period",
                                                         "axis":  "era",
                                                         "direction":  "time",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Present-day setting",
                                                                              "axis":  "era",
                                                                              "direction":  "present"
                                                                          },
                                                                          {
                                                                              "text":  "Historical setting (specific decade/event)",
                                                                              "axis":  "era",
                                                                              "direction":  "past"
                                                                          },
                                                                          {
                                                                              "text":  "Futuristic setting",
                                                                              "axis":  "era",
                                                                              "direction":  "future"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Location Type",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Familiar everyday place (school, neighborhood)"
                                                                          },
                                                                          {
                                                                              "text":  "Invented fantasy world with its own rules"
                                                                          },
                                                                          {
                                                                              "text":  "Isolated/confined setting (island, spaceship, cabin)"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Craft \u0026 Technique",
                               "subcategories":  [
                                                     {
                                                         "name":  "Opening Hook Strategy",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Start mid-action (in medias res)"
                                                                          },
                                                                          {
                                                                              "text":  "Start with vivid sensory description"
                                                                          },
                                                                          {
                                                                              "text":  "Start with intriguing dialogue line"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Dialogue \u0026 Description Balance",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Dialogue-heavy scenes to reveal character"
                                                                          },
                                                                          {
                                                                              "text":  "Descriptive narration to build mood/setting"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Theme \u0026 Message",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Theme about friendship/loyalty"
                                                                          },
                                                                          {
                                                                              "text":  "Theme about courage/facing fear"
                                                                          },
                                                                          {
                                                                              "text":  "Theme about honesty/consequences"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Assignment Fit \u0026 Revision",
                               "subcategories":  [
                                                     {
                                                         "name":  "Meeting Class Requirements",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Check required word/page count"
                                                                          },
                                                                          {
                                                                              "text":  "Confirm required story elements are present (rubric checklist)"
                                                                          },
                                                                          {
                                                                              "text":  "Pick title that reflects theme"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Revision Pass Types",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Read-aloud pass for flow/dialogue realism"
                                                                          },
                                                                          {
                                                                              "text":  "Peer feedback pass"
                                                                          },
                                                                          {
                                                                              "text":  "Grammar/spelling proofread pass"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           }
                       ],
        "selections":  [
                           "Coming-of-age school story",
                           "Character vs. character",
                           "First-person narrator (I/me, inside one head)",
                           "Clear external goal (wins the game, finds the item)"
                       ],
        "genre":  "story"
    },
    {
        "label":  "3D Print Gear Set",
        "input":  "I want to 3D print a custom gear set",
        "topic":  "3D Printing a Custom Gear Set for a Desktop Robotics Arm (low-load, demonstration purposes)",
        "categories":  [
                           {
                               "name":  "Gear Type \u0026 Transmission Layout",
                               "subcategories":  [
                                                     {
                                                         "name":  "Gear Tooth Profile",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Spur gears (parallel shafts, simplest to print)",
                                                                              "axis":  "gear_form",
                                                                              "direction":  "spur"
                                                                          },
                                                                          {
                                                                              "text":  "Helical gears (quieter, smoother, needs supports/orientation care)",
                                                                              "axis":  "gear_form",
                                                                              "direction":  "helical"
                                                                          },
                                                                          {
                                                                              "text":  "Bevel gears (right-angle shaft intersection)",
                                                                              "axis":  "gear_form",
                                                                              "direction":  "bevel"
                                                                          },
                                                                          {
                                                                              "text":  "Worm \u0026 worm gear (high reduction, self-locking)",
                                                                              "axis":  "gear_form",
                                                                              "direction":  "worm"
                                                                          },
                                                                          {
                                                                              "text":  "Planetary gear set (compact, coaxial reduction)",
                                                                              "axis":  "gear_form",
                                                                              "direction":  "planetary"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Reduction Strategy",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Single-stage reduction (one gear pair)",
                                                                              "axis":  "stages",
                                                                              "direction":  "single"
                                                                          },
                                                                          {
                                                                              "text":  "Multi-stage gear train (2+ pairs for higher ratio)",
                                                                              "axis":  "stages",
                                                                              "direction":  "multi"
                                                                          },
                                                                          {
                                                                              "text":  "Rack-and-pinion (linear motion output)"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Gear Sizing \u0026 Meshing Parameters",
                               "subcategories":  [
                                                     {
                                                         "name":  "Tooth Geometry Standard",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Metric module system (e.g., M0.5–M1.5 for small desktop gears)",
                                                                              "axis":  "tooth_standard",
                                                                              "direction":  "module"
                                                                          },
                                                                          {
                                                                              "text":  "Imperial diametral pitch system",
                                                                              "axis":  "tooth_standard",
                                                                              "direction":  "diametral_pitch"
                                                                          },
                                                                          {
                                                                              "text":  "20° pressure angle (standard, strong tooth base)"
                                                                          },
                                                                          {
                                                                              "text":  "14.5° pressure angle (legacy, smoother but weaker)"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Clearance \u0026 Fit Tuning",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Backlash allowance (0.05–0.15mm added per tooth flank for FDM tolerance)"
                                                                          },
                                                                          {
                                                                              "text":  "Center-distance offset compensation for oversized printed teeth"
                                                                          },
                                                                          {
                                                                              "text":  "Bore/shaft clearance fit (press-fit vs. clearance-fit hole)"
                                                                          },
                                                                          {
                                                                              "text":  "Keyway or D-shaft flat for anti-rotation on shaft"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Material Selection",
                               "subcategories":  [
                                                     {
                                                         "name":  "Standard FDM Filaments (low-load appropriate)",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "PLA (easiest print, brittle, fine for demo torque)",
                                                                              "axis":  "material",
                                                                              "direction":  "pla"
                                                                          },
                                                                          {
                                                                              "text":  "PETG (tougher, slight flex, low warp)",
                                                                              "axis":  "material",
                                                                              "direction":  "petg"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Engineering Filaments (overkill for this use case but selectable)",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Nylon (wear-resistant, needs dry storage)",
                                                                              "axis":  "material",
                                                                              "direction":  "nylon"
                                                                          },
                                                                          {
                                                                              "text":  "ABS (higher temp resistance, warps more)",
                                                                              "axis":  "material",
                                                                              "direction":  "abs"
                                                                          },
                                                                          {
                                                                              "text":  "POM/Delrin filament (low friction, hard to print)",
                                                                              "axis":  "material",
                                                                              "direction":  "pom"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Print Orientation \u0026 Process Settings",
                               "subcategories":  [
                                                     {
                                                         "name":  "Print Orientation Choice",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Flat/face-down orientation (teeth in-plane, strong for spur gears, no supports)",
                                                                              "axis":  "orientation",
                                                                              "direction":  "flat"
                                                                          },
                                                                          {
                                                                              "text":  "Vertical/axis-up orientation (needed for bevel/helical angled teeth)",
                                                                              "axis":  "orientation",
                                                                              "direction":  "vertical"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Layer \u0026 Infill Settings",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "0.1–0.12mm fine layer height for tooth surface accuracy"
                                                                          },
                                                                          {
                                                                              "text":  "3+ perimeter walls to encase tooth root stress area"
                                                                          },
                                                                          {
                                                                              "text":  "20–40% infill (sufficient for demo/low load)"
                                                                          },
                                                                          {
                                                                              "text":  "100% infill for small/thin-tooth gears prone to layer splitting"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Design \u0026 Modeling Approach",
                               "subcategories":  [
                                                     {
                                                         "name":  "CAD/Generation Method",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Parametric gear generator plugin (e.g., Fusion 360 spur gear add-in)",
                                                                              "axis":  "design_method",
                                                                              "direction":  "generator"
                                                                          },
                                                                          {
                                                                              "text":  "Open-source gear library (e.g., FreeCAD Gear workbench, OpenSCAD gears.scad)",
                                                                              "axis":  "design_method",
                                                                              "direction":  "library"
                                                                          },
                                                                          {
                                                                              "text":  "Hand-modeled involute profile from scratch",
                                                                              "axis":  "design_method",
                                                                              "direction":  "manual"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Hub \u0026 Mounting Features",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Set-screw hub with embedded nut/heat-set insert"
                                                                          },
                                                                          {
                                                                              "text":  "Integrated D-shaft bore matched to servo horn/motor shaft"
                                                                          },
                                                                          {
                                                                              "text":  "Snap-fit or friction-fit hub (no fasteners)"
                                                                          },
                                                                          {
                                                                              "text":  "Idler bushing/bearing pocket for free-spinning gears"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Post-Processing \u0026 Fit Validation",
                               "subcategories":  [
                                                     {
                                                         "name":  "Finishing Techniques",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Deburring tooth edges with hobby knife/file"
                                                                          },
                                                                          {
                                                                              "text":  "Light sanding of bore/mating faces for smooth rotation"
                                                                          },
                                                                          {
                                                                              "text":  "Dry-fit lubrication (PTFE/silicone spray for printed-plastic mesh)"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Test \u0026 Iteration Plan",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Print single test-mesh pair before full gear train"
                                                                          },
                                                                          {
                                                                              "text":  "Manual backlash check by hand-rotating meshed pair"
                                                                          },
                                                                          {
                                                                              "text":  "Iterate module/clearance values based on first-print fit"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           }
                       ],
        "selections":  [
                           "Spur gears (parallel shafts, simplest to print)",
                           "Metric module system (e.g., M0.5–M1.5 for small desktop gears)",
                           "PLA (easiest print, brittle, fine for demo torque)",
                           "Flat/face-down orientation (teeth in-plane, strong for spur gears, no supports)"
                       ],
        "genre":  "essay"
    },
    {
        "label":  "Retirement City",
        "input":  "I\u0027m selecting a retirement city in the U.S.",
        "topic":  "Selecting a Retirement City in the U.S.",
        "categories":  [
                           {
                               "name":  "Region/Climate Preference",
                               "subcategories":  [
                                                     {
                                                         "name":  "Sunbelt (hot summers, mild winters)",
                                                         "axis":  "climate_region",
                                                         "direction":  "sunbelt",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Phoenix, AZ (desert heat, dry)",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "sunbelt"
                                                                          },
                                                                          {
                                                                              "text":  "Sarasota, FL (Gulf coast humidity)",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "sunbelt"
                                                                          },
                                                                          {
                                                                              "text":  "San Antonio, TX (inland heat)",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "sunbelt"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Mountain West (Zone 5b–7a, four seasons, altitude)",
                                                         "axis":  "climate_region",
                                                         "direction":  "mountain",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Boise, ID",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "mountain"
                                                                          },
                                                                          {
                                                                              "text":  "Prescott, AZ (high desert, cooler than Phoenix)",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "mountain"
                                                                          },
                                                                          {
                                                                              "text":  "Asheville, NC (Blue Ridge foothills)",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "mountain"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Coastal (moderate, humid, hurricane exposure)",
                                                         "axis":  "climate_region",
                                                         "direction":  "coastal",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Charleston, SC",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "coastal"
                                                                          },
                                                                          {
                                                                              "text":  "San Diego, CA (mild, low humidity)",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "coastal"
                                                                          },
                                                                          {
                                                                              "text":  "Portland, ME (cold winters, coastal charm)",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "coastal"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Midwest/Four-Season (Zone 4–6, snow winters)",
                                                         "axis":  "climate_region",
                                                         "direction":  "midwest",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Madison, WI",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "midwest"
                                                                          },
                                                                          {
                                                                              "text":  "Columbus, OH",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "midwest"
                                                                          },
                                                                          {
                                                                              "text":  "Traverse City, MI",
                                                                              "axis":  "climate_region",
                                                                              "direction":  "midwest"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Cost of Living \u0026 Tax Structure",
                               "subcategories":  [
                                                     {
                                                         "name":  "State Tax Treatment of Retirement Income",
                                                         "axis":  "tax_treatment",
                                                         "direction":  "tax_free",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "No state income tax (e.g., Florida, Texas, Nevada)",
                                                                              "axis":  "tax_treatment",
                                                                              "direction":  "tax_free"
                                                                          },
                                                                          {
                                                                              "text":  "Full Social Security \u0026 pension exemption states (e.g., Pennsylvania)",
                                                                              "axis":  "tax_treatment",
                                                                              "direction":  "tax_free"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "States Taxing Retirement Income",
                                                         "axis":  "tax_treatment",
                                                         "direction":  "taxed",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Full taxation of pensions/401k (e.g., California)",
                                                                              "axis":  "tax_treatment",
                                                                              "direction":  "taxed"
                                                                          },
                                                                          {
                                                                              "text":  "Partial exemption up to a threshold (e.g., Colorado)",
                                                                              "axis":  "tax_treatment",
                                                                              "direction":  "taxed"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Housing Cost Tier",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Low-cost metro (median home \u003c$250k, e.g., Huntsville, AL)"
                                                                          },
                                                                          {
                                                                              "text":  "Mid-cost metro (median $250k–$450k, e.g., Greenville, SC)"
                                                                          },
                                                                          {
                                                                              "text":  "High-cost metro (median \u003e$600k, e.g., San Diego, CA)"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Property Tax Burden",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Low property tax with homestead exemption (e.g., South Carolina)"
                                                                          },
                                                                          {
                                                                              "text":  "High property tax states (e.g., New Jersey, Illinois)"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Healthcare Access \u0026 Quality",
                               "subcategories":  [
                                                     {
                                                         "name":  "Hospital/Specialist Density",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Major academic medical center city (e.g., Rochester, MN - Mayo Clinic)"
                                                                          },
                                                                          {
                                                                              "text":  "Regional hub with multiple systems (e.g., Nashville, TN)"
                                                                          },
                                                                          {
                                                                              "text":  "Rural/underserved area reliant on distant referral center"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Continuing Care Retirement Communities (CCRC) Availability",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Life-plan community with full continuum of care on-site"
                                                                          },
                                                                          {
                                                                              "text":  "Age-restricted 55+ community without on-site medical tiers"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Lifestyle \u0026 Social Fit",
                               "subcategories":  [
                                                     {
                                                         "name":  "Urban Density Preference",
                                                         "axis":  "density",
                                                         "direction":  "urban",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Walkable downtown core (e.g., Chicago, IL)",
                                                                              "axis":  "density",
                                                                              "direction":  "urban"
                                                                          },
                                                                          {
                                                                              "text":  "Mid-size college town (e.g., Chapel Hill, NC)",
                                                                              "axis":  "density",
                                                                              "direction":  "urban"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Rural/Small-Town Preference",
                                                         "axis":  "density",
                                                         "direction":  "rural",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Lake or mountain small town (e.g., Hendersonville, NC)",
                                                                              "axis":  "density",
                                                                              "direction":  "rural"
                                                                          },
                                                                          {
                                                                              "text":  "Master-planned rural retirement community (e.g., The Villages, FL)",
                                                                              "axis":  "density",
                                                                              "direction":  "rural"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Recreation \u0026 Amenity Focus",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Golf-centric community"
                                                                          },
                                                                          {
                                                                              "text":  "Arts/culture-centric city (e.g., Santa Fe, NM)"
                                                                          },
                                                                          {
                                                                              "text":  "Outdoor recreation hub (e.g., Bend, OR)"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Family \u0026 Social Connectivity",
                               "subcategories":  [
                                                     {
                                                         "name":  "Proximity to Family",
                                                         "axis":  "proximity",
                                                         "direction":  "near_family",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Same metro area as adult children",
                                                                              "axis":  "proximity",
                                                                              "direction":  "near_family"
                                                                          },
                                                                          {
                                                                              "text":  "Within a day\u0027s drive (under 6 hours)",
                                                                              "axis":  "proximity",
                                                                              "direction":  "near_family"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Airport Access for Distant Family",
                                                         "axis":  "proximity",
                                                         "direction":  "fly_in",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Major hub airport with nonstop flights (e.g., Denver, CO)",
                                                                              "axis":  "proximity",
                                                                              "direction":  "fly_in"
                                                                          },
                                                                          {
                                                                              "text":  "Small regional airport requiring connections",
                                                                              "axis":  "proximity",
                                                                              "direction":  "fly_in"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Safety, Climate Risk \u0026 Resilience",
                               "subcategories":  [
                                                     {
                                                         "name":  "Natural Disaster Exposure",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Hurricane-prone Gulf/Atlantic coast"
                                                                          },
                                                                          {
                                                                              "text":  "Wildfire-prone Western foothills"
                                                                          },
                                                                          {
                                                                              "text":  "Tornado Alley Midwest/Plains"
                                                                          },
                                                                          {
                                                                              "text":  "Low-disaster-risk interior (e.g., Pittsburgh, PA)"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Crime \u0026 Personal Safety",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Low violent-crime suburb/small city"
                                                                          },
                                                                          {
                                                                              "text":  "Higher-crime urban core with lower cost"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           }
                       ],
        "selections":  [
                           "Phoenix, AZ (desert heat, dry)",
                           "No state income tax (e.g., Florida, Texas, Nevada)",
                           "Major academic medical center city (e.g., Rochester, MN - Mayo Clinic)",
                           "Walkable downtown core (e.g., Chicago, IL)"
                       ],
        "genre":  "argument"
    },
    {
        "label":  "First Marathon",
        "input":  "I want to train for my first marathon",
        "topic":  "Training for Your First Marathon",
        "categories":  [
                           {
                               "name":  "Training Timeline / Experience Level",
                               "subcategories":  [
                                                     {
                                                         "name":  "Novice Runner (little/no running base, needs 20+ weeks)",
                                                         "axis":  "experience_level",
                                                         "direction":  "novice",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "6-8 week base-building phase before official plan starts"
                                                                          },
                                                                          {
                                                                              "text":  "Run-walk intervals (e.g., Galloway method)"
                                                                          },
                                                                          {
                                                                              "text":  "20-week beginner plan (Hal Higdon Novice 1 style)"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Intermediate Runner (regular runner, 16-18 week plan)",
                                                         "axis":  "experience_level",
                                                         "direction":  "intermediate",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "16-week intermediate plan with tempo runs"
                                                                          },
                                                                          {
                                                                              "text":  "18-week plan incorporating speedwork"
                                                                          },
                                                                          {
                                                                              "text":  "Skip base-building, start plan immediately"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Time-Crunched / Compressed Timeline (under 12 weeks)",
                                                         "axis":  "experience_level",
                                                         "direction":  "compressed",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "12-week condensed plan with reduced peak mileage"
                                                                          },
                                                                          {
                                                                              "text":  "Cross-training substitution for missed long runs"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Weekly Training Structure",
                               "subcategories":  [
                                                     {
                                                         "name":  "Long Run Progression",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Weekly long run increasing by ~1 mile"
                                                                          },
                                                                          {
                                                                              "text":  "Cutback week every 3rd-4th week (reduce mileage 20-25%)"
                                                                          },
                                                                          {
                                                                              "text":  "20-mile peak long run 3 weeks before race"
                                                                          },
                                                                          {
                                                                              "text":  "Run-walk long runs for injury-prone athletes"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Quality Workouts",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Tempo runs at goal marathon pace + buffer"
                                                                          },
                                                                          {
                                                                              "text":  "800m/1600m interval repeats for VO2max"
                                                                          },
                                                                          {
                                                                              "text":  "Progression runs (start easy, finish at pace)"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Recovery \u0026 Easy Days",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Easy conversational-pace runs (80% of weekly volume)"
                                                                          },
                                                                          {
                                                                              "text":  "Full rest days (1-2 per week)"
                                                                          },
                                                                          {
                                                                              "text":  "Active recovery via walking or yoga"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Cross-Training \u0026 Strength Support",
                               "subcategories":  [
                                                     {
                                                         "name":  "Aerobic Cross-Training",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Cycling as low-impact aerobic supplement"
                                                                          },
                                                                          {
                                                                              "text":  "Swimming for active recovery"
                                                                          },
                                                                          {
                                                                              "text":  "Elliptical for injury-safe volume"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Strength \u0026 Injury Prevention",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "2x/week lower-body strength sessions (squats, lunges)"
                                                                          },
                                                                          {
                                                                              "text":  "Core/hip stability routine (planks, clamshells)"
                                                                          },
                                                                          {
                                                                              "text":  "Foam rolling and mobility work"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Race-Day Pacing Strategy",
                               "subcategories":  [
                                                     {
                                                         "name":  "Pacing Approach",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Even/steady pacing throughout race",
                                                                              "axis":  "pacing_strategy",
                                                                              "direction":  "even"
                                                                          },
                                                                          {
                                                                              "text":  "Negative split (slower first half, faster second)",
                                                                              "axis":  "pacing_strategy",
                                                                              "direction":  "negative_split"
                                                                          },
                                                                          {
                                                                              "text":  "Run-walk ratio strategy (e.g., 4:1 run:walk)",
                                                                              "axis":  "pacing_strategy",
                                                                              "direction":  "run_walk"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Goal Setting",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Time-based goal using McMillan/VDOT calculator"
                                                                          },
                                                                          {
                                                                              "text":  "\u0027Just finish\u0027 goal with no time target"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Nutrition \u0026 Hydration",
                               "subcategories":  [
                                                     {
                                                         "name":  "Daily Fueling",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Carbohydrate-forward diet during peak training weeks"
                                                                          },
                                                                          {
                                                                              "text":  "Post-long-run protein/carb recovery meal"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Race Fueling \u0026 Practice",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "In-run carb gels every 30-45 minutes"
                                                                          },
                                                                          {
                                                                              "text":  "Sports drink for electrolyte replacement"
                                                                          },
                                                                          {
                                                                              "text":  "Practicing race-day fueling during long runs"
                                                                          },
                                                                          {
                                                                              "text":  "Carb-loading protocol 2-3 days pre-race"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Gear \u0026 Injury Management",
                               "subcategories":  [
                                                     {
                                                         "name":  "Footwear \u0026 Gear",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Properly fitted running shoes (gait-analyzed)"
                                                                          },
                                                                          {
                                                                              "text":  "Rotating two shoe pairs to reduce repetitive stress"
                                                                          },
                                                                          {
                                                                              "text":  "Moisture-wicking apparel to prevent chafing"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Injury Prevention \u0026 Taper",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "3-week taper reducing volume 20-40%"
                                                                          },
                                                                          {
                                                                              "text":  "Addressing common injuries (IT band, shin splints, runner\u0027s knee)"
                                                                          },
                                                                          {
                                                                              "text":  "Rest/cross-train substitution when pain flares"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           }
                       ],
        "selections":  [
                           "6-8 week base-building phase before official plan starts",
                           "Weekly long run increasing by ~1 mile",
                           "Cycling as low-impact aerobic supplement",
                           "Even/steady pacing throughout race"
                       ],
        "genre":  "summary"
    },
    {
        "label":  "Wedding Toast",
        "input":  "I need to give a toast at my best friend\u0027s wedding",
        "topic":  "Best Man Toast for a 15-Year Best Friend (Warm, Slightly Funny, ~2 Minutes)",
        "categories":  [
                           {
                               "name":  "Structural Approach (pick one overall shape)",
                               "subcategories":  [
                                                     {
                                                         "name":  "Chronological Story Arc",
                                                         "axis":  "structure",
                                                         "direction":  "chronological",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Open with how you met, close with today",
                                                                              "axis":  "structure",
                                                                              "direction":  "chronological"
                                                                          },
                                                                          {
                                                                              "text":  "Single origin anecdote stretched into full arc (meet → test → today)",
                                                                              "axis":  "structure",
                                                                              "direction":  "chronological"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Theme-First Structure (one metaphor threaded throughout)",
                                                         "axis":  "structure",
                                                         "direction":  "thematic",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Running joke/metaphor (e.g. \u0027he\u0027s always been bad at directions, but he found the right one\u0027)",
                                                                              "axis":  "structure",
                                                                              "direction":  "thematic"
                                                                          },
                                                                          {
                                                                              "text":  "Three-word throughline repeated at start, middle, end",
                                                                              "axis":  "structure",
                                                                              "direction":  "thematic"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Toast-to-Bride Pivot Structure",
                                                         "axis":  "structure",
                                                         "direction":  "pivot",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Groom-focused story that pivots to \u0027then he met her\u0027",
                                                                              "axis":  "structure",
                                                                              "direction":  "pivot"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Opening Line (first 10 seconds)",
                               "subcategories":  [
                                                     {
                                                         "name":  "Humor-Forward Openers",
                                                         "axis":  "opener",
                                                         "direction":  "funny",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Self-deprecating joke about your own toast-giving nerves",
                                                                              "axis":  "opener",
                                                                              "direction":  "funny"
                                                                          },
                                                                          {
                                                                              "text":  "Mock-serious \u0027I was told to keep this short\u0027 bit",
                                                                              "axis":  "opener",
                                                                              "direction":  "funny"
                                                                          },
                                                                          {
                                                                              "text":  "Playful roast line about the groom\u0027s reaction to being asked to marry",
                                                                              "axis":  "opener",
                                                                              "direction":  "funny"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Sincere Openers",
                                                         "axis":  "opener",
                                                         "direction":  "warm",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Direct statement: \u0027I\u0027ve known this man for 15 years\u0027",
                                                                              "axis":  "opener",
                                                                              "direction":  "warm"
                                                                          },
                                                                          {
                                                                              "text":  "Address the couple by name and thank them for including you",
                                                                              "axis":  "opener",
                                                                              "direction":  "warm"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Core Anecdote Bank (choose one signature story)",
                               "subcategories":  [
                                                     {
                                                         "name":  "Origin-of-Friendship Stories",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "How-we-met story with an embarrassing detail"
                                                                          },
                                                                          {
                                                                              "text":  "A shared dumb hobby/inside joke from early years"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Character-Revealing Stories",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "A time he showed up for you (loyalty proof point)"
                                                                          },
                                                                          {
                                                                              "text":  "A funny flaw story that humanizes him (e.g. terrible cook, chronically late)"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Relationship-Witness Stories",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "First time you saw him with his now-spouse and noticed the change"
                                                                          },
                                                                          {
                                                                              "text":  "A specific moment that proved this relationship was \u0027it\u0027"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Humor Calibration (how far to push the jokes)",
                               "subcategories":  [
                                                     {
                                                         "name":  "Safe, Family-Friendly Jokes",
                                                         "axis":  "humor_risk",
                                                         "direction":  "safe",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Light teasing about a harmless quirk (snoring, bad dancing)",
                                                                              "axis":  "humor_risk",
                                                                              "direction":  "safe"
                                                                          },
                                                                          {
                                                                              "text":  "Callback joke to something from earlier in the toast",
                                                                              "axis":  "humor_risk",
                                                                              "direction":  "safe"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Edgier Roast-Style Jokes",
                                                         "axis":  "humor_risk",
                                                         "direction":  "edgy",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Reference to an old dating disaster or ex",
                                                                              "axis":  "humor_risk",
                                                                              "direction":  "edgy"
                                                                          },
                                                                          {
                                                                              "text":  "Joke about how surprised people are he \u0027landed\u0027 his spouse",
                                                                              "axis":  "humor_risk",
                                                                              "direction":  "edgy"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Emotional Core (the sincere turn)",
                               "subcategories":  [
                                                     {
                                                         "name":  "Praise of the Groom",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Name one specific quality (loyalty, kindness) with proof, not just adjective"
                                                                          },
                                                                          {
                                                                              "text":  "Statement of pride/gratitude for his friendship"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Praise of the Couple",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Observation of how partner changed/completed him"
                                                                          },
                                                                          {
                                                                              "text":  "Welcome statement to the spouse joining the friend group/family"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Closing \u0026 Toast Call (final 15 seconds)",
                               "subcategories":  [
                                                     {
                                                         "name":  "Classic Toast Lines",
                                                         "axis":  "closer",
                                                         "direction":  "classic",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "\u0027To [Groom] and [Spouse]\u0027 simple raise-glass line",
                                                                              "axis":  "closer",
                                                                              "direction":  "classic"
                                                                          },
                                                                          {
                                                                              "text":  "Short blessing/wish for their future",
                                                                              "axis":  "closer",
                                                                              "direction":  "classic"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Personalized/Callback Closers",
                                                         "axis":  "closer",
                                                         "direction":  "personalized",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Callback to the opening joke or theme for a full-circle close",
                                                                              "axis":  "closer",
                                                                              "direction":  "personalized"
                                                                          },
                                                                          {
                                                                              "text":  "Direct address to groom (\u0027So here\u0027s to you, brother...\u0027)",
                                                                              "axis":  "closer",
                                                                              "direction":  "personalized"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           },
                           {
                               "name":  "Delivery \u0026 Timing Mechanics",
                               "subcategories":  [
                                                     {
                                                         "name":  "Length Control (targeting ~2 minutes / ~250-300 words)",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Written index card with key phrases only (not full script)"
                                                                          },
                                                                          {
                                                                              "text":  "Practice with a timer 3+ times before the wedding"
                                                                          }
                                                                      ]
                                                     },
                                                     {
                                                         "name":  "Delivery Techniques",
                                                         "elements":  [
                                                                          {
                                                                              "text":  "Pause after the joke line for laughter before continuing"
                                                                          },
                                                                          {
                                                                              "text":  "Make eye contact with groom during the sincere middle section"
                                                                          },
                                                                          {
                                                                              "text":  "Raise glass and cue guests to stand/raise theirs at the very end"
                                                                          }
                                                                      ]
                                                     }
                                                 ]
                           }
                       ],
        "selections":  [
                           "Open with how you met, close with today",
                           "Self-deprecating joke about your own toast-giving nerves",
                           "How-we-met story with an embarrassing detail",
                           "Light teasing about a harmless quirk (snoring, bad dancing)"
                       ],
        "genre":  "definition"
    },
{
    "label": "Kitchen Renovation",
    "input": "I want to renovate my kitchen",
    "topic": "Kitchen Renovation",
    "categories": [
      {
        "name": "Scope of Renovation",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Cosmetic Refresh (keep layout & boxes, swap surfaces)",
            "axis": "scope",
            "direction": "cosmetic",
            "elements": [
              {
                "text": "Reface existing cabinet boxes with new doors/fronts",
                "axis": "scope",
                "direction": "cosmetic"
              },
              {
                "text": "Paint or restain existing cabinets",
                "axis": "scope",
                "direction": "cosmetic"
              },
              {
                "text": "Swap countertops only, keep cabinet carcasses",
                "axis": "scope",
                "direction": "cosmetic"
              },
              {
                "text": "Replace backsplash tile",
                "axis": "scope",
                "direction": "cosmetic"
              },
              {
                "text": "Update hardware, faucet, and lighting fixtures",
                "axis": "scope",
                "direction": "cosmetic"
              }
            ]
          },
          {
            "name": "Full Gut Renovation (same footprint, all new components)",
            "axis": "scope",
            "direction": "gut",
            "elements": [
              {
                "text": "Demo down to studs/subfloor, rebuild in place",
                "axis": "scope",
                "direction": "gut"
              },
              {
                "text": "All-new cabinetry in existing footprint",
                "axis": "scope",
                "direction": "gut"
              },
              {
                "text": "Replace all plumbing and electrical rough-in behind walls",
                "axis": "scope",
                "direction": "gut"
              },
              {
                "text": "New flooring throughout",
                "axis": "scope",
                "direction": "gut"
              }
            ]
          },
          {
            "name": "Layout Reconfiguration (move walls, plumbing, or footprint)",
            "axis": "scope",
            "direction": "reconfigure",
            "elements": [
              {
                "text": "Remove wall to open kitchen to living/dining area",
                "axis": "scope",
                "direction": "reconfigure"
              },
              {
                "text": "Relocate sink/plumbing wet wall",
                "axis": "scope",
                "direction": "reconfigure"
              },
              {
                "text": "Add or reposition kitchen island",
                "axis": "scope",
                "direction": "reconfigure"
              },
              {
                "text": "Expand footprint via bump-out or addition",
                "axis": "scope",
                "direction": "reconfigure"
              },
              {
                "text": "Convert adjacent room (pantry, mudroom) into kitchen space",
                "axis": "scope",
                "direction": "reconfigure"
              }
            ]
          }
        ]
      },
      {
        "name": "Budget & Financing",
        "fixedness": 0.2,
        "subcategories": [
          {
            "name": "Funding Source",
            "elements": [
              {
                "text": "Cash/savings"
              },
              {
                "text": "Home equity line of credit (HELOC)"
              },
              {
                "text": "Cash-out refinance"
              },
              {
                "text": "Personal or renovation loan"
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
                "text": "Splurge on appliances, save on cabinetry (stock/semi-custom)"
              },
              {
                "text": "Reserve 10-20% contingency for hidden issues"
              }
            ]
          }
        ]
      },
      {
        "name": "Design & Materials",
        "fixedness": 0.85,
        "subcategories": [
          {
            "name": "Cabinetry Style & Construction",
            "elements": [
              {
                "text": "Framed inset cabinets"
              },
              {
                "text": "Frameless full-overlay (European style)"
              },
              {
                "text": "Stock cabinets"
              },
              {
                "text": "Semi-custom cabinets"
              },
              {
                "text": "Full custom cabinets"
              }
            ]
          },
          {
            "name": "Countertop Material",
            "elements": [
              {
                "text": "Quartz engineered stone"
              },
              {
                "text": "Granite slab"
              },
              {
                "text": "Butcher block wood"
              },
              {
                "text": "Concrete poured-in-place"
              }
            ]
          },
          {
            "name": "Layout Configuration Pattern",
            "elements": [
              {
                "text": "Galley (two parallel runs)",
                "axis": "floorplan",
                "direction": "galley"
              },
              {
                "text": "L-shaped with island",
                "axis": "floorplan",
                "direction": "l-island"
              },
              {
                "text": "U-shaped/horseshoe",
                "axis": "floorplan",
                "direction": "u-shape"
              },
              {
                "text": "Single-wall (one-line) kitchen",
                "axis": "floorplan",
                "direction": "single-wall"
              }
            ]
          }
        ]
      },
      {
        "name": "Appliances & Fixtures",
        "fixedness": 0.75,
        "subcategories": [
          {
            "name": "Cooking Appliance Fuel Type",
            "elements": [
              {
                "text": "Gas range/cooktop",
                "axis": "fuel",
                "direction": "gas"
              },
              {
                "text": "Electric coil or radiant range",
                "axis": "fuel",
                "direction": "electric"
              },
              {
                "text": "Induction cooktop",
                "axis": "fuel",
                "direction": "induction"
              },
              {
                "text": "Dual-fuel range"
              }
            ]
          },
          {
            "name": "Ventilation",
            "elements": [
              {
                "text": "Ducted range hood venting outside",
                "axis": "venting",
                "direction": "ducted"
              },
              {
                "text": "Recirculating/ductless hood",
                "axis": "venting",
                "direction": "ductless"
              },
              {
                "text": "Downdraft ventilation at cooktop",
                "axis": "venting",
                "direction": "downdraft"
              }
            ]
          },
          {
            "name": "Sink & Faucet",
            "elements": [
              {
                "text": "Undermount single-basin sink"
              },
              {
                "text": "Farmhouse apron-front sink"
              },
              {
                "text": "Pull-down touchless faucet"
              }
            ]
          }
        ]
      },
      {
        "name": "Structural, Permits & Code Constraints",
        "fixedness": 0.1,
        "subcategories": [
          {
            "name": "Load-Bearing & Structural Checks",
            "elements": [
              {
                "text": "Engineer assessment for load-bearing wall removal"
              },
              {
                "text": "Install steel beam/header if wall removed"
              }
            ]
          },
          {
            "name": "Permitting Requirements",
            "elements": [
              {
                "text": "Building permit for structural work"
              },
              {
                "text": "Electrical permit for new circuits"
              },
              {
                "text": "Plumbing permit for relocated fixtures"
              }
            ]
          }
        ]
      },
      {
        "name": "Project Execution",
        "fixedness": 0.4,
        "subcategories": [
          {
            "name": "Labor Approach",
            "elements": [
              {
                "text": "Hire general contractor to manage full project",
                "axis": "labor",
                "direction": "gc"
              },
              {
                "text": "Owner acts as general contractor, hires subs directly",
                "axis": "labor",
                "direction": "owner-gc"
              },
              {
                "text": "DIY select portions (painting, demo, install)",
                "axis": "labor",
                "direction": "diy"
              }
            ]
          },
          {
            "name": "Living Arrangement During Work",
            "elements": [
              {
                "text": "Set up temporary kitchen elsewhere in home"
              },
              {
                "text": "Move out during construction"
              },
              {
                "text": "Phase work to keep partial kitchen function"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Remove wall to open kitchen to living/dining area",
      "Quartz engineered stone",
      "Hire general contractor to manage full project"
    ],
    "genre": "essay"
  },
  {
    "label": "UX Career Pivot",
    "input": "I am thinking about switching careers into UX design",
    "topic": "Switching careers into UX design",
    "categories": [
      {
        "name": "Entry path into UX design",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Bootcamp / accelerated program",
            "axis": "entry_path",
            "direction": "bootcamp",
            "elements": [
              {
                "text": "General Assembly UX Design Immersive (10-12 weeks, full-time)"
              },
              {
                "text": "Springboard UX Design Career Track (mentor-guided, part-time)"
              },
              {
                "text": "CareerFoundry UX Design Program (self-paced online)"
              }
            ]
          },
          {
            "name": "Self-taught / portfolio-first path",
            "axis": "entry_path",
            "direction": "self_taught",
            "elements": [
              {
                "text": "Google UX Design Professional Certificate (Coursera)"
              },
              {
                "text": "Freelance redesign case studies (unsolicited app/website redesigns)"
              },
              {
                "text": "Pro-bono nonprofit UX projects for real-client experience"
              },
              {
                "text": "UX design books + YouTube curriculum (Don Norman, NN/g resources)"
              }
            ]
          },
          {
            "name": "Formal degree route",
            "axis": "entry_path",
            "direction": "formal_degree",
            "elements": [
              {
                "text": "HCI/Human-Computer Interaction Master's (e.g., Carnegie Mellon, U. Michigan)"
              },
              {
                "text": "MS in Information/UX Design (e.g., University of Washington iSchool)"
              },
              {
                "text": "Graphic/Interaction Design BFA with UX concentration"
              }
            ]
          },
          {
            "name": "Adjacent-field internal transfer",
            "axis": "entry_path",
            "direction": "adjacent_transfer",
            "elements": [
              {
                "text": "Graphic/visual designer moving into product design"
              },
              {
                "text": "Front-end developer transitioning via UI/interaction skills"
              },
              {
                "text": "Product manager pivoting using domain + stakeholder knowledge"
              },
              {
                "text": "Market/UX researcher moving into design-research hybrid roles"
              }
            ]
          }
        ]
      },
      {
        "name": "UX specialization / role focus",
        "fixedness": 0.85,
        "subcategories": [
          {
            "name": "Research-heavy roles",
            "axis": "specialization",
            "direction": "research",
            "elements": [
              {
                "text": "UX Researcher (qualitative/quantitative studies)"
              },
              {
                "text": "Design strategist / discovery lead"
              }
            ]
          },
          {
            "name": "Interaction & visual design roles",
            "axis": "specialization",
            "direction": "design",
            "elements": [
              {
                "text": "Product/UX Designer (end-to-end flows + wireframes)"
              },
              {
                "text": "UI/Visual Designer (high-fidelity systems, branding)"
              },
              {
                "text": "Interaction Designer (motion, prototyping, micro-interactions)"
              }
            ]
          },
          {
            "name": "Systems & content roles",
            "elements": [
              {
                "text": "Design Systems Designer (component libraries, design tokens)"
              },
              {
                "text": "UX Writer / Content Designer (microcopy, flows)"
              }
            ]
          },
          {
            "name": "Hybrid technical roles",
            "elements": [
              {
                "text": "UX Engineer (design + code prototyping)"
              },
              {
                "text": "Service Designer (end-to-end journey mapping across channels)"
              }
            ]
          }
        ]
      },
      {
        "name": "Core skills & tools to build",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Design software fluency",
            "elements": [
              {
                "text": "Figma (industry-standard interface design)"
              },
              {
                "text": "Sketch (legacy but still used at some orgs)"
              },
              {
                "text": "Adobe XD / Creative Cloud suite"
              }
            ]
          },
          {
            "name": "Research & testing methods",
            "elements": [
              {
                "text": "Usability testing (moderated/unmoderated)"
              },
              {
                "text": "User interviews & contextual inquiry"
              },
              {
                "text": "Card sorting & tree testing for IA"
              },
              {
                "text": "A/B testing & analytics interpretation (e.g., Amplitude, Mixpanel)"
              }
            ]
          },
          {
            "name": "Process & deliverables",
            "elements": [
              {
                "text": "Wireframing & low-fidelity prototyping"
              },
              {
                "text": "User journey mapping"
              },
              {
                "text": "Design critique & stakeholder presentation skills"
              }
            ]
          }
        ]
      },
      {
        "name": "Building a portfolio & proof of skill",
        "fixedness": 0.8,
        "subcategories": [
          {
            "name": "Case study sourcing",
            "axis": "portfolio_source",
            "direction": "real_vs_speculative",
            "elements": [
              {
                "text": "Real client/nonprofit project with measurable outcomes",
                "axis": "portfolio_source",
                "direction": "real"
              },
              {
                "text": "Speculative redesign of existing well-known product",
                "axis": "portfolio_source",
                "direction": "speculative"
              },
              {
                "text": "Design challenge / hackathon project"
              }
            ]
          },
          {
            "name": "Portfolio presentation format",
            "elements": [
              {
                "text": "Personal portfolio website (Webflow, Framer)"
              },
              {
                "text": "PDF case study deck for direct sharing"
              },
              {
                "text": "Process-focused storytelling (problem, research, iteration, outcome)"
              }
            ]
          }
        ]
      },
      {
        "name": "Job search & positioning strategy",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Leveraging prior career background",
            "elements": [
              {
                "text": "Targeting industry where old-career domain knowledge is an asset (e.g., ex-teacher into edtech UX)"
              },
              {
                "text": "Positioning transferable soft skills (stakeholder management, research)"
              }
            ]
          },
          {
            "name": "Company size / environment fit",
            "axis": "company_env",
            "direction": "context",
            "elements": [
              {
                "text": "Startup (broad generalist ownership, faster shipping)",
                "axis": "company_env",
                "direction": "startup"
              },
              {
                "text": "Large enterprise/agency (specialized role, structured process)",
                "axis": "company_env",
                "direction": "enterprise"
              }
            ]
          },
          {
            "name": "Networking & credibility building",
            "elements": [
              {
                "text": "Local UX meetups / ADPList mentorship matching"
              },
              {
                "text": "Contributing to UX communities (Designer Hangout, Slack groups)"
              },
              {
                "text": "Informational interviews with working UX designers"
              }
            ]
          }
        ]
      },
      {
        "name": "Financial & timeline planning for the transition",
        "fixedness": 0.3,
        "subcategories": [
          {
            "name": "Transition pacing",
            "axis": "pacing",
            "direction": "context",
            "elements": [
              {
                "text": "Full-time immersion (quit current job, study intensively)",
                "axis": "pacing",
                "direction": "fast"
              },
              {
                "text": "Part-time transition while employed (nights/weekends)",
                "axis": "pacing",
                "direction": "gradual"
              }
            ]
          },
          {
            "name": "Funding the transition",
            "elements": [
              {
                "text": "Savings runway budgeting (3-6 months buffer)"
              },
              {
                "text": "Income-share agreement bootcamp financing"
              },
              {
                "text": "Employer tuition assistance / reskilling programs"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Google UX Design Professional Certificate (Coursera)",
      "Real client/nonprofit project with measurable outcomes",
      "Part-time transition while employed (nights/weekends)"
    ],
    "genre": "argument"
  },
  {
    "label": "Coffee Cart Business",
    "input": "I want to start a small mobile coffee cart business",
    "topic": "Starting a small mobile coffee cart business",
    "categories": [
      {
        "name": "Business Model & Venue Type",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Fixed/Recurring Spot Vending",
            "axis": "venue_commitment",
            "direction": "fixed",
            "elements": [
              {
                "text": "Daily street corner or sidewalk spot",
                "axis": "venue_commitment",
                "direction": "fixed"
              },
              {
                "text": "Farmers market weekly stall",
                "axis": "venue_commitment",
                "direction": "fixed"
              },
              {
                "text": "Office park courtyard morning route",
                "axis": "venue_commitment",
                "direction": "fixed"
              },
              {
                "text": "Gym or co-working lobby partnership",
                "axis": "venue_commitment",
                "direction": "fixed"
              }
            ]
          },
          {
            "name": "Event & Festival Circuit",
            "axis": "venue_commitment",
            "direction": "variable",
            "elements": [
              {
                "text": "Weekend music/food festivals",
                "axis": "venue_commitment",
                "direction": "variable"
              },
              {
                "text": "Private weddings & corporate parties",
                "axis": "venue_commitment",
                "direction": "variable"
              },
              {
                "text": "Sports tournament concessions",
                "axis": "venue_commitment",
                "direction": "variable"
              },
              {
                "text": "Farmers/artisan pop-up fairs",
                "axis": "venue_commitment",
                "direction": "variable"
              }
            ]
          },
          {
            "name": "B2B Office Catering",
            "elements": [
              {
                "text": "Scheduled office coffee cart visits"
              },
              {
                "text": "Contracted building lobby service"
              },
              {
                "text": "Conference & trade show booth staffing"
              }
            ]
          }
        ]
      },
      {
        "name": "Cart Format & Mobility",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Push/Bike Carts (walkable footprint)",
            "axis": "vehicle_scale",
            "direction": "small",
            "elements": [
              {
                "text": "Compact 3-wheel espresso tricycle",
                "axis": "vehicle_scale",
                "direction": "small"
              },
              {
                "text": "Push cart with propane espresso machine",
                "axis": "vehicle_scale",
                "direction": "small"
              },
              {
                "text": "Foldable pop-up tent + counter setup",
                "axis": "vehicle_scale",
                "direction": "small"
              }
            ]
          },
          {
            "name": "Trailer & Vehicle-Based Units",
            "axis": "vehicle_scale",
            "direction": "large",
            "elements": [
              {
                "text": "Enclosed concession trailer",
                "axis": "vehicle_scale",
                "direction": "large"
              },
              {
                "text": "Converted cargo van",
                "axis": "vehicle_scale",
                "direction": "large"
              },
              {
                "text": "Converted vintage truck (e.g., step van)",
                "axis": "vehicle_scale",
                "direction": "large"
              }
            ]
          }
        ]
      },
      {
        "name": "Equipment & Menu Setup",
        "fixedness": 0.85,
        "subcategories": [
          {
            "name": "Brewing Equipment Choice",
            "axis": "power_source",
            "direction": "electric",
            "elements": [
              {
                "text": "Compact electric espresso machine (2-group)",
                "axis": "power_source",
                "direction": "electric"
              },
              {
                "text": "Battery/generator-powered setup",
                "axis": "power_source",
                "direction": "electric"
              }
            ]
          },
          {
            "name": "Off-Grid Brewing Methods",
            "axis": "power_source",
            "direction": "manual",
            "elements": [
              {
                "text": "Manual lever espresso machine (propane-heated)",
                "axis": "power_source",
                "direction": "manual"
              },
              {
                "text": "Pour-over/batch brew station",
                "axis": "power_source",
                "direction": "manual"
              },
              {
                "text": "Nitro cold brew kegerator",
                "axis": "power_source",
                "direction": "manual"
              }
            ]
          },
          {
            "name": "Menu Positioning",
            "elements": [
              {
                "text": "Specialty espresso-focused menu"
              },
              {
                "text": "Drip/batch coffee volume menu"
              },
              {
                "text": "Seasonal/flavored latte menu"
              },
              {
                "text": "Add-on pastries and light food"
              }
            ]
          }
        ]
      },
      {
        "name": "Legal, Licensing & Compliance",
        "fixedness": 0.15,
        "subcategories": [
          {
            "name": "Business Registration",
            "elements": [
              {
                "text": "LLC formation"
              },
              {
                "text": "Sole proprietorship with DBA"
              }
            ]
          },
          {
            "name": "Health & Safety Permits",
            "elements": [
              {
                "text": "Mobile food vendor permit"
              },
              {
                "text": "County health department inspection certificate"
              },
              {
                "text": "Commissary kitchen agreement"
              },
              {
                "text": "Fire department propane/equipment inspection"
              }
            ]
          },
          {
            "name": "Insurance & Local Zoning",
            "elements": [
              {
                "text": "General liability insurance policy"
              },
              {
                "text": "Vehicle/commercial auto insurance"
              },
              {
                "text": "City street-vending zoning permit"
              }
            ]
          }
        ]
      },
      {
        "name": "Startup Costs & Financing",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Funding Sources",
            "elements": [
              {
                "text": "Personal savings bootstrap"
              },
              {
                "text": "Small business equipment loan"
              },
              {
                "text": "Crowdfunding pre-launch campaign"
              }
            ]
          },
          {
            "name": "Cart Acquisition Method",
            "axis": "asset_acquisition",
            "direction": "buy",
            "elements": [
              {
                "text": "Buy new custom-built cart",
                "axis": "asset_acquisition",
                "direction": "buy"
              },
              {
                "text": "Buy used cart/trailer",
                "axis": "asset_acquisition",
                "direction": "buy"
              }
            ]
          },
          {
            "name": "Cart Leasing/Rental",
            "axis": "asset_acquisition",
            "direction": "lease",
            "elements": [
              {
                "text": "Monthly cart lease-to-own program",
                "axis": "asset_acquisition",
                "direction": "lease"
              },
              {
                "text": "Event-only cart rental service",
                "axis": "asset_acquisition",
                "direction": "lease"
              }
            ]
          }
        ]
      },
      {
        "name": "Marketing & Customer Acquisition",
        "fixedness": 0.8,
        "subcategories": [
          {
            "name": "Local Brand Presence",
            "elements": [
              {
                "text": "Instagram/TikTok location updates"
              },
              {
                "text": "Loyalty punch-card or app program"
              },
              {
                "text": "Branded cart wrap & signage design"
              }
            ]
          },
          {
            "name": "Partnership Building",
            "elements": [
              {
                "text": "Corporate catering client outreach"
              },
              {
                "text": "Event organizer vendor applications"
              },
              {
                "text": "Cross-promotion with local bakeries"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Weekend music/food festivals",
      "Compact 3-wheel espresso tricycle",
      "Mobile food vendor permit"
    ],
    "genre": "action_item"
  },
  {
    "label": "Japan Trip",
    "input": "I am planning a two-week trip to Japan",
    "topic": "Planning a Two-Week Trip to Japan",
    "categories": [
      {
        "name": "Region/Route Focus",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Classic Golden Route (Tokyo–Kyoto–Osaka)",
            "axis": "route",
            "direction": "classic",
            "elements": [
              {
                "text": "Tokyo + day trip to Nikko or Kamakura, then Kyoto, then Osaka",
                "axis": "route",
                "direction": "classic"
              },
              {
                "text": "Add Hiroshima/Miyajima extension via Shinkansen",
                "axis": "route",
                "direction": "classic"
              },
              {
                "text": "Add Hakone/Mt. Fuji stopover en route to Kyoto",
                "axis": "route",
                "direction": "classic"
              }
            ]
          },
          {
            "name": "Off-the-Beaten-Path Focus",
            "axis": "route",
            "direction": "offbeat",
            "elements": [
              {
                "text": "Kanazawa and the Noto Peninsula",
                "axis": "route",
                "direction": "offbeat"
              },
              {
                "text": "Shikoku pilgrimage towns and Iya Valley",
                "axis": "route",
                "direction": "offbeat"
              },
              {
                "text": "Tohoku region (Sendai, Aomori, Akita)",
                "axis": "route",
                "direction": "offbeat"
              },
              {
                "text": "Kyushu hot springs and volcanoes (Beppu, Aso)",
                "axis": "route",
                "direction": "offbeat"
              }
            ]
          },
          {
            "name": "All-Japan Grand Tour (fast-paced, multi-region)",
            "axis": "route",
            "direction": "grandtour",
            "elements": [
              {
                "text": "Tokyo → Kyoto/Osaka → Hiroshima → back to Tokyo loop",
                "axis": "route",
                "direction": "grandtour"
              },
              {
                "text": "Add Hokkaido leg via domestic flight",
                "axis": "route",
                "direction": "grandtour"
              },
              {
                "text": "Add Okinawa island leg via domestic flight",
                "axis": "route",
                "direction": "grandtour"
              }
            ]
          }
        ]
      },
      {
        "name": "Season & Timing",
        "fixedness": 0.3,
        "subcategories": [
          {
            "name": "Cherry Blossom Season (late Mar–early Apr)",
            "axis": "season",
            "direction": "sakura",
            "elements": [
              {
                "text": "Book Kyoto/Tokyo hotels 6+ months ahead",
                "axis": "season",
                "direction": "sakura"
              },
              {
                "text": "Plan route north-to-south or vice versa to chase bloom front",
                "axis": "season",
                "direction": "sakura"
              }
            ]
          },
          {
            "name": "Autumn Foliage Season (mid-Nov–early Dec)",
            "axis": "season",
            "direction": "koyo",
            "elements": [
              {
                "text": "Prioritize Kyoto temples (Tofukuji, Arashiyama)",
                "axis": "season",
                "direction": "koyo"
              },
              {
                "text": "Day trip to Nikko or Nara for foliage",
                "axis": "season",
                "direction": "koyo"
              }
            ]
          },
          {
            "name": "Off-Peak Winter/Summer Travel",
            "axis": "season",
            "direction": "offpeak",
            "elements": [
              {
                "text": "Winter: Snow Festival (Sapporo) and hot springs",
                "axis": "season",
                "direction": "offpeak"
              },
              {
                "text": "Summer: mountain retreats (Kamikochi, Nagano) to escape heat",
                "axis": "season",
                "direction": "offpeak"
              }
            ]
          }
        ]
      },
      {
        "name": "Transportation Strategy",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Japan Rail Pass Options",
            "axis": "rail_pass",
            "direction": "pass",
            "elements": [
              {
                "text": "7-day JR Pass timed to cover long-haul Shinkansen legs",
                "axis": "rail_pass",
                "direction": "pass"
              },
              {
                "text": "Regional pass (JR Kansai, JR East) for localized touring",
                "axis": "rail_pass",
                "direction": "pass"
              }
            ]
          },
          {
            "name": "Pay-As-You-Go IC Card Travel",
            "axis": "rail_pass",
            "direction": "payg",
            "elements": [
              {
                "text": "Suica or Pasmo card for city subways/buses",
                "axis": "rail_pass",
                "direction": "payg"
              },
              {
                "text": "Individual Shinkansen tickets booked via Smart-EX",
                "axis": "rail_pass",
                "direction": "payg"
              }
            ]
          },
          {
            "name": "Domestic Flights & Rental Car",
            "elements": [
              {
                "text": "Peach or Jetstar budget flights for Hokkaido/Okinawa legs"
              },
              {
                "text": "Rental car for rural Shikoku/Tohoku/Iya Valley stretches"
              }
            ]
          }
        ]
      },
      {
        "name": "Accommodation Style",
        "fixedness": 0.8,
        "subcategories": [
          {
            "name": "Traditional Ryokan Stays",
            "axis": "lodging",
            "direction": "traditional",
            "elements": [
              {
                "text": "One-night kaiseki ryokan in Hakone or Kinosaki Onsen",
                "axis": "lodging",
                "direction": "traditional"
              },
              {
                "text": "Multi-night temple lodging (shukubo) on Mt. Koya",
                "axis": "lodging",
                "direction": "traditional"
              }
            ]
          },
          {
            "name": "Modern City Hotels & Capsule Stays",
            "axis": "lodging",
            "direction": "modern",
            "elements": [
              {
                "text": "Business hotel chain (APA, Toyoko Inn) for city nights",
                "axis": "lodging",
                "direction": "modern"
              },
              {
                "text": "Capsule hotel or pod stay for one novelty night in Tokyo",
                "axis": "lodging",
                "direction": "modern"
              }
            ]
          },
          {
            "name": "Apartment/Airbnb Base",
            "axis": "lodging",
            "direction": "apartment",
            "elements": [
              {
                "text": "Kyoto machiya townhouse rental for a multi-night base",
                "axis": "lodging",
                "direction": "apartment"
              }
            ]
          }
        ]
      },
      {
        "name": "Experience & Activity Themes",
        "fixedness": 0.95,
        "subcategories": [
          {
            "name": "Food & Culinary Deep Dive",
            "elements": [
              {
                "text": "Tsukiji/Toyosu outer market food crawl"
              },
              {
                "text": "Osaka street food tour (takoyaki, okonomiyaki, kushikatsu)"
              },
              {
                "text": "Sake brewery tour in Fushimi or Niigata"
              }
            ]
          },
          {
            "name": "Culture & History Immersion",
            "elements": [
              {
                "text": "Kyoto temple/shrine circuit (Kiyomizu, Fushimi Inari)"
              },
              {
                "text": "Hiroshima Peace Memorial and Miyajima torii gate"
              },
              {
                "text": "Samurai/Ninja museum experience in Kyoto or Nagano"
              }
            ]
          },
          {
            "name": "Pop Culture & Modern Tokyo",
            "elements": [
              {
                "text": "Akihabara anime/electronics district"
              },
              {
                "text": "teamLab digital art museum"
              },
              {
                "text": "Shibuya/Harajuku fashion and nightlife district"
              }
            ]
          },
          {
            "name": "Nature & Outdoor Adventure",
            "elements": [
              {
                "text": "Mt. Fuji 5th Station visit or day hike"
              },
              {
                "text": "Arashiyama bamboo grove and Sagano trails"
              },
              {
                "text": "Kamikochi alpine valley trek"
              }
            ]
          }
        ]
      },
      {
        "name": "Budget & Pacing",
        "fixedness": 0.4,
        "subcategories": [
          {
            "name": "Fast-Paced Multi-City Itinerary",
            "axis": "pace",
            "direction": "fast",
            "elements": [
              {
                "text": "Change base city every 2 nights",
                "axis": "pace",
                "direction": "fast"
              },
              {
                "text": "Pack 3-4 regions into 14 days",
                "axis": "pace",
                "direction": "fast"
              }
            ]
          },
          {
            "name": "Slow Travel with Fewer Bases",
            "axis": "pace",
            "direction": "slow",
            "elements": [
              {
                "text": "2-3 bases with day trips radiating out",
                "axis": "pace",
                "direction": "slow"
              },
              {
                "text": "Build in unscheduled free days",
                "axis": "pace",
                "direction": "slow"
              }
            ]
          },
          {
            "name": "Budget Tier Planning",
            "elements": [
              {
                "text": "Backpacker-style budget (hostels, convenience store meals)"
              },
              {
                "text": "Mid-range comfort budget (business hotels, mix of dining)"
              },
              {
                "text": "Luxury tier (ryokan kaiseki, private guides, Shinkansen Green Car)"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Tokyo + day trip to Nikko or Kamakura, then Kyoto, then Osaka",
      "7-day JR Pass timed to cover long-haul Shinkansen legs",
      "Osaka street food tour (takoyaki, okonomiyaki, kushikatsu)"
    ],
    "genre": "summary"
  },
  {
    "label": "New Puppy Training",
    "input": "I just adopted a puppy and need to train it",
    "topic": "Training a newly adopted puppy",
    "categories": [
      {
        "name": "Training focus area",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "House training (potty training)",
            "elements": [
              {
                "text": "Crate-based schedule (confinement + frequent outdoor trips)",
                "axis": "containment",
                "direction": "crate"
              },
              {
                "text": "Puppy pads / indoor litter box method",
                "axis": "containment",
                "direction": "pad"
              },
              {
                "text": "Bell-on-door signal training"
              },
              {
                "text": "Umbilical cord (tethering puppy to you) method"
              }
            ]
          },
          {
            "name": "Crate training",
            "elements": [
              {
                "text": "Wire crate with divider panel"
              },
              {
                "text": "Plastic airline-style crate"
              },
              {
                "text": "Soft-sided crate (for trained/travel use)"
              },
              {
                "text": "Gradual desensitization protocol (short absences first)"
              }
            ]
          },
          {
            "name": "Basic obedience cues",
            "elements": [
              {
                "text": "Sit"
              },
              {
                "text": "Down"
              },
              {
                "text": "Stay"
              },
              {
                "text": "Come (recall)"
              },
              {
                "text": "Leave it / drop it"
              }
            ]
          },
          {
            "name": "Leash training",
            "elements": [
              {
                "text": "Loose-leash walking drills"
              },
              {
                "text": "Front-clip harness",
                "axis": "leash_gear",
                "direction": "harness"
              },
              {
                "text": "Flat buckle collar",
                "axis": "leash_gear",
                "direction": "collar"
              },
              {
                "text": "Head halter (e.g., Gentle Leader)",
                "axis": "leash_gear",
                "direction": "head-halter"
              }
            ]
          },
          {
            "name": "Socialization",
            "elements": [
              {
                "text": "Structured puppy socialization class"
              },
              {
                "text": "Controlled exposure to novel sounds/surfaces/objects"
              },
              {
                "text": "Supervised play with vaccinated adult dogs"
              },
              {
                "text": "Handling exercises (paws, ears, mouth) for vet/grooming tolerance"
              }
            ]
          }
        ]
      },
      {
        "name": "Training method / philosophy",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Positive reinforcement (reward-based)",
            "axis": "method",
            "direction": "positive-reinforcement",
            "elements": [
              {
                "text": "Clicker marker training"
              },
              {
                "text": "High-value treat luring/shaping"
              }
            ]
          },
          {
            "name": "Balanced training (rewards + corrections)",
            "axis": "method",
            "direction": "balanced",
            "elements": [
              {
                "text": "Verbal interrupter + redirect"
              },
              {
                "text": "Slip lead correction (for leash manners)"
              }
            ]
          },
          {
            "name": "Professional guidance",
            "elements": [
              {
                "text": "Private in-home trainer"
              },
              {
                "text": "Group puppy class at pet store/facility"
              },
              {
                "text": "Online video-based training program"
              }
            ]
          }
        ]
      },
      {
        "name": "Puppy developmental stage & timing",
        "fixedness": 0.1,
        "subcategories": [
          {
            "name": "Critical socialization window (roughly 3–14 weeks)",
            "elements": [
              {
                "text": "Prioritize exposure before fear period sets in"
              }
            ]
          },
          {
            "name": "Fear periods",
            "elements": [
              {
                "text": "Adjust intensity of new experiences during first fear period (~8-11 wks)"
              },
              {
                "text": "Adjust intensity during adolescent fear period (~6-14 months)"
              }
            ]
          },
          {
            "name": "Teething & adolescence",
            "elements": [
              {
                "text": "Appropriate chew toy rotation during teething"
              },
              {
                "text": "Reinforce recall/impulse control during adolescent regression"
              }
            ]
          }
        ]
      },
      {
        "name": "Behavior problem prevention & management",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Bite inhibition & nipping",
            "elements": [
              {
                "text": "Yelp-and-withdraw-attention technique"
              },
              {
                "text": "Redirect to appropriate chew toy"
              }
            ]
          },
          {
            "name": "Separation-related distress",
            "elements": [
              {
                "text": "Departure cue desensitization"
              },
              {
                "text": "Independence-building exercises (settle on a mat alone)"
              }
            ]
          },
          {
            "name": "Jumping & impulse control",
            "elements": [
              {
                "text": "Four-paws-on-floor reward rule"
              },
              {
                "text": "Wait-at-door/threshold exercise"
              }
            ]
          },
          {
            "name": "Resource guarding prevention",
            "elements": [
              {
                "text": "Trade-up exercises (swap item for higher-value treat)"
              },
              {
                "text": "Hand-feeding near food bowl during meals"
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
            "name": "Reward delivery tools",
            "elements": [
              {
                "text": "Clicker"
              },
              {
                "text": "Treat pouch"
              }
            ]
          },
          {
            "name": "Containment & safety gear",
            "elements": [
              {
                "text": "Exercise pen (x-pen)"
              },
              {
                "text": "Baby gates for room restriction"
              }
            ]
          },
          {
            "name": "Enrichment items",
            "elements": [
              {
                "text": "Snuffle mat"
              },
              {
                "text": "Kong stuffed with frozen treats"
              },
              {
                "text": "Puzzle feeder toy"
              }
            ]
          }
        ]
      },
      {
        "name": "Health & readiness prerequisites",
        "fixedness": 0.1,
        "subcategories": [
          {
            "name": "Vaccination status",
            "elements": [
              {
                "text": "Complete core vaccine series before public dog-park exposure"
              }
            ]
          },
          {
            "name": "Breed-specific traits",
            "elements": [
              {
                "text": "Account for herding-breed nipping tendency in training plan"
              },
              {
                "text": "Account for high-energy working breed exercise needs before sessions"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Crate-based schedule (confinement + frequent outdoor trips)",
      "Structured puppy socialization class",
      "Clicker marker training"
    ],
    "genre": "story"
  },
  {
    "label": "AWS Certification",
    "input": "I am studying for the AWS Solutions Architect certification",
    "topic": "Studying for AWS Solutions Architect Certification",
    "categories": [
      {
        "name": "Certification Level",
        "fixedness": 0.3,
        "subcategories": [
          {
            "name": "Solutions Architect Associate (SAA-C03)",
            "axis": "cert-level",
            "direction": "associate",
            "elements": [
              {
                "text": "Target SAA-C03 exam (130 min, 65 questions)",
                "axis": "cert-level",
                "direction": "associate"
              },
              {
                "text": "Assume 0-1 years hands-on AWS experience prerequisite",
                "axis": "cert-level",
                "direction": "associate"
              }
            ]
          },
          {
            "name": "Solutions Architect Professional (SAP-C02)",
            "axis": "cert-level",
            "direction": "professional",
            "elements": [
              {
                "text": "Target SAP-C02 exam (180 min, scenario-heavy)",
                "axis": "cert-level",
                "direction": "professional"
              },
              {
                "text": "Require Associate cert (or equivalent experience) as prerequisite first",
                "axis": "cert-level",
                "direction": "professional"
              }
            ]
          }
        ]
      },
      {
        "name": "Core Domain Knowledge",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Compute & Containers",
            "elements": [
              {
                "text": "EC2 instance families & purchasing options (Spot, RI, Savings Plans)"
              },
              {
                "text": "Auto Scaling Groups with launch templates"
              },
              {
                "text": "ECS/Fargate vs EKS for container workloads"
              },
              {
                "text": "Lambda for event-driven/serverless compute"
              }
            ]
          },
          {
            "name": "Storage & Databases",
            "elements": [
              {
                "text": "S3 storage classes & lifecycle policies"
              },
              {
                "text": "EBS vs EFS vs FSx selection"
              },
              {
                "text": "RDS Multi-AZ vs Aurora Global Database"
              },
              {
                "text": "DynamoDB partition key & GSI design"
              }
            ]
          },
          {
            "name": "Networking & Content Delivery",
            "elements": [
              {
                "text": "VPC design with public/private/isolated subnets"
              },
              {
                "text": "Transit Gateway vs VPC Peering vs PrivateLink"
              },
              {
                "text": "CloudFront + Route 53 routing policies"
              },
              {
                "text": "Direct Connect vs Site-to-Site VPN"
              }
            ]
          },
          {
            "name": "Security, Identity & Compliance",
            "elements": [
              {
                "text": "IAM policies, roles, and permission boundaries"
              },
              {
                "text": "KMS encryption key management"
              },
              {
                "text": "AWS Organizations SCPs for multi-account guardrails"
              },
              {
                "text": "GuardDuty & Security Hub for threat detection"
              }
            ]
          }
        ]
      },
      {
        "name": "Architectural Framework Mastery",
        "fixedness": 0.5,
        "subcategories": [
          {
            "name": "AWS Well-Architected Framework Pillars",
            "elements": [
              {
                "text": "Reliability pillar (multi-AZ, failover design)"
              },
              {
                "text": "Cost Optimization pillar (right-sizing, Savings Plans)"
              },
              {
                "text": "Security pillar (defense in depth)"
              },
              {
                "text": "Performance Efficiency pillar (caching, elasticity)"
              },
              {
                "text": "Operational Excellence pillar (IaC, automation)"
              }
            ]
          },
          {
            "name": "Migration & Modernization Strategies",
            "elements": [
              {
                "text": "6 R's of migration (rehost, replatform, refactor, etc.)"
              },
              {
                "text": "AWS Migration Hub & Application Discovery Service"
              },
              {
                "text": "Database Migration Service (DMS) for cutover"
              }
            ]
          }
        ]
      },
      {
        "name": "Study Resources & Formats",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Video Courses",
            "elements": [
              {
                "text": "Adrian Cantrill's SAA/SAP course"
              },
              {
                "text": "Stephane Maarek Udemy course"
              },
              {
                "text": "AWS Skill Builder official digital training"
              }
            ]
          },
          {
            "name": "Practice Exams & Question Banks",
            "elements": [
              {
                "text": "Tutorials Dojo practice tests"
              },
              {
                "text": "Official AWS practice question sets"
              },
              {
                "text": "Whizlabs practice exams"
              }
            ]
          },
          {
            "name": "Reference & Documentation",
            "elements": [
              {
                "text": "AWS Well-Architected Framework whitepaper"
              },
              {
                "text": "AWS FAQs pages per service"
              },
              {
                "text": "AWS re:Invent session recordings"
              }
            ]
          }
        ]
      },
      {
        "name": "Hands-On Practice",
        "fixedness": 0.8,
        "subcategories": [
          {
            "name": "Free-Tier Lab Building",
            "elements": [
              {
                "text": "Build a 3-tier VPC architecture manually"
              },
              {
                "text": "Deploy static site via S3 + CloudFront"
              },
              {
                "text": "Set up Auto Scaling with an ALB"
              }
            ]
          },
          {
            "name": "Guided Lab Platforms",
            "elements": [
              {
                "text": "AWS Skill Builder hands-on labs"
              },
              {
                "text": "A Cloud Guru cloud playground labs"
              },
              {
                "text": "Cantrill.io practice-exam-linked labs"
              }
            ]
          },
          {
            "name": "Infrastructure as Code Practice",
            "elements": [
              {
                "text": "CloudFormation template authoring"
              },
              {
                "text": "AWS CDK for programmatic infrastructure"
              }
            ]
          }
        ]
      },
      {
        "name": "Exam Logistics & Scheduling",
        "fixedness": 0.1,
        "subcategories": [
          {
            "name": "Delivery Method",
            "elements": [
              {
                "text": "Pearson VUE test center",
                "axis": "delivery",
                "direction": "in-person"
              },
              {
                "text": "Online proctored exam from home",
                "axis": "delivery",
                "direction": "remote"
              }
            ]
          },
          {
            "name": "Registration & Cost Details",
            "elements": [
              {
                "text": "Register via AWS Certification portal"
              },
              {
                "text": "Apply AWS re:Invent/Cloud Practitioner discount voucher"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "Target SAA-C03 exam (130 min, 65 questions)",
      "VPC design with public/private/isolated subnets",
      "Tutorials Dojo practice tests"
    ],
    "genre": "definition"
  },
  {
    "label": "First Car Purchase",
    "input": "I want to buy my first car",
    "topic": "Buying Your First Car",
    "categories": [
      {
        "name": "Budget Range",
        "fixedness": 0.2,
        "subcategories": [
          {
            "name": "Under $10k (used, high-mileage or older)",
            "axis": "budget",
            "direction": "low",
            "elements": [
              {
                "text": "5-8 year old economy sedan (60k-100k miles)",
                "axis": "budget",
                "direction": "low"
              },
              {
                "text": "Certified pre-owned from a private seller",
                "axis": "budget",
                "direction": "low"
              },
              {
                "text": "Auction/dealer lot 'as-is' car",
                "axis": "budget",
                "direction": "low"
              }
            ]
          },
          {
            "name": "$10k-20k (newer used or base new)",
            "axis": "budget",
            "direction": "mid",
            "elements": [
              {
                "text": "2-4 year old certified pre-owned (CPO)",
                "axis": "budget",
                "direction": "mid"
              },
              {
                "text": "Entry-level new model (base trim)",
                "axis": "budget",
                "direction": "mid"
              }
            ]
          },
          {
            "name": "$20k+ (new or well-equipped used)",
            "axis": "budget",
            "direction": "high",
            "elements": [
              {
                "text": "New car with mid/upper trim package",
                "axis": "budget",
                "direction": "high"
              },
              {
                "text": "1-2 year old lightly used CPO with financing incentives",
                "axis": "budget",
                "direction": "high"
              }
            ]
          }
        ]
      },
      {
        "name": "Financing Method",
        "fixedness": 0.7,
        "subcategories": [
          {
            "name": "Cash Purchase",
            "axis": "payment",
            "direction": "cash",
            "elements": [
              {
                "text": "Pay full amount upfront, no loan",
                "axis": "payment",
                "direction": "cash"
              },
              {
                "text": "Negotiate 'cash price' discount with dealer",
                "axis": "payment",
                "direction": "cash"
              }
            ]
          },
          {
            "name": "Auto Loan",
            "axis": "payment",
            "direction": "loan",
            "elements": [
              {
                "text": "Credit union pre-approved loan",
                "axis": "payment",
                "direction": "loan"
              },
              {
                "text": "Dealer-arranged financing (manufacturer incentive rate)",
                "axis": "payment",
                "direction": "loan"
              },
              {
                "text": "Bank auto loan",
                "axis": "payment",
                "direction": "loan"
              }
            ]
          },
          {
            "name": "Lease",
            "axis": "payment",
            "direction": "lease",
            "elements": [
              {
                "text": "Manufacturer lease deal (low mileage cap)",
                "axis": "payment",
                "direction": "lease"
              },
              {
                "text": "Lease-to-own agreement",
                "axis": "payment",
                "direction": "lease"
              }
            ]
          }
        ]
      },
      {
        "name": "New vs Used Condition",
        "fixedness": 0.8,
        "subcategories": [
          {
            "name": "Brand New",
            "axis": "condition",
            "direction": "new",
            "elements": [
              {
                "text": "Full factory warranty vehicle",
                "axis": "condition",
                "direction": "new"
              },
              {
                "text": "Custom-ordered trim/color from factory",
                "axis": "condition",
                "direction": "new"
              }
            ]
          },
          {
            "name": "Certified Pre-Owned (CPO)",
            "axis": "condition",
            "direction": "cpo",
            "elements": [
              {
                "text": "Manufacturer CPO with extended warranty",
                "axis": "condition",
                "direction": "cpo"
              },
              {
                "text": "Dealer CPO inspection program",
                "axis": "condition",
                "direction": "cpo"
              }
            ]
          },
          {
            "name": "Private-Party Used",
            "axis": "condition",
            "direction": "used",
            "elements": [
              {
                "text": "Individual seller listing (Craigslist/Facebook Marketplace)",
                "axis": "condition",
                "direction": "used"
              },
              {
                "text": "Estate/inherited vehicle sale",
                "axis": "condition",
                "direction": "used"
              }
            ]
          }
        ]
      },
      {
        "name": "Vehicle Type & Use Case",
        "fixedness": 0.9,
        "subcategories": [
          {
            "name": "Commuter/Daily Driver",
            "elements": [
              {
                "text": "Compact sedan (e.g. Honda Civic, Toyota Corolla)",
                "axis": "bodytype",
                "direction": "sedan"
              },
              {
                "text": "Hatchback (e.g. Mazda3, VW Golf)",
                "axis": "bodytype",
                "direction": "hatchback"
              },
              {
                "text": "Hybrid commuter (e.g. Toyota Prius, Honda Insight)",
                "axis": "powertrain",
                "direction": "hybrid"
              }
            ]
          },
          {
            "name": "Family/Cargo Needs",
            "elements": [
              {
                "text": "Compact SUV (e.g. Honda CR-V, Toyota RAV4)",
                "axis": "bodytype",
                "direction": "suv"
              },
              {
                "text": "Minivan (e.g. Honda Odyssey, Toyota Sienna)",
                "axis": "bodytype",
                "direction": "minivan"
              }
            ]
          },
          {
            "name": "Performance/Enthusiast",
            "elements": [
              {
                "text": "Sport compact (e.g. Subaru WRX, Honda Civic Si)"
              },
              {
                "text": "Used sports coupe (e.g. Ford Mustang, Mazda MX-5)"
              }
            ]
          }
        ]
      },
      {
        "name": "Powertrain Choice",
        "fixedness": 0.6,
        "subcategories": [
          {
            "name": "Gasoline (Internal Combustion)",
            "axis": "powertrain",
            "direction": "gas",
            "elements": [
              {
                "text": "Standard gas 4-cylinder engine",
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
            "name": "Hybrid",
            "axis": "powertrain",
            "direction": "hybrid",
            "elements": [
              {
                "text": "Standard hybrid (no plug-in)",
                "axis": "powertrain",
                "direction": "hybrid"
              },
              {
                "text": "Plug-in hybrid (PHEV) with electric-only range",
                "axis": "powertrain",
                "direction": "hybrid"
              }
            ]
          },
          {
            "name": "Fully Electric (EV)",
            "axis": "powertrain",
            "direction": "electric",
            "elements": [
              {
                "text": "Short-range budget EV (e.g. Chevy Bolt, Nissan Leaf)",
                "axis": "powertrain",
                "direction": "electric"
              },
              {
                "text": "Long-range EV (e.g. Tesla Model 3, Hyundai Ioniq 6)",
                "axis": "powertrain",
                "direction": "electric"
              }
            ]
          }
        ]
      },
      {
        "name": "Purchase Process & Due Diligence",
        "fixedness": 0.3,
        "subcategories": [
          {
            "name": "Pre-Purchase Verification",
            "elements": [
              {
                "text": "Independent mechanic pre-purchase inspection"
              },
              {
                "text": "Vehicle history report (Carfax/AutoCheck)"
              },
              {
                "text": "VIN check for recalls/liens"
              }
            ]
          },
          {
            "name": "Negotiation & Paperwork",
            "elements": [
              {
                "text": "Out-the-door price negotiation (fees included)"
              },
              {
                "text": "Title transfer and registration filing"
              },
              {
                "text": "Sales tax and DMV fee calculation"
              }
            ]
          },
          {
            "name": "Insurance Setup",
            "elements": [
              {
                "text": "Liability-only coverage quote"
              },
              {
                "text": "Full coverage (comprehensive + collision) quote"
              }
            ]
          }
        ]
      }
    ],
    "selections": [
      "2-4 year old certified pre-owned (CPO)",
      "Credit union pre-approved loan",
      "Compact SUV (e.g. Honda CR-V, Toyota RAV4)"
    ],
    "genre": "essay"
  }
];

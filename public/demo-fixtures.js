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
    }
];

const SHOWCASE_FIXTURES = [
  {
    "label": "Custom Tattoo",
    "topic": "Designing a custom tattoo",
    "specSnippet": "Scope One standalone tattoo. Forearm placement, wrapping the limb rather than sitting flat on one plane. Final size under 3 inches. Full color. No sleeve, no expansion planned — this piece stands alone. Covers design, technique, and aging considerations only.…",
    "image": "images/showcase/custom-tattoo.jpg"
  },
  {
    "label": "Custom Furniture",
    "topic": "Designing a Custom Furniture Piece",
    "specSnippet": "Scope One fixed-length dining table, seats 6–8, built for daily heavy use — kids, spills, homework, everyday meals. Not a folding or extending table. Not a bench/chair set (base design only extends to the table's own legs/stretcher). Material and joinery…",
    "image": "images/showcase/custom-furniture.jpg"
  },
  {
    "label": "Engagement Ring",
    "topic": "Designing a custom engagement ring",
    "specSnippet": "Scope Custom engagement ring build. One center stone, one setting, one shank. Covers stone selection, metal, setting architecture, style detailing, and fit. Excludes wedding band, resizing after year one, and insurance/appraisal paperwork (handle separately,…",
    "image": "images/showcase/engagement-ring.jpg"
  },
  {
    "label": "Guitar Build",
    "topic": "Designing a custom guitar build",
    "specSnippet": "Scope One electric guitar, solid-body, single build. Telecaster-style slab body, flat top, no carve, no binding. 24.75\" scale, hardtail bridge, coil-splittable humbucker(s), opaque nitro finish. Excludes: tremolo/vibrato systems, active electronics,…",
    "image": "images/showcase/guitar-build.jpg"
  },
  {
    "label": "Gaming PC Build",
    "topic": "Designing a Custom Gaming PC Build",
    "specSnippet": "Scope Single-GPU gaming desktop, ATX mid-tower form factor. Covers CPU/platform, GPU, memory, storage, cooling, case, PSU, lighting, and display pairing — end to end from parts list to OS install. Excludes multi-GPU, workstation/rack builds, laptop or SFF…",
    "image": "images/showcase/gaming-pc-build.jpg"
  },
  {
    "label": "Custom Car Build",
    "topic": "Designing a Custom Car Build",
    "specSnippet": "Scope Resto-mod build on a body-on-frame classic platform. Period-correct exterior and stock steel panels over a modernized chassis, drivetrain, brakes, and electrical system. Frame stays separate from body — that's what makes this swap feasible without…",
    "image": "images/showcase/custom-car-build.jpg"
  },
  {
    "label": "Tiny House Build",
    "topic": "Designing a Custom Tiny House Build",
    "specSnippet": "Scope This brief covers a single-unit tiny house on a gooseneck trailer chassis, towable by a half-ton truck, GVWR under 7,000 lbs. Covers chassis, envelope, layout, and systems as they'd be handed to a builder. Excludes site work, foundation/pad…",
    "image": "images/showcase/tiny-house-build.jpg"
  },
  {
    "label": "Custom Bicycle",
    "topic": "Designing a custom bicycle build",
    "specSnippet": "Scope Custom road frameset build for criterium/road racing use. Priority: outright speed, aerodynamics, quick handling. Covers frame, fork, geometry, drivetrain, brakes, wheels/tires, cockpit, saddle, finish. Excludes: bike fit session itself (measurements…",
    "image": "images/showcase/custom-bicycle.jpg"
  },
  {
    "label": "Wallcovering Pattern",
    "topic": "Creating a complete wallcovering pattern specification",
    "specSnippet": "Scope Full pattern specification for one wallcovering design, single colorway, ready for print production and field installation. Covers: substrate, print method, pattern match/repeat, finish, installation method, performance/compliance data, and…",
    "image": "images/showcase/wallcovering-pattern.jpg"
  },
  {
    "label": "Lobby Feature Wall",
    "topic": "Environmental Graphics Package for a Lobby Feature Wall",
    "specSnippet": "Scope Single feature wall, lobby entry sightline. Wall face only — not ceiling, not adjacent corridor signage, not exterior. Includes: substrate prep, printed wrap, dimensional lettering, illumination, ADA directory panel, mounting hardware. Excludes: general…",
    "image": "images/showcase/lobby-feature-wall.jpg"
  },
  {
    "label": "Window Film",
    "topic": "Defining a window film specification (opacity and motif rules)",
    "specSnippet": "Scope This spec covers window film only — material, optical performance, motif/pattern, and install method for glazed openings on the project. Excludes: glazing replacement, framing/mullion work, structural glass repair, and lighting control systems…",
    "image": "images/showcase/window-film.jpg"
  },
  {
    "label": "Ceiling Mural",
    "topic": "Ceiling Mural Specification: Orientation & Panel Sequencing",
    "specSnippet": "Scope Ceiling mural for a coffered ceiling, ship-lot fabricated in panels, marouflaged and mechanically fastened in place. Covers orientation, grid layout, panel sequencing, substrate, fastening, and light conditions. Excludes structural assessment of the…",
    "image": "images/showcase/ceiling-mural.jpg"
  },
  {
    "label": "Gallery Wall System",
    "topic": "Producing a Gallery Wall Specification with Spacing and Sizing",
    "specSnippet": "Scope Gallery wall installation spec for one wall (or one stair run) using uniform framed prints/photos. Covers layout pattern, frame/mat/glazing spec, hardware, and marking method. Excludes art selection, print production, and wall repair/paint prep — assume…",
    "image": "images/showcase/gallery-wall-system.jpg"
  },
  {
    "label": "Furniture Surface Graphics",
    "topic": "Furniture Surface Specification with Edge Wraps and CNC Cutlines",
    "specSnippet": "Scope Panel-based furniture component spec — flat stock only, 3/4\" (19mm) nominal thickness. Covers substrate, surface laminate, edge treatment, joinery bores, and CNC cutfile/toolpath requirements for parts cut from this stock. Excludes frame/leg assemblies,…",
    "image": "images/showcase/furniture-surface-graphics.jpg"
  },
  {
    "label": "Facade Wrap",
    "topic": "Generating a facade wrap specification with anchor points and material constraints",
    "specSnippet": "Scope Facade wrap spec for open-joint rainscreen cladding system, ACM panel face, point-fixed aluminum subframe. Covers: anchor-to-substrate connection, vertical rail/bracket subframe, panel attachment, expansion joint transitions, load testing requirements.…",
    "image": "images/showcase/facade-wrap.jpg"
  },
  {
    "label": "Scenic Backdrop",
    "topic": "Producing a scenic backdrop specification with rigging and quick-change sequencing",
    "specSnippet": "Scope Spec covers one soft-good scenic backdrop (muslin drop), painted, rigged for fly operation via manual counterweight system. Includes: drop construction, top/bottom pocket treatment, rigging hang plot, quick-change sequencing (flying and blackout).…",
    "image": "images/showcase/scenic-backdrop.jpg"
  },
  {
    "label": "Textile Pattern",
    "topic": "Generating a textile pattern specification (repeat structure + dye process metadata)",
    "specSnippet": "Scope This spec covers one textile pattern build: repeat structure, colorway/screen data, print process, and dye-fixation method. Includes: vector repeat file requirements, block grid geometry, colorway/Pantone reference, screen count, rotary print process,…",
    "image": "images/showcase/textile-pattern.jpg"
  },
  {
    "label": "Wiring Harness",
    "topic": "Generating a wiring harness specification with pinouts and BOM",
    "specSnippet": "Scope This spec covers a single point-to-point wiring harness plus one integrated power distribution sub-harness for an automotive/off-highway application. Included: connector selection and pinouts, wire stock (gauge/color/length/insulation), CAN bus segment,…",
    "image": "images/showcase/wiring-harness.jpg"
  },
  {
    "label": "Brand Identity System",
    "topic": "Creating a Brand Identity Specification with Tokens and Usage Rules",
    "specSnippet": "Scope This spec defines the brand's design tokens and usage rules — the machine-readable and human-readable layer that sits between the brand's visual identity and its implementation in code. Covers: token architecture, color, typography, spacing, motion…",
    "image": "images/showcase/brand-identity-system.jpg"
  },
  {
    "label": "Logo System",
    "topic": "Generating a Logo System Specification with Variants and Constraints",
    "specSnippet": "Scope Logo system for one brand, single name, single icon mark. Covers three variants (wordmark, horizontal lockup, icon-only glyph), one primary color palette, sizing and clear-space rules, and the file package needed to deploy across print, web, and app…",
    "image": "images/showcase/logo-system.jpg"
  },
  {
    "label": "UI Design Tokens",
    "topic": "Producing a UI Design Token Specification for a Multi-Platform App",
    "specSnippet": "Scope Defines the design token architecture for a multi-platform app (web + iOS, extensible to Android). Covers: token tiers (global → semantic → component), source-of-truth format, build pipeline, platform outputs, one light theme, one density variant…",
    "image": "images/showcase/ui-design-tokens.jpg"
  },
  {
    "label": "AR Overlay",
    "topic": "Producing an AR overlay specification with anchors and behaviors",
    "specSnippet": "Scope This spec defines a single AR overlay layer: anchor types, the coordinate frame they resolve against, trigger/behavior bindings, one interaction gesture, rendering/environment integration, and the asset budget for content attached to anchors. Covers:…",
    "image": "images/showcase/ar-overlay.jpg"
  },
  {
    "label": "Signal Routing",
    "topic": "Creating a Signal Routing Specification with Connector Rules",
    "specSnippet": "Scope This spec covers signal routing for one system topology: analog audio, digital audio (AES67), and any control/data lines sharing the same pathways. It defines connector types, pinout standards, cable selection, run identification, and the compliance…",
    "image": "images/showcase/signal-routing.jpg"
  },
  {
    "label": "Drapery Pattern",
    "topic": "Creating a Drapery Pattern Specification with Seam Rules",
    "specSnippet": "Scope This spec covers pattern and cutting rules for a pair of pinch-pleat drapery panels, railroaded face fabric, locked-in lining, on a large-scale printed motif requiring repeat matching. Covers fullness ratio, seam placement, repeat allowance, cut length,…",
    "image": "images/showcase/drapery-pattern.jpg"
  },
  {
    "label": "Workflow Automation",
    "topic": "Creating a Workflow Automation Specification with Triggers and Actions",
    "specSnippet": "Scope This spec defines one workflow: a single event-based trigger driving a sequential action chain, terminating in one external API call. Covers: trigger definition, filter condition, event schema, shared context object, action definition, execution model,…",
    "image": "images/showcase/workflow-automation.jpg"
  },
  {
    "label": "Compliance Policy",
    "topic": "Creating a Compliance Policy Specification with Clauses and Triggers",
    "specSnippet": "Scope Spec covers one compliance policy artifact: the clause schema, trigger/condition logic, enforcement behavior, logging, and reporting for a rules engine enforcing obligations on data events. Included: clause structure, evaluation mechanics, action types,…",
    "image": "images/showcase/compliance-policy.jpg"
  }
];

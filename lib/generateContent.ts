export interface ContentPreferences {
  businessType: string;
  brandVoice: string;
  targetAudience: string;
  primaryOffer: string;
  signatureStyle: string;
  tone: "educational" | "inspirational" | "entertaining" | "behind-the-scenes" | "launch";
  platformFocus: "instagram" | "tiktok" | "youtube" | "linkedin" | "multi";
  productionLevel: "lofi" | "studio" | "hybrid";
  videoLength: "30" | "45" | "60";
  contentPillars: string;
  callToAction: string;
}

export interface GeneratedShot {
  id: number;
  type: string;
  description: string;
  details: string;
}

export interface GeneratedContent {
  campaignTitle: string;
  themeStatement: string;
  hookIdeas: string[];
  angles: string[];
  shots: GeneratedShot[];
  scriptBeats: { label: string; summary: string; script: string }[];
  supportingNotes: string[];
}

export interface ThemeCampaignPlan {
  themeHeadline: string;
  narrativeNorthStar: string;
  campaign: {
    name: string;
    format: string;
    cadence: string;
    description: string;
    posts: { id: number; title: string; promise: string; callToAction: string }[];
  };
  shotList: GeneratedShot[];
  script: {
    hook: string;
    beats: { label: string; detail: string }[];
    closer: string;
    deliveryNotes: string;
  };
}

const toneDescriptors: Record<ContentPreferences["tone"], string> = {
  educational: "Teach & transform",
  inspirational: "Elevate & inspire",
  entertaining: "Hook & delight",
  "behind-the-scenes": "Show the craft",
  launch: "Build anticipation"
};

const platformAngles: Record<ContentPreferences["platformFocus"], string[]> = {
  instagram: [
    "Visually immersive carousel-ready storytelling",
    "High-energy reels pacing with quick jump cuts"
  ],
  tiktok: [
    "Snappy hook in the first 2 seconds",
    "Conversational delivery that feels native to For You Page"
  ],
  youtube: [
    "Structured narrative arc with hook, depth, and payoff",
    "Crisp b-roll layering for retention"
  ],
  linkedin: [
    "Authority building with actionable takeaways",
    "People-first storytelling that sparks conversation"
  ],
  multi: [
    "Modular storyline that can be atomized per platform",
    "Loop-friendly intro and CTA for shorts and reels"
  ]
};

const toneHooks: Record<ContentPreferences["tone"], string[]> = {
  educational: [
    "You're wasting {timeMetric} on {painPoint}. Here's the fix.",
    "Three {audience} mistakes I fix for every {businessType} client.",
    "If you're {audience}, steal this {offer} framework."
  ],
  inspirational: [
    "Proof your {businessType} can look cinematic without Hollywood.",
    "From {painPoint} to booked out—here's how we did it.",
    "What if your {offer} felt like a Netflix trailer?"
  ],
  entertaining: [
    "POV: Your {offer} drops jaws in 30 seconds.",
    "I bet you haven't seen a {businessType} do this.",
    "We turned {painPoint} into a viral moment."
  ],
  "behind-the-scenes": [
    "Step inside the creative kitchen for our latest {offer} build.",
    "How we capture {audience}-obsessed visuals in one afternoon.",
    "Watch us turn raw ideas into scroll-stopping shots."
  ],
  launch: [
    "Sneak peek: {offer} is about to rewire the way {audience} thinks.",
    "Countdown to launch—here's the visual story arc.",
    "This is the {businessType} drop everyone's been asking for."
  ]
};

const shotTemplates = [
  {
    type: "Establishing energy",
    build: (prefs: ContentPreferences) =>
      `Dynamic opener of you in action—set the vibe for ${prefs.businessType} with confident movement and branded props.`
  },
  {
    type: "Value delivery",
    build: (prefs: ContentPreferences) =>
      `Direct-to-camera moment breaking down ${prefs.primaryOffer} for ${prefs.targetAudience}. Keep eye contact and use captions.`
  },
  {
    type: "Social proof",
    build: (prefs: ContentPreferences) =>
      `Overlay testimonial quote or transformation metric that tackles ${derivePainPoint(prefs)}.`
  },
  {
    type: "Behind the craft",
    build: (prefs: ContentPreferences) =>
      `B-roll of your process: hands, tools, workspace. Highlight the ${prefs.signatureStyle} touches.`
  },
  {
    type: "Call-to-action",
    build: (prefs: ContentPreferences) =>
      `Punchy closing shot with bold text for "${prefs.callToAction}" and gesture toward on-screen prompt.`
  }
];

function derivePainPoint(prefs: ContentPreferences): string {
  if (prefs.targetAudience.toLowerCase().includes("founder")) {
    return "not knowing what to post next";
  }
  if (prefs.targetAudience.toLowerCase().includes("coach")) {
    return "low converting discovery calls";
  }
  if (prefs.targetAudience.toLowerCase().includes("agency")) {
    return "projects stalling without a content engine";
  }
  return `struggling to stay consistent with ${prefs.primaryOffer}`;
}

function interpolate(template: string, prefs: ContentPreferences): string {
  return template
    .replace("{timeMetric}", `${prefs.videoLength}-second clips`)
    .replace("{painPoint}", derivePainPoint(prefs))
    .replace("{audience}", prefs.targetAudience)
    .replace("{businessType}", prefs.businessType)
    .replace("{offer}", prefs.primaryOffer);
}

function createAngles(prefs: ContentPreferences): string[] {
  const pillars = prefs.contentPillars
    .split(/,|\n|;/)
    .map((pillar) => pillar.trim())
    .filter(Boolean);

  if (pillars.length === 0) {
    pillars.push("signature story", "client proof", "process deep-dive");
  }

  return pillars.slice(0, 3).map((pillar, index) => {
    const toneLabel = toneDescriptors[prefs.tone];
    return `${toneLabel} • ${capitalize(pillar)} • ${prefs.platformFocus === "multi" ? "Modular" : capitalize(prefs.platformFocus)} ready`;
  });
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => capitalize(word.toLowerCase()))
    .join(" ");
}

function craftScriptBeats(prefs: ContentPreferences): GeneratedContent["scriptBeats"] {
  const beats: GeneratedContent["scriptBeats"] = [
    {
      label: "Hook",
      summary: "Stop-the-scroll question or bold claim",
      script: interpolate(toneHooks[prefs.tone][0], prefs)
    },
    {
      label: "Context",
      summary: "Anchor the problem with a quick visual",
      script: `When I work with ${prefs.targetAudience}, the first thing I audit is their ${prefs.signatureStyle} presence.`
    },
    {
      label: "Solution",
      summary: "Reveal the framework or process",
      script: `Here's our ${prefs.primaryOffer} framework: capture attention, deliver a pattern-interrupt, and close with "${prefs.callToAction}".`
    },
    {
      label: "CTA",
      summary: "Invite action with urgency",
      script: `Ready for the ${prefs.businessType} glow-up? ${prefs.callToAction}.`
    }
  ];

  return beats;
}

function createSupportingNotes(prefs: ContentPreferences): string[] {
  const notes = [
    `${capitalize(prefs.platformFocus)} focus • ${platformAngles[prefs.platformFocus][0]}`,
    `${toneDescriptors[prefs.tone]} • ${platformAngles[prefs.platformFocus][1]}`,
    `Keep run time close to ${prefs.videoLength} seconds for peak retention.`
  ];

  if (prefs.productionLevel === "lofi") {
    notes.push("Prioritize natural light and handheld energy for authenticity.");
  } else if (prefs.productionLevel === "studio") {
    notes.push("Lock in tripods, key lighting, and layered audio texture.");
  } else {
    notes.push("Mix handheld BTS moments with locked-off hero shots.");
  }

  notes.push(`Add branded lower-thirds that echo your ${prefs.signatureStyle} flair.`);
  return notes;
}

export function generateContent(prefs: ContentPreferences): GeneratedContent {
  const hooks = toneHooks[prefs.tone].map((template) => interpolate(template, prefs));

  const shots: GeneratedShot[] = shotTemplates.map((template, index) => ({
    id: index + 1,
    type: template.type,
    description: template.build(prefs),
    details:
      index === 0
        ? "Use 0.5x lens or wide angle to pull viewers in instantly. Add upbeat sound bed."
        : index === 1
        ? `Layer bold captions. Mention "${prefs.callToAction}" by beat three.`
        : index === 2
        ? "Stack social proof with overlay text + quick-cut testimonials."
        : index === 3
        ? "Capture tactile detail shots. Slow motion on the best texture moment."
        : "Flash CTA on screen for final two beats with end-card graphic."
  }));

  const angles = createAngles(prefs);
  const scriptBeats = craftScriptBeats(prefs);
  const supportingNotes = createSupportingNotes(prefs);

  return {
    campaignTitle: `${capitalize(prefs.signatureStyle)} ${capitalize(prefs.platformFocus)} Spotlight`,
    themeStatement: `${prefs.businessType} x ${toneDescriptors[prefs.tone]} • ${prefs.primaryOffer} for ${prefs.targetAudience}`,
    hookIdeas: hooks,
    angles,
    shots,
    scriptBeats,
    supportingNotes
  };
}

const campaignArchetypes = [
  {
    key: "launch",
    name: "Countdown Momentum",
    format: "3-part reveal series",
    cadence: "3 posts over 6 days",
    description:
      "Warm the audience, deliver the transformation, and rally them into the offer window.",
    postBlueprint: [
      {
        title: "Spark the Curiosity",
        promise: (theme: string) => `Announce the shift: why ${theme} matters right now.`
      },
      {
        title: "Prove the Transformation",
        promise: (theme: string) => `Show behind-the-scenes receipts of ${theme} coming alive.`
      },
      {
        title: "Activate the Action",
        promise: (theme: string) => `Deliver a bold CTA tying ${theme} to a tangible next step.`
      }
    ]
  },
  {
    key: "education",
    name: "Teach & Triumph",
    format: "4-part mini masterclass",
    cadence: "4 posts across two weeks",
    description:
      "Educate through bite-sized lessons, layer proof, and invite deeper engagement.",
    postBlueprint: [
      {
        title: "The Mindset Shift",
        promise: (theme: string) => `Reframe how your audience should think about ${theme}.`
      },
      {
        title: "The Framework",
        promise: (theme: string) => `Break ${theme} into 3 actionable moves they can swipe today.`
      },
      {
        title: "Field Proof",
        promise: (theme: string) => `Share a client or personal story showing ${theme} in motion.`
      },
      {
        title: "Invite the Next Step",
        promise: (theme: string) => `Point to your offer or lead magnet that deepens ${theme}.`
      }
    ]
  },
  {
    key: "community",
    name: "Community Pulse",
    format: "5-post conversation arc",
    cadence: "5 posts over 10 days",
    description:
      "Spark dialogue, spotlight voices, and co-create moments around the theme.",
    postBlueprint: [
      {
        title: "The Invitation",
        promise: (theme: string) => `Ask a provocative question about ${theme} to start the dialogue.`
      },
      {
        title: "The Hot Take",
        promise: (theme: string) => `Drop your bold perspective on ${theme} and why it matters.`
      },
      {
        title: "The Spotlight",
        promise: (theme: string) => `Feature a community member or client riffing on ${theme}.`
      },
      {
        title: "The Challenge",
        promise: (theme: string) => `Give them a quick action to embody ${theme} this week.`
      },
      {
        title: "The Debrief",
        promise: (theme: string) => `Recap wins, learnings, and tease what's next for ${theme}.`
      }
    ]
  }
];

function selectArchetype(theme: string) {
  const normalized = theme.toLowerCase();

  if (/(launch|reveal|drop|debut)/.test(normalized)) {
    return campaignArchetypes[0];
  }

  if (/(framework|educat|playbook|system|masterclass|guide)/.test(normalized)) {
    return campaignArchetypes[1];
  }

  if (/(community|conversation|story|series|crowd)/.test(normalized)) {
    return campaignArchetypes[2];
  }

  return campaignArchetypes[1];
}

function craftThemeShotList(theme: string): GeneratedShot[] {
  const titleCaseTheme = toTitleCase(theme);

  return [
    {
      id: 1,
      type: "Hero reveal",
      description: `Wide opener introducing the world of ${titleCaseTheme}.`,
      details: "Use dynamic camera motion or a slider to create cinematic energy."
    },
    {
      id: 2,
      type: "Core narrative",
      description: `Direct-to-camera delivery outlining the promise of ${titleCaseTheme}.`,
      details: "Frame chest-up, keep eye-line locked, and gesture with purpose."
    },
    {
      id: 3,
      type: "Proof point",
      description: `Overlay metrics, testimonials, or BTS moments that back up ${titleCaseTheme}.`,
      details: "Mix screen recordings with kinetic typography for punch."
    },
    {
      id: 4,
      type: "Immersive detail",
      description: `Macro or texture shots that symbolize ${titleCaseTheme} in action.`,
      details: "Capture tactile moments—hands, tools, behind-the-scenes grit."
    },
    {
      id: 5,
      type: "Call-to-action",
      description: `Closing setup where you invite viewers deeper into ${titleCaseTheme}.`,
      details: "On-screen text plus verbal CTA directing to the campaign next step."
    }
  ];
}

function craftThemeScript(theme: string) {
  const titleCaseTheme = toTitleCase(theme);

  return {
    hook: `What if ${titleCaseTheme} was the spark that redefined your next launch?`,
    beats: [
      {
        label: "Scene 1",
        detail: `Paint the before state—what the audience risks if they ignore ${titleCaseTheme}.`
      },
      {
        label: "Scene 2",
        detail: `Reveal the turning point that proves ${titleCaseTheme} can deliver fast wins.`
      },
      {
        label: "Scene 3",
        detail: `Demonstrate how your offer operationalizes ${titleCaseTheme} step by step.`
      }
    ],
    closer: `Ready to build with ${titleCaseTheme}? Drop a "READY" and I'll send the full breakdown.`,
    deliveryNotes: "Aim for 55-60 seconds. Pace like a cinematic trailer: hook hard, breathe in the middle, punch the CTA."
  };
}

function describeNorthStar(theme: string): string {
  const normalized = theme.toLowerCase();

  if (normalized.includes("ai")) {
    return "Blend human-led storytelling with smart automation.";
  }

  if (/(wellness|health|mind|soul)/.test(normalized)) {
    return "Make the transformation feel tactile, calm, and attainable.";
  }

  if (/(brand|identity|design)/.test(normalized)) {
    return "Lead with a visual narrative that feels bespoke and art-directed.";
  }

  if (/(launch|product|offer)/.test(normalized)) {
    return "Build anticipation, tease the payoff, and spotlight the moment of drop.";
  }

  return "Anchor the message in tangible change and clear next steps.";
}

export function generateThemeCampaign(theme: string): ThemeCampaignPlan {
  const trimmedTheme = theme.trim();
  const archetype = selectArchetype(trimmedTheme);
  const themeHeadline = `${toTitleCase(trimmedTheme)} Campaign Blueprint`;
  const narrativeNorthStar = describeNorthStar(trimmedTheme);

  const posts = archetype.postBlueprint.map((post, index) => ({
    id: index + 1,
    title: post.title,
    promise: post.promise(trimmedTheme),
    callToAction:
      index === archetype.postBlueprint.length - 1
        ? "Primary CTA: drive to offer or waitlist"
        : "Secondary CTA: comment or share insights"
  }));

  return {
    themeHeadline,
    narrativeNorthStar,
    campaign: {
      name: archetype.name,
      format: archetype.format,
      cadence: archetype.cadence,
      description: archetype.description,
      posts
    },
    shotList: craftThemeShotList(trimmedTheme),
    script: craftThemeScript(trimmedTheme)
  };
}

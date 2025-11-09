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

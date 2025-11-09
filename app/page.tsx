"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";
import type {
  ContentPreferences,
  GeneratedContent,
  ThemeCampaignPlan,
  ThemeGenerationMode
} from "../lib/generateContent";
import { generateContent, generateThemeCampaign } from "../lib/generateContent";

const defaultPrefs: ContentPreferences = {
  businessType: "Creative growth studio",
  brandVoice: "Bold, cinematic, strategic",
  targetAudience: "service-based founders",
  primaryOffer: "content-to-client blueprint",
  signatureStyle: "high-contrast cinematic",
  tone: "educational",
  platformFocus: "instagram",
  productionLevel: "hybrid",
  videoLength: "45",
  contentPillars: "Signature story arc, Offer breakdown, Community proof",
  callToAction: "Drop 'READY' to get the content roadmap"
};

const defaultTheme = "Cinematic reveal of our AI-assisted content sprint service";

const businessTypeOptions = [
  "Creative growth studio",
  "Personal brand consultancy",
  "Fractional CMO collective",
  "Video production agency"
];

const brandVoiceOptions = [
  "Bold, cinematic, strategic",
  "Warm, story-driven, collaborative",
  "Playful, punchy, disruptive",
  "Minimal, refined, confident"
];

const targetAudienceOptions = [
  "service-based founders",
  "creative entrepreneurs",
  "agency owners",
  "course creators"
];

const primaryOfferOptions = [
  "content-to-client blueprint",
  "done-for-you launch accelerator",
  "signature storytelling intensive",
  "retainer video partnership"
];

const signatureStyleOptions = [
  "high-contrast cinematic",
  "minimal monochrome",
  "color-drenched kinetic",
  "organic documentary"
];

const contentPillarOptions = [
  "Signature story arc, Offer breakdown, Community proof",
  "Authority mini-lessons, Behind-the-scenes, Client wins",
  "Trend remix, Value stack, Conversion CTA",
  "Mindset shifts, Process tour, Launch runway"
];

export default function Home() {
  const [activeGenerator, setActiveGenerator] = useState<"brand" | "theme">("brand");
  const [prefs, setPrefs] = useState<ContentPreferences>(defaultPrefs);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedContent>(() => generateContent(defaultPrefs));
  const [themePrompt, setThemePrompt] = useState(defaultTheme);
  const [themeMode, setThemeMode] = useState<ThemeGenerationMode>("campaign");
  const [themePostCount, setThemePostCount] = useState(3);
  const [themePlan, setThemePlan] = useState<ThemeCampaignPlan>(() =>
    generateThemeCampaign(defaultTheme, "campaign", 3)
  );
  const [isThemeGenerating, setIsThemeGenerating] = useState(false);

  const platformLabel = useMemo(() => {
    switch (prefs.platformFocus) {
      case "instagram":
        return "Instagram";
      case "tiktok":
        return "TikTok";
      case "youtube":
        return "YouTube Shorts";
      case "linkedin":
        return "LinkedIn";
      default:
        return "Multi-platform";
    }
  }, [prefs.platformFocus]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setGenerated(generateContent(prefs));
      setIsGenerating(false);
    }, 320);
  };

  const handleThemeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsThemeGenerating(true);

    setTimeout(() => {
      setThemePlan(
        generateThemeCampaign(
          themePrompt,
          themeMode,
          themeMode === "campaign" ? themePostCount : undefined
        )
      );
      setIsThemeGenerating(false);
    }, 320);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setPrefs((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setThemePrompt(event.target.value);
  };

  const handleThemeModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeMode(event.target.value as ThemeGenerationMode);
  };

  const handleThemePostCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemePostCount(Number(event.target.value));
  };

  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <h1>Content Generator Studio</h1>
        <p>
          Build high-converting short-form narratives in seconds. Drop in your brand style or a
          single theme and we craft hooks, campaigns, shot lists, and scripts tuned for
          {platformLabel}.
        </p>
      </header>

      <section className={styles.workspace}>
        <div className={styles.generatorSwitcher}>
          <button
            type="button"
            onClick={() => setActiveGenerator("brand")}
            className={`${styles.tabButton} ${
              activeGenerator === "brand" ? styles.tabButtonActive : ""
            }`}
          >
            Brand system builder
          </button>
          <button
            type="button"
            onClick={() => setActiveGenerator("theme")}
            className={`${styles.tabButton} ${
              activeGenerator === "theme" ? styles.tabButtonActive : ""
            }`}
          >
            Post idea generator
          </button>
        </div>

        <div className={styles.content}>
          {activeGenerator === "brand" ? (
            <>
              <form className={styles.card} onSubmit={handleSubmit}>
                <h2>Your brand DNA</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formRow}>
                    <label htmlFor="businessType">Business type</label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={prefs.businessType}
                      onChange={handleInputChange}
                    >
                      {businessTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="brandVoice">Brand voice</label>
                    <select
                      id="brandVoice"
                      name="brandVoice"
                      value={prefs.brandVoice}
                      onChange={handleInputChange}
                    >
                      {brandVoiceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="targetAudience">Primary audience</label>
                    <select
                      id="targetAudience"
                      name="targetAudience"
                      value={prefs.targetAudience}
                      onChange={handleInputChange}
                    >
                      {targetAudienceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="primaryOffer">Signature offer</label>
                    <select
                      id="primaryOffer"
                      name="primaryOffer"
                      value={prefs.primaryOffer}
                      onChange={handleInputChange}
                    >
                      {primaryOfferOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="signatureStyle">Visual signature</label>
                    <select
                      id="signatureStyle"
                      name="signatureStyle"
                      value={prefs.signatureStyle}
                      onChange={handleInputChange}
                    >
                      {signatureStyleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="contentPillars">Content pillars</label>
                    <select
                      id="contentPillars"
                      name="contentPillars"
                      value={prefs.contentPillars}
                      onChange={handleInputChange}
                    >
                      {contentPillarOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="tone">Content tone</label>
                    <select id="tone" name="tone" value={prefs.tone} onChange={handleInputChange}>
                      <option value="educational">Educational</option>
                      <option value="inspirational">Inspirational</option>
                      <option value="entertaining">Entertaining</option>
                      <option value="behind-the-scenes">Behind the scenes</option>
                      <option value="launch">Launch / announcement</option>
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="platformFocus">Primary platform</label>
                    <select
                      id="platformFocus"
                      name="platformFocus"
                      value={prefs.platformFocus}
                      onChange={handleInputChange}
                    >
                      <option value="instagram">Instagram Reels</option>
                      <option value="tiktok">TikTok</option>
                      <option value="youtube">YouTube Shorts</option>
                      <option value="linkedin">LinkedIn Video</option>
                      <option value="multi">Multi-platform remix</option>
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="productionLevel">Production level</label>
                    <select
                      id="productionLevel"
                      name="productionLevel"
                      value={prefs.productionLevel}
                      onChange={handleInputChange}
                    >
                      <option value="lofi">Lo-fi / UGC</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="studio">Studio polish</option>
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="videoLength">Ideal length</label>
                    <select
                      id="videoLength"
                      name="videoLength"
                      value={prefs.videoLength}
                      onChange={handleInputChange}
                    >
                      <option value="30">30 seconds</option>
                      <option value="45">45 seconds</option>
                      <option value="60">60 seconds</option>
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="callToAction">Call to action</label>
                    <input
                      id="callToAction"
                      name="callToAction"
                      value={prefs.callToAction}
                      onChange={handleInputChange}
                      placeholder="Invite viewers to DM, click, or opt-in"
                      required
                    />
                  </div>
                </div>

                <button className={styles.generateButton} type="submit" disabled={isGenerating}>
                  {isGenerating ? "Crafting your blueprint..." : "Generate content system"}
                </button>
              </form>

              <article className={styles.card}>
                <h2>{generated.campaignTitle}</h2>
                <div className={styles.badgeRow}>
                  <span className={styles.badge}>{generated.themeStatement}</span>
                  <span className={styles.badge}>{prefs.brandVoice}</span>
                  <span className={styles.badge}>{platformLabel}</span>
                </div>

                <div className={styles.results}>
                  <section className={styles.section}>
                    <h3>Hooks to test</h3>
                    <ul className={styles.highlightList}>
                      {generated.hookIdeas.map((hook) => (
                        <li key={hook}>{hook}</li>
                      ))}
                    </ul>
                  </section>

                  <section className={styles.section}>
                    <h3>Angles & story beats</h3>
                    <ul className={styles.highlightList}>
                      {generated.angles.map((angle) => (
                        <li key={angle}>{angle}</li>
                      ))}
                    </ul>
                  </section>

                  <section className={styles.section}>
                    <h3>Shot list blueprint</h3>
                    <div className={styles.shotGrid}>
                      {generated.shots.map((shot) => (
                        <div key={shot.id} className={styles.shotCard}>
                          <h4>
                            {shot.id}. {shot.type}
                          </h4>
                          <p>{shot.description}</p>
                          <p>
                            <strong>Direction:</strong> {shot.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h3>Script beats</h3>
                    <ul className={styles.highlightList}>
                      {generated.scriptBeats.map((beat) => (
                        <li key={beat.label}>
                          <strong>{beat.label} — {beat.summary}:</strong> {beat.script}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className={styles.section}>
                    <h3>Director notes</h3>
                    <ul className={styles.highlightList}>
                      {generated.supportingNotes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </article>
            </>
          ) : (
            <>
              <form className={styles.card} onSubmit={handleThemeSubmit}>
                <h2>Post idea lab</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formRow}>
                    <label htmlFor="themePrompt">Theme or topic</label>
                    <textarea
                      id="themePrompt"
                      name="themePrompt"
                      value={themePrompt}
                      onChange={handleThemeChange}
                      rows={4}
                      placeholder="e.g. Behind-the-scenes countdown for our rebrand"
                      required
                    />
                  </div>
                  <div className={styles.formRow}>
                    <label htmlFor="themeMode">Format</label>
                    <select
                      id="themeMode"
                      name="themeMode"
                      value={themeMode}
                      onChange={handleThemeModeChange}
                    >
                      <option value="single">Single Instagram post</option>
                      <option value="campaign">Campaign series</option>
                    </select>
                  </div>
                  {themeMode === "campaign" ? (
                    <div className={styles.formRow}>
                      <label htmlFor="themePostCount">Number of posts</label>
                      <select
                        id="themePostCount"
                        name="themePostCount"
                        value={themePostCount}
                        onChange={handleThemePostCountChange}
                      >
                        {[2, 3, 4, 5].map((count) => (
                          <option key={count} value={count}>
                            {count} posts
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                </div>
                <p className={styles.helperText}>
                  Use a focus like <q>AI storytelling for wedding filmmakers</q> or{' '}
                  <q>5-part nurture around our new offer</q> and we&apos;ll return IG-ready
                  scripts, shot lists, and CTAs for each idea.
                </p>
                <button className={styles.generateButton} type="submit" disabled={isThemeGenerating}>
                  {isThemeGenerating ? "Mapping your ideas..." : "Generate ready-to-shoot ideas"}
                </button>
              </form>

              <article className={styles.card}>
                <h2>{themePlan.themeHeadline}</h2>
                <div className={styles.badgeRow}>
                  <span className={styles.badge}>{themePlan.narrativeNorthStar}</span>
                  <span className={styles.badge}>
                    {themePlan.mode === "campaign"
                      ? themePlan.campaign?.scopeLabel ?? `${themePlan.posts.length}-post rollout`
                      : "Single post build"}
                  </span>
                  {themePlan.campaign ? (
                    <>
                      <span className={styles.badge}>{themePlan.campaign.format}</span>
                      <span className={styles.badge}>{themePlan.campaign.cadence}</span>
                    </>
                  ) : (
                    <span className={styles.badge}>IG-ready scripting</span>
                  )}
                </div>

                <div className={styles.results}>
                  <section className={styles.section}>
                    <h3>
                      {themePlan.mode === "campaign"
                        ? themePlan.campaign?.name ?? "Campaign outline"
                        : "Concept outline"}
                    </h3>
                    {themePlan.campaign ? (
                      <p className={styles.sectionLead}>{themePlan.campaign.description}</p>
                    ) : (
                      <p className={styles.sectionLead}>Single post concept engineered for your theme.</p>
                    )}
                    <ul className={styles.highlightList}>
                      {themePlan.posts.map((post) => (
                        <li key={post.id}>
                          <strong>
                            {post.id}. {post.title}:
                          </strong>{" "}
                          {post.promise}{" "}
                          <span className={styles.inlineTag}>{post.callToAction}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className={styles.section}>
                    <h3>Production kits</h3>
                    <div className={styles.postGrid}>
                      {themePlan.posts.map((post) => (
                        <div key={post.id} className={styles.postCard}>
                          <h4>
                            {post.id}. {post.title}
                          </h4>
                          <p className={styles.postPromise}>{post.promise}</p>
                          <span className={styles.inlineTag}>{post.callToAction}</span>

                          <div className={styles.postSubsection}>
                            <h5>Shot list</h5>
                            <ul className={styles.highlightList}>
                              {post.shots.map((shot) => (
                                <li key={shot.id}>
                                  <strong>
                                    {shot.id}. {shot.type}:
                                  </strong>{" "}
                                  {shot.description}
                                  <br />
                                  <span className={styles.subtleNote}>{shot.details}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className={styles.postSubsection}>
                            <h5>Script</h5>
                            <p>
                              <strong>Hook:</strong> {post.script.hook}
                            </p>
                            <ul className={styles.highlightList}>
                              {post.script.beats.map((beat) => (
                                <li key={beat.label}>
                                  <strong>{beat.label}:</strong> {beat.detail}
                                </li>
                              ))}
                            </ul>
                            <p>
                              <strong>Closer:</strong> {post.script.closer}
                            </p>
                            <p className={styles.helperText}>{post.script.deliveryNotes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </article>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

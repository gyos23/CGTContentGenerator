"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";
import type { ContentPreferences, GeneratedContent, ThemeCampaignPlan } from "../lib/generateContent";
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

export default function Home() {
  const [activeGenerator, setActiveGenerator] = useState<"brand" | "theme">("brand");
  const [prefs, setPrefs] = useState<ContentPreferences>(defaultPrefs);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedContent>(() => generateContent(defaultPrefs));
  const [themePrompt, setThemePrompt] = useState(defaultTheme);
  const [themePlan, setThemePlan] = useState<ThemeCampaignPlan>(() => generateThemeCampaign(defaultTheme));
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
      setThemePlan(generateThemeCampaign(themePrompt));
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
            Theme campaign lab
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
                    <input
                      id="businessType"
                      name="businessType"
                      value={prefs.businessType}
                      onChange={handleInputChange}
                      placeholder="Creative agency, personal brand, studio..."
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="brandVoice">Brand voice</label>
                    <input
                      id="brandVoice"
                      name="brandVoice"
                      value={prefs.brandVoice}
                      onChange={handleInputChange}
                      placeholder="e.g. punchy, cinematic, warm"
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="targetAudience">Primary audience</label>
                    <input
                      id="targetAudience"
                      name="targetAudience"
                      value={prefs.targetAudience}
                      onChange={handleInputChange}
                      placeholder="e.g. service-based founders"
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="primaryOffer">Signature offer</label>
                    <input
                      id="primaryOffer"
                      name="primaryOffer"
                      value={prefs.primaryOffer}
                      onChange={handleInputChange}
                      placeholder="What are you selling?"
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="signatureStyle">Visual signature</label>
                    <input
                      id="signatureStyle"
                      name="signatureStyle"
                      value={prefs.signatureStyle}
                      onChange={handleInputChange}
                      placeholder="Describe your look & feel"
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <label htmlFor="contentPillars">Content pillars</label>
                    <textarea
                      id="contentPillars"
                      name="contentPillars"
                      value={prefs.contentPillars}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Separate with commas or new lines"
                    />
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
                <h2>Theme-driven campaign</h2>
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
                </div>
                <p className={styles.helperText}>
                  Use a focus like <q>AI storytelling for wedding filmmakers</q> or{' '}
                  <q>5-part nurture around our new offer</q>.
                </p>
                <button className={styles.generateButton} type="submit" disabled={isThemeGenerating}>
                  {isThemeGenerating ? "Mapping your campaign..." : "Generate campaign plan"}
                </button>
              </form>

              <article className={styles.card}>
                <h2>{themePlan.themeHeadline}</h2>
                <div className={styles.badgeRow}>
                  <span className={styles.badge}>{themePlan.narrativeNorthStar}</span>
                  <span className={styles.badge}>{themePlan.campaign.format}</span>
                  <span className={styles.badge}>{themePlan.campaign.cadence}</span>
                </div>

                <div className={styles.results}>
                  <section className={styles.section}>
                    <h3>{themePlan.campaign.name}</h3>
                    <p className={styles.sectionLead}>{themePlan.campaign.description}</p>
                    <ul className={styles.highlightList}>
                      {themePlan.campaign.posts.map((post) => (
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
                    <h3>Shot list</h3>
                    <div className={styles.shotGrid}>
                      {themePlan.shotList.map((shot) => (
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
                    <h3>Full script blueprint</h3>
                    <div className={styles.scriptBlock}>
                      <p>
                        <strong>Hook:</strong> {themePlan.script.hook}
                      </p>
                      <ul className={styles.highlightList}>
                        {themePlan.script.beats.map((beat) => (
                          <li key={beat.label}>
                            <strong>{beat.label}:</strong> {beat.detail}
                          </li>
                        ))}
                      </ul>
                      <p>
                        <strong>Closer:</strong> {themePlan.script.closer}
                      </p>
                      <p className={styles.helperText}>{themePlan.script.deliveryNotes}</p>
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

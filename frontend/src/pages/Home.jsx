import React from "react";
import Hero from "../components/Hero";
import CtaHome from "../components/CtaHome";
import FeatureHowTo from "../components/FeatureHowTo";
import FeatureAdvantages from "../components/FeatureAdvantages";

/**
 * Zusammensetzen aller Startseiten Komponenten
 *
 * @returns die gesamte Startseite
 */
function Home() {
  return (
    <>
      <Hero />
      <FeatureHowTo />
      <FeatureAdvantages />
      <CtaHome />
    </>
  );
}

export default Home;

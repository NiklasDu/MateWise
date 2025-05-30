import MatchingHero from "../components/MatchingHero";
import MatchingCards from "../components/MatchingCards";
import { useState } from "react";

function Matching() {
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  return (
    <>
      <MatchingHero />
      <MatchingCards propSkillToTeachId={selectedSkillId} />
    </>
  );
}

export default Matching;

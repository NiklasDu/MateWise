import MatchingHero from "../components/MatchingHero";
import MatchingCards from "../components/MatchingCards";
import { useState } from "react";

function Matching() {
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [showMatches, setShowMatches] = useState(false);

  // Skill-Suche zurücksetzen, wenn auf "Lernpartner finden" geklickt wird
  const handleFindMatches = () => {
    setShowMatches(true);
    setSelectedSkillId(null);
  };

  // Skill-Suche: showMatches zurücksetzen
  const handleSearch = (skillId) => {
    setSelectedSkillId(skillId);
    setShowMatches(false);
  };

  return (
    <>
      <MatchingHero onFindMatches={handleFindMatches} onSearch={handleSearch} />
      <MatchingCards
        propSkillToTeachId={selectedSkillId}
        showMatches={showMatches}
      />
    </>
  );
}

export default Matching;

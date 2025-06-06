import MessagesWindow from "../components/MessagesWindow";
import DashboardHero from "../components/DashboardHero";
import ProfileEdit from "../components/ProfileEdit";
import DashboardSkillModal from "../components/DashboardSkillModal";
import DashboardNewSkills from "../components/DashboardNewSkills";

/**
 * Zusammensetzen aller Dashboard Komponenten
 *
 * @returns die gesamte Dashboard Seite
 */
function Dashboard() {
  return (
    <>
      <DashboardHero />
      <MessagesWindow />
      <DashboardSkillModal />
      <DashboardNewSkills />
      <ProfileEdit />
    </>
  );
}

export default Dashboard;

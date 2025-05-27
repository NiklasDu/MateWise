import MessagesWindow from "../components/MessagesWindow";
import DashboardHero from "../components/DashboardHero";
import ProfileEdit from "../components/ProfileEdit";
import DashboardSkillModal from "../components/DashboardSkillModal";

function Dashboard() {
  return (
    <>
      <DashboardHero />
      <MessagesWindow />
      <DashboardSkillModal />
      <ProfileEdit />
    </>
  );
}

export default Dashboard;

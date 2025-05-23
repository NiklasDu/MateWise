import MessagesWindow from "../components/MessagesWindow";
import DashboardHero from "../components/DashboardHero";
import ProfileEdit from "../components/ProfileEdit";

function Dashboard() {
  return (
    <>
      <DashboardHero />
      <MessagesWindow />
      <ProfileEdit />
    </>
  )
}

export default Dashboard;
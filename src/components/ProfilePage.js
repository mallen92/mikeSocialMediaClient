import { NavigationContainer } from "./NavigationComponent/NavigationContainer";
import { ProfileView } from "./ProfileViewComponent/ProfileView";

export const ProfilePage = () => {
  return (
    <div className="profilePageBody">
      <NavigationContainer />
      <ProfileView />
    </div>
  );
};

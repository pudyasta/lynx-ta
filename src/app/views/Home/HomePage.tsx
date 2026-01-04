import { useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Tabs } from '../../components/common/Tabs';
import { ProfileScreen } from './components/ProfileScreen';
interface Props {}

const HomePage: React.FC<Props> = ({}) => {
  const pages = [
    { key: 'tab2', label: 'Home', content: <text>Home content</text> },
    { key: 'tab3', label: 'Leasons', content: <text>Leasons content</text> },
    {
      key: 'tab4',
      label: 'Leaderboard',
      content: <text>Leaderboard content</text>,
    },
    { key: 'tab1', label: 'Profile', content: <ProfileScreen /> },
  ];
  // const { accessToken, user } = useAuth();
  // useEffect(() => {
  //   console.log(user);
  // }, []);
  return (
    <view className="HomePage w-full">
      {/* <text className="text-white">{accessToken?.access_token}</text> */}
      <Tabs items={pages} />
    </view>
  );
};
export default HomePage;

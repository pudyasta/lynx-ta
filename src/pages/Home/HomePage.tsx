import { Tabs } from '../../components/common/Tabs';
import Courses from './components/Courses/Courses';

import {
  homeActive,
  homeInactive,
  userActive,
  userInactive,
  rankingActive,
  rankingInactive,
  bookActive,
  bookInactive,
  booksvg,
} from '../../assets/images/homeTabIcon';
import Leaderboard from './components/Leaderboard/Leaderboard';
import ProfileScreen from './components/Profile/ProfileScreen';
import Home from './components/Home/Home';

interface Props {}

const HomePage: React.FC<Props> = ({}) => {
  const pages = [
    {
      label: {
        text: 'Home',
        srcActive: homeActive,
        srcInactive: homeInactive,
      },
      content: <Home />,
    },
    {
      label: {
        text: 'Courses',
        srcActive: bookActive,
        srcInactive: bookInactive,
      },
      content: <Courses />,
    },
    {
      label: {
        text: 'Ranking',
        srcActive: rankingActive,
        srcInactive: rankingInactive,
      },
      content: <Leaderboard />,
    },
    {
      label: {
        text: 'Profile',
        srcActive: userActive,
        srcInactive: userInactive,
      },
      content: <ProfileScreen />,
    },
  ];

  return (
    <>
      <Tabs items={pages} />
    </>
  );
};

export default HomePage;

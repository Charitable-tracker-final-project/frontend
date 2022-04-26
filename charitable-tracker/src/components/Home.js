import Progress from './Home/Progress';
import TimelineCT from './Home/Timeline';
import { useNavigate } from 'react-router-dom';

export default function Home({ handleLogOut }) {
  return (
    <>
      <Progress />
      <TimelineCT />
    </>
  );
}

import Progress from './Home/Progress';
import TimelineCT from './Home/Timeline';

export default function Home(income) {
  return (
    <>
      <Progress income={income} />
      <TimelineCT />
    </>
  );
}

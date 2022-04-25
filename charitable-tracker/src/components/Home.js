import { useState } from 'react';
import Progress from './Home/Progress';
import TimelineCT from './Home/Timeline';

export default function Home() {
  return (
    <>
      <Progress />
      <TimelineCT />
    </>
  );
}

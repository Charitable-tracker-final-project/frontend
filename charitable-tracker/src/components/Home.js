export default function Home({ handleLogOut }) {
  return (
    <>
      <h1>Logged In</h1>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
}

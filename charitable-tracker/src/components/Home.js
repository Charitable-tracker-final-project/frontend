import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/'>
            <img
              src='https://bulma.io/images/bulma-logo.png'
              alt='Bulma: Free, open source, and modern CSS framework based on Flexbox'
              width='112'
              height='28'
            />
          </Link>

          <Link
            role='button'
            className='navbar-burger'
            aria-label='menu'
            aria-expanded='false'
            to='/'
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </Link>
        </div>
      </nav>
    </>
  );
}

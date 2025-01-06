import './Main.css';

type MainProps = {
  children: JSX.Element | JSX.Element[]
}

function Main({children}: MainProps): JSX.Element {
  return (
    <main className='main'>
      {children}
    </main>
  )
}

export default Main;
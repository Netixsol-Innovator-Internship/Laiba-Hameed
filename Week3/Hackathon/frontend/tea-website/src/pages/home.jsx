import Hero from '../components/home/hero'
import Container from '../components/shared/common/Container'

const Home = () => {
  return (
    <div className='flex items-center justify-center'>
      <Container>
        <Hero/>
      </Container>
    </div>
  )
}

export default Home
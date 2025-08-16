import Collection from '../components/home/collection'
import Container from '../components/shared/common/Container'
import Hero from '../components/home/hero';
import Feature from '../components/home/feature';



const Home = () => {
  return (
    <div className='flex-col items-center justify-center'>

      {/* hero section */}
      <Hero/>
      {/* feaures section */}
       <Feature/>
      {/* collections section */}
      <Container>
        <Collection/>
      </Container>
    </div>
  )
}

export default Home
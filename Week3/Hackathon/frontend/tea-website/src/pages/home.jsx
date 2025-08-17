import Collection from '../components/home/collection'
import Hero from '../components/home/hero';
import Feature from '../components/home/feature';



const Home = () => {
  return (
    <>
        {/* hero section */}
        <Hero />
        {/* feaures section */}
        <Feature />
        {/* collections section */}
        <Collection />
    </>
  )
}

export default Home
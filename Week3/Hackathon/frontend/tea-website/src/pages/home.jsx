import Hero from '../components/home/hero'
import Container from '../components/shared/common/Container'
import Button from "../components/shared/buttons/button";
import {Features}  from '../constants/gernal';


const Home = () => {
  return (
    <div className=''>
            
      {/* Top hero section */}
      <div className='grid grid-cols-1 mb-24 md:grid-cols-2 mx-0 gap-32 overflow-x-hidden'>
          <div className='w-[100%]'>
            <img className='h-[628px] w-full  object-cover' src="src/assets/home/topHeroImg/Landing Main Image.png" alt="" />
          </div>
         <div className='flex flex-col justify-center px-3 md:pl-0 md:pr-18'>
            <h3 className='font-prosto-one text-[36px] font-medium mb-10'>Every day is unique,<br /> just like our tea</h3>
            <p className='text-[16px] mb-4'>Lorem ipsum dolor sit amet consectetur. Orci nibh nullam risus<br />  adipiscing odio. Neque lacus nibh eros in.</p>
            <p className='text-[16px] mb-10'>Lorem ipsum dolor sit amet consectetur. Orci nibhnullam risus<br />  adipiscing odio. Neque lacus nibh eros in.</p>
            <Button variant="black">BROWSE TEAS</Button>
          </div>
      </div>

      {/* feaures section */}
      <div className="features-area bg-gray-50 py-12 px-4 flex flex-col justify-center items-center gap-8 sm:gap-12">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 justify-center items-center flex-wrap">
                {Features.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-center sm:text-left max-w-xs"
                  >
                    <img
                      src={item.icon || "/placeholder.svg"}
                      alt={item.text}
                      className="h-6 w-6 flex-shrink-0"
                    />
                    <span className="text-base sm:text-sm font-medium text-[#000000] break-words">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="white">LEARN MORE</Button>
      </div>

      <Container>
        <Hero/>
      </Container>
    </div>
  )
}

export default Home
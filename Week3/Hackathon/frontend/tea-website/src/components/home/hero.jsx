import React from 'react'
import Container from '../shared/common/Container'
import {Collections} from '../../constants/gernal'


const Hero = () => {
  return (
    <div className='flex items-center overflow-x-hidden justify-center'>
        <Container>
{/*collections area */}
{/* <div className="colections overflow-x-hidden pb-14 pt-3 ">
  <h2 className="text-center text-[32px] font-normal my-6">Our Collections</h2>
  <div className="grid grid-cols-3 gap-7">
    {Collections.map((item, index) => (
      <div key={index} className="text-center">
        <img src={item.img} alt={item.title} className="w-[360] h-[360px] rounded" />
        <p className="mt-3.5 font-medium text-[16px]">{item.title}</p>
      </div>
    ))}
  </div>
</div> */}
        {/* <div className="collections overflow-x-hidden pb-14 pt-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl sm:text-3xl lg:text-[32px] font-normal my-6">Our Collections</h2>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-7">
              {Collections.map((item, index) => (
                <div
                  key={index}
                  className="text-center w-full xs:w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.167rem)] max-w-[360px]"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto aspect-square object-cover rounded mx-auto"
                  />
                  <p className="mt-3.5 font-medium text-sm sm:text-base">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
                {/* <div className="collections overflow-x-hidden pb-14 pt-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl sm:text-3xl lg:text-[32px] font-normal my-6">Our Collections</h2>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-7">
              {Collections.map((item, index) => (
                <div
                  key={index}
                  className="text-center w-full xs:w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.167rem)] max-w-[360px]"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto aspect-square object-cover rounded mx-auto"
                  />
                  <p className="mt-3.5 font-medium text-sm sm:text-base">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}

                {/*collections area */}
        <div className="collections overflow-x-hidden flex-col justify-center items-center pb-14 pt-3">
          <h2 className="text-center text-2xl sm:text-3xl lg:text-[32px] font-normal my-6">Our Collections</h2>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-7">
            {Collections.map((item, index) => (
              <div
                key={index}
                className="text-center w-full xs:w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.167rem)] max-w-[360px]"
              >
                <img
                  src={item.img || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-auto aspect-square object-cover rounded mx-auto"
                />
                <p className="mt-3.5 font-medium text-sm sm:text-base">{item.title}</p>
              </div>
            ))}
          </div>
        </div>


        </Container>
    </div>
  )
}

export default Hero
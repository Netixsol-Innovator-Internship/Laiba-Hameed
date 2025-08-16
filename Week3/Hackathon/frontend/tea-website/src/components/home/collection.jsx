import { Collections } from '../../constants/gernal'
import Container from '../shared/common/Container'


const Collection = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Container>
        <div className='collections flex-col justify-center items-center pb-14 pt-3  px-6 sm:px-10 lg:px-12'>
          {/*collections area */}
          <h2 className="text-center text-2xl sm:text-3xl lg:text-[32px] font-prosto my-12">Our Collections</h2>

          <div className="w-full flex flex-wrap justify-center sm:justify-between items-center gap-4 sm:gap-6 lg:gap-7">
            {Collections.map((item, index) => (
              <div
                key={index}
                className="text-center lg:mb-6 xs:w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.167rem)] max-w-[360px]"
              >
                <img
                  src={item.img || "/placeholder.svg"}
                  alt={item.title}
                  className="w-[360px] h-[360px] aspect-square object-cover rounded mx-auto"
                />
                <p className="mt-3.5 font-medium font-montserrat  text-sm sm:text-base">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Collection
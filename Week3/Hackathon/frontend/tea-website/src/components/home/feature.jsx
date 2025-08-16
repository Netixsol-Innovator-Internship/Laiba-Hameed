import Button from "../shared/buttons/button";
import { Features } from '../../constants/gernal';
import Container from "../shared/common/Container";



const Feature = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center bg-[#F4F4F4]'>
        <Container>
          {/* feaures section */}
          <div className="features-area w-full py-12  px-6 sm:px-10 lg:px-12 flex flex-col justify-center items-center gap-8 sm:gap-12">
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-between items-center flex-wrap mb-2 px-12">
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
                  <span className="text-base sm:text-sm text-montserrat font-medium text-[#000000] break-words">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <Button className="border">LEARN MORE</Button>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Feature
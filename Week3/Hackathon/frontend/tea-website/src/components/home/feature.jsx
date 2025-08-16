import Button from "../shared/buttons/button";
import {Features}  from '../../constants/gernal';



const Feature = () => {
  return (
    <div className='flex items-center justify-center'>
      {/* feaures section */}
      <div className="features-area bg-gray-50 w-full py-12 px-4 flex flex-col justify-center items-center gap-8 sm:gap-12">
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
    </div>
  )
}

export default Feature
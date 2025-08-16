import Button from "../shared/buttons/button";


const Hero = () => {
  return (
    <div className='flex items-center justify-center'>
            
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

    </div>
  )
}

export default Hero
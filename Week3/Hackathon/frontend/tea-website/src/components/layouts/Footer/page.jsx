import Container from "../../shared/common/Container"

const Footer = () => {
    return (
        <div className=" bg-[#F4F4F4] font-montserrat overflow-x-hidden">
            <Container>
<div className=" py-[30px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="min-w-0">
        <h3 className="text-base mb-2 font-medium">COLLECTIONS</h3>
        <ul className="text-sm font-normal leading-6">
          <li>Black teas</li>
          <li>Green teas</li>
          <li>White teas</li>
          <li>Herbal teas</li>
          <li>Matcha</li>
          <li>Chai</li>
          <li>Oolong</li>
          <li>Rooibos</li>
          <li>Teaware</li>
        </ul>
      </div>
      <div className="min-w-0">
        <h3 className="text-base mb-2 font-medium">LEARN</h3>
        <ul className="text-sm font-normal leading-6">
          <li>About us</li>
          <li>About our teas</li>
          <li>About our academy</li>
        </ul>
      </div>
      <div className="min-w-0">
        <h3 className="text-base mb-2 font-medium">CUSTOMER SERVICE</h3>
        <ul className="text-sm font-normal leading-6">
          <li>Ordering and payment</li>
          <li>Delivery</li>
          <li>Privacy and policy</li>
          <li>Terms and Conditions</li>
        </ul>
      </div>
      <div className="min-w-0">
        <h3 className="text-base mb-2 font-medium">CONTACT US</h3>
        <div className="flex items-start text-sm gap-2 mb-2">
          <span className="material-symbols-outlined text-gray-600 font-normal text-xl">location_on</span>
          <p>3 Falahi, Falahi St, Pasdaran Ave,<br /> Shiraz, Fars Province, <br /> Iran</p>
        </div>
        <div className="flex items-center text-sm gap-2 mb-2">
          <span className="material-symbols-outlined text-gray-600 font-normal text-xl">mail</span>
          <p>Email: amoopur@gmail.com</p>
        </div>
        <div className="flex items-center text-sm gap-2">
          <span className="material-symbols-outlined text-gray-600 font-normal text-xl">call</span>
          <p>Tel: +98 9173038406</p>
        </div>
      </div>

    </div>
  </div>
               
            </Container>
        </div>
    )
}

export default Footer
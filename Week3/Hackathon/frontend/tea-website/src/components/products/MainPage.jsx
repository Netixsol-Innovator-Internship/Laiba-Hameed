import Sidebar from './Sidebar'
import ProductsGrid from './ProductsGrid'
import Container from '../shared/common/Container'

const MainPage = () => {
    return (
        <div className='flex items-center justify-center py-6'>
            <Container>
                <div className='px-6 sm:px-10 lg:px-12 flex justify-between gap-20'>
                    <Sidebar />
                    <ProductsGrid />
                </div>
            </Container>
        </div>
    )
}

export default MainPage
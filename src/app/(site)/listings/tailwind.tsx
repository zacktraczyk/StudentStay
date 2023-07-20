const products = [
  {
    id: 1,
    name: 'The District House on Euclid',
    href: '#',
    price: '800',
    options: '8 colors',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt:
      'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  // More products...
]

export default function Example() {
  return (
    <div className='bg-white'>
      <h2 className='sr-only'>Listings</h2>

      <div>
        <h3>
          <span className='bold'>666</span> Avaiable Apartments in Placeholder, IL
        </h3>
      </div>

      <div className='grid grid-cols-1 gap-y-4 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-8'>
        {products.map((product) => (
          <div
            key={product.id}
            className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
          >
            <div className='aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96'>
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className='h-full w-full object-cover object-center sm:h-full sm:w-full'
              />
            </div>
            <div className='flex flex-1 flex-col space-y-2 p-4'>
              <h3 className='text-sm font-medium text-gray-900'>
                <a href={product.href}>
                  <span aria-hidden='true' className='absolute inset-0' />
                  {product.name}
                </a>
              </h3>
              {/* <p className='text-sm text-gray-500'>{product.description}</p> */}
              <div className='flex flex-1 flex-col justify-end'>
                <p className='text-sm italic text-gray-500'>{product.options}</p>
                <p className='text-base font-medium text-gray-900'>{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

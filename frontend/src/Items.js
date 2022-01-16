import * as React from 'react';
import Item from './components/Item'

function Items() {
  const data = [
    {id: 1,
    description: 'cat black cute nice 123',
    day: '2021-01-15 17:38',
    location: 'BCIT SE06 320',
    contacts: '236-990-3350',
    img: 'https://nwhacks2022storage.blob.core.windows.net/image/sample-cat-0.jpeg'
  }, 
  {id: 2,
    description: 'dog yellow brown hairy fun',
    day: '2021-01-13 19:38',
    location: 'Central Park',
    contacts: '236-990-3350',
    img: 'https://nwhacks2022storage.blob.core.windows.net/image/sample-cat-0.jpeg'},
     {id: 3,
      description: 'phone iphone black new',
      day: '2021-01-13 19:38',
      location: 'Expo Line MetroTown station',
      contacts: '236-990-3350',
      img: 'https://nwhacks2022storage.blob.core.windows.net/image/sample-cat-0.jpeg'}
  ]



  return (
    <>
    {data.map((item) => 
      (<Item key={item.id} item={item} />)
    )}
    </>
  )
}

export default Items

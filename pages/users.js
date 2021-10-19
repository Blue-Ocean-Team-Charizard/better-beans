import { useState } from 'react';

export default function users() {
  const [users, setUsers] = useState({
    name: 'Jesus Gonzales',
    email: 'jesus.gonzales1995@gmail.com',
    photo_url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
  });

  return (
    <div>
      Hello World!
    </div>
  );
}

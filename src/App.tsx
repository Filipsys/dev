import { useRef, useState } from 'react';
import './index.css';

function App() {
  const [seatsCount, setSeatsCount] = useState<number>(0);
  const [availablePlaces, setAvailablePlaces] = useState<number[]>([...Array(seatsCount).keys()].map(i => i + 1));
  const [nextSpot, setNextSpot] = useState<number | null>(null);
  const [chosenSpots, setChosenSpots] = useState<number[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const chooseHandler = () => {
    const randomSpot = availablePlaces[Math.floor(Math.random() * availablePlaces.length)];

    if (randomSpot !== undefined) {
      setNextSpot(randomSpot);
      setAvailablePlaces(availablePlaces.filter((spot) => spot !== randomSpot));
      setChosenSpots([...chosenSpots, randomSpot]);
    }
  };

  const changeSpotCount = () => {
    const input = inputRef.current;
    if (!input) return;

    console.log(input.value)

    setSeatsCount(Number(input.value))
    setAvailablePlaces([...Array(Number(input.value)).keys()].map(i => i + 1));
  }

  return (
    <div className='w-full h-dvh'>
      <div>
        <p>Pick your seats count: </p>

        <input type="number" name="spots" ref={inputRef} onChange={changeSpotCount} className='border-[1px] border-black' />
      </div>
      
      <div>
        <p>Choose your spot</p>

        <button onClick={chooseHandler}>Pick a place</button>
      </div>

      <p>Next spot: {availablePlaces.length > 0 ? nextSpot || "Not yet chosen." : "All spots have been picked."}</p>
    </div>
  );
}

export default App;
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [ratings, setRatings] = useState([0, 0]);
  const averageRating = Number(ratings[0] + ratings[1]) / 2;

  function handleReset() {
    setRatings(current => [0, 0]);
    setBill("");
  }
  return (
    <div className="App">
      <BillInput onChange={setBill} bill={bill} />
      <Ratings ratings={ratings} onRate={(array) => setRatings(array)} />
      <Message billAmount={bill} averageRating={averageRating} />
      <Reset onReset={handleReset} />
    </div>
  );
}

function BillInput({ onChange, bill }) {
  return (<>
    <div>
      <span>How much was the bill? </span>
      <input type="text" placeholder="total of bill" aria-label="total of bill" onChange={(e) => onChange(Number(e.target.value))} value={bill} />
    </div>
  </>);
}

function Ratings({ ratings, onRate }) {
  return (<>
    <Satisfaction index={0} onRate={onRate} ratings={ratings}>How did you like the service? </Satisfaction>
    <Satisfaction index={1} onRate={onRate} ratings={ratings}>How did your friend like the service? </Satisfaction>
  </>);
}

function Satisfaction({ index, onRate, ratings, children }) {
  function handleSelect(e) {
    let updatedRatings = ratings.slice();
    updatedRatings[index] = Number(e.target.value);
    onRate(updatedRatings);

    console.log("index: ", index, "value: ", e.target.value, typeof (updatedRatings[index]));
  }

  return (<>
    <div>
      <span>{children}</span>
      <select aria-label="satisfaction level" onChange={handleSelect} value={ratings[index]}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={0.05}>It was okay (5%)</option>
        <option value={0.1}>It was good (10%)</option>
        <option value={0.2}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  </>);
}

function Message({ billAmount, averageRating }) {
  const totalTip = Math.round(billAmount * averageRating * 100) / 100;
  return (<>
    <div>
      <h3>You pay ${`${billAmount + totalTip}`} (${`${billAmount} bill`}+${`${totalTip} tip`})</h3>
    </div>
  </>);
}

function Reset({ onReset }) {
  return (<>
    <button onClick={onReset}>Reset</button>
  </>);
}
import { React, useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button content={() => setGood(good + 1)} nimi={"good"} />
      <Button content={() => setNeutral(neutral + 1)} nimi={"neutral"} />
      <Button content={() => setBad(bad + 1)} nimi={"bad"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

// const Statisticline = (props) => {
//   return (
//     <p>
//       {" "}
//       {props.nimi} {props.lasku}{" "}
//     </p>
//   );
// };

const Button = (props) => {
  return <button onClick={props.content}> {props.nimi} </button>;
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;

  if (good + neutral + bad === 0) {
    return <p> no feedback given</p>;
  }

  return (
    <>
      <h1>statistics</h1>

      <div>
        <table>
          <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{good + neutral + bad}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(good - bad) / (good + neutral + bad)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>good</td>
          </tr>
          </tbody>
        </table>

        {/* <Statisticline nimi={"good"} lasku={good} />
        <Statisticline nimi={"neutral"} lasku={neutral} />
        <Statisticline nimi={"bad"} lasku={bad} />
        <Statisticline nimi={"all"} lasku={good + neutral + bad} />
        <Statisticline
          nimi={"average"}
          lasku={(good - bad) / (good + neutral + bad)}
        />
        <Statisticline
          nimi={"positive"}
          lasku={good / (good + neutral + bad) + "%"}
        /> */}
      </div>
    </>
  );
};

export default App;

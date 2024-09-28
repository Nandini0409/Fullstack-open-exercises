import { useState } from 'react'

const H1 = ({ heading }) => {
  return <h1>{heading}</h1>
}

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}


const Table = ({counts, others})=>{
  if (others[0] === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
      <tr>
        <td>good</td>
        <td>{counts[0]}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{counts[1]}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{counts[2]}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{others[0]}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{others[1]}</td>
      </tr>
      <tr>
        <td>percentage</td>
        <td>{others[2]}</td>
      </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)
  const all = goodCount + neutralCount + badCount
  const avg = all / 3
  const percentage = (goodCount / all) * 100
  return (
    <div>
      <H1 heading={"give feedback"} />
      <Button onClick={() => setGoodCount(goodCount + 1)} text={"good"} />
      <Button onClick={() => setNeutralCount(neutralCount + 1)} text={"neutral"} />
      <Button onClick={() => setBadCount(badCount + 1)} text={"bad"} />
      <H1 heading={"statistics"} />
      <Table counts={[goodCount, neutralCount, badCount]} others={[all, avg, percentage]} />
    </div>
  )
}

export default App




//This is the solution for step 3 & 5----->


// const StatisticLine = ({ text, stats }) => {
//   return (
//     <p>{text} {stats}</p>
//   )
// }

// const Statistics = ({ counts, others }) => {
  
//   return (
//     <>
//       <StatisticLine text={"good"} stats={counts[0]} />
//       <StatisticLine text={"neutral"} stats={counts[1]} />
//       <StatisticLine text={"bad"} stats={counts[2]} />
//       <StatisticLine text={"all"} stats={others[0]} />
//       <StatisticLine text={"average"} stats={others[1]} />
//       <StatisticLine text={"positive"} stats={others[2]} />
//     </>
//   )
// }
import { useState } from 'react'

//components---->
const Button = ({ onClick, label }) => {
  return (
    <button onClick={onClick}>{label}</button>
  )
}

const DisplayInfo = ({ text }) => {
  return (
    <p>{text}</p>
  )
}

const Heading = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const mostVotesIndex = votes.indexOf(Math.max(...votes))  //this variable stores the index of the most gianed votes



  //event handlers---->
  const handleAnecdoteClick = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    while (random === selected) {
      random = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(random)
  }

  const handleVoteClick = () => {
      let newVotes = [...votes]
      newVotes[selected] += 1
    setVotes(newVotes)
  }



  return (
    <div>
      <Heading text = {"Anecdote of the day"}/>
      <DisplayInfo text={anecdotes[selected]} />
      <Button onClick={handleAnecdoteClick} label={"Next Anecdote"} />
      <Button onClick={handleVoteClick} label={"Vote"} />
      <DisplayInfo text={`votes: ${votes[selected]}`} />
      <Heading text = {"Anecdote with the most votes"}/>
      <DisplayInfo text={anecdotes[mostVotesIndex]} />
      <DisplayInfo text={`votes: ${votes[mostVotesIndex]}`} />
    </div>
  )
}

export default App
import { useState } from 'react'

const FeedbackHeader = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticsHeader = () => {
  return (
    <h1>statistics</h1>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

const Total = ({good, neutral, bad}) => {
  return (
    <Statistic text={"all"} value={good + neutral + bad} />
  )
}

const Average = ({good, neutral, bad}) => {
  return (
    <Statistic text={"average"} value={((good * 1) + (neutral * 0) + (bad * -1))/(good + neutral + bad)} />
  )
}

const Positive = ({good, neutral, bad}) => {
  return (
    <Statistic text={"positive"} value={(good * 100)/(good + neutral + bad)} />
  )
}

const FeedbackUnavailable = () => {
  return (
    <p>No feedback given</p>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <>
        <Statistic text={"good"} value={good} />
        <Statistic text={"neutral"} value={neutral} />
        <Statistic text={"bad"} value={bad} />
        <Total good={good} neutral={neutral} bad={bad} />
        <Average good={good} neutral={neutral} bad={bad} />
        <Positive good={good} neutral={neutral} bad={bad} />
      </>
    )
  } else {
    return (
      <FeedbackUnavailable />
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <FeedbackHeader />
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <StatisticsHeader />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
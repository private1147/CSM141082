import { useState } from 'react'

const FeedbackHeader = () => <h1>give feedback</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsHeader = () => <h1>statistics</h1>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Total = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  return (
      <StatisticLine text={"total"} value={total} />
  )
}

const Average = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const score = (good * 1) + (neutral * 0) + (bad * -1)
  const average = score / total
  return (
      <StatisticLine text={"average"} value={average} />
  )
}

const Positive = ({good, neutral, bad}) => <StatisticLine text={"positive"} value={(good * 100)/(good + neutral + bad)} />
  

const FeedbackUnavailable = () => <p>No feedback given</p>

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <table>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <Total good={good} neutral={neutral} bad={bad} />
        <Average good={good} neutral={neutral} bad={bad} />
        <Positive good={good} neutral={neutral} bad={bad} />
      </table>
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

  const onClickGood = () => setGood(good + 1)
  const onClickNeutral = () => setNeutral(neutral + 1)
  const onClickBad = () => setBad(bad + 1)
  return (
    <>
      <FeedbackHeader />
      <Button onClick={onClickGood} text={"good"} />
      <Button onClick={onClickNeutral} text={"neutral"} />
      <Button onClick={onClickBad} text={"bad"} />
      <StatisticsHeader />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
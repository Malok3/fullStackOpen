import { useState } from 'react'


function App() {

  const [good, setGood]=useState(0)
  const [neutral, setNeutral]=useState(0)
  const [bad, setBad]=useState(0)
  const [total, setTotal]=useState(0)
  const [averageSum, setAverageSum]=useState(0)
  
  const Title = ({text}) => <h2>{text}</h2>

  const increaseGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAverageSum(averageSum+1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAverageSum(averageSum-1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }


  //Components
  const Button = (props) => {
    console.log(props)
    return (
      <button onClick={props.action}>{props.text}</button>
    )
  }  
  
  const Statistics = (props) => {
    if (props.total===0){  
      return (
        <p>
          No feedback has been received
        </p>
      )
    }

    return (
      <table>
        <tbody>
          <StatisticLine text={'Good feedbacks'} value={good} />
          <StatisticLine text={'Neutral feedbacks'} value={neutral} />
          <StatisticLine text={'Bad feedbacks'} value={bad} />
          <StatisticLine text={'Total number of feedbacks'} value={total} />
          <StatisticLine text={'Average feedback'} value={averageSum/total} />
          <StatisticLine text={'Percentage of positive feedback'} value={good/total + '%'} />
        </tbody>
      </table>
    )
  }
  const StatisticLine = (props) => {
    return(
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
  }

  return (
    <>
      <Title text='Give feedback'/>
      <Button text={'Good'} action={increaseGood} />
      <Button text={'Neutral'} action={increaseNeutral} />
      <Button text={'Bad'} action={increaseBad} />
      <Title text='Statistics'/>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </>

  )
}

export default App

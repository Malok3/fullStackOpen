const Course = (props) =>
  <>
    <Header course={props.course} />
    <Content parts={props.parts} />
  </>

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Content = ({parts}) => 
  <>
    {parts.map(part=> 
      <Part key={part.id} name={part.name} exercises={part.exercises}/>
    )}
  </>

const Part = (props) => 
  <p>
    {console.log(props)}
    {props.name} {props.exercises} 
  </p>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id:1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id:2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id:3
    },
    {
      name: 'Michel de bourgogne',
      exercises: 14,
      id:4
    }
  ]

  return <Course course={course} parts={parts} />
}

export default App
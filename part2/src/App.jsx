const Course = (props) =>
  <>
    <Header text={'Web development curriculum'} />
    <Course courses={props.courses} />
    {/*<Content parts={props.parts} />
    <Total parts={props.parts} />*/}
  </>

const Header = ({ text }) => <h1>{text}</h1>

const Course = ({courses}) => {

  return(
   <Header />
   <Content />
   <Total />
  )
}




const Content = ({parts}) => 
  <>
    {parts.map(part=> 
      <Part key={part.id} name={part.name} exercises={part.exercises}/>
    )}
  </>

const Part = (props) => 
  <p>
    {props.name} {props.exercises} 
  </p>


const Total = ({parts}) =>{

  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
 
  return(
    <>
     <b>Total of {totalExercises} exercises.</b>
    </>
  )

}
  
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={course} parts={parts} />
}

export default App
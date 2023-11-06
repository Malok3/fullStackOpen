
const Course = (props) => {
    const courses = props.courses; 
    return (
      <>
        {courses.map((course) => (//courses being an array, we use map to go trough each item, key is needed by React to work properly
          <div key={course.id}>
            <CourseHeader text={course.name} />
            <Content parts={course.parts} />
          </div>
        ))}
      </>
    );
  }
  
  const CourseHeader = ({ text }) => <h3>{text}</h3>
  
  const Content = (props) => {
    const parts = props.parts
    return(
      <>
      {parts.map(part=> 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
      <Total parts={parts}/>
      </>
    )
  }
  
  const Part = (props) => 
    <p>
      {props.name} {props.exercises} 
    </p>
  
  
  const Total = (props) =>{
    const parts = props.parts
    
    //For each items in parts, takes exercices value then add it to sum, sum starts at 0
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
   
    return(
      <>
       <b>Total of {totalExercises} exercises.</b>
      </>
    )
  
  }

  
export default Course
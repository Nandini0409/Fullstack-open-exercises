const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}


const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part=>{
        return (
          <Part key={part.id} part={part}/>
        )
      })}
    </>
  )
}


const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((total, part)=>{
    return total + part.exercises
  },0)
  
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum = {totalExercises}/>
    </>
  )
}

export default Course
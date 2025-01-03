const Header = ({ course }) => {
  const name = course.name
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ part }) => {
  const name = part.name
  const exercises = part.exercises
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({ course }) => {
  const parts = course.parts
  return (
    <div>
      { <Part part={parts[0]} /> }
      { <Part part={parts[1]} /> }
      { <Part part={parts[2]} /> }
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
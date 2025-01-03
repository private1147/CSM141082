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
    <p key={part.id}>{name} {exercises}</p>
  )
}

const Content = ({ course }) => {
  const parts = course.parts
  // console.log("From Content Comp:", parts)
  return (
    <div>
      { parts.map((part) => <Part key={part.id} part={part} />) }
    </div>
  )
}

const Total = ({ course }) => {
  let total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course= {course} />
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
  return (
    <>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App
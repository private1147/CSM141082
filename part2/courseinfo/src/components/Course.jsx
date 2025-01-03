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
  
export default Course

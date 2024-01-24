import Header from './Header'
import Content from './Content'
  
const Total = ({parts}) => {
console.log(parts)
const total = parts.map(part => part.exercises).reduce((s, p) => s + p)
return (
    <div>
        <b>total of {total} exercises</b>
    </div>
)
}

const Course = () => {
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
        <div>
            {courses.map(course => 
            <div key={course.id}>
                <Header name={course.name}/>
                <Content parts={course.parts} />
                <Total parts={course.parts} />
                </div>
            )}
        </div>
    )
}

export default Course
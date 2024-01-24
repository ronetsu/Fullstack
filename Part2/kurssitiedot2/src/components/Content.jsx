import Part from './Part'
  
const Content = ({parts}) => {
    console.log("CONTENT: " + parts[0].exercises)
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}

export default Content
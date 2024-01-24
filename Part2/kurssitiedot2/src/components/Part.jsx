const Part = ({part}) => {
    console.log("PART: " + part.exercises)
    return ( <p> {part.name} {part.exercises} </p>)
}

export default Part
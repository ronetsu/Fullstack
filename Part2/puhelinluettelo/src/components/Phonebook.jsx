const Phonebook = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person, index) => (
        <>
          <p key={person.id || index}>{person.name} {person.number}</p>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </>
      ))}
    </div>
  );
};

export default Phonebook;

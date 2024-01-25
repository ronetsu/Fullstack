import ReactDOM from 'react-dom/client'

import App from './App'

const persons = [
    {
        name: 'Arto Hellas',
        id: 1,
        number: '040-123456'
    },
    {
        name: 'Ada Lovelace',
        id: 2,
        number: '39-44-5323523'
    },
    {
        name: 'Dan Abramov',
        id: 3,
        number: '12-43-234345'
    },
    {
        name: 'Mary Poppendieck',
        id: 4,
        number: '39-23-6423122'
    }
]

ReactDOM.createRoot(document.getElementById('root')).render(
<App persons={persons}/>)
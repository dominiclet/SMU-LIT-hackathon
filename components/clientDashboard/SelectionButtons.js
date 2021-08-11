import Button from 'react-bootstrap/Button';
import clientStyle from '../../styles/Client.module.css'

const SelectionButtons = () => {
    // add button onclick functions to change case stage 
    return (
        <div className={clientStyle.selectionButtons}>   
            <Button variant="outline-secondary">Revert to previous lawyer</Button>
            <Button variant="outline-success">Select this lawyer</Button>
            <Button variant="outline-danger">Look for another lawyer</Button>
        </div>
    )
}

export default SelectionButtons

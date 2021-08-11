import styles from '../styles/Client.module.css';
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CaseBriefEdit = () => {
    return (
        <Card className={styles.bigCard}>
            <Card.Body>
                <Card.Title>Case brief</Card.Title>
                <Form.Control className={styles.briefTextDisplay}
                    as="textarea"
                    placeholder="Please insert your brief here"
                />
                <Button variant="secondary">Save</Button>{' '}
            </Card.Body>
		</Card>
    )
}

export default CaseBriefEdit

import styles from '../styles/Lawyer.module.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const CaseBriefView = () => {
    return (
        <Card className={styles.bigCard}>
            <Card.Body>
                <Card.Title>Case brief</Card.Title>
                <Form.Control className={styles.briefTextDisplay} type="text" placeholder="Readonly input here..." plaintext readOnly />
                <Button variant="secondary">Edit</Button>{' '}
            </Card.Body>
		</Card>
    )
}

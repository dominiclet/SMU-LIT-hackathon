import styles from '../styles/Client.module.css';
import Card from 'react-bootstrap/Card';
import { InlineWidget } from "react-calendly";

export const MeetUpInfo = (props) => {
    const showInfo = () => {
        return props.progress == 1;
    }
    return (
        <Card className={styles.smallCard}>
            {showInfo() && 
                <Card.Body>
                    <Card.Title>Meetup info</Card.Title>
                    <InlineWidget 
                    styles={{height: '380px'}} 
                    prefill={{
                        email: 'clientemail@tobe.added',
                        guests: [
                        'lawyer@email.com'
                        ],
                        name: 'Client Name'
                    }} 
                    url="https://calendly.com/smu-lit-hackathon/round1" />
                </Card.Body>
            }
            {!showInfo() &&
                <Card.Body>
                    <Card.Title>Meetup info</Card.Title>
                    <Card.Text> The meeting information will be available after you pair with a lawyer. To consider a lawyer, you can think about the following factors:</Card.Text>
                    <Card.Body>    Does the lawyer's areas of expertise match the work you are looking for?</Card.Body>
                    <Card.Body>    Is the rates requested acceptable for you?</Card.Body>
                    <Card.Body>    If you have language preferences, does the lawyer fit them?</Card.Body>
                </Card.Body>
            }
        </Card>
    )
}



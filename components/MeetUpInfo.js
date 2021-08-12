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
                    <h3>Meetup info not available at this stage</h3>
                </Card.Body>
            }
        </Card>
    )
}



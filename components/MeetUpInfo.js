import styles from '../styles/Client.module.css';
import Card from 'react-bootstrap/Card';
import GoogleMapReact from 'google-map-react';
import { InlineWidget } from "react-calendly";
import { Form } from 'react-bootstrap';

export const MeetUpInfo = (props) => {
    const showInfo = () => {
        return props.progress == 2;
    }
    return (
        <Card className={styles.smallCard}>
            {showInfo() &&
                <Card.Body>
                    <Card.Title>Meetup info</Card.Title>
                    <div className={styles.mapContainer}>
                        <GoogleMapReact
                            defaultCenter={{
                                lat: 1.3188,
                                lng: 103.8172
                            }}
                            defaultZoom={17}
                        >
                        </GoogleMapReact>
                    </div>
                    <Card.Title >Address</Card.Title>
                    <Form.Control className={styles.address} plaintext readOnly placeholder="469G Bukit Timah Rd, Singapore 259776" />
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



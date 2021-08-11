import styles from '../styles/Lawyer.module.css';
import Card from 'react-bootstrap/Card';
import Image from "react-bootstrap/Image";
import Badge from 'react-bootstrap/Badge';

const LawyerProfile = () => {
    return (
        <Card className={styles.smallCard}>
            <Card.Body>
                <Card.Title>Lawyer's Profile</Card.Title>
                <Card.Text>
                    Take a moment to look at our lawyer's information.
                </Card.Text>
                <div className={styles.personInfo}>
                    <Image src="../../blankimage.svg" roundedCircle />
                    <h5>Dominic Let</h5>
                    <p>Let, Love and Live LLC</p>
                    <h6>Areas of Expertise</h6>
                    <Badge pill bg="light" text="dark">
                        Family Law
                    </Badge>{' '}
                    <Badge pill bg="light" text="dark">
                        Criminal Law
                    </Badge>{' '}
                </div>
            </Card.Body>
        </Card>
    )
}

export default LawyerProfile

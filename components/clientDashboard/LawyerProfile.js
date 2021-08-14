import styles from '../../styles/Client.module.css';
import Card from 'react-bootstrap/Card';
import Image from "react-bootstrap/Image";
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';
import axios from "axios";
import { apiRoot } from "../../config";

const LawyerProfile = (props) => {
	const [lawyerData, setLawyerData] = useState();

	useEffect(() => {
		axios.get(apiRoot + `/lawyerData/${props.allocatedLawyer}`).then(res => {
			setLawyerData(res.data);
		})
	}, [])
    if (lawyerData) {
        return (
            <Card className={styles.smallCard}>
                <Card.Body>
                    <Card.Title>Lawyer's Profile</Card.Title>
                    <Card.Text>
                        Take a moment to look at our lawyer's information.
                    </Card.Text>
                    <div className={styles.personInfo}>
                        <Image className={styles.image} src="../../blankimage.svg" roundedCircle />
                        <h5>{lawyerData.name}</h5>
                        <p>{lawyerData.firm}</p>
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
    } else {
		return (
			<div>
				We're on the way! Please hang on...
			</div>
		);
	}
}

export default LawyerProfile

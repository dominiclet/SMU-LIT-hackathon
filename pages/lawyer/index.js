import styles from "../../styles/Lawyer.module.css";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const lawyerDashboard = () => {
	return (
		<div className={styles.outerContainer}>
			<div className={styles.rowContainer}>
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
				<Card className={styles.smallCard}>
					<Card.Body>
						<Card.Title>Meetup info</Card.Title>
						<Card.Text>
							blablabala
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
			<div className={styles.rowContainer}>
				<Card className={styles.bigCard}>
					<Card.Body>
						<Card.Title>Case brief</Card.Title>
						<Form.Control className={styles.briefTextDisplay} type="text" placeholder="Readonly input here..." plaintext readOnly />
						<Button variant="secondary">Edit</Button>{' '}
					</Card.Body>
				</Card>
			</div>
			<div className={styles.rowContainer}>
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
			</div>
			<div className={styles.rowContainer}>
				<Card className={styles.smallCard}>
					<Card.Body>
						<Card.Title>Average cost...</Card.Title>
						<div className={styles.averageCostInnerInfo}>
							<div className={styles.averageCostInnerTitle}>
								of this lawyer:
							</div>
							<div className={styles.averageCostInnerPrice}>
								$80
							</div>
						</div>
						<div className={styles.averageCostInnerInfo}>
							<div className={styles.averageCostInnerTitle}>
								of this type of service:
							</div>
							<div className={styles.averageCostInnerPrice}>
								$100
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}

export default lawyerDashboard
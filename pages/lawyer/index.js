import styles from "../../styles/Lawyer.module.css";
import Card from "react-bootstrap/Card";

const lawyerDashboard = () => {
	return (
		<div className={styles.outerContainer}>
			<div className={styles.rowContainer}>
				<Card className={styles.smallCard}>
					<Card.Body>
						<Card.Title>Lawyer's profile</Card.Title>
						<Card.Text>
							blablabla
						</Card.Text>
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
						<Card.Text>
							blablabla
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
			<div className={styles.rowContainer}>
				<Card className={styles.smallCard}>
					<Card.Body>
						<Card.Title>Average cost</Card.Title>
						<Card.Text>
							blablabla
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}

export default lawyerDashboard
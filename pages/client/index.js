import styles from "../../styles/Lawyer.module.css";
import Card from "react-bootstrap/Card";
import StageStepper from "../../components/clientDashboard/StageStepper";
import SelectionButtons from "../../components/clientDashboard/SelectionButtons";
import Calendar from "../../components/clientDashboard/Calendar";

const clientDashboard = () => {
	return (
		<div className={styles.outerContainer}>
			<StageStepper/>
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
						<Calendar/>
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
			<SelectionButtons/>
		</div>
	);
}

export default clientDashboard
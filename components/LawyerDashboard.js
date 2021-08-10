import styles from "../styles/Lawyer.module.css";
import Card from "react-bootstrap/Card";
import GoogleMapReact from 'google-map-react';

const LawyerDashboard = (props) => {
	

	return (
		<div className={styles.outerContainer}>
			<div className={styles.rowContainer}>
				<Card className={styles.smallCard}>
					<Card.Body>
						<Card.Title>Client's profile</Card.Title>
						<Card.Text>
							Profile info of {props.clientName}
						</Card.Text>
					</Card.Body>
				</Card>
				<Card className={styles.smallCard}>
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
		</div>
	);
}

export default LawyerDashboard
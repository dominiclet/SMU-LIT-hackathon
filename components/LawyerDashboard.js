import styles from "../styles/Lawyer.module.css";
import Card from "react-bootstrap/Card";
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from "react";
import axios from "axios";
import { apiRoot } from "../config";
import StageStepperLawyer from "./clientDashboard/StageStepperLawyer";
import { Button } from "react-bootstrap";

const LawyerDashboard = (props) => {
	// State to store data of clientData
	const [clientData, setClientData] = useState();
	// State to store lawyer data
	const [lawyerData, setLawyerData] = useState()
	
	// Fetch individual client data
	useEffect(() => {
		console.log(props.clientId);
		axios.get(apiRoot + `/clientData/${props.clientId}`)
			.then(res => {
				setClientData(res.data);
			});

		axios.get(apiRoot + `/lawyerData/${localStorage.getItem("id")}`)
			.then(res => {
				setLawyerData(res.data);
			});
	}, []);

	// Accept client button
	const handleAcceptClient = () => {
		const data = {
			"clientName": clientData.name,
			"clientId": props.clientId,
			"selfId": localStorage.getItem("id")
		}
		axios.post(apiRoot + "/acceptClient", data).then(res => {
			if (res.status == 200) {
				location.reload();
			}
		})
	}

	const handleRejectClient = () => {
		alert("Please be inclusive and accept the client!");
	}
	

	return (
		<div className={styles.outerContainer}>
			<h1 style={{"textAlign": "center"}}>Hello, {lawyerData.name}</h1>
			<StageStepperLawyer stage={props.stage} />
			<div className={styles.selectionButtonsContainer}>
				<Button variant="outline-danger" onClick={handleRejectClient}>Reject client</Button>
				<Button variant="outline-success" onClick={handleAcceptClient}>Accept client</Button>
			</div>
			<div className={styles.rowContainer}>
				<Card className={styles.smallCard}>
					<Card.Body>
						<Card.Title>Client's profile</Card.Title>
						{ !clientData ? "We're on the way! Please hang on..." : 
							<div className={styles.personInfo}>
								<Image src="../../blankimage.svg" roundedCircle />
								<h5>{clientData.name}</h5>
								<h6>Gender</h6>
								<p>{clientData.gender}</p>
								<h6>Email</h6>
								<p>{clientData.email}</p>
								<h6>Contact no.</h6>
								<p>{clientData.phone}</p>
							</div>
						}
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
							{clientData ? clientData.brief : "We're on the way! Please hang on..."}
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
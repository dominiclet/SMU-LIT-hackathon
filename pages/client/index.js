import styles from "../../styles/Client.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiRoot } from "../../config";;
import StageStepper from "../../components/clientDashboard/StageStepper";
import SelectionButtons from "../../components/clientDashboard/SelectionButtons";
import LawyerProfile from "../../components/clientDashboard/LawyerProfile";
import { MeetUpInfo } from "../../components/MeetUpInfo";
import { CaseBriefView } from "../../components/clientDashboard/CaseBriefView";
import CaseBriefEdit from "../../components/CaseBriefEdit";
import AverageCost from "../../components/AverageCost";
import withAuthClient from "../../components/authenticationHelpers/withAuthClient";
import { BoxArrowLeft } from "react-bootstrap-icons";
import { useRouter } from "next/dist/client/router";

const clientDashboard = () => {
	const [clientData, setClientData] = useState();

	const router = useRouter();
	// Logout function
	const handleLogout = () => {
		localStorage.removeItem("jwt-token");
		router.push("/login");
	}

	useEffect(() => {
		axios.get(apiRoot + "/currClientData", {
			headers: {'Authorization': 'Bearer ' + localStorage.getItem("jwt-token")}
		}).then(res => {
			setClientData(res.data);
		})
	}, [])

	if (clientData) {
		return (
			<>
				<BoxArrowLeft onClick={handleLogout} className={styles.logoutIcon} size="35" />
				<div className={styles.outerContainer}>
					<h1 className={styles.heading}>Hello, {clientData.name}</h1>
					<StageStepper progress = {clientData.progress}/>
					<SelectionButtons progress = {clientData.progress} allocatedLawyer = {clientData.allocated_lawyer}/>
					<div className={styles.rowContainer}>
						<LawyerProfile allocatedLawyer = {clientData.allocated_lawyer}/>
						<MeetUpInfo progress = {clientData.progress}/>
					</div>
					<div className={styles.rowContainer}>
						<CaseBriefView brief = {clientData.brief}/>
					</div>
					<div className={styles.rowContainer}>
						<AverageCost/>
					</div>
				</div>
			</>
		)
	} else {
		return (
			<div>
				We're on the way! Please hang on...
			</div>
		);
	}
}

export default withAuthClient(clientDashboard)
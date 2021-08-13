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

const clientDashboard = () => {
	const [clientData, setClientData] = useState();

	useEffect(() => {
		axios.get(apiRoot + "/currClientData", {
			headers: {'Authorization': 'Bearer ' + localStorage.getItem("jwt-token")}
		}).then(res => {
			setClientData(res.data);
		})
	}, [])

	if (clientData) {
		return (
			<div className={styles.outerContainer}>
				<h1 className={styles.heading}>Hello, {clientData.name}</h1>
				<StageStepper progress = {clientData.progress}/>
				<SelectionButtons progress = {clientData.progress}/>
				<div className={styles.rowContainer}>
					<LawyerProfile/>
					<MeetUpInfo progress = {clientData.progress}/>
				</div>
				<div className={styles.rowContainer}>
					<CaseBriefView brief = {clientData.brief}/>
				</div>
				<div className={styles.rowContainer}>
					<AverageCost/>
				</div>
			</div>
		)
	} else {
		return (
			<div>
				Loading...
			</div>
		);
	}
}

export default clientDashboard
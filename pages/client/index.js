import styles from "../../styles/Client.module.css";
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
	const router = useRouter();
	// Logout function
	const handleLogout = () => {
		localStorage.removeItem("jwt-token");
		router.push("/login");
	}

	return (
		<>
			<BoxArrowLeft onClick={handleLogout} className={styles.logoutIcon} size="35" />
			<div className={styles.outerContainer}>
				<StageStepper/>
				<div className={styles.rowContainer}>
					<LawyerProfile/>
					<MeetUpInfo/>
				</div>
				<div className={styles.rowContainer}>
					<CaseBriefView/>
				</div>
				<div className={styles.rowContainer}>
					<CaseBriefEdit/>
				</div>
				<div className={styles.rowContainer}>
					<AverageCost/>
				</div>
				<SelectionButtons/>
			</div>	
		</>
	)
}

export default withAuthClient(clientDashboard)
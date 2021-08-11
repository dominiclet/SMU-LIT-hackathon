import styles from "../../styles/Client.module.css";
import StageStepper from "../../components/clientDashboard/StageStepper";
import SelectionButtons from "../../components/clientDashboard/SelectionButtons";
import LawyerProfile from "../../components/LawyerProfile";
import { MeetUpInfo } from "../../components/MeetUpInfo";
import { CaseBriefView } from "../../components/CaseBriefView";
import CaseBriefEdit from "../../components/CaseBriefEdit";
import AverageCost from "../../components/AverageCost";

const clientDashboard = () => {
	return (
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
	)
}

export default clientDashboard
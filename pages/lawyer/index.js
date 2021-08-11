import styles from "../../styles/Lawyer.module.css";
import LawyerProfile from "../../components/LawyerProfile";
import { MeetUpInfo } from "../../components/MeetUpInfo";
import { CaseBriefView } from "../../components/CaseBriefView";
import CaseBriefEdit from "../../components/CaseBriefEdit";
import AverageCost from "../../components/AverageCost";

const lawyerDashboard = () => {
	return (
		<div className={styles.outerContainer}>
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
		</div>
	);
}

export default lawyerDashboard
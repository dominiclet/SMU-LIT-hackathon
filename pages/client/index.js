import styles from "../../styles/Client.module.css";
import Card from "react-bootstrap/Card";
import StageStepper from "../../components/clientDashboard/StageStepper";
import SelectionButtons from "../../components/clientDashboard/SelectionButtons";

const clientDashboard = () => {
	return (
		<div className={styles.outerContainer}>
			<StageStepper/>
			<SelectionButtons/>
		</div>
	);
}

export default clientDashboard
import LawyerDashboard from "../../components/LawyerDashboard";
import styles from "../../styles/Lawyer.module.css";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const lawyerDashboardPage = () => {
	return (
		<Tab.Container defaultActiveKey="first">
			<div className={styles.mainContainer}>
				<Nav variant="pills" className={styles.navbarContainer}>
					<Nav.Item className={styles.navItem}>
						<Nav.Link eventKey="first">Client 1</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="second">Client 2</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="first">
						<LawyerDashboard clientName="Client 1" />
					</Tab.Pane>
					<Tab.Pane eventKey="second">
						<LawyerDashboard clientName="Client 2" />
					</Tab.Pane>
				</Tab.Content>
			</div>
		</Tab.Container>
	);
}

export default lawyerDashboardPage
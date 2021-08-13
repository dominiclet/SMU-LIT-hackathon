import LawyerDashboard from "../../components/LawyerDashboard";
import styles from "../../styles/Lawyer.module.css";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiRoot } from "../../config";
import withAuthLawyer from "../../components/authenticationHelpers/withAuthLawyer";

const lawyerDashboardPage = () => {
	const [clientList, setClientList] = useState();

	useEffect(() => {
		axios.get(apiRoot + "/getClientList", {
			headers: {'Authorization': 'Bearer ' + localStorage.getItem("jwt-token")}
		}).then(res => {
			setClientList(JSON.parse(res.data));
		})
	}, []);

	if (clientList) {
		return (
			<Tab.Container defaultActiveKey={0}>
				<div className={styles.mainContainer}>
					<Nav variant="pills" className={styles.navbarContainer}>
						{clientList.map((client, index) => {
							return (
								<Nav.Item className={styles.navItem}>
									<Nav.Link eventKey={index}>{client.name}</Nav.Link>
								</Nav.Item>
							);
						})}
					</Nav>
					<Tab.Content>
						{clientList.map((client, index) => {
							return (
								<Tab.Pane eventKey={index}>
									<LawyerDashboard clientId={client.id} stage={client.stage} />
								</Tab.Pane>
							)
						})}
					</Tab.Content>
				</div>
			</Tab.Container>
		);
	} else {
		return (
			<div>
				Loading...
			</div>
		);
	}
}

export default withAuthLawyer(lawyerDashboardPage)
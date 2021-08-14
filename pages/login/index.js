import axios from 'axios';
import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import { apiRoot } from '../../config';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/Link';

const loginPage = () => {
	const router = useRouter();
	// State to store radio state
	const [activeRadio, setActiveRadio] = useState(0);

	// To handle radio button change
	const handleRadioButtonChange = (event) => {
		if (event.target.value == "client") {
			setActiveRadio(0);
		} else if (event.target.value == "lawyer") {
			setActiveRadio(1);
		}
	}

	// To handle enter on input fields
	const handleEnter = (event) => {
		if (event.key == "Enter") {
			handleLogin();
		}
	}

	// Handles Login button
	const handleLogin = () => {
		const data = {
			"email": document.getElementById("email").value,
			"password": document.getElementById("password").value,
			"isLawyer": activeRadio
		}

		axios.post(apiRoot + "/login", data).then(res => {
			if (res.status == 200) {
				localStorage.setItem("jwt-token", res.data["access_token"]);
				localStorage.setItem("id", res.data['id'])
				router.push("/" + res.data["route"]);
			}
		}).catch(e => {
			if (e.response.status == 401) {
				document.getElementById("warning").innerHTML = e.response.data;
			}
		})
	}

	return (
		<div className={styles.mainContainer}>
			<div className={styles.loginContainer}>
				<div className={styles.logoContainer}>
					Welcome to Law Tinder!
				</div>
				<div className={styles.inputContainer}>
					<input className={styles.loginInput} placeholder="Email" type="text" id="email" onKeyPress={handleEnter} />
					<input className={styles.loginInput} placeholder="Password" type="password" id="password" onKeyPress={handleEnter} />
					<div className={styles.radioContainer}>
						<label className={styles.radioLabel}>
							Client
							<input className={styles.radio} type="radio" value="client" 
								name="type" checked={activeRadio == 0} onClick={handleRadioButtonChange} />
						</label>
						<label>
							Lawyer
							<input className={styles.radio} type="radio" value="lawyer" 
								name="type" checked={activeRadio == 1} onClick={handleRadioButtonChange} />
						</label>
					</div>
					<div className={styles.warningContainer}>
						<div id="warning" className={styles.warning}></div>
					</div>
				</div>
				<div className={styles.buttonContainer}>
					<button className={styles.loginButton} onClick={handleLogin}>Login</button>
				</div>
				<div className={styles.registerContainer}>
					Register here: <br/>
					<Link href={"/register/client"}>I'm looking for a lawyer!</Link><br/>
					<Link href={"/register/lawyer"}>I'm a lawyer!</Link>
				</div>
			</div>
		</div>
	);
}

export default loginPage
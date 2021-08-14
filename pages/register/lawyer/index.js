import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { apiRoot } from '../../../config';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/Register.module.css';

const lawyerRegisterPage = () => {

	const router = useRouter();

	// For descriptions in the form, reduces font size
	const mutedTextStyle = {
		"fontSize": "0.8rem"
	};

	// Styling for form validation warnings 
	const warningStyle = {
		"fontSize": "0.8rem",
		"color": "red",
		"display": "block"
	}

	// Check matching passwords
	const handleEnterPassword = (e) => {
		const passwordElem = document.getElementById("password");
		const confirmPasswordElem = document.getElementById("confirmpw");
		if (passwordElem.value && passwordElem.value !== confirmPasswordElem.value) {
			confirmPasswordElem.style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075),0 0 5px 1px red";
		} else if (passwordElem.value === confirmPasswordElem.value) {
			confirmPasswordElem.style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075),0 0 5px 1px green";
		} 
	}

	// Handle submit button
	const handleSubmit = (event) => {
		event.preventDefault();

		// Form validation 
		const name = document.getElementById("name");
		const password = document.getElementById("password");
		const confirmPw = document.getElementById("confirmpw");
		const email = document.getElementById("email");
		const areaoflaw = document.getElementById("areaoflaw");
		const firm = document.getElementById("firm");
		const age = document.getElementById("age");
		const gender = document.getElementById("gender");
		const languages = document.getElementById("languages");
		const availability = document.getElementById("availability");


		document.getElementById("fullNameNote").innerHTML = null;
		document.getElementById("ageNote").innerHTML = null;
		document.getElementById("genderNote").innerHTML = null;
		document.getElementById("mobilenumberNote").innerHTML = null;
		document.getElementById("languagesNote").innerHTML = null;
		document.getElementById("availabilityNote").innerHTML = null;
		document.getElementById("passwordNote").innerHTML = null;
		document.getElementById("confirmpwNote").innerHTML = null;
		document.getElementById("emailNote").innerHTML = null;
		document.getElementById("areaoflawNote").innerHTML = null;
		document.getElementById("firmNote").innerHTML = null;

		let noError = true;

		if (name.value.length == 0) {
			// Check that full name is not empty
			document.getElementById("fullNameNote").innerHTML = "Full Name is required.";
			noError = false;
		}
		if (name.value.length == 0) {
			// Check that full name is not empty
			document.getElementById("fullNameNote").innerHTML = "Full Name is required.";
			noError = false;
		}

		if (age.value.length == 0) {
			// Check that full name is not empty
			document.getElementById("ageNote").innerHTML = "Age is required.";
			noError = false;
		}
		if (gender.value == 0) {
			// Check that full name is not empty
			document.getElementById("genderNote").innerHTML = "Gender is required.";
			noError = false;
		}
		if (firm.value.length == 0){
			document.getElementById("firmNote").innerHTML = "Firm name is required.";
			noError = false;
		}
		if (email.value.length == 0) {
			// Check that email is not empty
			document.getElementById("emailNote").innerHTML = "Email is required";
			noError = false;
		}
		if (email.value.includes(" ")) {
			// Do not allow spaces in email
			document.getElementById("emailNote").innerHTML = "No spaces in email."
			noError = false;
		}
		if (password.value.length < 8) {
			// Check that password is at least 8 characters long
			document.getElementById("passwordNote").innerHTML = "Password must be at least 8 characters long.";
			noError = false;
		}
		if (password.value !== confirmPw.value) {
			// Check that confirm password is the same as password
			document.getElementById("confirmpwNote").innerHTML = "Password does not match.";
			noError = false;
		}
		if (areaoflaw.value.length == 0) {
			// Check that full name is not empty
			document.getElementById("areaoflawNote").innerHTML = "Please select an area of law.";
			noError = false;
		}
		if (languages.value.length == 0) {
			// Check that full name is not empty
			document.getElementById("languagesNote").innerHTML = "You are required to specify the languages you are fluent in.";
			noError = false;
		}
		if (availability.value == 0) {
			// Check that full name is not empty
			document.getElementById("availabilityNote").innerHTML = "Please select your availability period.";
			noError = false;
		}
		
		if (document.getElementById("areaoflaw").value == 0) {
			// Check that class is selected
			document.getElementById("areaoflawNote").innerHTML = "Area of law must be specified.";
			noError = false;
		}
		if (document.getElementById("mobilenumber").value.length == 0) {
			// Check that class is selected
			document.getElementById("mobilenumberNote").innerHTML = "Please key in your phone number.";
			noError = false;
		}
		if (document.getElementById("mobilenumber").value.length < 8) {
			// Check that class is selected
			document.getElementById("mobilenumberNote").innerHTML = "Your mobile number must be at least 8 digits.";
			noError = false;
		}
		if (document.getElementById("languages").value.length == 0) {
			// Check that class is selected
			document.getElementById("languagesNote").innerHTML = "Please enter your preferred languages.";
			noError = false;
		}

		if (document.getElementById("gender").value == 0) {
			// Check that class is selected
			document.getElementById("genderNote").innerHTML = "Please select your preferences on gender.";
			noError = false;
		}

		if (document.getElementById("availability").value == 0) {
			// Check that class is selected
			document.getElementById("availabilityNote").innerHTML = "Please select your availability period.";
			noError = false;
		}


		if (noError) {
			const data = {
				"name": name.value,
				"age": age.value,
				"gender": gender.value,
				"email": email.value,
				"mobile": mobilenumber.value,
				"languages": languages.value,
				"availability": availability.value,
				"firm": firm.value,
				"password": password.value,
				"areaOfLaw": areaoflaw.value,
			}

			// TODO
			axios.post(apiRoot + "/register/lawyer", data)
				.then(res => {
					if (res.status == 200) {
						alert("Registration successful");
						router.push("/login");
					}
				})
		}
	}


return(
		<div className={styles.formContainer}>
			<h4 style={{textAlign: 'center'}}>Register</h4>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="name" className={styles.formEntry}>
					<Form.Label>Full Name (as in NRIC) </Form.Label>
					<Form.Control type="text" placeholder="Enter full name" />
					<Form.Text id="fullNameNote" style={warningStyle}></Form.Text>
				</Form.Group>
				<Form.Group controlId="age" className={styles.formEntry}>
					<Form.Label>Age</Form.Label>
					<Form.Control type="text" placeholder="Enter age" />
					<Form.Text id="ageNote" style={warningStyle}></Form.Text>
				</Form.Group>
				<Form.Group controlId="gender" className={styles.formEntry}>
					<Form.Label>Gender</Form.Label>
					<Form.Control as="select">
						<option value={0}>Select gender</option>
						<option value={"Male"}>Male</option>
						<option value={"Female"}>Female</option>
					</Form.Control>
					<Form.Text id="genderNote" style={warningStyle}>
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="email" className={styles.formEntry}>
					<Form.Label>Email</Form.Label>
					<Form.Control type="text" placeholder="Enter email" />
					<Form.Text id="emailNote" style={warningStyle}></Form.Text>
				</Form.Group>
				<Form.Group controlId="mobilenumber" className={styles.formEntry}>
					<Form.Label>Mobile Number</Form.Label>
					<Form.Control type="text" placeholder="Enter mobile number" />
					<Form.Text id="mobilenumberNote" style={warningStyle}></Form.Text>
				</Form.Group>
				<Form.Group controlId="languages" className={styles.formEntry}>
					<Form.Label>Languages that you are fluent in</Form.Label>
					<Form.Control type="text" placeholder="Enter languages" />
					<Form.Text id="languagesNote" style={warningStyle}></Form.Text>					
				</Form.Group>
				<Form.Group controlId="firm" className={styles.formEntry}>
					<Form.Label>Organisation/Law Firm</Form.Label>
					<Form.Control type="text" placeholder="Enter firm" />
					<Form.Text id="firmNote" style={warningStyle}></Form.Text>					
				</Form.Group>
				<Form.Group controlId="availability" className={styles.formEntry}>
					<Form.Label>Availability</Form.Label>
					<Form.Control as="select">
						<option value={0}>Select if you can take urgent cases</option>
						<option value={1}>Can take urgent cases</option>
						<option value={2}>Cannot take urgent cases</option>
					</Form.Control>
					<Form.Text id="availabilityNote" style={warningStyle}>
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="areaoflaw" className={styles.formEntry}>
					<Form.Label>Legal Areas of Expertise</Form.Label>
					<Form.Control as="select">
						<option value={0}>Select area of law</option>
						<option value={"Criminal Law"}>Criminal Law</option>
						<option value={"Family Law"}>Family Law</option>
						<option value={"Employment and Labour Law"}>Employment and Labour Law</option>
						<option value={"Company Law"}>Company Law</option>
					</Form.Control>
					<Form.Text id="areaoflawNote" style={warningStyle} >
					</Form.Text>
                </Form.Group>
				<Form.Group controlId="password" className={styles.formEntry}>
					<Form.Label>Password</Form.Label>
					<Form.Control id="password" type="password" placeholder="Enter password" onChange={handleEnterPassword} />
					<Form.Text id="passwordNote" style={warningStyle}></Form.Text>
				</Form.Group>
				<Form.Group className={styles.formEntry} controlId="confirmPassword">
					<Form.Label>Confirm password</Form.Label>
					<Form.Control type="password" placeholder="Enter password again" id="confirmpw" onChange={handleEnterPassword} />
					<Form.Text id="confirmpwNote" style={warningStyle}></Form.Text>
				</Form.Group>
				<Button type="submit">Submit</Button>
			</Form>
		</div>
	);
	
}

export default lawyerRegisterPage
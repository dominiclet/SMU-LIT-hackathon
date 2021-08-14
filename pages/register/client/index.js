import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { apiRoot } from '../../../config';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/Register.module.css';

const registerPage = () => {
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const router = useRouter();

  // For descriptions in the form, reduces font size
  const mutedTextStyle = {
    fontSize: "0.8rem",
  };

  // Styling for form validation warnings
  const warningStyle = {
    fontSize: "0.8rem",
    color: "red",
    display: "block",
  };

  // Check matching passwords
  const handleEnterPassword = (e) => {
    const passwordElem = document.getElementById("password");
    const confirmPasswordElem = document.getElementById("confirmpw");
    if (
      passwordElem.value &&
      passwordElem.value !== confirmPasswordElem.value
    ) {
      confirmPasswordElem.style.boxShadow =
        "inset 0 1px 1px rgba(0,0,0,.075),0 0 5px 1px red";
    } else if (passwordElem.value === confirmPasswordElem.value) {
      confirmPasswordElem.style.boxShadow =
        "inset 0 1px 1px rgba(0,0,0,.075),0 0 5px 1px green";
    }
  };

  // Handle submit button
  const handleSubmit = (event) => {
    event.preventDefault();

    // Form validation
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    const confirmPw = document.getElementById("confirmpw");
    const email = document.getElementById("email");
    const registerToken = document.getElementById("registerToken");
    const areaoflaw = document.getElementById("areaoflaw");

    document.getElementById("fullNameNote").innerHTML = null;
    document.getElementById("passwordNote").innerHTML = null;
    document.getElementById("confirmpwNote").innerHTML = null;
    document.getElementById("emailNote").innerHTML = null;
    document.getElementById("tokenNote").innerHTML = null;
    document.getElementById("areaoflawNote").innerHTML = null;
    document.getElementById("casedescriptionNote").innerHTML = null;
    document.getElementById("ageNote").innerHTML = null;
    document.getElementById("lawyergenderNote").innerHTML = null;
    document.getElementById("languagesNote").innerHTML = null;
    document.getElementById("budgetNote").innerHTML = null;
    document.getElementById("mobilenumberNote").innerHTML = null;
    document.getElementById("urgencyNote").innerHTML = null;
    document.getElementById("genderNote").innerHTML = null;

    let noError = true;

    if (name.value.length == 0) {
      // Check that full name is not empty
      document.getElementById("fullNameNote").innerHTML =
        "Full name is required.";
      noError = false;
    }
    if (document.getElementById("lawyergender").value == 0) {
      // Check that full name is not empty
      document.getElementById("lawyergenderNote").innerHTML =
        "Please select your preferences on your lawyer's gender.";
      noError = false;
    }
    if (email.value.length == 0) {
      // Check that email is not empty
      document.getElementById("emailNote").innerHTML = "Email is required";
      noError = false;
    }
    if (email.value.includes(" ")) {
      // Do not allow spaces in email
      document.getElementById("emailNote").innerHTML = "No spaces in email.";
      noError = false;
    }
    if (password.value.length < 8) {
      // Check that password is at least 8 characters long
      document.getElementById("passwordNote").innerHTML =
        "Password must be at least 8 characters long.";
      noError = false;
    }
    if (password.value !== confirmPw.value) {
      // Check that confirm password is the same as password
      document.getElementById("confirmpwNote").innerHTML =
        "Password does not match.";
      noError = false;
    }
    if (registerToken.value.length == 0) {
      // Check that register token is not empty
      document.getElementById("tokenNote").innerHTML =
        "Registration is only permitted with a valid registration token.";
      noError = false;
    }

    if (document.getElementById("areaoflaw").value == 0) {
      // Check that class is selected
      document.getElementById("areaoflawNote").innerHTML =
        "Area of law must be specified.";
      noError = false;
    }
    if (
      document.getElementById("areaoflaw").value == 1 &&
      document.getElementById("caseDescription").value.length == 0
    ) {
      // Check that class is selected
      document.getElementById("casedescriptionNote").innerHTML =
        "This section cannot be empty.";
      noError = false;
    }
    if (document.getElementById("mobilenumber").value.length == 0) {
      // Check that class is selected
      document.getElementById("mobilenumberNote").innerHTML =
        "Please key in your phone number.";
      noError = false;
    }
    if (document.getElementById("mobilenumber").value.length < 8) {
      // Check that class is selected
      document.getElementById("mobilenumberNote").innerHTML =
        "Your mobile number must be at least 8 digits.";
      noError = false;
    }
    if (document.getElementById("budget").value.length == 0) {
      // Check that class is selected
      document.getElementById("budgetNote").innerHTML =
        "Please enter your budget.";
      noError = false;
    }
    if (document.getElementById("languages").value.length == 0) {
      // Check that class is selected
      document.getElementById("languagesNote").innerHTML =
        "Please enter your preferred languages.";
      noError = false;
    }

    if (document.getElementById("gender").value == 0) {
      // Check that class is selected
      document.getElementById("genderNote").innerHTML =
        "Please select your gender.";
      noError = false;
    }
    if (document.getElementById("age").value.length == 0) {
      // Check that class is selected
      document.getElementById("ageNote").innerHTML = "Please enter your age.";
      noError = false;
    }

    if (document.getElementById("urgency").value == 0) {
      // Check that class is selected
      document.getElementById("urgencyNote").innerHTML =
        "Please select the urgency level of your request.";
      noError = false;
    }

    if (document.getElementById("registerToken").value !== "WeloveSMU!") {
      document.getElementById("tokenNote").innerHTML =
        "Wrong registration token.";
      noError = false;
    }
			// TODO 
			axios.post(apiRoot + "/register/client", data)
				.then(res => {
					if (res.status == 200) {
						alert("Registration successful");
						router.push("/login");
					}
				})

    if (noError) {
      const data = {
        name: name.value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        email: email.value,
        mobile: document.getElementById("mobilenumber").value,
        budget: document.getElementById("budget").value,
        languages: document.getElementById("languages").value,
        lawyergender: document.getElementById("lawyergender").value,
        urgent: document.getElementById("urgency").value,
        password: password.value,
        token: registerToken.value,
        areaOfLaw: areaoflaw.value,
        caseDescription: document.getElementById("caseDescription").value,
      };

      axios.post(apiRoot + "/register", data).then((res) => {
        if (res.status == 200) {
          alert("Registration successful");
          router.push("/login");
        }
      });
    }
  };

  // Handles generating area of law (NLP)
  const handleGenAreaOfLaw = () => {
	  const data = {
		"description": document.getElementById("caseDescription").value
	  }
	  axios.post(apiRoot + "/nlpCase", data).then(res => {
		  document.getElementById("genLaw").innerHTML = res.data;
	  })
  }

  return (
    <div className={styles.formContainer}>
      <h4 style={{ textAlign: "center" }}>Register</h4>
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
          <Form.Text id="genderNote" style={warningStyle}></Form.Text>
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
        <Form.Group controlId="budget" className={styles.formEntry}>
          <Form.Label>Estimated Budget for Legal Services</Form.Label>
          <Form.Control type="text" placeholder="Enter budget" />
          <Form.Text id="budgetNote" style={warningStyle}></Form.Text>
        </Form.Group>
        <Form.Group controlId="languages" className={styles.formEntry}>
          <Form.Label>Preferred languages/dialects</Form.Label>
          <Form.Control type="text" placeholder="Enter languages" />
          <Form.Text id="languagesNote" style={warningStyle}></Form.Text>
          <Form.Text className="text-muted" style={mutedTextStyle}>
            This is the language that you prefer to use to communicate with your
            lawyer.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="lawyergender" className={styles.formEntry}>
          <Form.Label>Preferred Gender of Lawyer</Form.Label>
          <Form.Control as="select">
            <option value={0}>Select gender</option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"No preference"}>No Preference</option>
          </Form.Control>
          <Form.Text id="lawyergenderNote" style={warningStyle}></Form.Text>
        </Form.Group>
        <Form.Group controlId="urgency" className={styles.formEntry}>
          <Form.Label>Urgency of Request</Form.Label>
          <Form.Control as="select">
            <option value={0}>Select level of urgency</option>
            <option value={"Urgent (as soon as possible)"}>
              Urgent (as soon as possible)
            </option>
            <option value={"Within 6 months"}>Within 6 months</option>
            <option value={"Within 1 year"}>Within 1 year</option>
          </Form.Control>
          <Form.Text id="urgencyNote" style={warningStyle}></Form.Text>
        </Form.Group>
        <Form.Group controlId="areaoflaw" className={styles.formEntry}>
          <Form.Label>Area of Law</Form.Label>
          <Form.Control as="select">
            <option value={0}>Select area of law</option>
            <option value={"Criminal Law"}>Criminal Law</option>
            <option value={"Family Law"}>Family Law</option>
            <option value={"Employment and Labour Law"}>
              Employment and Labour Law
            </option>
            <option value={"Company Law"}>Company Law</option>
            <option value={1} onSelect="setLaw()">
              Not sure
            </option>
          </Form.Control>
          <Form.Text className="text-muted" style={mutedTextStyle}>
            Please select the area of law that you think your legal issues fall
            under.
          </Form.Text>
          <Form.Text id="areaoflawNote" style={warningStyle}></Form.Text>
        </Form.Group>
        <Form.Group controlId="caseDescription" className={styles.formEntry}>
          <Form.Label>Case Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
          />
          <Form.Text id="casedescriptionNote" style={warningStyle}></Form.Text>
          <Form.Text className="text-muted" style={mutedTextStyle}>
            Please describe the legal issues that you are facing succintly. This
            section is compulsory only if you do not know the area of law that
            your legal issues fall under.
          </Form.Text>
        </Form.Group>

        <Form.Group controlID="nlp" className={styles.formEntry}>
          <Form.Label>
            If you are unsure, click here to find out what area of law your case
            falls under:
          </Form.Label>
          <br />
          <form method="POST" action="/nlpcase">
            <Button id="nlpbutton" name="nlpbutton" onClick={handleGenAreaOfLaw}>
              Generate area of law
            </Button>
            <Form.Text id="genLaw" className={styles.genLawResult}></Form.Text>
          </form>
        </Form.Group>

        <Form.Group controlId="password" className={styles.formEntry}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Enter password"
            onChange={handleEnterPassword}
          />
          <Form.Text id="passwordNote" style={warningStyle}></Form.Text>
        </Form.Group>
        <Form.Group className={styles.formEntry} controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            id="confirmpw"
            onChange={handleEnterPassword}
          />
          <Form.Text id="confirmpwNote" style={warningStyle}></Form.Text>
        </Form.Group>
        <Form.Group controlId="registerToken" className={styles.formEntry}>
          <Form.Label>Token</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter registration token"
          />
          <Form.Text id="tokenNote" style={warningStyle}></Form.Text>
        </Form.Group>
        <Button type="submit" name="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default registerPage;
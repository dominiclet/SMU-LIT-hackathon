import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const StageStepperLawyer = (props) => {
	const steps = [
		"Accept/Reject client",
		"Ongoing case",
		"Case completed"
	];

	return (
		<Stepper activeStep={props.stage} alternativeLabel>
			{steps.map((label) => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
}

export default StageStepperLawyer
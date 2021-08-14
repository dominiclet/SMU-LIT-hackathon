import { useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import clientStyle from '../../styles/Client.module.css';

const getSteps = () => {
    return [
        "Finding you a lawyer",
        "Set up a meeting with your lawyer",
        "Case completed"
    ];
}

const getStepContent = (stepIndex) => {
    switch (stepIndex) {
        case 0 :
            return "Here's a lawyer we have matched for you! Do take a look and accept the lawyer if you are comfortable.";
        case 1 :
            return "You should be reaching out to the lawyer to set a meeting, co-ordinate and provide all the necessary information related to the case.";
        case 2 : 
            return "Leave a review and provide us with relevant information to make the next experience better!"
    }
}
const StageStepper = (props) => {
    const [activeStep, setActiveStep] = useState(props.progress)
    const steps = getSteps()
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
    return (
        <div className={clientStyle.root}>
            <div className={clientStyle.container}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <Typography className={clientStyle.instructions}>{getStepContent(activeStep)}</Typography>
        </div>
    );
}

export default StageStepper

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
            return "Info about finding lawyer";
        case 1 :
            return "Explain how to set up meeting";
        case 2 : 
            return "Leave a review etc."
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

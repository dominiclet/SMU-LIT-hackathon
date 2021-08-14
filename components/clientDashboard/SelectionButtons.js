import Button from 'react-bootstrap/Button';
import clientStyle from '../../styles/Client.module.css'
import axios from 'axios';
import { apiRoot } from '../../config';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

const SelectionButtons = (props) => {
    const router = useRouter();
    const [disableButtons, setDisableButtons] = useState(false);

    // handle select lawyer
    const handleSelect = () => {
        axios.post(apiRoot + "/incrementStage", 1, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("jwt-token") }
        }).then(res => {
            if (res.status == 200) {
                router.reload();
            }
        }).catch(e => {
            throw e;
        });
    }

    // handle adding client to lawyer's client list
    const addClient = () => {
        axios.post(apiRoot + `/addClient/${props.allocatedLawyer}`, 1, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("jwt-token") }
        }).then(res => {
            if (res.status == 200) {
                setDisableButtons(true);
            }
        }).catch(e => {
            throw e;
        });

    }

    // handle revert to previous stage
    const revertStage = () => {
        axios.post(apiRoot + "/decrementStage", 1, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("jwt-token") }
        }).then(res => {
            if (res.status == 200) {
                router.reload();
            }
        }).catch(e => {
            throw e;
        });
    }

    // display previous lawyer
    const prevLawyer = () => {
        axios.post(apiRoot + "/prevLawyer", 1, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("jwt-token") }
        }).then(res => {
            if (res.status == 200) {
                router.reload();
            }
        }).catch(e => {
            throw e;
        });
    }

    // display next lawyer
    const nextLawyer = () => {
        axios.post(apiRoot + "/nextLawyer", 1, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("jwt-token") }
        }).then(res => {
            if (res.status == 200) {
                router.reload();
            }
        }).catch(e => {
            throw e;
        });
    }

    const showSelectionButtons = () => {
        return props.progress == 0;
    }
    const completeCase = () => {
        return props.progress == 1;
    }
    const goBack = () => {
        return props.progress == 2;
    }
    const pending = () => {
        return disableButtons;
    }

    return (
        <div>
            {showSelectionButtons() &&
                <div className={clientStyle.selectionButtons}>
                    <Button variant="outline-secondary" onClick={prevLawyer} disabled={disableButtons}>Revert to previous lawyer</Button>
                    <Button variant="outline-success"
                        onClick={addClient}
                        disabled={disableButtons}
                    >
                        Select this lawyer
                    </Button>
                    <Button variant="outline-danger" onClick={nextLawyer} disabled={disableButtons}>Look for another lawyer</Button>
                </div>
            }
            {completeCase() &&
                <div className={clientStyle.singleButton}>
                    <Button variant="outline-primary" onClick={handleSelect}>Case completed</Button>
                </div>
            }
            {goBack() &&
                <div className={clientStyle.singleButton}>
                    <Button variant="outline-primary" onClick={revertStage}>Go back to previous stage</Button>
                </div>
            }
            {pending() &&
                <h5 className={clientStyle.text}>Buttons disabled, pending lawyer approval</h5>
            }
        </div>
    )
}

export default SelectionButtons

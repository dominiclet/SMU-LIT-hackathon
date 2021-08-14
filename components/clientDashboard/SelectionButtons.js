import Button from 'react-bootstrap/Button';
import clientStyle from '../../styles/Client.module.css'
import axios from 'axios';
import { apiRoot } from '../../config';
import { useRouter } from 'next/dist/client/router';

const SelectionButtons = (props) => {
    const router = useRouter();

    // handle select lawyer
    const handleSelect = () => {
		axios.post(apiRoot + "/incrementStage", 1, {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("jwt-token")}
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
        axios.post(apiRoot + "/addClient/1", 1, {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("jwt-token")}
        }).then(res => {
			if (res.status == 200) {
				router.reload();
			}
		}).catch(e => {
            throw e;
        });
    }

    // handle revert to previous stage
    const revertStage = () => {
		axios.post(apiRoot + "/decrementStage", 1, {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("jwt-token")}
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

    return (
        <div>
            {showSelectionButtons() &&
                <div className={clientStyle.selectionButtons}>   
                    <Button variant="secondary">Revert to previous lawyer</Button>
                    <Button variant="success" 
                        onClick={addClient}
                        >
                            Select this lawyer
                    </Button>
                    <Button variant="danger">Look for another lawyer</Button>
                </div>
            }
            {completeCase() &&
                <div className={clientStyle.singleButton}>
                    <Button variant="primary" onClick={handleSelect}>Case completed</Button>
                </div>
            }
            {goBack() &&
                <div className={clientStyle.singleButton}> 
                    <Button variant="primary" onClick={revertStage}>Go back to previous stage</Button>
                </div>
            }
        </div>
    )
}

export default SelectionButtons

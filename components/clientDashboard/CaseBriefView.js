import styles from '../../styles/Client.module.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { apiRoot } from '../../config';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';

export const CaseBriefView = (props) => {
    const router = useRouter();
    const [editing, setEditing] = useState(0);
    const [brief, setBrief] = useState(props.brief);

    const handleEdit = () => {
        setEditing(1);
    }

    const handleSave = () => {
        setEditing(0);
        const data = {"brief": brief}
		axios.post(apiRoot + "/editCaseBrief", data, {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("jwt-token")}
        }).then(res => {
			if (res.status == 200) {
				return;
			}
		}).catch(e => {
            throw e;
        });
    }

    return (
        <Card className={styles.bigCard}>
            <Card.Body>
                <Card.Title>Case brief</Card.Title>
                <Card.Text>Enter brief details about your case here for the lawyer to read</Card.Text>
                {editing===0 && 
                    <div>
                        <Form.Control className={styles.briefTextDisplay} as="textarea" placeholder={brief} plaintext readOnly/>
                        <Button className={styles.button} variant="secondary" onClick={handleEdit}>Edit</Button>{' '}
                    </div>
                }

                {editing===1 &&
                    <div>
                        <Form.Control className={styles.briefTextEdit}
                            as="textarea"
                            defaultValue={brief}
                            onChange={e => setBrief(e.target.value)}
                        />
                        <Button className={styles.button} variant="secondary" onClick={handleSave}>Save</Button>{' '}
                    </div>
                }


            </Card.Body>
		</Card>
    )
}
/*    
    const ReactQuill = dynamic(
        import('react-quill'),
        {
            ssr: false,
            loading: () => <p>Loading...</p>
        }
    )
    const quillStyle = {
        "width": "100%", 
        "margin": "auto"
    }
    const formats = ['bold', 'italic', 'underline', 'blockquote', 'list', 'bullet']
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}]
        ]
    }

                <ReactQuill
                    style={quillStyle}
                    theme="bubble"
                    modules={modules}
                    format={formats}
                    value={props.brief}
                />
*/
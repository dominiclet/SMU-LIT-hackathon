import styles from '../../styles/Client.module.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import dynamic from 'next/dynamic';

export const CaseBriefView = (props) => {

    const [editing, setEditing] = useState(0);
    const [brief, setBrief] = useState(props.brief);

    return (
        <Card className={styles.bigCard}>
            <Card.Body>
                <Card.Title>Case brief</Card.Title>
                {editing===0 && 
                    <div>
                        <Form.Control className={styles.briefTextDisplay} type="text" placeholder={brief} plaintext readOnly />
                        <Button variant="secondary" onChange={() => {setEditing(1); window.location.reload()}}>Edit</Button>{' '}
                    </div>
                }

                {editing===1 &&
                    <div>
                        <Form.Control className={styles.briefTextDisplay}
                            as="textarea"
                            placeholder={brief}
                        />
                        <Button variant="secondary" onChange={() => {setEditing(1); window.location.reload()}}>Save</Button>{' '}
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
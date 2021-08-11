import Card from 'react-bootstrap/Card';
import styles from '../styles/Lawyer.module.css';

const AverageCost = () => {
    return (
        <Card className={styles.smallCard}>
            <Card.Body>
                <Card.Title>Average cost...</Card.Title>
                <div className={styles.averageCostInnerInfo}>
                    <div className={styles.averageCostInnerTitle}>
                        of this lawyer:
                    </div>
                    <div className={styles.averageCostInnerPrice}>
                        $80
                    </div>
                </div>
                <div className={styles.averageCostInnerInfo}>
                    <div className={styles.averageCostInnerTitle}>
                        of this type of service:
                    </div>
                    <div className={styles.averageCostInnerPrice}>
                        $100
                    </div>
                </div>
            </Card.Body>
		</Card>
    )
}

export default AverageCost

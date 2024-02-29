import { PlanleggerRoutes } from 'appData/routes';
import GreenHeading from 'components/GreenHeading';
import ProgressStepper, { ProgressStep } from 'components/progressStepper/ProgressStepper';

import styles from './planleggerPage.module.css';

interface Props {
    steps: Array<ProgressStep<PlanleggerRoutes>>;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerPage: React.FunctionComponent<Props> = ({ steps, children }) => {
    return (
        <div className={styles.background}>
            <div className={styles.header}>
                <GreenHeading>
                    <ProgressStepper steps={steps} hideExpandableStepInfo showGreenStatusBar />
                </GreenHeading>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default PlanleggerPage;

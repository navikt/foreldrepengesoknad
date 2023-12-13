import { FunctionComponent } from 'react';
import PlanleggerRouter from './routes/PlanleggerRouter';
import { PlanleggerDataContext } from 'appData/PlanleggerDataContext';

const Planlegger: FunctionComponent = () => {
    return (
        <PlanleggerDataContext>
            <PlanleggerRouter />
        </PlanleggerDataContext>
    );
};

export default Planlegger;

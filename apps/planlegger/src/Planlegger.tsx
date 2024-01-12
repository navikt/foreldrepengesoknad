import { FunctionComponent } from 'react';
import { PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import PlanleggerRouter from './PlanleggerRouter';

const Planlegger: FunctionComponent = () => {
    return (
        <PlanleggerDataContext>
            <PlanleggerRouter />
        </PlanleggerDataContext>
    );
};

export default Planlegger;

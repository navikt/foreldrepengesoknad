import { FunctionComponent } from 'react';
import PlanleggerRouter from './routes/PlanleggerRouter';
import { EsDataContext } from 'appData/EsDataContext';

const Planlegger: FunctionComponent = () => {
    return (
        <EsDataContext>
            <PlanleggerRouter />
        </EsDataContext>
    );
};

export default Planlegger;

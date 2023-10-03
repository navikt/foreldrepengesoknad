import { FunctionComponent, ReactElement } from 'react';
import { Action, EsDataContext, EsDataMap } from 'appData/EsDataContext';

interface Props {
    children: ReactElement;
    initialState?: EsDataMap;
    onDispatch?: (action: Action) => void;
}

const EsContextStorybookHelper: FunctionComponent<Props> = ({ children, onDispatch, initialState }) => {
    return (
        <EsDataContext initialState={initialState} testDispatcher={onDispatch}>
            {children}
        </EsDataContext>
    );
};

export default EsContextStorybookHelper;

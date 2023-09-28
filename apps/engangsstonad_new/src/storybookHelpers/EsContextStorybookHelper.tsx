import { FunctionComponent, ReactElement, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { EsDataContext, EsDataMap, EsDataType, useEsStateData } from 'appData/EsDataContext';

interface WrapperProps {
    children: ReactElement;
    dataTypeToLogWhenChanges: EsDataType;
}

const Wrapper: FunctionComponent<WrapperProps> = ({ children, dataTypeToLogWhenChanges }) => {
    const data = useEsStateData(dataTypeToLogWhenChanges);

    useEffect(() => {
        if (data) {
            action('button-click')(data);
        }
    }, [data]);

    return <>{children}</>;
};

interface Props {
    children: ReactElement;
    dataTypeToLogWhenChanges?: EsDataType;
    initialState?: EsDataMap;
}

const EsContextStorybookHelper: FunctionComponent<Props> = ({ children, dataTypeToLogWhenChanges, initialState }) => {
    return (
        <EsDataContext initialState={initialState}>
            {dataTypeToLogWhenChanges && (
                <Wrapper dataTypeToLogWhenChanges={dataTypeToLogWhenChanges}>{children}</Wrapper>
            )}
            {!dataTypeToLogWhenChanges && children}
        </EsDataContext>
    );
};

export default EsContextStorybookHelper;

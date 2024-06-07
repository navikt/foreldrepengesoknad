import { FunctionComponent } from 'react';

interface Props {
    isBlack?: boolean;
}

const HorizontalLine: FunctionComponent<Props> = ({ isBlack = false }) => {
    return <hr style={{ width: '100%' }} color={isBlack ? '#000000' : '#99C4DD'} />;
};

export default HorizontalLine;

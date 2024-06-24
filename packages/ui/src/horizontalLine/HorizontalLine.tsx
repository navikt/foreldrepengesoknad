import { FunctionComponent } from 'react';

interface Props {
    isBlue?: boolean;
}

const HorizontalLine: FunctionComponent<Props> = ({ isBlue = false }) => {
    return <hr style={{ width: '100%' }} color={isBlue ? '#66A3C4' : '#99C4DD'} />;
};

export default HorizontalLine;

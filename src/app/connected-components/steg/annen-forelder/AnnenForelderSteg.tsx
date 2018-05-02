import * as React from 'react';
import { StegID } from '../../../util/stegConfig';
import Steg from '../../../components/layout/Steg';

class AnnenForelderSteg extends React.Component {
    render() {
        return <Steg id={StegID.ANNEN_FORELDER}>Annen Forelder content</Steg>;
    }
}

export default AnnenForelderSteg;

import * as React from 'react';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import FordelingForelderInfo from './components/FordelingForelderInfo';
import { Forelder, StatusKey } from 'common/types';
import { FordelingGrafData, FordelingsinfoEnForelder } from './types';
import FordelingGrafHeader from './components/FordelingGrafHeader';
import FordelingGrafBar from './components/FordelingGrafBar';

import './fordelingGraf.less';

export const fordelingGrafBem = BEMHelper('fordelingGraf');

interface Props {
    tittel: string;
    status: StatusKey;
    statusTekst: string;
    fordeling: FordelingGrafData;
    mor?: FordelingsinfoEnForelder;
    farMedmor?: FordelingsinfoEnForelder;
}

const FordelingGraf: React.StatelessComponent<Props> = ({ tittel, status, statusTekst, fordeling, mor, farMedmor }) => {
    return (
        <div className={fordelingGrafBem.block}>
            <Block margin="s" screenOnly={true}>
                <FordelingGrafHeader status={status} statusTekst={statusTekst} tittel={tittel} />
            </Block>
            {fordeling && (
                <Block margin="s" screenOnly={true}>
                    <FordelingGrafBar fordeling={fordeling} forelder={mor ? Forelder.mor : Forelder.farMedmor} />
                </Block>
            )}
            <div className={fordelingGrafBem.element('titler')}>
                {mor && <FordelingForelderInfo info={mor} />}
                {farMedmor && <FordelingForelderInfo info={farMedmor} invertert={mor !== undefined} />}
            </div>
        </div>
    );
};

export default FordelingGraf;

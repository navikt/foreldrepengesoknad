import { bemUtils, InfoBlock, intlUtils } from '@navikt/fp-common';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Periode } from 'uttaksplan/types/Periode';
import Periodeliste from './../periodeliste/Periodeliste';

import './planlegger.less';

interface Props {
    uttaksplan: Periode[];
    familiehendelsesdato: string;
    handleOnPlanChange: (plan: Periode[]) => void;
}

const Planlegger: FunctionComponent<Props> = ({ uttaksplan, familiehendelsesdato, handleOnPlanChange }) => {
    const intl = useIntl();
    const bem = bemUtils('planlegger');

    return (
        <InfoBlock>
            <section>
                <div className={bem.element('tittel')}>
                    <Systemtittel>{intlUtils(intl, 'uttaksplan.dinPlan')}</Systemtittel>
                </div>
                <Periodeliste
                    uttaksplan={uttaksplan}
                    familiehendelsesdato={familiehendelsesdato}
                    handleOnPlanChange={handleOnPlanChange}
                />
            </section>
        </InfoBlock>
    );
};

export default Planlegger;

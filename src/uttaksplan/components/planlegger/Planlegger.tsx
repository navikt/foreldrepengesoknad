import { bemUtils, InfoBlock, intlUtils } from '@navikt/fp-common';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Periode } from 'uttaksplan/types/Periode';
import Periodeliste from './../periodeliste/Periodeliste';

import './planlegger.less';

interface Props {
    uttaksplan: Periode[];
    familiehendelsesdato: string;
    handleOnPeriodeChange: (periode: Periode) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
}

const Planlegger: FunctionComponent<Props> = ({
    uttaksplan,
    familiehendelsesdato,
    handleOnPeriodeChange,
    stønadskontoer,
    navnPåForeldre,
}) => {
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
                    handleOnPeriodeChange={handleOnPeriodeChange}
                    stønadskontoer={stønadskontoer}
                    navnPåForeldre={navnPåForeldre}
                />
            </section>
        </InfoBlock>
    );
};

export default Planlegger;

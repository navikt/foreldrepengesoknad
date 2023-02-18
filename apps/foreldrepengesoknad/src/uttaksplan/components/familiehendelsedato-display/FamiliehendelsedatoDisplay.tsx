import { bemUtils } from '@navikt/fp-common';
import Barn, { isAdoptertBarn, isFødtBarn } from 'app/context/types/Barn';
import { formaterDatoUtenDag } from 'app/utils/dateUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import HjerteIkon from 'uttaksplan/assets/HjerteIkon';

import './familiehendelsesdatoDisplay.less';

interface Props {
    familiehendelsedato: Date;
    barn: Barn;
}

const getTekst = (barn: Barn, familiehendelsedato: Date, antallBarn: number): ReactNode => {
    if (!isAdoptertBarn(barn)) {
        if (isFødtBarn(barn)) {
            return (
                <FormattedMessage
                    id="uttaksplan.familiehendelsesdato.født"
                    values={{ antallBarn, dato: formaterDatoUtenDag(familiehendelsedato) }}
                />
            );
        }

        return (
            <FormattedMessage
                id="uttaksplan.familiehendelsesdato.termin"
                values={{ dato: formaterDatoUtenDag(familiehendelsedato) }}
            />
        );
    }

    return (
        <FormattedMessage
            id="uttaksplan.familiehendelsesdato.adopsjon"
            values={{ antallBarn, dato: formaterDatoUtenDag(familiehendelsedato) }}
        />
    );
};

const FamiliehendelsedatoDisplay: FunctionComponent<Props> = ({ familiehendelsedato, barn }) => {
    const bem = bemUtils('familiehendelsesdatoDisplay');

    return (
        <div className={bem.block}>
            <div className={bem.element('hjerte')}>
                <HjerteIkon fylt={true} title="Hjerte" />
            </div>
            <Normaltekst>{getTekst(barn, familiehendelsedato, barn.antallBarn)}</Normaltekst>
        </div>
    );
};

export default FamiliehendelsedatoDisplay;

import { bemUtils } from '@navikt/fp-common';
import { formaterDatoUtenDag } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import HjerteIkon from 'uttaksplan/assets/HjerteIkon';

import './familiehendelsesdatoDisplay.less';

interface Props {
    familiehendelsedato: Date;
    erAdopsjon: boolean;
}

const getTekst = (erAdopsjon: boolean, familiehendelsedato: Date): ReactNode => {
    if (!erAdopsjon) {
        if (dayjs(familiehendelsedato).isSameOrBefore(new Date())) {
            return (
                <FormattedMessage
                    id="uttaksplan.familiehendelsesdato.født"
                    values={{ dato: formaterDatoUtenDag(familiehendelsedato) }}
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
            values={{ dato: formaterDatoUtenDag(familiehendelsedato) }}
        />
    );
};

const FamiliehendelsedatoDisplay: FunctionComponent<Props> = ({ erAdopsjon, familiehendelsedato }) => {
    const bem = bemUtils('familiehendelsesdatoDisplay');

    return (
        <div className={bem.block}>
            <div className={bem.element('hjerte')}>
                <HjerteIkon fylt={true} title="Hjerte" />
            </div>
            <Normaltekst>{getTekst(erAdopsjon, familiehendelsedato)}</Normaltekst>
        </div>
    );
};

export default FamiliehendelsedatoDisplay;

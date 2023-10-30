import { IntlShape, useIntl } from 'react-intl';
import { ReadMore } from '@navikt/ds-react';
import { bemUtils, intlUtils } from '@navikt/fp-common';

import './hvaLeggerNAVVektPå.css';

const getPunktTekster = (intl: IntlShape) => [
    intlUtils(intl, 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt1'),
    intlUtils(intl, 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt2'),
    intlUtils(intl, 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt3'),
    intlUtils(intl, 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt4'),
    intlUtils(intl, 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt5'),
    intlUtils(intl, 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt6'),
];

const HvaLeggerNAVVektPå: React.FunctionComponent = () => {
    const intl = useIntl();

    const bem = bemUtils('hvaLeggerNAVVektPå');

    return (
        <ReadMore header={intlUtils(intl, 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.tittel')}>
            <ul className={bem.element('tekst')}>
                {getPunktTekster(intl).map((punktTekst) => (
                    <li key={`${punktTekst}`}>{punktTekst}</li>
                ))}
            </ul>
        </ReadMore>
    );
};

export default HvaLeggerNAVVektPå;

import { IntlShape, useIntl } from 'react-intl';

import { ReadMore } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import './hvaLeggerNAVVektPå.css';

const getPunktTekster = (intl: IntlShape) => [
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt1' }),
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt2' }),
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt3' }),
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt4' }),
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt5' }),
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt6' }),
];

const HvaLeggerNAVVektPå: React.FunctionComponent = () => {
    const intl = useIntl();

    const bem = bemUtils('hvaLeggerNAVVektPå');

    return (
        <ReadMore header={intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.tittel' })}>
            <ul className={bem.element('tekst')}>
                {getPunktTekster(intl).map((punktTekst) => (
                    <li key={`${punktTekst}`}>{punktTekst}</li>
                ))}
            </ul>
        </ReadMore>
    );
};

export default HvaLeggerNAVVektPå;

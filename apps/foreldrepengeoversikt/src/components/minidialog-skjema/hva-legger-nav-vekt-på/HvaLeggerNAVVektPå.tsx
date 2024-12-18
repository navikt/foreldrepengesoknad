import { IntlShape, useIntl } from 'react-intl';

import { ReadMore } from '@navikt/ds-react';

const getPunktTekster = (intl: IntlShape) => [
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt1' }),
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt2' }),
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt3' }),
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt4' }),
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt5' }),
    intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt6' }),
];

export const HvaLeggerNAVVektPå = () => {
    const intl = useIntl();

    return (
        <ReadMore header={intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.tittel' })}>
            <ul className="text-medium">
                {getPunktTekster(intl).map((punktTekst) => (
                    <li key={`${punktTekst}`}>{punktTekst}</li>
                ))}
            </ul>
        </ReadMore>
    );
};

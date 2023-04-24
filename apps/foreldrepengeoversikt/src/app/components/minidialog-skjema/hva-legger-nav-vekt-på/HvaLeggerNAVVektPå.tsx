import { ReadMore } from '@navikt/ds-react';
import { bemUtils, intlUtils } from '@navikt/fp-common';

import { FormattedMessage, useIntl } from 'react-intl';
import './hvaLeggerNAVVektPå.css';

const punktTekster = [
    'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt1',
    'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt2',
    'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt3',
    'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt4',
    'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt5',
    'minidialog.hvaLeggerNAVVektPå.tilbakekreving.punkt6',
];

const HvaLeggerNAVVektPå: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('hvaLeggerNAVVektPå');

    return (
        <ReadMore header={intlUtils(intl, 'minidialog.hvaLeggerNAVVektPå.tilbakekreving.tittel')}>
            <ul className={bem.element('tekst')}>
                {punktTekster.map((punkt) => (
                    <li key={`${punkt}`}>
                        <FormattedMessage id={punkt} />
                    </li>
                ))}
            </ul>
        </ReadMore>
    );
};

export default HvaLeggerNAVVektPå;

import { IntlShape, useIntl } from 'react-intl';

import { Box, List, ReadMore } from '@navikt/ds-react';

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
            <Box marginBlock="space-16" asChild>
                <List data-aksel-migrated-v8>
                    {getPunktTekster(intl).map((punktTekst) => (
                        <List.Item key={`${punktTekst}`}>{punktTekst}</List.Item>
                    ))}
                </List>
            </Box>
        </ReadMore>
    );
};

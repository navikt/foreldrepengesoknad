import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';
import { getFamiliehendelsedato } from 'utils/uttakUtils';

import { BodyShort } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { CalendarLabel } from '@navikt/fp-ui';

interface Props {
    barnet: OmBarnet;
}

export const FamiliehendelseLabel = ({ barnet }: Props) => {
    const intl = useIntl();

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetUFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    const familiehendelsedato = getFamiliehendelsedato(barnet);

    return (
        <CalendarLabel color={PeriodeColor.PINK}>
            <BodyShort>
                {barnet.erFødsel && erFødt && (
                    <FormattedMessage
                        id="FamiliehendelseLabel.Fødselsdato"
                        values={{
                            mnd: familiehendelsedato,
                            dato: intl.formatDate(barnet.fødselsdato, {
                                day: '2-digit',
                                month: 'short',
                            }),
                        }}
                    />
                )}
                {barnet.erFødsel && erIkkeFødt && (
                    <FormattedMessage
                        id="FamiliehendelseLabel.Termindato"
                        values={{
                            dato: intl.formatDate(barnet.termindato, {
                                day: '2-digit',
                                month: 'short',
                            }),
                        }}
                    />
                )}
                {erAdoptert && (
                    <FormattedMessage
                        id="FamiliehendelseLabel.Omsorgsovertakelse"
                        values={{
                            dato: intl.formatDate(barnet.overtakelsesdato, {
                                day: '2-digit',
                                month: 'short',
                            }),
                        }}
                    />
                )}
            </BodyShort>
        </CalendarLabel>
    );
};

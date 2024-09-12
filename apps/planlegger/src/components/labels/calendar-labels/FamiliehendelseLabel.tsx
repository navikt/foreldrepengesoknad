import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';
import { getFamiliehendelsedato } from 'utils/uttakUtils';

import { BodyShort } from '@navikt/ds-react';

import CalendarIconLabel from './CalendarIconLabel';

interface Props {
    barnet: OmBarnet;
}

const FamiliehendelseLabel: FunctionComponent<Props> = ({ barnet }) => {
    const intl = useIntl();

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetUFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    const familiehendelsedato = getFamiliehendelsedato(barnet);

    return (
        <CalendarIconLabel iconType="pink">
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
        </CalendarIconLabel>
    );
};
export default FamiliehendelseLabel;

import { useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';
import { getFamiliehendelsedato } from 'utils/uttakUtils';

import { Chips } from '@navikt/ds-react';

interface Props {
    barnet: OmBarnet;
}

export const FamiliehendelseLabel = ({ barnet }: Props) => {
    const intl = useIntl();

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetUFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    const familiehendelsedato = getFamiliehendelsedato(barnet);

    const getLabel = () => {
        if (barnet.erFødsel && erFødt) {
            return intl.formatMessage(
                { id: 'FamiliehendelseLabel.Fødselsdato' },
                {
                    mnd: familiehendelsedato,
                    dato: intl.formatDate(barnet.fødselsdato, {
                        day: '2-digit',
                        month: 'short',
                    }),
                },
            );
        }

        if (barnet.erFødsel && erIkkeFødt) {
            return intl.formatMessage(
                { id: 'FamiliehendelseLabel.Termindato' },
                {
                    dato: intl.formatDate(barnet.termindato, {
                        day: '2-digit',
                        month: 'short',
                    }),
                },
            );
        }

        if (erAdoptert) {
            return intl.formatMessage(
                { id: 'FamiliehendelseLabel.Omsorgsovertakelse' },
                {
                    dato: intl.formatDate(barnet.overtakelsesdato, {
                        day: '2-digit',
                        month: 'short',
                    }),
                },
            );
        }

        return '';
    };

    return <Chips.Toggle>{getLabel()}</Chips.Toggle>;
};

import { FormattedMessage, useIntl } from 'react-intl';
import { FordelingDager, FordelingFargekode } from 'types/FordelingOversikt';
import { getVarighetString } from 'utils/dateUtils';
import { guid } from 'utils/guid';

import { BodyShort, VStack } from '@navikt/ds-react';

import { DelGraf } from '../../fordeling-oversikt/grafer/del-graf/DelGraf';

interface Props {
    fordelingsdager: FordelingDager[];
    dagerMedFellesperiode: number;
    erFarEllerMedmor: boolean;
}

export const FellesperiodeValgVisning = ({ fordelingsdager, dagerMedFellesperiode, erFarEllerMedmor }: Props) => {
    const intl = useIntl();
    const varighetStringFellesperiode = getVarighetString(dagerMedFellesperiode, intl);
    const fordelingErValgt =
        fordelingsdager.length > 0 && !fordelingsdager.every((f) => f.fargekode === FordelingFargekode.IKKE_TILDELT);
    return (
        <VStack gap="space-4" aria-hidden={true}>
            <BodyShort style={{ textAlign: 'center' }}>
                <FormattedMessage
                    id="fordeling.fellesperiodeVisning.sumUker"
                    values={{ varighetString: varighetStringFellesperiode }}
                />
            </BodyShort>
            <DelGraf fordelingsdager={fordelingsdager} sumDager={dagerMedFellesperiode} />
            {fordelingErValgt && (
                <div className="flex">
                    {fordelingsdager.map((fordeling) => {
                        const width = (fordeling.antallDager / dagerMedFellesperiode) * 100;
                        const varighetString = getVarighetString(fordeling.antallDager, intl);
                        const erSøkerensDel =
                            (erFarEllerMedmor && fordeling.fargekode === FordelingFargekode.SØKER_FAR) ||
                            (!erFarEllerMedmor && fordeling.fargekode === FordelingFargekode.SØKER_MOR);
                        const infoTekst = erSøkerensDel ? (
                            <FormattedMessage id="fordeling.fellesperiodeVisning.tilDeg" values={{ varighetString }} />
                        ) : (
                            <FormattedMessage
                                id="fordeling.fellesperiodeVisning.resterende"
                                values={{ varighetString }}
                            />
                        );
                        return (
                            <div
                                key={guid()}
                                style={{
                                    width: `${width}%`,
                                    textAlign: 'center',
                                }}
                            >
                                <BodyShort>{fordeling.antallDager <= 10 ? varighetString : infoTekst}</BodyShort>
                            </div>
                        );
                    })}
                </div>
            )}
        </VStack>
    );
};

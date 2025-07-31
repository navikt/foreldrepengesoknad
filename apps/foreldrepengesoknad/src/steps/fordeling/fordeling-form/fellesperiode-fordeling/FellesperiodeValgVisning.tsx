import { FormattedMessage, useIntl } from 'react-intl';
import { FordelingDager, FordelingFargekode } from 'types/FordelingOversikt';
import { getVarighetString } from 'utils/dateUtils';
import { guid } from 'utils/guid';

import { Heading, VStack } from '@navikt/ds-react';

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
        <VStack gap="1" aria-hidden={true}>
            <Heading size="xsmall">
                <FormattedMessage
                    id="fordeling.fellesperiodeVisning.sumUker"
                    values={{ varighetString: varighetStringFellesperiode }}
                />
            </Heading>
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
                                className="flex"
                                style={{
                                    width: `${width}%`,
                                }}
                            >
                                {fordeling.antallDager <= 10 ? varighetString : infoTekst}
                            </div>
                        );
                    })}
                </div>
            )}
        </VStack>
    );
};

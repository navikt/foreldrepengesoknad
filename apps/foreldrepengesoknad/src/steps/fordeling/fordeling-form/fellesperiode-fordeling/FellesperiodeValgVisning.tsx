import { FormattedMessage, useIntl } from 'react-intl';
import { FordelingDager, FordelingFargekode } from 'types/FordelingOversikt';
import { getVarighetString } from 'utils/dateUtils';
import { guid } from 'utils/guid';

import { VStack } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import DelGraf from '../../fordeling-oversikt/grafer/del-graf/DelGraf';
import './fellesperiodeValgVisning.css';

interface Props {
    fordelingsdager: FordelingDager[];
    dagerMedFellesperiode: number;
    erFarEllerMedmor: boolean;
}

const FellesperiodeValgVisning: React.FunctionComponent<Props> = ({
    fordelingsdager,
    dagerMedFellesperiode,
    erFarEllerMedmor,
}) => {
    const intl = useIntl();
    const bem = bemUtils('fellesperiodeValgVisning');
    const varighetStringFellesperiode = getVarighetString(dagerMedFellesperiode, intl);
    const fordelingErValgt =
        fordelingsdager.length > 0 && !fordelingsdager.every((f) => f.fargekode === FordelingFargekode.IKKE_TILDELT);
    return (
        <VStack gap="1" aria-hidden={true}>
            <div className={bem.element('textTop')}>
                <FormattedMessage
                    id="fordeling.fellesperiodeVisning.sumUker"
                    values={{ varighetString: varighetStringFellesperiode }}
                />
            </div>
            <DelGraf fordelingsdager={fordelingsdager} sumDager={dagerMedFellesperiode} />
            {fordelingErValgt && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
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
                                className={bem.element('textElement')}
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

export default FellesperiodeValgVisning;

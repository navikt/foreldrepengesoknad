import { getVarighetString } from '@navikt/uttaksplan/src/components/periodeliste-item-header/PeriodelisteItemHeader';
import { FormattedMessage, useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { guid } from '@navikt/fp-common';
import { bemUtils } from '@navikt/fp-utils';

import DelGraf from 'app/steps/fordeling/components/fordeling-oversikt/grafer/del-graf/DelGraf';
import { FordelingDager, FordelingFargekode } from 'app/types/FordelingOversikt';

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
        <VStack gap="1">
            {fordelingErValgt && (
                <div
                    className={bem.element('textTop')}
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
                        const infoTekstId = erSøkerensDel
                            ? 'fordeling.fellesperiodeVisning.tilDeg'
                            : 'fordeling.fellesperiodeVisning.resterende';
                        return (
                            <div
                                key={guid()}
                                className={bem.element('textElement')}
                                style={{
                                    width: `${width}%`,
                                }}
                            >
                                <FormattedMessage id={infoTekstId} values={{ varighetString }} />
                            </div>
                        );
                    })}
                </div>
            )}
            <DelGraf fordelingsdager={fordelingsdager} sumDager={dagerMedFellesperiode} />
            <div className={bem.element('textBottom')}>
                <div className={bem.element('textElement')}>
                    <FormattedMessage
                        id="fordeling.fellesperiodeVisning.sumUker"
                        values={{ varighetString: varighetStringFellesperiode }}
                    />
                </div>
            </div>
        </VStack>
    );
};

export default FellesperiodeValgVisning;

import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyLong, HStack, Heading, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { TextField } from '@navikt/fp-form-hooks';
import { getNumberFromNumberInputValue } from '@navikt/fp-formik';
import { bemUtils } from '@navikt/fp-utils';
import { isValidInteger, isValidNumberForm } from '@navikt/fp-validation';

import Fordeling, { FellesperiodeFordelingValg } from 'app/context/types/Fordeling';
import { FordelingDager, FordelingFargekode } from 'app/types/FordelingOversikt';

import { isValidAntallDagerFellesperiode, isValidAntallUkerFellesperiode } from '../fordelingFormUtils';
import FellesperiodeValgVisning from './FellesperiodeValgVisning';
import FordelingValg from './FordelingValg';
import './fellesperiode-fordeling.css';

const getAntallDagerFellesperiode = (
    antallDagerFellesperiode: number,
    valgtFordeling: FellesperiodeFordelingValg | undefined,
    antallUkerFellesperiodeTilSøker: string | undefined,
    antallDagerFellesperiodeTilSøker: string | undefined,
): number | undefined => {
    if (!valgtFordeling) {
        return undefined;
    }
    if (valgtFordeling === FellesperiodeFordelingValg.ALT) {
        return antallDagerFellesperiode;
    }
    const antallUker = getNumberFromNumberInputValue(antallUkerFellesperiodeTilSøker) || 0;
    const antallDager = getNumberFromNumberInputValue(antallDagerFellesperiodeTilSøker) || 0;
    const antallUkerInputErHeltall = antallUker ? antallUker % 1 === 0 : true;
    const antallDagerInputErHeltall = antallDager ? antallDager % 1 === 0 : true;
    const totallAntallDager = antallUker * 5 + antallDager;
    if (
        valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE &&
        antallUkerInputErHeltall &&
        antallDagerInputErHeltall &&
        totallAntallDager >= 0 &&
        totallAntallDager <= antallDagerFellesperiode
    ) {
        return totallAntallDager;
    }
    return undefined;
};

export const getFordelingDager = (
    erFarEllerMedmor: boolean,
    antallDagerFellesperiode: number,
    valgtFordeling: FellesperiodeFordelingValg | undefined,
    antallUkerFellesperiodeTilSøker: string | undefined,
    antallDagerFellesperiodeTilSøker: string | undefined,
): FordelingDager[] | undefined => {
    const dagerTilSøker = getAntallDagerFellesperiode(
        antallDagerFellesperiode,
        valgtFordeling,
        antallUkerFellesperiodeTilSøker,
        antallDagerFellesperiodeTilSøker,
    );
    if (
        !valgtFordeling ||
        (valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE && (!dagerTilSøker || dagerTilSøker === 0))
    ) {
        return [
            {
                antallDager: antallDagerFellesperiode,
                fargekode: FordelingFargekode.IKKE_TILDELT,
            },
        ];
    }
    const fargekodeSøker = erFarEllerMedmor ? FordelingFargekode.SØKER_FAR : FordelingFargekode.SØKER_MOR;
    const fordeling = [];

    if (dagerTilSøker && dagerTilSøker > 0) {
        fordeling.push({
            antallDager: dagerTilSøker,
            fargekode: fargekodeSøker,
        });
    }
    const dagerIgjen = dagerTilSøker ? antallDagerFellesperiode - dagerTilSøker : undefined;
    if (dagerIgjen && dagerIgjen > 0) {
        fordeling.push({
            antallDager: dagerIgjen,
            fargekode: FordelingFargekode.IKKE_TILDELT,
        });
    }
    return fordeling.length > 0 ? fordeling : undefined;
};

interface Props {
    navnPåForeldre: NavnPåForeldre;
    dagerMedFellesperiode: number;
    erFarEllerMedmor: boolean;
}
const FellesperiodeFordeling: React.FunctionComponent<Props> = ({
    navnPåForeldre,
    dagerMedFellesperiode,
    erFarEllerMedmor,
}) => {
    const intl = useIntl();
    const bem = bemUtils('fellesperiodeFordeling');
    const {
        watch,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<Fordeling>();
    const valgtFordeling = watch('fordelingValg');
    const antallUkerFellesperiodeTilSøker = watch('antallUkerFellesperiodeTilSøker');
    const antallDagerFellesperiodeTilSøker = watch('antallDagerFellesperiodeTilSøker');
    const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const fordelingsdager = getFordelingDager(
        erFarEllerMedmor,
        dagerMedFellesperiode,
        valgtFordeling,
        antallUkerFellesperiodeTilSøker,
        antallDagerFellesperiodeTilSøker,
    );
    const harHeleUkerTilFordeling = dagerMedFellesperiode % 5 === 0;
    return (
        <VStack gap="5">
            <FordelingValg dagerMedFellesperiode={dagerMedFellesperiode} />
            {valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE && (
                <div className={bem.block}>
                    <Heading size="small">
                        <FormattedMessage
                            id="fordeling.antallUkerDager.spørsmål"
                            values={{ harHeleUkerTilFordeling }}
                        />
                    </Heading>
                    <BodyLong className={bem.element('description')}>
                        <FormattedMessage
                            id="fordeling.antallUkerDager.spørsmål.description"
                            values={{ harHeleUkerTilFordeling, navnAnnenForelder }}
                        />
                    </BodyLong>
                    <HStack gap="5" align="start">
                        <TextField
                            className={bem.element('textInput')}
                            name="antallUkerFellesperiodeTilSøker"
                            label={<FormattedMessage id="fordeling.antallUker.spørsmål" />}
                            validate={[
                                isValidNumberForm(intl.formatMessage({ id: 'fordeling.antallUker.ugyldigFormat' })),
                                isValidInteger(intl.formatMessage({ id: 'fordeling.antallUker.ugyldigFormat' })),
                                isValidAntallUkerFellesperiode(
                                    intl,
                                    dagerMedFellesperiode,
                                    antallDagerFellesperiodeTilSøker,
                                ),
                            ]}
                            onChange={() => isSubmitted && trigger()}
                        />
                        {!harHeleUkerTilFordeling && (
                            <TextField
                                className={bem.element('textInput')}
                                name="antallDagerFellesperiodeTilSøker"
                                label={<FormattedMessage id="fordeling.antallDager.spørsmål" />}
                                validate={[
                                    isValidNumberForm(
                                        intl.formatMessage({ id: 'fordeling.antallDager.ugyldigFormat' }),
                                    ),
                                    isValidInteger(intl.formatMessage({ id: 'fordeling.antallDager.ugyldigFormat' })),
                                    isValidAntallDagerFellesperiode(
                                        intl,
                                        dagerMedFellesperiode,
                                        antallUkerFellesperiodeTilSøker,
                                    ),
                                ]}
                                onChange={() => isSubmitted && trigger()}
                            />
                        )}
                    </HStack>
                </div>
            )}
            {valgtFordeling === FellesperiodeFordelingValg.HOPP_OVER_FORDELING && (
                <Alert variant="info">
                    <FormattedMessage id="fordeling.fordelingsvalg.senere.info" />
                </Alert>
            )}
            {fordelingsdager && (
                <FellesperiodeValgVisning
                    fordelingsdager={fordelingsdager}
                    dagerMedFellesperiode={dagerMedFellesperiode}
                    erFarEllerMedmor={erFarEllerMedmor}
                />
            )}
        </VStack>
    );
};

export default FellesperiodeFordeling;

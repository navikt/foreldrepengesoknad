import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyLong, BodyShort, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { TextField } from '@navikt/fp-form-hooks';
import { bemUtils, getNumberFromNumberInputValue } from '@navikt/fp-utils';
import { isValidInteger, isValidNumberForm } from '@navikt/fp-validation';

import Fordeling, { FellesperiodeFordelingValg } from 'app/context/types/Fordeling';
import { FordelingDager, FordelingFargekode } from 'app/types/FordelingOversikt';

import { isValidAntallDagerFellesperiode, isValidAntallUkerFellesperiode } from '../fordelingFormUtils';
import FellesperiodeValgVisning from './FellesperiodeValgVisning';
import FordelingValg from './FordelingValg';
import './fellesperiode-fordeling.css';

const getInputErNullEllerHeltall = (input: number) => {
    if (input) {
        return input >= 0 && input % 1 === 0;
    }
    return true;
};

const getInputForAntallDagerFellesperiode = (
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
    const antallUkerInputErGyldigTall = getInputErNullEllerHeltall(antallUker);
    const antallDagerInputErGyldigTall = getInputErNullEllerHeltall(antallDager);
    const totallAntallDager = antallUker * 5 + antallDager;

    const kanViseValgtAntallDager =
        valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE &&
        antallUkerInputErGyldigTall &&
        antallDagerInputErGyldigTall &&
        totallAntallDager >= 0 &&
        totallAntallDager <= antallDagerFellesperiode;

    return kanViseValgtAntallDager ? totallAntallDager : undefined;
};

export const getFordelingDagerForVisning = (
    erFarEllerMedmor: boolean,
    antallDagerFellesperiode: number,
    valgtFordeling: FellesperiodeFordelingValg | undefined,
    antallUkerFellesperiodeTilSøker: string | undefined,
    antallDagerFellesperiodeTilSøker: string | undefined,
): FordelingDager[] | undefined => {
    const dagerTilSøker = getInputForAntallDagerFellesperiode(
        antallDagerFellesperiode,
        valgtFordeling,
        antallUkerFellesperiodeTilSøker,
        antallDagerFellesperiodeTilSøker,
    );
    const harIkkeValgtFordeling =
        !valgtFordeling ||
        (valgtFordeling === FellesperiodeFordelingValg.VIL_VELGE && (!dagerTilSøker || dagerTilSøker === 0));

    if (harIkkeValgtFordeling) {
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
    const fordelingsdagerForVisning = getFordelingDagerForVisning(
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
                    <BodyShort className={bem.element('title')}>
                        <FormattedMessage
                            id="fordeling.antallUkerDager.spørsmål"
                            values={{ harHeleUkerTilFordeling }}
                        />
                    </BodyShort>
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
            {fordelingsdagerForVisning && (
                <FellesperiodeValgVisning
                    fordelingsdager={fordelingsdagerForVisning}
                    dagerMedFellesperiode={dagerMedFellesperiode}
                    erFarEllerMedmor={erFarEllerMedmor}
                />
            )}
        </VStack>
    );
};

export default FellesperiodeFordeling;

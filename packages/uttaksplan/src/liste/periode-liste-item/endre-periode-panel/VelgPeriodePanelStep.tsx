import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, HStack, Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { formatDate } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { genererPeriodeKey, getStønadskvoteNavn } from '../../../liste/utils/uttaksplanListeUtils';
import { Uttaksplanperiode, erPeriodeDto } from '../../../types/UttaksplanPeriode';
import {
    erAvslåttPeriode,
    harPeriodeDerMorsAktivitetIkkeErValgt,
    harPeriodeMedUkjentGraderingsaktivitet,
} from '../../../utils/periodeUtils';

interface Props {
    perioder: Uttaksplanperiode[];
    setValgtPeriodeIndex: (valgtPeriodeIndex: number | undefined) => void;
    closePanel: () => void;
}

interface FormValues {
    periodeIndex: number | undefined;
}

export const VelgPeriodePanelStep = ({ perioder, setValgtPeriodeIndex, closePanel }: Props) => {
    const intl = useIntl();

    const {
        foreldreInfo: { søker, navnPåForeldre, rettighetType, erIkkeSøkerSpesifisert, erFarOgFar },
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();

    const formMethods = useForm<FormValues>();

    const onSubmit = (values: FormValues) => {
        setValgtPeriodeIndex(values.periodeIndex);
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-16">
                <Heading size="medium">
                    <FormattedMessage id="uttaksplan.hvilkeperiode" />
                </Heading>
                <RhfRadioGroup
                    name="periodeIndex"
                    control={formMethods.control}
                    validate={[
                        (value) => {
                            return value === undefined
                                ? intl.formatMessage({ id: 'VelgPeriodePanelStep.VelgPeriode' })
                                : null;
                        },
                    ]}
                >
                    {perioder.map((p, index) => {
                        const side = erPeriodeDto(p) ? (p.søker ?? p.annenPart) : undefined;
                        const morsAktivitet = side?.morsAktivitet;
                        const eøsSide = erPeriodeDto(p) ? p.annenPartEøs : undefined;
                        return (
                            <Radio key={genererPeriodeKey(p)} value={index} autoFocus={index === 0}>
                                <HStack gap="space-4">
                                    {harPeriodeDerMorsAktivitetIkkeErValgt(
                                        rettighetType,
                                        søker,
                                        erIkkeSøkerSpesifisert ?? false,
                                        [p],
                                        erFarOgFar,
                                    ) && (
                                        <ExclamationmarkTriangleFillIcon
                                            title={intl.formatMessage({
                                                id: 'PeriodeListeHeader.MorsAktivitetIkkeValgt',
                                            })}
                                            fontSize="1.5rem"
                                            className="text-ax-danger-800"
                                        />
                                    )}
                                    {kanVelgeArbeidsgiver && harPeriodeMedUkjentGraderingsaktivitet([p], søker) && (
                                        <ExclamationmarkTriangleFillIcon
                                            title={intl.formatMessage({
                                                id: 'PeriodeListeHeader.GraderingsaktivitetIkkeValgt',
                                            })}
                                            fontSize="1.5rem"
                                            className="text-ax-danger-800"
                                        />
                                    )}
                                    {`${formatDate(p.fom)} - ${formatDate(p.tom)} - ` +
                                        `${getStønadskvoteNavn(intl, {
                                            navnPåForeldre,
                                            erFarEllerMedmor: søker === 'FAR_MEDMOR',
                                            erEøsPeriode: !!eøsSide && !side,
                                            morsAktivitet,
                                            konto: side?.kontoType ?? eøsSide?.kontoType,
                                            erAleneOmOmsorg: rettighetType === 'ALENEOMSORG',
                                            erAvslått: erAvslåttPeriode(p),
                                        })}`}
                                </HStack>
                            </Radio>
                        );
                    })}
                </RhfRadioGroup>
                <HStack justify="space-between">
                    <Button type="button" variant="secondary" onClick={closePanel}>
                        <FormattedMessage id="uttaksplan.avbryt" />
                    </Button>
                    <Button>
                        <FormattedMessage id="uttaksplan.gåVidere" />
                    </Button>
                </HStack>
            </VStack>
        </RhfForm>
    );
};

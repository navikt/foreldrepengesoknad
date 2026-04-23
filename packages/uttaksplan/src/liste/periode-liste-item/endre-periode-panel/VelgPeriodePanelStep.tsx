import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, HStack, Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { genererPeriodeKey, getStønadskontoNavn } from '../../../liste/utils/uttaksplanListeUtils';
import { Uttaksplanperiode, erEøsUttakPeriode, erVanligUttakPeriode } from '../../../types/UttaksplanPeriode';
import { harPeriodeDerMorsAktivitetIkkeErValgt } from '../../../utils/periodeUtils';

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
        foreldreInfo: { søker, navnPåForeldre, rettighetType },
        uttakPerioder,
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
                                : undefined;
                        },
                    ]}
                >
                    {perioder.map((p, index) => {
                        const morsAktivitet = erVanligUttakPeriode(p) && p.morsAktivitet ? p.morsAktivitet : undefined;
                        return (
                            <Radio key={genererPeriodeKey(p)} value={index} autoFocus={index === 0}>
                                <HStack gap="space-4">
                                    {harPeriodeDerMorsAktivitetIkkeErValgt(rettighetType, [
                                        p,
                                        ...uttakPerioder.filter(
                                            (mp): mp is UttakPeriode_fpoversikt =>
                                                !erEøsUttakPeriode(mp) && mp.forelder === 'MOR',
                                        ),
                                    ]) && (
                                        <ExclamationmarkTriangleFillIcon
                                            title={intl.formatMessage({
                                                id: 'PeriodeListeHeader.MorsAktivitetIkkeValgt',
                                            })}
                                            fontSize="1.5rem"
                                            className="text-ax-danger-800"
                                        />
                                    )}
                                    {`${formatDate(p.fom)} - ${formatDate(p.tom)} - ` +
                                        `${getStønadskontoNavn(
                                            intl,
                                            navnPåForeldre,
                                            søker === 'FAR_MEDMOR',
                                            erEøsUttakPeriode(p),
                                            morsAktivitet,
                                            erVanligUttakPeriode(p) ? p.kontoType : undefined,
                                        )}`}
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

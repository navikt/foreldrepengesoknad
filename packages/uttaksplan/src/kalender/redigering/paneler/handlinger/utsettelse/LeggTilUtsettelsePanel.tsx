import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, HStack, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import { UttakPeriodeDto } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../../../context/UttaksplanDataContext';
import { FormValues, LeggTilUtsettelseForm } from '../../../../../felles/utsettelse/LeggTilUtsettelseForm';
import { BekreftHistoriskEndringModal } from '../../../BekreftHistoriskEndringModal';
import { useKalenderRedigeringContext } from '../../../context/KalenderRedigeringContext';
import { erHistoriskKalenderEndring } from '../../../utils/historiskEndring';

interface Props {
    setVisUtsettelsePanel: (skalVisePanel: boolean) => void;
}

export const LeggTilUtsettelsePanel = ({ setVisUtsettelsePanel }: Props) => {
    const {
        perioder,
        erEndringssøknad,
        kanVelgeArbeidsgiver,
        erPeriodeneTilAnnenPartLåst,
        foreldreInfo: { søker },
    } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, setValgtePerioder, leggTilUttaksplanPerioder, setEndredePerioder } =
        useKalenderRedigeringContext();

    const [visBekreftModal, setVisBekreftModal] = useState(false);

    const formMethods = useForm<FormValues>({
        defaultValues: undefined,
    });

    const lagUtsettelsePerioder = (formValues: FormValues) =>
        sammenslåtteValgtePerioder.map(
            (p) =>
                ({
                    fom: p.fom,
                    tom: p.tom,
                    søker: {
                        forelder: søker,
                        utsettelseÅrsak: formValues.utsettelseÅrsak,
                        flerbarnsdager: false,
                    },
                }) satisfies UttakPeriodeDto,
        );

    const utførLeggTilUtsettelse = (formValues: FormValues) => {
        leggTilUttaksplanPerioder(lagUtsettelsePerioder(formValues), false);
        setValgtePerioder([]);
        setEndredePerioder(sammenslåtteValgtePerioder);
    };

    const onSubmit = (formValues: FormValues) => {
        if (
            erHistoriskKalenderEndring({
                erEndringssøknad,
                eksisterendePerioder: perioder,
                nyePerioder: lagUtsettelsePerioder(formValues),
                skalForskyvePeriode: false,
                søker,
                kanVelgeArbeidsgiver,
                erPeriodeneTilAnnenPartLåst,
            })
        ) {
            setVisBekreftModal(true);
            return;
        }

        utførLeggTilUtsettelse(formValues);
    };

    return (
        <>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="space-16">
                    <LeggTilUtsettelseForm visTittel />
                    <HStack gap="space-12" className="w-full">
                        <Button
                            variant="primary"
                            size="small"
                            className="flex-1"
                            disabled={!formMethods.formState.isDirty}
                        >
                            <FormattedMessage id="LeggTilUtsettelsePanel.LeggTil" />
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="small"
                            className="flex-1"
                            onClick={() => setVisUtsettelsePanel(false)}
                        >
                            <FormattedMessage id="LeggTilUtsettelsePanel.Lukk" />
                        </Button>
                    </HStack>
                </VStack>
            </RhfForm>
            <BekreftHistoriskEndringModal
                open={visBekreftModal}
                handlingstype="endret"
                onAvbryt={() => setVisBekreftModal(false)}
                onBekreft={() => {
                    utførLeggTilUtsettelse(formMethods.getValues());
                    setVisBekreftModal(false);
                }}
            />
        </>
    );
};

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button, HStack, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import { UttakPeriodeDto } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../../../context/UttaksplanDataContext';
import { FormValues, LeggTilPauseForm } from '../../../../../felles/utsettelse/LeggTilPauseForm';
import { BekreftHistoriskEndringModal } from '../../../BekreftHistoriskEndringModal';
import { useKalenderRedigeringContext } from '../../../context/KalenderRedigeringContext';
import { erHistoriskKalenderEndring } from '../../../utils/historiskEndring';

interface Props {
    setVisPausePanel: (skalVisePanel: boolean) => void;
}

export const LeggTilPausePanel = ({ setVisPausePanel }: Props) => {
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

    const lagPausePerioder = (formValues: FormValues) =>
        sammenslåtteValgtePerioder.map(
            (p) =>
                ({
                    fom: p.fom,
                    tom: p.tom,
                    søker: {
                        forelder: søker,
                        utsettelseÅrsak: 'FRI',
                        flerbarnsdager: false,
                        morsAktivitet: formValues.morsAktivitet || undefined,
                    },
                }) satisfies UttakPeriodeDto,
        );

    const utførLeggTilPause = (formValues: FormValues) => {
        leggTilUttaksplanPerioder(lagPausePerioder(formValues), false);
        setValgtePerioder([]);
        setEndredePerioder(sammenslåtteValgtePerioder);
    };

    const onSubmit = (formValues: FormValues) => {
        if (
            erHistoriskKalenderEndring({
                erEndringssøknad,
                eksisterendePerioder: perioder,
                nyePerioder: lagPausePerioder(formValues),
                skalForskyvePeriode: false,
                søker,
                kanVelgeArbeidsgiver,
                erPeriodeneTilAnnenPartLåst,
            })
        ) {
            setVisBekreftModal(true);
            return;
        }

        utførLeggTilPause(formValues);
    };

    return (
        <>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="space-16">
                    <LeggTilPauseForm visTittel />
                    <HStack gap="space-12" className="w-full">
                        <Button
                            variant="primary"
                            size="small"
                            className="flex-1"
                            disabled={!formMethods.formState.isDirty}
                        >
                            <FormattedMessage id="LeggTilPausePanel.LeggTil" />
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="small"
                            className="flex-1"
                            onClick={() => setVisPausePanel(false)}
                        >
                            <FormattedMessage id="LeggTilPausePanel.Lukk" />
                        </Button>
                    </HStack>
                </VStack>
            </RhfForm>
            <BekreftHistoriskEndringModal
                open={visBekreftModal}
                handlingstype="endret"
                onAvbryt={() => setVisBekreftModal(false)}
                onBekreft={() => {
                    utførLeggTilPause(formMethods.getValues());
                    setVisBekreftModal(false);
                }}
            />
        </>
    );
};

import { TrashIcon } from '@navikt/aksel-icons';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Checkbox, HStack, Heading, VStack } from '@navikt/ds-react';

import { RhfCheckboxGroup, RhfForm } from '@navikt/fp-form-hooks';
import { NavnPåForeldre } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../../context/UttaksplanRedigeringContext';
import { Uttaksplanperiode, erVanligUttakPeriode } from '../../../../types/UttaksplanPeriode';
import { UttakPeriodeBuilder } from '../../../../utils/UttakPeriodeBuilder';
import { genererPeriodeKey, getStønadskontoNavn } from '../../../utils/uttaksplanListeUtils';

const ARIA_LABEL_ID = 'slett-periode-panel-heading';

interface Props {
    closePanel: () => void;
    uttaksplanperioder: Uttaksplanperiode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

interface FormValues {
    periodeIndexer: number[];
}

export const SlettPeriodePanel = ({ closePanel, uttaksplanperioder, navnPåForeldre, erFarEllerMedmor }: Props) => {
    const intl = useIntl();

    const { uttakPerioder } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    useEffect(() => {
        // Slett på direkten når det kun er en periode
        if (uttaksplanperioder.length === 1) {
            const nyeUttakPerioder = new UttakPeriodeBuilder(uttakPerioder)
                .fjernUttakPerioder(uttaksplanperioder)
                .getUttakPerioder();
            uttaksplanRedigering?.oppdaterUttaksplan?.(nyeUttakPerioder);

            closePanel();
        }
    }, []);

    const formMethods = useForm<FormValues>();

    if (uttaksplanperioder.length === 1) {
        return null;
    }

    const onSubmit = (values: FormValues) => {
        const slettedePerioder: Uttaksplanperiode[] = [];

        values.periodeIndexer?.map((periodeIndex) => {
            const periode = uttaksplanperioder.at(periodeIndex);

            if (periode) {
                slettedePerioder.push(periode);
            }
        });

        const nyeUttakPerioder = new UttakPeriodeBuilder(uttakPerioder)
            .fjernUttakPerioder(slettedePerioder)
            .getUttakPerioder();
        uttaksplanRedigering?.oppdaterUttaksplan?.(nyeUttakPerioder);

        closePanel();
    };

    return (
        <div aria-labelledby={ARIA_LABEL_ID} data-panel="slett-periode">
            <div className="mb-4">
                <HStack gap="space-8" align="center">
                    <TrashIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ARIA_LABEL_ID}>
                        <FormattedMessage id="uttaksplan.slettPeriode.tittel" />
                    </Heading>
                </HStack>
            </div>
            <div>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                    <VStack gap="space-16">
                        <Heading size="medium">
                            <FormattedMessage id="uttaksplan.slettPeriode.hvilkePerioder" />
                        </Heading>
                        <RhfCheckboxGroup
                            name="periodeIndexer"
                            control={formMethods.control}
                            // @ts-expect-error Funkar dette?
                            validate={[isRequired(intl.formatMessage({ id: 'uttaksplan.velgperiode' }))]}
                            label={intl.formatMessage({ id: 'uttaksplan.perioder' })}
                        >
                            {uttaksplanperioder.map((p, index) => {
                                const morsAktivitet =
                                    erVanligUttakPeriode(p) && p.morsAktivitet ? p.morsAktivitet : undefined;

                                return (
                                    <Checkbox key={genererPeriodeKey(p)} value={index} autoFocus={index === 0}>
                                        {`${formatDate(p.fom)} - ${formatDate(p.tom)} -
                                        ${getStønadskontoNavn(
                                            intl,
                                            navnPåForeldre,
                                            erFarEllerMedmor,
                                            morsAktivitet,
                                            erVanligUttakPeriode(p) ? p.kontoType : undefined,
                                        )}`}
                                    </Checkbox>
                                );
                            })}
                        </RhfCheckboxGroup>
                        <HStack justify="space-between">
                            <Button type="button" variant="secondary" onClick={closePanel}>
                                <FormattedMessage id="uttaksplan.avbryt" />
                            </Button>
                            <Button>
                                <FormattedMessage id="uttaksplan.slettValgte" />
                            </Button>
                        </HStack>
                    </VStack>
                </RhfForm>
            </div>
        </div>
    );
};

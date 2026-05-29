import { TrashIcon } from '@navikt/aksel-icons';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Checkbox, HStack, Heading, VStack } from '@navikt/ds-react';

import { RhfCheckboxGroup, RhfForm } from '@navikt/fp-form-hooks';
import { NavnPåForeldre } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../../context/UttaksplanRedigeringContext';
import { Uttaksplanperiode, erEøsUttakPeriode, erVanligUttakPeriode } from '../../../../types/UttaksplanPeriode';
import { UttakPeriodeBuilder } from '../../../../utils/UttakPeriodeBuilder';
import { genererPeriodeKey, getStønadskvoteNavn } from '../../../utils/uttaksplanListeUtils';

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

    const formMethods = useForm<FormValues>();

    const onSubmit = (values: FormValues) => {
        const slettedePerioder: Uttaksplanperiode[] = [];

        for (const periodeIndex of values.periodeIndexer || []) {
            const periode = uttaksplanperioder.at(periodeIndex);

            if (periode) {
                slettedePerioder.push(periode);
            }
        }

        slettPerioder(slettedePerioder);
    };

    const slettPerioder = (perioderSomSkalSlettes: Uttaksplanperiode[]) => {
        const nyeUttakPerioder = new UttakPeriodeBuilder(uttakPerioder, 'liste')
            .fjernUttakPerioder(perioderSomSkalSlettes, false)
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
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="space-16">
                        <Heading size="medium">
                            <FormattedMessage id="uttaksplan.slettPeriode.hvilkePerioder" />
                        </Heading>
                        <RhfCheckboxGroup
                            name="periodeIndexer"
                            control={formMethods.control}
                            validate={[isRequired(intl.formatMessage({ id: 'uttaksplan.velgperiode' }))]}
                            label={intl.formatMessage({ id: 'uttaksplan.perioder' })}
                        >
                            {uttaksplanperioder.map((p, index) => {
                                const morsAktivitet =
                                    erVanligUttakPeriode(p) && p.morsAktivitet ? p.morsAktivitet : undefined;

                                return (
                                    <Checkbox key={genererPeriodeKey(p)} value={index} autoFocus={index === 0}>
                                        {`${formatDate(p.fom)} - ${formatDate(p.tom)} -
                                    ${getStønadskvoteNavn(intl, {
                                        navnPåForeldre,
                                        erFarEllerMedmor,
                                        erEøsPeriode: erEøsUttakPeriode(p),
                                        morsAktivitet,
                                        konto: erVanligUttakPeriode(p) ? p.kontoType : undefined,
                                    })}`}
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

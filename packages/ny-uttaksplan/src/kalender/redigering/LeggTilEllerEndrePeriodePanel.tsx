import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { ErrorMessage, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import type { BrukerRolleSak_fpoversikt, KontoBeregningDto, KontoType, KontoTypeUttak } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { getFloatFromString } from '@navikt/fp-utils';

import { PanelButtons } from '../../components/panel-buttons/PanelButtons';
import { GraderingSpørsmål } from '../../components/spørsmål/GraderingSpørsmål';
import { KontotypeSpørsmål } from '../../components/spørsmål/KontotypeSpørsmål';
import { SamtidigUttakSpørsmål } from '../../components/spørsmål/SamtidigUttakSpørsmål';
import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Planperiode } from '../../types/Planperiode';
import { getGradering } from '../../utils/graderingUtils';
import { RedigeringPanel } from './RedigeringPanel';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { usePeriodeValidator } from './utils/usePeriodeValidator';

type FormValues = {
    kontoType?: KontoType;
    forelder?: BrukerRolleSak_fpoversikt;
    skalDuJobbe?: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
};

export const LeggTilEllerEndrePeriodePanel = () => {
    const intl = useIntl();

    const [feilmeldinger, setFeilmeldinger] = useState<string[]>([]);

    const { uttaksplan, aleneOmOmsorg } = useUttaksplanData();

    const {
        erMinimert,
        erKunEnHelEksisterendePeriodeValgt,
        sammenslåtteValgtePerioder,
        setErIRedigeringsmodus,
        oppdaterUttaksplan,
        setValgtePerioder,
    } = useKalenderRedigeringContext();

    const { finnKontotypeGyldigFeilmeldinger, finnPerioderGyldigeFeilmeldinger } =
        usePeriodeValidator(sammenslåtteValgtePerioder);

    const lukkRedigeringsmodus = () => setErIRedigeringsmodus(false);

    const formMethods = useForm<FormValues>({
        defaultValues: erKunEnHelEksisterendePeriodeValgt
            ? lagDefaultValues(uttaksplan, sammenslåtteValgtePerioder[0])
            : undefined,
    });

    const onSubmit = (values: FormValues) => {
        const valideringsfeil = finnKontotypeGyldigFeilmeldinger(values.kontoType, values.samtidigUttak).concat(
            finnPerioderGyldigeFeilmeldinger(
                values.kontoType,
                values.samtidigUttak,
                values.skalDuJobbe,
                values.forelder,
            ),
        );

        setFeilmeldinger(valideringsfeil);
        if (valideringsfeil.length > 0) {
            return;
        }

        oppdaterUttaksplan(
            sammenslåtteValgtePerioder.map((periode) => ({
                fom: periode.fom,
                tom: periode.tom,
                readOnly: false,
                id: `${periode.fom} - ${periode.tom} - ${values.kontoType}`,
                kontoType: values.kontoType,
                forelder: getForelderFraKontoType(values.kontoType, values.forelder),
                gradering: values.skalDuJobbe
                    ? getGradering(values.skalDuJobbe, values.stillingsprosent, values.kontoType)
                    : undefined,
                samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
            })),
        );
        setValgtePerioder([]);

        lukkRedigeringsmodus();
    };

    const gyldigeKontotyper = useGyldigeKontotyper(sammenslåtteValgtePerioder);

    return (
        <RedigeringPanel kanLeggeTilFerie={false}>
            <div className={erMinimert ? 'hidden' : 'block'}>
                <div className="px-4 pb-4 pt-4">
                    <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                        <VStack gap="space-16">
                            {feilmeldinger.length > 0 && <ErrorMessage>{feilmeldinger.join(', ')}</ErrorMessage>}
                            <KontotypeSpørsmål gyldigeKontotyper={gyldigeKontotyper} skalViseTittel={false} />
                            {!aleneOmOmsorg && <SamtidigUttakSpørsmål />}
                            <GraderingSpørsmål />
                            <PanelButtons
                                onCancel={lukkRedigeringsmodus}
                                isFinalStep={true}
                                addButtonText={intl.formatMessage({ id: 'LeggTilPeriodePanel.LeggTil' })}
                            />
                        </VStack>
                    </RhfForm>
                </div>
            </div>
        </RedigeringPanel>
    );
};

const getForelderFraKontoType = (
    kontotype: KontoTypeUttak | undefined,
    foreldre: BrukerRolleSak_fpoversikt | undefined,
): BrukerRolleSak_fpoversikt | undefined => {
    switch (kontotype) {
        case 'FEDREKVOTE':
            return 'FAR_MEDMOR';
        case 'MØDREKVOTE':
        case 'FORELDREPENGER_FØR_FØDSEL':
            return 'MOR';
        default:
            return foreldre;
    }
};

const useGyldigeKontotyper = (valgtePerioder: CalendarPeriod[]) => {
    const { valgtStønadskonto } = useUttaksplanData();

    const { erKontotypeGyldigForPerioder } = usePeriodeValidator(valgtePerioder);

    return valgtStønadskonto.kontoer.map((k) => k.konto).filter((kt) => erKontotypeGyldigForPerioder(kt));
};

const lagDefaultValues = (uttaksplan: Planperiode[], valgtPeriode: CalendarPeriod): FormValues | undefined => {
    const eksisterendePeriode = uttaksplan.find(
        (periode) =>
            dayjs(periode.fom).isSame(dayjs(valgtPeriode.fom), 'day') &&
            dayjs(periode.tom).isSame(dayjs(valgtPeriode.tom), 'day'),
    );

    if (!eksisterendePeriode) {
        return undefined;
    }

    return {
        kontoType: eksisterendePeriode.kontoType,
        forelder: eksisterendePeriode.forelder,
        skalDuJobbe: !!eksisterendePeriode.gradering,
        stillingsprosent: eksisterendePeriode.gradering?.arbeidstidprosent.toString(),
        samtidigUttak: !!eksisterendePeriode.samtidigUttak,
        samtidigUttaksprosent: eksisterendePeriode.samtidigUttak?.toString(),
    };
};

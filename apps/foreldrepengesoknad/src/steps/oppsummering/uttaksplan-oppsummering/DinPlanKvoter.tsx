import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { IntlShape, useIntl } from 'react-intl';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';

import { BodyShort, VStack } from '@navikt/ds-react';

import { KontoDto } from '@navikt/fp-types';
import { getFamiliehendelsedato, getFamiliesituasjon } from '@navikt/fp-utils';
import { DinPlanKvoteRad, finnDinPlanKvoteRader } from '@navikt/fp-uttaksplan/din-plan-oppsummering';
import { notEmpty } from '@navikt/fp-validation';

interface Props {
    kontoer: KontoDto[];
}

const formaterRad = (intl: IntlShape, rad: DinPlanKvoteRad): string => {
    const values = { brukt: rad.bruktUker, tilgjengelig: rad.tilgjengeligUker };

    switch (rad.kontoType) {
        case 'FORELDREPENGER_FØR_FØDSEL':
            return intl.formatMessage({ id: 'oppsummering.uttak.dinPlan.rad.førFødsel' }, values);
        case 'MØDREKVOTE':
            return intl.formatMessage({ id: 'oppsummering.uttak.dinPlan.rad.mødrekvote' }, values);
        case 'FEDREKVOTE':
            return intl.formatMessage({ id: 'oppsummering.uttak.dinPlan.rad.fedrekvote' }, values);
        case 'FELLESPERIODE':
            return intl.formatMessage({ id: 'oppsummering.uttak.dinPlan.rad.fellesperiode' }, values);
        case 'AKTIVITETSFRI_KVOTE':
            return intl.formatMessage({ id: 'oppsummering.uttak.dinPlan.rad.aktivitetsfriKvote' }, values);
        case 'FORELDREPENGER':
            return intl.formatMessage({ id: 'oppsummering.uttak.dinPlan.rad.foreldrepengerMedAktivitetskrav' }, values);
    }
};

// Viser kor mange veker søkjaren har planlagt å bruke av kvar stønadskonto,
// samanlikna med kor mange veker som er tilgjengelege totalt («3 av 3 veker
// før fødsel», «20 av 20 veker av din kvote (mødrekvoten)» osv.).
export const DinPlanKvoter = ({ kontoer }: Props) => {
    const intl = useIntl();

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));

    const søkerRolle = isFarEllerMedmor(søkersituasjon.rolle) ? 'FAR_MEDMOR' : 'MOR';

    const rader = finnDinPlanKvoteRader(
        uttaksplan,
        søkerRolle,
        kontoer,
        getFamiliesituasjon(barn),
        getFamiliehendelsedato(barn),
    );

    if (rader.length === 0) {
        return null;
    }

    return (
        <VStack gap="space-4">
            {rader.map((rad) => (
                <BodyShort key={rad.kontoType}>{formaterRad(intl, rad)}</BodyShort>
            ))}
        </VStack>
    );
};


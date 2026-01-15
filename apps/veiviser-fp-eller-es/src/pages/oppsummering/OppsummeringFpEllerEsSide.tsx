import { useIntl } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { VStack } from '@navikt/ds-react';

import { Satser } from '@navikt/fp-types';
import { VeiviserPage } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils';
import { formatValue } from '@navikt/fp-validation/src/form/numberFormValidation';

import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import { HarIkkeRett } from './HarIkkeRett';
import { HarRett } from './HarRett';
import { HarRettEs } from './HarRettEs';
import { HarRettFpEllerEs } from './HarRettFpEllerEs';
import { HvorMyeOgHvaSkjerNåLinkPanel } from './HvorMyeOgHvaSkjerNåLinkPanel';

const finnHvemSomHarRett = (fpEllerEsSituasjon: FpEllerEsSituasjon, satser: Satser) => {
    const grunnbeløpet = finnSisteGrunnbeløp(satser);
    const minstelønn = grunnbeløpet / 2;

    const { situasjon, lønnPerMåned, borDuINorge, jobberDuINorge } = fpEllerEsSituasjon;
    const lønnPerMånedNummer = formatValue(lønnPerMåned);
    const erLønnOverEllerLik200000 = lønnPerMånedNummer !== undefined && lønnPerMånedNummer * 12 >= 200000;
    const erLønnOverEllerLikMinstelønn = lønnPerMånedNummer !== undefined && lønnPerMånedNummer * 12 >= minstelønn;
    if (
        situasjon === 'mor' &&
        erLønnOverEllerLik200000 &&
        erLønnOverEllerLikMinstelønn &&
        (borDuINorge || jobberDuINorge)
    ) {
        return 'morTjener200000EllerMerOgHarRett';
    }
    if (
        situasjon === 'mor' &&
        !erLønnOverEllerLik200000 &&
        erLønnOverEllerLikMinstelønn &&
        (borDuINorge || jobberDuINorge)
    ) {
        return 'morTjenerUnder200000OgKanHaRettFpEllerEs';
    }
    if (situasjon !== 'mor' && erLønnOverEllerLikMinstelønn && (borDuINorge || jobberDuINorge)) {
        return 'farEllerMedmorKanHaRettFp';
    }
    if (
        situasjon === 'mor' &&
        ((!erLønnOverEllerLik200000 && !erLønnOverEllerLikMinstelønn) || erLønnOverEllerLikMinstelønn) &&
        (borDuINorge || jobberDuINorge)
    ) {
        return 'morHarRettEs';
    }
    if (
        situasjon !== 'mor' &&
        ((!erLønnOverEllerLik200000 && !erLønnOverEllerLikMinstelønn) || erLønnOverEllerLikMinstelønn) &&
        (borDuINorge || jobberDuINorge)
    ) {
        return 'farEllerMedmorKanHaRettEs';
    }
    return 'harIkkeRett';
};
interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

export const OppsummeringFpEllerEsSide = ({ fpEllerEsSituasjon, satser }: Props) => {
    const intl = useIntl();
    const { ref } = useScrollBehaviour();

    const hvemHarRett = finnHvemSomHarRett(fpEllerEsSituasjon, satser);

    return (
        <>
            <VeiviserPage ref={ref} label={intl.formatMessage({ id: 'OppsummeringFpEllerEsSide.Oppsummering' })}>
                <VStack gap="space-32">
                    {(hvemHarRett === 'morTjener200000EllerMerOgHarRett' ||
                        hvemHarRett === 'farEllerMedmorKanHaRettFp') && (
                        <HarRett fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
                    )}
                    {hvemHarRett === 'morTjenerUnder200000OgKanHaRettFpEllerEs' && (
                        <HarRettFpEllerEs fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
                    )}
                    {hvemHarRett === 'morHarRettEs' && (
                        <HarRettEs fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
                    )}
                    {hvemHarRett === 'farEllerMedmorKanHaRettEs' && (
                        <HarRettEs fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
                    )}
                    {hvemHarRett === 'harIkkeRett' && (
                        <HarIkkeRett fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
                    )}
                </VStack>
            </VeiviserPage>
            <HvorMyeOgHvaSkjerNåLinkPanel />
        </>
    );
};

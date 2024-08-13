import { CalculatorIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import { finnGrunnbeløp } from 'utils/satserUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { VStack } from '@navikt/ds-react';

import { Satser } from '@navikt/fp-types';

import VeiviserPage from '../../felles/VeiviserPage';
import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import HarIkkeRett from './HarIkkeRett';
import HarRett from './HarRett';
import HarRettEs from './HarRettEs';
import HarRettFpEllerEs from './HarRettFpEllerEs';
import HvorMyeOgHvaSkjerNåLinkPanel from './HvorMyeOgHvaSkjerNåLinkPanel';

const finnHvemSomHarRett = (fpEllerEsSituasjon: FpEllerEsSituasjon, satser: Satser) => {
    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());
    const minstelønn = grunnbeløpet / 2;
    if (
        fpEllerEsSituasjon.situasjon === 'mor' &&
        fpEllerEsSituasjon.lønnPerMåned * 12 > 200000 &&
        fpEllerEsSituasjon.lønnPerMåned * 12 > minstelønn &&
        fpEllerEsSituasjon.harHattInntekt &&
        fpEllerEsSituasjon.borDuINorge
    ) {
        return 'morTjenerOver200000HarRett';
    }
    if (
        fpEllerEsSituasjon.situasjon === 'mor' &&
        fpEllerEsSituasjon.lønnPerMåned * 12 < 200000 &&
        fpEllerEsSituasjon.lønnPerMåned * 12 > minstelønn &&
        fpEllerEsSituasjon.harHattInntekt &&
        fpEllerEsSituasjon.borDuINorge
    ) {
        return 'morTjenerUnder200000KanHaRettFpEllerEs';
    }
    if (
        (fpEllerEsSituasjon.situasjon === 'far' || 'medmor') &&
        fpEllerEsSituasjon.lønnPerMåned * 12 > 200000 &&
        fpEllerEsSituasjon.lønnPerMåned * 12 > minstelønn &&
        fpEllerEsSituasjon.harHattInntekt &&
        fpEllerEsSituasjon.borDuINorge
    ) {
        return 'farEllerMedmorKanHaRettFp';
    }
    if (
        (fpEllerEsSituasjon.situasjon === 'far' || 'medmor') &&
        fpEllerEsSituasjon.lønnPerMåned * 12 > minstelønn &&
        fpEllerEsSituasjon.harHattInntekt &&
        fpEllerEsSituasjon.borDuINorge
    ) {
        return 'farEllerMedmorKanHaRettFp';
    }
    if (
        fpEllerEsSituasjon.situasjon === 'mor' &&
        ((fpEllerEsSituasjon.lønnPerMåned * 12 < 200000 && fpEllerEsSituasjon.lønnPerMåned * 12 < minstelønn) ||
            (!fpEllerEsSituasjon.harHattInntekt && fpEllerEsSituasjon.lønnPerMåned * 12 > minstelønn)) &&
        fpEllerEsSituasjon.harHattInntekt &&
        fpEllerEsSituasjon.borDuINorge
    ) {
        return 'morHarRettEs';
    }
    return 'harIkkeRett';
};
interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

const OppsummeringFpEllerEsSide: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, satser }) => {
    const intl = useIntl();
    const { ref } = useScrollBehaviour();

    const hvemHarRett = finnHvemSomHarRett(fpEllerEsSituasjon, satser);

    const erFarEllerMedmor = fpEllerEsSituasjon.situasjon !== 'mor';
    console.log(erFarEllerMedmor);

    return (
        <>
            <VeiviserPage
                ref={ref}
                label={intl.formatMessage({ id: 'OppsummeringFpEllerEsSide.Oppsummering' })}
                icon={<CalculatorIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
            >
                <VStack gap="8">
                    {hvemHarRett === 'morTjenerOver200000HarRett' && (
                        <HarRett fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
                    )}
                    {hvemHarRett === 'farEllerMedmorKanHaRettFp' && (
                        <HarRett fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
                    )}
                    {hvemHarRett === 'morTjenerUnder200000KanHaRettFpEllerEs' && (
                        <HarRettFpEllerEs fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
                    )}
                    {hvemHarRett === 'morHarRettEs' && (
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

export default OppsummeringFpEllerEsSide;

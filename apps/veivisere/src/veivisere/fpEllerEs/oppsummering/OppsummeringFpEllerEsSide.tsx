import { StrollerIcon } from '@navikt/aksel-icons';
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

    const { situasjon, lønnPerMåned, borDuINorge } = fpEllerEsSituasjon;
    const erLønnOverEllerLik200000 = lønnPerMåned * 12 >= 200000;
    const erLønnOverEllerLikMinstelønn = lønnPerMåned * 12 >= minstelønn;
    if (situasjon === 'mor' && erLønnOverEllerLik200000 && erLønnOverEllerLikMinstelønn && borDuINorge) {
        return 'morTjener200000EllerMerOgHarRett';
    }
    if (situasjon === 'mor' && !erLønnOverEllerLik200000 && erLønnOverEllerLikMinstelønn && borDuINorge) {
        return 'morTjenerUnder200000OgKanHaRettFpEllerEs';
    }
    if (situasjon !== 'mor' && erLønnOverEllerLikMinstelønn && borDuINorge) {
        return 'farEllerMedmorKanHaRettFp';
    }
    if (
        situasjon === 'mor' &&
        ((!erLønnOverEllerLik200000 && !erLønnOverEllerLikMinstelønn) || erLønnOverEllerLikMinstelønn) &&
        borDuINorge
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
                icon={<StrollerIcon height={36} width={36} title="a11y-title" fontSize="1.5rem" aria-hidden />}
            >
                <VStack gap="8">
                    {hvemHarRett === 'morTjener200000EllerMerOgHarRett' && (
                        <HarRett fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
                    )}
                    {hvemHarRett === 'farEllerMedmorKanHaRettFp' && (
                        <HarRett fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />
                    )}
                    {hvemHarRett === 'morTjenerUnder200000OgKanHaRettFpEllerEs' && (
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

import { CalculatorIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import { finnGrunnbeløp } from 'utils/satserUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { Satser } from '@navikt/fp-types';

import VeiviserPage from '../../felles/VeiviserPage';
import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import HarIkkeRett from './HarIkkeRett';
import HarRett from './HarRett';
import HarRettEs from './HarRettEs';
import HarRettFpEllerEs from './HarRettFpEllerEs';
import HvorMyeOgHvaSkjerNåLinkPanel from './HvorMyeOgHvaSkjerNåLinkPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

const OppsummeringFpEllerEsSide: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, satser }) => {
    const intl = useIntl();
    const { ref } = useScrollBehaviour();

    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());
    const minstelønn = grunnbeløpet / 2;

    const erMor = fpEllerEsSituasjon.situasjon === 'mor';
    const erFarEllerMedmor = fpEllerEsSituasjon.situasjon !== 'mor';
    console.log(erFarEllerMedmor);

    // TODO: lag sjekk på om man har rett eller ikke
    const harRett =
        fpEllerEsSituasjon.borDuINorge &&
        fpEllerEsSituasjon.harHattInntekt &&
        fpEllerEsSituasjon.lønnPerMåned * 12 > minstelønn &&
        fpEllerEsSituasjon.lønnPerMåned * 12 > 200000;
    const harRettFpEllerEs =
        fpEllerEsSituasjon.borDuINorge &&
        fpEllerEsSituasjon.harHattInntekt &&
        fpEllerEsSituasjon.lønnPerMåned * 12 > minstelønn &&
        fpEllerEsSituasjon.lønnPerMåned * 12 < 200000;
    const harRettEs = !harRett && !harRettFpEllerEs && fpEllerEsSituasjon.borDuINorge;
    const harIkkeRett = !harRett && !harRettFpEllerEs && !harRettEs;

    return (
        <>
            <VeiviserPage
                ref={ref}
                label={intl.formatMessage({ id: 'OppsummeringFpEllerEsSide.Oppsummering' })}
                icon={<CalculatorIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
            >
                <>
                    {erMor && harRett && <HarRett fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />}
                    {harRettFpEllerEs && <HarRettFpEllerEs fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />}
                    {harRettEs && <HarRettEs fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />}
                    {harIkkeRett && <HarIkkeRett fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />}
                </>
            </VeiviserPage>
            <HvorMyeOgHvaSkjerNåLinkPanel />
        </>
    );
};

export default OppsummeringFpEllerEsSide;

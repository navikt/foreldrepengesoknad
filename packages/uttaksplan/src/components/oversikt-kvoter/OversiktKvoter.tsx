import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import {
    ForeldreparSituasjon,
    NavnPåForeldre,
    Periode,
    Situasjon,
    StønadskontoType,
    Søkerrolle,
} from '@navikt/fp-common';
import { Stønadskonto, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import ForelderIkon from '../../common/foreldrepar/ForelderIkon';
import Personkort from '../../common/personkort/Personkort';
import { getVarighetString } from '../../components/periodeliste-item-header/PeriodelisteItemHeader';
import { BrukteDager, getBrukteDager } from '../../utils/brukteDagerUtils';
import { getSituasjonForelderSvg } from '../../utils/foreldreparSituasjonUtils';
import { guid } from '../../utils/guid';
import isFarEllerMedmor from '../../utils/isFarEllerMedmor';
import planBemUtils from '../../utils/planBemUtils';
import { Uttaksstatus, getUttaksstatus } from '../../utils/uttaksstatus';
import Kontostatus from './konto-status/Kontostatus';
import './oversiktKvoter.less';
import TilesList from './tilesList/TilesList';

const bem = planBemUtils('oversiktKvoter');

const filtrerBortAnnenPartsKonto = (uttakskontoer: Stønadskonto[], erFarEllerMedmor: boolean): Stønadskonto[] => {
    return erFarEllerMedmor
        ? uttakskontoer.filter((uttak) => uttak.konto !== StønadskontoType.Mødrekvote)
        : uttakskontoer.filter((uttak) => uttak.konto !== StønadskontoType.Fedrekvote);
};
interface PropsPerForelder {
    brukteDagerPerForelder: BrukteDager;
    erDeltUttakINorge: boolean;
    foreldreparSituasjon: ForeldreparSituasjon;
    navnPåForeldre: NavnPåForeldre;
    søkerErFarEllerMedmor: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const OversiktPerForelder: FunctionComponent<PropsPerForelder> = ({
    brukteDagerPerForelder,
    erDeltUttakINorge,
    foreldreparSituasjon,
    navnPåForeldre,
    søkerErFarEllerMedmor,
}) => {
    const intl = useIntl();
    const søkerErMor = !søkerErFarEllerMedmor;
    const svgInfo = getSituasjonForelderSvg(foreldreparSituasjon);

    return (
        <div className={bem.block}>
            <div className={bem.element('perForelder')}>
                <Heading size="small" as="h3" className="blokk-xs">
                    {intl.formatMessage({ id: 'uttaksplan.oversiktKvoter.tittel.foreldre' })}
                </Heading>
                <TilesList columns={'flex'}>
                    {(erDeltUttakINorge || søkerErMor) && (
                        <Personkort
                            ikon={<ForelderIkon forelder={svgInfo.mor} />}
                            tittel={capitalizeFirstLetter(navnPåForeldre.mor)}
                        >
                            <strong>{getVarighetString(brukteDagerPerForelder.mor.dagerTotalt, intl)}</strong>
                        </Personkort>
                    )}
                    {(erDeltUttakINorge || søkerErFarEllerMedmor) && (
                        <Personkort
                            ikon={<ForelderIkon forelder={svgInfo.farMedmor} />}
                            tittel={capitalizeFirstLetter(navnPåForeldre.farMedmor)}
                        >
                            <strong>{getVarighetString(brukteDagerPerForelder.farMedmor.dagerTotalt, intl)}</strong>
                        </Personkort>
                    )}
                </TilesList>
            </div>
        </div>
    );
};

interface PropsPerKvote {
    erDeltUttakINorge: boolean;
    navnPåForeldre: NavnPåForeldre;
    erEndringssøknad: boolean;
    uttaksstatus: Uttaksstatus;
    erFarEllerMedmor: boolean;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const OversiktPerKvote: FunctionComponent<PropsPerKvote> = ({
    erDeltUttakINorge,
    navnPåForeldre,
    erEndringssøknad,
    uttaksstatus,
    erFarEllerMedmor,
    situasjon,
    erAleneOmOmsorg,
}) => {
    const uttakÅVise = erDeltUttakINorge
        ? uttaksstatus.uttak
        : filtrerBortAnnenPartsKonto(uttaksstatus.uttak, erFarEllerMedmor);
    return (
        <div className={bem.element('perKvote')}>
            <Heading size="small" as="h3" className="blokk-xs">
                <FormattedMessage
                    id={
                        uttaksstatus.gjelderDagerBrukt
                            ? 'uttaksplan.oversiktKvoter.tittel.kontoer.brukteDager'
                            : 'uttaksplan.oversiktKvoter.tittel.kontoer.ikkeBrukteDager'
                    }
                    values={{ antall: erDeltUttakINorge ? 2 : 1 }}
                />
            </Heading>
            <TilesList columns={2}>
                {uttakÅVise.map((uttak) => (
                    <Kontostatus
                        key={guid()}
                        uttak={uttak}
                        navnPåForeldre={navnPåForeldre}
                        erEndringssøknad={erEndringssøknad}
                        erFarEllerMedmor={erFarEllerMedmor}
                        situasjon={situasjon}
                        erAleneOmOmsorg={erAleneOmOmsorg}
                    />
                ))}
            </TilesList>
        </div>
    );
};

interface Props {
    tilgjengeligeStønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad;
    uttaksplan: Periode[];
    erDeltUttak: boolean;
    foreldreparSituasjon: ForeldreparSituasjon;
    familiehendelsesdato: Date;
    annenForelderHarRettINorge: boolean;
    toTetteReglerGjelder: boolean;
    intl: IntlShape;
    rolle: Søkerrolle;
    erEndringssøknad: boolean;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
    navnPåForeldre: NavnPåForeldre;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const OversiktKvoter: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer,
    uttaksplan,
    erDeltUttak,
    foreldreparSituasjon,
    familiehendelsesdato,
    annenForelderHarRettINorge,
    rolle,
    erEndringssøknad,
    situasjon,
    erAleneOmOmsorg,
    navnPåForeldre,
}) => {
    const søkerErFarEllerMedmor = isFarEllerMedmor(rolle);
    const uttaksstatus = getUttaksstatus({
        erDeltUttak: erDeltUttak,
        erEndringssøknad: erEndringssøknad,
        harKomplettUttaksplan: true,
        erFarEllerMedmor: søkerErFarEllerMedmor,
        tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer,
        uttaksplan,
    });
    const brukteDagerPerForelder = getBrukteDager(tilgjengeligeStønadskontoer, uttaksplan, familiehendelsesdato);
    const erDeltUttakINorge = erDeltUttak && annenForelderHarRettINorge;
    return (
        <div className={bem.block}>
            <OversiktPerForelder
                brukteDagerPerForelder={brukteDagerPerForelder}
                erDeltUttakINorge={erDeltUttakINorge}
                foreldreparSituasjon={foreldreparSituasjon}
                navnPåForeldre={navnPåForeldre}
                søkerErFarEllerMedmor={søkerErFarEllerMedmor}
            />
            <OversiktPerKvote
                erDeltUttakINorge={erDeltUttakINorge}
                navnPåForeldre={navnPåForeldre}
                erEndringssøknad={erEndringssøknad}
                uttaksstatus={uttaksstatus}
                erFarEllerMedmor={søkerErFarEllerMedmor}
                situasjon={situasjon}
                erAleneOmOmsorg={erAleneOmOmsorg}
            />
        </div>
    );
};
// eslint-disable-next-line import/no-default-export
export default OversiktKvoter;

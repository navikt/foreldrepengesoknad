import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import {
    ForelderIkon,
    ForeldreparSituasjon,
    NavnPåForeldre,
    Periode,
    Personkort,
    Situasjon,
    StønadskontoType,
    StønadskontoUttak,
    Søkerrolle,
    TilgjengeligStønadskonto,
    bemUtils,
    getSituasjonForelderSvg,
    getVarighetString,
    guid,
    intlUtils,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import Kontostatus from './konto-status/Kontostatus';
import TilesList from './tilesList/TilesList';
import './oversiktKvoter.less';
import { Heading } from '@navikt/ds-react';
import { capitalizeFirstLetter } from '@navikt/fp-common/src/common/utils/stringUtils';
import { BrukteDager, getBrukteDager } from '../../utils/brukteDagerUtils';
import { Uttaksstatus, getUttaksstatus } from '../../utils/uttaksstatus';

const bem = bemUtils('oversiktKvoter');

const filtrerBortAnnenPartsKonto = (
    uttakskontoer: StønadskontoUttak[],
    erFarEllerMedmor: boolean,
): StønadskontoUttak[] => {
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
                <Heading size="small" as="h2" className="blokk-xs">
                    {intlUtils(intl, 'uttaksplan.oversiktKvoter.tittel.foreldre')}
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
            <Heading size="small" as="h2" className="blokk-xs">
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
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
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

export default OversiktKvoter;

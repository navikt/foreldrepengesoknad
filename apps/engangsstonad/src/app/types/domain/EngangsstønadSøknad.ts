import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import { FodtBarn, UfodtBarn } from './Barn';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import Adopsjon from './Adopsjon';

interface EngangsstønadSøknad {
    type: string;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: FodtBarn | UfodtBarn | Adopsjon;
    vedlegg?: Attachment[];
}

export interface EngangsstønadSøknadDto {
    type: string;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: FodtBarn | UfodtBarn | Adopsjon;
    vedlegg?: Attachment[];
    søker: {
        språkkode: string;
    };
}

export default EngangsstønadSøknad;

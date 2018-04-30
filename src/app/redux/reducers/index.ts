import Søknad from "../../types/søknad/Søknad";
import søknadReducer from "./søknadReducer";

export interface AppState {
  søknadReducer: Søknad;
}

export default { søknadReducer };

export default SupercellClient;
/**
 * Class representing a client for interacting with Supercell game APIs.
 * @extends SupercellAPI
 */
declare class SupercellClient extends SupercellAPI {
    endpoints: ClashOfClans | ClashRoyale | BrawlStars;
}
import SupercellAPI from "./api/SupercellAPI.js";
import ClashOfClans from "./api/ClashOfClans.js";
import ClashRoyale from "./api/ClashRoyale.js";
import BrawlStars from "./api/BrawlStars.js";
export { SupercellAPI, ClashOfClans, ClashRoyale, BrawlStars };
//# sourceMappingURL=index.d.ts.map
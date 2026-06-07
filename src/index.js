import SupercellAPI from "./api/SupercellAPI.js";
import ClashOfClans from "./api/ClashOfClans.js";
import ClashRoyale from "./api/ClashRoyale.js";
import BrawlStars from "./api/BrawlStars.js";

/**
 * Class representing a client for interacting with Supercell game APIs.
 * @extends SupercellAPI
 */
class SupercellClient extends SupercellAPI {
  /**
   * Create a SupercellClient instance.
   * @param {Object} config - The configuration for the client.
   * @param {('clashofclans'|'clashroyale'|'brawlstars')} config.apiType - The type of API to interact with.
   * @param {string} config.token - The API token for authentication.
   * @param {boolean} [config.useProxy=false] - Whether to use a proxy for requests.
   * @throws {Error} Throws an error if the API type is unsupported.
   */
  constructor(config) {
    super(config);
    switch (config.apiType) {
      case "clashofclans":
        this.endpoints = new ClashOfClans(this);
        break;
      case "clashroyale":
        this.endpoints = new ClashRoyale(this);
        break;
      case "brawlstars":
        this.endpoints = new BrawlStars(this);
        break;
      default:
        throw new Error("Unsupported API type");
    }
  }
}

export default SupercellClient;
export { SupercellAPI, ClashOfClans, ClashRoyale, BrawlStars };

import { Focus8WAPI } from "./mainClient";

function getSessionId() {
  Focus8WAPI.getGlobalValue("cbFunction", "*", 1);
}

export default getSessionId;

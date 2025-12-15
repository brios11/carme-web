export type CarmeRequest = {
    name: string;
    email: string;
    startDate: string;
    endDate: string;
    createdAt: string;
  };
  
  declare global {
    // eslint-disable-next-line no-var
    var __carmeRequests: CarmeRequest[] | undefined;
  }
  
  export function getRequests() {
    if (!globalThis.__carmeRequests) globalThis.__carmeRequests = [];
    return globalThis.__carmeRequests;
  }
  
  export function addRequest(r: CarmeRequest) {
    const list = getRequests();
    list.unshift(r);
    if (list.length > 200) list.length = 200;
  }
  
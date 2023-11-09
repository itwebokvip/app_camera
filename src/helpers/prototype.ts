const json = {
  tryParse: (jsonValue: any) => {
    if (!jsonValue) {
      return undefined;
    }
    try {
      return JSON.parse(jsonValue);
    } catch (error) {
      return jsonValue;
    }
  },

  tryStringify: (obj: any) => {
    if (!obj) {
      return undefined;
    }
    try {
      return JSON.stringify(obj);
    } catch (error) {
      return obj;
    }
  },
};

export const PrototypeManager = {
  json,
};

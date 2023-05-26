const iplocate = require("node-iplocate");

module.exports = {
  getOperationDetails: (req) => {
    const datetime = new Date().toISOString();
    const ip = req.ip; // Obtain local ip of the request

    return { datetime, ip };
  },

  getUserTimeZone: async (ip) => {
    if (process.env.NODE_ENV === "testing") return "America/Sao_Paulo";

    try {
      let apiKey = process.env.IP_LOCATE_KEY;

      const result = await iplocate(ip, { apiKey });
      return result.time_zone;
    } catch (error) {
      console.log("Error al obtener la zona horaria:", error);
      return "America/Sao_Paulo";
    }
  },
};

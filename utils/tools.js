function getOperationDetails(req) {
  const datetime = new Date().toISOString();
  const ip = req.ip; // Obtain local ip of the request

  return { datetime, ip };
}

module.exports = getOperationDetails;

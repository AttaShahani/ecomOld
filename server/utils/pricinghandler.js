export function pricingHandler(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      pricingHandler(obj[key]);
    } else if (
      key.startsWith("gt") ||
      key.startsWith("gte") ||
      key.startsWith("lt") ||
      key.startsWith("lte")
    ) {
      const newKey = "$" + key;
      obj[newKey] = obj[key];
      delete obj[key];
    }
  }
  return obj;
}

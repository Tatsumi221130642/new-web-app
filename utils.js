const generateOrderNumber = () => {
  const timestamp = new Date().toISOString().replace(/[-:T.]/g, "");
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${randomString}`;
};

const generateInvoiceNumber = () => {
  const timestamp = new Date().toISOString().replace(/[-:T.]/g, "");
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `INV-${timestamp}-${randomString}`;
};

module.exports = { generateOrderNumber, generateInvoiceNumber };

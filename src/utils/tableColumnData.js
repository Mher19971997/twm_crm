const generateData = (length, fill) => {
  const array = new Array(length);
  return array.fill(fill);
};

const userTransactionsColumnData = [
  { Header: "No", accessor: "No", align: "left", width: 130 },
  { Header: "Transaction", accessor: "Transaction", align: "left", width: 190 },
  { Header: "Created", accessor: "Created", align: "left", width: 250 },
  { Header: " ", accessor: " ", align: "right", width: 100 },
];

export { userTransactionsColumnData, generateData };
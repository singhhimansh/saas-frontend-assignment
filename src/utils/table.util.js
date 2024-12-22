export const getColumn = () => {
  const columns = [
    {
      key: "S.No",
      headerName: "S.No",
      Component: ({ row }) => {
        return <p>{row["s.no"] + 1}</p>;
      },
    },
    {
      key: "percentage.funded",
      headerName: "Percentage funded (%)",
      Component: ({ row }) => {
        return (
          <p
            style={{
              paddingBottom: "0px",
              margin: 0,
            }}
          >
            {row["percentage.funded"]}
          </p>
        );
      },
    },
    {
      key: "amt.pledged",
      headerName: "Amount pledged (Rs)",
      Component: ({ row }) => {
        return (
          <p
            style={{
              paddingBottom: "0px",
              margin: 0,
            }}
          >
            ₹ {row["amt.pledged"]}
          </p>
        );
      },
    },
  ];

  return columns;
};

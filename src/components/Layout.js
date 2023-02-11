import Box from "./Box";

const Layout = ({ children }) => (
  <Box
    css={{
      maxW: "100%",
      mb: 100,
    }}
  >
    {children}
  </Box>
);

export default Layout;
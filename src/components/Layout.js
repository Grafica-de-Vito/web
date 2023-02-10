import { Content } from "./Content";
import Box from "./Box";

const Layout = ({ children }) => (
  <Box
    css={{
      maxW: "100%"
    }}
  >
    {children}
    <Content />
  </Box>
);

export default Layout;
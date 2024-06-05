import { Box } from "@chakra-ui/react";
import IosSpinner from "./IosSpinner";

const LoadingBar = ({ asPageLoader = false }: { asPageLoader?: boolean }) => {
  return (
    <Box className="linear-loading-container" id="loader-container">
      <section>
        <h2>Chit Chat</h2>
        {asPageLoader ? (
          <div className="linear-loader-bg">
            <div className="linear-loader"></div>
          </div>
        ) : (
          <IosSpinner />
        )}
      </section>
    </Box>
  );
};
export default LoadingBar;

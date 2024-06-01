import IosSpinner from "./IosSpinner";

const LoadingBar = ({ asPageLoader = false }: { asPageLoader?: boolean }) => {
  return (
    <div className="linear-loading-container" style={{ position: "absolute", zIndex: "20" }} id="loader-container">
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
    </div>
  );
};
export default LoadingBar;

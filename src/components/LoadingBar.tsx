const LoadingBar = () => {
  return (
    <div className="bg-white h-[2px] m-[1em] overflow-hidden relative w-[12em] rounded-sm">
      <div className="loading-bar absolute h-full w-1/2 bg-red-500"></div>
    </div>
  );
};
export default LoadingBar;

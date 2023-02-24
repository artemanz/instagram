import { FC } from "react";
import { RotatingLines } from "react-loader-spinner";

interface Props {}

const Loading: FC<Props> = () => {
  return (
    <div className="flex items-center justify-center h-20">
      <RotatingLines
        strokeColor="#ef4444"
        strokeWidth="3"
        animationDuration="1"
        width="60"
        visible={true}
      />
    </div>
  );
};

export default Loading;

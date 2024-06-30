import { FC } from "react";

export const NoChat: FC = () => {
  return (
    <div className="rounded-md border-gray-200 p-4 border w-8/12 hidden lg:block h-full">
      <div className="flex items-center justify-center h-full w-full">
        <p>Please select a chat to continue</p>
      </div>
    </div>
  );
};

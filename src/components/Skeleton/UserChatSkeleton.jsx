import Skeleton from "react-loading-skeleton";

const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const UserChatSkeleton = () => {
  return (
    <>
      {loopArray.map((item) => (
        <div
          key={item}
          className="flex px-4 py-3 border-t border-gray-100 bg-gray-300
           focus:outline-none focus:ring focus:bg-slate-300 cursor-pointer rounded-lg max-w-full"
        >
          <div className="w-10 h-10">
            <Skeleton circle={true} height={40} width={40} />
          </div>
          <div className="ml-2 w-full">
            <h3>
              <Skeleton width={100} />
            </h3>
            <div className="truncate w-4/5">
              <Skeleton width={200} />
            </div>
            <h5>
              <Skeleton width={80} />
            </h5>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserChatSkeleton;

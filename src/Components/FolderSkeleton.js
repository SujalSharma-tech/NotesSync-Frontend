import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FolderSkeletonBody = () => {
  return (
    <div className="sm:w-[260px] sm:h-[140px]   w-[150px] h-[180px] bg-gray-300 dark:bg-gray-400 rounded-xl p-[10px]">
      <SkeletonTheme highlightColor="gray">
        <Skeleton circle={true} width={"45px"} height={"45px"} />
        <Skeleton width={"80%"} className="rounded-lg mt-3" height={"10%"} />
        <Skeleton width={"30%"} className="rounded-lg mt-3" height={"10%"} />
      </SkeletonTheme>
    </div>
  );
};
const FolderSkeleton = () => {
  return (
    <>
      <div className="skeleton-body flex gap-5 mt-[25px] flex-wrap sm:justify-normal justify-center">
        <FolderSkeletonBody />
        <FolderSkeletonBody />
        <FolderSkeletonBody />
        <FolderSkeletonBody />
      </div>
    </>
  );
};

export default FolderSkeleton;

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NoteSkeletonBody = () => {
  return (
    <div className="sm:w-[260px] sm:h-[300px]  w-[150px] h-[180px] bg-gray-300 dark:bg-gray-400 rounded-xl p-[20px]">
      <SkeletonTheme highlightColor="gray">
        <Skeleton width={"30%"} className="rounded-lg" height={"6%"} />
        <Skeleton width={"80%"} className="rounded-lg mt-3" height={"6%"} />
        <Skeleton width={"95%"} className="rounded-lg mt-3" height={"55%"} />
      </SkeletonTheme>
    </div>
  );
};

const SkeletonComponent = () => {
  return (
    <>
      <div className="skeleton-body flex gap-5 mt-[25px] sm:justify-normal justify-center flex-wrap">
        <NoteSkeletonBody />
        <NoteSkeletonBody />
        <NoteSkeletonBody />
        <NoteSkeletonBody />
      </div>
    </>
  );
};

export default SkeletonComponent;

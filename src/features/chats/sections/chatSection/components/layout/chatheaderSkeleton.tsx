import SkeletonMui from "../../../../../../shared/components/ui/skeletion";

const ChatHeaderSkeleton = () => {
  return (
    <div className="bg-white cursor-pointer border-b border-b-black flex items-center justify-between p-2 pr-5">
      <div className="flex items-center gap-3 flex-1">
        <SkeletonMui width={48} height={48} variant="circular" />
        <div>
          <SkeletonMui width={100} height={20} variant="text" />
          <SkeletonMui width={70} height={20} variant="text" />
        </div>
      </div>
      <button className="p-1 flex flex-col gap-[2px]">
        <SkeletonMui width={5} height={5} variant="circular" />
        <SkeletonMui width={5} height={5} variant="circular" />
        <SkeletonMui width={5} height={5} variant="circular" />
      </button>
    </div>
  );
};

export default ChatHeaderSkeleton;

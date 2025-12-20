import SkeletonMui from "../../../../../../shared/components/ui/skeletion";

const ChatRowSkeleton = () => {
  return (
    <div className="border border-[#b3b0b0] p-3 flex items-center rounded-3xl justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <SkeletonMui width={48} height={48} />
        </div>
        <div>
          <SkeletonMui width={50} height={15} />
          <SkeletonMui width={150} height={20} style={{ marginTop: "4px" }} />
        </div>
      </div>
      <div>
        <SkeletonMui width={80} height={20} />
      </div>
    </div>
  );
};

export default ChatRowSkeleton;

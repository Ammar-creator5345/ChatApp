import SkeletonMui from "../../../../../shared/components/ui/skeletion";

const SearchDrawerSkeleton = () => {
  return (
    <div className="border cursor-pointer rounded-lg p-2 mt-2 flex items-center gap-3 transition-all hover:bg-[#dddbdb]">
      <SkeletonMui height={48} width={48} />
      <div>
        <SkeletonMui height={18} width={48} />
        <SkeletonMui height={18} width={48} />
      </div>
    </div>
  );
};

export default SearchDrawerSkeleton;

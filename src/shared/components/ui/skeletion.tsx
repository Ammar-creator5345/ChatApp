import Skeleton from "@mui/material/Skeleton";

type PropTypes = {
  width: number;
  height: number;
  style?: any;
  variant?: "circular" | "rectangular" | "rounded" | "text";
};

export default function SkeletonMui({
  width,
  height,
  style,
  variant = "rounded",
}: PropTypes) {
  return (
    <Skeleton variant={variant} width={width} height={height} sx={style} />
  );
}

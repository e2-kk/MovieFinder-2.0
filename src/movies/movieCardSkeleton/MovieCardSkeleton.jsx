import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#242323" highlightColor="#5d5959">
      <Skeleton
        max-width="175px"
        max-height="260px"
        background-color="#6e6a6a"
      />
    </SkeletonTheme>
  );
};

export default MovieCardSkeleton;

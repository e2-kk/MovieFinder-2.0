import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MoviesPageSkeleton = ({ watchProviders }) => {
  return (
    <div className="container">
      <Skeleton
        height="450px"
        marginBottom="30px"
        baseColor="#242323"
        highlightColor="#5d5959"
      />
      <div className="movie-details">
        <div className="movie-details-media">
          <Skeleton
            width="300px"
            height="350px"
            style={{ marginBottom: "60px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="300px"
            height="200px"
            baseColor="#282727"
            highlightColor="#5d5959"
          />
        </div>
        <div className="movie-details-info">
          <Skeleton
            width="400px"
            height="30px"
            style={{ marginBottom: "60px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="400px"
            height="15px"
            style={{ marginBottom: "60px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="400px"
            height="10px"
            style={{ marginBottom: "30px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="400px"
            height="10px"
            style={{ marginBottom: "30px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="400px"
            height="10px"
            style={{ marginBottom: "30px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="400px"
            height="10px"
            style={{ marginBottom: "30px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="400px"
            height="10px"
            style={{ marginBottom: "30px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="400px"
            height="10px"
            style={{ marginBottom: "30px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="400px"
            height="30px"
            style={{ marginTop: "60px", marginBottom: "30px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="400px"
            height="10px"
            style={{ marginBottom: "60px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
          <Skeleton
            width="400px"
            height="30px"
            style={{ marginBottom: "30px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />

          <Skeleton
            width="50px"
            height="50px"
            borderRadius="50px"
            count={watchProviders?.length}
            inline={true}
            style={{ marginRight: "40px" }}
            baseColor="#282727"
            highlightColor="#5d5959"
          />
        </div>
      </div>
    </div>
  );
};

export default MoviesPageSkeleton;

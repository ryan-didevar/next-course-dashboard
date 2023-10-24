import React from "react";
interface Props {
  params: {
    id: number;
    photosId: number;
  };
}
const PhotosPage = ({ params: { id, photosId } }: Props) => {
  return (
    <div>
      PhotosPage {id} and {photosId}
    </div>
  );
};

export default PhotosPage;

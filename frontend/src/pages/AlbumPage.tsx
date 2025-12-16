import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumsById, currentAlbum } = useMusicStore();

  useEffect(() => {
    if (albumId) fetchAlbumsById(albumId);
  }, [albumId, fetchAlbumsById]);

  return <div>{currentAlbum?.title}</div>;
};

export default AlbumPage;

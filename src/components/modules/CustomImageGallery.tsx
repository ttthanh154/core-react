import { CloseOutlined } from "@ant-design/icons";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useState, useRef, memo } from "react";

const CustomImageGallery = memo(({ data }: any) => {
  // console.log("re-render customImageGallery");
  const refGallery = useRef<any>(null);
  // const [currentIndex, setCurrentIndex] = useState<any>(0);
  const [isOpenModalGallery, setIsOpenModalGallery] = useState<boolean>(false);

  const images = data.flat().map((image: string) => ({
    original: `${import.meta.env.VITE_BACKEND_API}/images/book/${image}`,
    thumbnail: `${import.meta.env.VITE_BACKEND_API}/images/book/${image}`,
  }));
  const handleOnClickImage = () => {
    setIsOpenModalGallery(true);
    console.log(refGallery?.current?.getCurrentIndex());
    // setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    refGallery?.current?.fullScreen();
  };

  const handleExitFullScreen = () => {
    setIsOpenModalGallery(false);
  };

  const renderFullscreenButton = (
    onClick: React.MouseEventHandler<HTMLElement>,
    isFullscreen: boolean
  ) => {
    if (isFullscreen === true)
      return (
        <button
          className="image-gallery-icon image-gallery-fullscreen-button"
          onClick={onClick}
        >
          <CloseOutlined />
          <br />
          Đóng
        </button>
      );
  };
  return (
    <div className="img-gallery">
      <ImageGallery
        ref={refGallery}
        items={images}
        showNav={isOpenModalGallery} // Display navigation buttons when isOpenModalGallery is true
        // showIndex={isOpenModalGallery} // Display index when isOpenModalGallery is true
        showBullets={false}
        showPlayButton={false}
        renderFullscreenButton={renderFullscreenButton}
        onClick={() => {
          handleOnClickImage();
        }}
        useBrowserFullscreen={true}
        onScreenChange={(isFullScreen) => {
          if (!isFullScreen) {
            handleExitFullScreen();
          }
        }}
      />
    </div>
  );
});

export default CustomImageGallery;

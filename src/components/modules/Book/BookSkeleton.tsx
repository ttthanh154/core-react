import { Skeleton, Space } from "antd";
const BookSkeleton = () => {
  return (
    <>
      <div className="detail-book__images">
        <Space>
          <Skeleton.Image
            active={true}
            style={{ width: "350px", height: "350px" }}
          />
        </Space>
        <br />
        <br />
        <Space>
          <Skeleton.Image active={true} />
          <Skeleton.Image active={true} />
          <Skeleton.Image active={true} />
        </Space>
      </div>
      <div className="detail-book__content">
        <Space>
          <Skeleton.Input active={true} size={"small"} />
        </Space>
        <br />
        <br />
        <div className="detail-book__content-main">
          <Skeleton.Input
            active={true}
            size={"small"}
            className="skeletonInput"
          />

          <Skeleton.Input
            active={true}
            size={"small"}
            className="skeletonInput"
            style={{ width: "70%" }}
          />

          <Skeleton.Input
            active={true}
            size={"small"}
            className="skeletonInput"
            style={{ width: "40%" }}
          />
          <br />

          <Space>
            <Skeleton.Input active={true} size={"small"} />
          </Space>

          <Skeleton.Input
            active={true}
            size={"small"}
            className="skeletonInput"
          />

          <Skeleton.Input
            active={true}
            size={"small"}
            className="skeletonInput"
          />

          <Skeleton.Input
            active={true}
            size={"small"}
            className="skeletonInput"
            style={{ width: "40%" }}
          />
        </div>
        <br />
        <br />
        <div className="detail-book__content-order">
          <Skeleton.Input active={true} />
          <Skeleton.Input active={true} />
        </div>
      </div>
    </>
  );
};

export default BookSkeleton;

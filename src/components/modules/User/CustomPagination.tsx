import { ICustomPagination } from "@interface/tableCustomize";
import { savePage } from "@store/slice/globalSlice";
import { useAppDispatch, useAppSelector } from "@utils/hook";
import { Pagination } from "antd";
const CustomPagination = (props: ICustomPagination) => {
  const { meta } = props;

  const dispatch = useAppDispatch();

  const handlePageChange = (page: number, pageSize?: number) => {
    const pageData = {
      pageSize: pageSize,
      currentPage: page,
    };
    try {
      dispatch(savePage(pageData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="pagination">
        <Pagination
          total={meta?.total}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} trên ${total} dòng`
          }
          defaultPageSize={useAppSelector(
            (state) => state.global.page.pageSize
          )}
          defaultCurrent={1}
          current={useAppSelector((state) => state.global.page.current)}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CustomPagination;

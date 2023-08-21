import { ICustomPagination } from "@interface/tableCustomize";
import { loading, savePage } from "@store/slice/globalSlice";
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
    dispatch(loading(true))
    try {
      dispatch(savePage(pageData));
      dispatch(loading(false))
    } catch (error) {
      dispatch(loading(false))
    }
  };

  return (
    <>
      <div className="pagination">
        <Pagination
          total={meta?.total}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
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

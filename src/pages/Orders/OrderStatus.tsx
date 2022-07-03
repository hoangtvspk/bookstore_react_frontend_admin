import {
  BookOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  FileDoneOutlined,
  LoadingOutlined,
  RotateRightOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { useEffect } from "react";
import { GetOrder } from "../../models/getOrder";
interface OrderProps {
  order: GetOrder;
}

function OrderStatus({ order }: OrderProps) {
  useEffect(() => {}, [order.id]);
  const { Step } = Steps;
  return (
    <>
      <div>
        {order.status === "Chờ duyệt" && (
          <Steps>
            <Step
              status="finish"
              title="Đặt Hàng"
              icon={<SolutionOutlined />}
            />
            <Step
              status="process"
              title="Chờ Duyệt"
              icon={<LoadingOutlined />}
            />
            <Step status="wait" title="Đang chuẩn bị" icon={<BookOutlined />} />
            <Step
              status="wait"
              title="Giao Hàng"
              icon={<RotateRightOutlined />}
            />
            <Step status="wait" title="Đã Nhận" icon={<FileDoneOutlined />} />
            <Step status="wait" title=" Thành Công" icon={<SmileOutlined />} />
          </Steps>
        )}
        {order.status === "Đang chuẩn bị" && (
          <Steps>
            <Step
              status="finish"
              title="Đặt Hàng"
              icon={<SolutionOutlined />}
            />
            <Step status="finish" title="Chờ Duyệt" icon={<CheckOutlined />} />
            <Step
              status="process"
              title="Đang chuẩn bị"
              icon={<LoadingOutlined />}
            />
            <Step
              status="wait"
              title="Giao Hàng"
              icon={<RotateRightOutlined />}
            />
            <Step status="wait" title="Đã Nhận" icon={<FileDoneOutlined />} />
            <Step
              status="wait"
              title="Giao Hàng Thành Công"
              icon={<SmileOutlined />}
            />
          </Steps>
        )}
        {order.status === "Đang giao" && (
          <Steps>
            <Step
              status="finish"
              title="Đặt Hàng"
              icon={<SolutionOutlined />}
            />
            <Step status="finish" title="Chờ Duyệt" icon={<CheckOutlined />} />
            <Step
              status="finish"
              title="Đang chuẩn bị"
              icon={<BookOutlined />}
            />
            <Step
              status="process"
              title="Giao Hàng"
              icon={<LoadingOutlined />}
            />
            <Step status="wait" title="Đã Nhận" icon={<FileDoneOutlined />} />
            <Step
              status="wait"
              title="Giao Hàng Thành Công"
              icon={<SmileOutlined />}
            />
          </Steps>
        )}
        {order.status === "Đã nhận" && (
          <Steps>
            <Step
              status="finish"
              title="Đặt Hàng"
              icon={<SolutionOutlined />}
            />
            <Step status="finish" title="Chờ Duyệt" icon={<CheckOutlined />} />
            <Step
              status="finish"
              title="Đang chuẩn bị"
              icon={<BookOutlined />}
            />
            <Step
              status="finish"
              title="Giao Hàng"
              icon={<RotateRightOutlined />}
            />
            <Step
              status="process"
              title="Đã Nhận"
              icon={<FileDoneOutlined />}
            />
            <Step
              status="wait"
              title="Giao Hàng Thành Công"
              icon={<SmileOutlined />}
            />
          </Steps>
        )}
        {order.status === "Thành công" && (
          <Steps>
            <Step
              status="finish"
              title="Đặt Hàng"
              icon={<SolutionOutlined />}
            />
            <Step status="finish" title="Chờ Duyệt" icon={<CheckOutlined />} />
            <Step
              status="finish"
              title="Đang chuẩn bị"
              icon={<BookOutlined />}
            />
            <Step
              status="finish"
              title="Giao Hàng"
              icon={<RotateRightOutlined />}
            />
            <Step
              status="finish"
              title=" Đã Nhận"
              icon={<FileDoneOutlined />}
            />
            <Step
              status="finish"
              title="Giao Hàng Thành Công"
              icon={<SmileOutlined />}
            />
          </Steps>
        )}

        {order.status === "Đã hủy" && (
          <Steps style={{ width: "300px" }}>
            <Step
              status="finish"
              title="Đặt Hàng"
              icon={<SolutionOutlined />}
            />
            <Step
              status="error"
              title="Hủy Đơn"
              icon={<CloseCircleOutlined />}
            />
          </Steps>
        )}
      </div>
    </>
  );
}

export default OrderStatus;

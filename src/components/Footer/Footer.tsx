import {
  faAddressCard,
  faMailBulk,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";

function PageFooter() {
  return (
    <div className="layout-footer">
      <div style={{ paddingLeft: "10px", width: "27%" }}>
        <p
          style={{ paddingLeft: "10px", marginBottom: "2px", fontSize: "13px" }}
        >
          {" "}
          <FontAwesomeIcon
            className="mr-2"
            icon={faPhone}
            color="#00CC33"
          />{" "}
          0935970861 | 0983553096
        </p>
        <p
          style={{ paddingLeft: "10px", marginBottom: "2px", fontSize: "13px" }}
        >
          {" "}
          <FontAwesomeIcon
            className="mr-2"
            icon={faMailBulk}
            color="#FF9900"
          />{" "}
          18110278@student.hcmute.edu.vn
        </p>
        <p
          style={{ paddingLeft: "10px", marginBottom: "0px", fontSize: "13px" }}
        >
          {" "}
          <FontAwesomeIcon
            className="mr-2"
            icon={faMailBulk}
            color="#FF9900"
          />{" "}
          18110289@student.hcmute.edu.vn
        </p>
      </div>
      <div style={{ paddingLeft: "10px" }}>
        <p
          style={{ paddingLeft: "10px", marginBottom: "2px", fontSize: "13px" }}
        >
          {" "}
          <FontAwesomeIcon
            className="mr-2"
            icon={faAddressCard}
            color="	#3366CC"
          />{" "}
          111 Quang Trung, Phường Tăng Nhơn Phú B, Thành Phố Thủ Đức, Thành phố
          Hồ Chí Minh
        </p>
        <p
          style={{ paddingLeft: "10px", marginBottom: "2px", fontSize: "13px" }}
        >
          {" "}
          <FontAwesomeIcon
            className="mr-2"
            icon={faAddressCard}
            color="	#3366CC"
          />{" "}
          01 Võ Văn Ngân, Phường Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ Chí
          Minh
        </p>
      </div>
      <div style={{ paddingLeft: "60px" }}>
        <iframe
          title="fb"
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FdoubHBookStore&tabs&width=340&height=70&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="100%"
          height="70"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder={0}
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}

export default PageFooter;

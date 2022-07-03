import { Button, Image, Form, Input, message, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import { SelectValue } from "antd/lib/select";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { AddBookForm } from "../../models/addBook";
import { Book, BookImage, Category } from "../../models/book";
import { adminRoutes } from "../../routes/routes";
import ImageUploading, { ImageListType } from "react-images-uploading";

import "./Books.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const EditBooks = () => {
  const dispatch = useDispatch();
  const [bookForm] = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [book, setBook] = useState({} as Book);
  const [categoryArray, setCategoryArray] = useState<Category[]>([]);
  const { Option } = Select;
  const [nameBook, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [discount, setdiscount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [detail, setDetail] = useState("");
  const [idCate, setIdCate] = useState(2 as SelectValue);
  const [selectValue, SetSelectValue] = useState(1);

  const nameInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ): void => {
    setName(event.target.value);
  };
  const authorInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAuthor(event.target.value);
  };
  const discountInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setdiscount(parseInt(event.target.value));
  };

  const quantityInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuantity(parseInt(event.target.value));
  };
  const priceInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPrice(parseInt(event.target.value));
  };
  const detailInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDetail(event.target.value);
  };
  const idCateInputChange = (event: SelectValue): void => {
    setIdCate(event);
  };

  const { id } = useParams();

  const [currentedImages, setCurrentImages] = useState<String[]>([]);
  const [images, setImages] = useState([] as ImageListType);
  const maxNumber = 69;
  const imageList2 = [];
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    for (let i = 0; i < imageList.length; i++) {
      imageList2.push(imageList[i].file);
    }
    setImages(imageList);
    // setFile1(imageList[0].file);
  };
  useEffect(() => {
    httpClient()
      .get(APP_API.categoryBooks)
      .then((res) => {
        console.log(res);
        setCategoryArray([...res.data]);
        console.log(categoryArray);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(id);
    if (id) {
      httpClient()
        .get(APP_API.getBook.replace(":id", id))
        .then((res) => {
          console.log(res);
          setBook(res.data);
          if (res.data.bookImages.length > 0) {
            res.data.bookImages.map((bookImages: BookImage) => {
              setImages((state) => [...state, { dataURL: bookImages.image }]);
              setCurrentImages((state) => [...state, bookImages.image]);
            });
          }
          if (res.data.category.id) {
            console.log(res.data.category?.id);
            setName(res.data.nameBook);
            setIdCate(res.data.category.id);
            setAuthor(res.data.author);
            setQuantity(res.data.quantity);
            setPrice(res.data.price);
            setdiscount(res.data.discount);
            setDetail(res.data.detail);
            SetSelectValue(res.data.category?.id);
            bookForm.setFieldsValue(res.data);
            console.log(selectValue);
          }
        });
    }
  }, []);

  const onFinish = (values: AddBookForm) => {
    setIdCate(1);
    const formData: FormData = new FormData();

    console.log(
      JSON.stringify({
        id,
        nameBook,
        author,
        discount,
        quantity,
        price,
        detail,
        idCate,
        currentedImages,
      })
    );
    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      formData.append("files", images[i].file as string | Blob);
    }

    formData.append(
      "book",
      new Blob(
        [
          JSON.stringify({
            id,
            nameBook,
            author,
            discount,
            quantity,
            price,
            detail,
            idCate,
            currentedImages,
          }),
        ],
        { type: "application/json" }
      )
    );

    setSubmitting(true);

    httpClient()
      .post(APP_API.editBook, formData, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        message.success("Cập Nhật Thành Công!");
        navigate(adminRoutes.books);
      })
      .catch((err) => {
        message.success("Cập Nhật Thất Bại!");
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="bg-white rounded-3">
        <PageTitle>Chỉnh Sửa Sản Phẩm</PageTitle>
        <Form
          {...layout}
          name="nest-messages"
          form={bookForm}
          onFinish={onFinish}
        >
          <div className="site-layout-background d-flex align-items-center ">
            <div style={{ marginLeft: "200px" }}>
              <div style={{ width: "800px" }}>
                <span
                  style={{
                    fontSize: 16,

                    color: "#555555",
                  }}
                >
                  Tên Sách:
                </span>
              </div>
              <Form.Item
                className="form-item "
                name="nameBook"
                rules={[{ required: true }]}
              >
                <Input
                  style={{ width: "800px" }}
                  onChange={(e) => {
                    nameInputChange(e);
                  }}
                />
              </Form.Item>
              <div
                className="d-flex justify-content-between"
                style={{ width: "800px" }}
              >
                <div>
                  {" "}
                  <span
                    style={{
                      fontSize: 16,

                      color: "#555555",
                    }}
                  >
                    Thể Loại:
                  </span>
                  <Form.Item className="form-item " name="idCate">
                    {book.category && (
                      <Select
                        style={{ width: "260px" }}
                        allowClear
                        onChange={(e) => {
                          idCateInputChange(e);
                        }}
                        defaultValue={book.category.id}
                      >
                        {categoryArray.length > 0 &&
                          categoryArray.map((category: Category) => (
                            <Option value={category.id}>
                              <p style={{ marginBottom: "0" }}>
                                {category.nameCategory}
                              </p>
                            </Option>
                          ))}
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <div style={{ marginLeft: "40px" }}>
                  <span
                    style={{
                      fontSize: 16,

                      color: "#555555",
                    }}
                  >
                    Tác Giả:
                  </span>
                  <Form.Item
                    className="form-item "
                    name="author"
                    rules={[{ required: true }]}
                  >
                    <Input
                      style={{ width: "500px" }}
                      onChange={(e) => {
                        authorInputChange(e);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ width: "800px" }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 16,

                      color: "#555555",
                    }}
                  >
                    Số Lượng:
                  </span>
                  <Form.Item
                    style={{ width: "200px" }}
                    className="form-item "
                    name="quantity"
                    rules={[{ required: true }]}
                  >
                    <Input
                      style={{ width: "200px" }}
                      onChange={(e) => {
                        quantityInputChange(e);
                      }}
                    />
                  </Form.Item>
                </div>

                <div style={{ paddingLeft: "100px" }}>
                  <span
                    style={{
                      fontSize: 16,

                      color: "#555555",
                    }}
                  >
                    Đơn Giá (VNĐ):
                  </span>
                  <Form.Item
                    className="form-item "
                    name="price"
                    rules={[{ required: true }]}
                  >
                    <Input
                      style={{ width: "200px" }}
                      onChange={(e) => {
                        priceInputChange(e);
                      }}
                    />
                  </Form.Item>
                </div>
                <div style={{ paddingLeft: "100px" }}>
                  <span
                    style={{
                      fontSize: 16,

                      color: "#555555",
                    }}
                  >
                    Khuyến Mãi:
                  </span>
                  <Form.Item
                    className="form-item "
                    name="discount"
                    rules={[{ required: true }]}
                  >
                    <Input
                      style={{ width: "200px" }}
                      onChange={(e) => {
                        discountInputChange(e);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <span
                style={{
                  fontSize: 16,

                  color: "#555555",
                }}
              >
                Mô Tả Sản Phẩm:
              </span>
              <Form.Item
                className="form-item "
                name="detail"
                rules={[{ required: true }]}
              >
                <TextArea
                  style={{ width: "800px" }}
                  rows={4}
                  onChange={(e) => {
                    detailInputChange(e);
                  }}
                />
              </Form.Item>
              <span
                style={{
                  fontSize: 16,

                  color: "#555555",
                }}
              >
                Hình Ảnh Sản Phẩm:
              </span>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <div style={{ marginBottom: "10px" }}>
                      <Button
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Thêm Hình
                      </Button>
                      &nbsp;
                      <Button onClick={onImageRemoveAll}>Xóa Toàn Bộ</Button>
                    </div>

                    <div
                      className="d-flex"
                      style={{
                        minHeight: "120px",
                        border: "1px solid rgba(0,0,0,.1)",
                        padding: "10px",
                      }}
                    >
                      {imageList.map((image, index) => (
                        <div key={index} className=" pr-3">
                          <Image
                            src={image.dataURL}
                            alt=""
                            width={100}
                            height={100}
                            style={{ objectFit: "cover" }}
                          />
                          <div className="">
                            <Button onClick={() => onImageUpdate(index)}>
                              Đổi
                            </Button>
                            <Button
                              onClick={() => {
                                if (currentedImages.length > 0) {
                                  setCurrentImages(
                                    currentedImages.filter(
                                      (item) => item !== image.dataURL
                                    )
                                  );
                                }
                                console.log(currentedImages);
                                onImageRemove(index);
                              }}
                            >
                              Gỡ
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>

              <div
                className="d-flex justify-content-end mt-3"
                style={{ width: "800px" }}
              >
                <Form.Item className="form-item ">
                  <Button
                    style={{ width: "100px" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Lưu
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default EditBooks;

import { UploadOutlined } from "@ant-design/icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, message, Select, Spin, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { SelectValue } from "antd/lib/select";
import { ChangeEvent, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { AddBookForm } from "../../models/addBook";
import { Book, Category } from "../../models/book";
import { adminRoutes } from "../../routes/routes";
import ImgCrop from "antd-img-crop";

import "./Books.css";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

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
  const detailInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDetail(event.target.value);
  };
  const idCateInputChange = (event: SelectValue): void => {
    setIdCate(event);
  };

  const [file1, setFile1] = useState({} as Blob);
  const [file2, setFile2] = useState({} as Blob);
  const [file3, setFile3] = useState({} as Blob);
  const handleFileChange = (e: any) => {
    setFile1(e.target.files[0]);
  };
  const handleFile2Change = (e: any) => {
    setFile2(e.target.files[0]);
  };
  const handleFile3Change = (e: any) => {
    setFile3(e.target.files[0]);
  };

  const { id } = useParams();

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
          SetSelectValue(res.data.category.id);
          bookForm.setFieldsValue(res.data);
          console.log(selectValue);
        });
    }
  }, []);

  const onFinish = (values: AddBookForm) => {
    setIdCate(1);
    const formData: FormData = new FormData();
    console.log(file1);
    console.log(values);
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
      })
    );
    console.log(
      new Blob([JSON.stringify(file1)], { type: "application/json" })
    );

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
          }),
        ],
        { type: "application/json" }
      )
    );

    formData.append("file1", file1);

    formData.append("file2", file2);
    formData.append("file3", file3);
    setSubmitting(true);

    httpClient()
      .post(APP_API.editBook, formData, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        message.success("Add Successfully");
        navigate(adminRoutes.books);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="address-background">
        <PageTitle>Edit Books</PageTitle>
        <div className="site-layout-background d-flex align-items-center justify-content-center ">
          <Form
            {...layout}
            name="nest-messages"
            form={bookForm}
            onFinish={onFinish}
          >
            <Form.Item
              className="form-item "
              name="nameBook"
              label="Name Book"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => {
                  nameInputChange(e);
                }}
              />
            </Form.Item>
            <Form.Item
              className="form-item "
              label="Category"
              name="idCate"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              {book.category && (
                <Select
                  allowClear
                  onChange={(e) => {
                    idCateInputChange(e);
                  }}
                  defaultValue={book.category.id}
                >
                  {console.log(selectValue)}
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

            <Form.Item
              className="form-item "
              name="author"
              label="Author"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => {
                  authorInputChange(e);
                }}
              />
            </Form.Item>
            <Form.Item
              className="form-item "
              name="discount"
              label="Discount"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => {
                  discountInputChange(e);
                }}
              />
            </Form.Item>
            <Form.Item
              className="form-item "
              name="quantity"
              label="Quantity"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => {
                  quantityInputChange(e);
                }}
              />
            </Form.Item>
            <Form.Item
              className="form-item "
              name="price"
              label="Price"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => {
                  priceInputChange(e);
                }}
              />
            </Form.Item>
            <Form.Item
              className="form-item "
              name="detail"
              label="Detail"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => {
                  detailInputChange(e);
                }}
              />
            </Form.Item>
            {/* <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              defaultFileList={[...fileList]}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> */}

            <div className="col" style={{ marginTop: "15px" }}>
              <Input type="file" name="file1" onChange={handleFileChange} />
            </div>
            <div className="col" style={{ marginTop: "15px" }}>
              <Input type="file" name="file2" onChange={handleFile2Change} />
            </div>
            <div className="col" style={{ marginTop: "15px" }}>
              <Input type="file" name="file3" onChange={handleFile3Change} />
            </div>

            <Form.Item
              className="form-item "
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Button type="primary" htmlType="submit">
                Save New Book
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 8, span: 16 }}
              className="form-item "
            >
              <Link to={adminRoutes.books}>
                <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
                Turn Back
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default EditBooks;

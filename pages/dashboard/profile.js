/* eslint-disable @next/next/no-css-tags */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { clsx } from "clsx";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSpring, config } from "react-spring";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loading from "../../components/layouts/Loading";
import SeoHead from "../../components/seo/SeoHead";

const sidebarItems = [
  [
    { id: "0", title: "Home", notifications: false },
    { id: "1", title: "Dashboard", notifications: false },
    { id: "2", title: "KYC", notifications: false },
  ],
];

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      toast.error("Kindly Login");
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SeoHead title="Profile" />
          <Head>
            <link
              href="/stylesheet.css"
              rel="stylesheet"
              precedence="default"
            />
          </Head>
          <div className="flex">
            <Sidebar
              user={user}
              onSidebarHide={() => {
                onSetShowSidebar(false);
              }}
              showSidebar={showSidebar}
            />
            <Content
              user={user}
              onSidebarHide={() => {
                onSetShowSidebar(true);
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

function Sidebar({ user, onSidebarHide, showSidebar }) {
  const [selected, setSelected] = useState("2");

  useEffect(() => {
    if (selected === "2") return;
    if (selected === "0") {
      setSelected(selected);
      return (window.location.href = `/`);
    }
    if (selected === "1") {
      setSelected(selected);
      return (window.location.href = `/dashboard`);
    }
  }, [selected]);

  const { dashOffset, indicatorWidth, precentage } = useSpring({
    dashOffset: 26.015,
    indicatorWidth: 70,
    precentage: 77,
    from: { dashOffset: 113.113, indicatorWidth: 0, precentage: 0 },
    config: config.molasses,
  });
  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 bg-card w-full sm:w-20 xl:w-60 sm:flex flex-col z-10",
        showSidebar ? "flex" : "hidden"
      )}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-top">
          <div className="block sm:hidden xl:block ml-2 font-bold text-xl text-white"></div>
          <div className="flex-grow sm:hidden xl:block" />
          <IconButton
            icon="res-react-dash-sidebar-close"
            className="block sm:hidden"
            onClick={onSidebarHide}
          />
        </div>
      </div>
      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
        <div className="w-full p-3 h-24 sm:h-20 xl:h-24 hidden sm:block flex-shrink-0">
          <div className="bg-sidebar-card-top rounded-xl w-full h-full flex items-center justify-start sm:justify-center xl:justify-start px-3 sm:px-0 xl:px-3">
            <Icon path="res-react-dash-sidebar-card" className="w-9 h-9 " />
            <div className="block sm:hidden xl:block ml-3">
              <div className="text-sm font-bold text-white">Referral Code</div>
              <div className="text-sm">
                {(user && user.referralCode) || "No Data"}
              </div>
            </div>
            <div className="block sm:hidden xl:block flex-grow" />
            <svg
              className="block sm:hidden xl:block w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{ fill: "white" }}
            >
              <path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"></path>
            </svg>
          </div>
        </div>
        {sidebarItems[0].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
            onClick={setSelected}
            selected={selected}
          />
        ))}
        <div className="flex-grow" />
      </div>
    </div>
  );
}
function MenuItem({ item: { id, title, notifications }, onClick, selected }) {
  return (
    <div
      className={clsx(
        "w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer",
        selected === id ? "sidebar-item-selected" : "sidebar-item"
      )}
      onClick={() => onClick(id)}
    >
      <SidebarIcons id={id} />
      <div className="block sm:hidden xl:block ml-2">{title}</div>
      <div className="block sm:hidden xl:block flex-grow" />
      {notifications && (
        <div className="flex sm:hidden xl:flex bg-pink-600  w-5 h-5 items-center justify-center rounded-full mr-2">
          <div className="text-white text-sm">{notifications}</div>
        </div>
      )}
    </div>
  );
}
function Content({ user, onSidebarHide }) {
  const dateObject = new Date(user && user.createdAt);

  // Get the month, day, and year components from the date object
  const month = dateObject.toLocaleString("en-US", { month: "long" });
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" md:h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2 md:justify-center">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-white">
                  Hello {(user && user.name) || "John"}
                </div>
              </div>
              <div className="flex items-center">
                <Icon
                  path="res-react-dash-date-indicator"
                  className="w-3 h-3"
                />
                <div className="ml-2">Joined Date {formattedDate}</div>
              </div>
            </div>
            <IconButton
              icon="res-react-dash-sidebar-open"
              className="block sm:hidden"
              onClick={onSidebarHide}
            />
          </div>
        </div>
        <div className="w-full p-3 lg:w-1/2">
          <div className="rounded-lg bg-card overflow-hidden h-100">
            <KycForm />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

function KycForm() {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    //set the formdata from user
    setFormData({
      phoneNo: user.phoneNo,
      bankName: user.bankName,
      accountNo: user.accountNo,
      bankAddress: user.bankAddress,
      ifscCode: user.ifscCode,
      swiftCode: user.swiftCode,
      panCardImage: user.panCardImage,
      userId: user.id,
    });
    setImagePreview(user.panCardImage);
  }, []);

  const [formData, setFormData] = useState({
    phoneNo: "",
    bankName: "",
    accountNo: "",
    bankAddress: "",
    ifscCode: "",
    swiftCode: "",
    panCardImage: "",
    userId: user.id,
  });

  const [imagePreview, setImagePreview] = useState(
    "https://brent-mccardle.org/img/placeholder-image.png"
  );
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState();
  const [imageLoading, setImageLoading] = useState(false);

  const handlepostImage = async (e) => {
    setImageLoading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "panCard");

    const config = {
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        let percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
      },
    };

    axios
      .post(
        "https://api.cloudinary.com/v1_1/dk93qky2f/image/upload",
        data,
        config
      )
      .then((r) => {
        setImageLoading(false);
        setFormData({
          ...formData,
          panCardImage: r.data.secure_url,
        });
        setImagePreview(r.data.secure_url);
        toast.success("Image Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Phone number validation (10 digits)
    // const phoneRegex = /^[0-9]{10}$/;
    // if (!phoneRegex.test(formData.phoneNo)) {
    //   newErrors.phoneNo = "Invalid phone number";
    //   toast.error("Invalid Phone Number");
    // }

    setErrors(newErrors);

    // Check if there are any errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.isKYCApproved === true) {
      toast.success("KYC Already Approved");
      return;
    } else {
      if (!validateForm()) {
        // If there are validation errors, don't proceed with submission
        return;
      }

      try {
        console.log(formData);

        const response = await axios.post(" api/auth/update-kyc", formData);

        console.log("API Response:", response.data.success);
        if (response.data.success === true) {
          toast.success("KYC Updated Successfully");
        }

        // Handle the response as needed (redirect, show a message, etc.)
      } catch (error) {
        console.error("API Error:", error);
        // Handle errors
      }
    }
  };

  return (
    <div className="flex p-4 h-full flex-col">
      <div className="d-flex justify-content-center pt-3 pb-6">
        <div className="flex items-center">
          <div className="font-bold text-white">KYC Form</div>
          <div className="flex-grow" />
        </div>
      </div>
      <form className="my-form" onSubmit={handleSubmit}>
        <div className="container">
          <h1>Enter Your Details Here!</h1>
          <ul>
            <li>
              <div className="grid grid-2">
                <input
                  name="phoneNo"
                  type="text"
                  placeholder="Phone"
                  disabled={user.isKYCApproved ? true : false}
                  value={formData.phoneNo}
                  onChange={handleChange}
                />
                {errors.phoneNo && (
                  <p className="error-message">{errors.phoneNo}</p>
                )}
              </div>
            </li>
            <li>
              <div className="grid grid-2">
                <input
                  name="bankName"
                  type="text"
                  placeholder="Bank Name."
                  required
                  disabled={user.isKYCApproved ? true : false}
                  value={formData.bankName}
                  onChange={handleChange}
                />
                {errors.bankName && (
                  <p className="error-message">{errors.bankName}</p>
                )}
              </div>
            </li>
            <li>
              <div className="grid grid-2">
                <input
                  name="accountNo"
                  type="text"
                  placeholder="Account No."
                  required
                  disabled={user.isKYCApproved ? true : false}
                  value={formData.accountNo}
                  onChange={handleChange}
                />
                {errors.accountNo && (
                  <p className="error-message">{errors.accountNo}</p>
                )}
              </div>
            </li>
            <li>
              <div className="grid grid-2">
                <input
                  name="bankAddress"
                  type="text"
                  placeholder="Bank Address"
                  required
                  disabled={user.isKYCApproved ? true : false}
                  value={formData.bankAddress}
                  onChange={handleChange}
                />
                {errors.bankAddress && (
                  <p className="error-message">{errors.bankAddress}</p>
                )}
              </div>
            </li>
            <li>
              <div className="grid grid-2">
                <input
                  name="ifscCode"
                  type="text"
                  placeholder="IFSC Code"
                  disabled={user.isKYCApproved ? true : false}
                  value={formData.ifscCode}
                  onChange={handleChange}
                />
                {errors.ifscCode && (
                  <p className="error-message">{errors.ifscCode}</p>
                )}
              </div>
            </li>
            <li>
              <div className="grid grid-2">
                <input
                  name="swiftCode"
                  type="text"
                  placeholder="Swift Code"
                  value={formData.swiftCode}
                  disabled={user.isKYCApproved ? true : false}
                  onChange={handleChange}
                />
                {errors.swiftCode && (
                  <p className="error-message">{errors.swiftCode}</p>
                )}
              </div>
            </li>
            <li>
              <div className="grid grid-2">
                <input
                  type="file"
                  accept=".jpg,.png, .jpeg"
                  disabled={user.isKYCApproved ? true : false}
                  onChange={handlepostImage}
                />
              </div>
              {imageLoading === true ? (
                <h4>Uploading Image {progress} %</h4>
              ) : (
                <></>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100px", marginTop: "10px" }}
                />
              )}
            </li>
            <li>
              <input
                type="checkbox"
                id="terms"
                name="termsAgreed"
                disabled={user.isKYCApproved ? true : false}
              />
              <label htmlFor="terms">
                I have read and agreed with{" "}
                <a href="">
                  <u>the terms and conditions.</u>
                </a>
              </label>
            </li>
            <li>
              <div className="grid grid-3">
                <button className="btn-grid" type="submit">
                  <span className="back">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/email-icon.svg"
                      alt=""
                    />
                  </span>
                  <span className="front">SUBMIT</span>
                </button>
                <button className="btn-grid" type="reset">
                  <span className="back">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/eraser-icon.svg"
                      alt=""
                    />
                  </span>
                  <span className="front">RESET</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}

function SidebarIcons({ id }) {
  const icons = {
    0: (
      <>
        <path d="M12 19C10.067 19 8.31704 18.2165 7.05029 16.9498L12 12V5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        />
      </>
    ),
    1: (
      <>
        <path d="M9 3C6.23858 3 4 5.23858 4 8C4 10.7614 6.23858 13 9 13C11.7614 13 14 10.7614 14 8C14 5.23858 11.7614 3 9 3ZM6 8C6 6.34315 7.34315 5 9 5C10.6569 5 12 6.34315 12 8C12 9.65685 10.6569 11 9 11C7.34315 11 6 9.65685 6 8Z" />
        <path d="M16.9084 8.21828C16.6271 8.07484 16.3158 8.00006 16 8.00006V6.00006C16.6316 6.00006 17.2542 6.14956 17.8169 6.43645C17.8789 6.46805 17.9399 6.50121 18 6.5359C18.4854 6.81614 18.9072 7.19569 19.2373 7.65055C19.6083 8.16172 19.8529 8.75347 19.9512 9.37737C20.0496 10.0013 19.9987 10.6396 19.8029 11.2401C19.6071 11.8405 19.2719 12.3861 18.8247 12.8321C18.3775 13.2782 17.8311 13.6119 17.2301 13.8062C16.6953 13.979 16.1308 14.037 15.5735 13.9772C15.5046 13.9698 15.4357 13.9606 15.367 13.9496C14.7438 13.8497 14.1531 13.6038 13.6431 13.2319L13.6421 13.2311L14.821 11.6156C15.0761 11.8017 15.3717 11.9248 15.6835 11.9747C15.9953 12.0247 16.3145 12.0001 16.615 11.903C16.9155 11.8059 17.1887 11.639 17.4123 11.416C17.6359 11.193 17.8035 10.9202 17.9014 10.62C17.9993 10.3198 18.0247 10.0006 17.9756 9.68869C17.9264 9.37675 17.8041 9.08089 17.6186 8.82531C17.4331 8.56974 17.1898 8.36172 16.9084 8.21828Z" />
        <path d="M19.9981 21C19.9981 20.475 19.8947 19.9551 19.6938 19.47C19.4928 18.9849 19.1983 18.5442 18.8271 18.1729C18.4558 17.8017 18.0151 17.5072 17.53 17.3062C17.0449 17.1053 16.525 17.0019 16 17.0019V15C16.6821 15 17.3584 15.1163 18 15.3431C18.0996 15.3783 18.1983 15.4162 18.2961 15.4567C19.0241 15.7583 19.6855 16.2002 20.2426 16.7574C20.7998 17.3145 21.2417 17.9759 21.5433 18.7039C21.5838 18.8017 21.6217 18.9004 21.6569 19C21.8837 19.6416 22 20.3179 22 21H19.9981Z" />
        <path d="M16 21H14C14 18.2386 11.7614 16 9 16C6.23858 16 4 18.2386 4 21H2C2 17.134 5.13401 14 9 14C12.866 14 16 17.134 16 21Z" />
      </>
    ),
    2: (
      <>
        <path d="M2 4V18L6.8 14.4C7.14582 14.1396 7.56713 13.9992 8 14H16C17.1046 14 18 13.1046 18 12V4C18 2.89543 17.1046 2 16 2H4C2.89543 2 2 2.89543 2 4ZM4 14V4H16V12H7.334C6.90107 11.9988 6.47964 12.1393 6.134 12.4L4 14Z" />
        <path d="M22 22V9C22 7.89543 21.1046 7 20 7V18L17.866 16.4C17.5204 16.1393 17.0989 15.9988 16.666 16H7C7 17.1046 7.89543 18 9 18H16C16.4329 17.9992 16.8542 18.1396 17.2 18.4L22 22Z" />
      </>
    ),
    3: (
      <>
        <path d="M9 3C6.23858 3 4 5.23858 4 8C4 10.7614 6.23858 13 9 13C11.7614 13 14 10.7614 14 8C14 5.23858 11.7614 3 9 3ZM6 8C6 6.34315 7.34315 5 9 5C10.6569 5 12 6.34315 12 8C12 9.65685 10.6569 11 9 11C7.34315 11 6 9.65685 6 8Z" />
        <path d="M16.9084 8.21828C16.6271 8.07484 16.3158 8.00006 16 8.00006V6.00006C16.6316 6.00006 17.2542 6.14956 17.8169 6.43645C17.8789 6.46805 17.9399 6.50121 18 6.5359C18.4854 6.81614 18.9072 7.19569 19.2373 7.65055C19.6083 8.16172 19.8529 8.75347 19.9512 9.37737C20.0496 10.0013 19.9987 10.6396 19.8029 11.2401C19.6071 11.8405 19.2719 12.3861 18.8247 12.8321C18.3775 13.2782 17.8311 13.6119 17.2301 13.8062C16.6953 13.979 16.1308 14.037 15.5735 13.9772C15.5046 13.9698 15.4357 13.9606 15.367 13.9496C14.7438 13.8497 14.1531 13.6038 13.6431 13.2319L13.6421 13.2311L14.821 11.6156C15.0761 11.8017 15.3717 11.9248 15.6835 11.9747C15.9953 12.0247 16.3145 12.0001 16.615 11.903C16.9155 11.8059 17.1887 11.639 17.4123 11.416C17.6359 11.193 17.8035 10.9202 17.9014 10.62C17.9993 10.3198 18.0247 10.0006 17.9756 9.68869C17.9264 9.37675 17.8041 9.08089 17.6186 8.82531C17.4331 8.56974 17.1898 8.36172 16.9084 8.21828Z" />
        <path d="M19.9981 21C19.9981 20.475 19.8947 19.9551 19.6938 19.47C19.4928 18.9849 19.1983 18.5442 18.8271 18.1729C18.4558 17.8017 18.0151 17.5072 17.53 17.3062C17.0449 17.1053 16.525 17.0019 16 17.0019V15C16.6821 15 17.3584 15.1163 18 15.3431C18.0996 15.3783 18.1983 15.4162 18.2961 15.4567C19.0241 15.7583 19.6855 16.2002 20.2426 16.7574C20.7998 17.3145 21.2417 17.9759 21.5433 18.7039C21.5838 18.8017 21.6217 18.9004 21.6569 19C21.8837 19.6416 22 20.3179 22 21H19.9981Z" />
        <path d="M16 21H14C14 18.2386 11.7614 16 9 16C6.23858 16 4 18.2386 4 21H2C2 17.134 5.13401 14 9 14C12.866 14 16 17.134 16 21Z" />
      </>
    ),
    4: (
      <path d="M19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4H7V2H9V4H15V2H17V4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22ZM5 10V20H19V10H5ZM5 6V8H19V6H5ZM17 14H7V12H17V14Z" />
    ),
    5: (
      <>
        <path d="M21.266 20.998H2.73301C2.37575 20.998 2.04563 20.8074 1.867 20.498C1.68837 20.1886 1.68838 19.8074 1.86701 19.498L11.133 3.49799C11.3118 3.1891 11.6416 2.9989 11.9985 2.9989C12.3554 2.9989 12.6852 3.1891 12.864 3.49799L22.13 19.498C22.3085 19.8072 22.3086 20.1882 22.1303 20.4975C21.9519 20.8069 21.6221 20.9976 21.265 20.998H21.266ZM12 5.99799L4.46901 18.998H19.533L12 5.99799ZM12.995 14.999H10.995V9.99799H12.995V14.999Z" />
        <path d="M11 16H13V18H11V16Z" />
      </>
    ),
    6: (
      <path d="M13.82 22H10.18C9.71016 22 9.3036 21.673 9.20304 21.214L8.79604 19.33C8.25309 19.0921 7.73827 18.7946 7.26104 18.443L5.42404 19.028C4.97604 19.1709 4.48903 18.9823 4.25404 18.575L2.43004 15.424C2.19763 15.0165 2.2777 14.5025 2.62304 14.185L4.04804 12.885C3.98324 12.2961 3.98324 11.7019 4.04804 11.113L2.62304 9.816C2.27719 9.49837 2.19709 8.98372 2.43004 8.576L4.25004 5.423C4.48503 5.0157 4.97204 4.82714 5.42004 4.97L7.25704 5.555C7.5011 5.37416 7.75517 5.20722 8.01804 5.055C8.27038 4.91269 8.53008 4.78385 8.79604 4.669L9.20404 2.787C9.30411 2.32797 9.71023 2.00049 10.18 2H13.82C14.2899 2.00049 14.696 2.32797 14.796 2.787L15.208 4.67C15.4888 4.79352 15.7623 4.93308 16.027 5.088C16.274 5.23081 16.5127 5.38739 16.742 5.557L18.58 4.972C19.0277 4.82967 19.5142 5.01816 19.749 5.425L21.569 8.578C21.8015 8.98548 21.7214 9.49951 21.376 9.817L19.951 11.117C20.0158 11.7059 20.0158 12.3001 19.951 12.889L21.376 14.189C21.7214 14.5065 21.8015 15.0205 21.569 15.428L19.749 18.581C19.5142 18.9878 19.0277 19.1763 18.58 19.034L16.742 18.449C16.5095 18.6203 16.2678 18.7789 16.018 18.924C15.7559 19.0759 15.4854 19.2131 15.208 19.335L14.796 21.214C14.6956 21.6726 14.2895 21.9996 13.82 22ZM7.62004 16.229L8.44004 16.829C8.62489 16.9652 8.81755 17.0904 9.01704 17.204C9.20474 17.3127 9.39801 17.4115 9.59604 17.5L10.529 17.909L10.986 20H13.016L13.473 17.908L14.406 17.499C14.8133 17.3194 15.1999 17.0961 15.559 16.833L16.38 16.233L18.421 16.883L19.436 15.125L17.853 13.682L17.965 12.67C18.0142 12.2274 18.0142 11.7806 17.965 11.338L17.853 10.326L19.437 8.88L18.421 7.121L16.38 7.771L15.559 7.171C15.1998 6.90671 14.8133 6.68175 14.406 6.5L13.473 6.091L13.016 4H10.986L10.527 6.092L9.59604 6.5C9.39785 6.58704 9.20456 6.68486 9.01704 6.793C8.81878 6.90633 8.62713 7.03086 8.44304 7.166L7.62204 7.766L5.58204 7.116L4.56504 8.88L6.14804 10.321L6.03604 11.334C5.98684 11.7766 5.98684 12.2234 6.03604 12.666L6.14804 13.678L4.56504 15.121L5.58004 16.879L7.62004 16.229ZM11.996 16C9.7869 16 7.99604 14.2091 7.99604 12C7.99604 9.79086 9.7869 8 11.996 8C14.2052 8 15.996 9.79086 15.996 12C15.9933 14.208 14.204 15.9972 11.996 16ZM11.996 10C10.9034 10.0011 10.0139 10.8788 9.99827 11.9713C9.98262 13.0638 10.8466 13.9667 11.9387 13.9991C13.0309 14.0315 13.9469 13.1815 13.996 12.09V12.49V12C13.996 10.8954 13.1006 10 11.996 10Z" />
    ),
  };
  return (
    <svg
      className="w-8 h-8 xl:w-5 xl:h-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[id]}
    </svg>
  );
}

function Icon({ path = "options", className = "w-4 h-4" }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.svg`}
      alt=""
      className={clsx(className)}
    />
  );
}

function IconButton({
  onClick = () => {},
  icon = "options",
  className = "w-4 h-4",
}) {
  return (
    <button onClick={onClick} type="button" className={className}>
      <img
        src={`https://assets.codepen.io/3685267/${icon}.svg`}
        alt=""
        className="w-full h-full"
      />
    </button>
  );
}

export default Profile;

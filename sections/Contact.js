import { Title, TitleSm } from "@/components/common/Title";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

import {
  AiFillBehanceCircle,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { FiHeadphones, FiHelpCircle } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "@/components/common/loader";
// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name cannot exceed 20 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  budget: Yup.number().required("Budget is required"),
  timeframe: Yup.string().required("Timeframe is required"),
  projectDetails: Yup.string().required("Project details are required"),
});

const Contact = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      budget: "",
      timeframe: "",
      projectDetails: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch("/api/submitForm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const result = await res.json();
        toast(result.message, { type: "success" });

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (error) {
        setLoading(false); // Stop loading
        toast("Error submitting the form", { type: "error" });
      } finally {
        setLoading(false); // Stop loading
      }
    },
  });

  return (
    <section className="contact bg-top">
      <div className="container">
        <div className="heading-title">
          <TitleSm title="CONTACT" /> <br />
          <br />
          <Title title="Let's start right now!" className="title-bg" />
        </div>
        <div className="content py flex1">
          <div className="left w-30">
            <div className="contact-details">
              <div className="box">
                <FiHeadphones size={30} className="icons" />
                <h3>US Number: +17869274364</h3>
                <h3>UK Number: +447938434588</h3>
                <h3>Pakistan Numbers: </h3>
                <h3>+923224281032,+923244133319 </h3>
                <span>Call us: Mon - Fri</span>
              </div>
              <div className="box">
                <IoLocationOutline size={30} className="icons" />
                <br />

                <span>
                  <b>US Address:</b> 7901 4th ST N STE 23933 ST Petersburg FL
                  33702
                </span>
                <br />
                <br />

                <span>
                  <b>UK Address:</b>4 Hunger Down Chingford E46QJ
                </span>
                <br />
                <br />

                <span>
                  <b>Pakistan Address: </b> 213-E L-block, Model Town Lahore
                </span>
              </div>
              <div className="box">
                <FiHelpCircle size={30} className="icons" />
                <h3>info@crypthonlab.com</h3>
                <span>Drop us a line anytime!</span>
              </div>
              <div className="box">
                <BiUserCircle size={30} className="icons" />
                <h3>info@crypthonlab.com</h3>
                <span>Career at CrypthonLab</span>
              </div>
            </div>
            <ul>
              <li>
                <Link href="https://www.facebook.com/profile.php?id=61562734246544">
                  <BsFacebook size={25} />
                </Link>
              </li>

              <li>
                <Link href="https://www.instagram.com/crypthonlab/">
                  <AiFillInstagram size={25} />
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/crypthonlab/posts/?feedView=all">
                  <AiFillLinkedin size={25} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="right w-70">
            <TitleSm title="Make an online enquiry" />
            <p className="desc-p">
              Got questions? Ideas? Fill out the form below to get our proposal.
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid-2">
                <div className="inputs">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <span className="error">{formik.errors.name}</span>
                  ) : null}
                </div>
                <div className="inputs">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="grid-2">
                <div className="inputs">
                  <span>Your budget</span>
                  <input
                    type="number"
                    name="budget"
                    value={formik.values.budget}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.budget && formik.errors.budget ? (
                    <div className="error">{formik.errors.budget}</div>
                  ) : null}
                </div>
                <div className="inputs">
                  <span>Timeframe</span>
                  <input
                    type="text"
                    name="timeframe"
                    value={formik.values.timeframe}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.timeframe && formik.errors.timeframe ? (
                    <div className="error">{formik.errors.timeframe}</div>
                  ) : null}
                </div>
              </div>
              <div className="inputs">
                <span>TELL US A BIT ABOUT YOUR PROJECT*</span>
                <textarea
                  cols="30"
                  rows="10"
                  name="projectDetails"
                  value={formik.values.projectDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.projectDetails &&
                formik.errors.projectDetails ? (
                  <div className="error">{formik.errors.projectDetails}</div>
                ) : null}
              </div>
              {loading && <Loader />}

              <button
                className="button-primary"
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? "transparent" : "",
                  cursor: loading ? "not-allowed" : "pointer",
                  color: loading ? "white" : "",
                }}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;

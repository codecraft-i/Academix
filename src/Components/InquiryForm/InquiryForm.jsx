import React, { useState } from "react";
import axios from "axios";
import "./InquiryForm.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api/admissions/inquiries/";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    telegram_nickname: "",
    wanted_country_of_study: "",
    study_program: "",
    planning_money: "",
    text_message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    genericError: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const resetForm = () =>
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      telegram_nickname: "",
      wanted_country_of_study: "",
      study_program: "",
      planning_money: "",
      text_message: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus({ loading: true, success: null, genericError: null });

    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setStatus({
        loading: false,
        success: "Your information has been sent successfully!",
        genericError: null,
      });
      resetForm();
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data) {
        setErrors(err.response.data);
        setStatus({ loading: false, success: null, genericError: null });
      } else {
        const msg =
          err?.response?.data?.detail ||
          "An error occurred while connecting to the server. Please try again.";
        setStatus({ loading: false, success: null, genericError: msg });
      }
    }
  };

  const renderError = (field) =>
    errors[field] ? (
      <span className="error-msg44">{errors[field].join(" ")}</span>
    ) : null;

  return (
    <section className="inquiry-wrapper44">
      <form className="inquiry-card44" onSubmit={handleSubmit} noValidate>
        {/* Row 1: First / Last name */}
        <div className="row44">
          <div className="field44">
            <label htmlFor="first_name">First name</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            {renderError("first_name")}
          </div>

          <div className="field44">
            <label htmlFor="last_name">Last name</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            {renderError("last_name")}
          </div>
        </div>

        <label className="field44">
          <label htmlFor="email">Email address</label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {renderError("email")}
        </label>

        <label className="field44">
          <label htmlFor="phone_number">Phone number</label>
          <input
            name="phone_number"
            id="phone_number"
            type="tel"
            placeholder="+998"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          {renderError("phone_number")}
        </label>

        <label className="field44">
          <label htmlFor="telegram_nickname">Telegram handle</label>
          <input
            name="telegram_nickname"
            type="text"
            id="telegram_nickname"
            placeholder="Telegram @username"
            value={formData.telegram_nickname}
            onChange={handleChange}
          />
          {renderError("telegram_nickname")}
        </label>

        <label className="field44">
          <label htmlFor="wanted_country_of_study">Preferred country of study</label>
          <input
            name="wanted_country_of_study"
            type="text"
            id="wanted_country_of_study"
            placeholder="Country you want to study in"
            value={formData.wanted_country_of_study}
            onChange={handleChange}
            required
          />
          {renderError("wanted_country_of_study")}
        </label>

        <label className="field44">
          <label htmlFor="study_program">Study program</label>
          <input
            name="study_program"
            type="text"
            id="study_program"
            placeholder="Program of interest"
            value={formData.study_program}
            onChange={handleChange}
            required
          />
          {renderError("study_program")}
        </label>

        <label className="field44">
          <label htmlFor="planning_money">Planned budget (USD)</label>
          <input
            name="planning_money"
            type="number"
            id="planning_money"
            placeholder="How much can you spend?"
            value={formData.planning_money}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
          {renderError("planning_money")}
        </label>

        <label className="field44">
          <label htmlFor="text_message">Message</label>
          <textarea
            name="text_message"
            rows="4"
            id="text_message"
            placeholder="Anything else you’d like to add"
            value={formData.text_message}
            onChange={handleChange}
          />
          {renderError("text_message")}
        </label>

        {errors.non_field_errors && (
          <p className="error-msg44">{errors.non_field_errors.join(" ")}</p>
        )}

        <button
          type="submit"
          className="submit-btn44"
          disabled={status.loading}
        >
          {status.loading ? "Submitting..." : "Submit"}
        </button>

        {status.success && <p className="alert-success44">{status.success}</p>}
        {status.genericError && (
          <p className="alert-error44">{status.genericError}</p>
        )}
      </form>
    </section>
  );
}
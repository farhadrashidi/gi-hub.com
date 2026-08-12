const requestForm = document.querySelector("[data-marketplace-form]");
const formStatus = document.querySelector("[data-marketplace-form-status]");

function configureInquiryForm() {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = Array.from(requestForm.querySelectorAll("input, select, textarea"));
    const isValid = requestForm.checkValidity();

    fields.forEach((field) => field.setAttribute("aria-invalid", String(!field.validity.valid)));

    if (!isValid) {
      formStatus.className = "mt-4 text-sm font-bold text-red-700";
      formStatus.textContent = "Please complete the required fields using a valid business email.";
      requestForm.querySelector(":invalid").focus();
      return;
    }

    const data = new FormData(requestForm);
    const subject = `B2B Marketplace Inquiry — ${data.get("company")}`;
    const body = [
      `Role: ${data.get("role")}`,
      `Company: ${data.get("company")}`,
      `Business email: ${data.get("email")}`,
      `Target market: ${data.get("market")}`,
      "",
      "Product or requirement:",
      data.get("requirement"),
    ].join("\n");

    formStatus.className = "mt-4 text-sm font-bold text-green-800";
    formStatus.textContent = "Your email application is opening with a prefilled inquiry. Review it before sending.";
    window.location.href = `mailto:info@gi-hub.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

if (requestForm && formStatus) {
  configureInquiryForm();
}
